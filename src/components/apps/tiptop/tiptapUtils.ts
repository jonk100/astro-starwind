/**
 * src/components/
 */

import type { Block, TiptapNode, TiptapDoc, BlockType } from "./tiptap.types";

// ── Block[] → Tiptap HTML (load) ─────────────────────────────────────────

/**
 * Converts your Block[] from the database into an HTML string that
 * Tiptap can render on initialisation.
 *
 * We generate HTML rather than Tiptap JSON because it's simpler to
 * produce and Tiptap's `content` option accepts either.
 *
 * Each block type maps to the HTML element StarterKit understands:
 * - paragraph   → <p>
 * - heading     → <h1> (meta.level drives h1-h5)
 * - heading-1   → <h1>
 * - heading-2   → <h2>
 * - heading-3   → <h3>
 * - heading-4   → <h4>
 * - heading-5   → <h5>
 * - quote       → <blockquote><p>
 * - checklist   → <ul><li>  (StarterKit bulletList)
 * - code        → <pre><code>
 * - separator   → <hr>
 * - callout     → <p>  (no native Tiptap callout; degrades gracefully)
 * - prompt      → <p>
 *
 * Content is escaped so stray < > & characters don't break the HTML.
 *
 * @param blocks - The Block[] array from the database.
 * @returns An HTML string suitable for Tiptap's `content` option.
 */
export function blocksToHtml(blocks: Block[]): string {
  function esc(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function extractText(node: any): string {
    if (!node) return "";

    if (node.type === "text") {
      return node.text ?? "";
    }

    if (Array.isArray(node.content)) {
      return node.content.map(extractText).join("");
    }

    return "";
  }

  return blocks.map((block) => {
    let node: any;

    try {
      node = JSON.parse(block.content);
    } catch {
      // fallback for old plain-text blocks
      node = {
        type: "paragraph",
        content: [{ type: "text", text: block.content ?? "" }]
      };
    }

    const text = esc(extractText(node));

    switch (block.type) {
      case "heading": {
        const level = (block.meta?.level as number) ?? 1;
        return `<h${level}>${text}</h${level}>`;
      }

      case "quote":
        return `<blockquote><p>${text}</p></blockquote>`;

      case "checklist":
        return `<ul><li>${text}</li></ul>`;

      case "code":
        return `<pre><code>${text}</code></pre>`;

      case "separator":
        return `<hr>`;

      case "list": {
        const ordered = block.meta?.ordered === true;
        const items = (node.content ?? [])
          .map((item: any) => {
            const inner = esc(extractText(item));
            return `<li>${inner}</li>`;
          })
          .join("");

        return ordered ? `<ol>${items}</ol>` : `<ul>${items}</ul>`;
      }

      case "list-item":
        return `<li>${text}</li>`;

      default:
        return `<p>${text}</p>`;
    }
  }).join("");
}


// ── Tiptap JSON → Block[] (save) ──────────────────────────────────────────

/**
 * Extracts the plain-text content from a Tiptap inline node array.
 * Walks the child nodes and concatenates any text nodes, ignoring marks
 * (bold, italic etc.) since Block.content is plain text only.
 *
 * @param children - The `content` array of a Tiptap block node.
 * @returns A plain-text string.
 */
export function inlineText(children: TiptapNode[] = []): string {
  return children
    .filter((n) => n.type === "text")
    .map((n)    => n.text ?? "")
    .join("");
}

/**
 * Converts a Tiptap JSON document back to Block[] so the existing
 * saveBlocks action and blockSchema validation need no changes.
 *
 * Tiptap node types → Block types:
 * - paragraph      → "paragraph"
 * - heading (l1)   → "heading"   (meta.level = 1, for legacy compat)
 * - heading (l2-5) → "heading-2" … "heading-5"
 * - blockquote     → "quote"
 * - bulletList     → "checklist" (first listItem's text only)
 * - orderedList    → "checklist" (treated same — no ordered list Block type)
 * - codeBlock      → "code"
 * - horizontalRule → "separator"
 * - unknown        → "paragraph"
 *
 * Each block gets a fresh crypto.randomUUID() because Tiptap has no concept
 * of stable block IDs — the IDs are only needed for the DB row.
 *
 * @param doc - The Tiptap JSON document from editor.getJSON().
 * @returns A Block[] array matching the blockSchema in write_actions.ts.
 */
export function tiptapDocToBlocks(doc: TiptapDoc): Block[] {
  return (doc.content ?? []).map((node): Block => {
    const id = crypto.randomUUID();
 
    switch (node.type) {
      case "heading": {
        const level = (node.attrs?.level as number) ?? 1;
        // H1 maps to "heading" (legacy type) so old documents stay compatible
        const type  = level === 1 ? "heading" : `heading-${level}`;
        return { id, type: type as BlockType, content: inlineText(node.content), meta: { level } };
      }
 
      case "blockquote": {
        // blockquote wraps one or more paragraph nodes — flatten to one string
        const text = (node.content ?? [])
          .map((child) => inlineText(child.content))
          .join("\n");
        return { id, type: "quote", content: text };
      }
 
      case "bulletList":
      case "orderedList": {
        // Flatten all list items into one block separated by newlines.
        // There is no multi-item Block type, so this is the closest mapping.
        const text = (node.content ?? [])
          .map((li) =>
            (li.content ?? [])
              .map((child) => inlineText(child.content))
              .join(" ")
          )
          .join("\n");
        return { id, type: "checklist", content: text };
      }
 
      case "codeBlock":
        return { id, type: "code",      content: inlineText(node.content) };
 
      case "horizontalRule":
        return { id, type: "separator", content: "" };
 
      default:
        return { id, type: "paragraph", content: inlineText(node.content) };
    }
  });
}

// ── Preview extraction ───────────────────────────────────────────────────

/**
 * Extracts a sidebar preview string from a Block[].
 * Mirrors extractPreview() in write_actions.ts — returns the text of the
 * first non-empty paragraph or heading block, trimmed to 200 characters.
 *
 * We run this client-side so we don't have to send the full block array
 * just to compute a preview on the server.
 *
 * @param blocks - The converted Block[] about to be saved.
 * @returns A plain-text preview string, or null if the document is empty.
 */
export function extractPreview(blocks: Block[]): string | null {
  for (const block of blocks) {
    if (
      (block.type === "paragraph" || block.type === "heading") &&
      block.content.trim().length > 0
    ) {
      return block.content.trim().slice(0, 200);
    }
  }
  return null;
}