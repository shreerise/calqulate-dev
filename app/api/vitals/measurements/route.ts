import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAccess, hasPaidAccess } from "@/lib/auth";
import { buildVitalsReport } from "@/lib/clinical";
import type { MeasurementInput } from "@/types/vitals";

/** GET: list the signed-in user's measurement history (+ computed results). */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { data, error } = await supabase
    .from("risk_results")
    .select("id,composite_score,composite_grade,ascvd_percent,heart_age,heart_age_delta,diabetes_percent,report_json,computed_at")
    .eq("user_id", user.id)
    .order("computed_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ history: data });
}

/**
 * POST: save a new measurement, compute its report, persist both.
 * Saving history is a paid feature — anonymous/free users use /compute.
 */
export async function POST(req: Request) {
  const access = await getAccess();
  if (!access.userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (!hasPaidAccess(access)) {
    return NextResponse.json({ error: "Saving history requires Vitals Plus." }, { status: 402 });
  }

  const input = (await req.json()) as MeasurementInput;
  const supabase = await createClient();

  const { data: meas, error: mErr } = await supabase
    .from("measurements")
    .insert({
      user_id: access.userId,
      taken_at: input.takenAt ?? new Date().toISOString(),
      age: input.age, sex: input.sex, race: input.race,
      height_cm: input.heightCm, weight_kg: input.weightKg,
      waist_cm: input.waistCm, hip_cm: input.hipCm, neck_cm: input.neckCm,
      systolic_bp: input.systolicBp, diastolic_bp: input.diastolicBp,
      on_bp_meds: input.onBpMeds, smoker: input.smoker, diabetes: input.diabetes,
      family_diabetes: input.familyDiabetes, physically_active: input.physicallyActive,
      eats_vegetables_daily: input.eatsVegetablesDaily,
      total_cholesterol: input.totalCholesterol, hdl: input.hdl, ldl: input.ldl,
      a1c: input.a1c, high_glucose_history: input.highGlucoseHistory,
    })
    .select("id")
    .single();

  if (mErr) return NextResponse.json({ error: mErr.message }, { status: 500 });

  const report = buildVitalsReport(input);
  const { error: rErr } = await supabase.from("risk_results").insert({
    user_id: access.userId,
    measurement_id: meas.id,
    composite_score: report.composite.score,
    composite_grade: report.composite.grade,
    ascvd_percent: report.ascvd.tenYearRiskPercent,
    heart_age: report.heartAge.heartAge,
    heart_age_delta: report.heartAge.delta,
    diabetes_percent: report.diabetes.tenYearRiskPercent,
    report_json: report,
  });

  if (rErr) return NextResponse.json({ error: rErr.message }, { status: 500 });
  return NextResponse.json({ ok: true, report });
}
