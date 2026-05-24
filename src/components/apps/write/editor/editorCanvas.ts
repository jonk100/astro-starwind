/**
 * @file src/components/apps/journal/editor/editorCanvas.ts
 * @description Client-side editor logic for the Write app.
 */

import type { Block, EditorState, BlockType } from "@/lib/journal/types";
import { actions } from "astro:actions";
import { debouncedSaveTitle } from "./utils";

// ─── Constants ───────────────────────────────────────────────────────────────

const AUTOSAVE_DEBOUNCE_MS = 250;

const BLOCK_TAG: Record<string, string> = {
  paragraph: "div",
  heading: "h2",
  quote: "blockquote",
  checklist: "div",
  callout: "div",
  code: "pre",
  separator: "hr",
  prompt: "div",
};

// ─── State ───────────────────────────────────────────────────────────────────

const documentStates = new Map<string, EditorState>();

/**
 * Tracks currently focused editor block.
 * document.activeElement is unreliable due to toolbar focus shifts.
 */
let activeEditorBlock: HTMLElement | null = null;

// ─── State updates ───────────────────────────────────────────────────────────

function updateEditorState(
  documentId: string,
  updater: (state: EditorState) => EditorState
) {
  const current = documentStates.get(documentId);

  const next = updater(
    current ?? {
      documentId,
      blocks: [],
      isDirty: false,
      isSaving: false,
      lastSavedAt: null,
    }
  );

  documentStates.set(documentId, next);

  window.dispatchEvent(
    new CustomEvent("editor:save-status", {
      detail: {
        status: next.isSaving
          ? "saving"
          : next.isDirty
          ? "unsaved"
          : "saved",
      },
    })
  );
}

// ─── DOM helpers ─────────────────────────────────────────────────────────────

function getCanvasElement(documentId: string): HTMLElement | null {
  return document.querySelector(
    `#editor-canvas[data-document-id="${documentId}"]`
  );
}

function getBlockElements(documentId: string): HTMLElement[] {
  const canvas = getCanvasElement(documentId);
  if (!canvas) return [];

  return Array.from(
    canvas.querySelectorAll<HTMLElement>(".editor-block")
  );
}

function getBlockId(el: HTMLElement): string | null {
  return el.dataset.blockId || null;
}

function getBlockType(el: HTMLElement): BlockType {
  return (el.dataset.blockType as BlockType) || "paragraph";
}

// ─── Block creation ─────────────────────────────────────────────────────────

