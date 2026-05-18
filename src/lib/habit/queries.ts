/**
 * @file src/lib/habit/queries.ts
 * @description Server-side Supabase query functions for the habit tracker.
 *
 * All functions accept a Supabase client instance created by createClient()
 * from @/lib/supabase. Never instantiate the client inside these functions —
 * always receive it as a parameter so the request/cookie context is preserved.
 *
 * @example
 * // In an Astro page or API route:
 * import { createClient } from "@/lib/supabase";
 * import { getHabits } from "@/lib/habit/queries";
 *
 * const supabase = createClient({ request: Astro.request, cookies: Astro.cookies });
 * const { data, error } = await getHabits(supabase, userId);
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import type { HabitWithLogs } from "./types";

/** A typed Supabase client scoped to this project's database schema. */
type TypedSupabaseClient = SupabaseClient<Database>;

// ─── Habits ───────────────────────────────────────────────────────────────────

/**
 * Fetches all habits belonging to a user, ordered by creation date ascending.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param userId - The authenticated user's ID from supabase.auth.getUser().
 * @returns A Supabase response containing an array of Habit rows or an error.
 *
 * @example
 * const { data: habits, error } = await getHabits(supabase, user.id);
 */
export async function getHabits(
  supabase: TypedSupabaseClient,
  userId: string
) {
  return supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });
}

/**
 * Fetches a single habit by ID, verifying it belongs to the requesting user.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param habitId - The UUID of the habit to fetch.
 * @param userId - The authenticated user's ID, used to prevent unauthorized access.
 * @returns A Supabase response containing a single Habit row or an error.
 *
 * @example
 * const { data: habit, error } = await getHabitById(supabase, habitId, user.id);
 */
export async function getHabitById(
  supabase: TypedSupabaseClient,
  habitId: string,
  userId: string
) {
  return supabase
    .from("habits")
    .select("*")
    .eq("id", habitId)
    .eq("user_id", userId)
    .single();
}

/**
 * Fetches all habits for a user with their log entries for a given date range,
 * used to render the habit grid and calculate streaks.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param userId - The authenticated user's ID.
 * @param from - Start of the date range (YYYY-MM-DD), inclusive.
 * @param to - End of the date range (YYYY-MM-DD), inclusive.
 * @returns A Supabase response containing HabitWithLogs[] or an error.
 *
 * @example
 * const { data, error } = await getHabitsWithLogs(supabase, user.id, "2025-01-01", "2025-01-31");
 */
export async function getHabitsWithLogs(
  supabase: TypedSupabaseClient,
  userId: string,
  from: string,
  to: string
) {
  return supabase
    .from("habits")
    .select(`
      *,
      logs:habit_logs(*)
    `)
    .eq("user_id", userId)
    .gte("habit_logs.entry_date", from)
    .lte("habit_logs.entry_date", to)
    .order("created_at", { ascending: true })
    .returns<HabitWithLogs[]>();
}

// ─── Habit Logs ───────────────────────────────────────────────────────────────

/**
 * Fetches all log entries for a specific habit within a date range.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param habitId - The UUID of the habit to fetch logs for.
 * @param from - Start of the date range (YYYY-MM-DD), inclusive.
 * @param to - End of the date range (YYYY-MM-DD), inclusive.
 * @returns A Supabase response containing an array of HabitLog rows or an error.
 *
 * @example
 * const { data: logs, error } = await getHabitLogs(supabase, habitId, "2025-01-01", "2025-01-31");
 */
export async function getHabitLogs(
  supabase: TypedSupabaseClient,
  habitId: string,
  from: string,
  to: string
) {
  return supabase
    .from("habit_logs")
    .select("*")
    .eq("habit_id", habitId)
    .gte("entry_date", from)
    .lte("entry_date", to)
    .order("entry_date", { ascending: true });
}

/**
 * Fetches a single log entry for a specific habit on a specific date.
 * Used to check whether a habit has already been logged today before
 * showing the check-in UI.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param habitId - The UUID of the habit to check.
 * @param date - The date to check (YYYY-MM-DD).
 * @returns A Supabase response containing a single HabitLog row or null.
 *
 * @example
 * const { data: log } = await getHabitLogForDate(supabase, habitId, "2025-05-16");
 * const alreadyLogged = log !== null;
 */
export async function getHabitLogForDate(
  supabase: TypedSupabaseClient,
  habitId: string,
  date: string
) {
  return supabase
    .from("habit_logs")
    .select("*")
    .eq("habit_id", habitId)
    .eq("entry_date", date)
    .maybeSingle();
}

// ─── Streak Helpers ───────────────────────────────────────────────────────────

/**
 * Fetches all log entries for a habit ordered by date descending,
 * used as the raw input for streak calculation.
 *
 * Streak calculation itself is done in a pure utility function rather
 * than in SQL, keeping the logic testable without a database connection.
 * See @/lib/habit/utils.ts for calculateStreak().
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param habitId - The UUID of the habit to fetch streak data for.
 * @returns A Supabase response containing an array of entry_date strings.
 *
 * @example
 * const { data } = await getHabitLogDates(supabase, habitId);
 * const streak = calculateStreak(data?.map(l => l.entry_date) ?? []);
 */
export async function getHabitLogDates(
  supabase: TypedSupabaseClient,
  habitId: string
) {
  return supabase
    .from("habit_logs")
    .select("entry_date")
    .eq("habit_id", habitId)
    .order("entry_date", { ascending: false });
}