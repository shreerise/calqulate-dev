// components/jeans/JeansFitFinder.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import {
  jeansCards,
  type Gender,
  type BodyShape,
  type FitType,
  type Rise,
  type StyleGoal,
  type JeansCard,
} from "@/lib/blog/jeans-fit-data";

/**
 * Jeans Fit Finder Dashboard
 *
 * Self-contained interactive dashboard. Lets users pick:
 *   - Gender (women / men)
 *   - Body shape (auto-filtered by gender)
 *   - Fit type, rise, style goal
 * Then renders matching jeans cards with image zoom & full-screen lightbox.
 *
 * Brand color: emerald-600 (green).
 * No external state, no API — fully client-side, mobile responsive.
 */

type FilterState = {
  gender: Gender;
  bodyShape: BodyShape | "any";
  fit: FitType | "any";
  rise: Rise | "any";
  goal: StyleGoal | "any";
};

const WOMEN_SHAPES: { id: BodyShape; label: string }[] = [
  { id: "pear", label: "Pear" },
  { id: "apple", label: "Apple" },
  { id: "hourglass", label: "Hourglass" },
  { id: "rectangle", label: "Rectangle" },
  { id: "inverted-triangle", label: "Inverted Triangle" },
  { id: "petite", label: "Petite" },
  { id: "curvy", label: "Curvy" },
  { id: "tall-women", label: "Tall" },
];

const MEN_SHAPES: { id: BodyShape; label: string }[] = [
  { id: "slim-men", label: "Slim Build" },
  { id: "athletic-men", label: "Athletic" },
  { id: "broad-upper", label: "Broad Upper Body" },
  { id: "stocky-men", label: "Stocky Build" },
  { id: "tall-men", label: "Tall" },
  { id: "shorter-men", label: "Shorter Build" },
  { id: "larger-thighs", label: "Larger Thighs" },
];

const FITS: { id: FitType; label: string }[] = [
  { id: "skinny", label: "Skinny" },
  { id: "slim", label: "Slim" },
  { id: "straight", label: "Straight" },
  { id: "slim-straight", label: "Slim Straight" },
  { id: "bootcut", label: "Bootcut" },
  { id: "wide-leg", label: "Wide Leg" },
  { id: "relaxed", label: "Relaxed" },
  { id: "tapered", label: "Tapered" },
  { id: "athletic", label: "Athletic" },
  { id: "mom", label: "Mom" },
  { id: "flared", label: "Flared" },
  { id: "boyfriend", label: "Boyfriend" },
];

const RISES: { id: Rise; label: string }[] = [
  { id: "low", label: "Low Rise" },
  { id: "mid", label: "Mid Rise" },
  { id: "high", label: "High Rise" },
  { id: "ultra-high", label: "Ultra-High Rise" },
];

const GOALS: { id: StyleGoal; label: string }[] = [
  { id: "look-taller", label: "Look Taller" },
  { id: "define-waist", label: "Define Waist" },
  { id: "balance-hips", label: "Balance Hips" },
  { id: "add-curves", label: "Add Curves" },
  { id: "slim-legs", label: "Slim Legs Visually" },
  { id: "daily-comfort", label: "Daily Comfort" },
  { id: "office-casual", label: "Office Casual" },
  { id: "weekend", label: "Weekend Wear" },
  { id: "travel", label: "Travel Comfort" },
  { id: "plus-size-comfort", label: "Plus-Size Comfort" },
];

