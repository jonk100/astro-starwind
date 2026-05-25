import type { Block, BlockType } from "@/lib/journal/types";
import { BLOCK_TAG } from "./consts";
import { editorActor } from "./editorCanvas";

let saveTimeout: ReturnType<typeof setTimeout> | null = null;
let lastSentBlocksHash = '';

export function sanitiseAndSendBlocks(blocksContainer: HTMLElement) {
  if (!editorActor) {
    console.warn('[sanitise] No actor – skipping');
    return;
  }

  const rawBlocks = readBlocksFromDOM(blocksContainer);
  const cleanBlocks = rawBlocks.map(block => ({
    id: block.id || generateBlockId(),
    type: block.type,
    content: block.content ?? '',
    meta: block.meta && typeof block.meta === 'object' ? block.meta : undefined,
  }));

  const hash = JSON.stringify(cleanBlocks);
  if (hash === lastSentBlocksHash) return;
  lastSentBlocksHash = hash;

  if (saveTimeout) clearTimeout(saveTimeout);

  console.log('[debounce] Scheduling save in 2000ms');
  saveTimeout = setTimeout(() => {
  console.log('[debounce] Sending BLOCKS_CHANGED now');
    editorActor?.send({ type: 'BLOCKS_CHANGED', blocks: cleanBlocks });
    saveTimeout = null;
    console.log('[debounce] Sending BLOCKS_CHANGED now');

  }, 5000);
}

export function getBlockType(el: HTMLElement): BlockType {
  return (el.dataset.blockType as BlockType) || "paragraph";
}

export function getBlockId(el: HTMLElement): string | null {
  return el.dataset.blockId || null;
}

export function generateBlockId(): string {
  return `b_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function createBlockElement(block: Block): HTMLElement {
  const tag = BLOCK_TAG[block.type] || "div";
  const el = document.createElement(tag) as HTMLElement;

  el.className = `editor-block editor-block--${block.type}`;
  el.setAttribute("data-block-id", block.id);
  el.setAttribute("data-block-type", block.type);

  if (block.type === "checklist") {
    const checked = block.meta?.checked === true;
    el.setAttribute("data-checked", checked ? "true" : "false");
    el.contentEditable = "true";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.className = "checklist-checkbox";
    checkbox.setAttribute("contenteditable", "false");
    checkbox.setAttribute("aria-label", "Mark complete");
    checkbox.tabIndex = -1;

    el.appendChild(checkbox);

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

export function readBlocksFromDOM(blocksContainer: HTMLElement): Block[] {
  return Array.from(blocksContainer.querySelectorAll<HTMLElement>(".editor-block")).map((el) => {
    const type = getBlockType(el);

    if (type === "checklist") {
      const textEl = el.querySelector<HTMLElement>(".checklist-text");
      const checked = el.getAttribute("data-checked") === "true";
      return {
        id: getBlockId(el) || generateBlockId(),
        type,
        content: textEl?.textContent || "",
        meta: { checked },
      };
    }

    return {
      id: getBlockId(el) || generateBlockId(),
      type,
      content: el.textContent || "",
    };
  });
}

//! Helper to get stack trace (simplified)
export function getShortStack(): string {
  const err = new Error();
  const stack = err.stack?.split('\n').slice(2, 5).join(' ').trim() || '';
  return stack;
}