/**
 * @file src/lib/journal/journal.test.ts
 * @description Unit tests for journal utility functions.
 *
 * Run with: pnpm test
 * Requires vitest in your project:
 *   pnpm add -D vitest
 *   Add "test": "vitest" to package.json scripts.
 */

import { describe, it, expect } from "vitest";
import {
  parseBlocks,
  extractPreview,
  createBlock,
  isEmptyBlock,
  getDocumentPlainText,
} from "./utils";
import type { Block } from "./types";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

/**
 * Creates a minimal Block stub for testing.
 *
 * @param overrides - Any Block fields to override from the defaults.
 * @returns A complete Block object.
 */
function makeBlock(overrides: Partial<Block> = {}): Block {
  return {
    id: "block-1",
    type: "paragraph",
    content: "Hello world",
    ...overrides,
  };
}

// ─── parseBlocks ──────────────────────────────────────────────────────────────

describe("parseBlocks", () => {
  it("returns ok:true and a Block array for valid JSON", () => {
    const raw = JSON.stringify([
      { id: "b1", type: "paragraph", content: "The rain had stopped." },
    ]);
    const result = parseBlocks(raw);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.blocks).toHaveLength(1);
      expect(result.blocks[0].content).toBe("The rain had stopped.");
    }
  });

  it("returns ok:true for an empty block array", () => {
    const result = parseBlocks("[]");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.blocks).toHaveLength(0);
    }
  });

  it("returns ok:false for invalid JSON", () => {
    const result = parseBlocks("not json at all");
    expect(result.ok).toBe(false);
  });

  it("returns ok:false for JSON that is not an array", () => {
    const result = parseBlocks(JSON.stringify({ id: "b1", type: "paragraph" }));
    expect(result.ok).toBe(false);
  });

  it("returns ok:false for null", () => {
    const result = parseBlocks(null);
    expect(result.ok).toBe(false);
  });

  it("returns ok:false for undefined", () => {
    const result = parseBlocks(undefined);
    expect(result.ok).toBe(false);
  });

  it("preserves meta fields on blocks", () => {
    const raw = JSON.stringify([
      { id: "b1", type: "heading", content: "Chapter One", meta: { level: 1 } },
    ]);
    const result = parseBlocks(raw);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.blocks[0].meta).toEqual({ level: 1 });
    }
  });

  it("preserves all block types without coercion", () => {
    const types: Block["type"][] = [
      "paragraph", "heading", "quote", "separator",
      "checklist", "callout", "code", "prompt",
    ];
    const raw = JSON.stringify(
      types.map((type, i) => ({ id: `b${i}`, type, content: "" }))
    );
    const result = parseBlocks(raw);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.blocks.map((b) => b.type)).toEqual(types);
    }
  });
});

// ─── extractPreview ───────────────────────────────────────────────────────────

describe("extractPreview", () => {
  it("returns null for an empty block array", () => {
    expect(extractPreview([])).toBeNull();
  });

  it("returns the content of the first paragraph block", () => {
    const blocks: Block[] = [
      makeBlock({ type: "paragraph", content: "The rain had stopped." }),
    ];
    expect(extractPreview(blocks)).toBe("The rain had stopped.");
  });

  it("returns the content of the first heading block if no paragraph precedes it", () => {
    const blocks: Block[] = [
      makeBlock({ type: "heading", content: "Chapter One" }),
      makeBlock({ type: "paragraph", content: "It was a dark night." }),
    ];
    expect(extractPreview(blocks)).toBe("Chapter One");
  });

  it("skips separator blocks when looking for a preview", () => {
    const blocks: Block[] = [
      makeBlock({ type: "separator", content: "" }),
      makeBlock({ type: "paragraph", content: "After the break." }),
    ];
    expect(extractPreview(blocks)).toBe("After the break.");
  });

  it("skips empty paragraph blocks", () => {
    const blocks: Block[] = [
      makeBlock({ type: "paragraph", content: "" }),
      makeBlock({ type: "paragraph", content: "   " }),
      makeBlock({ type: "paragraph", content: "Found it." }),
    ];
    expect(extractPreview(blocks)).toBe("Found it.");
  });

  it("trims whitespace from the preview", () => {
    const blocks: Block[] = [
      makeBlock({ type: "paragraph", content: "   Lots of space.   " }),
    ];
    expect(extractPreview(blocks)).toBe("Lots of space.");
  });

  it("truncates content longer than 200 characters", () => {
    const longContent = "a".repeat(300);
    const blocks: Block[] = [makeBlock({ type: "paragraph", content: longContent })];
    const result = extractPreview(blocks);
    expect(result).toHaveLength(200);
  });

  it("does not truncate content of exactly 200 characters", () => {
    const content = "a".repeat(200);
    const blocks: Block[] = [makeBlock({ type: "paragraph", content })];
    expect(extractPreview(blocks)).toHaveLength(200);
  });

  it("returns null when all blocks are empty or non-previewable", () => {
    const blocks: Block[] = [
      makeBlock({ type: "separator", content: "" }),
      makeBlock({ type: "paragraph", content: "" }),
    ];
    expect(extractPreview(blocks)).toBeNull();
  });
});

