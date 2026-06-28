import { describe, it, expect } from "vitest";
import { benchmark, expectedLossPct, TRIAL_CURVES, ON_TRACK_BAND } from "../benchmark";

describe("expectedLossPct", () => {
  it("returns endpoints exactly", () => {
    expect(expectedLossPct("semaglutide", 0)).toBe(0);
    expect(expectedLossPct("semaglutide", 68)).toBe(14.9);
  });

  it("clamps beyond the last point", () => {
    expect(expectedLossPct("semaglutide", 200)).toBe(14.9);
  });

  it("interpolates between control points", () => {
    // semaglutide wk 6 sits between wk4(2%) and wk8(4%) → ~3%
    expect(expectedLossPct("semaglutide", 6)).toBeCloseTo(3, 1);
  });

  it("monotonically increases over time", () => {
    let prev = -1;
    for (let w = 0; w <= 72; w += 4) {
      const v = expectedLossPct("tirzepatide", w);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });
});

describe("benchmark", () => {
  it("flags 'early' before 4 weeks regardless of loss", () => {
    const r = benchmark({ compound: "semaglutide", baselineKg: 100, currentKg: 97, weeks: 2 });
    expect(r.status).toBe("early");
  });

  it("is 'on-track' when actual ≈ trial average", () => {
    // wk 28 semaglutide expects ~11% → 100kg → 89kg
    const r = benchmark({ compound: "semaglutide", baselineKg: 100, currentKg: 89, weeks: 28 });
    expect(r.status).toBe("on-track");
    expect(Math.abs(r.deltaPct)).toBeLessThan(ON_TRACK_BAND);
  });

  it("is 'ahead' when losing faster than the trial", () => {
    const r = benchmark({ compound: "semaglutide", baselineKg: 100, currentKg: 82, weeks: 28 });
    expect(r.status).toBe("ahead");
    expect(r.deltaPct).toBeGreaterThan(0);
  });

  it("is 'behind' when losing slower than the trial", () => {
    const r = benchmark({ compound: "semaglutide", baselineKg: 100, currentKg: 97, weeks: 28 });
    expect(r.status).toBe("behind");
    expect(r.deltaPct).toBeLessThan(0);
  });

  it("computes actual % from baseline", () => {
    const r = benchmark({ compound: "tirzepatide", baselineKg: 110, currentKg: 99, weeks: 24 });
    expect(r.actualPct).toBeCloseTo(10, 1);
    expect(r.trial).toBe(TRIAL_CURVES.tirzepatide.trial);
  });
});
