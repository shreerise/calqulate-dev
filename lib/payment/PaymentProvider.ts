import type { Tier, Cadence, Gateway } from "./types/index";
import type { NormalizedEvent } from "./types/events";

/** Input to create a checkout session */
export interface CreateCheckoutInput {
  userId: string;
  userEmail: string | null;
  tier: Tier;
  cadence: Cadence;
  successUrl: string;
  cancelUrl: string;
}

/** Result of creating a checkout session */
export interface CheckoutResult {
  url: string;
  sessionId: string;
}

/** Input to create a billing portal session */
export interface BillingPortalInput {
  customerId: string;
  returnUrl: string;
}

/** Subscription details from the provider */
export interface ProviderSubscription {
  status: string;
  currentPeriodEnd: Date | null;
  tier: Tier;
}

/**
 * Every payment provider must implement this interface.
 * To add a new provider (e.g. Paddle, Dodo, Lemon Squeezy),
 * create a new class implementing PaymentProvider and register it
 * in PaymentService.
 */
export interface PaymentProvider {
  readonly name: Gateway;

  /** Create a checkout session and return the redirect URL */
  createCheckout(input: CreateCheckoutInput): Promise<CheckoutResult>;

  /** Create a billing portal URL for self-serve management */
  createBillingPortal(input: BillingPortalInput): Promise<string>;

  /** Verify webhook signature and return a normalized event */
  verifyWebhook(body: string, signature: string): Promise<NormalizedEvent>;

  /** Cancel a subscription on the provider side */
  cancelSubscription(subscriptionId: string): Promise<void>;

  /** Get or create a customer in the provider's system */
  getOrCreateCustomer(userId: string, email: string): Promise<string>;

  /** Fetch subscription details from the provider */
  getSubscription(subscriptionId: string): Promise<ProviderSubscription>;
}
