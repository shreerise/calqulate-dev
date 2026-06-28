"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

/** Smooth height-animated accordion; first item open by default. */
export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_3px_rgba(15,23,42,.06)]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-brand-50/40 sm:px-6"
            >
              <span className="text-[15px] font-semibold text-ink sm:text-base">{it.q}</span>
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div className={`grid px-5 transition-all duration-300 ease-out sm:px-6 ${isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="text-[15px] leading-relaxed text-copy">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
