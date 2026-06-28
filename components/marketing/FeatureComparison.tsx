import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/glp1/marketing/Reveal";

/**
 * Calqulate Vitals vs Shotsy vs Glapp feature comparison (full matrix).
 * Reused on the pricing page. Calqulate column highlighted; mobile = sticky
 * first column + horizontal scroll.
 */
type Val = "yes" | "no" | "free" | "best" | "premium";

const ROWS: { feature: string; us: Val; shotsy: Val; glapp: Val }[] = [
  { feature: "Shot logging + reminders", us: "yes", shotsy: "yes", glapp: "yes" },
  { feature: "Injection-site rotation", us: "yes", shotsy: "yes", glapp: "yes" },
  { feature: "Food, protein, water logging", us: "yes", shotsy: "yes", glapp: "no" },
  { feature: "Medication-level curves", us: "free", shotsy: "premium", glapp: "yes" },
  { feature: "“Am I on track?” benchmarking", us: "yes", shotsy: "no", glapp: "yes" },
  { feature: "Body composition (fat vs muscle)", us: "best", shotsy: "no", glapp: "no" },
  { feature: "Lab / biomarker tracking", us: "yes", shotsy: "no", glapp: "no" },
  { feature: "Exercise / strength logging", us: "yes", shotsy: "no", glapp: "no" },
  { feature: "Smart food estimate", us: "yes", shotsy: "no", glapp: "no" },
  { feature: "Metabolic Health Score tracker", us: "best", shotsy: "no", glapp: "no" },
  { feature: "Heart Age tracker", us: "best", shotsy: "no", glapp: "no" },
  { feature: "Metabolism tracker", us: "best", shotsy: "no", glapp: "no" },
  { feature: "Automatic backup + export", us: "best", shotsy: "no", glapp: "yes" },
  { feature: "Works on web", us: "best", shotsy: "no", glapp: "yes" },
];

function Cell({ v }: { v: Val }) {
  if (v === "no") return <Minus className="mx-auto h-4 w-4 text-faint" />;
  if (v === "premium") return <span className="text-xs font-medium text-faint">Premium</span>;
  if (v === "free") return <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-800"><Check className="h-4 w-4" /> Free</span>;
  return <Check className="mx-auto h-4 w-4 text-brand" />;
}

export function FeatureComparison() {
  return (
    <section className="bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Everything you get vs Shotsy &amp; Glapp</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-copy sm:text-base">
            One plan covers every feature below — including three trackers other apps don&rsquo;t have. Features as of 2026.
          </p>
        </Reveal>

        <Reveal className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(15,23,42,.06)]">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-white p-4 text-left font-semibold text-ink">Feature</th>
                <th className="relative bg-brand-50 p-4 text-center">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold-light to-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-ink shadow">Best value</span>
                  <span className="font-bold text-brand-800">Calqulate Vitals</span>
                </th>
                <th className="p-4 text-center font-semibold text-copy">Shotsy</th>
                <th className="p-4 text-center font-semibold text-copy">Glapp</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.feature} className="border-t border-line">
                  <td className="sticky left-0 z-10 bg-white p-4 text-left font-medium text-ink">{r.feature}</td>
                  <td className="bg-brand-50/60 p-4 text-center"><Cell v={r.us} /></td>
                  <td className="p-4 text-center"><Cell v={r.shotsy} /></td>
                  <td className="p-4 text-center"><Cell v={r.glapp} /></td>
                </tr>
              ))}
              <tr className="border-t border-line font-semibold">
                <td className="sticky left-0 z-10 bg-white p-4 text-left text-ink">Yearly price</td>
                <td className="bg-brand-50/60 p-4 text-center text-brand-800">$79 (~$6.58/mo)</td>
                <td className="p-4 text-center text-copy">$49.99</td>
                <td className="p-4 text-center text-copy">Free</td>
              </tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
