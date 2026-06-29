"use client";

import { CreditCard, Landmark } from "lucide-react";
import type { Gateway } from "@/lib/payment/types/index";

/** Shown when the user is NOT logged in — redirects to signup instead of checkout */
interface GatewayPickerProps {
  gateway: Gateway;
  onChange: (g: Gateway) => void;
  disabled?: boolean;
}

const GATEWAYS: { key: Gateway; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    key: "paypal",
    label: "PayPal",
    icon: (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
        <CreditCard className="h-4 w-4" />
      </span>
    ),
    desc: "Pay with PayPal, credit or debit card — worldwide",
  },
  {
    key: "razorpay",
    label: "Razorpay",
    icon: (
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
        <Landmark className="h-4 w-4" />
      </span>
    ),
    desc: "Pay with UPI, card, netbanking or wallet",
  },
];

export function GatewayPicker({ gateway, onChange, disabled }: GatewayPickerProps) {
  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="text-sm font-medium text-gray-700">Pay with</legend>
      <div className="grid grid-cols-2 gap-2">
        {GATEWAYS.map((g) => {
          const active = gateway === g.key;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => onChange(g.key)}
              disabled={disabled}
              className={`flex items-center gap-2.5 rounded-xl border-2 p-3 text-left transition-all min-h-[44px] ${
                active
                  ? "border-emerald-500 bg-emerald-50/60 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              } disabled:opacity-60`}
              aria-pressed={active}
            >
              {g.icon}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900">{g.label}</div>
                <div className="text-[11px] text-gray-500 leading-tight">{g.desc}</div>
              </div>
              {active && (
                <span className="h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
