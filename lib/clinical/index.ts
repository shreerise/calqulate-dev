import type { MeasurementInput, VitalsReport } from "@/types/vitals";
import { calculateAscvd } from "./ascvd";
import { calculateHeartAge } from "./framingham";
import { calculateDiabetesRisk } from "./diabetesRisk";
import { calculateBodyComposition } from "./bodyComposition";
import { calculateCompositeScore } from "./compositeScore";

export * from "./ascvd";
export * from "./framingham";
export * from "./diabetesRisk";
export * from "./bodyComposition";
export * from "./compositeScore";

/** Run every clinical engine and assemble a full report for one measurement. */
export function buildVitalsReport(input: MeasurementInput): VitalsReport {
  const ascvd = calculateAscvd(input);
  const heartAge = calculateHeartAge(input);
  const diabetes = calculateDiabetesRisk(input);
  const body = calculateBodyComposition(input);
  const composite = calculateCompositeScore({ ascvd, heartAge, diabetes, body });

  return {
    computedAt: new Date().toISOString(),
    input,
    ascvd,
    heartAge,
    diabetes,
    body,
    composite,
  };
}
