/**
 * Calqulate Vitals — GLP-1 tracker shared domain types.
 *
 * This module is the SINGLE SOURCE OF TRUTH for the GLP-1 tracker's domain
 * model. It is pure TypeScript with no React / Next / Supabase imports, so the
 * web app uses it today and the future React Native / Flutter (via codegen)
 * clients can reuse it without a rewrite. Keep it dependency-free.
 */

// ─── Medications ──────────────────────────────────────────────────────────────

/** Active molecule. Brand/compounded names map onto these for the PK model. */
export type Glp1Compound =
  | "semaglutide"
  | "tirzepatide"
  | "liraglutide"
  | "dulaglutide"
  | "retatrutide";

/** How the user obtains the drug — affects nothing clinically, used for UX/labels. */
export type Glp1Source = "branded" | "compounded";

/** Common brand → compound map (display only; PK is keyed on the compound). */
export const BRAND_TO_COMPOUND: Record<string, Glp1Compound> = {
  ozempic: "semaglutide",
  wegovy: "semaglutide",
  rybelsus: "semaglutide",
  mounjaro: "tirzepatide",
  zepbound: "tirzepatide",
  saxenda: "liraglutide",
  victoza: "liraglutide",
  trulicity: "dulaglutide",
};

// ─── Units ────────────────────────────────────────────────────────────────────

export type MassUnit = "kg" | "lb";
export type LengthUnit = "cm" | "in";
export type Sex = "male" | "female";

// ─── Base record ──────────────────────────────────────────────────────────────

/**
 * Every persisted row carries these. `version` enables optimistic-concurrency
 * (durable, conflict-aware writes) and `deletedAt` is a SOFT delete so a restore
 * flow can recover data — both are core to the "never lose your data" promise.
 */
export interface BaseRecord {
  id: string;
  userId: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  version: number; // increments on every update; used for conflict detection
  deletedAt: string | null; // soft delete
}

// ─── Logged entities ──────────────────────────────────────────────────────────

export type MedicationKind = "glp1" | "peptide" | "trt" | "other";

export interface Medication extends BaseRecord {
  /** glp1 gets the PK curve + benchmark; peptide/trt/other are dose-tracked only. */
  kind: MedicationKind;
  /** Null for non-GLP-1 compounds (no PK model). */
  compound: Glp1Compound | null;
  /** Free-text name for peptide/TRT/other compounds. */
  customName: string | null;
  brandName: string | null;
  source: Glp1Source;
  /** Concentration in mg/mL — needed by the reconstitution calculator (Phase 3). */
  concentrationMgPerMl: number | null;
  /** Default cadence between doses, in hours (weekly = 168). */
  doseIntervalHours: number;
  startDate: string; // ISO date
  active: boolean;
}

export type PriorAuthStatus = "none" | "pending" | "approved" | "denied";

export interface Refill extends BaseRecord {
  medicationId: string;
  filledDate: string; // ISO date
  dosesSupplied: number;
  pharmacy: string | null;
  copayUsd: number | null;
  savingsCard: boolean;
  priorAuthStatus: PriorAuthStatus;
  notes: string | null;
}

export interface DoseLog extends BaseRecord {
  medicationId: string;
  takenAt: string; // ISO datetime
  amountMg: number;
  injectionSite: InjectionSite | null;
  skipped: boolean;
  notes: string | null;
}

export type InjectionSite =
  | "abdomen-left"
  | "abdomen-right"
  | "thigh-left"
  | "thigh-right"
  | "upper-arm-left"
  | "upper-arm-right";

export interface WeightLog extends BaseRecord {
  takenAt: string;
  /** Always stored canonical in kg; the UI converts. Decimal precision preserved. */
  weightKg: number;
}

export interface BodyCompositionLog extends BaseRecord {
  takenAt: string;
  weightKg: number;
  bodyFatPct: number; // 0–100
  /** Optional direct lean/fat mass (from a smart scale / DEXA) in kg. */
  fatMassKg: number | null;
  leanMassKg: number | null;
  source: "manual" | "smart-scale" | "dexa" | "estimated";
}

export interface FoodLog extends BaseRecord {
  loggedAt: string;
  label: string;
  proteinG: number;
  fiberG: number;
  calories: number | null; // secondary by design
  carbsG: number | null;
  fatG: number | null;
  photoId: string | null;
}

export interface WaterLog extends BaseRecord {
  loggedAt: string;
  volumeMl: number;
}

export type SideEffectType =
  | "nausea"
  | "vomiting"
  | "diarrhea"
  | "constipation"
  | "fatigue"
  | "headache"
  | "injection-site-reaction"
  | "heartburn"
  | "other";

export interface SideEffectLog extends BaseRecord {
  loggedAt: string;
  /** When `noSymptoms` is true, `type`/`severity` are ignored — lets users log ABSENCE. */
  noSymptoms: boolean;
  type: SideEffectType | null;
  severity: number | null; // 0–5
  notes: string | null;
}

export interface CheckIn extends BaseRecord {
  loggedAt: string;
  mood: number | null; // 1–5
  energy: number | null; // 1–5
  craving: number | null; // 1–5 ("food noise")
  sleepHours: number | null;
  bowelMovements: number | null;
  notes: string | null;
}

export type LabType =
  | "a1c"
  | "fasting-glucose"
  | "total-cholesterol"
  | "ldl"
  | "hdl"
  | "triglycerides"
  | "systolic-bp"
  | "diastolic-bp";

export interface LabResult extends BaseRecord {
  takenAt: string;
  type: LabType;
  value: number;
  unit: string;
}

export type ExerciseType = "resistance" | "cardio" | "flexibility" | "other";

export interface ExerciseLog extends BaseRecord {
  loggedAt: string;
  type: ExerciseType;
  label: string;
  durationMin: number | null;
  /** Resistance-training emphasis is the muscle-preservation lever during a deficit. */
  sets: number | null;
  reps: number | null;
  notes: string | null;
}

export interface Photo extends BaseRecord {
  takenAt: string;
  storageKey: string; // object-storage ref, never a data URL
  caption: string | null;
}

export type ReminderKind = "dose" | "weigh-in" | "check-in" | "lab" | "refill";

export interface Reminder extends BaseRecord {
  kind: ReminderKind;
  /** RRULE-ish cadence string, ISO datetime, or "auto" (derive from the medication). */
  schedule: string;
  /** Dose reminders link to a medication; other kinds are null. */
  medicationId: string | null;
  /** Minutes before the due time to notify (0 = at the due time). */
  leadMinutes: number;
  /** Last time the cron actually fired this reminder — used to de-duplicate sends. */
  lastFiredAt: string | null;
  enabled: boolean;
  channel: ("web-push" | "email")[];
}

/** Union of every loggable table — useful for the export + restore flows. */
export type AnyGlp1Record =
  | Medication
  | DoseLog
  | WeightLog
  | BodyCompositionLog
  | FoodLog
  | WaterLog
  | SideEffectLog
  | CheckIn
  | LabResult
  | ExerciseLog
  | Photo
  | Reminder;
