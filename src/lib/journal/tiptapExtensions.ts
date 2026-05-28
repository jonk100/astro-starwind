/**
 * Custom TipTap extensions for enhanced editor behavior
 */
import { Extension } from '@tiptap/core';

/**
 * Tab extension that prevents default Tab behavior and inserts spaces instead.
 * This allows Tab to work like a text editor instead of moving focus away.
 */
export const TabExtension = Extension.create({
  name: 'tabExtension',

  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        // If in a list, let ListKit handle standard indentation
        if (
          editor.isActive('bulletList') ||
          editor.isActive('orderedList') ||
          editor.isActive('taskList')
        ) {
          return false;
        }
        editor.commands.insertContent('    ');
        return true;
      },
      'Shift-Tab': ({ editor }) => {
        // If in a list, let ListKit handle standard outdent
        if (
          editor.isActive('bulletList') ||
          editor.isActive('orderedList') ||
          editor.isActive('taskList')
        ) {
          return false;
        }
        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;
        const pos = $from.pos;
        const text = state.doc.textBetween(Math.max(0, pos - 4), pos);
        if (text.endsWith('    ')) {
          editor.commands.deleteRange({ from: pos - 4, to: pos });
        } else if (text.endsWith('   ')) {
          editor.commands.deleteRange({ from: pos - 3, to: pos });
        } else if (text.endsWith('  ')) {
          editor.commands.deleteRange({ from: pos - 2, to: pos });
        } else if (text.endsWith(' ')) {
          editor.commands.deleteRange({ from: pos - 1, to: pos });
        }
        return true; // Swallow event to prevent default focus move
      },
    };
  },
});
