/**
 * Refill / supply tracking — pure math, no API (Phase 3).
 *
 * From the last fill (date + doses supplied) and the medication cadence, works out
 * how many doses are left and when to refill — so users get ahead of a gap instead
 * of running out. No competitor tracks refills/cost at all.
 *
 * Deterministic & unit-testable, reusable by future mobile clients.
 */

const DAY_MS = 24 * 3_600_000;

export interface RefillStatusArgs {
  /** When the prescription was last filled (ms). */
  filledAtMs: number;
  /** Number of doses the fill contains. */
  dosesSupplied: number;
  /** Dose cadence in hours (weekly = 168). */
  doseIntervalHours: number;
  nowMs: number;
}

export type RefillState = "ok" | "soon" | "overdue";

export interface RefillStatus {
  /** Doses still available (never negative). */
  dosesRemaining: number;
  /** Whole days of supply left at the prescribed cadence. */
  daysRemaining: number;
  /** When the supply is projected to run out (ms). */
  runsOutAtMs: number;
  state: RefillState;
}

/** Total days a fill covers at the prescribed cadence. */
export function daysOfSupply(dosesSupplied: number, doseIntervalHours: number): number {
  return Math.round((dosesSupplied * doseIntervalHours) / 24);
}

/**
 * Project remaining supply from elapsed time since the fill (assumes the user
 * takes doses on cadence). `soon` is within 7 days of running out.
 */
export function refillStatus({ filledAtMs, dosesSupplied, doseIntervalHours, nowMs }: RefillStatusArgs): RefillStatus {
  const intervalMs = doseIntervalHours * 3_600_000;
  const elapsed = Math.max(0, nowMs - filledAtMs);
  const dosesUsed = Math.floor(elapsed / intervalMs);
  const dosesRemaining = Math.max(0, dosesSupplied - dosesUsed);
  const runsOutAtMs = filledAtMs + dosesSupplied * intervalMs;
  const daysRemaining = Math.max(0, Math.round((runsOutAtMs - nowMs) / DAY_MS));

  const state: RefillState = runsOutAtMs <= nowMs ? "overdue" : daysRemaining <= 7 ? "soon" : "ok";
  return { dosesRemaining, daysRemaining, runsOutAtMs, state };
}
