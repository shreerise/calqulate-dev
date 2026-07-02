/** Normalized webhook event shapes shared across all providers */

import type { Gateway, Tier, SubscriptionStatus, Currency } from "./index";

/** Normalized event after provider-specific verification */
export interface NormalizedEvent {
  eventId: string;
  type: NormalizedEventType;
  gateway: Gateway;
  customerId: string;
  subscriptionId: string;
  tier: Tier;
  status: SubscriptionStatus;
  currentPeriodEnd: string | null;
  userId?: string;
  currency?: Currency;
  country?: string;
  amount?: number;
  raw: unknown;
}

export type NormalizedEventType =
  | "subscription.created"
  | "subscription.updated"
  | "subscription.cancelled"
  | "subscription.activated"
  | "payment.succeeded"
  | "payment.failed"
  | "checkout.completed";

/** Result of processing a normalized event */
export interface EventProcessingResult {
  handled: boolean;
  subscriptionUpdated: boolean;
}

/** Database row for webhook idempotency tracking */
export interface WebhookEventRow {
  id: string;
  gateway: Gateway;
  event_id: string;
  event_type: string | null;
  raw_body: unknown;
  status: "processed" | "skipped" | "error";
  error_message: string | null;
  created_at: string;
}
