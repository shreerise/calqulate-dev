/** Typed error classes for the payment module */

export class PaymentError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
  ) {
    super(message);
    this.name = "PaymentError";
  }
}

export class ProviderNotConfiguredError extends PaymentError {
  constructor(provider: string) {
    super(
      `${provider} is not configured. Check environment variables.`,
      "PROVIDER_NOT_CONFIGURED",
      500,
    );
    this.name = "ProviderNotConfiguredError";
  }
}

export class UnknownProviderError extends PaymentError {
  constructor(gateway: string) {
    super(`Unknown payment gateway: ${gateway}`, "UNKNOWN_PROVIDER", 400);
    this.name = "UnknownProviderError";
  }
}

export class InvalidWebhookError extends PaymentError {
  constructor(message: string) {
    super(`Webhook verification failed: ${message}`, "INVALID_WEBHOOK", 400);
    this.name = "InvalidWebhookError";
  }
}

export class CheckoutError extends PaymentError {
  constructor(message: string, statusCode: number = 400) {
    super(message, "CHECKOUT_ERROR", statusCode);
    this.name = "CheckoutError";
  }
}

export class BillingPortalError extends PaymentError {
  constructor(message: string = "Billing portal unavailable") {
    super(message, "BILLING_PORTAL_ERROR", 400);
    this.name = "BillingPortalError";
  }
}

export class SubscriptionActionError extends PaymentError {
  constructor(action: string, details: string) {
    super(
      `Failed to ${action}: ${details}`,
      "SUBSCRIPTION_ACTION_ERROR",
      500,
    );
    this.name = "SubscriptionActionError";
  }
}
