/**
 * @file src/components/apps/write/sidebar/FolderTree/sidebar.client.ts
 *
 * FIX b: Pin ordering — pinned items are sorted by pinned-at timestamp
 * (most recently pinned first) rather than by subscription fire order.
 * Up/down caret buttons allow manual reordering within pinned items.
 *
 * FIX c: Slide animation when an item gets pinned.
 *
 * FIX d: Sidebar flash — folder open/close states are applied via an
 * inline <script> tag in FolderTree.astro that runs synchronously before
 * paint. This file handles the click-to-toggle persistence only.
 */

import { pinStore } from "@/stores/journal/pin";

// ── Folder state ──────────────────────────────────────────────────────────────

const FOLDER_STATE_KEY  = "write:folder-state";
const PIN_ORDER_KEY     = "write:pin-order";  // string[] of doc IDs in display order

function loadFolderState(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(FOLDER_STATE_KEY) ?? "{}"); }
  catch { return {}; }
}

function saveFolderState(state: Record<string, boolean>): void {
  localStorage.setItem(FOLDER_STATE_KEY, JSON.stringify(state));
}

function applyFolderState(btn: HTMLButtonElement, expanded: boolean): void {
  const list = document.getElementById(btn.getAttribute("aria-controls") ?? "");
  btn.setAttribute("aria-expanded", String(expanded));
  if (list) list.style.display = expanded ? "" : "none";
}

export function initFolderToggles(): void {
  const savedState = loadFolderState();

  document.querySelectorAll<HTMLButtonElement>("[data-folder-toggle]").forEach((btn) => {
    const folderId = btn.dataset.folderId ?? btn.getAttribute("aria-controls") ?? "";
    // State was already applied server-side / inline-script for FIX d.
    // Here we just wire the click handler.
    applyFolderState(btn, savedState[folderId] ?? false);

    btn.addEventListener("click", () => {
      const next = btn.getAttribute("aria-expanded") !== "true";
      applyFolderState(btn, next);
      const current = loadFolderState();
      current[folderId] = next;
      saveFolderState(current);
    });
  });
}

// ── Pin ordering ──────────────────────────────────────────────────────────────

/**
 * Loads the saved manual pin order from localStorage.
 * Returns an array of document IDs in the order they should appear.
 */
function loadPinOrder(): string[] {
  try { return JSON.parse(localStorage.getItem(PIN_ORDER_KEY) ?? "[]"); }
  catch { return []; }
}

function savePinOrder(order: string[]): void {
  localStorage.setItem(PIN_ORDER_KEY, JSON.stringify(order));
}

/**
 * Builds or updates the reorder buttons on a pinned doc-item.
 * Two small caret buttons let the user move the item up or down
 * within the pinned group.
 *
 * @param item - The .doc-item element that is pinned.
 */
function ensureReorderControls(item: HTMLElement): void {
  if (item.querySelector(".pin-reorder")) return; // already attached

  const wrap = document.createElement("div");
  wrap.className = "pin-reorder";
  wrap.setAttribute("aria-label", "Reorder pinned document");

  const upBtn = document.createElement("button");
  upBtn.type      = "button";
  upBtn.className = "pin-reorder-btn";
  upBtn.title     = "Move up";
  upBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="2,7 5,3 8,7"/></svg>`;

  const downBtn = document.createElement("button");
  downBtn.type      = "button";
  downBtn.className = "pin-reorder-btn";
  downBtn.title     = "Move down";
  downBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="2,3 5,7 8,3"/></svg>`;

  /**
   * Moves `item` within its parent list by one position.
   * Updates both the DOM and the saved order.
   *
   * @param direction - -1 for up, 1 for down.
   */
  function move(direction: -1 | 1): void {
    const list   = item.parentElement;
    if (!list) return;

    const pinnedItems = Array.from(
      list.querySelectorAll<HTMLElement>(".doc-item.is-pinned")
    );
    const idx = pinnedItems.indexOf(item);
    const swapIdx = idx + direction;

    if (swapIdx < 0 || swapIdx >= pinnedItems.length) return;

    const sibling = pinnedItems[swapIdx];

    if (direction === -1) {
      list.insertBefore(item, sibling);
    } else {
      list.insertBefore(sibling, item);
    }

    // Persist new order
    const newOrder = Array.from(
      list.querySelectorAll<HTMLElement>(".doc-item.is-pinned")
    ).map((el) => el.dataset.docId ?? "").filter(Boolean);

    savePinOrder(newOrder);
  }

  upBtn.addEventListener("mousedown",   (e) => e.preventDefault());
  downBtn.addEventListener("mousedown", (e) => e.preventDefault());
  upBtn.addEventListener("click",   (e) => { e.stopPropagation(); move(-1); });
  downBtn.addEventListener("click",  (e) => { e.stopPropagation(); move(1); });

  wrap.appendChild(upBtn);
  wrap.appendChild(downBtn);
  item.appendChild(wrap);
}

