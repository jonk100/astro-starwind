/**
 * @file src/lib/journal/types.ts
 * @description Domain types for the journal/write app, derived from the
 * generated Supabase database schema. Never hand-write these shapes —
 * always derive from Tables<> so they stay in sync with the database.
 *
 * Run `pnpm db:types` after any schema change to regenerate @/types/supabase.
 */

import type { Tables, TablesInsert, TablesUpdate } from "@/types/supabase";

// ─── Row Types ────────────────────────────────────────────────────────────────

/** A folder record as returned from the database. */
export type Folder = Tables<"folders">;

/** A document record as returned from the database. */
export type Document = Tables<"documents">;

/** A tag record as returned from the database. */
export type Tag = Tables<"tags">;

/** A document-tag junction row as returned from the database. */
export type DocumentTagMap = Tables<"document_tag_map">;

// ─── Mutation Types ───────────────────────────────────────────────────────────

/** Shape required to insert a new folder. */
export type NewFolder = TablesInsert<"folders">;

/** Shape required to insert a new document. */
export type NewDocument = TablesInsert<"documents">;

/** Shape required to insert a new tag. */
export type NewTag = TablesInsert<"tags">;

/** Shape for updating an existing folder. */
export type FolderUpdate = TablesUpdate<"folders">;

/** Shape for updating an existing document. */
export type DocumentUpdate = TablesUpdate<"documents">;

/** Shape for updating an existing tag. */
export type TagUpdate = TablesUpdate<"tags">;

// ─── Block Types ──────────────────────────────────────────────────────────────

/**
 * The supported block types in the editor canvas.
 *
 * Only blocks that materially improve writing are included.
 * Do not add complex structural types (databases, embeds, etc.)
 * without a clear writing use case.
 */
export type BlockType =
  | "paragraph"
  | "heading"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "heading-5"
  | "quote"
  | "separator"
  | "checklist"
  | "callout"
  | "callout-info"
  | "callout-warning"
  | "callout-success"
  | "callout-danger"
  | "code"
  | "prompt"
  | "list"
  | "list-item";

/**
 * A single content block stored inside a document's `content_blocks` JSONB column.
 *
 * Blocks are the unit of editing — each has a stable ID, a type, and a content string.
 * Additional metadata (e.g. heading level, checklist checked state) lives in `meta`.
 *
 * @example
 * {
 *   id: "b_01j...",
 *   type: "heading",
 *   content: "Chapter One",
 *   meta: { level: 1 }
 * }
 */
export interface Block {
  id: string;
  type: BlockType;
  /** 
   * Change: Content should now store HTML or TipTap JSON fragments 
   * to preserve inline marks like bold, italic, and text colors. 
   */
  content: string; 
  meta?: {
    // Existing fields
    level?: number;     // For headings [1]
    checked?: boolean;   // For checklists [3]
    // New fields for the toolbar [4]
    fontFamily?: string; 
    fontSize?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    className?: string;  // For custom callout or block styles
  } & Record<string, unknown>;
}

// ─── Composed Types ───────────────────────────────────────────────────────────==//
//     - DocumentWithTags, DocumentWithFolder - used in the sidebar ============= //
//       to provide context for the editor and document detail views =========== //
// ============================================================================ //

/**
 * A document with its tags attached, used when rendering the
 * editor or a document detail view.
 */
export type DocumentWithTags = Document & {
  tags: Tag[];
};

/**
 * A document with its parent folder attached, used in breadcrumb
 * navigation or when the sidebar needs folder context alongside the doc.
 */
export type DocumentWithFolder = Document & {
  folder: Folder | null;
};

/**
 * The lightweight document shape returned by the `document_index` view.
 * Used exclusively for the sidebar — never load full content_blocks here.
 *
 * This type is hand-written because `document_index` is a view and
 * Supabase's type generator may not include it in Tables<>.
 */
export interface DocumentIndexRow {
  id: string;
  user_id: string;
  folder_id: string | null;
  title: string;
  preview: string | null;
  updated_at: string;
  pinned: boolean;
  is_archived: boolean;
}

// ─── UI State Types ───────────────────────────────────────────────────────────= //
//     - EditorState, ParsedBlocks - used in the editor and preview ============= //
//       to keep the editor in sync with the database - client-side only ======= //
// ============================================================================ //
/**
 * The state of the editor for a single open document.
 * Held in memory on the client — not persisted directly.
 */
export interface EditorState {
  /** The ID of the document currently open. */
  documentId: string;
  /** The live block array being edited. */
  blocks: Block[];
  /** Whether unsaved changes exist (debounce window is open). */
  isDirty: boolean;
  /** Whether an autosave is currently in flight. */
  isSaving: boolean;
  /** ISO timestamp of the last successful save. */
  lastSavedAt: string | null;
}

/**
 * The result of parsing `content_blocks` from the database.
 * Wraps the raw JSONB parse so callers always get a typed Block[].
 */
export type ParsedBlocks =
  | { ok: true; blocks: Block[] }
  | { ok: false; error: string };

  // Add these to src/lib/journal/types.ts
export type BlockTag = "p" | "h1" | "h2" | "blockquote" | "hr";

export function blockTag(block: Block): BlockTag {
  switch (block.type) {
    case "heading":
      return block.meta?.level === 1 ? "h1" : "h2";
    case "quote":
      return "blockquote";
    case "separator":
      return "hr";
    default:
      return "p";
  }
}

export function blockClass(type: Block["type"]): string {
  return `editor-block editor-block--${type}`;
}

