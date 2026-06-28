import Link from "next/link";
import { Syringe, Gauge, HeartPulse, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/glp1/marketing/Reveal";

/**
 * Luxury "one plan, three trackers" band (dark-emerald + gold palette, matching
 * the product pages' premium section). Top-of-funnel promo with three CTAs:
 * try the GLP-1 tracker free, see premium, or get the full premium bundle.
 */
const TRACKERS = [
  { icon: Syringe, name: "GLP-1 Progress", href: "/service/glp1-progress-tracker", d: "Fat vs. muscle, free medication-level curves & risk." },
  { icon: Gauge, name: "Metabolic Health Score", href: "/service/metabolic-health-tracker", d: "One 0–100 score + heart & diabetes risk, tracked." },
  { icon: HeartPulse, name: "Heart Age", href: "/service/heart-age-tracker", d: "How old your heart is — watch it get younger." },
];

const LUXE_BG =
  "radial-gradient(70% 60% at 82% -10%, rgba(16,185,129,0.22), transparent 60%)," +
  "radial-gradient(55% 60% at 2% 112%, rgba(245,158,11,0.14), transparent 55%)," +
  "linear-gradient(160deg, #0a3a2b 0%, #052017 45%, #02120c 100%)";

export function PremiumTrackersBand() {
  return (
    <section className="relative overflow-hidden py-14 text-white sm:py-20" style={{ background: LUXE_BG }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.55), transparent)" }} />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-light to-gold px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-gold-ink shadow-[0_8px_20px_rgba(245,158,11,.35)]">
            ✦ Calqulate Vitals Premium
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">One plan. Three trackers. Your whole picture.</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-white/65">
            GLP-1, Metabolic Health and Heart Age — tracked over time with validated models, in a single premium plan.
          </p>
        </Reveal>

        {/* Three tracker cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {TRACKERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <Link
                href={t.href}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-white/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-gold-light ring-1 ring-white/10 transition-colors group-hover:bg-gold/15">
                  <t.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{t.name}</h3>
                <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-white/65">{t.d}</p>
                <span className="mt-3 inline-flex items-center text-sm font-semibold text-gold-light">Explore <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Three CTAs */}
        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/health/glp-1-dose-calculator"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
          >
            Try the GLP-1 tracker free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            See Premium
          </Link>
          <Link
            href="/pricing"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-light to-gold px-6 py-3 text-sm font-bold text-gold-ink shadow-[0_8px_20px_rgba(245,158,11,.35)] transition-all duration-150 hover:-translate-y-0.5 sm:w-auto"
          >
            GLP-1 + Metabolism + Heart Age — Premium <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
