import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/** GET current notification preferences. */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const { data } = await supabase.from("notification_prefs").select("push_enabled,email_weekly").eq("user_id", user.id).maybeSingle();
  return NextResponse.json({ push_enabled: data?.push_enabled ?? false, email_weekly: data?.email_weekly ?? true });
}

/** Update notification preferences. */
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = (await req.json()) as { email_weekly?: boolean; push_enabled?: boolean };
  const patch: Record<string, unknown> = { user_id: user.id, updated_at: new Date().toISOString() };
  if (typeof body.email_weekly === "boolean") patch.email_weekly = body.email_weekly;
  if (typeof body.push_enabled === "boolean") patch.push_enabled = body.push_enabled;

  const { error } = await supabase.from("notification_prefs").upsert(patch, { onConflict: "user_id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
