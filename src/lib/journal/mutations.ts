/**
 * @file src/lib/journal/mutations.ts
 * @description Server-side Supabase mutation functions for the journal/write app.
 *
 * All functions accept a typed Supabase client created by createClient()
 * from @/lib/supabase. Never instantiate the client inside these functions —
 * always receive it as a parameter so the request/cookie context is preserved.
 *
 * These are write-only functions. For reads, see @/lib/journal/queries.ts.
 * These functions are called exclusively from @/actions/journal.actions.ts —
 * never call them directly from an Astro page or component.
 *
 * @example
 * // In an Astro Action handler:
 * import { createDocument } from "@/lib/journal/mutations";
 *
 * const { data, error } = await createDocument(supabase, {
 *   user_id: user.id,
 *   title: "Untitled",
 *   content_blocks: [],
 * });
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/types/supabase";
import type { NewFolder, FolderUpdate, NewDocument, DocumentUpdate, NewTag } from "./types";

/** A typed Supabase client scoped to this project's database schema. */
type TypedSupabaseClient = SupabaseClient<Database>;

// ─── Folders ──────────────────────────────────────────────────────────────────

export async function archiveFolder(
  supabase: TypedSupabaseClient,
  folderId: string,
  userId: string
  ) {
  return supabase
    .from("folders")
    .update({ is_archived: true })
    .eq("id", folderId)
    .eq("user_id", userId)
    .select()
    .single();
}

export async function unarchiveFolder(
  supabase: TypedSupabaseClient,
  folderId: string,
  userId: string
) {
  return supabase
    .from("folders")
    .update({ is_archived: false })
    .eq("id", folderId)
    .eq("user_id", userId)
    .select()
    .single();
} 

/**
 * Creates a new folder for a user.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param data - The folder fields to insert. Must include user_id and name.
 * @returns A Supabase response containing the created Folder row or an error.
 *
 * @example
 * const { data, error } = await createFolder(supabase, {
 *   user_id: user.id,
 *   name: "Chapter Notes",
 * });
 */
export async function createFolder(
  supabase: TypedSupabaseClient,
  data: NewFolder
) {
  return supabase
    .from("folders")
    .insert(data)
    .select()
    .single();
}

/**
 * Updates an existing folder by ID.
 *
 * Only updates folders that belong to the given user — the user_id
 * check is a second layer of safety on top of RLS.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param folderId - The UUID of the folder to update.
 * @param userId - The authenticated user's ID.
 * @param updates - The fields to update on the folder (name, icon, etc.).
 * @returns A Supabase response containing the updated Folder row or an error.
 *
 * @example
 * const { data, error } = await updateFolder(supabase, folderId, user.id, {
 *   name: "Act One",
 * });
 */
export async function updateFolder(
  supabase: TypedSupabaseClient,
  folderId: string,
  userId: string,
  updates: FolderUpdate
) {
  return supabase
    .from("folders")
    .update(updates)
    .eq("id", folderId)
    .eq("user_id", userId)
    .select()
    .single();
}

/**
 * Deletes a folder by ID.
 *
 * Documents inside the folder are NOT deleted — their folder_id is set to
 * NULL by the ON DELETE SET NULL constraint on the documents table.
 * They remain accessible in the sidebar under "All Documents".
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param folderId - The UUID of the folder to delete.
 * @param userId - The authenticated user's ID.
 * @returns A Supabase response with no data (void delete) or an error.
 *
 * @example
 * const { error } = await deleteFolder(supabase, folderId, user.id);
 */
export async function deleteFolder(
  supabase: TypedSupabaseClient,
  folderId: string,
  userId: string
) {
  return supabase
    .from("folders")
    .delete()
    .eq("id", folderId)
    .eq("user_id", userId);
}

// ─── Documents ────────────────────────────────────────────────────────────────

export async function archiveDocument(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string
  ) {
  return supabase
    .from("documents")
    .update({ is_archived: true })
    .eq("id", documentId)
    .eq("user_id", userId)
    .select()
    .single();
}

export async function unarchiveDocument(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string
) {
  return supabase
    .from("documents")
    .update({ is_archived: false })
    .eq("id", documentId)
    .eq("user_id", userId)
    .select()
    .single();
}

export async function duplicateDocument(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string
) {
  // 1. Fetch original
  const { data: original, error: fetchError } = await supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .eq("user_id", userId)
    .single();

  if (fetchError) return { data: null, error: fetchError };

  // 2. Insert new document
  const { data: copy, error: insertError } = await supabase
    .from("documents")
    .insert({
      user_id: userId,
      title: original.title + " (copy)",
      folder_id: original.folder_id,
      pinned: false,
      is_archived: false,
      preview: original.preview,
      content_blocks: original.content_blocks,
    })
    .select()
    .single();

  if (insertError) return { data: null, error: insertError };

  return { data: copy, error: null };
}



