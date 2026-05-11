# TODO

## [x] TypeScript Errors & Code Review Fixes

---

### High Priority (Critical - Blocking Build)

- [x] **Fix ButtonVariants Export Issue** - Pagination components can't find ButtonVariants export
  - Location: `src/components/starwind/pagination/PaginationNext.astro:6:10`
  - Location: `src/components/starwind/pagination/PaginationPrevious.astro:6:10`

- [x] **Fix BlogPost Description Type** - Undefined description prop causing type error
  - Location: `src/layouts/BlogPost.astro:18:27`

- [x] **Fix Blog Categories Page Types** - Implicit 'any' types in map functions
  - Location: `src/pages/blog/category/[category].astro:21:37`

- [x] **Fix Blog Tag Pages Types** - Unknown type assignments throughout tag pages
  - Location: `src/pages/blog/tag/[tag].astro` (multiple lines: 71, 77, 97, 119)
  - Location: `src/pages/blog/tags.astro` (multiple lines: 29, 137)

- [x] **Fix Theme Toggle Memory Leak** - activeToggles Set never cleared during page transitions
  - Location: `src/components/starwind/theme-toggle/ThemeToggle.astro:173-175`

- [x] **Fix Theme Toggle Race Condition** - Initialization state synchronization issues
  - Location: `src/components/starwind/theme-toggle/ThemeToggle.astro:106-109`

### Medium Priority

- [x] **Fix Dropdown Null Reference** - Potential runtime error in focus management
  - Location: `src/components/starwind/dropdown/Dropdown.astro:421-422`

- [x] **Enhance CI/CD Security** - Add dependency scanning to prevent supply chain attacks
  - Location: `.github/workflows/ci.yml:26`

### Low Priority (Code Quality)

- [x] **Clean Up Unused Imports** - Remove unused imports across 20+ files
  - Files affected: BaseHead.astro, BlogIndexLayout.astro, BlogPost.astro, BlogPostLayout.astro, Layout.astro, about.astro, blog pages, etc.

- [x] **Remove Commented CSS** - Clean up redundant styles in HeaderMenu
  - Location: `src/components/header/HeaderMenu.astro:89-104`

- [x] **Update README.md** - Reflect current project state and features
  - Updated with Starwind UI, modern tooling, and comprehensive feature list

---

## Feature Requests

### [x] Consent to cookies and stuff

[astro-consent](https://github.com/zdenekkurecka/astro-consent#readme) ?

`pnpm astro add @zdenekkurecka/astro-consent`

### [ ] 2. Astro meta engine

[astro-meta-engine](https://github.com/TheElegantCoding/astro-meta-engine#readme)

`pnpm i -D astro-meta-engine`

### [ ] 3. Search plugin

[astro-search-plugin](https://github.com/freshjuice-dev/astro-search-plugin)

```astro
---
// src/layouts/BaseLayout.astro
import "@freshjuice/astro-search-plugin/styles.css";
---

<html>
  <body>
    <slot />

    <astro-search-palette
      index-url="/search-index.json"
      shortcut="mod+k"
      placeholder="Search…"
      group-by="type"
    ></astro-search-palette>

    <script>
      // Side-effect import: registers <astro-search-palette> globally
      import "@freshjuice/astro-search-plugin/element";
    </script>
  </body>
</html>
```

### [ ] 4. SUPABASE INTEGRATION

Setting up a scalable habit tracker with Astro Actions and Supabase is actually quite straightforward once you see the "plumbing." Here is the baby-step guide to getting the data flowing from your table to the database.

#### Phase 1: The Supabase "Bucket"

First, you need a place for the data to live.

- [ ] Create a Table: In your Supabase dashboard, run this SQL to create the "Log" table.

```sql
CREATE TABLE habit_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id uuid REFERENCES habits(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL,
  value NUMERIC DEFAULT 0,
  -- This 'UNIQUE' constraint is what makes the UPSERT work!
  UNIQUE(habit_id, entry_date)
);
```

- [ ] Get your Keys: Copy your `SUPABASE_URL` and `SUPABASE_ANON_KEY` into a `.env` file in your Astro project.

#### Phase 2: The Astro "Action" (Server-side)

Think of an **Action** as a secure tunnel. On one side is your table, on the other is your database.

1. [ ] **Define the Action:** Create or open `src/actions/index.ts`.
2. [ ] **Write the Logic:**

```typescript
  import { defineAction } from 'astro:actions';
  import { z } from 'astro:schema';
  import { createClient } from '@supabase/supabase-js';

  // Initialize Supabase
  const supabase = createClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_ANON_KEY);

  export const server = {
    updateHabit: defineAction({
      // 1. Validate the 'baby' data coming from the UI
      input: z.object({
        habitId: z.string().uuid(),
        date: z.string(), // e.g., "2026-05-10"
        val: z.number()
      }),
      handler: async (input) => {
        // 2. Perform the UPSERT (Update or Insert)
        const { data, error } = await supabase
          .from('habit_logs')
          .upsert({ 
            habit_id: input.habitId, 
            entry_date: input.date, 
            value: input.val 
          }, { onConflict: 'habit_id,entry_date' });

        if (error) throw new Error(error.message);
        return { success: true };
      }
    })
  };
```

---

#### Phase 3: The Vanilla TS "Trigger" (Client-side)

Now we need to make the table "talk" to the Action. In your Vanilla TypeScript file (e.g., `HabitGrid.ts`):

1. [ ] **Listen for Clicks:**

```typescript
  import { actions } from 'astro:actions';

  // 1. Find all your habit "cells"
  const cells = document.querySelectorAll('.habit-cell');

  cells.forEach(cell => {
    cell.addEventListener('click', async () => {
      // 2. Grab data from the HTML (data-habit-id="...")
      const habitId = cell.getAttribute('data-habit-id');
      const date = cell.getAttribute('data-date');
      
      // 3. Call the Action like a normal function!
      const { data, error } = await actions.updateHabit({
        habitId: habitId!,
        date: date!,
        val: 1 // Or whatever number they chose
      });

      if (!error) {
        cell.classList.toggle('is-completed'); // Visual feedback
      }
    });
  });
```

### [ ] Summary for the "Baby" Version

1. [ ] The Database: Has a rule that says "One habit can only have one log per day."
2. [ ] The Action: Receives the click, checks it's valid, and tells the Database: *"Hey, either add this or change the existing one."*
3. [ ] The UI: Just waits for a "thumbs up" from the Action to change the color of the cell.

### Why this is great for you

- No API Routes: You don't have to manage `/api/update`. Astro handles the routing automatically.

- Types Everywhere: If you accidentally try to send a "string" for the value, your code will yell at you before you even try to run it.
- Scalable: Because it’s an Upsert, clicking a cell 100 times won’t create 100 rows; it will just update that one single "crossroad" in your table.

Does that flow make sense, or should we zoom in on one of these parts?
