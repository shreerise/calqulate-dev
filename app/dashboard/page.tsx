import { getAccess, hasPaidAccess } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { ScoreGauge } from "@/components/vitals/ScoreGauge";
import { TrendChart, type TrendPoint } from "@/components/vitals/TrendChart";
import { MetricForm } from "@/components/vitals/MetricForm";
import { Paywall } from "@/components/vitals/Paywall";
import { DownloadReportButton } from "@/components/vitals/DownloadReportButton";
import { TrajectoryPanel, type TrajectorySummary } from "@/components/vitals/TrajectoryPanel";
import { NextLeversPanel } from "@/components/vitals/NextLeversPanel";
import { fitTrajectory, forecast, isRealChange, METRIC_NOISE, type SeriesPoint } from "@/lib/vitals/trajectory";
import { computeNextLevers, type LeverResult } from "@/lib/vitals/nextLever";
import type { VitalsReport } from "@/types/vitals";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const access = await getAccess();
  const paid = hasPaidAccess(access);
  const supabase = await createClient();

  const { data: rows } = await supabase
    .from("risk_results")
    .select("composite_score,composite_grade,ascvd_percent,diabetes_percent,heart_age,heart_age_delta,report_json,computed_at")
    .eq("user_id", access.userId!)
    .order("computed_at", { ascending: true });

  const history = rows ?? [];
  const latest = history[history.length - 1];

  const trend: TrendPoint[] = history.map((r) => ({
    date: new Date(r.computed_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    score: r.composite_score,
    ascvd: r.ascvd_percent,
    diabetes: r.diabetes_percent,
    heartAgeDelta: r.heart_age_delta,
  }));

  // ── Trajectory engine: fit the Kalman model to the score history ──────────
  const series: SeriesPoint[] = [];
  if (history.length > 0) {
    const t0 = new Date(history[0].computed_at).getTime();
    for (const r of history) {
      if (r.composite_score == null) continue;
      series.push({ t: (new Date(r.computed_at).getTime() - t0) / 86_400_000, value: r.composite_score });
    }
  }
  let trajectory: TrajectorySummary = {
    count: series.length, direction: "holding", weeklyChange: 0, netSignalChange: 0,
    noiseShare: 0, forecast8wk: null, realNote: "", current: latest?.composite_score ?? null,
  };
  if (series.length >= 2) {
    const traj = fitTrajectory(series, { higherIsBetter: true, measurementNoiseSd: METRIC_NOISE.compositeScore });
    const f8 = forecast(traj, 8);
    trajectory = {
      count: series.length,
      direction: traj.direction,
      weeklyChange: traj.weeklyChange,
      netSignalChange: traj.netSignalChange,
      noiseShare: traj.noiseShare,
      forecast8wk: f8 ? f8.value : null,
      realNote: isRealChange(traj).note,
      current: traj.current?.level ?? null,
    };
  }

  // ── Counterfactual next-lever simulator on the latest saved measurement ───
  let levers: LeverResult[] = [];
  const latestReport = latest?.report_json as VitalsReport | undefined;
  if (latestReport?.input) {
    levers = computeNextLevers(latestReport.input, 4);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your metabolic health</h1>
          <p className="text-gray-600">Track the outcomes that matter, not just the scale.</p>
        </div>
        <DownloadReportButton enabled={access.isActive && access.tier === "pro"} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6">
          {latest ? (
            <ScoreGauge score={latest.composite_score ?? 0} grade={latest.composite_grade ?? "—"} />
          ) : (
            <p className="text-sm text-gray-500">No measurements yet. Add one below.</p>
          )}
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="mb-1 text-sm font-medium text-gray-500">Heart age</h3>
          <p className="text-3xl font-bold">{latest?.heart_age ?? "—"}</p>
          {latest?.heart_age_delta != null && (
            <p className={`text-sm ${latest.heart_age_delta > 0 ? "text-red-600" : "text-green-600"}`}>
              {latest.heart_age_delta > 0 ? "+" : ""}{latest.heart_age_delta} vs your real age
            </p>
          )}
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="mb-1 text-sm font-medium text-gray-500">10-yr risk</h3>
          <p className="text-sm">Heart: <strong>{latest?.ascvd_percent ?? "—"}%</strong></p>
          <p className="text-sm">Diabetes: <strong>{latest?.diabetes_percent ?? "—"}%</strong></p>
        </div>
      </div>

      <section className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 text-lg font-bold">Your trend</h2>
        {paid ? (
          <TrendChart data={trend} />
        ) : (
          <Paywall feature="trend tracking" />
        )}
      </section>

      {/* Real engine output: trajectory + personalized next levers */}
      {paid && (
        <div className="grid gap-6 lg:grid-cols-2">
          <TrajectoryPanel s={trajectory} />
          <NextLeversPanel levers={levers} />
        </div>
      )}

      <section className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 text-lg font-bold">Add a measurement</h2>
        {paid ? (
          <MetricForm persist />
        ) : (
          <p className="text-sm text-gray-600">
            Upgrade to Vitals Plus to save measurements and build your trend.
          </p>
        )}
      </section>

      <p className="text-center text-xs text-gray-400">
        Educational decision-support only — not medical advice. Consult a licensed clinician.
      </p>
    </div>
  );
}
