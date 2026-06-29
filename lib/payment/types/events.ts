/** Normalized webhook event shapes shared across all providers */

import type { Gateway, Tier, SubscriptionStatus } from "./index";

/** Normalized event after provider-specific verification */
export interface NormalizedEvent {
  /** Provider's original event ID (used for idempotency) */
  eventId: string;
  /** Normalized event type */
  type: NormalizedEventType;
  /** Provider name */
  gateway: Gateway;
  /** Gateway-specific customer ID */
  customerId: string;
  /** Gateway-specific subscription ID */
  subscriptionId: string;
  /** Tier inferred from the plan/price */
  tier: Tier;
  /** Subscription status from provider */
  status: SubscriptionStatus;
  /** Period end timestamp (ISO string) */
  currentPeriodEnd: string | null;
  /** Our internal user ID extracted from gateway notes/metadata */
  userId?: string;
  /** Original raw event data */
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
