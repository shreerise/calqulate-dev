import { NextResponse } from "next/server";
import { processWebhook } from "@/lib/payment/webhook/router";
import { InvalidWebhookError } from "@/lib/payment/utils/errors";

/**
 * PayPal webhook handler.
 *
 * Configure in PayPal Developer Dashboard:
 *   URL: https://calqulate.net/api/webhooks/paypal
 *   Events: BILLING.SUBSCRIPTION.CREATED, BILLING.SUBSCRIPTION.ACTIVATED,
 *           BILLING.SUBSCRIPTION.UPDATED, BILLING.SUBSCRIPTION.CANCELLED,
 *           BILLING.SUBSCRIPTION.SUSPENDED, BILLING.SUBSCRIPTION.PAYMENT.FAILED,
 *           PAYMENT.SALE.COMPLETED
 *
 * Set PAYPAL_WEBHOOK_ID in environment variables.
 * PayPal sends multiple headers for verification — we pass them all as a JSON string
 * in the `signature` parameter for the router to verify.
 */
export async function POST(req: Request) {
  const body = await req.text();

  // Collect all PayPal verification headers
  const signature = JSON.stringify({
    "PAYPAL-AUTH-ALGO": req.headers.get("paypal-auth-algo") ?? "",
    "PAYPAL-CERT-URL": req.headers.get("paypal-cert-url") ?? "",
    "PAYPAL-TRANSMISSION-ID": req.headers.get("paypal-transmission-id") ?? "",
    "PAYPAL-TRANSMISSION-SIG": req.headers.get("paypal-transmission-sig") ?? "",
    "PAYPAL-TRANSMISSION-TIME": req.headers.get("paypal-transmission-time") ?? "",
  });

  try {
    const result = await processWebhook("paypal", body, signature);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message = (err as Error).message;
    const status = err instanceof InvalidWebhookError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
