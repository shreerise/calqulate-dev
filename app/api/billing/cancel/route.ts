import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { paymentService } from "@/lib/payment/PaymentService";
import type { Gateway } from "@/lib/payment/types/index";

/**
 * Cancel the active subscription on the payment gateway and in our DB.
 * The user keeps access until the end of the current billing period.
 */
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const admin = createAdminClient();
  const { data: sub } = await admin
    .from("subscriptions")
    .select("gateway, gateway_subscription_id, status, tier")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!sub) {
    return NextResponse.json({ error: "No active subscription found" }, { status: 400 });
  }

  if (sub.status !== "active" && sub.status !== "trialing") {
    return NextResponse.json({ error: "Subscription is not active" }, { status: 400 });
  }

  try {
    await paymentService.cancelSubscription((sub.gateway ?? "razorpay") as Gateway, sub.gateway_subscription_id!);

    await admin
      .from("subscriptions")
      .update({ status: "canceled", updated_at: new Date().toISOString() })
      .eq("user_id", user.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = (err as Error).message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
