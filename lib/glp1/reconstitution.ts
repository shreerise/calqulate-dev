/**
 * Compounded reconstitution calculator — pure math, no API (Phase 3).
 *
 * Compounded semaglutide/tirzepatide ships as a lyophilised powder that the user
 * reconstitutes with bacteriostatic (BAC) water. This converts a desired mg dose
 * into the volume to draw and the mark on a U-100 insulin syringe.
 *
 * ⚠️ Educational math only — always follow your prescriber/pharmacist's
 * instructions. Deterministic & unit-testable, reusable by future mobile clients.
 */

export interface ReconstitutionInput {
  /** Total peptide in the vial, mg (e.g. 5). */
  vialMg: number;
  /** Bacteriostatic water added, mL (e.g. 2). */
  bacWaterMl: number;
  /** Desired dose, mg (e.g. 0.25). */
  doseMg: number;
  /** Insulin-syringe scale; U-100 (1 mL = 100 units) is standard. */
  syringeUnitsPerMl?: number;
}

export interface ReconstitutionResult {
  concentrationMgPerMl: number;
  /** Volume to draw for one dose, mL. */
  drawMl: number;
  /** Same volume expressed as insulin-syringe units (the practical number). */
  drawUnits: number;
  /** Rounded to the nearest whole unit for the syringe mark. */
  drawUnitsRounded: number;
  /** Whole doses available from the vial. */
  dosesPerVial: number;
  /** Micrograms delivered per syringe unit — handy for fine titration. */
  mcgPerUnit: number;
  warnings: string[];
}

export function reconstitution({
  vialMg,
  bacWaterMl,
  doseMg,
  syringeUnitsPerMl = 100,
}: ReconstitutionInput): ReconstitutionResult | null {
  if (!(vialMg > 0) || !(bacWaterMl > 0) || !(doseMg > 0) || !(syringeUnitsPerMl > 0)) return null;

  const concentrationMgPerMl = vialMg / bacWaterMl;
  const drawMl = doseMg / concentrationMgPerMl;
  const drawUnits = drawMl * syringeUnitsPerMl;
  const drawUnitsRounded = Math.round(drawUnits);
  const dosesPerVial = Math.floor(vialMg / doseMg);
  const mcgPerUnit = (concentrationMgPerMl / syringeUnitsPerMl) * 1000;

  const warnings: string[] = [];
  if (drawUnits > syringeUnitsPerMl) {
    warnings.push("This dose needs more than one full syringe — use less BAC water or a larger syringe.");
  }
  if (drawUnits < 2) {
    warnings.push("This draw is under 2 units — small measurement errors matter a lot here; consider more BAC water for a finer mark.");
  }

  return {
    concentrationMgPerMl: round(concentrationMgPerMl, 3),
    drawMl: round(drawMl, 3),
    drawUnits: round(drawUnits, 1),
    drawUnitsRounded,
    dosesPerVial,
    mcgPerUnit: round(mcgPerUnit, 1),
    warnings,
  };
}

function round(n: number, dp: number): number {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
}
