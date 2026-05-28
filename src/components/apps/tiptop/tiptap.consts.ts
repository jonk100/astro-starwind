/**
 * Block type definition used by the editor UI.
 */
export interface BlockTypeMenuItem {
  type: string;
  label: string;
}

/**
 * Font family options presented in the selector.
 */
export const BLOCK_TYPES: BlockTypeMenuItem[] = [
  {
    type: 'paragraph',
    label: '¶ Para'
  },
  {
    type: 'heading-1',
    label: 'H1'
  },
  {
    type: 'heading-2',
    label: 'H2'
  },
  {
    type: 'heading-3',
    label: 'H3'
  },
  {
    type: 'heading-4',
    label: 'H4'
  },
  {
    type: 'heading-5',
    label: 'H5'
  },
  {
    type: 'blockquote',
    label: 'Quote'
  },
  {
    type: 'codeBlock',
    label: '<code />'
  },
  {
    type: 'bulletList',
    label: '• list'
  },
  {
    type: 'orderedList',
    label: '1. list'
  },
  {
    type: 'taskList',
    label: '[ ] Todo'
  }
];



export const FONT_FAMILIES = [
  { label: 'Sans',  value: 'sans-serif' },
  { label: 'Serif', value: 'Georgia, serif' },
  { label: 'Mono',  value: 'var(--font-mono, monospace)' },
];

/** Font size presets mapped to pixel values TipTap's FontSize extension accepts. */
export const FONT_SIZES = [
  { label: 'XS',   value: '12px' },
  { label: 'SM',   value: '14px' },
  { label: 'Base', value: '16px' },
  { label: 'LG',   value: '20px' },
  { label: 'XL',   value: '24px' },
  { label: '2XL',  value: '32px' },
];

/** Keyboard shortcuts shown in the help panel. */
export const SHORTCUTS = [
  { label: 'Bold',         keys: ['Ctrl', 'B'] },
  { label: 'Italic',       keys: ['Ctrl', 'I'] },
  { label: 'Underline',    keys: ['Ctrl', 'U'] },
  { label: 'Strikethrough',keys: ['Ctrl', 'Shift', 'S'] },
  { label: 'Inline code',  keys: ['Ctrl', '`'] },
  { label: 'Heading 1',    keys: ['Ctrl', 'Alt', '1'] },
  { label: 'Heading 2',    keys: ['Ctrl', 'Alt', '2'] },
  { label: 'Heading 3',    keys: ['Ctrl', 'Alt', '3'] },
  { label: 'Bullet list',  keys: ['Ctrl', 'Shift', '8'] },
  { label: 'Ordered list', keys: ['Ctrl', 'Shift', '7'] },
  { label: 'Task list',    keys: ['Ctrl', 'Shift', '9'] },
  { label: 'Blockquote',   keys: ['Ctrl', 'Shift', 'B'] },
  { label: 'Code block',   keys: ['Ctrl', 'Alt', 'C'] },
  { label: 'Undo',         keys: ['Ctrl', 'Z'] },
  { label: 'Redo',         keys: ['Ctrl', 'Shift', 'Z'] },
];

export type Shortcut = (typeof SHORTCUTS)[number];
export type FontFamily = (typeof FONT_FAMILIES)[number];
export type FontSize = (typeof FONT_SIZES)[number];
