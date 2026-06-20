"use client";
import { useState } from "react";

export function BillingButton() {
  const [busy, setBusy] = useState(false);
  async function open() {
    setBusy(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error ?? "No billing account yet.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <button onClick={open} disabled={busy} className="text-sm text-gray-500 hover:text-blue-600 disabled:opacity-60">
      {busy ? "Opening…" : "Manage billing"}
    </button>
  );
}
