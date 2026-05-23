/**
 * @file src/lib/journal/queries.ts
 * @description Server-side Supabase query functions for the journal/write app.
 *
 * All functions accept a typed Supabase client created by createClient()
 * from @/lib/supabase. Never instantiate the client inside these functions —
 * always receive it as a parameter so the request/cookie context is preserved.
 *
 * These are read-only functions. For mutations (create, update, delete),
 * see @/lib/journal/mutations.ts.
 *
 * @example
 * // In an Astro page:
 * import { createClient } from "@/lib/supabase";
 * import { getDocuments } from "@/lib/journal/queries";
 *
 * const supabase = createClient({ request: Astro.request, cookies: Astro.cookies });
 * const { data, error } = await getDocuments(supabase, user.id);
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import type { DocumentIndexRow, DocumentWithTags, DocumentWithFolder } from "./types";

/** A typed Supabase client scoped to this project's database schema. */
type TypedSupabaseClient = SupabaseClient<Database>;

//                     __________________________________________________________//
// ─── Folders ````````                                                         //
//      - getFolders, getFolderById - used in the sidebar ____________________ //
// ___________________________________________________________________________//

/**
 * Fetches all folders belonging to a user, ordered by creation date ascending.
 *
 * Used to populate the sidebar folder tree.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param userId - The authenticated user's ID from supabase.auth.getUser().
 * @returns A Supabase response containing an array of Folder rows or an error.
 *
 * @example
 * const { data: folders, error } = await getFolders(supabase, user.id);
 */
