/**
 * @file src/components/apps/write/editor/editorCanvas.ts
 * @description Core editor engine with NanoStores integration.
 *
 * Fixes in this revision:
 * 1. Title Enter key now moves focus to the first block instead of
 *    inserting a newline (keydown listener now covers both title and blocks).
 * 2. "editor:set-block-type" event is handled here — replaces the focused
 *    block element in the DOM and calls updateBlocks.
 * 3. replaceWith() re-reads blocks from the DOM after the swap so the
 *    store receives the correct post-transform state.
 */

import type { Block, BlockType } from "@/lib/journal/types";
import { updateTitle, updateBlock, updateBlocks } from "@/stores/editor";
import { CALLOUT_CYCLE, type CalloutVariant } from "./consts";
import { blockBehaviors, type EnterContext } from "./behaviors";
import { 
  getBlockType, 
  getBlockId, 
  generateBlockId, 
  createBlockElement, 
  readBlocksFromDOM 
} from "./helpers";

//! ──────────────────────────────────────────────────────────────────────────────
//! ─── Initialization ───────────────────────────────────────────────────────────
//! ──────────────────────────────────────────────────────────────────────────────

/**
 * Bootstraps the editor for a given document.
 * Called once by EditorCanvas.astro after the DOM is ready.
 *
 * Wires up:
 * - Title input → updateTitle (store + debounced save)
 * - Block input → updateBlock (store + debounced save)
 * - Keydown on both title and blocks (Enter, Backspace, Arrows)
 * - focusin on blocks → broadcasts "editor:block-focused" for the toolbar
 * - focusin on title → broadcasts "editor:title-focused"
 * - "editor:set-block-type" window event → transforms the last-focused block
 *
 * @param documentId - The UUID of the document being edited.
 */
/**
 * Shows a brief, unobtrusive hint near the block telling the user to use
 * Ctrl+Arrow or Tab to navigate between blocks.
 *
 * The hint fades in, stays for 1.8s, then fades out. Only one hint is shown
 * at a time — a second call while one is visible resets the timer.
 *
 * @param direction - "up" or "down", used to position the hint correctly.
 */
let _hintEl: HTMLElement | null = null;
let _hintTimer: ReturnType<typeof setTimeout> | null = null;
 
function showNavHint(direction: "up" | "down"): void {
  // Reuse existing element if visible
  if (!_hintEl) {
    _hintEl = document.createElement("div");
    _hintEl.className = "editor-nav-hint";
    _hintEl.setAttribute("aria-live", "polite");
    _hintEl.setAttribute("role", "status");
    document.body.appendChild(_hintEl);
  }
 
  _hintEl.textContent = direction === "up"
    ? "↑ Ctrl + ↑ to move to previous block"
    : "↓ Ctrl + ↓ to move to next block";
 
  _hintEl.classList.remove("is-hidden");
  _hintEl.classList.add("is-visible");
 
  if (_hintTimer) clearTimeout(_hintTimer);
  _hintTimer = setTimeout(() => {
    if (_hintEl) {
      _hintEl.classList.remove("is-visible");
      _hintEl.classList.add("is-hidden");
    }
  }, 1800);
}
 
