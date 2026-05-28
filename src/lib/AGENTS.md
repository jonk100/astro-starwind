# `src/lib/AGENTS.md` — Domain Libraries & Logic Guidelines

This document governs the utility libraries, Supabase queries, mutations, and types located in `src/lib/`. It expands on the principles defined in the master [AGENTS.md](file:///home/jk/Code/Astro/AGENTS.md) constitution.

---

## 1. Directory Structure & Logic Separation

All domain-specific logic must reside under its respective library subfolder:
* `src/lib/habit/` (Habit queries, mutations, streak calculations, themes, and utility types)
* `src/lib/journal/` (Journal/document queries, mutations, TipTap converters, and utility types)
* `src/lib/utils/` (General application helpers, date formatters, and global utilities)

---

## 2. Reads vs. Mutations (Separation of Concerns)

To maintain a clean database communication boundary:
* **Database Reads (`queries.ts`)**: Keep all standard data-fetching, document lookups, tag searches, and log indexing operations strictly inside `queries.ts`.
* **Database Mutations (`mutations.ts`)**: Keep all insertions, updates, archives, deletions, and streak updates strictly inside `mutations.ts`.
* **No Client Queries**: Client components and Astro actions must never write inline Supabase queries. They must always delegate to these predefined database library functions.

---

## 3. Strict Type Safety with Supabase

* **Generated Source of Truth**: All database row models must originate from `/src/types/supabase.ts` (generated via `pnpm db:types`).
* **Composition Over Recreation**: Reusable application types must compose from and extend these generated models using the `Tables`, `TablesInsert`, or `TablesUpdate` helpers, rather than recreating parallel typings manually.
  ```ts
  import type { Tables } from "@/types/supabase";

  export type DocumentIndexRow = Tables<"document_index">;
  export type Habit = Tables<"habits">;
  ```
* **No Inlining**: Do not inline reusable types inside components or Astro page scripts. Declare them inside a central `types.ts` file in the appropriate lib folder.

---

## 4. JSDoc & Coding Standards

* **Mandatory JSDoc**: Every exported function must include a descriptive JSDoc block detailing its purpose, input parameters, and return shape.
* **Namespacing / Prefixing**: Prefix helper functions inside general utilities clearly to prevent naming collisions (e.g., `habitGetStreak` inside general modules, or namespace imports).

---

## 5. Reference to Root

Refer to [AGENTS.md](file:///home/jk/Code/Astro/AGENTS.md) for import aliasing (`@/*` mapping) and tech stack summaries.
