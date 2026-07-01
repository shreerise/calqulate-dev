import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { paymentService } from "@/lib/payment/PaymentService";
import { rateLimit, clientIp } from "@/lib/security/rateLimit";
import type { Gateway, Tier, Cadence } from "@/lib/payment/types/index";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://calqulate.net";

const schema = z.object({
  gateway: z.enum(["razorpay", "paypal"]),
  tier: z.enum(["free", "pro"]),
  cadence: z.enum(["monthly", "yearly"]),
});

export async function POST(req: Request) {
  try {
    // Rate limit
    const rl = rateLimit(`checkout:${clientIp(req)}`, 15, 60_000);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
      );
    }

    // Validate input
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { gateway, tier, cadence } = parsed.data;

    if (tier === "free") {
      return NextResponse.json({ url: `${SITE}/signup` });
    }

    // Auth check
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const result = await paymentService.createCheckout(gateway as Gateway, {
      userId: user.id,
      userEmail: user.email ?? null,
      tier: tier as Tier,
      cadence: cadence as Cadence,
      successUrl: `${SITE}/calqulate-vitals/welcome`,
      cancelUrl: `${SITE}/pricing?checkout=cancelled`,
    });

    return NextResponse.json({ url: result.url });
  } catch (err) {
    const message = (err as Error)?.message ?? JSON.stringify(err);
    console.error("[checkout] error:", message, err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
