


import { blocksContainer } from "./helpers";

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
 