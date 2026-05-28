# `src/components/apps/AGENTS.md` — App Component Architecture Guidelines

This document governs app-specific component layout, architecture, and behavior inside `src/components/apps/{app}/` (e.g., `habit`, `write`, `tiptop`). It expands on the principles defined in the master [AGENTS.md](file:///home/jk/Code/Astro/AGENTS.md) constitution.

---

## 1. App Boundaries & File Structure

App-specific components must reside exclusively under their respective directories:
* `src/components/apps/habit/` (Habit tracker components, tables, creation/edit forms)
* `src/components/apps/write/` (Journaling sidebar, cards, toolbar, canvas editor)
* `src/components/apps/tiptop/` (TipTap editor and rich-text behaviors)

---

## 2. Interactive Islands & Client Script Boundaries

Astro pages are server-rendered, but apps require rich client-side interactivity.

### Client Script Rules:
* **DOM Query Wrapping**: Client scripts inside `<script>` blocks must be wrapped in `document.addEventListener('DOMContentLoaded', ...)` or appropriate window load event hooks to ensure the DOM is safe for selection.
* **Astro-to-Client Variable Bridge**: Never inject dynamic Astro variables directly into scripts via string templates if they can be passed as HTML variables. Pass server-rendered variables using standard `data-*` attributes on HTML wrapper elements, and query them in the client script:
  ```astro
  <!-- In Astro component -->
  <div id="habit-cell" data-habit-id={habit.id} data-date={date}>
    ...
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const cell = document.getElementById('habit-cell');
      const habitId = cell?.dataset.habitId;
    });
  </script>
  ```
* **No JSX inside Scripts**: Use standard DOM selection and vanilla event listeners (`addEventListener`) for interactivity rather than React-specific prop conventions (like `onClick`).

---

## 3. State Management Integration

* **NanoStores Integration**: Components subscribing to NanoStores must do so exclusively inside client `<script>` blocks. Never subscribe to NanoStore atoms/maps inside server-rendered `.astro` frontmatter.
* **XState v5 Engine Integration**: Complex state machines must be structured in a dedicated `/state/` folder (e.g., `/write/state/editorMachine.ts`). The components initialize actors and sync the context with NanoStores or local variables.
* **Refer to Guide**: Refer to [src/stores/AGENTS.state.md](file:///home/jk/Code/Astro/src/stores/AGENTS.state.md) for full guidelines on state integration.

---

## 4. Styling & Theme Coherence

* **Visual Consistency**: App interfaces must match the premium aesthetic. Use semi-transparent layers, glassmorphism (`backdrop-filter`), and standard custom CSS variables for coloring.
* **Easy Customization**: Rely strictly on CSS custom properties for variable themes (like `--primary` and `--accent`) so users can customize them easily later.
* **No Raw Tailwind Palette**: Ensure no app components use raw utility colors like `text-slate-900`. Use `text-foreground` or themed variables.

---

## 5. Reference to Root

Refer to [AGENTS.md](file:///home/jk/Code/Astro/AGENTS.md) for importing conventions, tsconfig aliases, and core stack descriptions.
