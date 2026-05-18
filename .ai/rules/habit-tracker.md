# src/pages/app/habit — Conventions

## Overview
This module serves as the main entry point for the Habit Tracking Dashboard. It handles user authentication, determines the date range for the current month, fetches all relevant habit data and corresponding activity logs from the database, processes this data structure, and finally renders the complete tracking interface using component architecture.

## Patterns
*   **Authentication Guard:** All pages in this directory must utilize an initial authentication guard using `supabase.auth.getUser()` and redirect to `/auth/login` if the user is unauthenticated.
*   **Client Initialization:** The Supabase client must be initialized using `createClient({ request: Astro.request, cookies: Astro.cookies })` within the page script.
*   **Date Range Calculation:** Use dedicated utilities (`@/lib/habit/utils`) to calculate the start (`from`) and end (`to`) date boundaries for the current viewing month.
*   **Data Fetching Strategy (Separate + Map):** Fetch core entities (e.g., `habits`) and related transactional data (e.g., `habit_logs`) in two separate, optimized queries. The resulting datasets must be manually joined/mapped in the server component logic (e.g., `habitsWithLogs = habits.map(...)`) to create the final consumption shape.
*   **Component Composition:** The page must be structured by wrapping core content within a layout (`<Layout>`) and delegating complex rendering logic to dedicated components (e.g., `<HabitGrid>`).

## Examples
**Auth Guard:**
```typescript
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
  return Astro.redirect('/auth/login');
}
```

**Data Joining (N+1 Fix):**
```typescript
const habitsWithLogs = (habits ?? []).map(habit => ({
  ...habit,
  logs: (logs ?? []).filter(log => log.habit_id === habit.id),
}));
```

**Rendering:**
```astro
<HabitGrid
  habits={habitsWithLogs ?? []}
  from={from}
  to={to}
  currentMonth={currentMonth}
/>
```

## Anti-patterns
*   Do not assume ORM-level joining will occur; always perform manual mapping after separate database queries.
*   Do not render complex UI logic directly in the page component body; delegate to specialized components like `<HabitGrid>`.
*   Do not omit the authentication guard check, leading to exposed data or unauthorized access.
*   Do not use standard `await supabase.from('table').select('*')` without filtering by `user_id` or applying necessary date range constraints.

## Key files
*   `src/pages/app/habit/track.astro`: The primary component responsible for fetching, mapping, and rendering the habit dashboard for a specific month.
*   `@/components/apps/habit/HabitGrid.astro`: Component responsible for displaying and structuring the habit visualization data.
*   `@/lib/supabase`: Utility module containing the `createClient` function for managing the Supabase session and database interactions.
*   `@/lib/habit/utils`: Utility module containing date range calculation helpers (`currentMonthRange`).