export async function getFolders(
  supabase: TypedSupabaseClient,
  userId: string
) {
  return supabase
    .from("folders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });
}

/**
 * Fetches a single folder by ID, verifying it belongs to the requesting user.
 * @param supabase - The typed Supabase client from the current request context.
 * @param folderId - The UUID of the folder to fetch.
 * @param userId - The authenticated user's ID, used to prevent unauthorized access.
 * @returns A Supabase response containing a single Folder row or an error.
 *
 * @example
 * const { data: folder, error } = await getFolderById(supabase, folderId, user.id);
 */
export async function getFolderById(
  supabase: TypedSupabaseClient,
  folderId: string,
  userId: string
) {
  return supabase
    .from("folders")
    .select("*")
    .eq("id", folderId)
    .eq("user_id", userId)
    .single();
}

// `````````````````````````````````````````````````````````````````````^```````//
// ─── Documents (Index / Sidebar) ──────────────────────────────────────*─────//
//      - getDocumentIndex, getDocumentIndexByFolder, getPinnedDocuments  *   //
//        - used in sidebar to populate the sidebar index                  * //
// _____________________________________________________________________*__ //

/**
 * Fetches the lightweight document index for a user's sidebar.
 * - Queries the `document_index` view which only returns id, title, preview,
 *   folder_id, and updated_at — never the full content_blocks JSONB.
 * - This keeps sidebar rendering fast regardless of document size.
 * - Results are ordered by updated_at descending (most recently edited first).
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param userId - The authenticated user's ID.
 * @returns A Supabase response containing an array of DocumentIndexRow or an error.
 *
 * @example
 * const { data: index, error } = await getDocumentIndex(supabase, user.id);
 */
export async function getDocumentIndex(
  supabase: TypedSupabaseClient,
  userId: string
) {
  return supabase
    .from("document_index")
    .select("id, user_id, folder_id, title, preview, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .returns<DocumentIndexRow[]>();
}

/**
 * Fetches the lightweight document index filtered to a specific folder.
 * - Used when the user clicks a folder in the sidebar to show only
 *   documents inside that folder.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param userId - The authenticated user's ID.
 * @param folderId - The UUID of the folder to filter by.
 * @returns A Supabase response containing an array of DocumentIndexRow or an error.
 *
 * @example
 * const { data: docs, error } = await getDocumentIndexByFolder(supabase, user.id, folderId);
 */
export async function getDocumentIndexByFolder(
  supabase: TypedSupabaseClient,
  userId: string,
  folderId: string
) {
  return supabase
    .from("document_index")
    .select("id, user_id, folder_id, title, preview, updated_at")
    .eq("user_id", userId)
    .eq("folder_id", folderId)
    .order("updated_at", { ascending: false })
    .returns<DocumentIndexRow[]>();
}

/**
 * Fetches pinned documents for the sidebar "Pinned" section.
 * - Requires the `pinned` column to exist on the documents table.
 * - Run: ALTER TABLE public.documents ADD COLUMN pinned boolean NOT NULL DEFAULT false;
 * 
 * @param supabase - The typed Supabase client from the current request context.
 * @param userId - The authenticated user's ID.
 * @returns A Supabase response containing an array of DocumentIndexRow or an error.
 *
 * @example
 * const { data: pinned, error } = await getPinnedDocuments(supabase, user.id);
 */
export async function getPinnedDocuments(
  supabase: TypedSupabaseClient,
  userId: string
) {
  return supabase
    .from("documents")
    .select("id, user_id, folder_id, title, preview, updated_at")
    .eq("user_id", userId)
    .eq("pinned", true)
    .order("updated_at", { ascending: false })
    .returns<DocumentIndexRow[]>();
}
// ===========================================================================//
// ─── Documents (Full / Editor)                                           ──//
//      - getDocumentById, getDocumentWithTags, getDocumentWithFolder       //
//      - used in the editor                                               //
// ====================================================================== //

/**
 * Fetches a full document by ID including its content_blocks JSONB.
 *
 * Only call this when opening a document in the editor. Never use this
 * for sidebar listing — use getDocumentIndex() instead.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document to fetch.
 * @param userId - The authenticated user's ID, used to prevent unauthorized access.
 * @returns A Supabase response containing a single Document row or an error.
 *
 * @example
 * const { data: doc, error } = await getDocumentById(supabase, documentId, user.id);
 */
export async function getDocumentById(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string
) {
  return supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .eq("user_id", userId)
    .single();
}

/**
 * Fetches a full document with its tags attached.
 * - used when the editor needs to display or manage tag state alongside
 *    the document content.
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document to fetch.
 * @param userId - The authenticated user's ID.
 * @returns A Supabase response containing a DocumentWithTags or an error.
 *
 * @example
 * const { data: doc, error } = await getDocumentWithTags(supabase, documentId, user.id);
 */
export async function getDocumentWithTags(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string
) {
  return supabase
    .from("documents")
    .select(`
      *,
      tags:document_tag_map(
        tag:tags(*)
      )
    `)
    .eq("id", documentId)
    .eq("user_id", userId)
    .single()
    .returns<DocumentWithTags>();
}

/**
 * Fetches a full document with its parent folder attached.
 * - used in breadcrumb navigation or any view that needs to show:
 *     ~ "Folder / Document title" ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document to fetch.
 * @param userId - The authenticated user's ID.
 * @returns A Supabase response containing a DocumentWithFolder or an error.
 *
 * @example
 * const { data: doc, error } = await getDocumentWithFolder(supabase, documentId, user.id);
 */
export async function getDocumentWithFolder(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string
) {
  return supabase
    .from("documents")
    .select(`
      *,
      folder:folders(*)
    `)
    .eq("id", documentId)
    .eq("user_id", userId)
    .single()
    .returns<DocumentWithFolder>();
}
// ================================================================________________//
// ─── Search ───────────────────────────────────────────────────────────=========//
//      - searchDocuments - used in the sidebar ================================ //
// ========================================================================     //
/**
 * Searches documents by title and preview text using Postgres ILIKE.
 *
 * Searches against the `document_index` view so content_blocks are
 * never loaded during a search. Results are ordered by most recently
 * updated first.
 *
 * For production scale, consider replacing ILIKE with Postgres full-text
 * search (tsvector/tsquery) and adding a GIN index on the plain_text column.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param userId - The authenticated user's ID.
 * @param query - The search string. Wrapped in % wildcards automatically.
 * @returns A Supabase response containing an array of DocumentIndexRow or an error.
 *
 * @example
 * const { data: results, error } = await searchDocuments(supabase, user.id, "chapter one");
 */
export async function searchDocuments(
  supabase: TypedSupabaseClient,
  userId: string,
  query: string
) {
  const term = `%${query}%`;

  return supabase
    .from("document_index")
    .select("id, user_id, folder_id, title, preview, updated_at")
    .eq("user_id", userId)
    .or(`title.ilike.${term},preview.ilike.${term}`)
    .order("updated_at", { ascending: false })
    .returns<DocumentIndexRow[]>();
}

// ============================================================================ //
// ─── Tags ─────────────────────────────────────────────────────────────────────
//      - getTags, getTagsForDocument - used in the editor ==================== //
// ============================================================================ //

/**
 * Fetches all tags belonging to a user, ordered alphabetically.
 *
 * Used to populate the tag picker when editing a document.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param userId - The authenticated user's ID.
 * @returns A Supabase response containing an array of Tag rows or an error.
 *
 * @example
 * const { data: tags, error } = await getTags(supabase, user.id);
 */
export async function getTags(
  supabase: TypedSupabaseClient,
  userId: string
) {
  return supabase
    .from("tags")
    .select("*")
    .eq("user_id", userId)
    .order("name", { ascending: true });
}

/**
 * Fetches all tags attached to a specific document.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param documentId - The UUID of the document.
 * @param userId - The authenticated user's ID (RLS safety).
 * @returns A Supabase response containing an array of Tag rows or an error.
 *
 * @example
 * const { data: tags, error } = await getTagsForDocument(supabase, documentId, user.id);
 */
export async function getTagsForDocument(
  supabase: TypedSupabaseClient,
  documentId: string,
  userId: string
) {
  return supabase
    .from("document_tag_map")
    .select(`
      tag:tags(*)
    `)
    .eq("document_id", documentId)
    .eq("tags.user_id", userId);
}