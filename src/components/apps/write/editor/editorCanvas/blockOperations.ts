// src/components/apps/write/editor/editorCanvas/blockOperations.ts
import type { Block, BlockType } from "@/lib/journal/types";
import { generateBlockId, createBlockElement } from "./helpers";

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
  target.after(newEl);
  newEl.focus();
  onBlocksChanged();
}

/**
 * Replaces the current block with a new block of a different type.
 * @param target - The block DOM element to replace
 * @param newType - The target block type
 * @param onBlocksChanged - Callback after replacement
 * @returns The newly created block element
 */
export function replaceWith(
  target: HTMLElement,
  newType: BlockType,
  onBlocksChanged: () => void
): HTMLElement {
  const newBlock: Block = {
    id: target.dataset.blockId || generateBlockId(),
    type: newType,
    content: target.textContent || "",
  };
  const newEl = createBlockElement(newBlock);
  target.replaceWith(newEl);
  newEl.focus();
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
  createAfter(
    target,
    blocksContainer,
    {
      type: type === "heading" ? "paragraph" : type,
      content: after,
    },
    onBlocksChanged
  );
}