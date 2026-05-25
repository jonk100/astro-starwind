import { pinStore } from "@/stores/journal/pin";

  // ── FIX e: Folder toggle with localStorage persistence ─────────────────────

  const FOLDER_STATE_KEY = "write:folder-state";

  /**
   * Loads the saved open/closed state map from localStorage.
   * Returns a Record<folderId, boolean> where true = open.
   */
  function loadFolderState(): Record<string, boolean> {
    try {
      return JSON.parse(localStorage.getItem(FOLDER_STATE_KEY) ?? "{}");
    } catch {
      return {};
    }
  }

  /**
   * Saves the current open/closed state map to localStorage.
   */
  function saveFolderState(state: Record<string, boolean>): void {
    localStorage.setItem(FOLDER_STATE_KEY, JSON.stringify(state));
  }

  /**
   * Applies expanded/collapsed state to a single folder toggle button
   * and its associated list.
   *
   * @param btn      - The folder toggle button.
   * @param expanded - Whether to show the list.
   */
  function applyFolderState(btn: HTMLButtonElement, expanded: boolean): void {
    const targetId = btn.getAttribute("aria-controls");
    const list     = targetId ? document.getElementById(targetId) : null;

    btn.setAttribute("aria-expanded", String(expanded));
    if (list) list.style.display = expanded ? "" : "none";
  }

  export function initFolderToggles(): void {
    const savedState = loadFolderState();
 
    document.querySelectorAll<HTMLButtonElement>("[data-folder-toggle]").forEach((btn) => {
      const folderId = btn.dataset.folderId ?? btn.getAttribute("aria-controls") ?? "";
 
      // Restore saved state; default is collapsed (false)
      const isOpen = savedState[folderId] ?? false;
      applyFolderState(btn, isOpen);
 
      btn.addEventListener("click", () => {
        const nowExpanded = btn.getAttribute("aria-expanded") === "true";
        const next        = !nowExpanded;
        applyFolderState(btn, next);
 
        // Persist
        const current = loadFolderState();
        current[folderId] = next;
        saveFolderState(current);
      });
    });
  }


export function initRealtimeUpdates(): void {

  // Title
  window.addEventListener("journal:title-updated", ((e: CustomEvent) => {
    const { documentId, title } = e.detail as { documentId: string; title: string };
    document.querySelectorAll<HTMLElement>(`[data-doc-id="${documentId}"] .doc-title`)
      .forEach((el) => { el.textContent = title; });
  }) as EventListener);

  // Autosave timestamp
  window.addEventListener("journal:doc-updated", ((e: CustomEvent) => {
    const { documentId } = e.detail as { documentId: string };
    document.querySelectorAll<HTMLElement>(`[data-doc-id="${documentId}"] .doc-meta`)
      .forEach((el) => { el.textContent = "Today"; });
  }) as EventListener);
  
  const unsubscribe = pinStore.subscribe((state) => {
  for (const [documentId, pin] of Object.entries(state)) {
    const items = document.querySelectorAll<HTMLElement>(
      `[data-doc-id="${documentId}"]`
    );

    items.forEach((item) => {
      const list = item.parentElement;
      if (!list) return;

      if (pin.pinned) {
        item.classList.add("is-pinned");
        list.prepend(item);
      } else {
        item.classList.remove("is-pinned");
      }
    });
  }})
};