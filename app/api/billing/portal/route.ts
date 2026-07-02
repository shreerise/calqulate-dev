import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { paymentService } from "@/lib/payment/PaymentService";
import type { Gateway } from "@/lib/payment/types/index";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://calqulate.net";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const admin = createAdminClient();
  const { data: sub } = await admin
    .from("subscriptions")
    .select("gateway, gateway_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!sub?.gateway_customer_id) {
    return NextResponse.json({ error: "No billing account" }, { status: 400 });
  }



  try {
    const url = await paymentService.createBillingPortal((sub.gateway ?? "razorpay") as Gateway, sub.gateway_customer_id, `${SITE}/dashboard`);
    return NextResponse.json({ url });
  } catch (err) {
    const message = (err as Error).message;
    // For providers without a hosted portal, return a helpful message
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
