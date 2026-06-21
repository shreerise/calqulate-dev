import Link from "next/link";
import { Activity, Heart, TrendingDown, ArrowRight } from "lucide-react";
import { ScoreGauge } from "./ScoreGauge";
import type { VitalsReport } from "@/types/vitals";

export interface TrackerRow {
  composite_score: number | null;
  composite_grade: string | null;
  heart_age: number | null;
  heart_age_delta: number | null;
  ascvd_percent: number | null;
  diabetes_percent: number | null;
  computed_at: string;
  report_json?: VitalsReport | null;
}

/** Tiny inline sparkline from a numeric series (nulls dropped). */
function Spark({ values, color }: { values: (number | null | undefined)[]; color: string }) {
  const pts = values.filter((v): v is number => typeof v === "number");
  if (pts.length < 2) {
    return <div className="h-10" />;
  }
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const range = max - min || 1;
  const w = 200;
  const h = 40;
  const coords = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <polyline points={coords.join(" ")} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CardShell({
  icon, title, href, cta, accent, children,
}: {
  icon: React.ReactNode; title: string; href: string; cta: string; accent: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-2xl border bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent}`}>{icon}</span>
          <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        </div>
        <Link href={href} className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800">
          {cta} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export function TrackerCards({ history }: { history: TrackerRow[] }) {
  const latest = history[history.length - 1];
  const first = history[0];

  // Series for sparklines
  const scoreSeries = history.map((r) => r.composite_score);
  const heartAgeSeries = history.map((r) => r.heart_age);
  const weightSeries = history.map((r) => r.report_json?.input?.weightKg ?? null);
  const leanSeries = history.map((r) => r.report_json?.body?.leanBodyMassKg ?? null);

  const latestWeight = latest?.report_json?.input?.weightKg ?? null;
  const firstWeight = first?.report_json?.input?.weightKg ?? null;
  const weightDelta = latestWeight != null && firstWeight != null ? Math.round((latestWeight - firstWeight) * 10) / 10 : null;
  const latestLean = latest?.report_json?.body?.leanBodyMassKg ?? null;
  const firstLean = first?.report_json?.body?.leanBodyMassKg ?? null;
  const leanDelta = latestLean != null && firstLean != null ? Math.round((latestLean - firstLean) * 10) / 10 : null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-bold">Your trackers</h2>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 1 — Metabolic Health Score */}
        <CardShell
          icon={<Activity className="h-4 w-4 text-emerald-700" />}
          title="Metabolic Health Score"
          href="/service/metabolic-health-tracker"
          cta="Tracker"
          accent="bg-emerald-100"
        >
          {latest ? (
            <div className="space-y-3">
              <ScoreGauge score={latest.composite_score ?? 0} grade={latest.composite_grade ?? "—"} />
              <Spark values={scoreSeries} color="#10b981" />
            </div>
          ) : (
            <p className="text-sm text-gray-500">Add a measurement to see your score.</p>
          )}
        </CardShell>

        {/* 2 — Heart Age Tracker */}
        <CardShell
          icon={<Heart className="h-4 w-4 text-rose-600" />}
          title="Heart Age Tracker"
          href="/service/heart-age-tracker"
          cta="Tracker"
          accent="bg-rose-100"
        >
          {latest?.heart_age != null ? (
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-gray-900">{latest.heart_age}<span className="ml-1 text-base font-medium text-gray-400">yrs</span></div>
              {latest.heart_age_delta != null && (
                <p className={`text-sm font-medium ${latest.heart_age_delta > 0 ? "text-red-600" : "text-green-600"}`}>
                  {latest.heart_age_delta > 0 ? "+" : ""}{latest.heart_age_delta} yrs vs your real age
                </p>
              )}
              <Spark values={heartAgeSeries} color="#e11d48" />
              <p className="text-xs text-gray-400">10-yr heart risk: <strong>{latest.ascvd_percent ?? "—"}%</strong></p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Add <strong>total cholesterol</strong>, <strong>HDL</strong>, and <strong>systolic BP</strong> to unlock your heart age.</p>
              <p className="text-xs text-gray-400">Heart age uses the validated Framingham model.</p>
            </div>
          )}
        </CardShell>

        {/* 3 — GLP-1 Progress Tracker */}
        <CardShell
          icon={<TrendingDown className="h-4 w-4 text-blue-600" />}
          title="GLP-1 Progress Tracker"
          href="/service/glp1-progress-tracker"
          cta="Tracker"
          accent="bg-blue-100"
        >
          {latestWeight != null ? (
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-gray-900">{latestWeight}<span className="ml-1 text-base font-medium text-gray-400">kg</span></div>
              {weightDelta != null && (
                <p className={`text-sm font-medium ${weightDelta < 0 ? "text-green-600" : "text-gray-600"}`}>
                  {weightDelta > 0 ? "+" : ""}{weightDelta} kg since start
                </p>
              )}
              <Spark values={weightSeries} color="#2563eb" />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Lean mass: <strong>{latestLean != null ? `${latestLean} kg` : "—"}</strong></span>
                {leanDelta != null && (
                  <span className={leanDelta >= 0 ? "text-green-600" : "text-red-600"}>
                    {leanDelta >= 0 ? "+" : ""}{leanDelta} kg
                  </span>
                )}
              </div>
              {leanDelta != null && (
                <p className="text-[11px] text-gray-400">
                  {leanDelta >= -0.3 ? "Muscle protected — you're losing fat, not muscle." : "Lean mass dropping — raise protein & add resistance training."}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Add weight (and waist) to track fat loss while protecting muscle.</p>
          )}
        </CardShell>
      </div>
    </section>
  );
}
