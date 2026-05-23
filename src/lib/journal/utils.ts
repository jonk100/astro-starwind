/**
 * @file src/lib/journal/utils.ts
 */
import type { Block, BlockType, ParsedBlocks } from "./types";

/**
 * Generates a text-only preview from a set of blocks.
 * Used to keep the sidebar index up to date.
 */
/** Generates a text snippet for the flat index preview */
export function generateDocumentPreview(blocks: readonly Block[]): string {
  const text = blocks
    .filter(b => b.type === "paragraph" || b.type === "quote")
    .map(b => b.content)
    .join(" ");
  return text.length > 140 ? text.slice(0, 137) + "..." : text;
}

/**
 * Patches a specific block within a list of blocks.
 */
export function patchBlockInList(
  blocks: readonly Block[],
  patch: Block
): Block[] {
  return blocks.map((b) => (b.id === patch.id ? { ...patch } : b));
}

/**
 * Merges a set of patches into an existing block list.
 * This is the engine for our "delta patching" strategy.
 */
export function mergeBlockPatches(
  currentBlocks: readonly Block[],
  patches: readonly Block[]
): Block[] {
  return currentBlocks.map((block) => {
    const patch = patches.find((p) => p.id === block.id);
    return patch ? { ...block, ...patch } : block;
  });
}

/**
 * @file src/lib/journal/utils.ts
 * @description Pure utility functions for the journal/write app.
 *
 * All functions here are side-effect free and depend only on their inputs.
 * This makes them safe to import in both server (Astro pages, actions) and
 * client (editor script) contexts, and easy to unit test without mocking.
 *
 * @example
 * import { parseBlocks, extractPreview, createBlock } from "@/lib/journal/utils";
 */


// ─── Block Parsing ────────────────────────────────────────────────────────────

/**
 * Safely parses a raw value from the database's content_blocks JSONB column
 * into a typed Block array.
 *
 * Returns a discriminated union so callers are forced to check `ok` before
 * using the blocks — this prevents silent failures when the stored JSON is
 * malformed or the column is null/undefined.
 *
 * @param raw - The raw value from the database. May be a JSON string,
 *              a pre-parsed array (Supabase sometimes parses JSONB automatically),
 *              null, or undefined.
 * @returns A ParsedBlocks result: { ok: true, blocks } or { ok: false, error }.
 *
 * @example
 * const result = parseBlocks(doc.content_blocks);
 * if (!result.ok) {
 *   console.error(result.error);
 *   return [];
 * }
 * const blocks = result.blocks;
 */
export function parseBlocks(raw: unknown): ParsedBlocks {
  // Handle null and undefined up front
  if (raw === null || raw === undefined) {
    return { ok: false, error: "content_blocks is null or undefined" };
  }

  try {
    // Supabase may return JSONB columns as already-parsed arrays.
    // If it's already an array, use it directly without re-parsing.
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;

    if (!Array.isArray(parsed)) {
      return { ok: false, error: "content_blocks is not an array" };
    }

    // Cast — we trust the database shape matches Block[].
    // If schema validation is needed in future, add a Zod parse here.
    return { ok: true, blocks: parsed as Block[] };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `Failed to parse content_blocks: ${message}` };
  }
}

// ─── Preview Extraction ───────────────────────────────────────────────────────

/**
 * Extracts a plain-text preview string from a block array.
 *
 * Walks the blocks in order and returns the content of the first non-empty
 * paragraph or heading block, trimmed and capped at 200 characters.
 *
 * Returns null if the document is empty or contains only non-previewable
 * blocks (separators, empty paragraphs, etc.). The sidebar treats null
 * as "No preview available".
 *
 * @param blocks - The array of Block objects from the editor or database.
 * @returns A plain-text preview string of up to 200 characters, or null.
 *
 * @example
 * const preview = extractPreview(blocks);
 * // "The rain had stopped by the time..."
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

// ─── Block Factory ────────────────────────────────────────────────────────────

/**
 * Creates a new Block with a generated unique ID.
 *
 * Use this factory whenever creating a block client-side — never hand-write
 * a block literal, as the id must be unique and stable across saves.
 *
 * Uses crypto.randomUUID() which is available in all modern browsers and
 * in Node.js 14.17+. If you need to support older environments, swap this
 * for a uuid library.
 *
 * @param type - The block type (paragraph, heading, quote, etc.).
 * @param content - The initial text content. Defaults to an empty string.
 * @param meta - Optional metadata for the block (e.g. { level: 1 } for headings).
 * @returns A complete Block object ready to insert into the editor state.
 *
 * @example
 * // New empty paragraph
 * const block = createBlock("paragraph");
 *
 * // New heading with content and level metadata
 * const heading = createBlock("heading", "Chapter One", { level: 1 });
 */
export function createBlock(
  type: BlockType,
  content: string = "",
  meta?: Record<string, unknown>
): Block {
  return {
    id: crypto.randomUUID(),
    type,
    content,
    // Only include meta in the object if it was provided,
    // so isEmptyBlock and other checks don't have to handle meta: undefined
    ...(meta !== undefined && { meta }),
  };
}

// ─── Block State Checks ───────────────────────────────────────────────────────

/**
 * Returns true if a block is considered empty for editing purposes.
 *
 * A block is empty if:
 * - Its content is an empty string or contains only whitespace, OR
 * - Its type is "separator" (separators have no meaningful text content
 *   regardless of what the content field holds)
 *
 * Used by the editor to determine whether to delete a block on backspace,
 * and by getDocumentPlainText to skip blank lines.
 *
 * @param block - The block to check.
 * @returns True if the block is empty or a separator, false otherwise.
 *
 * @example
 * isEmptyBlock({ id: "1", type: "paragraph", content: "" });   // true
 * isEmptyBlock({ id: "2", type: "paragraph", content: "Hi" }); // false
 * isEmptyBlock({ id: "3", type: "separator", content: "---" }); // true
 */
export function isEmptyBlock(block: Block): boolean {
  if (block.type === "separator") return true;
  return block.content.trim().length === 0;
}

// ─── Plain Text Extraction ────────────────────────────────────────────────────

/**
 * Converts a block array into a single plain-text string.
 *
 * Joins all non-empty, non-separator block content with newlines.
 * Used for:
 * - Full-text search indexing
 * - Word count calculation
 * - Export to plain text format
 *
 * Separator blocks are excluded because they represent visual breaks,
 * not textual content. Empty blocks are excluded to avoid blank lines
 * in the output.
 *
 * @param blocks - The array of Block objects to convert.
 * @returns A newline-joined plain-text string, or an empty string if
 *          the document has no readable content.
 *
 * @example
 * const text = getDocumentPlainText(blocks);
 * const wordCount = text.split(/\s+/).filter(Boolean).length;
 */
export function getDocumentPlainText(blocks: Block[]): string {
  return blocks
    .filter((block) => !isEmptyBlock(block))
    .map((block) => block.content.trim())
    .join("\n");
}