// components/charts/SemaglutideDosageChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { titrationSchedule } from "@/lib/blog/semaglutide-dosage-data";

/**
 * Visualizes the FDA Wegovy titration ladder — weekly semaglutide dose (mg)
 * climbing across each 4-week phase, from the 0.25 mg starter dose up to the
 * 2.4 mg maintenance dose. Makes the "start low, go slow" escalation obvious
 * at a glance.
 */
export default function SemaglutideDosageChart() {
  const data = titrationSchedule.map((s) => ({
    name: s.phase,
    weeks: s.weeks,
    dose: s.doseMg,
    color: s.brandColor,
  }));

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-6 ring-1 ring-slate-200 md:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
          Semaglutide Titration Ladder (Wegovy)
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Weekly dose in milligrams at each 4-week phase — the FDA-approved
          &ldquo;start low, go slow&rdquo; escalation to the 2.4 mg maintenance
          dose.
        </p>
      </div>

      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#475569" }}
              interval={0}
              height={40}
            />
            <YAxis
              domain={[0, 2.8]}
              tickCount={8}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              label={{
                value: "Dose (mg)",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 12, fill: "#64748b" },
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(16, 185, 129, 0.08)" }}
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                fontSize: 13,
              }}
              formatter={(value: number) => [`${value} mg / week`, "Dose"]}
              labelFormatter={(label: string, payload) => {
                const w = payload && payload[0]?.payload?.weeks;
                return w ? `${label} — ${w}` : label;
              }}
            />
            <Bar dataKey="dose" radius={[8, 8, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
              <LabelList
                dataKey="dose"
                position="top"
                formatter={(v: number) => `${v} mg`}
                style={{ fontSize: 12, fontWeight: 700, fill: "#0f172a" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Source: FDA Wegovy prescribing information. Ozempic follows a similar
        ladder but tops out at 2.0 mg (0.25 &rarr; 0.5 &rarr; 1.0 &rarr; 2.0 mg).
        Dose changes should always be a shared decision with your prescriber.
      </p>
    </div>
  );
}
