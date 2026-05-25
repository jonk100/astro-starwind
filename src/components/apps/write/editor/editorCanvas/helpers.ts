import type { Block, BlockType } from "@/lib/journal/types";
import { BLOCK_TAG } from "./consts";

/**
 * Returns the BlockType stored in an element's data-block-type attribute.
 *
 * @param el - A block DOM element.
 */
export function getBlockType(el: HTMLElement): BlockType {
  return (el.dataset.blockType as BlockType) || "paragraph";
}
 
/**
 * Returns the block ID stored in an element's data-block-id attribute.
 *
 * @param el - A block DOM element.
 */
export function getBlockId(el: HTMLElement): string | null {
  return el.dataset.blockId || null;
}
 
/** Generates a stable random block ID. */
export function generateBlockId(): string {
  return `b_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
 
/**
 * Creates a new block DOM element with the correct tag, classes, and
 * data attributes for the given Block object.
 *
 * @param block - The block data to render into the DOM.
 */
/**
 * Creates a new block DOM element for the given Block object.
 *
 * Checklist blocks get special treatment: a real <input type="checkbox">
 * is inserted before the contenteditable text so clicking it actually works.
 * The checked state is stored in data-checked on the block element and in
 * block.meta.checked in the store / database.
 *
 * @param block - The block data to render.
 */
export function createBlockElement(block: Block): HTMLElement {
  const tag = BLOCK_TAG[block.type] || "div";
  const el  = document.createElement(tag) as HTMLElement;
 
  el.className = `editor-block editor-block--${block.type}`;
  el.setAttribute("data-block-id",   block.id);
  el.setAttribute("data-block-type", block.type);
 
  if (block.type === "checklist") {
    const checked = block.meta?.checked === true;
    el.setAttribute("data-checked", checked ? "true" : "false");
    el.contentEditable = "true";
 
    // Real checkbox — clicking it toggles data-checked and saves
    const checkbox = document.createElement("input");
    checkbox.type      = "checkbox";
    checkbox.checked   = checked;
    checkbox.className = "checklist-checkbox";
    // Prevent the click from also triggering contenteditable cursor placement
    checkbox.setAttribute("contenteditable", "false");
    checkbox.setAttribute("aria-label", "Mark complete");
    checkbox.tabIndex = -1; // tab navigation stays in the text
 
    el.appendChild(checkbox);
 
    // Text node after the checkbox
    const textSpan = document.createElement("span");
    textSpan.className = "checklist-text";
    textSpan.textContent = block.content || "";
    el.appendChild(textSpan);
 
    el.setAttribute("data-placeholder", "To-do item...");
  } else if (block.type !== "separator") {
    el.contentEditable = "true";
    el.textContent = block.content || "";
 
    if (block.type === "paragraph") {
      el.setAttribute("data-placeholder", "Start writing...");
    }
  }
 
  return el;
}
 
/**
 * Reads all current block elements from the blocksContainer and returns
 * them as a Block array. Always reflects live DOM state.
 *
 * @param blocksContainer - The #editor-blocks element.
 */
export function readBlocksFromDOM(blocksContainer: HTMLElement): Block[] {
  return Array.from(
    blocksContainer.querySelectorAll<HTMLElement>(".editor-block")
  ).map((el) => {
    const type = getBlockType(el);
 
    if (type === "checklist") {
      const textEl  = el.querySelector<HTMLElement>(".checklist-text");
      const checked = el.getAttribute("data-checked") === "true";
      return {
        id:      getBlockId(el) || generateBlockId(),
        type,
        content: textEl?.textContent || "",
        meta:    { checked },
      };
    }
 
    return {
      id:      getBlockId(el) || generateBlockId(),
      type,
      content: el.textContent || "",
    };
  });
}
