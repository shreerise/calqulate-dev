/** Subscription catalog. Price IDs come from your Stripe dashboard (env). */
export type Tier = "free" | "plus" | "pro";

export interface Plan {
  tier: Tier;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
  features: string[];
  cta: string;
}

export const PLANS: Plan[] = [
  {
    tier: "free",
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "All Calqulate calculators",
      "One-time metabolic health snapshot",
      "No saved history",
    ],
    cta: "Start free",
  },
  {
    tier: "plus",
    name: "Vitals Plus",
    priceMonthly: 9.99,
    priceYearly: 79,
    stripePriceIdMonthly: process.env.STRIPE_PRICE_PLUS_MONTHLY,
    stripePriceIdYearly: process.env.STRIPE_PRICE_PLUS_YEARLY,
    features: [
      "Saved measurement history",
      "Metabolic Health Score + trend dashboard",
      "Personalized 'next lever' protocol",
      "Re-measure & milestone reminders",
    ],
    cta: "Get Vitals Plus",
  },
  {
    tier: "pro",
    name: "Vitals Pro",
    priceMonthly: 14.99,
    priceYearly: 119,
    stripePriceIdMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
    stripePriceIdYearly: process.env.STRIPE_PRICE_PRO_YEARLY,
    features: [
      "Everything in Plus",
      "Doctor-shareable PDF reports",
      "Full lab-value tracking (A1c, lipids)",
      "Priority access to new risk engines",
    ],
    cta: "Get Vitals Pro",
  },
];

export function priceIdFor(tier: Tier, cadence: "monthly" | "yearly"): string | undefined {
  const plan = PLANS.find((p) => p.tier === tier);
  if (!plan) return undefined;
  return cadence === "monthly" ? plan.stripePriceIdMonthly : plan.stripePriceIdYearly;
}

export function tierForPriceId(priceId: string): Tier {
  for (const p of PLANS) {
    if (p.stripePriceIdMonthly === priceId || p.stripePriceIdYearly === priceId) return p.tier;
  }
  return "free";
}