export default function JeansFitFinder() {
  const [filters, setFilters] = useState<FilterState>({
    gender: "women",
    bodyShape: "any",
    fit: "any",
    rise: "any",
    goal: "any",
  });

  const [zoomedCard, setZoomedCard] = useState<JeansCard | null>(null);

  // Lock body scroll while lightbox is open and close on Escape.
  useEffect(() => {
    if (!zoomedCard) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomedCard(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [zoomedCard]);

  const availableShapes = filters.gender === "women" ? WOMEN_SHAPES : MEN_SHAPES;

  // Reset body shape if it doesn't belong to the new gender.
  function setGender(gender: Gender) {
    setFilters((prev) => ({ ...prev, gender, bodyShape: "any" }));
  }

  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters({
      gender: filters.gender,
      bodyShape: "any",
      fit: "any",
      rise: "any",
      goal: "any",
    });
  }

  const filtered = useMemo(() => {
    return jeansCards.filter((card) => {
      if (!card.gender.includes(filters.gender)) return false;
      if (filters.bodyShape !== "any" && !card.bodyShapes.includes(filters.bodyShape)) return false;
      if (filters.fit !== "any" && card.fit !== filters.fit) return false;
      if (filters.rise !== "any" && card.rise !== filters.rise) return false;
      if (filters.goal !== "any" && !card.goals.includes(filters.goal)) return false;
      return true;
    });
  }, [filters]);

  return (
    <section
      aria-label="Jeans fit finder dashboard"
      className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/40 to-white p-5 shadow-sm md:p-8"
    >
      {/* ── Hero / Heading ────────────────────────────────── */}
      <div className="mb-8 text-center">
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
          Jeans Fit Finder
        </span>
        <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
          Find the Best Jeans for Your Body Shape
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
          Pick your gender, body type, fit, rise, and styling goal — we&apos;ll show you the
          jeans most likely to look flattering and feel comfortable.
        </p>
      </div>

      {/* ── Gender toggle ─────────────────────────────────── */}
      <div className="mb-6 flex justify-center">
        <div
          role="tablist"
          aria-label="Choose gender"
          className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm"
        >
          {(["women", "men"] as Gender[]).map((g) => {
            const active = filters.gender === g;
            return (
              <button
                key={g}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setGender(g)}
                className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${
                  active
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Filter panel ──────────────────────────────────── */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <FilterSelect
          label="Body Shape"
          value={filters.bodyShape}
          onChange={(v) => updateFilter("bodyShape", v as BodyShape | "any")}
          options={[{ id: "any", label: "Any body shape" }, ...availableShapes]}
        />
        <FilterSelect
          label="Fit Type"
          value={filters.fit}
          onChange={(v) => updateFilter("fit", v as FitType | "any")}
          options={[{ id: "any", label: "Any fit" }, ...FITS]}
        />
        <FilterSelect
          label="Rise"
          value={filters.rise}
          onChange={(v) => updateFilter("rise", v as Rise | "any")}
          options={[{ id: "any", label: "Any rise" }, ...RISES]}
        />
        <FilterSelect
          label="Style Goal"
          value={filters.goal}
          onChange={(v) => updateFilter("goal", v as StyleGoal | "any")}
          options={[{ id: "any", label: "Any goal" }, ...GOALS]}
        />
      </div>

      {/* ── Reset + result count ──────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-semibold text-emerald-700">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "match" : "matches"}
          {filtered.length === 0 && " — try clearing a filter."}
        </p>
        <button
          type="button"
          onClick={resetFilters}
          className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          Reset filters
        </button>
      </div>

      {/* ── Result grid ───────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-10 text-center">
          <p className="text-base font-semibold text-slate-700">
            No jeans match this combination.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try removing one filter — most users find a match within 2–3 filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((card) => (
            <JeansCardTile key={card.id} card={card} onZoom={() => setZoomedCard(card)} />
          ))}
        </div>
      )}

      {/* ── CTA ───────────────────────────────────────────── */}
      <div className="mt-10 rounded-2xl bg-emerald-600 p-6 text-center text-white shadow-lg md:p-8">
        <h3 className="text-xl font-bold md:text-2xl">
          Still Not Sure Which Jeans Fit You Best?
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-emerald-50 md:text-base">
          Start with straight-leg or slim-straight jeans for a safe, versatile fit. Choose
          high-rise for waist definition, or athletic and relaxed fits when comfort comes first.
        </p>
        <a
          href="#jeans-fit-guide"
          className="mt-5 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow transition hover:bg-emerald-50"
        >
          Explore the Full Jeans Fit Guide →
        </a>
      </div>

      {/* ── Lightbox / full-screen image ──────────────────── */}
      {zoomedCard && (
        <Lightbox card={zoomedCard} onClose={() => setZoomedCard(null)} />
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
 * Sub-components
 * ─────────────────────────────────────────────────────── */

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
}

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

interface JeansCardTileProps {
  card: JeansCard;
  onZoom: () => void;
}

function JeansCardTile({ card, onZoom }: JeansCardTileProps) {
  const badgeStyle: Record<NonNullable<JeansCard["badge"]>, string> = {
    "best-match": "bg-emerald-600 text-white",
    "comfort-pick": "bg-amber-500 text-white",
    "most-versatile": "bg-slate-900 text-white",
  };
  const badgeLabel: Record<NonNullable<JeansCard["badge"]>, string> = {
    "best-match": "Best Match",
    "comfort-pick": "Comfort Pick",
    "most-versatile": "Most Versatile",
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Image with zoom on hover + click-to-fullscreen */}
      <button
        type="button"
        onClick={onZoom}
        aria-label={`View ${card.name} in full screen`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-slate-100"
      >
        <ImageWithFallback src={card.image} alt={card.imageAlt} />

        {card.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow ${badgeStyle[card.badge]}`}
          >
            {badgeLabel[card.badge]}
          </span>
        )}

        {/* Zoom hint */}
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-slate-700 opacity-0 shadow transition group-hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          Tap to zoom
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-slate-900 md:text-lg">{card.name}</h3>

        <dl className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-slate-500">
          <div>
            <dt className="font-semibold uppercase tracking-wider">Fit</dt>
            <dd className="text-slate-800 capitalize">{card.fit.replace("-", " ")}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider">Rise</dt>
            <dd className="text-slate-800 capitalize">{card.rise.replace("-", " ")}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider">Stretch</dt>
            <dd className="text-slate-800 capitalize">{card.stretchLevel}</dd>
          </div>
        </dl>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">{card.whyItWorks}</p>

        <div className="mt-4 rounded-xl bg-emerald-50 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Style Tip
          </p>
          <p className="mt-1 text-sm text-slate-700">{card.styleTip}</p>
        </div>

        <button
          type="button"
          onClick={onZoom}
          className="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
        >
          View Similar Jeans →
        </button>
      </div>
    </article>
  );
}

/* Renders an image with a graceful SVG placeholder fallback. */
function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100"
      >
        <DenimSvg />
      </div>
    );
  }
  return (
    // Using a native <img> here (not next/image) so the component is fully drop-in
    // for any React/Next setup without configuring remote image domains or sizes.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      onError={() => setErrored(true)}
    />
  );
}

/* Decorative SVG fallback so missing images never break layout. */
function DenimSvg() {
  return (
    <svg
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3/4 w-3/4 text-emerald-600"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="denim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path
        d="M55 20 L145 20 L155 60 L150 220 L115 230 L105 110 L95 110 L85 230 L50 220 L45 60 Z"
        fill="url(#denim)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line x1="100" y1="20" x2="100" y2="110" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="75" cy="40" r="3" fill="currentColor" />
      <circle cx="125" cy="40" r="3" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
 * Lightbox — full-screen image viewer
 * ─────────────────────────────────────────────────────── */

interface LightboxProps {
  card: JeansCard;
  onClose: () => void;
}

function Lightbox({ card, onClose }: LightboxProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${card.name} full-screen view`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close full-screen view"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition hover:bg-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="grid max-h-[92vh] grid-cols-1 overflow-y-auto md:grid-cols-2">
          <div className="aspect-[4/5] w-full bg-slate-100 md:aspect-auto">
            <ImageWithFallback src={card.image} alt={card.imageAlt} />
          </div>

          <div className="flex flex-col gap-3 p-6 md:p-8">
            <span className="inline-block w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
              {card.fit.replace("-", " ")} • {card.rise.replace("-", " ")} rise
            </span>
            <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">{card.name}</h3>
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              {card.whyItWorks}
            </p>

            <div className="mt-2 rounded-xl bg-emerald-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Style Tip
              </p>
              <p className="mt-1 text-sm text-slate-700">{card.styleTip}</p>
            </div>

            <dl className="mt-2 space-y-1 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 py-1">
                <dt className="font-semibold">Stretch level</dt>
                <dd className="capitalize">{card.stretchLevel}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1">
                <dt className="font-semibold">Best for</dt>
                <dd className="text-right capitalize">
                  {card.bodyShapes
                    .map((b) => b.replace("-", " "))
                    .slice(0, 3)
                    .join(", ")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
