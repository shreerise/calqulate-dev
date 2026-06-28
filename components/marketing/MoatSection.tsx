import { Compass, TrendingUp, Zap, LayoutDashboard, ListChecks, Lightbulb, Brain, Route } from "lucide-react";
import { Reveal } from "@/components/glp1/marketing/Reveal";

/**
 * "Product moat" section — the capabilities that make Calqulate Vitals hard to
 * copy. Luxe dark-emerald + gold band matching the premium sections.
 */
const MOAT = [
  { icon: Compass, t: "Personal Coach", d: "Personalized guidance after every interaction — not static tracking." },
  { icon: TrendingUp, t: "Predictive Journey", d: "Estimated timelines, milestones and progress — not just historical data." },
  { icon: Zap, t: "Instant Insights", d: "Every logged action generates meaningful feedback and recommendations." },
  { icon: LayoutDashboard, t: "Adaptive Dashboard", d: "Content evolves with your behavior and stage of the journey." },
  { icon: ListChecks, t: "Personalized Action Plans", d: "Weekly goals tailored to your own data and habits." },
  { icon: Lightbulb, t: "Progress Explanations", d: "Understand fluctuations instead of just seeing numbers." },
  { icon: Brain, t: "Habit Intelligence", d: "Spots patterns and suggests high-impact improvements." },
  { icon: Route, t: "Long-Term Journey View", d: "Focused on your complete transformation, not isolated daily entries." },
];

const LUXE_BG =
  "radial-gradient(70% 60% at 82% -10%, rgba(16,185,129,0.22), transparent 60%)," +
  "radial-gradient(55% 60% at 2% 112%, rgba(245,158,11,0.14), transparent 55%)," +
  "linear-gradient(160deg, #0a3a2b 0%, #052017 45%, #02120c 100%)";

export function MoatSection() {
  return (
    <section className="relative overflow-hidden py-16 text-white sm:py-20" style={{ background: LUXE_BG }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.55), transparent)" }} />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-light to-gold px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-gold-ink shadow-[0_8px_20px_rgba(245,158,11,.35)]">
            ✦ Why it&rsquo;s hard to copy
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">The Calqulate Vitals moat</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-white/65">
            Eight things that turn tracking into a coach — and make this experience genuinely hard to replicate.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOAT.map((m, i) => (
            <Reveal key={m.t} delay={i * 50}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-white/10">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-gold-light ring-1 ring-white/10 transition-colors group-hover:bg-gold/15">
                  <m.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-white">{m.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
