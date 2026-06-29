"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { PLANS, type Tier, type Gateway } from "@/lib/payment/types/index";
import { GatewayPicker } from "@/components/payment/GatewayPicker";
import { useCheckout } from "@/hooks/useCheckout";

export function PricingTable() {
  const [cadence, setCadence] = useState<"monthly" | "yearly">("yearly");
  const [gateway, setGateway] = useState<Gateway>("paypal");
  const { loading, error, checkout, retry } = useCheckout();
  const [activeTier, setActiveTier] = useState<Tier | null>(null);

  async function subscribe(tier: Tier) {
    if (tier === "free") {
      window.location.href = "/signup";
      return;
    }
    setActiveTier(tier);
    await checkout(gateway, tier, cadence);
    setActiveTier(null);
  }

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-lg border border-gray-200 p-1">
          {(["monthly", "yearly"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCadence(c)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium ${
                cadence === c ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            >
              {c === "yearly" ? "Yearly (save ~34%)" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 flex justify-center">
        <div className="w-full max-w-sm">
          <GatewayPicker gateway={gateway} onChange={setGateway} disabled={loading} />
        </div>
      </div>

      {error && (
        <div className="mb-4 mx-auto max-w-md rounded-lg bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
          <button onClick={retry} className="mt-1 text-xs font-semibold text-red-700 hover:underline">
            Try again
          </button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((p) => {
          const price = cadence === "yearly" ? p.priceYearly : p.priceMonthly;
          const featured = p.tier === "plus";
          const isBusy = loading && activeTier === p.tier;
          return (
            <div
              key={p.tier}
              className={`flex flex-col rounded-2xl border p-6 ${
                featured ? "border-blue-600 shadow-lg" : "border-gray-200"
              }`}
            >
              {featured && (
                <span className="mb-2 inline-block w-fit rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-extrabold">${price}</span>
                <span className="text-gray-500">
                  {p.tier === "free" ? "" : cadence === "yearly" ? "/yr" : "/mo"}
                </span>
              </div>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-gray-700">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-blue-600">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => subscribe(p.tier)}
                disabled={isBusy}
                className={`mt-6 rounded-lg px-4 py-2.5 font-semibold inline-flex items-center justify-center gap-2 ${
                  featured
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-gray-300 hover:bg-gray-50"
                } disabled:opacity-60`}
              >
                {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isBusy ? "Redirecting\u2026" : p.cta}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
