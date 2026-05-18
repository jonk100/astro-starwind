/**
 * @file src/lib/habit/mutations.ts
 * @description Server-side Supabase mutation functions for the habit tracker.
 *
 * All functions accept a Supabase client instance created by createClient()
 * from @/lib/supabase. Never instantiate the client inside these functions —
 * always receive it as a parameter so the request/cookie context is preserved.
 *
 * These functions are intended to be called from Astro Actions in
 * src/actions/habit.ts, not directly from page frontmatter.
 *
 * @example
 * // In src/actions/habit.ts:
 * import { createHabit } from "@/lib/habit/mutations";
 *
 * export const habit = {
 *   create: defineAction({
 *     handler: async (input, context) => {
 *       const supabase = createClient(context);
 *       return createHabit(supabase, input);
 *     }
 *   })
 * }
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import type { NewHabit, HabitUpdate, NewHabitLog, HabitLogUpdate } from "./types";

/** A typed Supabase client scoped to this project's database schema. */
type TypedSupabaseClient = SupabaseClient<Database>;

// ─── Habits ───────────────────────────────────────────────────────────────────

/**
 * Inserts a new habit record for the authenticated user.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param habit - The habit data to insert. user_id should be set by the action
 *   from the verified session, never trusted from client input.
 * @returns A Supabase response containing the newly created Habit row or an error.
 *
 * @example
 * const { data, error } = await createHabit(supabase, {
 *   name: "Morning meditation",
 *   tracking_type: "boolean",
 *   user_id: user.id,
 * });
 */
export async function createHabit(
  supabase: TypedSupabaseClient,
  habit: NewHabit
) {
  return supabase
    .from("habits")
    .insert(habit)
    .select()
    .single();
}

/**
 * Updates an existing habit record by ID.
 * Verifies ownership via user_id to prevent unauthorized updates.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param habitId - The UUID of the habit to update.
 * @param userId - The authenticated user's ID, used to verify ownership.
 * @param updates - The fields to update. Only include changed fields.
 * @returns A Supabase response containing the updated Habit row or an error.
 *
 * @example
 * const { data, error } = await updateHabit(supabase, habitId, user.id, {
 *   name: "Evening meditation",
 * });
 */
export async function updateHabit(
  supabase: TypedSupabaseClient,
  habitId: string,
  userId: string,
  updates: HabitUpdate
) {
  return supabase
    .from("habits")
    .update(updates)
    .eq("id", habitId)
    .eq("user_id", userId)
    .select()
    .single();
}

/**
 * Deletes a habit and all its associated log entries.
 *
 * Note: habit_logs deletion relies on a CASCADE delete constraint on the
 * habit_logs.habit_id foreign key in Postgres. If that constraint is not
 * set, logs will be orphaned. Verify this in your Supabase dashboard under
 * Table Editor → habit_logs → Foreign Keys.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param habitId - The UUID of the habit to delete.
 * @param userId - The authenticated user's ID, used to verify ownership.
 * @returns A Supabase response with no data on success, or an error.
 *
 * @example
 * const { error } = await deleteHabit(supabase, habitId, user.id);
 */
export async function deleteHabit(
  supabase: TypedSupabaseClient,
  habitId: string,
  userId: string
) {
  return supabase
    .from("habits")
    .delete()
    .eq("id", habitId)
    .eq("user_id", userId);
}

// ─── Habit Logs ───────────────────────────────────────────────────────────────

/**
 * Inserts a new log entry for a habit on a given date.
 *
 * Before calling this, check getHabitLogForDate() to avoid duplicate
 * entries for the same habit on the same day. Alternatively, add a
 * unique constraint on (habit_id, entry_date) in Postgres and handle
 * the conflict error here.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param log - The log entry data to insert.
 * @returns A Supabase response containing the newly created HabitLog row or an error.
 *
 * @example
 * const { data, error } = await createHabitLog(supabase, {
 *   habit_id: habitId,
 *   user_id: user.id,
 *   entry_date: "2025-05-16",
 *   value: 1,
 *   note: "Felt great today",
 * });
 */
export async function createHabitLog(
  supabase: TypedSupabaseClient,
  log: NewHabitLog
) {
  return supabase
    .from("habit_logs")
    .insert(log)
    .select()
    .single();
}

/**
 * Upserts a habit log entry — inserts if no entry exists for that date,
 * updates if one already does. Requires a unique constraint on
 * (habit_id, entry_date) in Postgres for the conflict resolution to work.
 *
 * This is the preferred method for the check-in UI where you don't want
 * to pre-check whether a log exists before writing.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param log - The log entry data to upsert.
 * @returns A Supabase response containing the upserted HabitLog row or an error.
 *
 * @example
 * const { data, error } = await upsertHabitLog(supabase, {
 *   habit_id: habitId,
 *   user_id: user.id,
 *   entry_date: "2025-05-16",
 *   value: 1,
 * });
 */
export async function upsertHabitLog(
  supabase: TypedSupabaseClient,
  log: NewHabitLog
) {
  return supabase
    .from("habit_logs")
    .upsert(log, { onConflict: "user_id, habit_id, entry_date" })
    .select()
    .single();
}

/**
 * Updates an existing habit log entry by ID.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param logId - The UUID of the log entry to update.
 * @param userId - The authenticated user's ID, used to verify ownership.
 * @param updates - The fields to update.
 * @returns A Supabase response containing the updated HabitLog row or an error.
 *
 * @example
 * const { data, error } = await updateHabitLog(supabase, logId, user.id, {
 *   note: "Updated note",
 * });
 */
export async function updateHabitLog(
  supabase: TypedSupabaseClient,
  logId: string,
  userId: string,
  updates: HabitLogUpdate
) {
  return supabase
    .from("habit_logs")
    .update(updates)
    .eq("id", logId)
    .eq("user_id", userId)
    .select()
    .single();
}

/**
 * Deletes a specific habit log entry by ID.
 * Used when a user wants to un-check a habit for a given day.
 *
 * @param supabase - The typed Supabase client from the current request context.
 * @param logId - The UUID of the log entry to delete.
 * @param userId - The authenticated user's ID, used to verify ownership.
 * @returns A Supabase response with no data on success, or an error.
 *
 * @example
 * const { error } = await deleteHabitLog(supabase, logId, user.id);
 */
export async function deleteHabitLog(
  supabase: TypedSupabaseClient,
  logId: string,
  userId: string
) {
  return supabase
    .from("habit_logs")
    .delete()
    .eq("id", logId)
    .eq("user_id", userId);
}