/**
 * Creates a new document for a user.
 *
 * Called when the user clicks "New Document". The initial state is a
 * blank document with an empty block array and a default title of "Untitled".
 * The editor takes over from there.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param data - The document fields to insert. Must include user_id.
 * @returns A Supabase response containing the created Document row or an error.
 *
 * @example
 * const { data, error } = await createDocument(supabase, {
 *   user_id: user.id,
 *   title: "Untitled",
 *   content_blocks: [],
 *   folder_id: null,
 * });
 */
export async function createDocument(
  supabase: TypedSupabaseClient,
  data: NewDocument
) {
  return supabase
    .from("documents")
    .insert(data)
    .select()
    .single();
}

/**
 * Updates an existing document by ID.
 *
 * This is the general-purpose update used for title changes, folder moves,
 * and pinning. For content updates during editing, prefer updateDocumentBlocks()
 * which is scoped to only the content_blocks and preview columns.
 *
 * Only updates documents that belong to the given user.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document to update.
 * @param userId - The authenticated user's ID.
 * @param updates - The fields to update on the document.
 * @returns A Supabase response containing the updated Document row or an error.
 *
 * @example
 * const { data, error } = await updateDocument(supabase, documentId, user.id, {
 *   title: "Chapter One",
 *   folder_id: someFolderId,
 * });
 */
export async function updateDocument(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string,
  updates: DocumentUpdate
) {
  return supabase
    .from("documents")
    .update(updates)
    .eq("id", documentId)
    .eq("user_id", userId)
    .select()
    .single();
}

/**
 * Updates only the content_blocks and preview of a document.
 *
 * This is the hot path called by the editor's debounced autosave —
 * it only touches the two columns that change during writing, keeping
 * the payload small and the update fast.
 *
 * The preview is a plain-text excerpt extracted from the first non-empty
 * paragraph block. It is generated by the action before calling this function.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document to update.
 * @param userId - The authenticated user's ID.
 * @param contentBlocks - The full serialised block array as a JSON-compatible value.
 * @param preview - A short plain-text excerpt for the sidebar, or null.
 * @returns A Supabase response containing the updated Document row or an error.
 *
 * @example
 * const { data, error } = await updateDocumentBlocks(
 *   supabase,
 *   documentId,
 *   user.id,
 *   blocks,      // Block[] cast to Json
 *   "The rain had stopped by the time..."
 * );
 */
export async function updateDocumentBlocks(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string,
  contentBlocks: Json,
  preview: string | null
) {
  return supabase
    .from("documents")
    .update({
      content_blocks: contentBlocks,
      preview,
      // updated_at is handled by Supabase automatically if you have
      // a trigger on the table, or you can set it explicitly here:
      updated_at: new Date().toISOString(),
    })
    .eq("id", documentId)
    .eq("user_id", userId)
    .select()
    .single();
}

/**
 * Deletes a document by ID, including all its tag associations.
 *
 * Tag associations in document_tag_map are removed automatically by the
 * ON DELETE CASCADE constraint on document_tag_map.document_id.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document to delete.
 * @param userId - The authenticated user's ID.
 * @returns A Supabase response with no data (void delete) or an error.
 *
 * @example
 * const { error } = await deleteDocument(supabase, documentId, user.id);
 */
export async function deleteDocument(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string
) {
  return supabase
    .from("documents")
    .delete()
    .eq("id", documentId)
    .eq("user_id", userId);
}

/**
 * Moves a document to a different folder, or removes it from any folder.
 *
 * A thin wrapper around updateDocument() that makes the intent explicit
 * at the call site. Passing null for folderId moves the document to the
 * root (no folder).
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document to move.
 * @param userId - The authenticated user's ID.
 * @param folderId - The UUID of the destination folder, or null for root.
 * @returns A Supabase response containing the updated Document row or an error.
 *
 * @example
 * // Move to a folder
 * await moveDocument(supabase, documentId, user.id, targetFolderId);
 *
 * // Move to root (no folder)
 * await moveDocument(supabase, documentId, user.id, null);
 */
export async function moveDocument(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string,
  folderId: string | null
) {
  return updateDocument(supabase, documentId, userId, { folder_id: folderId });
}

/**
 * Toggles the pinned state of a document.
 *
 * Requires the `pinned` column to exist on the documents table.
 * Run: ALTER TABLE public.documents ADD COLUMN pinned boolean NOT NULL DEFAULT false;
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document to pin or unpin.
 * @param userId - The authenticated user's ID.
 * @param pinned - True to pin, false to unpin.
 * @returns A Supabase response containing the updated Document row or an error.
 *
 * @example
 * const { data, error } = await pinDocument(supabase, documentId, user.id, true);
 */
export async function pinDocument(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string,
  pinned: boolean
) {
  return updateDocument(supabase, documentId, userId, { pinned });
}

// ─── Tags ─────────────────────────────────────────────────────────────────────

