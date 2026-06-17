"use client";

// components/charts/FacialHarmonyRadarChart.tsx
// Horizontal range bars showing the balanced (ideal) band for each angle metric,
// measured in degrees. The golden ratio is omitted here because it uses a
// different unit; it is covered in the article text instead.

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { facialMetrics } from "@/lib/blog/facial-harmony-data";

const data = facialMetrics
  .filter((m) => m.unit === "deg")
  .map((m) => ({
    name: m.short,
    full: m.name,
    range: [m.ideal.min, m.ideal.max] as [number, number],
    mid: Math.round((m.ideal.min + m.ideal.max) / 2),
    color: m.brandColor,
  }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg">
      <p className="font-bold">{d.full}</p>
      <p className="text-slate-300">
        Balanced range: {d.range[0]}° to {d.range[1]}°
      </p>
    </div>
  );
}

export default function FacialHarmonyRadarChart() {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 md:p-6">
      <h3 className="text-lg font-bold text-slate-900">
        Balanced angle ranges at a glance
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Each bar is the range that surgeons and orthodontists treat as balanced, in
        degrees. Wider bars give you more room before a feature reads off-balance.
      </p>
      <div className="mt-5 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 24, left: 8, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[80, 140]}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(v) => `${v}°`}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              tick={{ fontSize: 12, fill: "#334155" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
            <Bar dataKey="range" radius={[6, 6, 6, 6]} barSize={20}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
