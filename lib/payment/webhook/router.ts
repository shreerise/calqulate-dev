import { paymentService } from "../PaymentService";
import { markEventProcessed, logWebhook } from "../utils/idempotency";
import { syncSubscription } from "../SubscriptionService";
import type { Gateway } from "../types/index";

export async function processWebhook(
  gateway: Gateway,
  body: string,
  signature: string,
): Promise<{ received: boolean; status: string }> {
  let normalized;

  try {
    normalized = await paymentService.handleWebhook(gateway, body, signature);
  } catch (err) {
    await logWebhook(gateway, "unknown", null, body, "error", 400, (err as Error).message);
    throw err;
  }

  await logWebhook(gateway, normalized.eventId, normalized.type, body, "received");

  const result = await markEventProcessed(gateway, normalized.eventId, normalized.type, body);

  if (result === "skipped") {
    await logWebhook(gateway, normalized.eventId, normalized.type, body, "skipped");
    return { received: true, status: "skipped" };
  }

  await syncSubscription(normalized);

  await logWebhook(gateway, normalized.eventId, normalized.type, body, "processed");
  return { received: true, status: "processed" };
}
