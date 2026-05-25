// src/components/apps/write/editor/editorCanvas/keyboardUtils.ts
import type { Block, BlockType } from "@/lib/journal/types";
import { CALLOUT_CYCLE, type CalloutVariant } from "./consts";
import { getBlockType, getBlockId, generateBlockId, createBlockElement } from "./helpers";

/**
 * Places the cursor inside a block's editable content.
 * @param block - The block element
 * @param position - 'start' (before text) or 'end' (after text)
 */
export function setBlockCursor(block: HTMLElement, position: 'start' | 'end'): void {
  let targetNode: Node | null = null;
  let offset = 0;

  if (block.classList.contains('editor-block--checklist')) {
    const textSpan = block.querySelector<HTMLElement>('.checklist-text');
    if (textSpan) {
      targetNode = textSpan;
      const textLength = textSpan.textContent ? textSpan.textContent.length : 0;
      offset = position === 'start' ? 0 : textLength;
    } else {
      targetNode = block;
      const textLength = block.textContent ? block.textContent.length : 0;
      offset = position === 'start' ? 0 : textLength;
    }
  } else {
    targetNode = block;
    const textLength = block.textContent ? block.textContent.length : 0;
    offset = position === 'start' ? 0 : textLength;
  }

  if (!targetNode) return;

  // Clamp offset within [0, node length]
  const nodeTextLength = (targetNode.textContent || '').length;
  if (offset < 0) offset = 0;
  if (offset > nodeTextLength) offset = nodeTextLength;

  try {
    const range = document.createRange();
    range.setStart(targetNode, offset);
    range.collapse(true);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  } catch (e) {
    console.warn('Failed to set cursor position:', e);
  }
}

/**
 * Moves focus to an adjacent block (Tab / Shift+Tab, Alt+Arrow).
 * @param target - Current focused block
 * @param blocksContainer - Container of all blocks
 * @param direction - +1 for next, -1 for previous
 * @returns boolean indicating whether focus moved
 */
export function focusAdjacentBlock(
  target: HTMLElement,
  blocksContainer: HTMLElement,
  direction: 1 | -1
): boolean {
  const allBlocks = Array.from(blocksContainer.querySelectorAll<HTMLElement>(".editor-block, .editor-block--checklist"));
  const idx = allBlocks.indexOf(target);
  let focusIdx = idx + direction;
  // Skip non-editable blocks (e.g., separators)
  while (focusIdx >= 0 && focusIdx < allBlocks.length) {
    const block = allBlocks[focusIdx];
    const isContentEditable = block.getAttribute("contenteditable") !== null;
    const isChecklist = block.classList.contains("editor-block--checklist");
    // Include if contenteditable or if it's a checklist block
    if (isContentEditable || isChecklist) break;
    focusIdx += direction;
  }
  const focusTarget = allBlocks[focusIdx];
  if (!focusTarget) return false;
  
  // For checklist blocks, focus the .checklist-text span instead
  if (focusTarget.classList.contains("editor-block--checklist")) {
    const textSpan = focusTarget.querySelector<HTMLElement>(".checklist-text");
    if (textSpan) {
      textSpan.focus();
      const range = document.createRange();
      range.selectNodeContents(textSpan);
      range.collapse(direction === 1);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      return true;
    }
  }
  
  focusTarget.focus();
  const range = document.createRange();
  range.selectNodeContents(focusTarget);
  range.collapse(direction === 1);
  window.getSelection()?.removeAllRanges();
  window.getSelection()?.addRange(range);
  return true;
}

/**
 * Deletes an empty block (Backspace behaviour).
 * @param target - The empty block element
 * @param blocksContainer - Container of all blocks
 * @param editorActor - XState actor for sending block changes
 * @param readBlocksFromDOM - Function to read current blocks
 * @param updateBlocks - Store update function
 * @returns boolean indicating whether deletion occurred
 */
export function deleteEmptyBlock(
  target: HTMLElement,
  blocksContainer: HTMLElement,
  editorActor: any,
  readBlocksFromDOM: (container: HTMLElement) => Block[],
  updateBlocks: (blocks: Block[]) => void
): boolean {
  const allBlocks = Array.from(blocksContainer.querySelectorAll<HTMLElement>(".editor-block"));
  if (allBlocks.length <= 1) return false;
  const idx = allBlocks.indexOf(target);
  const prevEl = allBlocks[idx - 1];
  target.remove();
  if (prevEl) {
    prevEl.focus();
    const range = document.createRange();
    range.selectNodeContents(prevEl);
    range.collapse(false);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
  }
  const updatedBlocks = readBlocksFromDOM(blocksContainer);
  updateBlocks(updatedBlocks);
  editorActor?.send({ type: 'BLOCKS_CHANGED', blocks: updatedBlocks });
  return true;
}

/**
 * Reorders a block up or down (Ctrl+ArrowUp/Down).
 * @param target - The block to move
 * @param blocksContainer - Container of all blocks
 * @param direction - "up" or "down"
 * @param onBlocksChanged - Callback after reorder
 * @returns boolean indicating whether reorder happened
 */
export function reorderBlock(
  target: HTMLElement,
  blocksContainer: HTMLElement,
  direction: "up" | "down",
  onBlocksChanged: () => void
): boolean {
  const sibling = direction === "up"
    ? target.previousElementSibling as HTMLElement
    : target.nextElementSibling as HTMLElement;
  if (!sibling?.classList.contains("editor-block")) return false;
  if (direction === "up") {
    target.after(sibling);
  } else {
    target.before(sibling);
  }
  target.focus();
  onBlocksChanged();
  return true;
}

/**
 * Cycles callout or header variants (Ctrl+Left/Right).
 * @param target - Current block element
 * @param key - "ArrowLeft" or "ArrowRight"
 * @param onBlocksChanged - Callback after change
 * @returns boolean indicating whether cycle occurred
 */
export function cycleBlockVariant(
  target: HTMLElement,
  key: "ArrowLeft" | "ArrowRight",
  onBlocksChanged: () => void
): boolean {
  const type = getBlockType(target);
  if (!type.startsWith("callout")) return false;
  const currentIdx = CALLOUT_CYCLE.indexOf(type as CalloutVariant);
  const dir = key === "ArrowRight" ? 1 : -1;
  const nextVariant = CALLOUT_CYCLE[(currentIdx + dir + CALLOUT_CYCLE.length) % CALLOUT_CYCLE.length] as BlockType;
  const newBlock: Block = {
    id: getBlockId(target) || generateBlockId(),
    type: nextVariant,
    content: target.textContent || "",
  };
  const newEl = createBlockElement(newBlock);
  if (!newEl) return false;
  target.replaceWith(newEl);
  newEl.focus();
  window.dispatchEvent(new CustomEvent("editor:block-focused", { detail: { blockType: nextVariant } }));
  onBlocksChanged();
  return true;
}

/**
 * Dispatches a navigation hint custom event when arrow keys hit block edges.
 * @param direction - "up" or "down"
 */
export function showEdgeHint(direction: "up" | "down"): void {
  window.dispatchEvent(
    new CustomEvent("editor:show-nav-hint", { detail: { direction } })
  );
}