function removeReorderControls(item: HTMLElement): void {
  item.querySelector(".pin-reorder")?.remove();
}

/**
 * Places a pinned item at the correct position within its list.
 *
 * The saved pin order in localStorage determines position.
 * If the item isn't in the saved order, it is prepended (most recent first).
 *
 * FIX b: This replaces the naive `list.prepend(item)` that ran for every
 * pinned document on each subscribe tick, causing the last-processed item
 * to always end up first regardless of actual pin order.
 *
 * @param item - The .doc-item element to position.
 * @param list - The parent <ul> element.
 */
function positionPinnedItem(item: HTMLElement, list: HTMLElement): void {
  const order = loadPinOrder();
  const docId = item.dataset.docId ?? "";

  if (!order.includes(docId)) {
    // New pin — prepend and save
    order.unshift(docId);
    savePinOrder(order);
  }

  const pinnedItems = Array.from(
    list.querySelectorAll<HTMLElement>(".doc-item.is-pinned")
  );

  // Sort existing pinned items by saved order, then re-insert in sequence
  const sorted = [...pinnedItems].sort((a, b) => {
    const ai = order.indexOf(a.dataset.docId ?? "");
    const bi = order.indexOf(b.dataset.docId ?? "");
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  // Re-insert sorted items at the top of the list
  sorted.forEach((el) => list.prepend(el));
}

// ── Realtime sidebar updates ──────────────────────────────────────────────────

export function initRealtimeUpdates(): void {
  // Title live-sync
  window.addEventListener("journal:title-updated", ((e: CustomEvent) => {
    const { documentId, title } = e.detail as { documentId: string; title: string };
    document.querySelectorAll<HTMLElement>(`[data-doc-id="${documentId}"] .doc-title`)
      .forEach((el) => { el.textContent = title; });
  }) as EventListener);

  // "Today" timestamp after autosave
  window.addEventListener("journal:doc-updated", ((e: CustomEvent) => {
    const { documentId } = e.detail as { documentId: string };
    document.querySelectorAll<HTMLElement>(`[data-doc-id="${documentId}"] .doc-meta`)
      .forEach((el) => { el.textContent = "Today"; });
  }) as EventListener);

  /**
   * FIX b + c: Subscribe to pinStore.
   *
   * On each state change we iterate every tracked document ID.
   * For pinned items: add class, attach reorder controls, animate in, position.
   * For unpinned items: remove class and reorder controls.
   *
   * The animation (FIX c) is a short translateY slide + opacity fade.
   * We use the Web Animations API so it doesn't conflict with CSS transitions
   * on other properties.
   */
  pinStore.subscribe((state) => {
    for (const [documentId, pin] of Object.entries(state)) {
      const items = document.querySelectorAll<HTMLElement>(
        `[data-doc-id="${documentId}"]`
      );

      items.forEach((item) => {
        const list = item.parentElement;
        if (!list) return;

        const wasPinned = item.classList.contains("is-pinned");

        if (pin.pinned) {
          item.classList.add("is-pinned");
          ensureReorderControls(item);
          positionPinnedItem(item, list);

          // FIX c: slide-in animation only when newly pinned
          if (!wasPinned) {
            item.animate(
              [
                { transform: "translateY(-6px)", opacity: "0.4" },
                { transform: "translateY(0)",    opacity: "1"   },
              ],
              { duration: 280, easing: "ease-out", fill: "forwards" }
            );
          }
        } else {
          item.classList.remove("is-pinned");
          removeReorderControls(item);

          // Remove from pin order
          const order = loadPinOrder().filter((id) => id !== documentId);
          savePinOrder(order);
        }
      });
    }
  });
}