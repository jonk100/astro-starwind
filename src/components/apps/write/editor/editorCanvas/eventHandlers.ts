// src/components/apps/write/editor/editorCanvas/eventHandlers.ts
import type { Block, BlockType } from "@/lib/journal/types";
import { updateBlock, updateBlocks } from "@/stores/editor";
import {
  getBlockType,
  getBlockId,
  readBlocksFromDOM,
  sanitiseAndSendBlocks,
  createBlockElement,
} from "./helpers";

/**
 * Handles `input` events on blocks, updating store and actor.
 * @param e - Input event
 * @param blocksContainer - Container holding all blocks
 * @param editorActor - XState actor (for sending BLOCKS_CHANGED)
 * @returns void
 */
export function handleBlockInput(
  e: Event,
  blocksContainer: HTMLElement,
  editorActor: any
): void {
  const target = e.target as HTMLElement;
  const blockEl = target.classList.contains("editor-block") || target.classList.contains("editor-block--checklist")
    ? target
    : target.closest<HTMLElement>(".editor-block, .editor-block--checklist");
  if (!blockEl) return;
  const type = getBlockType(blockEl);
  const blockId = blockEl.dataset.blockId;
  if (type === "checklist") {
    const allBlocks = readBlocksFromDOM(blocksContainer);
    updateBlocks(allBlocks);
    const sanitisedBlocks = allBlocks.map(block => ({
      ...block,
      content: block.content ?? '',
      meta: block.meta && typeof block.meta === 'object' ? block.meta : undefined,
    }));
    editorActor?.send({ type: 'BLOCKS_CHANGED', blocks: sanitisedBlocks });
  } else if (blockId) {
    updateBlock(blockId, blockEl.textContent || "");
    editorActor?.send({ type: 'BLOCKS_CHANGED', blocks: readBlocksFromDOM(blocksContainer) });
  }
}

/**
 * Tracks the last focused block and dispatches a custom event.
 * @param e - FocusEvent
 */
export function handleBlockFocus(e: FocusEvent): void {
  const target = e.target as HTMLElement;
  if (!target.classList.contains("editor-block")) return;
  const blockType = getBlockType(target);
  const blockId = getBlockId(target);
  window.dispatchEvent(new CustomEvent("editor:block-focused", {
    detail: { blockId, blockType, element: target }
  }));
}

/**
 * Handles checklist checkbox changes.
 * Now sends a CHECKLIST_TOGGLED event to the actor instead of
 * reading the DOM and sanitising blocks.
 * The actor updates canonical state, and a subscription patches the DOM.
 *
 * @param e - Change event
 * @param blocksContainer - Container holding all blocks (unused, kept for signature compat)
 * @param editorActor - XState actor (for sending CHECKLIST_TOGGLED)
 */
export function handleChecklistChange(
  e: Event,
  blocksContainer: HTMLElement,
  editorActor: any
): void {
  const checkbox = e.target as HTMLInputElement;
  if (!checkbox.classList.contains("checklist-checkbox")) return;
  const blockEl = checkbox.closest<HTMLElement>(".editor-block--checklist");
  if (!blockEl) return;
  const blockId = blockEl.dataset.blockId;
  if (!blockId) return;

  // Send minimal event to actor — let it update canonical state.
  // A subscription in initEditor will patch the DOM.
  editorActor?.send({
    type: "CHECKLIST_TOGGLED",
    blockId,
    checked: checkbox.checked,
  });
}

/**
 * Handles toolbar block type transformation (editor:set-block-type event).
 * @param e - CustomEvent with detail.blockType
 * @param lastFocusedBlock - Reference to the currently focused block
 * @param blocksContainer - Container holding all blocks
 * @param onBlocksChanged - Callback after transformation
 */
export function handleToolbarBlockType(
  e: CustomEvent,
  lastFocusedBlock: HTMLElement | null,
  blocksContainer: HTMLElement,
  onBlocksChanged: () => void
): void {
  const blockType = (e.detail as { blockType: BlockType }).blockType;
  const target = lastFocusedBlock;
  if (!target || !target.isConnected) return;
  if (getBlockType(target) === blockType) return;
  const newBlock: Block = {
    id: getBlockId(target) || crypto.randomUUID(),
    type: blockType,
    content: target.textContent || "",
  };
  const newEl = createBlockElement(newBlock);
  if (!newEl) return;
  target.replaceWith(newEl);
  // Update the reference (since we can't mutate the parameter, we rely on the caller to update its own reference)
  if (blockType !== "separator") {
    newEl.focus();
    const range = document.createRange();
    range.selectNodeContents(newEl);
    range.collapse(false);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
  }
  window.dispatchEvent(new CustomEvent("editor:block-focused", { detail: { blockType } }));
  onBlocksChanged();
}