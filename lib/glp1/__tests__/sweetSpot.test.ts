import { describe, it, expect } from "vitest";
import { doseSweetSpot, MIN_LEVEL_WEEKS } from "../sweetSpot";

const DAY = 24 * 3_600_000;
const WEEK = 7 * DAY;
const T0 = Date.parse("2026-01-01T00:00:00Z");
const iso = (ms: number) => new Date(ms).toISOString();

describe("doseSweetSpot", () => {
  it("is 'insufficient' with no qualifying data", () => {
    const r = doseSweetSpot({ doses: [], weights: [], nowMs: T0 + WEEK });
    expect(r.confidence).toBe("insufficient");
    expect(r.sweetSpot).toBeNull();
    expect(r.message).toMatch(/two different dose levels/i);
  });

  it("picks the dose with the best loss-per-side-effect balance", () => {
    // Level A: 0.5 mg for weeks 0–6, steady ~0.5 kg/wk loss, low side effects.
    // Level B: 1.0 mg for weeks 6–12, faster loss (~0.7 kg/wk) but heavy side effects.
    const doses = [
      { takenAt: iso(T0), amountMg: 0.5 },
      { takenAt: iso(T0 + 6 * WEEK), amountMg: 1.0 },
    ];
    const weights = [
      { takenAt: iso(T0), weightKg: 100 },
      { takenAt: iso(T0 + 6 * WEEK), weightKg: 97 }, // -3 kg over 6 wk = 0.5/wk
      { takenAt: iso(T0 + 12 * WEEK), weightKg: 92.8 }, // -4.2 kg over 6 wk = 0.7/wk
    ];
    const sideEffects = [
      { loggedAt: iso(T0 + 1 * WEEK), noSymptoms: true, severity: null }, // 0
      { loggedAt: iso(T0 + 3 * WEEK), noSymptoms: false, severity: 1 },
      { loggedAt: iso(T0 + 7 * WEEK), noSymptoms: false, severity: 4 },
      { loggedAt: iso(T0 + 9 * WEEK), noSymptoms: false, severity: 5 },
    ];
    const r = doseSweetSpot({ doses, weights, sideEffects, nowMs: T0 + 12 * WEEK });

    expect(r.basis).toBe("weight");
    expect(r.sweetSpot).not.toBeNull();
    // 0.5 mg: 0.5/(1+0.5)=0.33 ; 1.0 mg: 0.7/(1+4.5)=0.127 → 0.5 mg wins.
    expect(r.sweetSpot!.amountMg).toBe(0.5);
    expect(r.confidence).toBe("medium");
  });

  it("uses fat loss as the basis when body-composition data exists", () => {
    const doses = [
      { takenAt: iso(T0), amountMg: 0.5 },
      { takenAt: iso(T0 + 6 * WEEK), amountMg: 1.0 },
    ];
    const weights = [
      { takenAt: iso(T0), weightKg: 100 },
      { takenAt: iso(T0 + 12 * WEEK), weightKg: 92 },
    ];
    const bodyComps = [
      { takenAt: iso(T0), weightKg: 100, bodyFatPct: 30 }, // fat 30
      { takenAt: iso(T0 + 6 * WEEK), weightKg: 96, bodyFatPct: 27 }, // fat 25.92
      { takenAt: iso(T0 + 12 * WEEK), weightKg: 92, bodyFatPct: 25 }, // fat 23
    ];
    const r = doseSweetSpot({ doses, weights, bodyComps, nowMs: T0 + 12 * WEEK });
    expect(r.basis).toBe("fat");
    expect(r.sweetSpot).not.toBeNull();
    expect(r.sweetSpot!.fatLossKgPerWeek).not.toBeNull();
  });

  it("ignores levels with too little coverage", () => {
    const doses = [
      { takenAt: iso(T0), amountMg: 0.5 },
      { takenAt: iso(T0 + (MIN_LEVEL_WEEKS - 1) * WEEK), amountMg: 1.0 }, // <2 wk on 1.0
    ];
    const weights = [
      { takenAt: iso(T0), weightKg: 100 },
      { takenAt: iso(T0 + (MIN_LEVEL_WEEKS - 1) * WEEK), weightKg: 99 },
    ];
    const r = doseSweetSpot({ doses, weights, nowMs: T0 + (MIN_LEVEL_WEEKS - 1) * WEEK + DAY });
    // Only the 0.5 mg level can possibly qualify; the 1.0 mg run is too short / no loss.
    expect(r.sweetSpot?.amountMg === 1.0).toBe(false);
  });

  it("does not fabricate loss outside the logged weight range", () => {
    // Dose started long before any weight was logged; only weeks 8–12 have weights.
    const doses = [{ takenAt: iso(T0), amountMg: 1.0 }];
    const weights = [
      { takenAt: iso(T0 + 8 * WEEK), weightKg: 95 },
      { takenAt: iso(T0 + 12 * WEEK), weightKg: 93 }, // -2 kg over 4 wk = 0.5/wk
    ];
    const r = doseSweetSpot({ doses, weights, nowMs: T0 + 12 * WEEK });
    const lvl = r.levels.find((l) => l.amountMg === 1.0)!;
    // weeks should reflect only the covered 4-week window, not the full 12.
    expect(lvl.weeks).toBeCloseTo(4, 0);
    expect(lvl.weightLossKgPerWeek).toBeCloseTo(0.5, 1);
  });
});
