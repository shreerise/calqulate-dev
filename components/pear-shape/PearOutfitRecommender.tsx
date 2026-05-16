"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  occasionList,
  getDressesForOccasion,
  type OccasionId,
} from "@/lib/blog/pear-dress-data";

export default function PearOutfitRecommender() {
  const [activeOccasion, setActiveOccasion] = useState<OccasionId>("office");
  const [activeDressIdx, setActiveDressIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  const matches = getDressesForOccasion(activeOccasion);
  const active = occasionList.find((o) => o.id === activeOccasion)!;
  const activeDress = matches[activeDressIdx] ?? matches[0];

  const handleOccasionChange = useCallback((id: OccasionId) => {
    setActiveOccasion(id);
    setActiveDressIdx(0);
  }, []);

  const handleDressSelect = useCallback((idx: number) => {
    setActiveDressIdx(idx);
  }, []);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  return (
    <section className="my-16 font-sans">
      {/* ── Header ── */}
      <div className="mb-8">
        <span className="inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-700">
          Outfit Recommendation Engine
        </span>
        <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
          Pick Your Occasion — Get a Pear-Perfect Outfit
        </h2>
        <p className="mt-2 text-slate-500">
          Choose an occasion, then tap a dress style to preview it.
        </p>
      </div>

      {/* ── Occasion tabs ── */}
      <div className="mb-8 flex flex-wrap gap-3">
        {occasionList.map((o) => {
          const isActive = o.id === activeOccasion;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => handleOccasionChange(o.id)}
              aria-pressed={isActive}
              className={`flex items-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "border-transparent bg-rose-500 text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-lg" aria-hidden>{o.emoji}</span>
              <span>{o.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main Panel: Left list + Right image ── */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* ── LEFT: Dress selector list ── */}
          <div className="flex flex-col divide-y divide-slate-100 border-r border-slate-100">
            {/* Occasion label */}
            <div className="flex items-center gap-3 bg-slate-900 px-6 py-4">
              <span className="text-3xl">{active.emoji}</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Occasion
                </p>
                <p className="text-base font-bold text-white">{active.label}</p>
              </div>
            </div>

            {/* Dress option rows */}
            {matches.map((d, idx) => {
              const isSelected = idx === activeDressIdx;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => handleDressSelect(idx)}
                  className={`group w-full text-left transition-all duration-200 focus:outline-none ${
                    isSelected
                      ? "bg-rose-50"
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-4 px-6 py-5">
                    {/* Color accent bar */}
                    <div
                      className="mt-1 h-full w-1 shrink-0 self-stretch rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: isSelected ? d.brandColor : "transparent",
                        minHeight: "48px",
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      {/* Name + score */}
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-sm font-bold leading-tight transition-colors ${
                            isSelected ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                          }`}
                        >
                          {d.name}
                        </p>
                        <span
                          className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                          style={{ backgroundColor: d.brandColor }}
                        >
                          {d.fitScore}/100
                        </span>
                      </div>

                      {/* Why text */}
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {d.why}
                      </p>

                      {/* Fabric tip — visible only when selected */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isSelected ? "mt-3 max-h-24 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-[11px] leading-relaxed text-emerald-800">
                          <strong>Fabric tip:</strong> {d.fabricTip}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Empty state */}
            {matches.length === 0 && (
              <div className="flex flex-1 items-center justify-center p-8 text-sm text-slate-400">
                No styles found — try a different occasion.
              </div>
            )}
          </div>

          {/* ── RIGHT: Full dress image ── */}
          <div className="relative flex items-center justify-center bg-slate-50 md:min-h-[480px]">
            {activeDress ? (
              <>
                {/* Clickable image area */}
                <button
                  type="button"
                  onClick={openLightbox}
                  onMouseEnter={() => setImageHovered(true)}
                  onMouseLeave={() => setImageHovered(false)}
                  className="group relative flex h-full w-full cursor-zoom-in items-center justify-center p-6 md:p-10 focus:outline-none"
                  aria-label={`View ${activeDress.name} full size`}
                >
                  {/* Accent border that matches brand color */}
                  <div
                    className="absolute inset-0 rounded-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${activeDress.brandColor}18 0%, transparent 60%)`,
                    }}
                  />

                  {/* The image */}
                  <div className="relative h-72 w-full md:h-96">
                    <Image
                      src={activeDress.image}
                      alt={activeDress.name}
                      fill
                      className="object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>

                  {/* Expand icon — top-right corner, shows on hover */}
                  <div
                    className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm ring-1 ring-slate-200 transition-all duration-200 ${
                      imageHovered
                        ? "scale-100 opacity-100"
                        : "scale-75 opacity-0"
                    }`}
                    aria-hidden
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-slate-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </div>
                </button>

                {/* Dress name label at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-white/80 px-5 py-3 backdrop-blur-sm">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Selected style
                    </p>
                    <p className="text-sm font-bold text-slate-900">{activeDress.name}</p>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: activeDress.brandColor }}
                  >
                    {activeDress.fitScore}/100
                  </span>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-400">Select a style from the left</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && activeDress && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeDress.name} full view`}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image container — stop propagation so clicking image doesn't close */}
          <div
            className="relative mx-4 flex max-h-[90vh] max-w-lg w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[65vh] w-full bg-slate-50">
              <Image
                src={activeDress.image}
                alt={activeDress.name}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 90vw, 512px"
                priority
              />
            </div>
            {/* Info strip */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <div>
                <p className="font-bold text-slate-900">{activeDress.name}</p>
                <p className="text-xs text-slate-500">{activeDress.why}</p>
              </div>
              <span
                className="rounded-full px-3 py-1 text-sm font-bold text-white"
                style={{ backgroundColor: activeDress.brandColor }}
              >
                {activeDress.fitScore}/100
              </span>
            </div>
            <div className="border-t border-slate-100 bg-emerald-50 px-6 py-3">
              <p className="text-xs text-emerald-800">
                <strong>Fabric tip:</strong> {activeDress.fabricTip}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}