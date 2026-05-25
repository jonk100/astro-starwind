// src/components/apps/write/editor/editorCanvas/keyboardUtils.ts
import type { Block, BlockType } from "@/lib/journal/types";
import { CALLOUT_CYCLE, type CalloutVariant } from "./consts";
import { getBlockType, getBlockId, generateBlockId, createBlockElement } from "./helpers";

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
  const allBlocks = Array.from(blocksContainer.querySelectorAll<HTMLElement>(".editor-block"));
  const idx = allBlocks.indexOf(target);
  let focusIdx = idx + direction;
  // Skip non-editable blocks (e.g., separators)
  while (focusIdx >= 0 && focusIdx < allBlocks.length && allBlocks[focusIdx].getAttribute("contenteditable") === null) {
    focusIdx += direction;
  }
  const focusTarget = allBlocks[focusIdx];
  if (!focusTarget) return false;
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