/**
 * Creates a new tag for a user.
 *
 * The (user_id, name) pair has a UNIQUE constraint in the database,
 * so attempting to create a duplicate tag will return a Postgres error.
 * Handle this in the action layer by checking for error code "23505".
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param data - The tag fields to insert. Must include user_id and name.
 * @returns A Supabase response containing the created Tag row or an error.
 *
 * @example
 * const { data, error } = await createTag(supabase, {
 *   user_id: user.id,
 *   name: "fiction",
 *   color: "#e8c547",
 * });
 */
export async function createTag(
  supabase: TypedSupabaseClient,
  data: NewTag
) {
  return supabase
    .from("tags")
    .insert(data)
    .select()
    .single();
}

/**
 * Deletes a tag by ID.
 *
 * Junction rows in document_tag_map are removed automatically by the
 * ON DELETE CASCADE constraint on document_tag_map.tag_id.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param tagId - The UUID of the tag to delete.
 * @param userId - The authenticated user's ID.
 * @returns A Supabase response with no data (void delete) or an error.
 *
 * @example
 * const { error } = await deleteTag(supabase, tagId, user.id);
 */
export async function deleteTag(
  supabase: TypedSupabaseClient,
  tagId: string,
  userId: string
) {
  return supabase
    .from("tags")
    .delete()
    .eq("id", tagId)
    .eq("user_id", userId);
}

// ─── Document–Tag Associations ────────────────────────────────────────────────

/**
 * Attaches a tag to a document by inserting into the junction table.
 *
 * The (document_id, tag_id) pair is the primary key, so calling this
 * twice with the same pair will return a Postgres error. Check for that
 * in the action if needed, or use addTagToDocumentSafe() which ignores
 * conflicts.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document.
 * @param tagId - The UUID of the tag to attach.
 * @returns A Supabase response with no data or an error.
 *
 * @example
 * const { error } = await addTagToDocument(supabase, documentId, tagId);
 */
export async function addTagToDocument(
  supabase: TypedSupabaseClient,
  documentId: string,
  tagId: string
) {
  return supabase
    .from("document_tag_map")
    .insert({ document_id: documentId, tag_id: tagId });
}

/**
 * Attaches a tag to a document, ignoring conflicts if the association
 * already exists. Safe to call without pre-checking.
 *
 * Uses Postgres ON CONFLICT DO NOTHING via Supabase's upsert with
 * ignoreDuplicates: true.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document.
 * @param tagId - The UUID of the tag to attach.
 * @returns A Supabase response with no data or an error.
 *
 * @example
 * const { error } = await addTagToDocumentSafe(supabase, documentId, tagId);
 */
export async function addTagToDocumentSafe(
  supabase: TypedSupabaseClient,
  documentId: string,
  tagId: string
) {
  return supabase
    .from("document_tag_map")
    .upsert(
      { document_id: documentId, tag_id: tagId },
      { ignoreDuplicates: true }
    );
}

/**
 * Removes a tag from a document by deleting the junction row.
 *
 * Does not delete the tag itself — only the association between
 * this document and this tag.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document.
 * @param tagId - The UUID of the tag to detach.
 * @returns A Supabase response with no data or an error.
 *
 * @example
 * const { error } = await removeTagFromDocument(supabase, documentId, tagId);
 */
export async function removeTagFromDocument(
  supabase: TypedSupabaseClient,
  documentId: string,
  tagId: string
) {
  return supabase
    .from("document_tag_map")
    .delete()
    .eq("document_id", documentId)
    .eq("tag_id", tagId);
}

/**
 * Replaces all tags on a document with a new set.
 *
 * Deletes all existing associations then inserts the new ones in a
 * sequential operation. Not atomic — if the insert fails after the delete,
 * the document will have no tags. For production, consider wrapping this
 * in a Postgres function (RPC) to make it transactional.
 *
 * Pass an empty array to clear all tags from a document.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document.
 * @param tagIds - Array of tag UUIDs to attach. Empty array removes all tags.
 * @returns An object with an optional error if either operation failed.
 *
 * @example
 * // Replace tags entirely
 * const { error } = await setDocumentTags(supabase, documentId, [tagId1, tagId2]);
 *
 * // Clear all tags
 * const { error } = await setDocumentTags(supabase, documentId, []);
 */
export async function setDocumentTags(
  supabase: TypedSupabaseClient,
  documentId: string,
  tagIds: string[]
) {
  // Step 1: remove all existing associations for this document
  const { error: deleteError } = await supabase
    .from("document_tag_map")
    .delete()
    .eq("document_id", documentId);

  if (deleteError) {
    return { error: deleteError };
  }

  // Step 2: if no new tags, we're done
  if (tagIds.length === 0) {
    return { error: null };
  }

  // Step 3: insert the new associations
  const rows = tagIds.map((tagId) => ({
    document_id: documentId,
    tag_id: tagId,
  }));

  const { error: insertError } = await supabase
    .from("document_tag_map")
    .insert(rows);

  return { error: insertError };
}