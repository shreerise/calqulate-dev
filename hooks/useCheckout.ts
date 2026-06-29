"use client";

import { useState, useCallback } from "react";
import type { Gateway, Tier, Cadence } from "@/lib/payment/types/index";

interface UseCheckoutOptions {
  onError?: (message: string) => void;
  onRedirect?: (url: string) => void;
}

interface UseCheckoutReturn {
  loading: boolean;
  error: string | null;
  checkout: (gateway: Gateway, tier: Tier, cadence: Cadence) => Promise<void>;
  retry: () => void;
  lastAttempt: { gateway: Gateway; tier: Tier; cadence: Cadence } | null;
}

export function useCheckout(options: UseCheckoutOptions = {}): UseCheckoutReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAttempt, setLastAttempt] = useState<{ gateway: Gateway; tier: Tier; cadence: Cadence } | null>(null);

  const checkout = useCallback(
    async (gateway: Gateway, tier: Tier, cadence: Cadence) => {
      setLoading(true);
      setError(null);
      setLastAttempt({ gateway, tier, cadence });

      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gateway, tier, cadence }),
        });

        const data = await res.json().catch(() => ({}));

        if (data.url) {
          options.onRedirect?.(data.url);
          window.location.href = data.url;
          return;
        }

        if (res.status === 401) {
          window.location.href = `/signup?next=/pricing`;
          return;
        }

        const msg = data.error ?? "Could not start checkout. Please try again.";
        setError(msg);
        options.onError?.(msg);
      } catch {
        const msg = "Could not start checkout. Please try again.";
        setError(msg);
        options.onError?.(msg);
      } finally {
        setLoading(false);
      }
    },
    [options],
  );

  const retry = useCallback(() => {
    if (lastAttempt) {
      checkout(lastAttempt.gateway, lastAttempt.tier, lastAttempt.cadence);
    }
  }, [lastAttempt, checkout]);

  return { loading, error, checkout, retry, lastAttempt };
}
