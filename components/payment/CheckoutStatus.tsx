"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function CheckoutStatus() {
  const params = useSearchParams();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    const checkout = params.get("checkout");
    if (checkout === "success") {
      done.current = true;
      toast.success("Payment successful! Welcome to Vitals Pro.");
    } else if (checkout === "cancelled") {
      done.current = true;
      toast.info("Checkout cancelled. No charges were made.");
    }

    const error = params.get("checkout_error");
    if (error) {
      done.current = true;
      toast.error(error);
    }
  }, [params]);

  return null;
}
