# `AGENTS.md` — Project Constitution

This is the root rules document for this repository. All directory-level `AGENTS.md` files inherit from and extend these rules.
When in doubt, follow this file. When rules conflict, this root file takes precedence.
Applies to: Claude (claude.ai / Projects), Claude Code (CLI), Windsurf / Cascade, Cursor, GitHub Copilot, Gemini, and any human contributor.

---

## 1. Tech Stack — What We Use

This is a **vanilla-first** project. No React. No Vue. No framework components outside of Astro.

| Layer          | Technology                                                             |
|----------------|------------------------------------------------------------------------|
| **Framework**  | Astro 6 (SSR where needed, static elsewhere)                           |
| **Language**   | TypeScript (Strict Mode enabled)                                       |
| **Styling**    | Hybrid: Tailwind CSS v4 + Vanilla CSS Semantic Tokens (CSS Variables)  |
| **Components** | Starwind Pro (`src/components/starwind/`)                              |
| **Database**   | Supabase                                                               |
| **State**      | XState v5 (`src/components/apps/{app}/state/`) & NanoStores (`src/stores/`) |

**Do not introduce:** React, Vue, Svelte, jQuery, or any UI framework library not already present in `package.json`.

---

## 2. Component Hierarchy — The Lookup Order

Before creating any new component, UI element, or interactive widget, check in this order. **If a component exists anywhere in this hierarchy, reuse it. Do not recreate it.**

```
1. src/components/starwind/           ← PRIMARY UI library. Use this first.
2. src/components/ui/                 ← Thin custom layer (BaseCard, Icon). Augments Starwind.
3. src/components/layout/primitives/  ← Layout primitives (Stack, Grid, Container, Center, etc.)
4. src/components/blog/               ← Blog-specific components
5. src/components/sections/           ← Page section compositions
6. src/components/apps/{app}/         ← App-specific components (habit, write, tiptop)
```

Starwind provides a rich set of components: Button, Card, Dialog, Dropdown, Input, Select, Tabs, Toast, Tooltip, Accordion, Badge, Breadcrumb, Checkbox, Carousel, Collapsible, NativeSelect, Popover, Progress, Separator, Sheet, Sidebar, Skeleton, Spinner, Switch, Table, Textarea, and more. **Check `src/components/starwind/` before building.**

---

## 3. Path Aliases & Import Mappings

All imports MUST use standardized path aliases configured in `tsconfig.json` to prevent brittle relative paths:

* **`@/*`** maps to `src/*` (e.g., `import { createHabit } from "@/lib/habit/mutations"`).
* **`!design/*`** maps to `src/styles/design/*` (e.g., `import "!design/tokens/colors.tokens.css"`).
* **`!svg/*`** maps to `src/assets/svg/*` (e.g., `import logo from "!svg/logo.svg"`).

### Import Rules:
* Always use `@/*` for cross-directory imports.
* **Prohibited Pattern**: Avoid deep relative imports like `../../../../../lib/utils`.

---

## 4. CSS & Styling Architecture

We use a **hybrid styling model** where Tailwind v4's utility speed is integrated with Vanilla CSS semantic tokens.

### When to use Tailwind CSS v4
Tailwind utility classes are the primary tool for layout and structural styles:
* **Layout & Position**: Flexbox, CSS Grid, positioning, layout triggers (`flex`, `grid`, `absolute`, `items-center`).
* **Spacing & Sizing**: Margins, paddings, heights, widths, and aspect ratios (`p-4`, `my-6`, `w-full`, `size-12`).
* **Typography Structure**: Sizes, weights, line heights (`text-sm`, `font-semibold`, `tracking-tight`).
* **Native Responsive Breakpoints**: Breakpoint triggers (`sm:`, `md:`, `lg:`).
* **Simple Interactive Utilities**: Durations, simple interactive utilities (`transition-all`, `duration-200`, `hover:scale-105`).

### When to use Vanilla CSS (Custom Properties)
CSS rules and properties are used to handle coloring, theming, and complex interactions:
* **Themeable Coloring**: All colors, backgrounds, borders, shadows, and rings must route through CSS Custom Properties (`var(--primary)`, `var(--accent)`, `var(--background)`).
* **Semantic Token Rule**: Components **must never** use raw palette Tailwind colors (e.g., `bg-blue-500` or `text-zinc-900`). Use semantic classes that map to tokens (e.g., `bg-primary`, `text-muted-foreground`, `border-border`).
* **Interactive State Styling**: Custom transitions, glassmorphic blurs (`backdrop-filter: blur(12px)`), custom scrollbars.
* **Dynamic Styling**: Style adjustments controlled dynamically via client-side JavaScript (e.g., mouse-trail highlights, heatmap cell opacities).
* **Component Variants**: Complex multi-variant components (like buttons, badges, inputs) must use `tailwind-variants` (`tv`) to structure layout and style variations.

