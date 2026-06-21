import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { emailConfigured, sendEmail } from "@/lib/email/mailer";
import { buildDigestData, renderWeeklyDigestHtml } from "@/lib/email/weeklyDigest";

export const runtime = "nodejs";

/** Send the weekly digest to the signed-in user immediately (manual test). */
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (!emailConfigured()) {
    return NextResponse.json({ error: "Email isn't configured yet. Add SUPPORT_SMTP_* to .env.local." }, { status: 503 });
  }

  const { data: rows } = await supabase
    .from("risk_results")
    .select("composite_score,composite_grade,ascvd_percent,diabetes_percent,heart_age,report_json,computed_at")
    .eq("user_id", user.id)
    .order("computed_at", { ascending: true })
    .limit(20);

  const data = buildDigestData((rows ?? []) as any, user.email);
  if (!data) return NextResponse.json({ error: "No saved measurements yet — add one first." }, { status: 400 });

  try {
    await sendEmail({
      to: user.email,
      subject: `Your weekly Calqulate update — score ${data.score}`,
      html: renderWeeklyDigestHtml(data),
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, sentTo: user.email });
}
