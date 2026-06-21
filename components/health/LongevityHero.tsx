import Link from "next/link";
import { Rocket, ArrowRight } from "lucide-react";
import type { LongevityResult } from "@/lib/healthCalculations";
import type { BioAgeResult } from "@/lib/healthCalculations";

const bandColor: Record<LongevityResult["band"], string> = {
  Elite: "text-emerald-400",
  Strong: "text-emerald-400",
  Average: "text-amber-300",
  "At risk": "text-orange-400",
  Critical: "text-red-400",
};

export function LongevityHero({ longevity, bioAge }: { longevity: LongevityResult; bioAge: BioAgeResult }) {
  const pct = Math.round((longevity.index / 1000) * 100);
  const top = longevity.levers[0];

  return (
    <section className="overflow-hidden rounded-3xl bg-gray-950 p-6 text-gray-100 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">Longevity Index</p>
          <div className="mt-2 flex items-end gap-3">
            <div className="text-6xl font-extrabold tracking-tight text-white">{longevity.index}</div>
            <div className="pb-2 text-gray-500">/ 1000</div>
            <div className={`pb-2 text-lg font-bold ${bandColor[longevity.band]}`}>{longevity.band}</div>
          </div>

          {/* Bar */}
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gray-800">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${pct}%` }} />
          </div>

          {/* Subscores */}
          <div className="mt-4 grid grid-cols-5 gap-2 text-center">
            {Object.entries(longevity.subScores).map(([k, v]) => (
              <div key={k} className="rounded-lg bg-gray-900 p-2">
                <div className="text-sm font-bold text-white">{v}</div>
                <div className="text-[10px] capitalize text-gray-500">{k.replace("bodyComposition", "body")}</div>
              </div>
            ))}
          </div>

          {top && (
            <p className="mt-4 text-sm text-gray-300">
              Biggest lever: <span className="font-semibold text-emerald-400">{top.label}</span> could add{" "}
              <span className="font-bold text-white">+{top.points}</span> points. {top.action}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
            <div className="text-xs uppercase tracking-wide text-gray-500">Biological age</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">{bioAge.biologicalAge}</span>
              <span className={`text-sm font-bold ${bioAge.delta <= 0 ? "text-emerald-400" : "text-orange-400"}`}>
                {bioAge.delta > 0 ? "+" : ""}{bioAge.delta} vs real age {bioAge.chronologicalAge}
              </span>
            </div>
            {bioAge.contributions[0] && (
              <p className="mt-2 text-xs text-gray-500">
                Top driver: {bioAge.contributions[0].marker} ({bioAge.contributions[0].years > 0 ? "+" : ""}{bioAge.contributions[0].years} yrs)
              </p>
            )}
          </div>

          <Link href="/dashboard/future"
            className="flex items-center justify-between rounded-2xl bg-emerald-500 px-5 py-4 font-bold text-gray-950 hover:bg-emerald-400 transition-colors">
            <span className="flex items-center gap-2"><Rocket className="h-5 w-5" /> Run “Future You” simulation</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