For details, see [src/styles/AGENTS.styles.md](file:///home/jk/Code/Astro/src/styles/AGENTS.styles.md).

---

## 5. State Management System

State is separated into a two-tier system: NanoStores (lightweight, global display properties) and XState v5 (asynchronous transition engines).

* **NanoStores** (`src/stores/`): Use for lightweight global variables, active ID trackers (`selectedDate`, `activeDocumentId`), reactive UI toggles (`sidebarOpen`, `focusMode`), and lightweight computed derived calculations (like word counts or search filtering).
* **XState v5** (`src/components/apps/{app}/state/`): Use for heavy-duty state machines managing asynchronous side effects, debounced synchronizers (autosave loops), network retry/rollback logic, and complex state flows.

### Integration Rule:
* Decouple the logic. The XState actor runs in the background and writes computed metrics/status fields into lightweight NanoStores (or dispatches custom events) so other client islands can bind directly to NanoStores without being coupled to the state machine's internal flow.

For details, see [src/stores/AGENTS.state.md](file:///home/jk/Code/Astro/src/stores/AGENTS.state.md).

---

## 6. Types & Interfaces — One Source of Truth

* Database row types originate solely from Supabase-generated types in [src/types/supabase.ts](file:///home/jk/Code/Astro/src/types/supabase.ts).
* Domain/application types should compose from and extend database-generated types rather than recreating them manually.
* If a type is reused across two or more modules, it belongs in `src/lib/{domain}/types.ts`.
* Do not inline reusable type declarations inside `.astro` frontmatter.
* Prefer extending types over creating parallel shapes. Prefer `type` over `interface` unless declaration merging is required.

---

## 7. TypeScript Functions & Logic Boundaries

Logic must live in its appropriate location:

| Type of logic                   | Location                              |
|---------------------------------|---------------------------------------|
| Astro action handlers           | `src/actions/`                        |
| Database queries (reads)        | `src/lib/{domain}/queries.ts`         |
| Database mutations (writes)     | `src/lib/{domain}/mutations.ts`       |
| Pure utility functions          | `src/lib/{domain}/utils.ts`           |
| App-wide utilities              | `src/lib/utils.ts`                    |
| Component-specific client logic | `src/components/apps/{app}/.../*.ts`  |

* **Do not put complex business logic in `.astro` pages.** Pages are thin orchestrators—they receive or fetch data, pass props, and render layouts.
* Every exported function must have a JSDoc comment documenting its purpose, arguments, and return types.

---

## 8. File & Folder Naming Conventions

* **Astro components**: `PascalCase.astro` (e.g., `HabitCreateForm.astro`)
* **TypeScript modules**: `camelCase.ts` (e.g., `editorMachine.ts`)
* **CSS stylesheets**: `camelCase.css` (e.g., `sidebar.css`)
* **Content files**: `kebab-case.md` or `kebab-case.mdx` (e.g., `link-social-media-mental-health.mdx`)
* **Constant files**: `camelCase.consts.ts` (e.g., `tiptap.consts.ts`)
* **Type files**: `camelCase.types.ts` (e.g., `tiptap.types.ts`)
* **Test files**: `camelCase.test.ts` (e.g., `utils.test.ts`)

---

## 9. Astro-Specific Conventions

* **Frontmatter (`---` blocks) is server-only.** It runs at request or build time. Never reference browser APIs there.
* **Client scripts belong in `<script>` tags.** Wrap in `document.addEventListener('DOMContentLoaded', ...)` when selecting the DOM. Pass server-rendered variables to the client via `data-*` attributes on HTML wrappers.
* **No React-isms in templates.** Do not write React-specific props like `className` or `onClick` inside `.astro` files. Use standard HTML classes and standard scripts.
* **Content Collections**: Allowed to load both `.md` and `.mdx` content extensions.

---

## 10. Prohibited Patterns

* ❌ Creating custom UI elements (like buttons or inputs) when `src/components/starwind/` has them.
* ❌ Declaring domain types directly inside a `.astro` frontmatter or page.
* ❌ Hardcoding raw hex values or raw Tailwind colors (e.g., `text-[#1a1a1a]` or `bg-slate-100`) that belong in a semantic theme custom property.
* ❌ Putting complex logic or asynchronous network operations directly in `.astro` frontmatter.
* ❌ Writing relative import paths like `../../../../styles` when `@/*` is available.
