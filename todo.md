# TODO

## PROPOSED CLEAN DIRECTORY STRUCTURE

src/
├── actions/
│   ├── auth.ts
│   ├── habit.ts           ← move habit mutations here
│   ├── journal.ts
│   ├── meditation.ts
│   └── index.ts
│
├── assets/               ← unchanged
│
├── components/
│   │
│   ├── ui/               ← PRIMITIVES ONLY, no domain knowledge
│   │   ├── card/
│   │   │   └── Card.astro          ← one card to rule them all
│   │   ├── icon/
│   │   │   └── Icon.astro
│   │   ├── logo/
│   │   │   └── Logo.astro
│   │   └── index.ts
│   │
│   ├── starwind/         ← leave untouched, third-party system
│   │
│   ├── layout/           ← page structure primitives only
│   │   ├── primitives/   ← keep your existing Center, Cluster, etc.
│   │   └── index.ts
│   │
│   ├── blog/             ← keep as-is, already well-organized
│   │
│   ├── header/           ← keep as-is
│   │
│   ├── sections/         ← REPLACES both layout/ sections and sectional/
│   │   ├── hero/
│   │   │   ├── HeroSection.astro
│   │   │   ├── HeroText.astro
│   │   │   ├── HeroImage.astro
│   │   │   └── HeroAction.astro
│   │   ├── features/
│   │   │   ├── FeaturesSection.astro
│   │   │   └── FeatureCard.astro
│   │   ├── faq/
│   │   │   ├── FAQSection.astro
│   │   │   └── FAQCard.astro
│   │   ├── pricing/
│   │   │   ├── PricingSection.astro
│   │   │   └── PricingCard.astro
│   │   ├── testimonials/
│   │   │   ├── TestimonialsSection.astro
│   │   │   └── TestimonialCard.astro
│   │   ├── team/
│   │   │   └── TeamSection.astro
│   │   ├── contact/
│   │   │   ├── ContactSection.astro
│   │   │   └── ContactFormSection.astro
│   │   ├── newsletter/
│   │   │   └── NewsletterSection.astro
│   │   ├── cta/
│   │   │   ├── CTASection.astro
│   │   │   └── CrisisLineSection.astro   ← renamed from SuicideCta
│   │   └── index.ts
│   │
│   ├── auth/             ← promote these, they deserve their own home
│   │   ├── LoginForm.astro
│   │   ├── SignupForm.astro
│   │   └── index.ts
│   │
│   └── apps/             ← REPLACES src/app/ and src/components/app/
│       ├── shared/
│       │   ├── MoodSelector.astro
│       │   ├── EmptyState.astro
│       │   ├── ProgressRing.astro
│       │   └── StreakBadge.astro
│       ├── habit/
│       │   ├── HabitGrid.astro       ← move from components/app/tracker/
│       │   ├── HabitCard.astro
│       │   ├── HabitForm.astro
│       │   ├── HabitLog.astro
│       │   └── index.ts
│       ├── journal/
│       │   ├── JournalEditor.astro
│       │   ├── JournalEntry.astro
│       │   ├── EntryList.astro
│       │   ├── PromptCard.astro
│       │   └── index.ts
│       └── meditation/
│           ├── SessionTimer.astro
│           ├── BreathingGuide.astro
│           ├── SessionCard.astro
│           ├── SessionLog.astro
│           └── index.ts
│
├── lib/
│   ├── supabase.ts           ← one file, delete lib/db/supabase.js
│   ├── auth.ts               ← session helpers extracted here
│   ├── habit/
│   │   ├── queries.ts
│   │   └── mutations.ts
│   ├── journal/
│   │   ├── queries.ts
│   │   └── mutations.ts
│   ├── meditation/
│   │   ├── queries.ts
│   │   └── mutations.ts
│   └── utils.ts
│
├── layouts/                  ← keep as-is, already clean
├── pages/                    ← keep as-is
├── content/                  ← keep as-is
├── data/                     ← keep as-is
└── styles/                   ← keep as-is



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

## Directory Reorganization

Based on the proposed clean directory structure in this file, the following tasks need to be completed:

- [ ] Create new directory structure: src/components/ui/, src/components/layout/primitives/, src/components/sections/, src/components/auth/, src/components/apps/, src/lib/habit/, src/lib/journal/, src/lib/meditation/
- [ ] Move habit-related components to src/components/apps/habit/ (HabitGrid, HabitCard, HabitForm, HabitLog from components/app/tracker/)
- [ ] Move journal-related components to src/components/apps/journal/ (JournalEditor, JournalEntry, EntryList, PromptCard)
- [ ] Move meditation-related components to src/components/apps/meditation/ (SessionTimer, BreathingGuide, SessionCard, SessionLog)
- [ ] Move shared app components to src/components/apps/shared/ (MoodSelector, EmptyState, ProgressRing, StreakBadge)
- [ ] Move auth components to src/components/auth/ (LoginForm, SignupForm)
- [ ] Create UI primitives in src/components/ui/ (Card.astro, Icon.astro, Logo.astro)
- [ ] Consolidate layout primitives into src/components/layout/primitives/ (Center, Cluster, etc.)
- [ ] Create section components in src/components/sections/ (hero, features, faq, pricing, testimonials, team, contact, newsletter, cta)
- [ ] Move habit mutations from components to src/actions/habit.ts
- [ ] Create src/actions/journal.ts and src/actions/meditation.ts
- [ ] Consolidate Supabase setup: delete lib/db/supabase.js, create src/lib/supabase.ts
- [ ] Extract auth helpers to src/lib/auth.ts
- [ ] Create domain-specific query/mutation files in src/lib/habit/, src/lib/journal/, src/lib/meditation/
- [ ] Create index.ts files for all new directories to export components
- [ ] Update all import statements throughout the codebase to reflect new file locations
- [ ] Delete old empty directories after moves are complete
- [ ] Test the application to ensure all imports resolve correctly

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






