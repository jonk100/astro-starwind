/**
 * @file src/lib/journal/tiptap.ts
 * @description Bidirectional translation between TipTap's ProseMirror JSON
 * format and the app's native Block[] format.
 *
 * This is the only file that needs to know about both formats.
 * Everything above this layer (XState machine, editorStore, Supabase actions)
 * continues to work with Block[] exclusively.
 *
 * TipTap node types used here come from the extensions in TipTop.astro:
 *   - StarterKit → paragraph, heading, blockquote, codeBlock, horizontalRule,
 *                  bulletList, orderedList, listItem, bold, italic, etc.
 *   - TaskList + TaskItem → taskList, taskItem
 *
 * @example
 * // On load: convert stored blocks into TipTap content
 * const tiptapDoc = blocksToTipTap(activeBlocks);
 * editor.commands.setContent(tiptapDoc);
 *
 * // On save: convert TipTap state back to blocks
 * const blocks = tiptapToBlocks(editor.getJSON());
 * machine.send({ type: 'BLOCKS_CHANGED', blocks });
 */

import type { Block, BlockType } from './types';

// ─── TipTap JSON Types ────────────────────────────────────────────────────────
// A minimal subset of TipTap's JSONContent type, typed explicitly so we don't
// need to import from @tiptap/core in a server-safe module.

/** A single node in TipTap's ProseMirror JSON document. */
export interface TipTapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>;
  text?: string;
}

/** The top-level TipTap document JSON returned by editor.getJSON(). */
export interface TipTapDoc {
  type: 'doc';
  content: TipTapNode[];
}

// ─── Text Extraction ──────────────────────────────────────────────────────────

/**
 * Recursively extracts plain text from a TipTap node's content array.
 *
 * TipTap represents text as leaf nodes with a `text` property. Inline
 * marks (bold, italic) wrap text nodes but don't affect the content string
 * we store — the Block format is plain text only.
 *
 * @param nodes - The content array from a TipTap block node.
 * @returns A plain string of all text within those nodes.
 */
function extractText(nodes: TipTapNode[] | undefined): string {
  if (!nodes || nodes.length === 0) return '';

  return nodes
    .map((node) => {
      // Leaf text node — the actual string content
      if (node.type === 'text') return node.text ?? '';
      // Inline wrapper (bold, code span, etc.) — recurse into its content
      if (node.content) return extractText(node.content);
      return '';
    })
    .join('');
}

function extractRichContent(node: TipTapNode): string {
  return JSON.stringify(node);
}

// ─── TipTap → Block[] ─────────────────────────────────────────────────────────

/**
 * Converts a TipTap editor document (ProseMirror JSON) into the app's
 * native Block[] format.
 *
 * Called inside TipTap's `onUpdate` callback. The result is sent to the
 * XState machine via `machine.send({ type: 'BLOCKS_CHANGED', blocks })`.
 *
 * Node mapping (Rich Formatting enabled):
 *   paragraph        → "paragraph"  (meta: fontFamily, fontSize, textAlign)
 *   heading          → "heading"    (meta: level, fontFamily, fontSize)
 *   blockquote       → "quote"      (inner paragraph text extracted)
 *   codeBlock        → "code"       (meta: language)
 *   horizontalRule   → "separator"  (no content)
 *   taskItem         → "checklist"  (meta: checked)
 *
 * This function preserves styling attributes in the meta object, which allows 
 * toolbar selections (fonts/sizes) to persist in the JSONB database column.
 *
 * @param doc - The JSON document returned by editor.getJSON().
 * @returns A Block[] array ready to be sent to the XState machine.
 */
export function tiptapToBlocks(doc: TipTapDoc): Block[] {
  const blocks: Block[] = [];

  for (const node of doc.content ?? []) {
    const block = tiptapNodeToBlock(node);
    if (block) blocks.push(block);
  }

  return blocks;
}


/**
 * Converts a single top-level TipTap node (ProseMirror JSON) into the app's
 * native Block format, capturing rich formatting attributes for database persistence.
 *
 * This worker is called by `tiptapToBlocks` during the editor's `onUpdate` cycle.
 * It uses `crypto.randomUUID()` to provide the stable IDs required by the 
 * XState machine and Supabase.
 *
 * Node mapping & Metadata capture:
 *   - paragraph      → "paragraph" (meta: fontFamily, fontSize, textAlign)
 *   - heading        → "heading"   (meta: level, fontFamily, fontSize)
 *   - blockquote     → "quote"     (inner paragraph text extracted)
 *   - codeBlock      → "code"      (meta: language)
 *   - horizontalRule → "separator" (no content)
 *   - taskItem       → "checklist" (meta: checked)
 *
 * Unknown nodes are silently skipped (returning null), ensuring the system 
 * remains forward-compatible as you add more TipTap extensions.
 *
 * @param node - A single ProseMirror node from the TipTap JSON document.
 * @returns A Block object ready for the XState machine, or null if the node type is skipped.
 */
