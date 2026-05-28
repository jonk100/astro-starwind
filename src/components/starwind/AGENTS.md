# `src/components/starwind/AGENTS.md` — Starwind Pro UI Guidelines

This document governs how to use, extend, and maintain the **Starwind Pro UI Component Library** in this project. It expands on the principles defined in the master [AGENTS.md](file:///home/jk/Code/Astro/AGENTS.md) constitution.

---

## 1. Core Principles

* **Starwind-First Rule**: Before building any UI element, component, or interactive widget, check the list of available Starwind components. **If a Starwind component exists that fits your need, you must use it.**
* **Never Modify Starwind In-Place**: Do not modify components inside `src/components/starwind/` directly to perform styling overrides. All layout overrides or theme styling shifts must belong in:
  1. Component scoped styles (`<style>` block in custom UI components).
  2. Semantic theme variables mapped in `src/styles/design/tokens/colors.tokens.css`.
  3. Scoped CSS custom property adjustments.

---

## 2. Style Extensions & Tailwind Variants

Starwind components are built using `tv` from `tailwind-variants` to manage visual states, sizes, and layout classes.

### How to extend or pass custom classes:
* Use the component's standard properties (e.g., `variant`, `size`) to toggle visual states.
* Pass custom classes to Starwind components via the `class` or `className` attributes. These are merged using the component's internal merging logic (utilizing `tailwind-merge` under the hood) to prevent class duplication or style conflicts.

```astro
---
import { Button } from "@/components/starwind/button";
---
<!-- Mapped classes are merged safely -->
<Button variant="primary" class="w-full shadow-lg">
  Get Started
</Button>
```

---

## 3. Adding New Starwind Components

If a Starwind component is required but not yet initialized in `src/components/starwind/`:
1. Check the official documentation to obtain the component markup and schema structure.
2. Initialize it inside `src/components/starwind/{component_name}/` using the Starwind CLI or manual copying.
3. Ensure it uses standard TypeScript strict typings and imports aliases.

---

## 4. Verification Check

Before concluding work on any component modification, check:
* Does the component compile under strict mode?
* Does it avoid utilizing raw Tailwind color classes (e.g., `bg-blue-600`)? It must utilize semantic theme colors (`bg-primary`, `text-foreground`).
* Refer back to [AGENTS.md](file:///home/jk/Code/Astro/AGENTS.md) for core tech stack and file naming conventions.