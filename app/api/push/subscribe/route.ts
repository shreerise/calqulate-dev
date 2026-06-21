import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/** Saves a browser push subscription for the signed-in user. */
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const sub = (await req.json()) as { endpoint?: string; keys?: { p256dh: string; auth: string } };
  if (!sub?.endpoint || !sub?.keys) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }

  const { error } = await supabase
    .from("push_subscriptions")
    .upsert({ user_id: user.id, endpoint: sub.endpoint, keys: sub.keys }, { onConflict: "user_id,endpoint" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase
    .from("notification_prefs")
    .upsert({ user_id: user.id, push_enabled: true, updated_at: new Date().toISOString() }, { onConflict: "user_id" });

  return NextResponse.json({ ok: true });
}

/** Removes a subscription (disable push). */
export async function DELETE(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { endpoint } = (await req.json().catch(() => ({}))) as { endpoint?: string };
  if (endpoint) await supabase.from("push_subscriptions").delete().eq("user_id", user.id).eq("endpoint", endpoint);
  await supabase.from("notification_prefs").upsert(
    { user_id: user.id, push_enabled: false, updated_at: new Date().toISOString() },
    { onConflict: "user_id" },
  );
  return NextResponse.json({ ok: true });
}
