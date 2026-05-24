// |```````````````````````````````````````````````````````\
////|   PREPARE NOTES FOR SIDEBAR LIST                      \
// |________________________________________________________|
import type { DocumentIndexRow } from "@/lib/journal/types";

//! - the function takes 'documents' as an argument
export function sortDocumentsForSidebar(documents: DocumentIndexRow[]) {

  //! 1. Define comparison, get the date and pinned state
  function compareDocuments(a: DocumentIndexRow, b: DocumentIndexRow) {
    if (a.pinned === b.pinned) {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
    return a.pinned ? -1 : 1;
  }

  //! 2. Do the sorting and return the result
  return [...documents].sort(compareDocuments);
}

//! Pass the sortedArguments to this function
export function groupDocumentsByFolder(documents: DocumentIndexRow[]) {
  const byFolder = new Map<string | null, DocumentIndexRow[]>();
  for (const doc of documents) {
    const key = doc.folder_id ?? null;
    if (!byFolder.has(key)) {
      byFolder.set(key, []);
    }
    byFolder.get(key)!.push(doc);
  }
  // Grab the ones with no folder
  const unfiledDocs = byFolder.get(null) ?? [];
  //! Return both pieces of data as an object so your Astro file can use them
  return { 
    byFolder: byFolder, 
    unfiledDocs: unfiledDocs 
  };
}

/** 
 *! Format an ISO timestamp into a human-readable relative date label.
 *! - used in the document list items.
 * @param iso - An ISO 8601 date string from the database.
 * @returns A short label like "Today", "Yesterday", or "12 May".
 */
export function formatUpdatedAt(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  if (isToday) return "Today";
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
  if (isYesterday) return "Yesterday";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}