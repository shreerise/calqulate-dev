/**
 * GLP-1 tracker validation schemas (zod).
 *
 * Shared input-validation core: the web API validates writes with these today,
 * and the same package validates on future mobile clients — one source of truth,
 * so a bad write can never silently corrupt data (part of the reliability promise).
 *
 * These validate the CLIENT-SUPPLIED fields only. Server-managed fields
 * (id/userId/createdAt/updatedAt/version/deletedAt) are added by the repository.
 */

import { z } from "zod";

const iso = z.string().datetime({ offset: true });
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD");

export const compoundSchema = z.enum([
  "semaglutide",
  "tirzepatide",
  "liraglutide",
  "dulaglutide",
  "retatrutide",
]);

export const injectionSiteSchema = z.enum([
  "abdomen-left",
  "abdomen-right",
  "thigh-left",
  "thigh-right",
  "upper-arm-left",
  "upper-arm-right",
]);

export const medicationInput = z
  .object({
    /** glp1 gets the PK curve + benchmark; peptide/trt/other are tracked for dosing only. */
    kind: z.enum(["glp1", "peptide", "trt", "other"]).default("glp1"),
    /** Required for kind="glp1"; null for non-GLP-1 compounds (no PK model exists). */
    compound: compoundSchema.nullable().default(null),
    /** Free-text name for peptide/TRT/other compounds. */
    customName: z.string().trim().min(1).max(80).nullable().default(null),
    brandName: z.string().trim().min(1).max(60).nullable().default(null),
    source: z.enum(["branded", "compounded"]).default("branded"),
    concentrationMgPerMl: z.number().positive().max(100).nullable().default(null),
    doseIntervalHours: z.number().int().positive().max(24 * 60).default(168),
    startDate: isoDate,
    active: z.boolean().default(true),
  })
  .refine((v) => (v.kind === "glp1" ? v.compound !== null : v.customName !== null), {
    message: "GLP-1 meds need a compound; other kinds need a name.",
    path: ["compound"],
  });

export const doseLogInput = z.object({
  medicationId: z.string().uuid(),
  takenAt: iso,
  amountMg: z.number().positive().max(100),
  injectionSite: injectionSiteSchema.nullable().default(null),
  skipped: z.boolean().default(false),
  notes: z.string().trim().max(1000).nullable().default(null),
});

export const weightLogInput = z.object({
  takenAt: iso,
  weightKg: z.number().positive().max(500), // decimal precision preserved
});

export const bodyCompositionInput = z.object({
  takenAt: iso,
  weightKg: z.number().positive().max(500),
  bodyFatPct: z.number().min(2).max(75),
  fatMassKg: z.number().positive().max(500).nullable().default(null),
  leanMassKg: z.number().positive().max(500).nullable().default(null),
  source: z.enum(["manual", "smart-scale", "dexa", "estimated"]).default("manual"),
});

export const foodLogInput = z.object({
  loggedAt: iso,
  label: z.string().trim().min(1).max(200),
  proteinG: z.number().min(0).max(1000),
  fiberG: z.number().min(0).max(500),
  calories: z.number().min(0).max(20000).nullable().default(null),
  carbsG: z.number().min(0).max(2000).nullable().default(null),
  fatG: z.number().min(0).max(2000).nullable().default(null),
  photoId: z.string().uuid().nullable().default(null),
});

export const waterLogInput = z.object({
  loggedAt: iso,
  volumeMl: z.number().positive().max(20000),
});

export const sideEffectInput = z
  .object({
    loggedAt: iso,
    noSymptoms: z.boolean().default(false),
    type: z
      .enum([
        "nausea",
        "vomiting",
        "diarrhea",
        "constipation",
        "fatigue",
        "headache",
        "injection-site-reaction",
        "heartburn",
        "other",
      ])
      .nullable()
      .default(null),
    severity: z.number().int().min(0).max(5).nullable().default(null),
    notes: z.string().trim().max(1000).nullable().default(null),
  })
  // Logging ABSENCE is a first-class action no competitor allows — enforce coherence.
  .refine((v) => v.noSymptoms || v.type !== null, {
    message: "Pick a side-effect type, or mark 'no symptoms today'.",
    path: ["type"],
  });

