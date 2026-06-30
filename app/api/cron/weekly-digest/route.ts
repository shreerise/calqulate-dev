import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { emailConfigured, sendEmail } from "@/lib/email/mailer";
import { buildDigestData, renderWeeklyDigestHtml } from "@/lib/email/weeklyDigest";
import { sendPush, pushConfigured } from "@/lib/push";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Weekly digest fan-out. Trigger from an external scheduler (Vercel Cron,
 * cron-job.org, or Supabase pg_cron HTTP) once a week, e.g.:
 *   GET https://calqulate.net/api/cron/weekly-digest?secret=YOUR_CRON_SECRET
 * Set CRON_SECRET in env. Sends to active paid members who haven't opted out.
 */
async function handle(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  const url = new URL(req.url);
  const provided = url.searchParams.get("secret") ?? req.headers.get("authorization")?.replace("Bearer ", "");
  if (provided !== secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!emailConfigured()) {
    return NextResponse.json({ error: "SMTP not configured (SUPPORT_SMTP_* env vars)" }, { status: 503 });
  }

  const admin = createAdminClient();

  // Active paid members.
  const { data: subs } = await admin
    .from("subscriptions")
    .select("user_id,tier,status")
    .in("status", ["active", "trialing"])
    .eq("tier", "pro");
  const subRows = (subs ?? []) as any[];
  const userIds: string[] = Array.from(new Set(subRows.map((s) => String(s.user_id)))).slice(0, 500);

  const [{ data: profiles }, { data: prefs }] = await Promise.all([
    admin.from("profiles").select("id,email").in("id", userIds.length ? userIds : ["00000000-0000-0000-0000-000000000000"]),
    admin.from("notification_prefs").select("user_id,email_weekly,push_enabled").in("user_id", userIds.length ? userIds : ["00000000-0000-0000-0000-000000000000"]),
  ]);
  const emailById = new Map<string, string>();
  for (const p of (profiles ?? []) as any[]) emailById.set(p.id, p.email);
  const prefById = new Map<string, any>();
  for (const p of (prefs ?? []) as any[]) prefById.set(p.user_id, p);

  let sent = 0, skipped = 0, failed = 0, pushed = 0;

  for (const uid of userIds) {
    const email = emailById.get(uid);
    const pref = prefById.get(uid);
    if (!email || pref?.email_weekly === false) { skipped++; continue; }

    const { data: rows } = await admin
      .from("risk_results")
      .select("composite_score,composite_grade,ascvd_percent,diabetes_percent,heart_age,report_json,computed_at")
      .eq("user_id", uid)
      .order("computed_at", { ascending: true })
      .limit(20);

    const data = buildDigestData((rows ?? []) as any, email);
    if (!data) { skipped++; continue; }

    try {
      await sendEmail({
        to: email,
        subject: `Your weekly Calqulate update — score ${data.score}${data.scoreDelta ? ` (${data.scoreDelta > 0 ? "+" : ""}${data.scoreDelta})` : ""}`,
        html: renderWeeklyDigestHtml(data),
      });
      sent++;
    } catch {
      failed++;
    }

    // Optional push nudge.
    if (pushConfigured() && pref?.push_enabled) {
      const { data: psubs } = await admin.from("push_subscriptions").select("endpoint,keys").eq("user_id", uid);
      for (const ps of psubs ?? []) {
        const res = await sendPush(ps as any, {
          body: `Your weekly score is ${data.score}/100${data.scoreDelta ? ` (${data.scoreDelta > 0 ? "+" : ""}${data.scoreDelta} this week)` : ""}. Tap to see your trend.`,
          url: "/dashboard",
          tag: "weekly-digest",
        });
        if (res.ok) pushed++;
        if (res.gone) await admin.from("push_subscriptions").delete().eq("endpoint", (ps as any).endpoint);
      }
    }
  }

  return NextResponse.json({ ok: true, members: userIds.length, sent, skipped, failed, pushed });
}

export async function GET(req: Request) { return handle(req); }
export async function POST(req: Request) { return handle(req); }
