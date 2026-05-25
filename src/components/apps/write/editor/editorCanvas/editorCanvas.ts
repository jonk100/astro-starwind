/** src/components/apps/write/editor/editorCanvas.ts
 **   this file handles most of the keyboard interactions for the editor
 **    along with `./keyboardUtils.ts`.
 */

import type { Block, BlockType } from "@/lib/journal/types";
import { updateTitle, updateBlocks } from "@/stores/editor";
import { blockBehaviors } from "./behaviors";
import { createActor, type ActorRefFrom } from 'xstate';
import { editorMachine } from '../../state/editorMachine';
import {
  readBlocksFromDOM,
  sanitiseAndSendBlocks,
  getBlockType,
  getBlockId,
  generateBlockId,
  createBlockElement,
} from "./helpers";
import {
  createAfter,
  replaceWith,
  splitBlock,
  
} from "./blockOperations";
import {
  focusAdjacentBlock,
  deleteEmptyBlock,
  reorderBlock,
  cycleBlockVariant,
  showEdgeHint,
  setBlockCursor,
} from "./keyboardUtils";
import {
  handleBlockInput,
  handleBlockFocus,
  handleChecklistChange,
  handleToolbarBlockType,
  
} from "./eventHandlers";
import { renderChecklistState } from "./renderChecklistState";

export let editorActor: ActorRefFrom<typeof editorMachine> | null = null;
let actorInstanceId = 0;
let currentActorId: number | null = null;

// Augment Window interface to include editorActor
declare global {
  interface Window {
    editorActor: ActorRefFrom<typeof editorMachine> | null;
  }
}

