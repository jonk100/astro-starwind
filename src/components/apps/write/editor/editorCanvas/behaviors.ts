// src/components/apps/write/editor/behaviors.ts
import type { Block, BlockType } from "@/lib/journal/types";

export type EnterContext = {
  documentId: string;
  target: HTMLElement;
  block: Block;
  cursorOffset: number;
  createAfter: (newBlock: Omit<Block, "id">) => void;
  splitBlock: (atOffset?: number) => void;
  replaceWith: (newType: BlockType) => void;
};
 
export type BlockBehavior = {
  onEnter?: (ctx: EnterContext) => void;
  onShiftEnter?: (ctx: EnterContext) => void;
};
 
/**
 * Per-block-type keyboard behaviours.
 * Each entry defines what happens when Enter (or Shift+Enter) is pressed
 * while that block type is focused.
 */
export const blockBehaviors: Record<BlockType, BlockBehavior> = {
  /**
   * Paragraph: Enter always creates a new paragraph below.
   * Empty paragraph: still creates a new one (standard doc-editor behaviour).
   */
  /**
   * Paragraph: Enter splits at the cursor. Text before stays; text after
   * moves into a new paragraph. Matches behaviour of every modern editor.
   */
  paragraph: { onEnter: ({ splitBlock }) => splitBlock() },
 
  /**
   * Heading: Enter splits at cursor; the new block becomes a paragraph.
   */
  heading:   { onEnter: ({ splitBlock }) => splitBlock() },
  "heading-1": { onEnter: ({ splitBlock }) => splitBlock() },
  "heading-2": { onEnter: ({ splitBlock }) => splitBlock() },
  "heading-3": { onEnter: ({ splitBlock }) => splitBlock() },
  "heading-4": { onEnter: ({ splitBlock }) => splitBlock() },
  "heading-5": { onEnter: ({ splitBlock }) => splitBlock() },
 
  /**
   * Quote: Enter on a non-empty line continues the quote.
   * Enter on an EMPTY quote line escapes to a new paragraph — same UX as
   * Notion/Bear/Craft where double-Enter exits the block type.
   */
  quote: {
    onEnter: ({ target, createAfter, replaceWith }) => {
      const textContent = target.querySelector<HTMLElement>(".checklist-text")?.textContent
        ?? target.textContent ?? "";
      if (textContent.trim() === "") {
        replaceWith("paragraph");
      } else {
        createAfter({ type: "quote", content: "" });
      }
    },
  },
 
  /**
   * Checklist: Enter on a non-empty item creates another checklist item.
   * Enter on an EMPTY checklist item escapes to paragraph.
   */
  checklist: {
    onEnter: ({ target, createAfter, replaceWith }) => {
      const textEl = target.querySelector<HTMLElement>(".checklist-text");
      const text   = textEl?.textContent ?? target.textContent ?? "";
      if (text.trim() === "") {
        replaceWith("paragraph");
      } else {
        createAfter({ type: "checklist", content: "" });
      }
    },
  },
 
  /**
   * Callout: Enter on non-empty continues the callout.
   * Enter on empty escapes to paragraph.
   */
  callout: {
    onEnter: ({ target, createAfter, replaceWith }) => {
      if ((target.textContent ?? "").trim() === "") {
        replaceWith("paragraph");
      } else {
        createAfter({ type: "callout", content: "" });
      }
    },
  },

  "callout-info": {
    onEnter: ({ target, createAfter, replaceWith }) => {
      if ((target.textContent ?? "").trim() === "") {
        replaceWith("paragraph");
      } else {
        createAfter({ type: "callout-info", content: "" });
      }
    },
  },
  
  "callout-warning": {
    onEnter: ({ target, createAfter, replaceWith }) => {
      if ((target.textContent ?? "").trim() === "") {
        replaceWith("paragraph");
      } else {
        createAfter({ type: "callout-info", content: "" });
      }
    },
  },
  
  "callout-success": {
    onEnter: ({ target, createAfter, replaceWith }) => {
      if ((target.textContent ?? "").trim() === "") {
        replaceWith("paragraph");
      } else {
        createAfter({ type: "callout-info", content: "" });
      }
    },
  },
  
  "callout-danger": {
    onEnter: ({ target, createAfter, replaceWith }) => {
      if ((target.textContent ?? "").trim() === "") {
        replaceWith("paragraph");
      } else {
        createAfter({ type: "callout-info", content: "" });
      }
    },
  },
 
  prompt:    { onEnter: ({ createAfter }) => createAfter({ type: "paragraph", content: "" }) },
 
  /**
   * Separator: Enter creates a new paragraph immediately after the <hr>
   * and focuses it, so the user can continue writing below the divider.
   */
  separator: { onEnter: ({ createAfter }) => createAfter({ type: "paragraph", content: "" }) },
  code: {
    /**
     * Enter (no modifier) exits the code block by creating a new paragraph
     * below — same escape hatch as every other block type.
     *
     * Shift+Enter inserts a literal newline within the code block.
     * We let the BROWSER handle this natively by NOT preventing default.
     * contenteditable + white-space:pre already knows how to insert newlines
     * and place the caret correctly — fighting it with insertNode is what
     * caused the stuck-caret bug. onShiftEnter is defined so the dispatcher
     * knows to call it (and not call onEnter), but we do nothing inside it.
     */
    onEnter: ({ createAfter }) => createAfter({ type: "paragraph", content: "" }),
    onShiftEnter: () => { /* intentionally empty — browser handles the newline */ },
  },
};
