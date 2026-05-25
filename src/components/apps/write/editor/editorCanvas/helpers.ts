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
  // First check the element itself
  if (el.dataset.blockType) {
    return el.dataset.blockType as BlockType;
  }
  
  // If not found, search up the DOM tree for the block container
  const blockContainer = el.closest<HTMLElement>(".editor-block, .editor-block--checklist");
  if (blockContainer?.dataset.blockType) {
    return blockContainer.dataset.blockType as BlockType;
  }
  
  return "paragraph";
}

export function getBlockId(el: HTMLElement): string | null {
  // First check the element itself
  if (el.dataset.blockId) {
    return el.dataset.blockId;
  }
  
  // If not found, search up the DOM tree for the block container
  const blockContainer = el.closest<HTMLElement>(".editor-block, .editor-block--checklist");
  return blockContainer?.dataset.blockId || null;
}

export function generateBlockId(): string {
  return `b_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function createBlockElement(block: Block): HTMLElement | null {
  if (typeof document === 'undefined') {
    // Return null or a simple placeholder when document is not available (SSR)
    return null;
  }
  
  const tag = BLOCK_TAG[block.type] || "div";
  const el = document.createElement(tag) as HTMLElement;

  el.className = `editor-block editor-block--${block.type}`;
  el.setAttribute("data-block-id", block.id);
  el.setAttribute("data-block-type", block.type);

  if (block.type === 'checklist') {
    // Use the existing 'el', don't redeclare
    el.className = 'editor-block--checklist';

    // Create the checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checklist-checkbox';
    checkbox.checked = !!block.meta?.checked;
    const span = document.createElement('span');
    span.className = 'checklist-text';
    span.textContent = block.content;
    // CRITICAL FIX: Make the text span contenteditable so new checklist blocks can be typed in
    span.contentEditable = "true";

    // Append checkbox and text to the existing 'el'
    el.appendChild(checkbox);
    el.appendChild(span);

    // Set other attributes if needed
    el.setAttribute('data-block-id', block.id);
    el.setAttribute('data-block-type', block.type);
    if (!block.content) {
      span.setAttribute('data-placeholder', 'To-do item...');
    }
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
      const checkedAttr = el.getAttribute("data-checked");
      const checked = checkedAttr === "true"; // convert to boolean
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
function getShortStack(): string {
  const err = new Error();
  const stack = err.stack?.split('\n').slice(2, 5).join(' ').trim() || '';
  return stack;
}