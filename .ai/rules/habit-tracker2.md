# src/pages/app/habit — Conventions

## Overview
This directory contains the main page for the habit tracking feature. It is responsible for fetching a user's habit definitions and their corresponding log entries for the current month from the Supabase backend, structuring this data, and passing it down to specialized components for rendering.

## Patterns
*   **Data Fetching:** All necessary data must be fetched server-side within the component's frontmatter (e.g., `const { data: habits, ... } = await supabase...`).
*   **Client Initialization:** The Supabase client must be initialized using the request and cookies context: `const supabase = createClient({ request: Astro.request, cookies: Astro.cookies });`.
*   **Authentication Gate:** The page must implement an authentication check and redirect if the user is not logged in (e.g., `if (!user) { return Astro.redirect('/auth/login'); }`).
*   **Data Transformation:** Habits and logs must be fetched separately (`habits` from `habits`, `logs` from `habit_logs`) and then combined manually into a single structured array (`habitsWithLogs`) in the frontmatter before rendering.
*   **Page Directives:** Since data fetching depends on dynamic user sessions and real-time inputs, the page must explicitly disable pre-rendering: `export const prerender = false;`.
*   **Component Usage:** State management data (like `habitsWithLogs`, `from`, `to`) must be passed as props to child components (e.g., `<HabitGrid habits={habitsWithLogs} from={from} to={to} />`).

## Examples
```astro
// Establishing Supabase client
const supabase = createClient({
  request: Astro.request,
  cookies: Astro.cookies,
});
// Fetching and combining data
const habitsWithLogs = (habits ?? []).map(habit => ({
  ...habit,
  logs: (logs ?? []).filter(log => log.habit_id === habit.id),
}));
```

## Anti-patterns
*   Do not rely on server-side rendering for this page due to dynamic user data; always set `export const prerender = false;`.
*   Do not fetch all required data in a single, complex join query. Instead, fetch base entities (habits) and related logs separately, then merge them in the frontmatter.
*   Do not omit the necessary authentication check and redirection if a user is unauthenticated.

## Key files
*   **`track.astro`**: The core page component. Handles authentication, orchestrates data fetching (habits and logs), merges the data structure, and renders the `HabitGrid` component.
*   **`@/components/apps/habit/HabitGrid.astro`**: The primary child component responsible for iterating and rendering the structured habit data.
*   **`@/lib/supabase`**: Contains the utility function (`createClient`) required to initialize and use the Supabase client safely within Astro's server context.
*   **`@/lib/habit/utils`**: Contains utility functions (`currentMonthRange`, `currentMonth`) used to define date boundaries (`from`, `to`) for log queries.
