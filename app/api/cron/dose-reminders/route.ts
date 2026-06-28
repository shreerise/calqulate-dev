import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sendPush, pushConfigured } from "@/lib/push";
import { emailConfigured, sendEmail } from "@/lib/email/mailer";
import { computeNextDoseMs, isDoseReminderDue, describeDueIn } from "@/lib/glp1/reminders";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Dose-reminder fan-out. Point an external scheduler at this hourly, e.g.:
 *   GET https://calqulate.net/api/cron/dose-reminders?secret=YOUR_CRON_SECRET
 *
 * For every enabled dose reminder it computes the next expected dose from the
 * medication + latest logged dose, and if that dose is due (within lead/grace and
 * not already fired) it sends a web-push and/or email, then stamps last_fired_at.
 */
async function handle(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  const url = new URL(req.url);
  const provided = url.searchParams.get("secret") ?? req.headers.get("authorization")?.replace("Bearer ", "");
  if (provided !== secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();
  const nowMs = Date.now();

  // Enabled, non-deleted dose reminders tied to a medication.
  const { data: reminders, error } = await admin
    .from("glp1_reminders")
    .select("id,user_id,medication_id,lead_minutes,last_fired_at,channel")
    .eq("kind", "dose")
    .eq("enabled", true)
    .is("deleted_at", null)
    .not("medication_id", "is", null)
    .limit(1000);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let evaluated = 0, due = 0, pushed = 0, emailed = 0, skipped = 0;

  for (const r of reminders ?? []) {
    evaluated++;
    const userId = r.user_id as string;

    // Medication (anchor + interval).
    const { data: med } = await admin
      .from("glp1_medications")
      .select("compound,brand_name,start_date,dose_interval_hours,active,deleted_at")
      .eq("id", r.medication_id)
      .maybeSingle();
    if (!med || med.deleted_at || med.active === false) { skipped++; continue; }

    // Most recent non-skipped dose.
    const { data: lastDose } = await admin
      .from("glp1_dose_logs")
      .select("taken_at")
      .eq("user_id", userId)
      .eq("medication_id", r.medication_id)
      .eq("skipped", false)
      .is("deleted_at", null)
      .order("taken_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const intervalMs = (med.dose_interval_hours as number) * 3_600_000;
    const startMs = Date.parse(med.start_date as string);
    const lastDoseMs = lastDose?.taken_at ? Date.parse(lastDose.taken_at as string) : null;
    const nextDoseMs = computeNextDoseMs({ startMs, intervalMs, lastDoseMs });

    const fire = isDoseReminderDue({
      nextDoseMs,
      leadMs: (r.lead_minutes as number) * 60_000,
      nowMs,
      lastFiredMs: r.last_fired_at ? Date.parse(r.last_fired_at as string) : null,
    });
    if (!fire) { skipped++; continue; }
    due++;

    const medName = (med.brand_name as string) || (med.compound as string);
    const body = `Time for your ${medName} dose — ${describeDueIn(nextDoseMs, nowMs)}.`;
    const channels: string[] = Array.isArray(r.channel) ? r.channel : [];

    // Web push.
    if (channels.includes("web-push") && pushConfigured()) {
      const { data: subs } = await admin.from("push_subscriptions").select("endpoint,keys").eq("user_id", userId);
      for (const ps of subs ?? []) {
        const res = await sendPush(ps as any, { title: "Dose reminder", body, url: "/dashboard/glp1", tag: "glp1-dose" });
        if (res.ok) pushed++;
        if (res.gone) await admin.from("push_subscriptions").delete().eq("endpoint", (ps as any).endpoint);
      }
    }

    // Email.
    if (channels.includes("email") && emailConfigured()) {
      const { data: profile } = await admin.from("profiles").select("email").eq("id", userId).maybeSingle();
      const email = profile?.email as string | undefined;
      if (email) {
        try {
          await sendEmail({
            to: email,
            subject: `Dose reminder — ${medName}`,
            html: `<p>${body}</p><p><a href="https://calqulate.net/dashboard/glp1">Log your dose →</a></p><p style="color:#888;font-size:12px">Educational reminder, not medical advice. Manage reminders in your Calqulate Vitals dashboard.</p>`,
          });
          emailed++;
        } catch { /* non-fatal */ }
      }
    }

    // Stamp so this due dose won't fire again until the next interval.
    await admin.from("glp1_reminders").update({ last_fired_at: new Date(nowMs).toISOString() }).eq("id", r.id);
  }

  return NextResponse.json({ ok: true, evaluated, due, pushed, emailed, skipped });
}

export async function GET(req: Request) { return handle(req); }
export async function POST(req: Request) { return handle(req); }
