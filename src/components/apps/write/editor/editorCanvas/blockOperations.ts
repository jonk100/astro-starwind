// src/components/apps/write/editor/editorCanvas/blockOperations.ts
import type { Block, BlockType } from "@/lib/journal/types";
import { generateBlockId, createBlockElement } from "./helpers";
import { setBlockCursor } from "./keyboardUtils"; 

/**
 * Creates a new block after the given target element and focuses it.
 * @param target - The DOM element after which to insert the new block
 * @param blocksContainer - The container holding all blocks (used to read updated blocks)
 * @param newBlockData - The block data (type, content) for the new block
 * @param onBlocksChanged - Callback to update the store (e.g., updateBlocks + sanitiseAndSendBlocks)
 */
export function createAfter(
  target: HTMLElement,
  blocksContainer: HTMLElement,
  newBlockData: Omit<Block, "id">,
  onBlocksChanged: () => void
): void {
  const newBlock: Block = { ...newBlockData, id: generateBlockId() };
  const newEl = createBlockElement(newBlock);
  if (!newEl) return;

  // CRITICAL FIX: Find the actual block container, not a child element.
  // This prevents new blocks from being inserted inside nested elements
  // (e.g., inside a checklist flex container), which causes horizontal layout.
  const blockContainer = target.classList.contains("editor-block") || target.classList.contains("editor-block--checklist")
    ? target
    : target.closest<HTMLElement>(".editor-block, .editor-block--checklist");
  
  if (blockContainer) {
    blockContainer.after(newEl);
  } else {
    target.after(newEl);
  }

  // ✅ For checklist blocks, place cursor inside the .checklist-text span
  if (newBlock.type === "checklist") {
    const textSpan = newEl.querySelector<HTMLElement>('.checklist-text');
    if (textSpan) {
      textSpan.contentEditable = "true";
      setBlockCursor(textSpan, "start");
    } else {
      newEl.focus();
    }
  } else {
    newEl.focus();
  }

  onBlocksChanged();
}

/**
 * Replaces the current block with a new block of a different type.
 * @param target - The block DOM element to replace (or a child element)
 * @param newType - The target block type
 * @param onBlocksChanged - Callback after replacement
 * @returns The newly created block element
 */
export function replaceWith(
  target: HTMLElement,
  newType: BlockType,
  onBlocksChanged: () => void
): HTMLElement {
  // Find the actual block container, not a child element
  const blockContainer = target.classList.contains("editor-block") || target.classList.contains("editor-block--checklist")
    ? target
    : target.closest<HTMLElement>(".editor-block, .editor-block--checklist");
  
  const actualTarget = blockContainer || target;
  
  const newBlock: Block = {
    id: actualTarget.dataset.blockId || generateBlockId(),
    type: newType,
    content: actualTarget.textContent || "",
  };
  const newEl = createBlockElement(newBlock);
  if (!newEl) {
    return actualTarget;
  }
  actualTarget.replaceWith(newEl);
  
  // For checklist blocks, focus the text span; otherwise focus the element
  if (newType === "checklist") {
    const textSpan = newEl.querySelector<HTMLElement>('.checklist-text');
    if (textSpan) {
      textSpan.focus();
      const range = document.createRange();
      range.selectNodeContents(textSpan);
      range.collapse(false);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  } else {
    newEl.focus();
  }
  
  onBlocksChanged();
  window.dispatchEvent(new CustomEvent("editor:block-focused", { detail: { blockType: newType } }));
  return newEl;
}

/**
 * Splits the current block at the given cursor offset.
 * @param target - The block element to split
 * @param blocksContainer - Container holding all blocks
 * @param type - The type of the current block
 * @param cursorOffset - Character offset where the split occurs
 * @param onBlocksChanged - Callback after split
 */
export function splitBlock(
  target: HTMLElement,
  blocksContainer: HTMLElement,
  type: BlockType,
  cursorOffset: number,
  onBlocksChanged: () => void
): void {
  const text = target.textContent || "";
  const before = text.slice(0, cursorOffset);
  const after = text.slice(cursorOffset);
  target.textContent = before;
  
  // Convert all heading types to paragraph on split
  const nextType = type.startsWith("heading") ? "paragraph" : type;
  
  createAfter(
    target,
    blocksContainer,
    {
      type: nextType,
      content: after,
    },
    onBlocksChanged
  );
}