// ─── createBlock ──────────────────────────────────────────────────────────────

describe("createBlock", () => {
  it("creates a block with the given type and empty content by default", () => {
    const block = createBlock("paragraph");
    expect(block.type).toBe("paragraph");
    expect(block.content).toBe("");
  });

  it("creates a block with provided content", () => {
    const block = createBlock("heading", "Chapter One");
    expect(block.content).toBe("Chapter One");
  });

  it("generates a unique id for each block", () => {
    const a = createBlock("paragraph");
    const b = createBlock("paragraph");
    expect(a.id).not.toBe(b.id);
  });

  it("creates a block with no meta by default", () => {
    const block = createBlock("paragraph");
    expect(block.meta).toBeUndefined();
  });

  it("accepts meta when provided", () => {
    const block = createBlock("heading", "Intro", { level: 1 });
    expect(block.meta).toEqual({ level: 1 });
  });
});

// ─── isEmptyBlock ─────────────────────────────────────────────────────────────

describe("isEmptyBlock", () => {
  it("returns true for a block with empty content", () => {
    expect(isEmptyBlock(makeBlock({ content: "" }))).toBe(true);
  });

  it("returns true for a block with only whitespace", () => {
    expect(isEmptyBlock(makeBlock({ content: "   " }))).toBe(true);
  });

  it("returns false for a block with content", () => {
    expect(isEmptyBlock(makeBlock({ content: "Hello" }))).toBe(false);
  });

  it("returns true for a separator block regardless of content", () => {
    expect(isEmptyBlock(makeBlock({ type: "separator", content: "---" }))).toBe(true);
  });
});

// ─── getDocumentPlainText ─────────────────────────────────────────────────────

describe("getDocumentPlainText", () => {
  it("returns an empty string for no blocks", () => {
    expect(getDocumentPlainText([])).toBe("");
  });

  it("joins paragraph and heading content with newlines", () => {
    const blocks: Block[] = [
      makeBlock({ type: "heading", content: "Chapter One" }),
      makeBlock({ type: "paragraph", content: "The rain had stopped." }),
    ];
    expect(getDocumentPlainText(blocks)).toBe(
      "Chapter One\nThe rain had stopped."
    );
  });

  it("skips separator blocks", () => {
    const blocks: Block[] = [
      makeBlock({ type: "paragraph", content: "Before." }),
      makeBlock({ type: "separator", content: "" }),
      makeBlock({ type: "paragraph", content: "After." }),
    ];
    expect(getDocumentPlainText(blocks)).toBe("Before.\nAfter.");
  });

  it("skips empty blocks", () => {
    const blocks: Block[] = [
      makeBlock({ type: "paragraph", content: "Real content." }),
      makeBlock({ type: "paragraph", content: "" }),
    ];
    expect(getDocumentPlainText(blocks)).toBe("Real content.");
  });

  it("includes quote, callout, checklist, code, and prompt content", () => {
    const blocks: Block[] = [
      makeBlock({ type: "quote", content: "A quoted line." }),
      makeBlock({ type: "callout", content: "A note." }),
      makeBlock({ type: "checklist", content: "A task." }),
      makeBlock({ type: "code", content: "const x = 1;" }),
      makeBlock({ type: "prompt", content: "What changed quietly?" }),
    ];
    expect(getDocumentPlainText(blocks)).toBe(
      "A quoted line.\nA note.\nA task.\nconst x = 1;\nWhat changed quietly?"
    );
  });
});