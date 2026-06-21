/** USA-friendly unit conversions. Internal storage is always metric (kg, cm). */

export type UnitSystem = "us" | "metric";

export const KG_PER_LB = 0.45359237;
export const CM_PER_IN = 2.54;

export const lbToKg = (lb: number) => lb * KG_PER_LB;
export const kgToLb = (kg: number) => kg / KG_PER_LB;
export const inToCm = (inch: number) => inch * CM_PER_IN;
export const cmToIn = (cm: number) => cm / CM_PER_IN;

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Format a metric weight for display in the chosen system. */
export function fmtWeight(kg: number | null | undefined, system: UnitSystem): string {
  if (kg == null) return "—";
  return system === "us" ? `${r1(kgToLb(kg))} lb` : `${r1(kg)} kg`;
}

/** Format a metric length (cm) for display in the chosen system. */
export function fmtLength(cm: number | null | undefined, system: UnitSystem): string {
  if (cm == null) return "—";
  if (system === "metric") return `${r1(cm)} cm`;
  const totalIn = cmToIn(cm);
  return `${r1(totalIn)} in`;
}

/** Convert a height in cm to feet/inches parts (US display). */
export function cmToFtIn(cm: number): { ft: number; in: number } {
  const totalIn = Math.round(cmToIn(cm));
  return { ft: Math.floor(totalIn / 12), in: totalIn % 12 };
}
