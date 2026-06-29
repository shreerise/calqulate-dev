/** PayPal-specific types for the Subscriptions API */

export interface PayPalAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface PayPalWebhookEvent {
  id: string;
  event_type: string;
  resource: {
    id: string;
    status?: string;
    subscriber?: {
      email_address?: string;
      payer_id?: string;
    };
    plan_id?: string;
    billing_info?: {
      next_billing_time?: string;
      last_payment?: {
        time?: string;
      };
    };
    custom_id?: string;
    [key: string]: unknown;
  };
  create_time: string;
}

export interface PayPalSubscriptionDetails {
  id: string;
  status: string;
  plan_id: string;
  subscriber: {
    email_address: string;
    payer_id: string;
  };
  billing_info?: {
    next_billing_time: string;
    last_payment?: {
      time: string;
    };
  };
  create_time: string;
  custom_id: string;
}

/** PayPal subscription statuses */
export const PAYPAL_STATUS_MAP: Record<string, string> = {
  APPROVAL_PENDING: "trialing",
  APPROVED: "trialing",
  ACTIVE: "active",
  SUSPENDED: "past_due",
  CANCELLED: "canceled",
  EXPIRED: "inactive",
};

/** PayPal webhook event types we care about */
export const PAYPAL_WEBHOOK_EVENTS = [
  "BILLING.SUBSCRIPTION.CREATED",
  "BILLING.SUBSCRIPTION.ACTIVATED",
  "BILLING.SUBSCRIPTION.UPDATED",
  "BILLING.SUBSCRIPTION.CANCELLED",
  "BILLING.SUBSCRIPTION.SUSPENDED",
  "BILLING.SUBSCRIPTION.PAYMENT.FAILED",
  "PAYMENT.SALE.COMPLETED",
] as const;

export type PayPalWebhookEventType = (typeof PAYPAL_WEBHOOK_EVENTS)[number];
