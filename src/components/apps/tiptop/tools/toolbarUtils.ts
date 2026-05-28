// src/components/apps/tiptop/tools/toolbarUtils.ts

// ─── Types ────────────────────────────────────────────────────────────────────

/** The payload sent via the 'tiptop:command' custom event. */
export interface TipTopCommand {
  command: string;
  attrs?: Record<string, unknown>;
}

/** The selection state broadcast by TipTop.astro on cursor/selection change. */
export interface SelectionState {
  marks: string[];
  nodeType: string;
  attrs: Record<string, unknown>;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

/**
 * Dispatches a 'tiptop:command' event to the editor bridge in TipTop.astro.
 *
 * @param command - The command name matching a case in the editor's initToolbarBridge().
 * @param attrs   - Optional attributes for the command (e.g. { level: 2 }, { mark: 'bold' }).
 */
export function dispatch(command: string, attrs?: Record<string, unknown>): void {
  window.dispatchEvent(
    new CustomEvent<TipTopCommand>('tiptop:command', { detail: { command, attrs } })
  );
}

/**
 * Wires a native <details>/<summary> dropdown for toolbar use.
 *
 * - Prevents the summary mousedown from stealing focus away from the editor.
 * - Calls `onSelect` when a child item is clicked, passing the clicked element.
 * - Closes the dropdown after selection.
 *
 * @param detailsId    - The `id` of the <details> element to wire up.
 * @param itemSelector - CSS selector used to identify clickable items inside
 *                       the dropdown content, e.g. '[data-block-value]'.
 * @param onSelect     - Callback receiving the clicked item element when a
 *                       selection is made.
 */
export function initDropdown(
  detailsId: string,
  itemSelector: string,
  onSelect: (item: HTMLElement) => void
): void {
  const details = document.getElementById(detailsId) as HTMLDetailsElement | null;
  if (!details) return;

  // Prevent summary click from stealing focus away from the editor.
  details.querySelector('summary')?.addEventListener('mousedown', (e: MouseEvent) => {
    e.preventDefault();
  });

  details.addEventListener('click', (e: MouseEvent) => {
    // Walk up from the click target to find a direct item child of the dropdown content.
    const item = (e.target as HTMLElement).closest<HTMLElement>(itemSelector);
    if (!item || !details.contains(item)) return;

    e.preventDefault();
    onSelect(item);
    details.open = false;
  });
}

/**
 * Listens for 'tiptop:selection-changed' events and reflects active marks
 * onto their corresponding toolbar buttons via `aria-pressed` and `is-active`.
 *
 * @param buttonMap - A map of { buttonId: markName }, e.g. { 'tb-bold': 'bold' }.
 * @param getActive - Extracts the list of currently active mark/node names from the
 *                   selection state. Defaults to `state.marks` if omitted.
 *
 * @example
 * reflectActiveMarks(
 *   { 'tb-bold': 'bold', 'tb-italic': 'italic' },
 *   (state) => state.marks
 * );
 */
export function reflectActiveMarks(
  buttonMap: Record<string, string>,
  getActive: (state: SelectionState) => string[] = (state) => state.marks
): void {
  window.addEventListener('tiptop:selection-changed', (e: Event) => {
    const state = (e as CustomEvent<SelectionState>).detail;
    const activeItems = getActive(state);

    for (const [id, name] of Object.entries(buttonMap)) {
      const btn = document.getElementById(id) as HTMLButtonElement | null;
      if (!btn) continue;

      const isActive = activeItems.includes(name);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.classList.toggle('is-active', isActive);
    }
  });
}

/**
 * Sets the text content of a label element, typically the visible
 * trigger label inside a toolbar dropdown.
 *
 * @param labelId - The `id` of the element whose text should be updated.
 * @param text    - The new label text to display.
 */
export function setLabel(labelId: string, text: string): void {
  const el = document.getElementById(labelId);
  if (el) el.textContent = text;
}