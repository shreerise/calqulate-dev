import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { paymentService } from "@/lib/payment/PaymentService";
import type { Gateway } from "@/lib/payment/types/index";

/**
 * Permanent account + data deletion (CCPA/GDPR "right to erasure").
 * Removes all health rows, cancels any active payment subscription,
 * then deletes the auth user via the service role.
 */
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const admin = createAdminClient();
  const uid = user.id;

  // Cancel active subscription on the payment gateway before deleting data
  const { data: sub } = await admin
    .from("subscriptions")
    .select("gateway, gateway_subscription_id, status, tier")
    .eq("user_id", uid)
    .maybeSingle();

  if (sub?.gateway_subscription_id && (sub.status === "active" || sub.status === "trialing")) {
    try {
      await paymentService.cancelSubscription(
        (sub.gateway ?? "razorpay") as Gateway,
        sub.gateway_subscription_id,
      );
    } catch {
      // Non-blocking — proceed with account deletion even if cancellation fails
    }
  }

  // Delete all user data (cascading handles child rows, but explicit is safer)
  await admin.from("risk_results").delete().eq("user_id", uid);
  await admin.from("measurements").delete().eq("user_id", uid);
  await admin.from("reports").delete().eq("user_id", uid);
  await admin.from("reminders").delete().eq("user_id", uid);
  await admin.from("glp1_entries").delete().eq("user_id", uid);
  await admin.from("subscriptions").delete().eq("user_id", uid);
  await admin.from("profiles").delete().eq("id", uid);

  await supabase.auth.signOut();
  const { error } = await admin.auth.admin.deleteUser(uid);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
