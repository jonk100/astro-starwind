# AGENTS.style.md — Color Token & Styling System

This document outlines the styling standards for the project, detailing the interaction model between Tailwind CSS v4 and our Vanilla CSS custom properties.

---

## 1. The Hybrid Styling Model

This project operates on a **hybrid styling model** that combines the rapid development of Tailwind CSS v4 with the high customizability of Vanilla CSS Custom Properties.

```
+--------------------------------------------------------+
|                      Tailwind v4                       |
|   (Layout, Spacing, Sizing, Interactive States, etc.)  |
+---------------------------+----------------------------+
                            |
                            v
+--------------------------------------------------------+
|                Semantic Theme Mappings                 |
|      (Mapped in src/styles/starwind.css @theme)        |
+---------------------------+----------------------------+
                            |
                            v
+--------------------------------------------------------+
|              CSS Custom Property Tokens                |
|      (Defined in global.css & colors.tokens.css)       |
+--------------------------------------------------------+
```

### When to use Tailwind CSS v4
Tailwind utility classes must be the primary tool for structural and layout layout styling:
* **Layout & Positioning**: Flexbox, CSS Grid, alignment, absolute/relative positioning (`flex`, `grid`, `items-center`, `justify-between`, `relative`, `inset-0`).
* **Spacing & Sizing**: Margins, paddings, width, height, aspect ratios (`p-4`, `my-6`, `w-full`, `h-screen`, `size-12`).
* **Typography Primitives**: Text sizes, font weights, leading, tracking (`text-sm`, `font-semibold`, `tracking-tight`).
* **Responsive Layouts**: Responsive breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`).
* **Interactive State Utilities**: Simple transitions, durations, scale, translates (`transition-all`, `duration-200`, `hover:scale-[1.02]`).

### When to use Vanilla CSS (Custom Properties)
Traditional CSS styles and custom stylesheets are required for semantic coloring, theming, and high-fidelity interactions:
* **Themeable Coloring**: Semantic coloring (text, background, borders, outline, ring, shadows) must route through CSS Custom Properties (`var(--primary)`, `var(--accent)`, `var(--background)`).
* **Interactive State Styling**: Complex hover/active transitions, radial gradients, glassmorphism filters (`backdrop-filter: blur(12px)`), and scrollbars.
* **Component Encapsulation**: Astro scoped `<style>` blocks should be used for component-local styles that are not layout primitives.
* **Dynamic Styling**: Cases where values change dynamically via client-side JavaScript (e.g., custom cursor trails, CSS variable values updated dynamically on mouse move, real-time calendar cell heat map opacity).
* **Pseudo-elements & Advanced Selectors**: Complex selectors (like `:focus-within`, `::before`, `::after`, `[data-active='true']`).

---

## 2. Color System Architecture

Our color token system is a strict 3-layer architecture:

1. **Raw RGB Palette (`tones.css` / `colorRaw.tokens.css`)**: Pure numeric RGB channel values only. No semantics. No direct component usage.
2. **Semantic Interaction Tokens (`colors.tokens.css`)**: Interaction-aware variables mapping raw palettes to roles (e.g., `--primary-bg`, `--accent-hover`, `--border`). Handles light/dark mode.
3. **Tailwind Mapped Classes (`starwind.css`)**: Integrates semantic tokens into Tailwind v4's theme inline config (e.g. `--color-primary: var(--primary)`).

---

## 3. Core Color Styling Rules (CRITICAL)

* **NO Hardcoded Palette Colors**: Component templates and scoped CSS **must never** reference raw tailwind color classes (like `bg-sky-500` or `text-zinc-950`).
* **Always Use Mapped Semantic Classes**: Use semantic equivalents that dynamically adapt to theme changes:
  * ❌ `class="bg-blue-600 hover:bg-blue-700 text-white border-blue-300"`
  *  `class="bg-primary hover:bg-primary/90 text-primary-foreground border-border"`
* **Use Variant Maps for Compositions**: Components with multiple visual variations (like buttons, badges, inputs) should use `tailwind-variants` (`tv`) to structure layout and sizing variants inside standard component scripts.

---

## 4. Interaction Model

Every interactive color role must support standard interactive states to ensure a highly responsive, animated user experience:
* Base state (e.g., `--primary-bg`)
* Hover state (e.g., `--primary-hover`)
* Active / Pressed state (e.g., `--primary-active`)
* Disabled state (e.g., `--primary-disabled`)
* Accent state (e.g., `--primary-accent`)
* Border state (e.g., `--primary-border`)

---

## 5. Directory Mapping

* `src/styles/global.css`: Minimal styles, fonts, base CSS rules. Imports Starwind and color design tokens.
* `src/styles/starwind.css`: Tailwind v4 base directives, keyframe animations, and Tailwind `@theme inline` mappings to CSS Custom Properties.
* `src/styles/design/tokens/colorRaw.tokens.css`: The raw RGB palette numbers.
* `src/styles/design/tokens/colors.tokens.css`: Semantic tokens representing themes and interaction states.
