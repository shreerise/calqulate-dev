import { describe, it, expect } from "vitest";
import { computeNextDoseMs, isDoseReminderDue, describeDueIn } from "../reminders";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

describe("computeNextDoseMs", () => {
  it("uses start date when no dose is logged yet", () => {
    const startMs = Date.parse("2026-06-01T09:00:00.000Z");
    expect(computeNextDoseMs({ startMs, intervalMs: WEEK, lastDoseMs: null })).toBe(startMs);
  });

  it("is last dose + interval once a dose exists", () => {
    const last = Date.parse("2026-06-08T09:00:00.000Z");
    expect(computeNextDoseMs({ startMs: 0, intervalMs: WEEK, lastDoseMs: last })).toBe(last + WEEK);
  });
});

describe("isDoseReminderDue", () => {
  const next = Date.parse("2026-06-15T09:00:00.000Z");

  it("fires within the lead/grace window when not previously fired", () => {
    expect(isDoseReminderDue({ nextDoseMs: next, leadMs: 30 * 60_000, nowMs: next, lastFiredMs: null })).toBe(true);
  });

  it("fires up to lead-minutes early", () => {
    const now = next - 25 * 60_000;
    expect(isDoseReminderDue({ nextDoseMs: next, leadMs: 30 * 60_000, nowMs: now, lastFiredMs: null })).toBe(true);
  });

  it("does NOT fire before the lead window opens", () => {
    const now = next - 2 * HOUR;
    expect(isDoseReminderDue({ nextDoseMs: next, leadMs: 30 * 60_000, nowMs: now, lastFiredMs: null })).toBe(false);
  });

  it("does NOT fire long after the grace window closes", () => {
    const now = next + 6 * HOUR;
    expect(isDoseReminderDue({ nextDoseMs: next, leadMs: 0, nowMs: now, lastFiredMs: null })).toBe(false);
  });

  it("de-duplicates: won't re-fire for the same due dose", () => {
    const firstNow = next; // fires
    expect(isDoseReminderDue({ nextDoseMs: next, leadMs: 0, nowMs: firstNow, lastFiredMs: null })).toBe(true);
    // an hour later, same nextDose, lastFired = firstNow → already fired
    expect(
      isDoseReminderDue({ nextDoseMs: next, leadMs: 0, nowMs: next + HOUR, lastFiredMs: firstNow }),
    ).toBe(false);
  });

  it("becomes eligible again for the NEXT dose after the user logs one", () => {
    const firedFor = next;
    const nextWeek = next + WEEK; // user logged the dose → due jumps forward
    expect(
      isDoseReminderDue({ nextDoseMs: nextWeek, leadMs: 0, nowMs: nextWeek, lastFiredMs: firedFor }),
    ).toBe(true);
  });
});

describe("describeDueIn", () => {
  it("phrases upcoming and overdue", () => {
    const now = Date.parse("2026-06-15T09:00:00.000Z");
    expect(describeDueIn(now + 2 * DAY, now)).toMatch(/due in 2 days/);
    expect(describeDueIn(now - 3 * HOUR, now)).toMatch(/overdue by 3 h/);
    expect(describeDueIn(now + 20 * 60_000, now)).toMatch(/due in 20 min/);
  });
});