export function initEditor(documentId: string): void {
  const titleEl         = document.getElementById("editor-title") as HTMLElement | null;
  const blocksContainer = document.getElementById("editor-blocks")  as HTMLElement | null;
  if (!blocksContainer) return;
 
  /**
   * Tracks the last block that received focus.
   * We store this explicitly because the toolbar button click blurs the block
   * before the "editor:set-block-type" event fires — document.activeElement
   * would point at the toolbar button, not the block we want to transform.
   */
  let lastFocusedBlock: HTMLElement | null = null;
 
  // ── Title ──────────────────────────────────────────────────────────────────
 
  if (titleEl) {
    titleEl.addEventListener("input", () => {
      updateTitle(titleEl.textContent?.trim() || "");
    });
 
    titleEl.addEventListener("focusin", () => {
      // Tell the toolbar to show "—" in the block-type selector
      window.dispatchEvent(new CustomEvent("editor:title-focused"));
    });
  }
 
  // ── Block input ────────────────────────────────────────────────────────────
 
  /**
   * Handles text input on a block. Updates the single changed block in the
   * store using the stable block ID — avoids re-reading the whole DOM on
   * every keystroke, which keeps cursor position stable.
   *
   * @param e - The native input event.
   */
  const handleInput = (e: Event): void => {
    const target = e.target as HTMLElement;
 
    // Input can fire on a child element (e.g. the checklist text span).
    // Walk up to the actual editor-block.
    const blockEl = target.classList.contains("editor-block")
      ? target
      : target.closest<HTMLElement>(".editor-block");
    if (!blockEl) return;
 
    const type    = getBlockType(blockEl);
    const blockId = blockEl.dataset.blockId;
 
    if (type === "checklist") {
      // Checklist: always re-read everything because textContent would include
      // the checkbox label. updateBlocks re-reads .checklist-text correctly.
      updateBlocks(readBlocksFromDOM(blocksContainer));
    } else if (blockId) {
      updateBlock(blockId, blockEl.textContent || "");
    }
  };
 
  // ── Keyboard handling ──────────────────────────────────────────────────────
 
  /**
   * Handles keydown events on both the title and block elements.
   *
   * Title:
   *   Enter → move focus to the first block (never insert a newline)
   *
   * Blocks:
   *   Enter          → delegate to per-type blockBehaviors
   *   Shift+Enter    → delegate to per-type blockBehaviors (if defined)
   *   Backspace      → delete empty block, move focus to previous block
   *   ArrowUp/Down   → move focus between blocks
   *
   * @param e - The native keydown event.
   */
  const handleKeyDown = (e: KeyboardEvent): void => {
    const target  = e.target as HTMLElement;
    const isTitle = target.classList.contains("editor-title");
    const isBlock = target.classList.contains("editor-block");
 
    if (!isTitle && !isBlock) return;
 
    // ── Enter on the title: jump to first block ──────────────────────────────
    if (isTitle && e.key === "Enter") {
      e.preventDefault();
      const firstBlock = blocksContainer.querySelector<HTMLElement>(".editor-block");
      firstBlock?.focus();
      return;
    }
 
    // Everything below is blocks-only
    if (!isBlock) return;
 
    const type     = getBlockType(target);
    const behavior = blockBehaviors[type];
 
    /**
     * Creates a new block immediately after `target` in the DOM, focuses it,
     * then syncs the full block array to the store.
     *
     * @param newBlockData - The type and content for the new block.
     */
    const createAfter = (newBlockData: Omit<Block, "id">): void => {
      const newBlock: Block = { ...newBlockData, id: generateBlockId() };
      const newEl           = createBlockElement(newBlock);
      target.after(newEl);
      newEl.focus();
      updateBlocks(readBlocksFromDOM(blocksContainer));
    };
 
    /**
     * Replaces `target` with a new element of `newType`, preserving content.
     * Re-reads the DOM after the swap so the store receives accurate state.
     *
     * @param newType - The BlockType to transform `target` into.
     */
    const replaceWith = (newType: BlockType): void => {
      const newBlock: Block = {
        id:      getBlockId(target) || generateBlockId(),
        type:    newType,
        content: target.textContent || "",
      };
      const newEl = createBlockElement(newBlock);
      target.replaceWith(newEl);
      lastFocusedBlock = newEl;
      newEl.focus();
      // Re-read from DOM — store blocks were stale before the swap
      updateBlocks(readBlocksFromDOM(blocksContainer));
    };
 
    /**
     * Splits `target` at the cursor offset: text before stays in the current
     * block, text after goes into a new block of the same type.
     *
     * @param atOffset - Character offset at which to split (defaults to cursor).
     */
    const splitBlock = (atOffset = window.getSelection()?.getRangeAt(0)?.startOffset ?? 0): void => {
      const text   = target.textContent || "";
      const before = text.slice(0, atOffset);
      const after  = text.slice(atOffset);
      target.textContent = before;
      createAfter({
        type:    type === "heading" ? "paragraph" : type,
        content: after,
      });
    };
 
    const block: Block = {
      id:      getBlockId(target) || generateBlockId(),
      type,
      content: target.textContent || "",
    };
 
    const cursorOffset = window.getSelection()?.getRangeAt(0)?.startOffset ?? 0;
 
    const ctx: EnterContext = {
      documentId,
      target,
      block,
      cursorOffset,
      createAfter,
      splitBlock,
      replaceWith,
    };
 
    // ── Enter ────────────────────────────────────────────────────────────────────────────
    if (e.key === "Enter" && behavior) {
      if (e.shiftKey) {
        if (behavior.onShiftEnter) {
          // Code blocks want the browser to insert the newline natively.
          // All other blocks with onShiftEnter should preventDefault.
          if (type !== "code") e.preventDefault();
          behavior.onShiftEnter(ctx);
        }
        // No onShiftEnter: let the browser handle Shift+Enter natively
      } else {
        // Plain Enter: always intercept so no native newline is inserted
        e.preventDefault();
        if (behavior.onEnter) {
          behavior.onEnter(ctx);
        }
      }
      return;
    }
 
    // ── Backspace on an empty block ──────────────────────────────────────────
    if (e.key === "Backspace" && target.textContent === "") {
      const allBlocks = Array.from(
        blocksContainer.querySelectorAll<HTMLElement>(".editor-block")
      );
      if (allBlocks.length <= 1) return; // keep at least one block
 
      e.preventDefault();
      const idx    = allBlocks.indexOf(target);
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
 
      updateBlocks(readBlocksFromDOM(blocksContainer));
      return;
    }
 
    // ── Plain ArrowUp/Down: show navigation hint ─────────────────────────────────
    // We do NOT intercept plain arrows — the browser handles cursor movement.
    // But when the user is in a single-line block and hits Up/Down, they get
    // stuck (the cursor doesn't move, nothing happens). Show a brief hint.
    if ((e.key === "ArrowUp" || e.key === "ArrowDown") && !e.ctrlKey && !e.metaKey) {
      const blockRect  = target.getBoundingClientRect();
      const lineHeight = parseFloat(getComputedStyle(target).lineHeight) || 24;
      const isSingleLine = blockRect.height <= lineHeight * 1.5;
 
      if (isSingleLine) {
        // Show the hint — don't preventDefault, let browser try (it will do nothing
        // on a single-line block which is fine)
        showNavHint(e.key === "ArrowUp" ? "up" : "down");
      }
      // Multi-line blocks: let browser move the cursor normally, no hint needed
      return;
    }
 
    // ── Ctrl+Left/Right: cycle callout variant ───────────────────────────────────
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "ArrowLeft" || e.key === "ArrowRight") &&
      type.startsWith("callout")
    ) {
      e.preventDefault();
      const currentIdx  = CALLOUT_CYCLE.indexOf(type as CalloutVariant);
      const dir         = e.key === "ArrowRight" ? 1 : -1;
      const nextVariant = CALLOUT_CYCLE[(currentIdx + dir + CALLOUT_CYCLE.length) % CALLOUT_CYCLE.length] as BlockType;
 
      const newBlock: Block = {
        id:      getBlockId(target) || generateBlockId(),
        type:    nextVariant,
        content: target.textContent || "",
      };
      const newEl = createBlockElement(newBlock);
      target.replaceWith(newEl);
      lastFocusedBlock = newEl;
      newEl.focus();
      window.dispatchEvent(new CustomEvent("editor:block-focused", { detail: { blockType: nextVariant } }));
      updateBlocks(readBlocksFromDOM(blocksContainer));
      return;
    }
 
    // ── Tab / Ctrl+Arrow Up-Down: move between blocks ─────────────────────────
    //    Tab        → next block
    //    Shift+Tab  → previous block
    //    Ctrl+ArrowUp/Down → previous/next block
    //    Plain ArrowUp/Down → browser default (moves cursor within the block)
    if (
      e.key === "Tab" ||
      ((e.ctrlKey || e.metaKey) && (e.key === "ArrowUp" || e.key === "ArrowDown"))
    ) {
      e.preventDefault();
      const dir = (e.key === "Tab" && !e.shiftKey) || e.key === "ArrowDown" ? 1 : -1;
 
      const allBlocks = Array.from(
        blocksContainer.querySelectorAll<HTMLElement>(".editor-block")
      );
      const idx = allBlocks.indexOf(target);
 
      // Walk in the chosen direction, skipping non-editable separators
      let focusIdx = idx + dir;
      while (
        focusIdx >= 0 &&
        focusIdx < allBlocks.length &&
        allBlocks[focusIdx].getAttribute("contenteditable") === null
      ) {
        focusIdx += dir;
      }
 
      const focusTarget = allBlocks[focusIdx];
      if (!focusTarget) return;
 
      focusTarget.focus();
      const range = document.createRange();
      range.selectNodeContents(focusTarget);
      range.collapse(dir === 1);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
  };
 
  // ── Focus tracking ─────────────────────────────────────────────────────────
 
  /**
   * Keeps lastFocusedBlock up to date and broadcasts the focused block's type
   * to the toolbar so the block-type selector label stays in sync.
   *
   * We use focusin (which bubbles) on the container so we only need one listener.
   *
   * @param e - The native focusin event.
   */
  const handleFocusIn = (e: Event): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("editor-block")) {
      lastFocusedBlock = target;
      window.dispatchEvent(
        new CustomEvent("editor:block-focused", {
          detail: { blockType: getBlockType(target) },
        })
      );
    }
  };
 
  // ── Block type transform (from toolbar) ────────────────────────────────────
 
  /**
   * Listens for "editor:set-block-type" dispatched by BlockTypeSelector.
   * Transforms lastFocusedBlock to the requested type using the same
   * replaceWith logic as keyboard transforms.
   *
   * We use lastFocusedBlock rather than document.activeElement because the
   * toolbar button click causes the block to blur before this event fires.
   */
  window.addEventListener("editor:set-block-type", ((e: CustomEvent) => {
    const blockType = (e.detail as { blockType: BlockType }).blockType;
    const target    = lastFocusedBlock;
 
    if (!target || !target.isConnected) return;
    if (getBlockType(target) === blockType) return; // no-op
 
    const newBlock: Block = {
      id:      getBlockId(target) || generateBlockId(),
      type:    blockType,
      content: target.textContent || "",
    };
    const newEl = createBlockElement(newBlock);
    target.replaceWith(newEl);
    lastFocusedBlock = newEl;
 
    if (blockType !== "separator") {
      newEl.focus();
      const range = document.createRange();
      range.selectNodeContents(newEl);
      range.collapse(false);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
 
    // Broadcast updated type back to the toolbar label
    window.dispatchEvent(
      new CustomEvent("editor:block-focused", { detail: { blockType } })
    );
 
    updateBlocks(readBlocksFromDOM(blocksContainer));
  }) as EventListener);
 
  // ── Checkbox click handler ────────────────────────────────────────────────
  /**
   * Delegated click listener for checklist checkboxes.
   *
   * When the user clicks a .checklist-checkbox input:
   * 1. Sync data-checked on the parent block element.
   * 2. Toggle the text strikethrough via CSS (driven by data-checked).
   * 3. Re-read all blocks from the DOM and save.
   *
   * We use a delegated listener on blocksContainer so dynamically created
   * checklist blocks are covered without re-attaching anything.
   */
  blocksContainer.addEventListener("change", (e: Event) => {
    const checkbox = e.target as HTMLInputElement;
    if (!checkbox.classList.contains("checklist-checkbox")) return;
 
    const blockEl = checkbox.closest<HTMLElement>(".editor-block--checklist");
    if (!blockEl) return;
 
    const checked = checkbox.checked;
    blockEl.setAttribute("data-checked", checked ? "true" : "false");
 
    updateBlocks(readBlocksFromDOM(blocksContainer));
  });
 
  // ── Attach listeners ───────────────────────────────────────────────────────
 
  blocksContainer.addEventListener("input",    handleInput);
  blocksContainer.addEventListener("keydown",  handleKeyDown);
  blocksContainer.addEventListener("focusin",  handleFocusIn);
 
  // Title keydown needs its own listener since it's outside blocksContainer
  titleEl?.addEventListener("keydown", handleKeyDown);
}
 
/** Resets editor state. Call when navigating away from a document. */
export function disposeEditor(): void {
  // Store cleanup is handled by stores/editor.ts disposeEditor()
}
