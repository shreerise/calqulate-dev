import type { LeverResult } from "@/lib/vitals/nextLever";
import { ArrowRight } from "lucide-react";

/**
 * Server-rendered output of the counterfactual next-lever simulator.
 * Each lever is quantified in the user's OWN numbers, ranked by impact-per-effort.
 */
export function NextLeversPanel({ levers }: { levers: LeverResult[] }) {
  if (levers.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        <h3 className="mb-1 text-lg font-bold">Your next lever</h3>
        <p className="text-sm text-gray-500">Add a measurement to get your personalized, ranked levers.</p>
      </div>
    );
  }

  const top = levers[0];

  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-1 text-lg font-bold">Your highest-impact change</h3>
      <p className="mb-4 text-sm text-gray-500">
        Simulated against your own risk equations and ranked by impact per unit of effort — not generic advice.
      </p>

      {/* Hero lever */}
      <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/60 p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">#1</span>
          <h4 className="font-bold text-gray-900">{top.label}</h4>
        </div>
        <p className="mt-1 text-sm text-gray-700">{top.change}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {top.scoreGain > 0 && <Stat label="score" value={`+${top.scoreGain}`} good />}
          {top.ascvdDelta != null && top.ascvdDelta !== 0 && <Stat label="heart risk" value={`${top.ascvdDelta}%`} good={top.ascvdDelta < 0} />}
          {top.diabetesDelta != null && top.diabetesDelta !== 0 && <Stat label="diabetes risk" value={`${top.diabetesDelta}%`} good={top.diabetesDelta < 0} />}
          {top.heartAgeDelta != null && top.heartAgeDelta !== 0 && <Stat label="heart age" value={`${top.heartAgeDelta} yr`} good={top.heartAgeDelta < 0} />}
        </div>
        <p className="mt-3 flex items-start gap-1.5 text-sm font-medium text-emerald-800">
          <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0" /> {top.action}
        </p>
      </div>

      {/* Runners-up */}
      {levers.length > 1 && (
        <ul className="mt-4 space-y-2">
          {levers.slice(1).map((l, i) => (
            <li key={l.factor} className="flex flex-col items-start gap-1 rounded-lg border border-gray-100 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-400">#{i + 2}</span>{" "}
                <span className="text-sm font-medium text-gray-800">{l.label}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {l.scoreGain > 0 && <Stat label="score" value={`+${l.scoreGain}`} good small />}
                {l.ascvdDelta != null && l.ascvdDelta !== 0 && <Stat label="ASCVD" value={`${l.ascvdDelta}%`} good={l.ascvdDelta < 0} small />}
                {l.diabetesDelta != null && l.diabetesDelta !== 0 && <Stat label="diabetes" value={`${l.diabetesDelta}%`} good={l.diabetesDelta < 0} small />}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Stat({ label, value, good, small }: { label: string; value: string; good?: boolean; small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
        good ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
      } ${small ? "text-[11px]" : "text-xs"}`}
    >
      {value} <span className="font-normal opacity-70">{label}</span>
    </span>
  );
}
