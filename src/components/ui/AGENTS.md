# `src/components/ui/AGENTS.md` — Custom UI Guidelines

This document governs the custom UI layer located in `src/components/ui/`. It expands on the principles defined in the master [AGENTS.md](file:///home/jk/Code/Astro/AGENTS.md) constitution.

---

## 1. Role of the Custom UI Layer

The Custom UI layer (`src/components/ui/`) is a thin wrapper over Starwind Pro. It provides custom styling configurations, design compositions (like cards, lists, layout boxes), and global components that are not present in the base Starwind library.

Examples:
* `BaseCard.astro`
* `Icon.astro` (custom SVG icons)
* Custom theme wrappers

---

## 2. Structural & Architectural Rules

* **Thin Logic Bound**: Custom UI components must remain **strictly presentational (view-only)**. They:
  * Must receive data via Astro `Astro.props`.
  * Must **never** make Supabase database queries or mutation calls.
  * Must **never** access server-side session contexts directly.
  * Must **never** store dynamic client state (state belongs in stores or machines).
* **Composition-Driven**: Design custom components to use `<slot />` and composition rather than complex, deeply nested JSON properties.
* **Strict Path Mappings**: All imports in custom UI components must use TSConfig aliases (`@/components/starwind/...`, `!design/...`). Avoid relative import paths like `../../`.

---

## 3. Styling & Custom Overrides

* **Use Tailwind v4 for Layout & States**: Apply Tailwind classes for layout structures (`flex`, `grid`), positioning (`absolute`), spacing (`p-4`), and sizing.
* **Semantic Variables for Colors**: Utilize semantic color tokens (`bg-card`, `text-foreground`, `border-border`) so components blend with themes.
* **Encapsulate Complexity**: Scoped `<style>` blocks are acceptable in `.astro` files only for component-local visual rules that are not layout primitives.

---

## 4. Reference to Root

Refer to the master [AGENTS.md](file:///home/jk/Code/Astro/AGENTS.md) for naming guidelines, file conventions, and tech stack summaries.
