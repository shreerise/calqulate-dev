import { NextResponse } from "next/server";
import { processWebhook } from "@/lib/payment/webhook/router";
import { InvalidWebhookError } from "@/lib/payment/utils/errors";

/**
 * Razorpay webhook handler.
 *
 * Configure in Razorpay Dashboard → Settings → Webhooks:
 *   URL: https://calqulate.net/api/webhooks/razorpay
 *   Events: subscription.charged, subscription.cancelled,
 *           subscription.updated, subscription.pending,
 *           subscription.halted, payment.failed
 *
 * Set RAZORPAY_WEBHOOK_SECRET in environment variables.
 */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";

  try {
    const result = await processWebhook("razorpay", body, signature);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message = (err as Error).message;
    const status = err instanceof InvalidWebhookError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
