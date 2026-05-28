/**
 * src/components/apps/write/state/editorMachine.ts
 * - XState machine for managing document synchronization and state
 * - Handles title and block changes, and syncs with Supabase
 * - Uses Astro actions for server communication
 * - Manages dirty state and synchronization status via XState guards and actions
 * - Uses markSaved from stores/editor to mark documents as saved
 * - Uses fromPromise from XState to handle async operations
 * - Uses assign from XState to update context
 * - Uses setup from XState to create the machine
 * @param {EditorContext} context - The initial context for the machine
 *   @param {string} title - The initial title for the document
 *   @param {Block[]} blocks - The initial blocks for the document
 *   @param {string} documentId - The ID of the document
 *   @param {boolean} isTitleDirty - Whether the title has been modified
 *   @param {boolean} isBlocksDirty - Whether the blocks have been modified
 *   @param {boolean} isSynchronizing - Whether the document is currently synchronizing
 * 
 * @returns {import('xstate').StateMachine} The configured XState machine
 **/
import { setup, assign, fromPromise } from 'xstate';
import { actions } from 'astro:actions';
import type { Block } from '@/lib/journal/types';
import { markSaved } from '@/stores/editor';

export interface EditorContext {
  documentId: string;
  title: string;
  blocks: Block[];
  isTitleDirty: boolean;
  isBlocksDirty: boolean;
  isSynchronizing: boolean;
}

/**
 * XState machine for managing document synchronization and state
 * 
 * @returns {import('xstate').StateMachine} The configured XState machine
 */
export const editorMachine = setup({
  types: {
    context: {} as EditorContext,
    input: {} as Partial<EditorContext> & { documentId: string; title: string; blocks: Block[] },
    events: {} as
      | { type: 'TITLE_CHANGED'; title: string }
      | { type: 'BLOCKS_CHANGED'; blocks: Block[] }
      | { type: 'CHECKLIST_TOGGLED'; blockId: string; checked: boolean }
      | { type: 'RETRY' }
  },
  actors: {
    saveToSupabase: fromPromise(async ({ input }: { input: EditorContext }) => {
      if (!input.documentId) {
        throw new Error('[editorMachine] Synchronizer halted: documentId is missing.');
      }

      const syncTasks = [];

      if (input.isTitleDirty && typeof input.title === 'string') {
        syncTasks.push(
          actions.write.updateDocument({ 
            id: input.documentId, 
            title: input.title.trim() || "Untitled" 
          })
        );
      }

      if (input.isBlocksDirty && Array.isArray(input.blocks)) {
        syncTasks.push(
          actions.write.saveBlocks({ 
            document_id: input.documentId, 
            blocks: input.blocks 
          })
        );
      }

      if (syncTasks.length === 0) return { skipped: true };

      const results = await Promise.all(syncTasks);
      for (const res of results) {
        if (res?.error) {
          throw new Error(res.error.message || "Server action validation failed");
        }
      }

      return { success: true };
    })
  }
}).createMachine({
  id: 'editorSync',
  initial: 'idle',
  context: ({ input }) => ({
    documentId: input.documentId,
    title: input.title,
    blocks: input.blocks,
    isTitleDirty: input.isTitleDirty ?? false,
    isBlocksDirty: input.isBlocksDirty ?? false,
    isSynchronizing: false
  }),
  states: {
    idle: {
      id: 'state_idle',
      on: {
        TITLE_CHANGED: {
          target: '#state_typing',
          actions: assign({ title: ({ event }) => event.title, isTitleDirty: true })
        },
        BLOCKS_CHANGED: {
          target: '#state_typing',
          actions: assign({ blocks: ({ event }) => event.blocks, isBlocksDirty: true })
        },
        CHECKLIST_TOGGLED: {
          actions: assign({
            blocks: ({ context, event }) =>
              context.blocks.map(block =>
                block.id === event.blockId
                  ? {
                      ...block,
                      meta: { ...block.meta, checked: event.checked }
                    }
                  : block
              ),
            isBlocksDirty: true
          })
        }
      }
    },
    typing: {
      id: 'state_typing',
      entry: [
        () => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(
              new CustomEvent('editor:save-status', { detail: { status: 'saving' } })
            );
          }
        }
      ],
      on: {
        TITLE_CHANGED: {
          target: '#state_reset_timer',
          actions: assign({ title: ({ event }) => event.title, isTitleDirty: true })
        },
        BLOCKS_CHANGED: {
          target: '#state_reset_timer',
          actions: assign({ blocks: ({ event }) => event.blocks, isBlocksDirty: true })
        },
        CHECKLIST_TOGGLED: {
          target: '#state_reset_timer',
          actions: assign({
            blocks: ({ context, event }) =>
              context.blocks.map(block =>
                block.id === event.blockId
                  ? { ...block, meta: { ...block.meta, checked: event.checked } }
                  : block
              ),
            isBlocksDirty: true
          })
        }
      },
      after: {
        2000: [
          {
            guard: ({ context }) => context.isSynchronizing,
            target: '#state_typing'
          },
          {
            target: '#state_saving'
          }
        ]
      }
    },
    reset_timer: {
      id: 'state_reset_timer',
      always: '#state_typing'
    },
    saving: {
      id: 'state_saving',
      entry: [
        assign({ isSynchronizing: true }),
        () => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(
              new CustomEvent('editor:save-status', { detail: { status: 'saving' } })
            );
          }
        }
      ],
      invoke: {
        id: 'saveToSupabaseActor',
        src: 'saveToSupabase',
        input: ({ context }) => context,
        onDone: {
          target: '#state_idle',
          actions: [
            assign({ 
              isTitleDirty: false, 
              isBlocksDirty: false,
              isSynchronizing: false 
            }),
            ({ context }) => {
              markSaved(new Date().toISOString());
              
              window.dispatchEvent(
                new CustomEvent('journal:doc-updated', {
                  detail: {
                    documentId: context.documentId,
                    updatedAt: new Date().toISOString()
                  }
                })
              );
            }
          ]
        },
        onError: {
          target: '#state_error',
          actions: [
            assign({ isSynchronizing: false }),
            () => {
              window.dispatchEvent(
                new CustomEvent('editor:save-status', { detail: { status: 'error' } })
              );
            }
          ]
        }
      },
      on: {
        TITLE_CHANGED: {
          actions: assign({ title: ({ event }) => event.title, isTitleDirty: true })
        },
        BLOCKS_CHANGED: {
          actions: assign({ blocks: ({ event }) => event.blocks, isBlocksDirty: true })
        },
        CHECKLIST_TOGGLED: {
          actions: assign({
            blocks: ({ context, event }) =>
              context.blocks.map(block =>
                block.id === event.blockId
                  ? { ...block, meta: { ...block.meta, checked: event.checked } }
                  : block
              ),
            isBlocksDirty: true
          })
        }
      }
    },
    error: {
      id: 'state_error',
      on: {
        RETRY: '#state_saving',
        TITLE_CHANGED: {
          target: '#state_typing',
          actions: assign({ title: ({ event }) => event.title, isTitleDirty: true })
        },
        BLOCKS_CHANGED: {
          target: '#state_typing',
          actions: assign({ blocks: ({ event }) => event.blocks, isBlocksDirty: true })
        },
        CHECKLIST_TOGGLED: {
          target: '#state_typing',
          actions: assign({
            blocks: ({ context, event }) =>
              context.blocks.map(block =>
                block.id === event.blockId
                  ? { ...block, meta: { ...block.meta, checked: event.checked } }
                  : block
              ),
            isBlocksDirty: true
          })
        }
      }
    }
  }
});
