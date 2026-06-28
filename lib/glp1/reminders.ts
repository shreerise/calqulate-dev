/**
 * GLP-1 dose-reminder scheduling — pure & deterministic (unit-testable, mobile-reusable).
 *
 * The next dose time is COMPUTED from the medication's start date, dose interval,
 * and the user's most recent logged dose — never a stored schedule that can drift.
 * De-duplication is handled by comparing the reminder's `lastFiredAt` to the
 * current due-window, so each due dose fires exactly once even on a frequent cron.
 */

export interface NextDoseArgs {
  /** ISO date/datetime the medication started (anchor when no dose is logged yet). */
  startMs: number;
  /** Dose cadence in ms (weekly = 7*24*3600*1000). */
  intervalMs: number;
  /** Most recent (non-skipped) dose time in ms, or null if none logged. */
  lastDoseMs: number | null;
}

/**
 * The next expected dose time. After a dose is logged it's lastDose + interval;
 * before the first dose it's the medication's start date (so a "take your first
 * dose" reminder still works).
 */
export function computeNextDoseMs({ startMs, intervalMs, lastDoseMs }: NextDoseArgs): number {
  if (lastDoseMs == null) return startMs;
  return lastDoseMs + intervalMs;
}

export interface DueArgs {
  nextDoseMs: number;
  /** Minutes before the due time to notify. */
  leadMs: number;
  nowMs: number;
  /** When this reminder last fired (ms), or null. */
  lastFiredMs: number | null;
  /** How long after the window opens we'll still fire (covers the cron cadence). Default 2h. */
  graceMs?: number;
}

/**
 * Whether a dose reminder should fire right now. True only when:
 *   • now is within [due − lead, due + grace], AND
 *   • it hasn't already fired for THIS due window (lastFired predates the window).
 * Once the user logs the dose, `nextDoseMs` jumps forward by one interval and the
 * reminder becomes eligible again for the following dose.
 */
export function isDoseReminderDue({
  nextDoseMs,
  leadMs,
  nowMs,
  lastFiredMs,
  graceMs = 2 * 60 * 60 * 1000,
}: DueArgs): boolean {
  const windowStart = nextDoseMs - leadMs;
  const windowEnd = nextDoseMs + graceMs;
  const inWindow = nowMs >= windowStart && nowMs <= windowEnd;
  const notAlreadyFired = lastFiredMs == null || lastFiredMs < windowStart;
  return inWindow && notAlreadyFired;
}

/** Human-friendly relative phrasing for the reminder card / notification body. */
export function describeDueIn(nextDoseMs: number, nowMs: number): string {
  const diff = nextDoseMs - nowMs;
  const abs = Math.abs(diff);
  const h = Math.round(abs / 3_600_000);
  if (abs < 3_600_000) {
    const m = Math.max(1, Math.round(abs / 60_000));
    return diff >= 0 ? `due in ${m} min` : `overdue by ${m} min`;
  }
  if (h < 48) return diff >= 0 ? `due in ${h} h` : `overdue by ${h} h`;
  const d = Math.round(h / 24);
  return diff >= 0 ? `due in ${d} days` : `overdue by ${d} days`;
}
