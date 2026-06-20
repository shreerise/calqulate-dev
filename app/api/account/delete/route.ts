import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

/**
 * Permanent account + data deletion (CCPA/GDPR "right to erasure").
 * Removes all health rows, then deletes the auth user via the service role.
 */
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const admin = createAdminClient();
  const uid = user.id;

  // Cascades handle child rows, but delete explicitly for clarity/safety.
  await admin.from("risk_results").delete().eq("user_id", uid);
  await admin.from("measurements").delete().eq("user_id", uid);
  await admin.from("reports").delete().eq("user_id", uid);
  await admin.from("reminders").delete().eq("user_id", uid);
  await admin.from("subscriptions").delete().eq("user_id", uid);
  await admin.from("profiles").delete().eq("id", uid);

  await supabase.auth.signOut();
  const { error } = await admin.auth.admin.deleteUser(uid);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
