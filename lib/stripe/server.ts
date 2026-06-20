import Stripe from "stripe";

/**
 * Stripe is configured during payment setup. Until STRIPE_SECRET_KEY is set we
 * fall back to a harmless placeholder so the SDK can construct at build time
 * (the constructor throws on an empty key). Live API calls will only succeed
 * once a real key is in the environment.
 */
export const stripeConfigured = !!process.env.STRIPE_SECRET_KEY;

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  // Pinned so the webhook keeps `current_period_end` at the subscription level.
  // Cast: the installed SDK's literal type tracks a newer default version.
  apiVersion: "2025-04-30.basil" as any,
  typescript: true,
});