export const checkInInput = z.object({
  loggedAt: iso,
  mood: z.number().int().min(1).max(5).nullable().default(null),
  energy: z.number().int().min(1).max(5).nullable().default(null),
  craving: z.number().int().min(1).max(5).nullable().default(null),
  sleepHours: z.number().min(0).max(24).nullable().default(null),
  bowelMovements: z.number().int().min(0).max(50).nullable().default(null),
  notes: z.string().trim().max(1000).nullable().default(null),
});

export const labResultInput = z.object({
  takenAt: iso,
  type: z.enum([
    "a1c",
    "fasting-glucose",
    "total-cholesterol",
    "ldl",
    "hdl",
    "triglycerides",
    "systolic-bp",
    "diastolic-bp",
  ]),
  value: z.number().min(0).max(2000),
  unit: z.string().trim().min(1).max(20),
});

export const exerciseLogInput = z.object({
  loggedAt: iso,
  type: z.enum(["resistance", "cardio", "flexibility", "other"]),
  label: z.string().trim().min(1).max(200),
  durationMin: z.number().min(0).max(1440).nullable().default(null),
  sets: z.number().int().min(0).max(100).nullable().default(null),
  reps: z.number().int().min(0).max(1000).nullable().default(null),
  notes: z.string().trim().max(1000).nullable().default(null),
});

export const refillInput = z.object({
  medicationId: z.string().uuid(),
  filledDate: isoDate,
  dosesSupplied: z.number().int().positive().max(1000),
  pharmacy: z.string().trim().max(120).nullable().default(null),
  copayUsd: z.number().min(0).max(100000).nullable().default(null),
  savingsCard: z.boolean().default(false),
  priorAuthStatus: z.enum(["none", "pending", "approved", "denied"]).default("none"),
  notes: z.string().trim().max(1000).nullable().default(null),
});

export const reminderInput = z.object({
  kind: z.enum(["dose", "weigh-in", "check-in", "lab", "refill"]),
  /** For dose reminders the schedule is derived from the medication, so "auto" is fine. */
  schedule: z.string().trim().min(1).max(200).default("auto"),
  /** Dose reminders link to a medication; other kinds leave this null. */
  medicationId: z.string().uuid().nullable().default(null),
  /** Minutes BEFORE the due time to notify (0 = at the due time). */
  leadMinutes: z.number().int().min(0).max(10080).default(0),
  enabled: z.boolean().default(true),
  channel: z.array(z.enum(["web-push", "email"])).min(1).default(["web-push"]),
});

/** Maps a logical entity name → its input schema + DB table. The repository's registry. */
export const GLP1_ENTITIES = {
  medication: { table: "glp1_medications", schema: medicationInput },
  doseLog: { table: "glp1_dose_logs", schema: doseLogInput },
  weightLog: { table: "glp1_weight_logs", schema: weightLogInput },
  bodyComposition: { table: "glp1_body_composition", schema: bodyCompositionInput },
  foodLog: { table: "glp1_food_logs", schema: foodLogInput },
  waterLog: { table: "glp1_water_logs", schema: waterLogInput },
  sideEffect: { table: "glp1_side_effects", schema: sideEffectInput },
  checkIn: { table: "glp1_checkins", schema: checkInInput },
  labResult: { table: "glp1_lab_results", schema: labResultInput },
  exerciseLog: { table: "glp1_exercise_logs", schema: exerciseLogInput },
  refill: { table: "glp1_refills", schema: refillInput },
  reminder: { table: "glp1_reminders", schema: reminderInput },
} as const;

export type Glp1EntityName = keyof typeof GLP1_ENTITIES;

export type MedicationInput = z.infer<typeof medicationInput>;
export type DoseLogInput = z.infer<typeof doseLogInput>;
export type WeightLogInput = z.infer<typeof weightLogInput>;
export type BodyCompositionInput = z.infer<typeof bodyCompositionInput>;
export type FoodLogInput = z.infer<typeof foodLogInput>;
export type WaterLogInput = z.infer<typeof waterLogInput>;
export type SideEffectInput = z.infer<typeof sideEffectInput>;
export type CheckInInput = z.infer<typeof checkInInput>;
export type LabResultInput = z.infer<typeof labResultInput>;
export type ExerciseLogInput = z.infer<typeof exerciseLogInput>;
export type RefillInput = z.infer<typeof refillInput>;
export type ReminderInput = z.infer<typeof reminderInput>;
