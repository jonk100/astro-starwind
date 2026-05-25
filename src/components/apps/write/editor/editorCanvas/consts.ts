// src/components/apps/write/editor/constants.ts

export const BLOCK_TAG: Record<string, string> = {
  paragraph:  "div",
  heading:    "h2",   // backwards-compat alias for heading-1
  "heading-1": "h2",
  "heading-2": "h3",
  "heading-3": "h4",
  "heading-4": "h5",
  "heading-5": "h6",
  quote:       "blockquote",
  checklist:   "div",
  callout:     "div",
  code:        "pre",
  separator:   "hr",
  prompt:      "div",
  // Callout variants — all render as <div>, class drives the style
  "callout-info":    "div",
  "callout-warning": "div",
  "callout-success": "div",
  "callout-danger":  "div",
};
 
/** Ordered cycle of callout variants for Ctrl+Left/Right. */
export const CALLOUT_CYCLE = [
  "callout",
  "callout-info",
  "callout-warning",
  "callout-success",
  "callout-danger",
] as const;
export type CalloutVariant = typeof CALLOUT_CYCLE[number];
