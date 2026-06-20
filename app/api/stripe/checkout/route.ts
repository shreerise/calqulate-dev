import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";
import { priceIdFor, type Tier } from "@/lib/stripe/plans";
import { rateLimit, clientIp } from "@/lib/security/rateLimit";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://calqulate.net";

/** Creates a Stripe Checkout Session for a subscription. */
export async function POST(req: Request) {
  const rl = rateLimit(`checkout:${clientIp(req)}`, 15, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  const { tier, cadence } = (await req.json()) as {
    tier: Tier;
    cadence: "monthly" | "yearly";
  };

  const priceId = priceIdFor(tier, cadence);
  if (!priceId) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // Reuse a Stripe customer if we have one.
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  let customerId = sub?.stripe_customer_id ?? undefined;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
    await supabase
      .from("subscriptions")
      .upsert({ user_id: user.id, stripe_customer_id: customerId }, { onConflict: "user_id" });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${SITE}/dashboard?checkout=success`,
    cancel_url: `${SITE}/service/metabolic-health-tracker?checkout=cancelled`,
    metadata: { supabase_user_id: user.id, tier },
    subscription_data: { metadata: { supabase_user_id: user.id, tier } },
  });

  return NextResponse.json({ url: session.url });
}
