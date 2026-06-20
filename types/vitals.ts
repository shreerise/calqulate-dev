// Shared domain types for Calqulate Vitals.

export type Sex = "male" | "female";
export type Race = "white" | "black" | "other";

/**
 * Raw inputs a user records at a single point in time.
 * Lab values (a1c, cholesterol) are optional so the product still
 * works before a user has bloodwork.
 */
export interface MeasurementInput {
  takenAt?: string; // ISO date; defaults to now
  age: number;
  sex: Sex;
  race?: Race; // affects ASCVD pooled-cohort equation
  heightCm: number;
  weightKg: number;
  waistCm?: number;
  hipCm?: number;
  neckCm?: number;
  systolicBp?: number;
  diastolicBp?: number;
  onBpMeds?: boolean;
  smoker?: boolean;
  diabetes?: boolean;
  familyDiabetes?: boolean;
  physicallyActive?: boolean;
  eatsVegetablesDaily?: boolean;
  totalCholesterol?: number; // mg/dL
  hdl?: number; // mg/dL
  ldl?: number; // mg/dL
  a1c?: number; // %
  highGlucoseHistory?: boolean;
}

export interface AscvdResult {
  available: boolean;
  tenYearRiskPercent: number | null;
  category: "low" | "borderline" | "intermediate" | "high" | "unknown";
  note?: string;
}

export interface HeartAgeResult {
  available: boolean;
  tenYearRiskPercent: number | null;
  heartAge: number | null;
  chronologicalAge: number;
  delta: number | null;
}

export interface DiabetesRiskResult {
  available: boolean;
  findriscScore: number | null; // 0-26
  tenYearRiskPercent: number | null;
  category: "low" | "slightly-elevated" | "moderate" | "high" | "very-high" | "unknown";
}

export interface BodyCompositionResult {
  bmi: number;
  bmiCategory: string;
  waistToHeight: number | null;
  rfmPercent: number | null;
  navyBodyFatPercent: number | null;
  leanBodyMassKg: number | null;
}

export interface CompositeScoreResult {
  score: number; // 0-100, higher = healthier
  grade: "A" | "B" | "C" | "D" | "F";
  subScores: Record<string, number>;
  confidence: "low" | "medium" | "high";
}

export interface VitalsReport {
  computedAt: string;
  input: MeasurementInput;
  ascvd: AscvdResult;
  heartAge: HeartAgeResult;
  diabetes: DiabetesRiskResult;
  body: BodyCompositionResult;
  composite: CompositeScoreResult;
}
