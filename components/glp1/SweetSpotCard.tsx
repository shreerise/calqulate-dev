import { Crosshair, Info } from "lucide-react";
import type { SweetSpotResult, DoseLevelStat } from "@/lib/glp1";

const LB = 2.2046226218;
const perWeekLb = (kg: number | null) => (kg == null ? null : Math.round(kg * LB * 10) / 10);

const CONFIDENCE_LABEL: Record<SweetSpotResult["confidence"], string> = {
  insufficient: "Needs more data",
  low: "Low confidence",
  medium: "Medium confidence",
  high: "High confidence",
};

/**
 * "Your dosing sweet spot" — surfaces the dose that delivered the most fat/weight
 * loss for the least side effects, from the user's own logged history. Educational
 * only; not a dosing recommendation (every change is the prescriber's call).
 */
export function SweetSpotCard({ result }: { result: SweetSpotResult }) {
  const { sweetSpot, levels, basis, confidence, message } = result;
  const lossLabel = basis === "fat" ? "fat loss" : "weight loss";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold-light/10 via-white to-white p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-gray-500">
          <Crosshair className="h-5 w-5 text-gold" />
          <span className="text-xs font-semibold uppercase tracking-wide">Your dosing sweet spot</span>
        </div>
        <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-ink">
          {CONFIDENCE_LABEL[confidence]}
        </span>
      </div>

      {sweetSpot ? (
        <>
          <div className="mt-3 flex flex-wrap items-end gap-x-8 gap-y-2">
            <div>
              <div className="text-3xl font-extrabold text-gray-900">{round2(sweetSpot.amountMg)} mg</div>
              <div className="text-xs text-gray-500">best balance so far</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-600">
                {fmtRate(basis === "fat" ? sweetSpot.fatLossKgPerWeek : sweetSpot.weightLossKgPerWeek)}
              </div>
              <div className="text-xs text-gray-500">{lossLabel} / week</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-900">
                {sweetSpot.sideEffectBurden != null ? `${sweetSpot.sideEffectBurden}/5` : "—"}
              </div>
              <div className="text-xs text-gray-500">side-effect burden</div>
            </div>
          </div>

          {/* Per-dose comparison */}
          {levels.length > 1 && (
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-[11px] uppercase tracking-wide text-gray-400">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Dose</th>
                    <th className="px-3 py-2 font-semibold">{lossLabel}/wk</th>
                    <th className="px-3 py-2 font-semibold">Side effects</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {levels.map((l) => (
                    <Row key={l.amountMg} l={l} basis={basis} isSweet={l.amountMg === sweetSpot.amountMg} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : null}

      <p className="mt-3 text-sm leading-relaxed text-gray-600">{message}</p>

      <p className="mt-2 flex items-start gap-1.5 text-xs text-gray-400">
        <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
        Based on your own logged history — educational, not a dosing recommendation. Any dose change is your prescriber&apos;s call.
      </p>
    </div>
  );
}

function Row({ l, basis, isSweet }: { l: DoseLevelStat; basis: "fat" | "weight"; isSweet: boolean }) {
  const rate = basis === "fat" ? l.fatLossKgPerWeek : l.weightLossKgPerWeek;
  return (
    <tr className={isSweet ? "bg-gold/10" : ""}>
      <td className="px-3 py-2 font-semibold text-gray-900">
        {round2(l.amountMg)} mg
        {isSweet && <span className="ml-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-2 py-0.5 text-[9px] font-bold uppercase text-gold-ink">Sweet spot</span>}
      </td>
      <td className="px-3 py-2 text-gray-700">{fmtRate(rate)}</td>
      <td className="px-3 py-2 text-gray-700">{l.sideEffectBurden != null ? `${l.sideEffectBurden}/5` : "—"}</td>
    </tr>
  );
}

function fmtRate(kgPerWeek: number | null): string {
  const lb = perWeekLb(kgPerWeek);
  if (lb == null) return "—";
  return `${lb > 0 ? "" : ""}${lb} lb`;
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}
