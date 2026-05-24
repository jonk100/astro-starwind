import { actions } from "astro:actions";

// ─── Constants & Configuration ──────────────────────────────────────────────


/**
 * Debounced autosave function.
 * We use a trailing debounce: each change resets the timer,
 * and the save only happens after the user stops typing for 250ms.
 * @param documentId - The UUID of the document to save.
 * @param title - The new title to save.
 * @returns A promise that resolves when the save is complete.
 */

// Debounced save for the document title
const AUTOSAVE_DEBOUNCE_MS = 250;
let titleSaveTimeout: ReturnType<typeof setTimeout> | null = null;

export function debouncedSaveTitle(documentId: string, title: string) {
  if (titleSaveTimeout) {
    clearTimeout(titleSaveTimeout);
  }

  console.log(`[Editor] Saving title "${title}" for document ${documentId}`);
  titleSaveTimeout = setTimeout(async () => {
    try {
      const { data, error } = await actions.write.updateDocument({
        id: documentId,
        title,
      });
      if (error) {
        throw new Error(error.message);
      }
      console.log("Title saved successfully:", title);
    } catch (error) {
      console.error("Failed to save title:", error);
      // Revert to previous state? (optional)
    } finally {
      titleSaveTimeout = null;
    }
  }, AUTOSAVE_DEBOUNCE_MS);
}