/**
 * @file src/stores/editor.ts
 * @description Local, synchronous reactive storage cache for the editor canvas.
 * Network synchronization and debouncing are orchestrated exclusively by XState.
 */

import { map, computed } from 'nanostores';
import type { Block } from '@/lib/journal/types';
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

// ─── Computed Values ──────────────────────────────────────────────────────────

export const documentPreview = computed(editorStore, (s) =>
  extractPreview(s.blocks)
);

export const wordCount = computed(editorStore, (s) =>
  s.blocks.reduce((acc, b) => acc + (b.content?.trim().split(/\s+/).filter(Boolean).length || 0), 0)
);

// ─── Store Actions ────────────────────────────────────────────────────────────

/**
 * Resets the store with the data for a newly opened document.
 * Called by EditorCanvas.astro on custom lifecycle initialization hooks.
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
 * Updates the document title in the store for instant local UI reactivity.
 *
 * @param newTitle - The new title string from the contenteditable element.
 */
export const updateTitle = (newTitle: string) => {
  const state = editorStore.get();
  if (!state.documentId) return;

  editorStore.setKey('title', newTitle);
  editorStore.setKey('isDirty', true);

  // Broadcast to sidebar link elements so title updates match typing immediately
  window.dispatchEvent(
    new CustomEvent('journal:title-updated', {
      detail: { documentId: state.documentId, title: newTitle || 'Untitled' },
    })
  );
};

/**
 * Updates a single block's content in the store by ID.
 * Keeps local reactive selectors current without re-reading the full DOM tree.
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
};

/**
 * Replaces the entire block array in the store.
 * Use this when the structure of your DOM shifts (Enter splits, Backspace merges).
 *
 * @param blocks - The full, up-to-date block array read from the DOM.
 */
export const updateBlocks = (blocks: Block[]) => {
  const state = editorStore.get();
  if (!state.documentId) return;

  editorStore.setKey('blocks', blocks);
  editorStore.setKey('isDirty', true);
};

/**
 * Marks the document as saved and records the server timestamp.
 * Call this from within your XState machine's onDone actor transition block.
 *
 * @param savedAt - ISO timestamp returned by the database.
 */
export const markSaved = (savedAt?: string) => {
  editorStore.setKey('isDirty', false);
  editorStore.setKey('isSaving', false);
  if (savedAt) editorStore.setKey('lastSavedAt', savedAt);

  // Broadcast to toolbar or UI saving feedback trackers
  window.dispatchEvent(
    new CustomEvent('editor:save-status', { detail: { status: 'saved' } })
  );
};

/**
 * Resets the store to its empty initial state.
 * Called when navigating away from a document layout context.
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