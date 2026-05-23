/**
 * @file src/lib/habit/streak.ts
 * @description Streak calculation utilities for the habit tracker.
 *
 * Streaks are calculated by querying all log dates for a habit and walking
 * backwards from the MOST RECENT logged date (not necessarily today).
 *
 * A streak is "current" if the most recent log is from today or yesterday.
 * If the last log was two or more days ago, current_streak is 0 — it's broken.
 *
 * This approach correctly handles out-of-order clicking: a user who fills in
 * May 1–15 in random order will have their streak recalculated correctly on
 * every toggle because we always look at the full set of dates.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

/** Milestone day counts that trigger a celebration banner. */
export const STREAK_MILESTONES = [3, 5, 10, 20, 30, 50, 100] as const;
export type StreakMilestone = (typeof STREAK_MILESTONES)[number];

/**
 * The result of a streak recalculation after a log is upserted.
 */
export interface StreakResult {
  /** Current consecutive-day streak count. */
  currentStreak: number;
  /** All-time longest streak for this habit. */
  longestStreak: number;
  /**
   * Whether today's log extended an active streak.
   * False if the user backdated a log (entry_date !== today).
   */
  streakExtended: boolean;
  /** The milestone hit today, if any. */
  milestone: StreakMilestone | null;
}

/**
 * Returns today's date as YYYY-MM-DD in LOCAL time.
 * Must match the date strings the client sends as entry_date.
 */
