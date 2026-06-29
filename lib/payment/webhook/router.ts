import { createAdminClient } from "@/lib/supabase/server";
import { paymentService } from "../PaymentService";
import { markEventProcessed, logWebhook } from "../utils/idempotency";
import type { Gateway } from "../types/index";
import type { NormalizedEvent } from "../types/events";

/** Shared webhook processing for all gateways */
export async function processWebhook(
  gateway: Gateway,
  body: string,
  signature: string,
): Promise<{ received: boolean; status: string }> {
  let normalized: NormalizedEvent;

  // 1. Verify signature and normalize event
  try {
    normalized = await paymentService.handleWebhook(gateway, body, signature);
  } catch (err) {
    await logWebhook(gateway, "unknown", null, body, "error", 400, (err as Error).message);
    throw err;
  }

  // 2. Log raw receipt
  await logWebhook(
    gateway,
    normalized.eventId,
    normalized.type,
    body,
    "received",
  );

  // 3. Idempotency check
  const result = await markEventProcessed(
    gateway,
    normalized.eventId,
    normalized.type,
    body,
  );

  if (result === "skipped") {
    await logWebhook(
      gateway,
      normalized.eventId,
      normalized.type,
      body,
      "skipped",
    );
    return { received: true, status: "skipped" };
  }

  // 4. Sync subscription in database
  const admin = createAdminClient();
  const patch = {
    gateway,
    gateway_customer_id: normalized.customerId,
    gateway_subscription_id: normalized.subscriptionId,
    tier: normalized.tier,
    status: normalized.status,
    current_period_end: normalized.currentPeriodEnd
      ? new Date(normalized.currentPeriodEnd).toISOString()
      : null,
    updated_at: new Date().toISOString(),
  };

  // Update by our internal user ID if the provider extracted it from notes/metadata
  if (normalized.userId) {
    const { data: existing } = await admin
      .from("subscriptions")
      .select("user_id")
      .eq("user_id", normalized.userId)
      .maybeSingle();

    if (existing) {
      await admin.from("subscriptions").update(patch).eq("user_id", normalized.userId);
      await logWebhook(gateway, normalized.eventId, normalized.type, body, "processed");
      return { received: true, status: "processed" };
    }
  }

  // Fallback: find by gateway_subscription_id
  const { data: existingBySub } = await admin
    .from("subscriptions")
    .select("user_id")
    .eq("gateway_subscription_id", normalized.subscriptionId)
    .maybeSingle();

  if (existingBySub?.user_id) {
    await admin
      .from("subscriptions")
      .update(patch)
      .eq("user_id", existingBySub.user_id);
  } else {
    // Fallback: try custom_id from raw payload (PayPal sets custom_id = userId)
    const raw = normalized.raw as Record<string, unknown>;
    const customId =
      (raw as { custom_id?: string })?.custom_id ??
      (raw as { resource?: { custom_id?: string } })?.resource?.custom_id;

    if (customId) {
      await admin
        .from("subscriptions")
        .update(patch)
        .eq("user_id", customId);
    } else {
      // Last resort: upsert by subscription ID (should not happen for known users)
      await admin.from("subscriptions").upsert(
        { ...patch, gateway_subscription_id: normalized.subscriptionId },
        { onConflict: "gateway_subscription_id" },
      );
    }
  }

  // 5. Log success
  await logWebhook(gateway, normalized.eventId, normalized.type, body, "processed");

  return { received: true, status: "processed" };
}