export function tiptapNodeToBlock(node: TipTapNode): Block | null {
  if (node.type === "doc") return null;

  const id = crypto.randomUUID();

  // Store the entire TipTap node JSON
  const content = JSON.stringify(node);

  const commonMeta: Record<string, unknown> = {};
  if (node.attrs) {
    if (node.attrs.fontFamily) commonMeta.fontFamily = node.attrs.fontFamily;
    if (node.attrs.fontSize)   commonMeta.fontSize = node.attrs.fontSize;
    if (node.attrs.textAlign)  commonMeta.textAlign = node.attrs.textAlign;
  }

  switch (node.type) {
    case 'paragraph':
      return {
        id,
        type: 'paragraph',
        content,
        meta: Object.keys(commonMeta).length ? commonMeta : undefined,
      };

    case 'heading': {
      const level = (node.attrs?.level as number) ?? 1;
      return {
        id,
        type: 'heading',
        content,
        meta: { ...commonMeta, level },
      };
    }

    case 'blockquote':
      return {
        id,
        type: 'quote',
        content,
        meta: Object.keys(commonMeta).length ? commonMeta : undefined,
      };

    case 'codeBlock':
      return {
        id,
        type: 'code',
        content,
        meta: { ...commonMeta, language: node.attrs?.language },
      };

    case 'horizontalRule':
      return {
        id,
        type: 'separator',
        content,
        meta: Object.keys(commonMeta).length ? commonMeta : undefined,
      };

    case "bulletList":
      return {
        id,
        type: "list",
        content,
        meta: { ordered: false }
      };

    case "orderedList":
      return {
        id,
        type: "list",
        content,
        meta: { ordered: true }
      };

    case "listItem":
      return {
        id,
        type: "list-item",
        content,
        meta: undefined
      };


    case 'taskItem': {
      const checked = (node.attrs?.checked as boolean) ?? false;
      return {
        id,
        type: 'checklist',
        content,
        meta: { ...commonMeta, checked },
      };
    }

    case 'taskList':
      return null;

    default:
      return null;
  }
}


// ─── Block[] → TipTap ─────────────────────────────────────────────────────────

/**
 * Converts the app's native Block[] format into a TipTap document JSON
 * object suitable for passing to `editor.commands.setContent()`.
 *
 * Called once when a document is loaded into the editor, to hydrate
 * TipTap from the stored Block[].
 *
 * Block type mapping (inverse of tiptapNodeToBlock):
 *   "paragraph"  → paragraph node
 *   "heading"    → heading node (level from meta.level, defaults to 1)
 *   "quote"      → blockquote wrapping a paragraph
 *   "code"       → codeBlock node
 *   "separator"  → horizontalRule node
 *   "checklist"  → taskList wrapping a taskItem
 *   "prompt"     → paragraph (TipTap has no prompt concept; treat as paragraph)
 *   "callout*"   → blockquote (closest visual equivalent without a custom ext.)
 *
 * @param blocks - The Block[] from the database or editorStore.
 * @returns A TipTapDoc JSON object, or an empty doc if blocks is empty.
 */
export function blocksToTipTap(blocks: Block[]): TipTapDoc {
  if (blocks.length === 0) {
    return {
      type: 'doc',
      content: [{ type: 'paragraph' }],
    };
  }

  const nodes = blocks
    .map(blockToTipTapNode)
    .filter((n): n is TipTapNode => n !== null);

  return {
    type: 'doc',
    content: nodes.length ? nodes : [{ type: 'paragraph' }],
  };
}


/**
 * Converts a single application Block into a TipTap ProseMirror node,
 * restoring rich formatting attributes from the meta object.
 *
 * This ensures that when a document is loaded, the editor correctly 
 * applies the saved FontFamily, FontSize, and TextAlign settings.
 * 
 * @param block - A single Block from the app's native format.
 * @returns A TipTapNode ready for editor.commands.setContent().
 */
export function blockToTipTapNode(block: Block): TipTapNode | null {
  let node: TipTapNode;

  try {
    node = JSON.parse(block.content);
  } catch {
    return null;
  }

  // Reapply meta attributes
  if (block.meta) {
    node.attrs = {
      ...(node.attrs ?? {}),
      ...(block.meta.fontFamily ? { fontFamily: block.meta.fontFamily } : {}),
      ...(block.meta.fontSize ? { fontSize: block.meta.fontSize } : {}),
      ...(block.meta.textAlign ? { textAlign: block.meta.textAlign } : {}),
    };

    if (block.type === 'heading' && block.meta.level) {
      node.attrs.level = block.meta.level;
    }

    if (block.type === 'checklist' && block.meta.checked !== undefined) {
      node.attrs.checked = block.meta.checked;
    }
  }

  return node;
}


// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Creates a TipTap paragraph node with a single text child.
 * Returns an empty paragraph node if content is blank.
 *
 * @param content - The plain text string for the paragraph.
 * @returns A TipTap paragraph node.
 */
function makeParagraph(content: string): TipTapNode {
  return {
    type: 'paragraph',
    content: content ? [{ type: 'text', text: content }] : [],
  };
}

/**
 * Resolves the numeric heading level (1–5) from a Block.
 *
 * Checks meta.level first (old `heading` type with level metadata),
 * then falls back to parsing the type string (`heading-2` → 2).
 * Defaults to 1 if neither is available.
 *
 * @param block - A Block whose type is one of the heading variants.
 * @returns A heading level integer between 1 and 5.
 */
function resolveHeadingLevel(block: Block): number {
  // meta.level takes precedence — it's set by the old block editor
  if (typeof block.meta?.level === 'number') {
    return Math.min(5, Math.max(1, block.meta.level));
  }

  // Parse from type suffix: "heading-3" → 3
  const match = block.type.match(/heading-(\d)/);
  if (match) {
    return parseInt(match[1], 10);
  }

  // Default to H1
  return 1;
}