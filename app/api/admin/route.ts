import { NextResponse } from "next/server";
import { getAdminUser, logAudit } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/server";
import { buildVitalsReport } from "@/lib/clinical";
import type { MeasurementInput } from "@/types/vitals";

/**
 * Admin action endpoint. Every action is admin-guarded and audit-logged.
 * Powers the Users table actions and the Dev Tools panel.
 */
export async function POST(req: Request) {
  const adminUser = await getAdminUser();
  if (!adminUser) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = (await req.json()) as { action: string; userId?: string; role?: string };
  const admin = createAdminClient();
  const { action } = body;

  switch (action) {
    case "set-role": {
      if (!body.userId || !["user", "admin"].includes(body.role ?? "")) {
        return NextResponse.json({ error: "Bad request" }, { status: 400 });
      }
      const { error } = await admin.from("profiles").update({ role: body.role }).eq("id", body.userId);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      await logAudit("set-role", body.userId, { role: body.role });
      return NextResponse.json({ ok: true });
    }

    case "grant-pro":
    case "revoke-pro": {
      const userId = body.userId ?? adminUser.id;
      const patch =
        action === "grant-pro"
          ? { tier: "pro", status: "active" }
          : { tier: "free", status: "canceled" };
      const { error } = await admin
        .from("subscriptions")
        .upsert({ user_id: userId, ...patch, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      await logAudit(action, userId);
      return NextResponse.json({ ok: true });
    }

    case "delete-user": {
      if (!body.userId) return NextResponse.json({ error: "Bad request" }, { status: 400 });
      const uid = body.userId;
      await admin.from("risk_results").delete().eq("user_id", uid);
      await admin.from("measurements").delete().eq("user_id", uid);
      await admin.from("reports").delete().eq("user_id", uid);
      await admin.from("reminders").delete().eq("user_id", uid);
      await admin.from("subscriptions").delete().eq("user_id", uid);
      await admin.from("profiles").delete().eq("id", uid);
      const { error } = await admin.auth.admin.deleteUser(uid);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      await logAudit("delete-user", uid);
      return NextResponse.json({ ok: true });
    }

    case "seed-demo": {
      // Insert an improving, realistic series for the admin's own account so the
      // dashboard trajectory + next-lever engines have real data to show.
      const uid = adminUser.id;
      await admin.from("risk_results").delete().eq("user_id", uid);
      await admin.from("measurements").delete().eq("user_id", uid);

      const weeks = 8;
      for (let i = 0; i < weeks; i++) {
        const t = new Date(Date.now() - (weeks - 1 - i) * 7 * 86_400_000).toISOString();
        // Steady improvement: weight, BP, cholesterol down; HDL up.
        const input: MeasurementInput = {
          takenAt: t,
          age: 52, sex: "male", race: "white",
          heightCm: 178,
          weightKg: 95 - i * 0.9,
          waistCm: 106 - i * 0.7,
          systolicBp: 144 - i * 1.6,
          totalCholesterol: 232 - i * 2.5,
          hdl: 40 + i * 0.8,
          smoker: false,
          physicallyActive: i >= 3,
          familyDiabetes: true,
        };
        const report = buildVitalsReport(input);
        const { data: meas } = await admin
          .from("measurements")
          .insert({
            user_id: uid, taken_at: t,
            age: input.age, sex: input.sex, race: input.race,
            height_cm: input.heightCm, weight_kg: input.weightKg, waist_cm: input.waistCm,
            systolic_bp: input.systolicBp, total_cholesterol: input.totalCholesterol, hdl: input.hdl,
            smoker: input.smoker, physically_active: input.physicallyActive, family_diabetes: input.familyDiabetes,
          })
          .select("id")
          .single();

        await admin.from("risk_results").insert({
          user_id: uid,
          measurement_id: meas?.id,
          composite_score: report.composite.score,
          composite_grade: report.composite.grade,
          ascvd_percent: report.ascvd.tenYearRiskPercent,
          heart_age: report.heartAge.heartAge,
          heart_age_delta: report.heartAge.delta,
          diabetes_percent: report.diabetes.tenYearRiskPercent,
          report_json: report,
          computed_at: t,
        });
      }
      // Make sure the admin is Pro so paid surfaces render.
      await admin.from("subscriptions").upsert(
        { user_id: uid, tier: "pro", status: "active", updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      );
      await logAudit("seed-demo", uid, { weeks });
      return NextResponse.json({ ok: true, inserted: weeks });
    }

    case "reset-demo": {
      const uid = adminUser.id;
      await admin.from("risk_results").delete().eq("user_id", uid);
      await admin.from("measurements").delete().eq("user_id", uid);
      await logAudit("reset-demo", uid);
      return NextResponse.json({ ok: true });
    }

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}
