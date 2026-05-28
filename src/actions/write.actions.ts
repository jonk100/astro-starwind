/**
 * @file src/actions/write.actions.ts
 * @description Astro Actions for the journal/write app.
 *
 * These are the only entry points for journal data mutations from the client.
 * Each action validates its input with Zod, verifies the user session,
 * and delegates to the appropriate mutation function in @/lib/journal/mutations.
 *
 * Actions are registered in src/actions/index.ts under the `journal` key.
 *
 * @example
 * // In a client-side script:
 * import { actions } from "astro:actions";
 *
 * const { data, error } = await actions.journal.createDocument({
 *   title: "Untitled",
 *   folder_id: null,
 * });
 */
//. Actions list:___________________________________________________________________________________________
//*                                                                                                    |
//*      [ archiveFolder ]    |  [ unarchiveFolder ] \ [createFolder]  [updateFolder]  [deleteFolder] |
//*    [ archiveDocument ]   |  [ unarchiveDocument ] \    [createDocument]      [updateDocument]    |
//*   [duplicateDocument]   |  [createTag][deleteTag]  \   [ pinDocument ]       [moveDocument]     |
//* [addTagToDocumentSafe] | [removeTagFromDocument]   | [setDocumentTags]    [deleteDocument]     |
//*_______________________________________________________________________________________________|

import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { createClient } from "@/lib/supabase";
import {
  createFolder,
  updateFolder,
  deleteFolder,
  createDocument,
  updateDocument,
  updateDocumentBlocks,
  deleteDocument,
  moveDocument,
  pinDocument,
  createTag,
  deleteTag,
  addTagToDocumentSafe,
  removeTagFromDocument,
  setDocumentTags,
  archiveFolder,
  unarchiveFolder,
  archiveDocument,
  unarchiveDocument,
  duplicateDocument,
} from "@/lib/journal/mutations";
import type { Json } from "@/types/supabase";
import type { Block } from "@/lib/journal/types";
import { searchDocuments} from "@/lib/journal/queries";

// ─── Session Helper ───────────────────────────────────────────────────────────

import { getAuthenticatedUser } from "./action.utils";
import { upsertHabitLog } from "@/lib/habit/mutations";
import { recalculateStreak } from "@/lib/habit/streak";

// ─── Block Helpers ────────────────────────────────────────────────────────────

/**
 * Extracts a plain-text preview string from a block array.
 *
 * Walks the blocks in order and returns the content of the first
 * non-empty paragraph or heading block, trimmed to 200 characters.
 * Returns null if no suitable block is found (e.g. empty document).
 *
 * This preview is stored alongside the document and shown in the
 * sidebar — it must never contain markup or block syntax.
 *
 * @param blocks - The array of Block objects from the editor.
 * @returns A plain-text preview string, or null if the document is empty.
 */
function extractPreviewText(nodes: any[]): string {
  if (!nodes || !Array.isArray(nodes)) return "";
  return nodes
    .map((node) => {
      if (node.type === "text") return node.text ?? "";
      if (node.content) return extractPreviewText(node.content);
      return "";
    })
    .join("");
}

function extractPreview(blocks: Block[]): string | null {
  for (const block of blocks) {
    if (
      (block.type === "paragraph" || block.type === "heading") &&
      block.content.trim().length > 0
    ) {
      try {
        const parsed = JSON.parse(block.content);
        if (parsed && Array.isArray(parsed.content)) {
          const text = extractPreviewText(parsed.content);
          if (text.trim().length > 0) {
            return text.trim().slice(0, 200);
          }
        }
      } catch (e) {
        // Fallback to raw content if not a valid JSON string
        if (block.content.trim().length > 0) {
          return block.content.trim().slice(0, 200);
        }
      }
    }
  }
  return null;
}

// ─── Shared Schemas ───────────────────────────────────────────────────────────

/**
 * Zod schema for a single content block sent from the editor.
 *
 * Matches the Block interface in @/lib/journal/types.ts.
 * The meta field is an open record since different block types
 * store different metadata shapes.
 */
const blockSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    "paragraph",
    "heading",
    "heading-1",
    "heading-2",
    "heading-3",
    "heading-4",
    "heading-5",
    "quote",
    "separator",
    "checklist",
    "callout",
    "callout-info",
    "callout-warning",
    "callout-success",
    "callout-danger",
    "code",
    "prompt",
    "list",
    "list-item"
  ]),
  content: z.string(),
  meta: z.record(z.string(), z.unknown()).optional(),
});


/** A validated array of content blocks from the editor. */
const blocksSchema = z.array(blockSchema);

// ─── Journal Actions ──────────────────────────────────────────────────────────

export const write = {

  search: defineAction({
    input: z.object({ query: z.string().min(1).max(200) }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);
      const { data, error } = await searchDocuments(supabase, user.id, input.query);
      if (error) throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
      return data;
    },
  }),

  // ── Folder Actions ──────────────────────────────────────────────────────────

  
  archiveFolder: defineAction({
    input: z.object({
      id: z.string().uuid("Invalid folder ID"),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { error } = await updateFolder(supabase, input.id, user.id, {
        is_archived: true,
      });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    },
  }),


  unarchiveFolder: defineAction({
    input: z.object({
      id: z.string().uuid("Invalid folder ID"),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { error } = await updateFolder(supabase, input.id, user.id, {
        is_archived: false,
      });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    },
  }),



  /**
   * Creates a new folder for the authenticated user.
   *
   * @input name - The display name of the folder.
   * @input icon - Optional emoji or icon identifier.
   */
  createFolder: defineAction({
    input: z.object({
      name: z.string().min(1).max(100),
      icon: z.string().max(10).optional(),
      parent_id: z.string().uuid().nullable().optional(),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { data, error } = await createFolder(supabase, {
        user_id: user.id,
        name: input.name,
        icon: input.icon ?? null,
        parent_id: input.parent_id ?? null,
      });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    },
  }),


  /**
   * Renames an existing folder.
   *
   * @input id - The UUID of the folder to update.
   * @input name - The new display name.
   * @input icon - Optional new icon.
   */
  updateFolder: defineAction({
    input: z.object({
      id: z.uuid("Invalid folder ID"),
      name: z.string().min(1).max(100).optional(),
      icon: z.string().max(10).optional(),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { id, ...updates } = input;

      const { data, error } = await updateFolder(supabase, id, user.id, updates);

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    },
  }),

  /**
   * Deletes a folder. Documents inside are moved to root (folder_id = null),
   * not deleted — this is enforced by the ON DELETE SET NULL constraint.
   *
   * @input id - The UUID of the folder to delete.
   */
  deleteFolder: defineAction({
    input: z.object({
      id: z.string().uuid("Invalid folder ID"),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { error } = await deleteFolder(supabase, input.id, user.id);

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    },
  }),

  /**
   * 
   */

  // ── Document Actions ────────────────────────────────────────────────────────

  archiveDocument: defineAction({
    input: z.object({
      id: z.string().uuid("Invalid document ID"),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { error } = await updateDocument(supabase, input.id, user.id, {
        is_archived: true,
      });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    },
  }),


  unarchiveDocument: defineAction({
    input: z.object({
      id: z.string().uuid("Invalid document ID"),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { error } = await updateDocument(supabase, input.id, user.id, {
        is_archived: false,
      });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    },
  }),


  duplicateDocument: defineAction({
    input: z.object({
      id: z.string().uuid("Invalid document ID"),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { data, error } = await duplicateDocument(supabase, input.id, user.id);

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    },
  }),




  /**
   * Creates a new blank document for the authenticated user.
   *
   * The document starts with an empty block array and an "Untitled" title.
   * The client should immediately redirect to the editor page for this document.
   *
   * @input folder_id - Optional UUID of the folder to place the document in.
   * @input title - Optional initial title. Defaults to "Untitled".
   */
  createDocument: defineAction({
    input: z.object({
      folder_id: z.string().uuid().nullable().optional(),
      title: z.string().max(255).optional(),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { data, error } = await createDocument(supabase, {
        user_id: user.id,
        folder_id: input.folder_id ?? null,
        title: input.title ?? "Untitled",
        content_blocks: [
          { id: crypto.randomUUID(), type: "paragraph", content: "" }
        ] as unknown as Json,
        preview: null,
      });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    },
  }),

  /**
   * Updates document metadata (title, folder, pinned state).
   *
   * Do NOT use this for content changes during editing — use saveBlocks
   * instead, which is scoped to the content columns and runs on the
   * autosave debounce.
   *
   * @input id - The UUID of the document to update.
   * @input title - Optional new title.
   * @input folder_id - Optional new folder UUID, or null to move to root.
   * @input pinned - Optional new pinned state.
   */
  updateDocument: defineAction({
    input: z.object({
      id: z.uuid("Invalid document ID"),
      title: z.string().min(1).max(255).optional(),
      folder_id: z.uuid().nullable().optional(),
      pinned: z.boolean().optional(),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { id, ...updates } = input;

      // Clean up undefined properties so they don't corrupt the Supabase update statement
      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined)
      );

      const { data, error } = await updateDocument(supabase, id, user.id, cleanUpdates);

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    },
  }),

  /**
   * Saves the current block state of a document.
   *
   * This is the autosave action — called by the editor on a 250ms debounce
   * after every change. It validates the block array, extracts a preview
   * from the first readable block, and writes only content_blocks, preview,
   * and updated_at to the database.
   *
   * Returns only id and updated_at to keep the response payload minimal.
   *
   * @input document_id - The UUID of the document being edited.
   * @input blocks - The full current block array from the editor.
   */
  saveBlocks: defineAction({
    input: z.object({
      document_id: z.string().uuid("Invalid document ID"),
      blocks: blocksSchema,
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const preview = extractPreview(input.blocks);

      const { data, error } = await updateDocumentBlocks(
        supabase,
        input.document_id,
        user.id,
        // Cast to Json so TypeScript knows this is compatible with the
        // Supabase jsonb column. Safe at runtime — Block[] is plain JSON.
        input.blocks as unknown as Json,
        preview
      );

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      // Auto-mark journaling/writing habit as complete for today
      try {
        const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
        const { data: habits } = await supabase
          .from("habits")
          .select("id, name, tracking_type")
          .eq("user_id", user.id);

        if (habits && habits.length > 0) {
          const targetHabit = habits.find(h => {
            const nameLower = h.name.toLowerCase();
            return nameLower === "write" || nameLower === "writing" || nameLower === "journaling" || nameLower === "journal";
          });

          if (targetHabit) {
            console.log(`[saveBlocks] Auto-marking habit '${targetHabit.name}' completed for today (${today})`);
            await upsertHabitLog(supabase, {
              habit_id: targetHabit.id,
              entry_date: today,
              value: 1, // Default check or count
              note: "Completed automatically via Journal entry save",
              user_id: user.id,
            });
            await recalculateStreak(supabase, targetHabit.id, user.id, today);
          }
        }
      } catch (err) {
        console.error("[saveBlocks] Failed to auto-mark writing habit:", err);
      }

      return data;
    },
  }),

  /**
   * Deletes a document and all its tag associations.
   *
   * Tag associations are removed by ON DELETE CASCADE on document_tag_map.
   * This action cannot be undone.
   *
   * @input id - The UUID of the document to delete.
   */
  deleteDocument: defineAction({
    input: z.object({
      id: z.string().uuid("Invalid document ID"),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { error } = await deleteDocument(supabase, input.id, user.id);

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    },
  }),

  /**
   * Moves a document to a different folder, or to root if folder_id is null.
   *
   * @input document_id - The UUID of the document to move.
   * @input folder_id - The destination folder UUID, or null for root.
   */
  moveDocument: defineAction({
    input: z.object({
      document_id: z.string().uuid("Invalid document ID"),
      folder_id: z.string().uuid().nullable(),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { data, error } = await moveDocument(
        supabase,
        input.document_id,
        user.id,
        input.folder_id
      );

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    },
  }),

  /**
   * Pins or unpins a document.
   *
   * Pinned documents appear in the sidebar "Pinned" section regardless
   * of which folder they belong to.
   *
   * @input document_id - The UUID of the document to pin or unpin.
   * @input pinned - True to pin, false to unpin.
   */
  pinDocument: defineAction({
    input: z.object({
      document_id: z.string().uuid("Invalid document ID"),
      pinned: z.boolean(),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { data, error } = await pinDocument(
        supabase,
        input.document_id,
        user.id,
        input.pinned
      );

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    },
  }),

  // ── Tag Actions ─────────────────────────────────────────────────────────────

  /**
   * Creates a new tag for the authenticated user.
   *
   * The (user_id, name) pair must be unique. If a tag with this name already
   * exists, Supabase returns error code "23505" (unique_violation).
   *
   * @input name - The tag label. Must be unique per user.
   * @input color - Optional hex color string for the tag pill UI.
   */
  createTag: defineAction({
    input: z.object({
      name: z.string().min(1, "Tag name is required").max(50),
      color: z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/, "Color must be a valid hex code e.g. #e8c547")
        .optional(),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { data, error } = await createTag(supabase, {
        user_id: user.id,
        name: input.name,
        color: input.color ?? null,
      });

      if (error) {
        // Postgres unique_violation — tag name already exists for this user
        if (error.code === "23505") {
          throw new ActionError({
            code: "CONFLICT",
            message: `You already have a tag named "${input.name}".`,
          });
        }

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    },
  }),

  /**
   * Deletes a tag and removes it from all documents automatically
   * via ON DELETE CASCADE on document_tag_map.
   *
   * @input id - The UUID of the tag to delete.
   */
  deleteTag: defineAction({
    input: z.object({
      id: z.string().uuid("Invalid tag ID"),
    }),
    handler: async (input, context) => {
      const { supabase, user } = await getAuthenticatedUser(context);

      const { error } = await deleteTag(supabase, input.id, user.id);

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    },
  }),

  /**
   * Adds a single tag to a document.
   *
   * Safe to call even if the association already exists — duplicate
   * associations are silently ignored.
   *
   * @input document_id - The UUID of the document.
   * @input tag_id - The UUID of the tag to attach.
   */
  addTagToDocument: defineAction({
    input: z.object({
      document_id: z.string().uuid("Invalid document ID"),
      tag_id: z.string().uuid("Invalid tag ID"),
    }),
    handler: async (input, context) => {
      await getAuthenticatedUser(context);

      const { supabase } = await getAuthenticatedUser(context);

      const { error } = await addTagToDocumentSafe(
        supabase,
        input.document_id,
        input.tag_id
      );

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    },
  }),

  /**
   * Removes a single tag from a document.
   *
   * Does not delete the tag — only removes the association.
   *
   * @input document_id - The UUID of the document.
   * @input tag_id - The UUID of the tag to detach.
   */
  removeTagFromDocument: defineAction({
    input: z.object({
      document_id: z.string().uuid("Invalid document ID"),
      tag_id: z.string().uuid("Invalid tag ID"),
    }),
    handler: async (input, context) => {
      const { supabase } = await getAuthenticatedUser(context);

      const { error } = await removeTagFromDocument(
        supabase,
        input.document_id,
        input.tag_id
      );

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    },
  }),

  /**
   * Replaces all tags on a document with a new set in one operation.
   *
   * Use this when the user closes a tag picker and you want to sync
   * the full selected state rather than tracking individual add/remove events.
   *
   * Pass an empty array to clear all tags.
   *
   * @input document_id - The UUID of the document.
   * @input tag_ids - The complete new set of tag UUIDs to attach.
   */
  setDocumentTags: defineAction({
    input: z.object({
      document_id: z.string().uuid("Invalid document ID"),
      tag_ids: z.array(z.string().uuid("Invalid tag ID")),
    }),
    handler: async (input, context) => {
      const { supabase } = await getAuthenticatedUser(context);

      const { error } = await setDocumentTags(
        supabase,
        input.document_id,
        input.tag_ids
      );

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return { success: true };
    },
  }),
};