import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import { getAccess, hasPaidAccess } from "@/lib/auth";
import { listRecords } from "@/lib/glp1/repository";
import {
  currentLevelStatus,
  bodyComp,
  bodyCompChange,
  benchmark,
  proteinTarget,
  type Medication,
  type DoseLog,
  type WeightLog,
  type BodyCompositionLog,
  type LabResult,
  type ExerciseLog,
  type SideEffectLog,
} from "@/lib/glp1";
import { Glp1ReportPdf, type Glp1ReportSummary } from "@/lib/report/Glp1ReportPdf";

export const runtime = "nodejs";

const LB = 2.2046226218;
const lb = (kg: number) => Math.round(kg * LB * 10) / 10;
const LAB_LABELS: Record<string, string> = {
  a1c: "A1c", "fasting-glucose": "Fasting glucose", "total-cholesterol": "Total cholesterol",
  ldl: "LDL", hdl: "HDL", triglycerides: "Triglycerides", "systolic-bp": "Systolic BP", "diastolic-bp": "Diastolic BP",
};

/** Doctor-shareable GLP-1 progress PDF. Paid feature. */
export async function GET() {
  const access = await getAccess();
  if (!access.userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (!hasPaidAccess(access)) {
    return NextResponse.json({ error: "Doctor reports require Calqulate Vitals." }, { status: 402 });
  }
  const supabase = await createClient();
  const userId = access.userId;
  const nowMs = Date.now();
  const cutoff30 = nowMs - 30 * 24 * 3_600_000;

  const [meds, doses, weights, bodyComps, labs, exercises, symptoms] = await Promise.all([
    listRecords<Medication>(supabase, "medication", userId, { limit: 10 }),
    listRecords<DoseLog>(supabase, "doseLog", userId, { limit: 200 }),
    listRecords<WeightLog>(supabase, "weightLog", userId, { limit: 200 }),
    listRecords<BodyCompositionLog>(supabase, "bodyComposition", userId, { limit: 100 }),
    listRecords<LabResult>(supabase, "labResult", userId, { limit: 200 }),
    listRecords<ExerciseLog>(supabase, "exerciseLog", userId, { limit: 200 }),
    listRecords<SideEffectLog>(supabase, "sideEffect", userId, { limit: 200 }),
  ]);

  const activeMed = meds.find((m) => m.active) ?? meds[0] ?? null;
  const weeksOnTherapy = activeMed ? Math.max(0, Math.floor((nowMs - Date.parse(activeMed.startDate)) / (7 * 24 * 3_600_000))) : 0;

  // Weight (oldest = baseline, newest = current)
  let weight: Glp1ReportSummary["weight"] = null;
  if (weights.length >= 1) {
    const current = weights[0];
    const baseline = weights[weights.length - 1];
    const changePct = baseline.weightKg > 0 ? Math.round(((baseline.weightKg - current.weightKg) / baseline.weightKg) * 1000) / 10 : 0;
    weight = { baselineLb: lb(baseline.weightKg), currentLb: lb(current.weightKg), changeLb: Math.round((lb(baseline.weightKg) - lb(current.weightKg)) * 10) / 10, changePct };
  }

  // Benchmark (GLP-1 compounds only)
  let bench: Glp1ReportSummary["benchmark"] = null;
  if (activeMed?.compound && weights.length >= 1 && weeksOnTherapy >= 1) {
    const r = benchmark({ compound: activeMed.compound, baselineKg: weights[weights.length - 1].weightKg, currentKg: weights[0].weightKg, weeks: weeksOnTherapy });
    bench = { trial: r.trial, dose: r.dose, expectedPct: r.expectedPct, actualPct: r.actualPct, status: r.status, message: r.message };
  }

  // Body composition
  let bc: Glp1ReportSummary["bodyComp"] = null;
  if (bodyComps.length >= 1) {
    const latest = bodyComps[0];
    const p = bodyComp(latest.weightKg, latest.bodyFatPct);
    let leanLossPct: number | null = null, flag: string | null = null, message: string | null = null;
    if (bodyComps.length >= 2) {
      const change = bodyCompChange(bodyComp(bodyComps[bodyComps.length - 1].weightKg, bodyComps[bodyComps.length - 1].bodyFatPct), p);
      leanLossPct = change.leanLossPct; flag = change.level; message = change.message;
    }
    bc = { fatMassLb: lb(p.fatMassKg), leanMassLb: lb(p.leanMassKg), bodyFatPct: p.bodyFatPct, leanLossPct, flag, message };
  }

  // Medication level (GLP-1 compounds only)
  let medLevelPct: number | null = null;
  if (activeMed?.compound && doses.length > 0) {
    medLevelPct = currentLevelStatus(doses.filter((d) => !d.skipped).map((d) => ({ takenAt: d.takenAt, amountMg: d.amountMg })), activeMed.compound, nowMs).currentPct;
  }

  // Protein target from latest weight + body fat
  let protein: Glp1ReportSummary["proteinTarget"] = null;
  if (weights.length >= 1) {
    const t = proteinTarget(weights[0].weightKg, bodyComps[0]?.bodyFatPct);
    protein = { minG: t.minG, maxG: t.maxG };
  }

  // Latest lab of each type
  const seen = new Set<string>();
  const latestLabs: { label: string; value: string }[] = [];
  for (const l of labs) {
    if (seen.has(l.type)) continue;
    seen.add(l.type);
    latestLabs.push({ label: LAB_LABELS[l.type] ?? l.type, value: `${l.value} ${l.unit}` });
  }

  const adherence = {
    dosesLast30: doses.filter((d) => !d.skipped && Date.parse(d.takenAt) >= cutoff30).length,
    resistanceSessionsLast30: exercises.filter((e) => e.type === "resistance" && Date.parse(e.loggedAt) >= cutoff30).length,
    symptomDaysLast30: symptoms.filter((s) => !s.noSymptoms && Date.parse(s.loggedAt) >= cutoff30).length,
    noSymptomDaysLast30: symptoms.filter((s) => s.noSymptoms && Date.parse(s.loggedAt) >= cutoff30).length,
  };

  const summary: Glp1ReportSummary = {
    email: access.email ?? "",
    generatedAt: new Date(nowMs).toISOString(),
    medication: activeMed
      ? {
          name: activeMed.brandName ?? activeMed.customName ?? activeMed.compound ?? "Medication",
          compound: activeMed.compound ?? activeMed.customName ?? "—",
          startDate: activeMed.startDate,
          weeksOnTherapy,
          doseIntervalDays: Math.round(activeMed.doseIntervalHours / 24),
        }
      : null,
    weight,
    benchmark: bench,
    bodyComp: bc,
    medicationLevelPct: medLevelPct,
    proteinTarget: protein,
    labs: latestLabs,
    adherence,
  };

  const buffer = await renderToBuffer(React.createElement(Glp1ReportPdf, { summary }) as any);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="calqulate-glp1-report.pdf"`,
    },
  });
}
