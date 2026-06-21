"use client";
import { useState } from "react";
import { MED_LABEL, type GlpMed, type GeneratedProtocol, type ProtocolInput } from "@/lib/protocolGenerator";
import { AlertTriangle, Syringe, Dumbbell, UtensilsCrossed, CheckCircle2 } from "lucide-react";

const LADDER: Record<GlpMed, number[]> = {
  "semaglutide-wegovy": [0.25, 0.5, 1.0, 1.7, 2.4],
  "semaglutide-ozempic": [0.25, 0.5, 1.0, 2.0],
  tirzepatide: [2.5, 5, 7.5, 10, 12.5, 15],
};
const phaseColor: Record<string, string> = {
  titration: "bg-emerald-500",
  maintenance: "bg-blue-500",
  hold: "bg-amber-500",
};

export function ProtocolBuilder({ initial }: { initial: GeneratedProtocol | null }) {
  const [med, setMed] = useState<GlpMed>(initial?.medication ?? "tirzepatide");
  const [dose, setDose] = useState<number>(initial?.startDoseMg ?? LADDER["tirzepatide"][0]);
  const [weeksOnDose, setWeeksOnDose] = useState(4);
  const [sideEffect, setSideEffect] = useState<ProtocolInput["sideEffect"]>("none");
  const [targetWeight, setTargetWeight] = useState(80);
  const [totalWeeks, setTotalWeeks] = useState(initial?.totalWeeks ?? 16);
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [protocol, setProtocol] = useState<GeneratedProtocol | null>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setBusy(true); setError(null);
    try {
      const res = await fetch("/api/vitals/protocol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medication: med, currentDoseMg: dose, weeksOnCurrentDose: weeksOnDose,
          sideEffect, startDateISO: startDate, targetWeightKg: targetWeight, totalWeeks,
        } as ProtocolInput),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Could not generate."); return; }
      setProtocol(data.protocol);
      setError(data.saved === false ? "Protocol generated. (Not saved yet — run migration 0003_longevity.sql to persist it across visits.)" : null);
    } finally {
      setBusy(false);
    }
  }

  const maxDose = protocol ? Math.max(...protocol.weeks.map((w) => w.doseMg)) : 1;

  return (
    <div className="space-y-6">
      {/* Check-in / inputs */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
        <h2 className="mb-4 font-bold text-white">Weekly check-in</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Medication">
            <select value={med} onChange={(e) => { const m = e.target.value as GlpMed; setMed(m); setDose(LADDER[m][0]); }} className={inp}>
              {Object.entries(MED_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </Field>
          <Field label="Current dose (mg)">
            <select value={dose} onChange={(e) => setDose(+e.target.value)} className={inp}>
              {LADDER[med].map((d) => <option key={d} value={d}>{d} mg</option>)}
            </select>
          </Field>
          <Field label="Weeks on this dose">
            <input type="number" min={0} max={12} value={weeksOnDose} onChange={(e) => setWeeksOnDose(+e.target.value)} className={inp} />
          </Field>
          <Field label="Side-effects this week">
            <select value={sideEffect} onChange={(e) => setSideEffect(e.target.value as any)} className={inp}>
              <option value="none">None</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </Field>
          <Field label="Goal weight (kg)">
            <input type="number" min={40} max={200} value={targetWeight} onChange={(e) => setTargetWeight(+e.target.value)} className={inp} />
          </Field>
          <Field label={`Plan length: ${totalWeeks} weeks`}>
            <input type="range" min={12} max={24} value={totalWeeks} onChange={(e) => setTotalWeeks(+e.target.value)} className="w-full accent-emerald-500" />
          </Field>
          <Field label="Start date">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inp} />
          </Field>
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <button onClick={generate} disabled={busy}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-gray-950 hover:bg-emerald-400 disabled:opacity-60">
          <Syringe className="h-5 w-5" /> {busy ? "Building protocol…" : protocol ? "Update protocol" : "Generate protocol"}
        </button>
      </div>

      {protocol && (
        <>
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-4">
            <Stat label="Medication" value={protocol.medicationLabel.split(" (")[0]} sub={protocol.medicationLabel.match(/\((.*)\)/)?.[1]} />
            <Stat label="Dose path" value={`${protocol.startDoseMg} → ${protocol.targetDoseMg} mg`} />
            <Stat label="Daily protein" value={`${protocol.proteinDailyG} g`} sub="to protect muscle" />
            <Stat label="Length" value={`${protocol.totalWeeks} weeks`} />
          </div>

          {/* Alerts */}
          {protocol.alerts.map((a) => (
            <div key={a} className="flex items-start gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" /> {a}
            </div>
          ))}

          {/* Gantt timeline */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
            <h3 className="mb-3 font-bold text-white">Titration timeline</h3>
            <div className="flex items-end gap-1 overflow-x-auto pb-2">
              {protocol.weeks.map((w) => (
                <div key={w.week} className="flex min-w-[26px] flex-col items-center">
                  <div className={`w-full rounded-t ${phaseColor[w.phase]}`} style={{ height: `${30 + (w.doseMg / maxDose) * 80}px` }} title={`Week ${w.week}: ${w.doseMg} mg (${w.phase})`} />
                  <div className="mt-1 text-[9px] text-gray-500">{w.week}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
              <Legend color="bg-emerald-500" label="Titration" />
              <Legend color="bg-blue-500" label="Maintenance" />
              <Legend color="bg-amber-500" label="Hold (side-effects)" />
            </div>
          </div>

          {/* Weekly missions */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
            <h3 className="mb-3 font-bold text-white">Weekly missions</h3>
            <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
              {protocol.weeks.map((w) => (
                <details key={w.week} className="rounded-xl border border-gray-800 bg-gray-950/40 p-3">
                  <summary className="flex cursor-pointer items-center justify-between text-sm">
                    <span className="font-semibold text-white">Week {w.week} · {w.doseMg} mg</span>
                    <span className="flex items-center gap-2">
                      {w.escalates && <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">STEP UP NEXT</span>}
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold capitalize text-gray-950 ${phaseColor[w.phase]}`}>{w.phase}</span>
                      <span className="text-xs text-gray-500">{w.dateISO}</span>
                    </span>
                  </summary>
                  <div className="mt-3 space-y-2 text-sm text-gray-300">
                    {w.note && <p className="text-xs text-amber-300">{w.note}</p>}
                    <p className="flex items-center gap-2 text-xs text-gray-400"><Dumbbell className="h-3.5 w-3.5" /> {w.training}</p>
                    <ul className="space-y-1">
                      {w.missions.map((m, i) => (
                        <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {m}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Meal timing + training */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card icon={<UtensilsCrossed className="h-4 w-4" />} title="Protein & meal timing" items={protocol.mealTiming} />
            <Card icon={<Dumbbell className="h-4 w-4" />} title="Training & NEAT" items={protocol.trainingPlan} />
          </div>

          <p className="text-xs text-gray-600">
            Educational decision-support only — not a prescription. Confirm every dose change with your prescriber.
          </p>
        </>
      )}
    </div>
  );
}

const inp = "w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-gray-100";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-medium text-gray-400">{label}</span>{children}</label>;
}
function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-4">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-1 text-lg font-extrabold text-white">{value}</div>
      {sub && <div className="text-[11px] text-gray-500">{sub}</div>}
    </div>
  );
}
function Legend({ color, label }: { color: string; label: string }) {
  return <span className="flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded ${color}`} /> {label}</span>;
}
function Card({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
      <h3 className="mb-3 flex items-center gap-2 font-bold text-white">{icon} {title}</h3>
      <ul className="space-y-2 text-sm text-gray-300">
        {items.map((i) => <li key={i} className="flex gap-2"><span className="text-emerald-500">•</span> {i}</li>)}
      </ul>
    </div>
  );
}
