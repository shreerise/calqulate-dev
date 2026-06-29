import { createAdminClient } from "@/lib/supabase/server";
import type { Gateway } from "../types/index";

/**
 * Returns true if this event has already been processed (idempotency check).
 * Inserts a new row if not yet seen. Throws on error.
 */
export async function markEventProcessed(
  gateway: Gateway,
  eventId: string,
  eventType: string | null,
  rawBody: unknown,
): Promise<"processed" | "skipped"> {
  const admin = createAdminClient();

  // Try to insert — the unique constraint on (gateway, event_id) prevents dupes.
  const { error } = await admin.from("webhook_events").insert({
    gateway,
    event_id: eventId,
    event_type: eventType,
    raw_body: rawBody,
    status: "processed",
  });

  if (error) {
    // If it's a unique violation, the event was already processed.
    if (error.code === "23505") {
      return "skipped";
    }
    throw error;
  }

  return "processed";
}

/**
 * Log a webhook event to the audit trail.
 */
export async function logWebhook(
  gateway: Gateway,
  eventId: string,
  eventType: string | null,
  rawBody: unknown,
  status: "received" | "processed" | "skipped" | "error",
  responseStatus?: number,
  errorMessage?: string,
): Promise<void> {
  const admin = createAdminClient();
  await admin.from("webhook_logs").insert({
    gateway,
    event_id: eventId,
    event_type: eventType,
    raw_body: rawBody,
    status,
    response_status: responseStatus,
    error_message: errorMessage,
  });
}
