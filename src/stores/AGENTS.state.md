# AGENTS.state.md — State Management System

This document outlines the state management architecture of the project, defining the boundaries and cooperation rules between **NanoStores** and **XState v5**.

---

## 1. State Management Architecture

This project employs a two-tier state management strategy designed to balance performance, SSR safety, and robustness:

```
+--------------------------------------------------------+
|                      XState v5                         |
|   (The Engine: Asynchronous flows, autosave sync,      |
|    retry loops, strict state transitions, rollbacks)   |
+---------------------------+----------------------------+
                            |
                            v  Pushes state updates
+--------------------------------------------------------+
|                     NanoStores                         |
|   (The Display: Global UI state, reactive variables,   |
|    filtered lists, reactive counts, lightweight islands)|
+--------------------------------------------------------+
```

---

## 2. NanoStores — Lightweight Global State

**NanoStores** is our primary tool for simple, reactive, global parameters and cross-island sync.

### When to use NanoStores
* **UI States**: Sidebar open/closed, reader focus mode, active editor theme, simple toggles (`sidebarOpen`, `focusMode`).
* **Active IDs & Registry**: Tracking active folder, active document, selected date in habit tracker (`activeDocumentId`, `selectedDate`).
* **Lightweight Derived Values**: Derived calculations like word counts, character counts, or simple filtering (e.g., filtering notes list based on search query).
* **Static Configs & Lists**: Keeping lists of open folders, current items, or general document metadata rows.

### NanoStores Best Practices
* **Use `action()` for Mutations**: Wrap any state modification logic in NanoStore `action()` wrappers to centralize updates and ease future testing.
* **Heavy Use of `computed()`**: Use computed stores to derive complex lists or figures rather than writing manual triggers in views.
* **Island Subscriptions Only**: Never subscribe to NanoStores inside server-rendered `.astro` frontmatter. Subscriptions belong strictly in browser-native client `<script>` blocks or custom JS modules.
* **SSR Safety**: Always wrap browser bindings and subscriptions in `if (typeof window !== 'undefined')` checks.

---

## 3. XState v5 — Robust Flow Engine

**XState v5** is our heavy-duty state machine engine. It manages complex, multi-step asynchronous processes, state transitions, and background synchronization.

### When to use XState
* **Stateful Synchronization Loops**: Processes like autosaves, database syncing, checklist toggling, and file uploads.
* **Asynchronous Operations with Side Effects**: Handling actions that can fail, timeout, or require automatic retry loops.
* **Strict State Controls**: When actions must be blocked or queued based on the current system status (e.g., preventing parallel edits during document deletions).
* **Optimistic Updates & Rollbacks**: Modifying the UI instantly, and rolling back to a previous state if a network request fails.

### XState Best Practices
* **Setup-Driven Creation**: Always use XState's `setup()` utility to pre-define context, events, and actors:
  ```ts
  import { setup, assign, fromPromise } from 'xstate';
  ```
* **Decoupled Actors**: Implement database saves or network requests inside pure asynchronous actors (`fromPromise`) to separate state logic from data fetching.
* **Custom Event Dispatching**: Dispatch custom events from XState transitions (`window.dispatchEvent`) to notify other modules of critical events (e.g., `'journal:doc-updated'`).

---

## 4. Integration Guidelines (Coexistence)

To keep the codebase clean and maintain a single source of truth, follow these guidelines:

* **No State Duplication**: Do not replicate XState context variables inside parallel NanoStores. Let XState own the "source" state (like block contents and dirty states).
* **Actor-to-Store Sync**: An active XState actor (such as an editor sync actor) can write updates to a NanoStore (like setting `wordCount` or `lastSavedAt`) for lightweight consumption by other components.
* **Stores for Visual Binding**: Other client islands should bind directly to lightweight NanoStore properties, keeping them decoupled from the internal mechanics of the state machine.
