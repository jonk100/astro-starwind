  // ── Types ────────────────────────────────────────────────────────────────

  /**
   * A single content block as stored in content_blocks in the database.
   * Must match the Block interface in src/lib/journal/types.ts exactly
   * so the saveBlocks action's blockSchema validation passes.
   */
export type { Block } from '@/lib/journal/types';
export type { BlockType } from '@/lib/journal/types';
  /**
   * Minimal Tiptap JSON node shape.
   * The full ProseMirror schema is more complex — this is enough for
   * our converter and type-narrowing.
   */
  export interface TiptapNode {
    type:     string;
    attrs?:   Record<string, unknown>;
    content?: TiptapNode[];
    text?:    string;
  }

  export interface TiptapDoc {
    type:    "doc";
    content: TiptapNode[];
  }
