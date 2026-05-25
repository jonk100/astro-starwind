// src/stores/editor.ts
import { map, computed } from 'nanostores';
import type { Block } from '@/lib/journal/types';
import { actions } from 'astro:actions';
import { extractPreview } from '@/lib/journal/utils';

export interface EditorState {
  documentId: string | null;
  title: string;
  blocks: Block[];
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;
}

export const editorStore = map<EditorState>({
  documentId: null,
  title: '',
  blocks: [],
  isDirty: false,
  isSaving: false,
  lastSavedAt: null,
});

// ─── Computed ─────────────────────────────────────────────────────────────────

export const documentPreview = computed(editorStore, (s) =>
  extractPreview(s.blocks)
);

export const wordCount = computed(editorStore, (s) =>
  s.blocks.reduce((acc, b) => acc + (b.content?.trim().split(/\s+/).filter(Boolean).length || 0), 0)
);

// ─── Actions ──────────────────────────────────────────────────────────────────

/**
 * Resets the store with the data for a newly opened document.
 * Called by EditorCanvas.astro on DOMContentLoaded.
 *
 * @param documentId - The UUID of the document being opened.
 * @param title      - The current document title.
 * @param blocks     - The initial block array parsed from the DOM.
 */
export const setActiveDocument = (
  documentId: string,
  title: string,
  blocks: Block[] = []
) => {
  editorStore.set({
    documentId,
    title,
    blocks,
    isDirty: false,
    isSaving: false,
    lastSavedAt: null,
  });
};

/**
 * Updates the document title in the store and schedules a debounced save.
 * The store's title is updated synchronously so computed values stay current.
 *
 * @param newTitle - The new title string from the contenteditable element.
 */
export const updateTitle = (newTitle: string) => {
  const state = editorStore.get();
  if (!state.documentId) return;

  editorStore.setKey('title', newTitle);
  editorStore.setKey('isDirty', true);

  // Broadcast to sidebar so the doc-link label updates live
  window.dispatchEvent(
    new CustomEvent('journal:title-updated', {
      detail: { documentId: state.documentId, title: newTitle || 'Untitled' },
    })
  );

  debouncedSaveTitle(state.documentId, newTitle);
};

/**
 * Updates a single block's content in the store by ID, then schedules
 * a debounced save of all blocks.
 *
 * Use this for ordinary typing — it avoids re-reading the whole DOM.
 *
 * @param blockId - The stable ID of the block being edited.
 * @param content - The new plain-text content of the block.
 */
export const updateBlock = (blockId: string, content: string) => {
  const state = editorStore.get();
  if (!state.documentId) return;

  const newBlocks = state.blocks.map((block) =>
    block.id === blockId ? { ...block, content } : block
  );

  editorStore.setKey('blocks', newBlocks);
  editorStore.setKey('isDirty', true);

  debouncedSaveBlocks(state.documentId, newBlocks);
};

/**
 * Replaces the entire block array in the store and schedules a debounced save.
 *
 * Use this when the DOM structure changes — blocks are added, removed, or
 * reordered (e.g. Enter key creates a new block, Backspace deletes one,
 * or the block-type selector transforms one in place).
 *
 * Re-reads content from the passed array rather than the stale store state,
 * so the save payload always reflects what is currently in the DOM.
 *
 * @param blocks - The full, up-to-date block array read from the DOM.
 */
export const updateBlocks = (blocks: Block[]) => {
  const state = editorStore.get();
  if (!state.documentId) return;

  editorStore.setKey('blocks', blocks);
  editorStore.setKey('isDirty', true);

  debouncedSaveBlocks(state.documentId, blocks);
};

/**
 * Marks the document as saved and records the server timestamp.
 * Called by debouncedSaveBlocks after a successful action response.
 *
 * @param savedAt - Optional ISO timestamp returned by the server.
 */
export const markSaved = (savedAt?: string) => {
  editorStore.setKey('isDirty', false);
  editorStore.setKey('isSaving', false);
  if (savedAt) editorStore.setKey('lastSavedAt', savedAt);

  // Broadcast to the toolbar save-status indicator
  window.dispatchEvent(
    new CustomEvent('editor:save-status', { detail: { status: 'saved' } })
  );
};

/**
 * Resets the store to its empty initial state.
 * Called when navigating away from a document.
 */
export function disposeEditor() {
  editorStore.set({
    documentId: null,
    title: '',
    blocks: [],
    isDirty: false,
    isSaving: false,
    lastSavedAt: null,
  });
}

// ─── Debounced saves ──────────────────────────────────────────────────────────

let titleTimeout: ReturnType<typeof setTimeout> | null = null;
let blocksTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Debounces title saves — waits 300 ms after the last keystroke before
 * calling the server action. Each call resets the timer.
 *
 * @param documentId - The document to update.
 * @param title      - The title to save.
 */
function debouncedSaveTitle(documentId: string, title: string) {
  if (titleTimeout) clearTimeout(titleTimeout);

  titleTimeout = setTimeout(async () => {
    try {
      await actions.write.updateDocument({ id: documentId, title });
    } catch (err) {
      console.error('Failed to save title:', err);
    } finally {
      titleTimeout = null;
    }
  }, 300);
}

/**
 * Debounces block saves — waits 250 ms after the last change before
 * calling the server action. Updates the toolbar indicator before and after.
 *
 * @param documentId - The document to update.
 * @param blocks     - The full block array to persist.
 */
function debouncedSaveBlocks(documentId: string, blocks: Block[]) {
  if (blocksTimeout) clearTimeout(blocksTimeout);

  // Show "Saving…" immediately so the user has feedback
  window.dispatchEvent(
    new CustomEvent('editor:save-status', { detail: { status: 'saving' } })
  );
  editorStore.setKey('isSaving', true);

  blocksTimeout = setTimeout(async () => {
    try {
      const { data, error } = await actions.write.saveBlocks({
        document_id: documentId,
        blocks,
      });

      if (error) throw new Error(error.message);

      markSaved(data?.updated_at);

      // Broadcast so sidebar "Today" meta label refreshes
      window.dispatchEvent(
        new CustomEvent('journal:doc-updated', {
          detail: {
            documentId,
            updatedAt: data?.updated_at || new Date().toISOString(),
          },
        })
      );
    } catch (err) {
      console.error('Failed to save blocks:', err);
      editorStore.setKey('isSaving', false);
      window.dispatchEvent(
        new CustomEvent('editor:save-status', { detail: { status: 'error' } })
      );
    } finally {
      blocksTimeout = null;
    }
  }, 250);
}