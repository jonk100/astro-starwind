# Tailwind Project Structure Guide

A reference guide for structuring Tailwind CSS in Astro projects.

This document is intended for both humans and AI coding tools to follow consistently across the project.

The project structure should:

- Prevent giant unreadable class strings
- Prevent inconsistent spacing/colors/layout
- Encourage reusable primitives
- Keep components modular
- Keep styling scalable over time
- Avoid unnecessary dependencies
- Work cleanly with Astro + vanilla TypeScript

---

# General Rules

## 1. Prefer Design Tokens Over Arbitrary Values

Centralize spacing, colors, sizing, radii, and typography in Tailwind config or CSS variables.

Avoid:

```html
class="mt-[37px] text-[#1a1a1a]"
```

Prefer:

```html
class="mt-section text-text"
```

---

## 2. Extract Repeated Patterns

If a class combination appears more than ~3 times:

Extract it into:

- A component
- A semantic utility class
- A variant map
- A layout primitive

Never allow repeated utility soup across the codebase.

---

## 3. Use Tailwind for Utilities, CSS for Complexity

Tailwind should handle:

- Layout
- Spacing
- Sizing
- Typography
- Simple states

Traditional CSS should handle:

- Complex animations
- Pseudo-elements
- Advanced selectors
- Long repeated utility combinations
- Gradients
- Prose styling
- Data attribute state styling

---

## 4. Prefer Composition Over Deep Components

Build small composable primitives instead of giant all-in-one components.

Good:

- Stack
- Cluster
- Grid
- Container
- Section

Avoid:

- Massive generic layout wrappers with dozens of props

---

# Recommended Project Structure

```txt
src/
  components/
    layout/
    ui/
    blog/
    music/
    forms/

  layouts/

  pages/

  styles/
    global.css
    tokens.css

  utils/

  types/
```

---

# Component Organization Rules

## Layout Primitives

Location:

```txt
src/components/layout/
```

Purpose:

Reusable structural building blocks.

Examples:

```txt
Container.astro
Stack.astro
Cluster.astro
Grid.astro
Section.astro
```

These should:

- Stay extremely small
- Focus only on layout
- Avoid business logic
- Avoid visual styling when possible

---

## UI Components

Location:

```txt
src/components/ui/
```

Purpose:

Reusable global interface components.

Examples:

```txt
button/
card/
input/
modal/
badge/
```

Recommended structure:

```txt
button/
  Button.astro
  button.ts
  button.css
```

---

## Feature or Domain Components

Organize most components by domain instead of generic type.

Prefer:

```txt
src/components/blog/
src/components/music/
src/components/forms/
```

Instead of:

```txt
src/components/cards/
src/components/buttons/
src/components/modals/
```

Only place components in `ui/` if they are truly global and reusable.

---

# Tailwind Configuration Rules

## Keep Theme Tokens Semantic

Example:

```js
extend: {
  colors: {
    surface: 'var(--color-surface)',
    text: 'var(--color-text)',
    accent: 'var(--color-accent)',
  },

  spacing: {
    section: 'clamp(4rem, 8vw, 8rem)',
  },

  borderRadius: {
    card: '1.5rem',
  },
}
```

Avoid hardcoded values scattered throughout templates.

---

# Utility Class Rules

## Recommended Class Ordering

Order classes consistently.

Recommended order:

1. Layout
2. Positioning
3. Spacing
4. Sizing
5. Typography
6. Visuals
7. Effects
8. State modifiers

Example:

```html
class="
  flex items-center
  gap-4
  px-6 py-4
  text-sm font-medium
  bg-black text-white
  rounded-xl
  transition-colors
  hover:bg-neutral-800
"
```

Consistency matters more than exact ordering.

---

# Variant System Rules

## Use Variant Maps

Avoid repeating large utility combinations.

Recommended:

```ts
export const buttonVariants = {
  primary:
    'bg-black text-white hover:bg-neutral-800',

  secondary:
    'border border-neutral-300 hover:bg-neutral-100',
};
```

Then consume them in components.

---

# State Management Styling Rules

## Prefer Data Attributes Over Conditional Utility Explosion

Avoid:

```astro
class:list={[
  active && 'bg-black text-white',
  disabled && 'opacity-50',
  loading && 'pointer-events-none',
]}
```

Prefer:

```astro
<button
  data-active={active}
  data-loading={loading}
>
```

Then style with CSS:

```css
button[data-active='true'] {
  @apply bg-black text-white;
}
```

This scales better and improves readability.

---

# CSS Organization Rules

## Global CSS Should Stay Minimal

Avoid:

```txt
styles/everything.css
```

Prefer:

```txt
styles/global.css
styles/tokens.css
```

And feature-specific CSS colocated near components.

---

## Semantic Utility Classes

Use semantic utility classes sparingly.

Example:

```css
@layer components {
  .card {
    @apply rounded-card border border-neutral-200 bg-white p-6;
  }

  .content-grid {
    @apply mx-auto max-w-7xl px-6;
  }
}
```

Do not recreate Bootstrap-style abstraction layers.

---

# Astro-Specific Rules

## Keep Components Small

Astro components should:

- Have one clear responsibility
- Avoid deeply nested prop systems
- Prefer slots and composition
- Prefer modular files

---

## Recommended File Patterns

```txt
Button.astro
button.ts
button.css
Button.types.ts
```

Or:

```txt
BlogPost.astro
blogPost.ts
blogPost.css
BlogPost.types.ts
```

---

# TypeScript Rules

## Use Separate Variant/Utility Files

Logic and variant maps should stay outside Astro templates when possible.

Good:

```txt
button.ts
card.ts
navigation.ts
```

Avoid giant inline class logic inside `.astro` files.

---

## Use JSDoc Comments

Document exported functions and utilities.

Example:

```ts
/--
 - Returns button classes based on variant.
 - @param variant - Button variant key.
 - @returns Tailwind class string.
 -/
```

---

# AI Tool Instructions

AI tools working in this repository should:

- Prefer modular extraction
- Avoid introducing dependencies unless explicitly requested
- Use Astro + vanilla TypeScript only
- Avoid React patterns/hooks
- Keep components composable
- Extract repeated Tailwind utilities
- Prefer semantic tokens over arbitrary values
- Use colocated CSS when complexity increases
- Prefer readability over cleverness
- Preserve consistent class ordering
- Use reusable layout primitives whenever possible

---

# Preferred Development Style

The preferred architecture is:

- Small reusable primitives
- Semantic tokens
- Domain-based organization
- Minimal abstractions
- Readable utility usage
- Colocated styles and logic
- Long-term maintainability over short-term speed

The project should remain understandable months later without requiring framework-specific abstractions or utility libraries.
