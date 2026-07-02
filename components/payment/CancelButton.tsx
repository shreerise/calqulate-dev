"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function CancelButton() {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function cancel() {
    setBusy(true);
    try {
      const res = await fetch("/api/billing/cancel", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        toast.success("Subscription cancelled. You keep access until the end of the billing period.");
        router.refresh();
      } else {
        toast.error(data.error ?? "Failed to cancel subscription.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setBusy(false);
      setConfirming(false);
    }
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium"
      >
        Cancel subscription
      </button>
    );
  }

  return (
    <div className="mt-4 space-y-2 rounded-lg border border-red-200 bg-red-50/50 p-3">
      <p className="text-sm text-red-700">
        Are you sure? You will keep access until the end of the current billing period.
      </p>
      <div className="flex gap-2">
        <button
          onClick={cancel}
          disabled={busy}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-3 w-3 animate-spin inline" /> : null}
          {busy ? "Cancelling…" : "Yes, cancel"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={busy}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 disabled:opacity-60"
        >
          Keep plan
        </button>
      </div>
    </div>
  );
}
