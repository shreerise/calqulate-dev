// components/pear-shape/PearOutfitRecommender.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  occasionList,
  getDressesForOccasion,
  type OccasionId,
} from "@/lib/blog/pear-dress-data";

/**
 * Interactive outfit recommendation engine for pear-shape readers.
 * Pick an occasion → see hand-picked dress styles + why they work.
 */
export default function PearOutfitRecommender() {
  const [activeOccasion, setActiveOccasion] = useState<OccasionId>("office");
  const matches = getDressesForOccasion(activeOccasion);
  const active = occasionList.find((o) => o.id === activeOccasion)!;

  return (
    <section className="my-16">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-700">
          Outfit Recommendation Engine
        </span>
        <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
          Pick Your Occasion — Get a Pear-Perfect Outfit
        </h2>
        <p className="mt-2 text-slate-600">
          Tap an occasion below to see dresses hand-picked for your shape.
        </p>
      </div>

      {/* Occasion tabs */}
      <div className="mb-8 flex flex-wrap gap-3">
        {occasionList.map((o) => {
          const isActive = o.id === activeOccasion;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setActiveOccasion(o.id)}
              className={`flex items-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-semibold transition ${
                isActive
                  ? "border-transparent bg-rose-500 text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
              aria-pressed={isActive}
            >
              <span className="text-lg" aria-hidden>
                {o.emoji}
              </span>
              <span>{o.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active occasion summary card */}
      <div className="mb-8 rounded-2xl bg-slate-900 p-6 text-white md:p-8">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{active.emoji}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Selected occasion
            </p>
            <p className="text-xl font-bold md:text-2xl">{active.label}</p>
          </div>
        </div>
        <p className="mt-4 text-slate-300">
          {matches.length} dress {matches.length === 1 ? "style" : "styles"} matched —
          all chosen to balance the pear silhouette for this setting.
        </p>
      </div>

      {/* Matched dress cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {matches.map((d, idx) => (
          <article
            key={d.id}
            className="group overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
            style={{ borderTop: `4px solid ${d.brandColor}` }}
          >
            <div className="flex items-start gap-4 p-6">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  className="object-contain p-2"
                  sizes="80px"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{d.name}</h3>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                    style={{ backgroundColor: d.brandColor }}
                  >
                    {d.fitScore}/100
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{d.why}</p>
                <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
                  <strong>Fabric tip:</strong> {d.fabricTip}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {matches.length === 0 && (
        <p className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">
          No matches found — try a different occasion.
        </p>
      )}
    </section>
  );
}