function generateBlockId(): string {
  return `b_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function createBlockElement(block: Block): HTMLElement {
  const tagName = BLOCK_TAG[block.type] ?? "div";

  const el = document.createElement(tagName);

  el.className = `editor-block editor-block--${block.type}`;

  el.setAttribute("data-block-id", block.id);
  el.setAttribute("data-block-type", block.type);

  if (block.type !== "separator") {
    el.contentEditable = "true";
    el.setAttribute("role", "textbox");
    el.setAttribute("aria-multiline", "true");
    el.setAttribute("spellcheck", "true");
    el.textContent = block.content;
  }

  return el;
}

// ─── Focus tracking ──────────────────────────────────────────────────────────

function handleFocusIn(event: Event) {
  const target = event.target as HTMLElement;

  if (!target.classList.contains("editor-block")) return;

  activeEditorBlock = target;

  window.dispatchEvent(
    new CustomEvent("editor:block-focused", {
      detail: { blockType: getBlockType(target) },
    })
  );
}

function handleFocusOut(event: Event) {
  const target = event.target as HTMLElement;

  if (target.classList.contains("editor-block")) {
    target.removeAttribute("data-focused");
  }
}

// ─── Parse DOM ───────────────────────────────────────────────────────────────

function parseBlocksFromDOM(documentId: string): Block[] {
  return getBlockElements(documentId).map((el) => ({
    id: getBlockId(el) || generateBlockId(),
    type: getBlockType(el),
    content: el.textContent || "",
  }));
}

// ─── Transform block ─────────────────────────────────────────────────────────

function transformFocusedBlock(
  documentId: string,
  blockType: BlockType
) {
  const focused = activeEditorBlock;

  if (!focused) return;
  if (!focused.classList.contains("editor-block")) return;

  const currentType = getBlockType(focused);
  if (currentType === blockType) return;

  const content = focused.textContent || "";
  const blockId = getBlockId(focused) || generateBlockId();

  const newBlock: Block = {
    id: blockId,
    type: blockType,
    content,
  };

  const newEl = createBlockElement(newBlock);

  focused.replaceWith(newEl);

  activeEditorBlock = newEl;

  if (blockType !== "separator") {
    newEl.focus();

    const range = document.createRange();
    range.selectNodeContents(newEl);
    range.collapse(false);

    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  window.dispatchEvent(
    new CustomEvent("editor:block-focused", {
      detail: { blockType },
    })
  );

  const blocks = parseBlocksFromDOM(documentId);

  updateEditorState(documentId, (prev) => ({
    ...prev,
    isDirty: true,
    blocks,
  }));

  debouncedSave(documentId, blocks);
}

// ─── Autosave ────────────────────────────────────────────────────────────────

let saveTimeout: ReturnType<typeof setTimeout> | null = null;

function debouncedSave(documentId: string, blocks: Block[]) {
  if (saveTimeout) clearTimeout(saveTimeout);

  saveTimeout = setTimeout(async () => {
    await actions.write.saveBlocks({
      document_id: documentId,
      blocks,
    });

    saveTimeout = null;
  }, AUTOSAVE_DEBOUNCE_MS);
}

// ─── Input handling ──────────────────────────────────────────────────────────

function handleBlockInput(event: Event) {
  const target = event.target as HTMLElement;

  const canvas = target.closest("#editor-canvas") as HTMLElement | null;
  if (!canvas) return;

  const documentId = canvas.dataset.documentId;
  if (!documentId) return;

  if (target.classList.contains("editor-block")) {
    updateEditorState(documentId, (prev) => ({
      ...prev,
      isDirty: true,
    }));

    debouncedSave(documentId, parseBlocksFromDOM(documentId));
  }
}

// ─── Keyboard handling ───────────────────────────────────────────────────────

function handleBlockKeyDown(event: KeyboardEvent) {
  const target = event.target as HTMLElement;

  if (!target.classList.contains("editor-block")) return;

  const canvas = target.closest("#editor-canvas") as HTMLElement | null;
  if (!canvas) return;

  const documentId = canvas.dataset.documentId;
  if (!documentId) return;

  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();

    const newBlock: Block = {
      id: generateBlockId(),
      type: "paragraph",
      content: "",
    };

    const newEl = createBlockElement(newBlock);

    target.after(newEl);
    newEl.focus();

    activeEditorBlock = newEl;

    const blocks = parseBlocksFromDOM(documentId);

    updateEditorState(documentId, (prev) => ({
      ...prev,
      isDirty: true,
      blocks,
    }));

    debouncedSave(documentId, blocks);
  }
}

// ─── Init ────────────────────────────────────────────────────────────────────

export function initEditor(documentId: string) {
  const canvas = getCanvasElement(documentId);
  if (!canvas) return;

  updateEditorState(documentId, (prev) => ({
    ...prev,
    blocks: parseBlocksFromDOM(documentId),
  }));

  canvas.addEventListener("input", handleBlockInput);
  canvas.addEventListener("keydown", handleBlockKeyDown);
  canvas.addEventListener("focusin", handleFocusIn);
  canvas.addEventListener("focusout", handleFocusOut);

  window.addEventListener(
    "editor:set-block-type",
    ((e: CustomEvent) => {
      transformFocusedBlock(
        documentId,
        e.detail.blockType as BlockType
      );
    }) as EventListener
  );
}

export function disposeEditor(documentId: string) {
  documentStates.delete(documentId);
}