export function initEditor(documentId: string): void {
  const titleEl = document.getElementById("editor-title") as HTMLElement | null;
  const blocksContainer = document.getElementById("editor-blocks") as HTMLElement | null;
  if (!blocksContainer) return;

  let lastFocusedBlock: HTMLElement | null = null;

  // Start XState Actor
  const initialTitle = titleEl?.innerText || "";
  const initialBlocks = readBlocksFromDOM(blocksContainer);
  editorActor = createActor(editorMachine, {
    input: { documentId, title: initialTitle, blocks: initialBlocks, isTitleDirty: false, isBlocksDirty: false }
  }).start();

  actorInstanceId++;
  currentActorId = actorInstanceId;
  console.log(`[EDITOR] Creating actor #${currentActorId} for doc ${documentId}`);

  // Expose editorActor globally for use in EditorCanvas.astro
  if (typeof window !== 'undefined') {
    window.editorActor = editorActor;
  }

  // Subscribe to patch DOM when checklist state changes
  editorActor.subscribe((state) => {
    console.log(`[ACTOR #${currentActorId}] State: ${state.value}, dirty: title=${state.context.isTitleDirty}, blocks=${state.context.isBlocksDirty}`);

    // Patch checklist DOM from canonical state (no DOM reread)
    for (const block of state.context.blocks) {
      if (block.type === "checklist" && block.meta?.checked !== undefined) {
        const blockEl = blocksContainer.querySelector<HTMLElement>(
          `.editor-block--checklist[data-block-id="${block.id}"]`
        );
        if (blockEl) {
          renderChecklistState(blockEl, block.meta.checked as boolean);
        }
      }
    }
  });

  // IMPORTANT: On initial load, render all checklist states from the actor's context
  // This ensures that even if the DOM wasn't rendered correctly by Astro,
  // the state-driven rendering will correct it
  setTimeout(() => {
    const currentState = editorActor?.getSnapshot();
    if (currentState?.context) {
      for (const block of currentState.context.blocks) {
        if (block.type === "checklist" && block.meta?.checked !== undefined) {
          const blockEl = blocksContainer.querySelector<HTMLElement>(
            `.editor-block--checklist[data-block-id="${block.id}"]`
          );
          if (blockEl) {
            renderChecklistState(blockEl, block.meta.checked as boolean);
            console.log(`[INIT] Rendered checklist ${block.id} checked=${block.meta.checked}`);
          }
        }
      }
    }
  }, 0);

  // Title handling
  let titleTimeout: ReturnType<typeof setTimeout> | null = null;
  if (titleEl) {
    titleEl.addEventListener("input", () => {
      const currentTitle = titleEl.textContent?.trim() || "";
      updateTitle(currentTitle);
      if (titleTimeout) clearTimeout(titleTimeout);
      titleTimeout = setTimeout(() => {
        editorActor?.send({ type: 'TITLE_CHANGED', title: currentTitle });
      }, 2000);
    });
  }

  // Helper to sync blocks after changes
  const syncBlocks = () => {
    const allBlocks = readBlocksFromDOM(blocksContainer);
    updateBlocks(allBlocks);
    sanitiseAndSendBlocks(blocksContainer);
    editorActor?.send({ type: 'BLOCKS_CHANGED', blocks: allBlocks });
  };

  // Helper to check if an element is a block or checklist block
  const isBlockElement = (el: HTMLElement): boolean =>
    el.classList.contains("editor-block") ||
    el.classList.contains("editor-block--checklist") ||
    !!el.closest(".editor-block, .editor-block--checklist");

  // Keyboard handler (uses extracted helpers)
  const handleKeyDown = (e: KeyboardEvent): void => {
    const target = e.target as HTMLElement;
    const isTitle = target.classList.contains("editor-title");
    const isBlock = isBlockElement(target);

    if (!isTitle && !isBlock) return;

    if (isTitle && e.key === "Enter") {
      e.preventDefault();
      const firstBlock = blocksContainer.querySelector<HTMLElement>(".editor-block");
      firstBlock?.focus();
      return;
    }

    if (!isBlock) return;

    const type = getBlockType(target);
    const behavior = blockBehaviors[type];
    const cursorOffset = window.getSelection()?.getRangeAt(0)?.startOffset ?? 0;

    // Enter key (per‑type behaviours)
    if (e.key === "Enter") {
      e.preventDefault(); // always prevent default to avoid extra newlines

      if (e.shiftKey) {
        if (behavior?.onShiftEnter) {
          behavior.onShiftEnter({
            documentId,
            target,
            block: { id: getBlockId(target) || "", type, content: target.textContent || "" },
            cursorOffset,
            createAfter: (data) => createAfter(target, blocksContainer, data, syncBlocks),
            splitBlock: () => splitBlock(target, blocksContainer, type, cursorOffset, syncBlocks),
            replaceWith: (newType) => replaceWith(target, newType, syncBlocks),
          });
        }
        // For shift+Enter with no custom behavior, browser default creates a newline
        // (we already prevented default, so we do nothing – but we could insert a <br>)
        return;
      }

      // Normal Enter (no shift)
      if (behavior?.onEnter) {
        behavior.onEnter({
          documentId,
          target,
          block: { id: getBlockId(target) || "", type, content: target.textContent || "" },
          cursorOffset,
          createAfter: (data) => createAfter(target, blocksContainer, data, syncBlocks),
          splitBlock: () => splitBlock(target, blocksContainer, type, cursorOffset, syncBlocks),
          replaceWith: (newType) => replaceWith(target, newType, syncBlocks),
        });
        return;
      }
      // Default behavior: split the block
      splitBlock(target, blocksContainer, type, cursorOffset, syncBlocks);
      return;
    }

    // Tab navigation
    if (e.key === "Tab") {
      e.preventDefault();
      focusAdjacentBlock(target, blocksContainer, e.shiftKey ? -1 : 1);
      return;
    }

    // Backspace delete empty block
    if (e.key === "Backspace" && target.textContent === "") {
      if (deleteEmptyBlock(target, blocksContainer, editorActor, readBlocksFromDOM, updateBlocks)) {
        e.preventDefault();
      }
      return;
    }

    // Ctrl+Left/Right cycle callout variants
    if ((e.ctrlKey || e.metaKey) && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      if (cycleBlockVariant(target, e.key as "ArrowLeft" | "ArrowRight", syncBlocks)) {
        e.preventDefault();
      }
      return;
    }

    // Alt+Arrow move focus (no reorder)
    if ((e.altKey || e.metaKey) && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.preventDefault();
      focusAdjacentBlock(target, blocksContainer, e.key === "ArrowDown" ? 1 : -1);
      return;
    }

    // Arrow keys with edge hints
    if (e.key === "ArrowUp" && !e.ctrlKey && !e.metaKey) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const isChecklist = type === "checklist";
        let isAtStart = false;

        if (isChecklist) {
          // Find the first text node and see if the cursor is at its start
          const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
          let firstText: Text | null = null;
          while (walker.nextNode()) {
            firstText = walker.currentNode as Text;
            break;
          }
          if (firstText && range.startContainer === firstText && range.startOffset === 0) {
            isAtStart = true;
          } else if (range.startContainer === target && range.startOffset === 0) {
            isAtStart = true;
          }
        } else {
          isAtStart = (range.startOffset === 0 && range.endOffset === 0);
        }

        if (isAtStart) {
          const prevBlock = target.previousElementSibling as HTMLElement | null;
          if (prevBlock?.classList.contains("editor-block") || prevBlock?.classList.contains("editor-block--checklist")) {
            e.preventDefault();
            // Move cursor to the END of the previous block
            setBlockCursor(prevBlock, 'end');
          } else if (titleEl) {
            e.preventDefault();
            titleEl.focus();
            // Place cursor at end of title
            const titleRange = document.createRange();
            titleRange.selectNodeContents(titleEl);
            titleRange.collapse(false);
            sel?.removeAllRanges();
            sel?.addRange(titleRange);
          }
        } else {
          showEdgeHint("up");
        }
      }
      return;
    }

    // Arrow Down (similar fix for end detection)
    if (e.key === "ArrowDown" && !e.ctrlKey && !e.metaKey) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const textLength = target.textContent?.length || 0;
        const isChecklist = type === "checklist";
        let isAtEnd = false;

        if (isChecklist) {
          // Find the last text node and check if cursor is at its end
          const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
          let lastText: Text | null = null;
          while (walker.nextNode()) lastText = walker.currentNode as Text;
          if (lastText && range.startContainer === lastText && range.startOffset === lastText.length) {
            isAtEnd = true;
          } else if (range.startContainer === target && range.startOffset === target.childNodes.length) {
            isAtEnd = true;
          }
        } else {
          isAtEnd = (range.startOffset === textLength && range.endOffset === textLength);
        }

        if (isAtEnd) {
          const nextBlock = target.nextElementSibling as HTMLElement | null;
          if (nextBlock?.classList.contains("editor-block") || nextBlock?.classList.contains("editor-block--checklist")) {
            e.preventDefault();
            // Move cursor to the START of the next block
            setBlockCursor(nextBlock, 'start');
          }
        } else {
          showEdgeHint("down");
        }
      }
      return;
    }
    
    // Ctrl+Arrow reorder blocks
    if ((e.ctrlKey || e.metaKey) && e.key === "ArrowUp") {
      e.preventDefault();
      reorderBlock(target, blocksContainer, "up", syncBlocks);
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "ArrowDown") {
      e.preventDefault();
      reorderBlock(target, blocksContainer, "down", syncBlocks);
      return;
    }
  };

  // Focus tracking
  const handleFocusIn = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    // Walk up to the block parent if focus is on a child (e.g. checklist-text span)
    const block = target.closest<HTMLElement>(".editor-block, .editor-block--checklist");
    if (block) {
      lastFocusedBlock = block;
      handleBlockFocus(e);
    }
  };

  // Toolbar event listener
  const toolbarHandler = (e: Event) => {
    handleToolbarBlockType(e as CustomEvent, lastFocusedBlock, blocksContainer, syncBlocks);
    // Update lastFocusedBlock reference after replacement
    if (lastFocusedBlock && !lastFocusedBlock.isConnected) {
      // The block was replaced; find the new block with same ID or assume the focused element
      const newBlock = blocksContainer.querySelector(`.editor-block[data-block-id="${lastFocusedBlock.dataset.blockId}"]`) as HTMLElement;
      if (newBlock) lastFocusedBlock = newBlock;
    }
  };
  window.addEventListener("editor:set-block-type", toolbarHandler);

  // Checklist change handler — passes editorActor for CHECKLIST_TOGGLED event
  const checklistHandler = (e: Event) => {
    handleChecklistChange(e, blocksContainer, editorActor);
    
    // Prevent checkbox from stealing focus; keep focus on the .checklist-text span
    const checkbox = e.target as HTMLInputElement;
    const blockEl = checkbox.closest<HTMLElement>(".editor-block--checklist");
    if (blockEl) {
      const textSpan = blockEl.querySelector<HTMLElement>(".checklist-text");
      if (textSpan) {
        // Defer focus restore to next tick so DOM patch completes first
        requestAnimationFrame(() => {
          textSpan.focus();
          // Restore cursor to end of text
          const range = document.createRange();
          range.selectNodeContents(textSpan);
          range.collapse(false);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        });
      }
    }
  };
  blocksContainer.addEventListener("change", checklistHandler);

  // Input and keyboard handlers
  const inputHandler = (e: Event) => handleBlockInput(e, blocksContainer, editorActor);
  blocksContainer.addEventListener("input", inputHandler);
  blocksContainer.addEventListener("keydown", handleKeyDown);
  blocksContainer.addEventListener("focusin", handleFocusIn);
  titleEl?.addEventListener("keydown", handleKeyDown);
}

export function disposeEditor(): void {
  if (editorActor) {
    editorActor.stop();
    editorActor = null;
    // Also clear the global reference
    window.editorActor = null;
  }
}