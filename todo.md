# TODO

## Site Wireframe Scaffolding

See [wireframe](./docs/pages/site-wireframe.md) for details.

### Global Architecture

- [ ] Define shared layout structure (`Layout.astro`, page shells, wrappers)
- [ ] Define reusable section component patterns
- [ ] Create shared UI component library
- [ ] Create shared type interfaces
- [ ] Create shared utility/helper functions
- [ ] Establish naming conventions for components, styles, and scripts
- [ ] Define global spacing and layout system
- [ ] Define typography scale and utility classes
- [ ] Define color system and CSS custom properties
- [ ] Define container width strategy
- [ ] Define responsive breakpoint system
- [ ] Define animation and transition guidelines
- [ ] Define icon strategy
- [ ] Define image optimization strategy

### Global Styling

- [ ] Set up global CSS architecture
- [ ] Create reset/base styles
- [ ] Create utility classes
- [ ] Create reusable section spacing utilities
- [ ] Create reusable grid/flex layout utilities
- [ ] Create reusable button variants
- [ ] Create reusable form styles
- [ ] Create reusable card styles
- [ ] Create reusable badge/tag styles
- [ ] Create reusable typography utilities
- [ ] Implement theme switching
- [ ] Add dark mode styles
- [ ] Add reduced motion support

### Shared Components

- [ ] Navbar
- [ ] Mobile navigation
- [ ] Footer
- [ ] CTA section
- [ ] FAQ section
- [ ] Newsletter section
- [ ] Testimonial section
- [ ] Pricing cards
- [ ] Blog cards
- [ ] Resource cards
- [ ] Form inputs
- [ ] Buttons
- [ ] Modals/dialogs
- [ ] Toast/alert system
- [ ] Empty states
- [ ] Loading states
- [ ] Pagination
- [ ] Search/filter UI

### SEO + Metadata

- [ ] Create reusable SEO component
- [ ] Add page titles and descriptions
- [ ] Add Open Graph metadata
- [ ] Add Twitter metadata
- [ ] Add canonical URLs
- [ ] Add structured data/schema.org support
- [ ] Generate sitemap
- [ ] Generate RSS feed
- [ ] Add robots.txt

### Accessibility

- [ ] Ensure semantic HTML structure
- [ ] Add keyboard navigation support
- [ ] Add visible focus states
- [ ] Add ARIA labels where needed
- [ ] Validate color contrast accessibility
- [ ] Add skip-to-content link
- [ ] Ensure forms are accessible
- [ ] Test screen reader compatibility

### Performance

- [ ] Optimize font loading
- [ ] Optimize image loading
- [ ] Add lazy loading where appropriate
- [ ] Reduce layout shift
- [ ] Minimize unused CSS
- [ ] Audit Lighthouse performance
- [ ] Audit accessibility score
- [ ] Audit SEO score

### Content System

- [ ] Define content collection schemas
- [ ] Set up blog content collections
- [ ] Set up resource content collections
- [ ] Set up category/tag relationships
- [ ] Create markdown rendering components
- [ ] Add syntax highlighting strategy
- [ ] Add reading time calculation
- [ ] Add related posts logic

### App Features

- [ ] Define authentication flow
- [ ] Define protected routes
- [ ] Define user settings structure
- [ ] Define data persistence strategy
- [ ] Define analytics/tracking strategy
- [ ] Define notification/reminder system
- [ ] Define mood tracking structure
- [ ] Define habit tracking structure
- [ ] Define meditation session structure
- [ ] Define journaling structure

### Page Scaffolding

- [ ] Create basic layout structure using reusable components with flexible props
- [ ] Add page-specific content and logic
- [ ] Add navigation components
- [ ] Set up responsive layouts
- [ ] Connect shared components
- [ ] Add loading/error/empty states
- [ ] Add SEO metadata
- [ ] Add accessibility support

### Testing

- [ ] Test responsive layouts
- [ ] Test navigation flows
- [ ] Test forms and validation
- [ ] Test theme switching
- [ ] Test keyboard accessibility
- [ ] Test performance on mobile
- [ ] Test across major browsers

### Deployment

- [ ] Configure environment variables
- [ ] Configure production build settings
- [ ] Set up CI/CD
- [ ] Configure domain and DNS
- [ ] Configure analytics
- [ ] Configure error logging
- [ ] Configure backups
- [ ] Final production QA pass

---

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

## Sections

### Navbar

- [ ] User Menu / Sign Up
- [ ] Menu -----
  - [ ] Docs, Home, About, Resources
  - [ ] Tools Dropdown Menu
  - [ ] Blog Dropdown Menu
  - [ ] Mobile Menu Button
  - [ ] Logo Link

### Hero Section

- [ ] h1 - Build the life you want to live
- [ ] p - Small habits compound into lasting change. Track your progress, reflect in your journal, and find calm through meditation. Everything you need to care for yourself is here.
- [ ] Button (Expore)
- [ ] Button (Learn More)

### Features Section

- h5 Tools
- h2 Many ways to grow
- p - Everything you need to build better habits and live your best life.
- 3-column card grid
  - [ ] Track your habits
  - [ ] Reflect in your journal
  - [ ] Find calm through meditation

### Reading Section

- Full Page hero (Image | Details)
- Tabs (Recent | Category 1 | Category 2 | etc)
- 1/2 Page Cards (Image/Details | Image/Details)

### Tools Section






