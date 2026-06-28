"use client";

import { useState } from "react";
import { Sparkles, PartyPopper, Info, AlertTriangle, ChevronRight } from "lucide-react";
import type { CoachMessage } from "@/lib/glp1/coach";

/**
 * Contextual coaching banner — turns the dashboard from passive into a guide.
 * Presentational only; messages are derived server-side from existing data.
 * Users can step through multiple nudges so it never feels static.
 */
const TONE = {
  success: { wrap: "border-emerald-200 bg-emerald-50", icon: "text-emerald-600", Icon: PartyPopper },
  info: { wrap: "border-sky-200 bg-sky-50", icon: "text-sky-600", Icon: Info },
  warn: { wrap: "border-amber-200 bg-amber-50", icon: "text-amber-600", Icon: AlertTriangle },
} as const;

export function CoachBanner({ messages }: { messages: CoachMessage[] }) {
  const [i, setI] = useState(0);
  if (messages.length === 0) return null;
  const m = messages[Math.min(i, messages.length - 1)];
  const t = TONE[m.tone];

  return (
    <div className={`flex items-start gap-3 rounded-2xl border p-4 sm:p-5 ${t.wrap}`}>
      <span className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ${t.icon}`}>
        <t.Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Your coach</span>
        </div>
        <p className="mt-1 text-sm font-bold text-gray-900">{m.title}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{m.body}</p>
      </div>
      {messages.length > 1 && (
        <button
          onClick={() => setI((v) => (v + 1) % messages.length)}
          className="flex flex-shrink-0 items-center gap-1 self-center rounded-lg px-2 py-1 text-xs font-semibold text-gray-500 hover:bg-white/60 hover:text-gray-800"
          aria-label="Next coaching tip"
        >
          {i + 1}/{messages.length} <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
