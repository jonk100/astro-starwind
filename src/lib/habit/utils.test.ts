/**
 * @file src/lib/habit/utils.test.ts
 * @description Unit tests for habit utility functions.
 *
 * Run with: pnpm test
 * Requires vitest in your project:
 *   pnpm add -D vitest
 *   Add "test": "vitest" to package.json scripts.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  toDateString,
  daysAgo,
  lastNDays,
  isToday,
  calculateStreak,
  buildLogMap,
  buildDayStates,
  generateDateRange,
} from "./utils";
import type { HabitLog } from "./types";

// ─── Mock Date ────────────────────────────────────────────────────────────────

// Pin "today" to a fixed date so tests don't drift over time
const MOCK_TODAY = "2025-05-16";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(MOCK_TODAY));
});

afterEach(() => {
  vi.useRealTimers();
});

// ─── Date Helpers ─────────────────────────────────────────────────────────────

describe("toDateString", () => {
  it("returns today in YYYY-MM-DD format", () => {
    expect(toDateString()).toBe(MOCK_TODAY);
  });

  it("formats a specific date correctly", () => {
    expect(toDateString(new Date("2025-01-01"))).toBe("2025-01-01");
  });
});

describe("daysAgo", () => {
  it("returns yesterday for daysAgo(1)", () => {
    expect(daysAgo(1)).toBe("2025-05-15");
  });

  it("returns correct date for daysAgo(7)", () => {
    expect(daysAgo(7)).toBe("2025-05-09");
  });

  it("returns today for daysAgo(0)", () => {
    expect(daysAgo(0)).toBe(MOCK_TODAY);
  });
});

describe("lastNDays", () => {
  it("returns a range ending today", () => {
    const { from, to } = lastNDays(7);
    expect(to).toBe(MOCK_TODAY);
    expect(from).toBe("2025-05-10");
  });

  it("returns a single day range for lastNDays(1)", () => {
    const { from, to } = lastNDays(1);
    expect(from).toBe(MOCK_TODAY);
    expect(to).toBe(MOCK_TODAY);
  });
});

describe("isToday", () => {
  it("returns true for today", () => {
    expect(isToday(MOCK_TODAY)).toBe(true);
  });

  it("returns false for yesterday", () => {
    expect(isToday("2025-05-15")).toBe(false);
  });
});

// ─── Streak Calculation ───────────────────────────────────────────────────────

describe("calculateStreak", () => {
  it("returns zeros for empty input", () => {
    expect(calculateStreak([])).toEqual({ current: 0, longest: 0, total: 0 });
  });

  it("returns streak of 1 for only today", () => {
    expect(calculateStreak([MOCK_TODAY])).toEqual({
      current: 1,
      longest: 1,
      total: 1,
    });
  });

  it("counts a consecutive streak ending today", () => {
    const dates = ["2025-05-16", "2025-05-15", "2025-05-14"];
    expect(calculateStreak(dates)).toEqual({
      current: 3,
      longest: 3,
      total: 3,
    });
  });

  it("counts a consecutive streak ending yesterday", () => {
    const dates = ["2025-05-15", "2025-05-14", "2025-05-13"];
    expect(calculateStreak(dates)).toEqual({
      current: 3,
      longest: 3,
      total: 3,
    });
  });

  it("returns current streak of 0 when most recent is older than yesterday", () => {
    const dates = ["2025-05-14", "2025-05-13"];
    const result = calculateStreak(dates);
    expect(result.current).toBe(0);
    expect(result.total).toBe(2);
  });

  it("handles a gap in the middle correctly", () => {
    // Gap on 05-15: current streak is 1 (only today), longest is 2
    const dates = ["2025-05-16", "2025-05-13", "2025-05-12"];
    const result = calculateStreak(dates);
    expect(result.current).toBe(1);
    expect(result.longest).toBe(2);
    expect(result.total).toBe(3);
  });

  it("deduplicates dates before calculating", () => {
    const dates = ["2025-05-16", "2025-05-16", "2025-05-15"];
    expect(calculateStreak(dates)).toEqual({
      current: 2,
      longest: 2,
      total: 2,
    });
  });

  it("handles unsorted input", () => {
    const dates = ["2025-05-14", "2025-05-16", "2025-05-15"];
    expect(calculateStreak(dates)).toEqual({
      current: 3,
      longest: 3,
      total: 3,
    });
  });

  it("correctly identifies longest streak across multiple runs", () => {
    const dates = [
      "2025-05-16",
      "2025-05-15",
      // gap
      "2025-05-10",
      "2025-05-09",
      "2025-05-08",
      "2025-05-07",
    ];
    const result = calculateStreak(dates);
    expect(result.current).toBe(2);
    expect(result.longest).toBe(4);
    expect(result.total).toBe(6);
  });
});

// ─── Log Processing ───────────────────────────────────────────────────────────

/** Creates a minimal HabitLog stub for testing */
function makeLog(entry_date: string, overrides: Partial<HabitLog> = {}): HabitLog {
  return {
    id: crypto.randomUUID(),
    habit_id: "habit-1",
    user_id: "user-1",
    entry_date,
    value: null,
    note: null,
    updated_at: null,
    ...overrides,
  };
}

describe("buildLogMap", () => {
  it("returns an empty map for no logs", () => {
    expect(buildLogMap([]).size).toBe(0);
  });

  it("keys logs by entry_date", () => {
    const log = makeLog("2025-05-16");
    const map = buildLogMap([log]);
    expect(map.get("2025-05-16")).toEqual(log);
  });

  it("handles multiple logs", () => {
    const logs = [makeLog("2025-05-16"), makeLog("2025-05-15")];
    const map = buildLogMap(logs);
    expect(map.size).toBe(2);
    expect(map.get("2025-05-15")).toBeDefined();
  });
});

describe("buildDayStates", () => {
  it("marks completed days correctly", () => {
    const logs = [makeLog("2025-05-16", { value: 1 })];
    const states = buildDayStates(["2025-05-16", "2025-05-15"], logs);

    expect(states[0].completed).toBe(true);
    expect(states[0].value).toBe(1);
    expect(states[1].completed).toBe(false);
    expect(states[1].value).toBeNull();
  });

  it("preserves note from log", () => {
    const logs = [makeLog("2025-05-16", { note: "Great day" })];
    const states = buildDayStates(["2025-05-16"], logs);
    expect(states[0].note).toBe("Great day");
  });
});

describe("generateDateRange", () => {
  it("generates a range of dates inclusive", () => {
    const range = generateDateRange("2025-05-14", "2025-05-16");
    expect(range).toEqual(["2025-05-14", "2025-05-15", "2025-05-16"]);
  });

  it("returns a single date for same from and to", () => {
    const range = generateDateRange("2025-05-16", "2025-05-16");
    expect(range).toEqual(["2025-05-16"]);
  });
});
