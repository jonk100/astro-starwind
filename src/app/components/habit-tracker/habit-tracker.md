# Habit Tracker: High-Level Architecture

The habit tracker app is a web app that allows users to track their habits and progress. The main view shows a grid of habits, each with a series of checkmarks representing the last 30 days of activity. It stays locked on the current month's 30 days, but a user can scroll down if they've filled up their chart for the month; the app should take up the majority of the screen without clutter.

## 1. Data Layer (Supabase / Postgres)

- Habits Table: Stores the definition of what is being tracked (e.g., "Write Screenplay", "Code TS").
- Logs Table: A "Time-Series" table storing every daily check-in.
  - Key Constraint: `UNIQUE(habit_id, entry_date)`. This ensures that every "crossroad" in your UI corresponds to exactly one database row.
- Upsert Logic: Uses the `ON CONFLICT` SQL command to handle both new check-ins and corrections in a single database hit.

### DB Schema

#### Habits Table

This table stores the definition of what is being tracked. Each row in our table corresponds to a habit the user wants to track.

- `id`: Unique identifier for each habit.
- `name`: The name of the habit.
- `tracking_type`: The type of tracking for the habit (e.g., 'boolean', 'count', 'duration').
- `metadata`: Additional metadata for the habit (e.g., goals, units).
- `created_at`: When the habit was first created.

```sql
CREATE TABLE habits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tracking_type TEXT DEFAULT 'boolean', -- options: 'boolean', 'count', 'duration'
    metadata JSONB DEFAULT '{}',          -- for goals (e.g., {"goal": 500, "unit": "words"})
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Logs Table

This table stores the actual check-ins. Each row represents a single day's record for a specific habit.

- `id`: Unique identifier for each log entry.
- `habit_id`: Foreign key linking to the `habits` table.
- `entry_date`: The date of the check-in.
- `value`: The value of the log entry (1 for boolean, count/time for count/duration).
- `note`: Your daily commentary.
- `updated_at`: When the log entry was last updated.

```sql
CREATE TABLE habit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    habit_id UUID REFERENCES habits(id) ON DELETE CASCADE NOT NULL,
    entry_date DATE NOT NULL,
    value NUMERIC DEFAULT 0,              -- stores 1 for bool, or the specific count/time
    note TEXT,                            -- your daily commentary
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

We have a unique constraint on `(habit_id, entry_date)` to ensure that each habit can only be checked off once per day.
We also did `alter publication supabase_realtime add table habit_logs;` to enable real-time updates.

## 2. Server Logic (Astro Actions)

- Type-Safe Tunnel: Acts as the middleman between the browser and the database.
- Validation: Uses Zod to ensure that the `habit_id` is a valid UUID and the `date` is formatted correctly before reaching Postgres.
- Environment Security: Securely uses `SUPABASE_URL` and `SUPABASE_ANON_KEY` on the server so they are never exposed to the user's browser.

## 3. UI Layer (Astro + Vanilla TypeScript)

- The Grid (Astro Template):
  - Renders a table where columns = Days and rows = Habits.
  - Each cell is stamped with `data-habit-id` and `data-date` attributes.

- The Interaction (Vanilla TS):
  - A single event listener manages clicks on the table.
  - It extracts data from the clicked cell and triggers the Astro Action.
  - On success, it toggles a CSS class (e.g., `.is-completed`) to give instant visual feedback.

## 4. Deployment (Cloudflare)

- SSR (Server-Side Rendering): The app runs as a Cloudflare Worker (`output: 'server'`).
- Performance: The "Table" view is rendered on the server for speed, while the "Check-off" logic happens instantly via client-side TypeScript.
