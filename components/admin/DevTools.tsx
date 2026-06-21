"use client";
import { useState } from "react";

export function DevTools() {
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function run(action: string, confirmText?: string) {
    if (confirmText && !confirm(confirmText)) return;
    setBusy(action);
    setMsg(null);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(`❌ ${data.error ?? "Failed."}`);
        return;
      }
      setMsg(action === "seed-demo" ? `✅ Seeded ${data.inserted} weekly measurements. Open your dashboard.` : "✅ Done.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          title="Grant myself Pro"
          desc="Set your own subscription to Pro/active so every paid surface unlocks (you already have admin bypass, this just makes it explicit)."
          btn="Grant Pro"
          busy={busy === "grant-pro"}
          onClick={() => run("grant-pro")}
        />
        <Card
          title="Seed demo data"
          desc="Insert 8 weeks of improving measurements on your account so the trajectory engine and next-lever simulator show real output."
          btn="Seed 8 weeks"
          busy={busy === "seed-demo"}
          onClick={() => run("seed-demo")}
          accent
        />
        <Card
          title="Reset my Vitals data"
          desc="Delete your own measurements and risk results to start fresh. Does not touch your account."
          btn="Reset data"
          busy={busy === "reset-demo"}
          onClick={() => run("reset-demo", "Delete all your measurements and risk results?")}
          danger
        />
      </div>

      {msg && <p className="text-sm font-medium text-gray-700">{msg}</p>}

      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-700">Test the paid features (no payment needed)</h3>
        <p className="mt-1 text-sm text-gray-500">As an admin you already have full Pro access. Open these to test:</p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <a href="/dashboard" className="rounded-lg border border-emerald-200 px-3 py-1.5 font-medium text-emerald-700 hover:bg-emerald-50">Dashboard (trajectory + levers)</a>
          <a href="/dashboard/history" className="rounded-lg border border-emerald-200 px-3 py-1.5 font-medium text-emerald-700 hover:bg-emerald-50">Measurement history</a>
          <a href="/api/vitals/report" className="rounded-lg border border-emerald-200 px-3 py-1.5 font-medium text-emerald-700 hover:bg-emerald-50">Download doctor PDF</a>
          <a href="/dashboard/settings" className="rounded-lg border border-emerald-200 px-3 py-1.5 font-medium text-emerald-700 hover:bg-emerald-50">Export / delete my data</a>
        </div>
      </div>
    </div>
  );
}

function Card({
  title, desc, btn, busy, onClick, accent, danger,
}: {
  title: string; desc: string; btn: string; busy: boolean; onClick: () => void; accent?: boolean; danger?: boolean;
}) {
  const color = danger
    ? "bg-red-600 hover:bg-red-700"
    : accent
    ? "bg-emerald-600 hover:bg-emerald-700"
    : "bg-gray-900 hover:bg-black";
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 flex-1 text-sm text-gray-500">{desc}</p>
      <button
        onClick={onClick}
        disabled={busy}
        className={`mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 ${color}`}
      >
        {busy ? "Working…" : btn}
      </button>
    </div>
  );
}
