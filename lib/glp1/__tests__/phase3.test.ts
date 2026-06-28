import { describe, it, expect } from "vitest";
import { reconstitution } from "../reconstitution";
import { daysOfSupply, refillStatus } from "../refill";
import { estimateFromText } from "../foodParser";

const DAY = 24 * 3_600_000;

describe("reconstitution", () => {
  it("computes draw units on a U-100 syringe", () => {
    // 5 mg in 2 mL = 2.5 mg/mL; 0.25 mg dose → 0.1 mL → 10 units
    const r = reconstitution({ vialMg: 5, bacWaterMl: 2, doseMg: 0.25 })!;
    expect(r.concentrationMgPerMl).toBe(2.5);
    expect(r.drawMl).toBe(0.1);
    expect(r.drawUnits).toBe(10);
    expect(r.drawUnitsRounded).toBe(10);
    expect(r.dosesPerVial).toBe(20);
  });

  it("returns null on non-positive input", () => {
    expect(reconstitution({ vialMg: 0, bacWaterMl: 2, doseMg: 0.25 })).toBeNull();
    expect(reconstitution({ vialMg: 5, bacWaterMl: 2, doseMg: -1 })).toBeNull();
  });

  it("warns when a dose exceeds one syringe", () => {
    // 2 mg in 1 mL = 2 mg/mL; 3 mg dose → 1.5 mL → 150 units > 100
    const r = reconstitution({ vialMg: 2, bacWaterMl: 1, doseMg: 3 })!;
    expect(r.drawUnits).toBeGreaterThan(100);
    expect(r.warnings.some((w) => /more than one/i.test(w))).toBe(true);
  });
});

describe("refill supply", () => {
  it("days of supply scales with doses × interval", () => {
    expect(daysOfSupply(4, 168)).toBe(28); // 4 weekly doses
  });

  it("projects remaining supply and flags states", () => {
    const filledAtMs = Date.parse("2026-06-01T00:00:00.000Z");
    const interval = 168;
    // 1 week in: 3 of 4 doses remain, ~21 days left → ok
    const ok = refillStatus({ filledAtMs, dosesSupplied: 4, doseIntervalHours: interval, nowMs: filledAtMs + 7 * DAY });
    expect(ok.dosesRemaining).toBe(3);
    expect(ok.state).toBe("ok");

    // 25 days in: within 7 days of running out → soon
    const soon = refillStatus({ filledAtMs, dosesSupplied: 4, doseIntervalHours: interval, nowMs: filledAtMs + 25 * DAY });
    expect(soon.state).toBe("soon");

    // 40 days in: past supply → overdue, 0 remaining
    const over = refillStatus({ filledAtMs, dosesSupplied: 4, doseIntervalHours: interval, nowMs: filledAtMs + 40 * DAY });
    expect(over.state).toBe("overdue");
    expect(over.dosesRemaining).toBe(0);
  });
});

describe("food estimator (code-only)", () => {
  it("parses counts and sums protein/fiber", () => {
    const r = estimateFromText("3 eggs, 2 slices wheat toast, greek yogurt");
    expect(r.items.length).toBe(3);
    // 3 eggs (18g) + 2 toast (8g) + yogurt (17g) ≈ 43g protein
    expect(r.totals.protein).toBeGreaterThan(40);
    expect(r.totals.fiber).toBeGreaterThan(3);
    expect(r.unmatched.length).toBe(0);
  });

  it("scales gram quantities against the serving size", () => {
    // 200 g chicken breast = 2× the 100 g serving → ~62 g protein
    const r = estimateFromText("200 g chicken breast");
    expect(r.items[0].protein).toBeCloseTo(62, 0);
  });

  it("handles word numbers and 'a/an'", () => {
    const r = estimateFromText("two eggs and an apple");
    expect(r.items.length).toBe(2);
    expect(r.items[0].servings).toBe(2);
  });

  it("reports unmatched segments instead of guessing", () => {
    const r = estimateFromText("unicorn stew");
    expect(r.items.length).toBe(0);
    expect(r.unmatched).toContain("unicorn stew");
  });
});
