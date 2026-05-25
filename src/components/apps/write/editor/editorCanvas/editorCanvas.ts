// src/components/apps/write/editor/editorCanvas.ts
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
} from "./keyboardUtils";
import {
  handleBlockInput,
  handleBlockFocus,
  handleChecklistChange,
  handleToolbarBlockType,
} from "./eventHandlers";

export let editorActor: ActorRefFrom<typeof editorMachine> | null = null;
let actorInstanceId = 0;
let currentActorId: number | null = null;

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

  editorActor.subscribe((state) => {
    console.log(`[ACTOR #${currentActorId}] State: ${state.value}, dirty: title=${state.context.isTitleDirty}, blocks=${state.context.isBlocksDirty}`);
  });

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

  // Keyboard handler (uses extracted helpers)
  const handleKeyDown = (e: KeyboardEvent): void => {
    const target = e.target as HTMLElement;
    const isTitle = target.classList.contains("editor-title");
    const isBlock = target.classList.contains("editor-block");

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
      if (e.shiftKey) {
        if (behavior?.onShiftEnter) {
          e.preventDefault();
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
      } else {
        e.preventDefault();
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
        } else {
          splitBlock(target, blocksContainer, type, cursorOffset, syncBlocks);
        }
      }
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
        if (range.startOffset === 0 && range.endOffset === 0) {
          const prevBlock = target.previousElementSibling as HTMLElement | null;
          if (prevBlock?.classList.contains("editor-block")) {
            e.preventDefault();
            prevBlock.focus();
          } else if (titleEl) {
            e.preventDefault();
            titleEl.focus();
          }
        } else {
          showEdgeHint("up");
        }
      }
      return;
    }
    if (e.key === "ArrowUp" && !e.ctrlKey && !e.metaKey) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const isChecklist = type === "checklist";

        // For checklists: the real text content may start after the checkbox.
        // We need to know if the caret is at the very beginning of the editable text,
        // ignoring the non-editable checkbox.
        let isAtStart = false;
        if (isChecklist) {
          // Find the text node inside the block (excluding the checkbox)
          const textNode = Array.from(target.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE || 
                    (node.nodeType === Node.ELEMENT_NODE && node.getAttribute('contenteditable') !== 'false')
          );
          if (textNode && range.startContainer === textNode && range.startOffset === 0) {
            isAtStart = true;
          } else if (range.startContainer === target && range.startOffset === 0) {
            // Caret is before the first child (which may be the checkbox)
            isAtStart = true;
          }
        } else {
          isAtStart = (range.startOffset === 0 && range.endOffset === 0);
        }

        if (isAtStart) {
          const prevBlock = target.previousElementSibling as HTMLElement | null;
          if (prevBlock?.classList.contains("editor-block")) {
            e.preventDefault();
            prevBlock.focus();
            // Place cursor at end of previous block for better UX
            const prevRange = document.createRange();
            prevRange.selectNodeContents(prevBlock);
            prevRange.collapse(false);
            sel.removeAllRanges();
            sel.addRange(prevRange);
          } else if (titleEl) {
            e.preventDefault();
            titleEl.focus();
          }
        } else {
          showEdgeHint("up");
        }
      }
      return;
    }
    if (e.key === "ArrowDown" && !e.ctrlKey && !e.metaKey) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const textLength = target.textContent?.length || 0;
        const isChecklist = type === "checklist";

        let isAtEnd = false;
        if (isChecklist) {
          // Find the last text node inside the block
          const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
          let lastTextNode: Text | null = null;
          while (walker.nextNode()) lastTextNode = walker.currentNode as Text;
          if (lastTextNode && range.startContainer === lastTextNode && range.startOffset === lastTextNode.length) {
            isAtEnd = true;
          } else if (range.startContainer === target && range.startOffset === target.childNodes.length) {
            // Caret after all children
            isAtEnd = true;
          }
        } else {
          isAtEnd = (range.startOffset === textLength && range.endOffset === textLength);
        }

        if (isAtEnd) {
          const nextBlock = target.nextElementSibling as HTMLElement | null;
          if (nextBlock?.classList.contains("editor-block")) {
            e.preventDefault();
            nextBlock.focus();
            // Place cursor at start of next block
            const nextRange = document.createRange();
            nextRange.selectNodeContents(nextBlock);
            nextRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(nextRange);
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
    if (target.classList.contains("editor-block")) {
      lastFocusedBlock = target;
    }
    handleBlockFocus(e);
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

  // Checklist change handler
  const checklistHandler = (e: Event) => handleChecklistChange(e, blocksContainer);
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
  }
}s