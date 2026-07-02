/**
 * Shared subscription business logic called by both webhook handlers.
 * No provider-specific code here — only normalized events.
 */

import { createAdminClient } from "@/lib/supabase/server";
import type { NormalizedEvent } from "@/lib/payment/types/events";

export async function syncSubscription(event: NormalizedEvent): Promise<void> {
  const admin = createAdminClient();
  const patch: Record<string, unknown> = {
    gateway: event.gateway,
    gateway_customer_id: event.customerId,
    gateway_subscription_id: event.subscriptionId,
    tier: event.tier,
    status: event.status,
    current_period_end: event.currentPeriodEnd
      ? new Date(event.currentPeriodEnd).toISOString()
      : null,
    updated_at: new Date().toISOString(),
  };

  if (event.currency) patch.currency = event.currency;
  if (event.country) patch.country = event.country;
  if (event.amount != null) patch.amount = event.amount;

  if (event.userId) {
    const { data: existing } = await admin
      .from("subscriptions")
      .select("user_id")
      .eq("user_id", event.userId)
      .maybeSingle();

    if (existing) {
      await admin.from("subscriptions").update(patch).eq("user_id", event.userId);
      return;
    }
  }

  // Fallback: find by gateway_subscription_id
  const { data: existingBySub } = await admin
    .from("subscriptions")
    .select("user_id")
    .eq("gateway_subscription_id", event.subscriptionId)
    .maybeSingle();

  if (existingBySub?.user_id) {
    await admin.from("subscriptions").update(patch).eq("user_id", existingBySub.user_id);
    return;
  }

  // Fallback: try custom_id from raw payload
  const raw = event.raw as Record<string, unknown>;
  const customId =
    (raw as { custom_id?: string })?.custom_id ??
    (raw as { resource?: { custom_id?: string } })?.resource?.custom_id;

  if (customId) {
    await admin.from("subscriptions").update(patch).eq("user_id", customId);
    return;
  }

  // Last resort: upsert by subscription ID
  await admin.from("subscriptions").upsert(
    { ...patch, gateway_subscription_id: event.subscriptionId },
    { onConflict: "gateway_subscription_id" },
  );
}
