"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, handler: () => void) => void };
  }
}

export default function RazorpayCheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();
  const opened = useRef(false);

  useEffect(() => {
    if (opened.current) return;
    const subscriptionId = params.get("subscription_id");
    const key = params.get("key");
    if (!subscriptionId || !key) {
      router.replace("/pricing?checkout_error=Missing+checkout+parameters");
      return;
    }

    opened.current = true;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const rzp = new window.Razorpay({
        key,
        subscription_id: subscriptionId,
        name: "Calqulate",
        description: "Vitals Pro",
        image: "https://calqulate.net/favicon.ico",
        theme: { color: "#059669" },
        handler: () => {
          router.push("/dashboard?checkout=success");
        },
        modal: {
          ondismiss: () => {
            router.push("/pricing?checkout=cancelled");
          },
        },
      });

      rzp.on("payment.failed", () => {
        router.push("/pricing?checkout=cancelled");
      });

      rzp.open();
    };
    document.body.appendChild(script);
  }, [params, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-600" />
        <p className="mt-3 text-sm text-gray-600">Opening payment window…</p>
      </div>
    </div>
  );
}
