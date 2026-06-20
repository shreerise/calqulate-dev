import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createAdminClient } from "@/lib/supabase/server";
import { tierForPriceId } from "@/lib/stripe/plans";
import type Stripe from "stripe";

/**
 * Stripe webhook — keeps the subscriptions table in sync.
 * Excluded from auth middleware. Set STRIPE_WEBHOOK_SECRET in env.
 * Configure endpoint in Stripe: /api/stripe/webhook
 */
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: `Webhook signature failed: ${(err as Error).message}` }, { status: 400 });
  }

  const admin = createAdminClient();

  async function syncSubscription(sub: Stripe.Subscription) {
    const userId = sub.metadata?.supabase_user_id;
    const priceId = sub.items.data[0]?.price.id ?? "";
    const tier = tierForPriceId(priceId);
    const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;

    const patch = {
      stripe_subscription_id: sub.id,
      stripe_customer_id: customerId,
      tier: ["active", "trialing"].includes(sub.status) ? tier : "free",
      status: sub.status,
      current_period_end: new Date((sub as any).current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (userId) {
      await admin.from("subscriptions").upsert({ user_id: userId, ...patch }, { onConflict: "user_id" });
    } else {
      await admin.from("subscriptions").update(patch).eq("stripe_customer_id", customerId);
    }
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.subscription) {
        const sub = await stripe.subscriptions.retrieve(session.subscription as string);
        if (!sub.metadata?.supabase_user_id && session.metadata?.supabase_user_id) {
          sub.metadata = { ...sub.metadata, supabase_user_id: session.metadata.supabase_user_id };
        }
        await syncSubscription(sub);
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      await syncSubscription(event.data.object as Stripe.Subscription);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
