"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function RefundButton({ subscriptionId, userId, gatewaySubId, gateway }: { subscriptionId: string; userId: string; gatewaySubId: string | null; gateway: string | null }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  async function handleRefund() {
    if (!confirm("Mark this subscription as refunded? This cancels access immediately.\n\nMake sure you've processed the refund in the gateway dashboard first.")) return;

    setBusy(true);
    try {
      const res = await fetch("/api/admin/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId, userId, gatewaySubId, gateway }),
      });
      if (res.ok) {
        setDone(true);
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error ?? "Failed to process refund");
      }
    } catch {
      alert("Network error");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return <span className="text-xs text-gray-400">Refunded</span>;
  }

  return (
    <button
      onClick={handleRefund}
      disabled={busy}
      className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-60"
    >
      {busy ? <Loader2 className="h-3 w-3 animate-spin inline" /> : null}
      {busy ? "..." : "Refund"}
    </button>
  );
}
