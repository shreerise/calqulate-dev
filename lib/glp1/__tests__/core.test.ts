import { describe, it, expect } from "vitest";
import {
  drugLevelAt,
  drugLevelCurve,
  currentLevelStatus,
  PK_PARAMS,
} from "../pk";
import {
  bodyComp,
  bodyCompChange,
  estimateBodyFatPct,
  LEAN_LOSS_THRESHOLDS,
} from "../bodyComposition";
import {
  proteinTarget,
  fiberTargetG,
  caloriesFromMacros,
  sumDailyNutrition,
} from "../nutrition";
import {
  doseLogInput,
  sideEffectInput,
  weightLogInput,
} from "../schemas";

const WEEK_MS = 7 * 24 * 3_600_000;
const weeklyDoses = (n: number, amt = 1) =>
  Array.from({ length: n }, (_, i) => ({
    takenAt: new Date(i * WEEK_MS).toISOString(),
    amountMg: amt,
  }));

describe("PK model", () => {
  it("is zero before any dose and positive after", () => {
    const doses = weeklyDoses(1);
    expect(drugLevelAt(doses, -3_600_000, "semaglutide")).toBe(0);
    expect(drugLevelAt(doses, 24 * 3_600_000, "semaglutide")).toBeGreaterThan(0);
  });

  it("accumulates toward steady state across weekly doses", () => {
    const peakAfter = (n: number) =>
      drugLevelAt(weeklyDoses(n), (n - 1) * WEEK_MS + 24 * 3_600_000, "semaglutide");
    expect(peakAfter(4)).toBeGreaterThan(peakAfter(2));
    expect(peakAfter(2)).toBeGreaterThan(peakAfter(1));
  });

  it("falls between doses (trough < peak) — the 'cravings return' signal", () => {
    const doses = weeklyDoses(4);
    const lastMs = 3 * WEEK_MS;
    const nearPeak = drugLevelAt(doses, lastMs + 24 * 3_600_000, "semaglutide");
    const trough = drugLevelAt(doses, lastMs + WEEK_MS - 3_600_000, "semaglutide");
    expect(trough).toBeLessThan(nearPeak);
    expect(trough).toBeGreaterThan(0);
  });

  it("normalises the curve to a 0–100 peak", () => {
    const doses = weeklyDoses(4);
    const curve = drugLevelCurve(doses, "semaglutide", { fromMs: 0, toMs: 4 * WEEK_MS });
    const maxPct = Math.max(...curve.map((p) => p.levelPct));
    expect(maxPct).toBeCloseTo(100, 0);
    expect(Math.min(...curve.map((p) => p.levelPct))).toBeGreaterThanOrEqual(0);
  });

  it("currentLevelStatus returns 0 with no doses", () => {
    expect(currentLevelStatus([], "tirzepatide", Date.now())).toEqual({
      currentPct: 0,
      nextDosePct: null,
    });
  });

  it("tirzepatide eliminates faster than semaglutide (shorter half-life)", () => {
    expect(PK_PARAMS.tirzepatide.eliminationHalfLifeH).toBeLessThan(
      PK_PARAMS.semaglutide.eliminationHalfLifeH,
    );
  });
});

describe("Body composition", () => {
  it("splits weight into fat + lean that sum back to weight", () => {
    const p = bodyComp(100, 40);
    expect(p.fatMassKg).toBe(40);
    expect(p.leanMassKg).toBe(60);
    expect(p.fatMassKg + p.leanMassKg).toBeCloseTo(p.weightKg, 5);
  });

  it("flags 'ok' when loss is mostly fat", () => {
    const change = bodyCompChange(bodyComp(100, 40), bodyComp(92, 35));
    expect(change.level).toBe("ok");
    expect(change.leanLossPct).toBeLessThan(LEAN_LOSS_THRESHOLDS.watch * 100);
  });

  it("flags 'high' when too much loss is lean mass", () => {
    const change = bodyCompChange(bodyComp(100, 40), bodyComp(92, 40.5));
    expect(change.level).toBe("high");
    expect(change.leanLossPct).toBeGreaterThan(LEAN_LOSS_THRESHOLDS.high * 100);
  });

  it("returns 'ok' with a neutral message when there is no net loss", () => {
    const change = bodyCompChange(bodyComp(90, 30), bodyComp(92, 30));
    expect(change.level).toBe("ok");
    expect(change.weightLostKg).toBeLessThanOrEqual(0);
  });

  it("estimates body fat from circumferences (Navy) for both sexes", () => {
    const male = estimateBodyFatPct({ sex: "male", heightCm: 180, neckCm: 38, waistCm: 90 });
    const female = estimateBodyFatPct({ sex: "female", heightCm: 165, neckCm: 32, waistCm: 75, hipCm: 100 });
    expect(male).toBeGreaterThan(5);
    expect(male).toBeLessThan(40);
    expect(female).toBeGreaterThan(15);
    expect(female).toBeLessThan(50);
  });

  it("returns null when required female hip is missing", () => {
    expect(estimateBodyFatPct({ sex: "female", heightCm: 165, neckCm: 32, waistCm: 75 })).toBeNull();
  });
});

describe("Nutrition", () => {
  it("protein target uses 1.2–1.6 g/kg", () => {
    const t = proteinTarget(80);
    expect(t.minG).toBe(96);
    expect(t.maxG).toBe(128);
  });

  it("protein target lean-adjusts at high body fat", () => {
    const lean = proteinTarget(120, 45);
    const naive = proteinTarget(120);
    expect(lean.maxG).toBeLessThan(naive.maxG);
  });

  it("fiber scales with calories and floors to guidance", () => {
    expect(fiberTargetG(2000).minG).toBeGreaterThanOrEqual(25);
    expect(fiberTargetG().maxG).toBeGreaterThan(0);
  });

  it("calories from macros uses 4/4/9", () => {
    expect(caloriesFromMacros(50, 100, 30)).toBe(50 * 4 + 100 * 4 + 30 * 9);
  });

  it("sums a day's food logs, treating missing fields as 0", () => {
    const totals = sumDailyNutrition([
      { proteinG: 30, fiberG: 5, calories: 300 },
      { proteinG: 20, fiberG: 8, calories: null, carbsG: 40 },
    ]);
    expect(totals.proteinG).toBe(50);
    expect(totals.fiberG).toBe(13);
    expect(totals.calories).toBe(300);
    expect(totals.carbsG).toBe(40);
  });
});

describe("Validation schemas", () => {
  it("accepts a valid dose log", () => {
    const r = doseLogInput.safeParse({
      medicationId: "11111111-1111-1111-1111-111111111111",
      takenAt: new Date().toISOString(),
      amountMg: 0.5,
    });
    expect(r.success).toBe(true);
  });

  it("rejects a non-positive weight", () => {
    expect(weightLogInput.safeParse({ takenAt: new Date().toISOString(), weightKg: 0 }).success).toBe(false);
  });

  it("lets users log ABSENCE of symptoms, but requires a type otherwise", () => {
    const none = sideEffectInput.safeParse({ loggedAt: new Date().toISOString(), noSymptoms: true });
    expect(none.success).toBe(true);
    const bad = sideEffectInput.safeParse({ loggedAt: new Date().toISOString(), noSymptoms: false });
    expect(bad.success).toBe(false);
  });
});