function todayUTC(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Returns yesterday's date as YYYY-MM-DD in LOCAL time.
 */
function yesterdayUTC(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Calculates current and longest streaks from a sorted set of date strings.
 *
 * A streak is "current" only if the most recent logged date is today or
 * yesterday. If it's older, current_streak is 0.
 *
 * Walks backwards from the most recent date, counting consecutive days.
 * A separate ascending pass finds the longest ever run.
 *
 * @param sortedDates - Unique date strings in YYYY-MM-DD format, newest first.
 * @returns An object with currentStreak and longestStreak counts.
 */
function calculateStreaks(sortedDates: string[]): {
  currentStreak: number;
  longestStreak: number;
} {
  if (sortedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const today     = todayUTC();
  const yesterday = yesterdayUTC();
  const mostRecent = sortedDates[0];

  // ── Longest streak — full ascending pass ──────────────────────────────────
  const ascending = [...sortedDates].reverse();
  let longestStreak = 0;
  let runLength     = 0;
  let prevDate: Date | null = null;

  for (const dateStr of ascending) {
    const d = new Date(dateStr + "T00:00:00");
    if (prevDate === null) {
      runLength = 1;
    } else {
      const diffDays = (d.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
      runLength = diffDays === 1 ? runLength + 1 : 1;
    }
    if (runLength > longestStreak) longestStreak = runLength;
    prevDate = d;
  }

  // ── Current streak ────────────────────────────────────────────────────────
  // Start walking back from today (not mostRecent) so future-dated logs
  // (caused by timezone offset) don't break the "is this current?" check.
  // The streak is live if today or yesterday appears in the log set.
  let currentStreak = 0;
  const loggedSet = new Set(sortedDates);

  if (loggedSet.has(today) || loggedSet.has(yesterday)) {
    // Walk back from today counting consecutive days
    const cursor = new Date(today + "T00:00:00");
    while (true) {
      const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`;
      if (loggedSet.has(key)) {
        currentStreak++;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
  }

  return { currentStreak, longestStreak };
}

/**
 * Recalculates and persists the streak for a habit after a log is upserted.
 *
 * Steps:
 * 1. Fetch all distinct log dates for the habit (newest first).
 * 2. Calculate current and longest streaks via calculateStreaks().
 * 3. Persist the results to habits.current_streak / longest_streak.
 * 4. Return streak data including any milestone hit, so the client
 *    can show a celebration banner.
 *
 * @param supabase    - An authenticated Supabase client.
 * @param habitId     - The UUID of the habit to recalculate.
 * @param userId      - The UUID of the owning user (RLS safety).
 * @param entryDate   - The date that was just logged (YYYY-MM-DD).
 * @returns A StreakResult describing the new streak state.
 */
export async function recalculateStreak(
  supabase: SupabaseClient,
  habitId: string,
  userId: string,
  entryDate: string
): Promise<StreakResult> {
  // ── 1. Fetch all logged dates ─────────────────────────────────────────────
  const { data: logRows, error: logError } = await supabase
    .from("habit_logs")
    .select("entry_date")
    .eq("habit_id", habitId)
    .eq("user_id", userId)
    .order("entry_date", { ascending: false });

    console.log('[streak] logRows:', JSON.stringify(logRows?.slice(0, 3)), 'logError:', JSON.stringify(logError));

  if (logError || !logRows) {
    console.warn("[streak] Could not fetch logs:", logError?.message);
    return { currentStreak: 0, longestStreak: 0, streakExtended: false, milestone: null };
  }

  // Deduplicate (upsert means there should only be one per date, but be safe)
  const sortedDates = Array.from(
    new Set(logRows.map((r) => r.entry_date as string))
  );
  console.log('[streak] sortedDates[0..4]:', sortedDates.slice(0, 5));
  console.log('[streak] today:', todayUTC(), 'yesterday:', yesterdayUTC());
  // logRows is already newest-first from Supabase; Set preserves insertion order
  // so sortedDates[0] is the most recent date.

  // ── 2. Calculate streaks ──────────────────────────────────────────────────
  const { currentStreak, longestStreak } = calculateStreaks(sortedDates);

  // ── 3. Persist to habits table ────────────────────────────────────────────
  // current_streak and last_logged_date always update.
  // longest_streak only updates if the new value beats what's stored.
  const { error: updateError } = await supabase
    .from("habits")
    .update({
      current_streak: currentStreak,
      last_logged_date: entryDate,
    })
    .eq("id", habitId)
    .eq("user_id", userId);

  if (updateError) {
    console.warn("[streak] Could not persist streak:", updateError.message);
  }

  // Separate update for longest_streak so the .lt() guard only affects it.
  await supabase
    .from("habits")
    .update({ longest_streak: longestStreak })
    .eq("id", habitId)
    .eq("user_id", userId)
    .lt("longest_streak", longestStreak);

  // ── 4. Determine whether this log extended an active streak ───────────────
  // Only celebrate if the user logged TODAY (not backdating).
  const today = todayUTC();
  const streakExtended = currentStreak >= 2;

  // ── 5. Check for a milestone hit ──────────────────────────────────────────
  // We check if currentStreak exactly matches a milestone value.
  const milestone = streakExtended
    ? (STREAK_MILESTONES.find((m) => m === currentStreak) ?? null)
    : null;

  return { currentStreak, longestStreak, streakExtended, milestone };
}

/**
 * Recalculates and persists the streak for a habit after a log is deleted.
 *
 * Longest streak is preserved — it's a historical record.
 * Current streak is recalculated from the remaining logs.
 *
 * @param supabase    - An authenticated Supabase client.
 * @param habitId     - The UUID of the habit to update.
 * @param userId      - The UUID of the owning user.
 * @param deletedDate - The date that was just un-logged (YYYY-MM-DD).
 */
export async function recalculateStreakAfterDelete(
  supabase: SupabaseClient,
  habitId: string,
  userId: string,
  deletedDate: string
): Promise<void> {
  const { data: logRows } = await supabase
    .from("habit_logs")
    .select("entry_date")
    .eq("habit_id", habitId)
    .eq("user_id", userId)
    .order("entry_date", { ascending: false });

  if (!logRows || logRows.length === 0) {
    await supabase
      .from("habits")
      .update({ current_streak: 0, last_logged_date: null })
      .eq("id", habitId)
      .eq("user_id", userId);
    return;
  }

  const sortedDates = Array.from(
    new Set(logRows.map((r) => r.entry_date as string))
  );

  // Only recalculate current_streak — longest_streak is a historical
  // high water mark and must never decrease, so we don't touch it here.
  const { currentStreak } = calculateStreaks(sortedDates);
  const lastLoggedDate = sortedDates[0] ?? null;

  const { error: updateError } = await supabase
    .from("habits")
    .update({
      current_streak: currentStreak,
      last_logged_date: lastLoggedDate,
      // longest_streak intentionally omitted
    })
    .eq("id", habitId)
    .eq("user_id", userId);

  if (updateError) {
    console.warn("[streak] Could not persist streak after delete:", updateError.message);
  }
}