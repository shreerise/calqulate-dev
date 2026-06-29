"use client";
import { useState } from "react";
import { CreditCard } from "lucide-react";

export function BillingButton({
  className,
  labelClassName,
  withIcon = false,
}: {
  className?: string;
  labelClassName?: string;
  withIcon?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  async function open() {
    setBusy(true);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error ?? "No billing account yet. Contact support for help.");
    } catch {
      alert("Could not open billing portal. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <button
      onClick={open}
      disabled={busy}
      className={className ?? "text-sm text-gray-500 hover:text-emerald-600 disabled:opacity-60"}
    >
      {withIcon && <CreditCard className="h-4 w-4 shrink-0" />}
      <span className={labelClassName}>{busy ? "Opening..." : "Manage billing"}</span>
    </button>
  );
}
