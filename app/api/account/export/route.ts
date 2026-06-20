import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** GDPR/CCPA data export — returns ALL of the user's data as a JSON download. */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const [profile, subscriptions, measurements, results, reports, reminders] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id),
    supabase.from("subscriptions").select("*").eq("user_id", user.id),
    supabase.from("measurements").select("*").eq("user_id", user.id),
    supabase.from("risk_results").select("*").eq("user_id", user.id),
    supabase.from("reports").select("*").eq("user_id", user.id),
    supabase.from("reminders").select("*").eq("user_id", user.id),
  ]);

  const payload = {
    exportedAt: new Date().toISOString(),
    account: { id: user.id, email: user.email },
    profile: profile.data,
    subscriptions: subscriptions.data,
    measurements: measurements.data,
    riskResults: results.data,
    reports: reports.data,
    reminders: reminders.data,
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="calqulate-vitals-export.json"`,
    },
  });
}
