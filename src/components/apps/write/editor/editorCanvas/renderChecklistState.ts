/**
 * Sync checklist DOM from canonical state.
 *
 * This is a pure render helper — it reads state and patches the DOM.
 * It does NOT read state back from the DOM.
 *
 * @param blockEl - The checklist block DOM element
 * @param checked - The canonical checked state to render
 */
export function renderChecklistState(
  blockEl: HTMLElement,
  checked: boolean
): void {
  blockEl.setAttribute(
    "data-checked",
    checked ? "true" : "false"
  );

  const checkbox =
    blockEl.querySelector<HTMLInputElement>(
      ".checklist-checkbox"
    );

  if (checkbox) {
    checkbox.checked = checked;
  }
}