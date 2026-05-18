/**
 * @file src/lib/habit/types.ts
 * @description Domain types for the habit tracker, derived from the
 * generated Supabase database schema. Never hand-write these shapes —
 * always derive from Tables<> so they stay in sync with the database.
 */

import type { Tables, TablesInsert, TablesUpdate } from "@/types/supabase";

// ─── Row Types ────────────────────────────────────────────────────────────────

/** A habit record as returned from the database. */
export type Habit = Tables<"habits">;

/** A habit log entry as returned from the database. */
export type HabitLog = Tables<"habit_logs">;

// ─── Mutation Types ───────────────────────────────────────────────────────────

/** Shape required to insert a new habit. */
export type NewHabit = TablesInsert<"habits">;

/** Shape required to insert a new habit log entry. */
export type NewHabitLog = TablesInsert<"habit_logs">;

/** Shape for updating an existing habit. */
export type HabitUpdate = TablesUpdate<"habits">;

/** Shape for updating an existing habit log entry. */
export type HabitLogUpdate = TablesUpdate<"habit_logs">;

// ─── Tracking Types ───────────────────────────────────────────────────────────

/**
 * The supported tracking modes for a habit.
 * - boolean: did you do it? (yes/no)
 * - count:   how many times? (e.g. glasses of water)
 * - duration: how long? (e.g. minutes of meditation)
 *
 * Note: consider migrating tracking_type to a Postgres enum so this
 * union is generated automatically rather than maintained by hand.
 */
export type TrackingType = "boolean" | "count" | "duration";

// ─── Composed Types ───────────────────────────────────────────────────────────

/**
 * A habit with its log entries for a given period, used when rendering
 * the habit grid or calculating streaks.
 */
export type HabitWithLogs = Habit & {
  logs: HabitLog[];
};

/**
 * A habit log entry with its parent habit attached, used when rendering
 * a log history view where you need habit metadata alongside the entry.
 */
export type HabitLogWithHabit = HabitLog & {
  habit: Habit;
};

// ─── UI State Types ───────────────────────────────────────────────────────────

/**
 * The completion state of a single habit for a given day,
 * used by HabitGrid and HabitCard to determine visual state.
 */
export type HabitDayState = {
  /** The date this state represents (YYYY-MM-DD). */
  date: string;
  /** Whether the habit was completed on this day. */
  completed: boolean;
  /** The logged value if tracking_type is count or duration. */
  value: number | null;
  /** Optional note left when logging. */
  note: string | null;
};

/**
 * Streak data calculated client-side or via a future DB function.
 */
export type HabitStreak = {
  /** Current consecutive days streak. */
  current: number;
  /** Longest streak ever recorded. */
  longest: number;
  /** Total number of completions. */
  total: number;
};