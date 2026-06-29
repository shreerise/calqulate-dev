/** Razorpay-specific types */

export interface RazorpayCustomer {
  id: string;
  email: string;
  name?: string;
}

export interface RazorpayPlan {
  id: string;
  period: string;
  interval: number;
  item: {
    amount: number;
    currency: string;
  };
}

export interface RazorpaySubscription {
  id: string;
  customer_id: string;
  plan_id: string;
  status: string;
  current_start?: number;
  current_end?: number;
  ended_at?: number | null;
  charge_at?: number;
  total_count: number;
  paid_count: number;
}

export interface RazorpayWebhookPayload {
  event: string;
  payload: {
    subscription?: { entity: RazorpaySubscription };
    payment?: { entity: Record<string, unknown> };
    order?: { entity: Record<string, unknown> };
  };
  created_at: number;
}

/** Razorpay webhook event types we care about */
export const RAZORPAY_EVENTS = {
  SUBSCRIPTION_CHARGED: "subscription.charged",
  SUBSCRIPTION_CANCELLED: "subscription.cancelled",
  SUBSCRIPTION_UPDATED: "subscription.updated",
  SUBSCRIPTION_PENDING: "subscription.pending",
  SUBSCRIPTION_HALTED: "subscription.halted",
  PAYMENT_FAILED: "payment.failed",
  PAYMENT_CAPTURED: "payment.captured",
} as const;

export type RazorpayEventType = (typeof RAZORPAY_EVENTS)[keyof typeof RAZORPAY_EVENTS];
