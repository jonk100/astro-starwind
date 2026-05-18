/**
 * @file src/lib/habit/utils.ts
 * @description Pure utility functions for habit data processing.
 *
 * These functions have no Supabase dependency and operate only on plain
 * data. This makes them fully testable without a database connection and
 * safe to import in both server and client contexts.
 */

import type { HabitStreak, HabitDayState, HabitLog } from "./types";

// ─── Date Helpers ─────────────────────────────────────────────────────────────

/**
 * Formats a Date object to a YYYY-MM-DD string, matching the format
 * used by Postgres date columns and Supabase query filters.
 *
 * @param date - The date to format. Defaults to today.
 * @returns A date string in YYYY-MM-DD format.
 *
 * @example
 * toDateString();              // "2025-05-16"
 * toDateString(new Date(...)); // "2025-01-01"
 */
export function toDateString(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

/**
 * Returns a date string for N days ago relative to today.
 *
 * @param days - Number of days to go back.
 * @returns A date string in YYYY-MM-DD format.
 *
 * @example
 * daysAgo(7);  // "2025-05-09" (if today is 2025-05-16)
 * daysAgo(30); // "2025-04-16"
 */
export function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return toDateString(date);
}

/**
 * Returns a date range object for the last N days including today,
 * suitable for passing directly to getHabitsWithLogs() or getHabitLogs().
 *
 * @param days - Number of days to include (e.g. 7, 30, 365).
 * @returns An object with `from` and `to` date strings (YYYY-MM-DD).
 *
 * @example
 * lastNDays(7);
 * // { from: "2025-05-09", to: "2025-05-16" }
 */
export function lastNDays(days: number): { from: string; to: string } {
  return {
    from: daysAgo(days - 1),
    to: toDateString(),
  };
}

/**
 * Returns a date range object for the full current month,
 * from the 1st to the last day of the month.
 *
 * @returns An object with `from` and `to` date strings (YYYY-MM-DD).
 *
 * @example
 * currentMonth();
 * // { from: "2025-05-01", to: "2025-05-31" }
 */
export function currentMonth(): { from: string; to: string } {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    from: toDateString(firstDay),
    to: toDateString(lastDay),
  };
}

/**
 * Checks whether a given date string represents today.
 *
 * @param date - A date string in YYYY-MM-DD format.
 * @returns True if the date is today, false otherwise.
 *
 * @example
 * isToday("2025-05-16"); // true (if today is 2025-05-16)
 * isToday("2025-05-15"); // false
 */
export function isToday(date: string): boolean {
  return date === toDateString();
}

// ─── Streak Calculation ───────────────────────────────────────────────────────

/**
 * Calculates the current streak, longest streak, and total completions
 * from an array of completed date strings.
 *
 * Dates do not need to be sorted before passing in — this function
 * sorts them internally. Duplicate dates are deduplicated.
 *
 * A "current streak" counts consecutive days ending on today or yesterday.
 * If the most recent log is older than yesterday, the current streak is 0.
 *
 * @param dates - Array of YYYY-MM-DD date strings when the habit was completed.
 * @returns A HabitStreak object with current, longest, and total counts.
 *
 * @example
 * calculateStreak(["2025-05-16", "2025-05-15", "2025-05-14"]);
 * // { current: 3, longest: 3, total: 3 }
 *
 * calculateStreak(["2025-05-16", "2025-05-14"]); // gap on the 15th
 * // { current: 1, longest: 1, total: 2 }
 *
 * calculateStreak([]); // no logs
 * // { current: 0, longest: 0, total: 0 }
 */
export function calculateStreak(dates: string[]): HabitStreak {
  if (dates.length === 0) {
    return { current: 0, longest: 0, total: 0 };
  }

  // Deduplicate and sort descending (most recent first)
  const sorted = [...new Set(dates)].sort((a, b) => (a > b ? -1 : 1));
  const total = sorted.length;

  const today = toDateString();
  const yesterday = daysAgo(1);

  // Current streak: walk backwards from today/yesterday
  // If the most recent date isn't today or yesterday, streak is broken
  let current = 0;
  const mostRecent = sorted[0];

  if (mostRecent === today || mostRecent === yesterday) {
    let cursor = new Date(mostRecent);

    for (const date of sorted) {
      const cursorStr = toDateString(cursor);

      if (date === cursorStr) {
        current++;
        // Move cursor back one day
        cursor.setDate(cursor.getDate() - 1);
      } else {
        // Gap found — streak is broken
        break;
      }
    }
  }

  // Longest streak: walk the full sorted array
  let longest = 0;
  let runLength = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);

    // Check if days are consecutive (prev - curr === 1 day, since descending)
    const diffMs = prev.getTime() - curr.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      runLength++;
    } else {
      longest = Math.max(longest, runLength);
      runLength = 1;
    }
  }

  longest = Math.max(longest, runLength);

  return { current, longest, total };
}

// ─── Log Processing ───────────────────────────────────────────────────────────

/**
 * Converts an array of HabitLog rows into a map keyed by entry_date,
 * for O(1) date lookups when rendering the habit grid.
 *
 * @param logs - Array of HabitLog rows from the database.
 * @returns A Map where keys are YYYY-MM-DD strings and values are HabitLog rows.
 *
 * @example
 * const logMap = buildLogMap(logs);
 * const todayLog = logMap.get("2025-05-16"); // HabitLog | undefined
 */
export function buildLogMap(logs: HabitLog[]): Map<string, HabitLog> {
  return new Map(logs.map((log) => [log.entry_date, log]));
}

/**
 * Generates an array of HabitDayState objects for a range of dates,
 * merging log data into each day. Used to drive the habit grid UI.
 *
 * @param dates - Ordered array of YYYY-MM-DD date strings to generate state for.
 * @param logs - Array of HabitLog rows covering the same date range.
 * @returns An array of HabitDayState objects, one per date.
 *
 * @example
 * const { from, to } = lastNDays(7);
 * const dates = generateDateRange(from, to);
 * const dayStates = buildDayStates(dates, logs);
 */
export function buildDayStates(
  dates: string[],
  logs: HabitLog[]
): HabitDayState[] {
  const logMap = buildLogMap(logs);

  return dates.map((date) => {
    const log = logMap.get(date);
    return {
      date,
      completed: log !== undefined,
      value: log?.value ?? null,
      note: log?.note ?? null,
    };
  });
}

/**
 * Generates an ordered array of YYYY-MM-DD date strings between two dates,
 * inclusive. Used to build the full date axis for the habit grid.
 *
 * @param from - Start date string (YYYY-MM-DD), inclusive.
 * @param to - End date string (YYYY-MM-DD), inclusive.
 * @returns An array of date strings from `from` to `to` ascending.
 *
 * @example
 * generateDateRange("2025-05-14", "2025-05-16");
 * // ["2025-05-14", "2025-05-15", "2025-05-16"]
 */
export function generateDateRange(from: string, to: string): string[] {
  const dates: string[] = [];
  const cursor = new Date(from);
  const end = new Date(to);

  while (cursor <= end) {
    dates.push(toDateString(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}
