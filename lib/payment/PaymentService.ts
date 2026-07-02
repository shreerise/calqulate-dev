import type { PaymentProvider } from "./PaymentProvider";
import type { Gateway, Tier, Cadence } from "./types/index";
import type { NormalizedEvent } from "./types/events";
import { UnknownProviderError } from "./utils/errors";
import { RazorpayProvider } from "./providers/razorpay/RazorpayProvider";
import { PayPalProvider } from "./providers/paypal/PayPalProvider";

/**
 * Unified PaymentService — the ONLY entry point for all payment operations.
 *
 * All consumers (API routes, components) must go through this service,
 * never directly through a provider. To add a new provider:
 *
 *   1. Create providers/paddle/PaddleProvider.ts
 *   2. Import and register here in the constructor
 *
 * No other file in the application needs to change.
 */
export class PaymentService {
  private providers = new Map<Gateway, PaymentProvider>();

  constructor() {
    this.register(new RazorpayProvider());
    this.register(new PayPalProvider());
  }

  private register(provider: PaymentProvider): void {
    this.providers.set(provider.name, provider);
  }

  getProvider(gateway: Gateway): PaymentProvider {
    const provider = this.providers.get(gateway);
    if (!provider) throw new UnknownProviderError(gateway);
    return provider;
  }

  /** Create a checkout session in the chosen gateway */
  async createCheckout(gateway: Gateway, input: {
    userId: string;
    userEmail: string | null;
    tier: Tier;
    cadence: Cadence;
    currency: import("./types/index").Currency;
    country?: string;
    siteUrl?: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ url: string }> {
    const provider = this.getProvider(gateway);
    const result = await provider.createCheckout({
      userId: input.userId,
      userEmail: input.userEmail,
      tier: input.tier,
      cadence: input.cadence,
      currency: input.currency,
      country: input.country,
      siteUrl: input.siteUrl,
      successUrl: input.successUrl,
      cancelUrl: input.cancelUrl,
    });
    return { url: result.url };
  }

  /** Verify webhook and return a normalized event */
  async handleWebhook(gateway: Gateway, body: string, signature: string): Promise<NormalizedEvent> {
    const provider = this.getProvider(gateway);
    return provider.verifyWebhook(body, signature);
  }

  /** Create a billing portal URL */
  async createBillingPortal(gateway: Gateway, customerId: string, returnUrl: string): Promise<string> {
    const provider = this.getProvider(gateway);
    return provider.createBillingPortal({ customerId, returnUrl });
  }

  /** Cancel a subscription on the provider side */
  async cancelSubscription(gateway: Gateway, subscriptionId: string): Promise<void> {
    const provider = this.getProvider(gateway);
    await provider.cancelSubscription(subscriptionId);
  }
}

/** Singleton instance */
export const paymentService = new PaymentService();
