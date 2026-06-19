// components/charts/IdealWeightChart.tsx
"use client";

import { useState } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { heightWeightChart } from "@/lib/blog/ideal-weight-data";

/**
 * Ideal weight vs height, plotted in pounds (US-first).
 * - Shaded green band = healthy BMI range (18.5–24.9) for each height.
 * - Two lines = Devine ideal target for women and men.
 *
 * recharts is the right tool here: it is SVG-based, resizes with the
 * container, and stays sharp on retina screens without extra work.
 */
export default function IdealWeightChart() {
  const [unit, setUnit] = useState<"lb" | "kg">("lb");

  // Parse "129–174" → [129, 174] for the band.
  const data = heightWeightChart.map((r) => {
    const rangeStr = unit === "lb" ? r.healthyLb : r.healthyKg;
    const [lo, hi] = rangeStr.split("–").map((n) => parseInt(n, 10));
    return {
      height: r.ftIn,
      low: lo,
      span: hi - lo, // stacked on top of `low` to fake a floating band
      hi,
      women: unit === "lb" ? r.womenIdealLb : Math.round(r.womenIdealKg),
      men: unit === "lb" ? r.menIdealLb : Math.round(r.menIdealKg),
    };
  });

  const unitLabel = unit === "lb" ? "lbs" : "kg";

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-6 ring-1 ring-slate-200 md:p-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
            Ideal Weight by Height (Visual Chart)
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            The green band is the healthy weight range for each height. The two
            lines are the Devine ideal target for women and men.
          </p>
        </div>

        {/* Unit toggle */}
        <div className="inline-flex shrink-0 rounded-xl bg-white p-1 ring-1 ring-slate-200">
          {(["lb", "kg"] as const).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
                unit === u
                  ? "bg-emerald-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {u === "lb" ? "Pounds" : "Kilograms"}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[420px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 16, right: 16, left: 0, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="height"
              tick={{ fontSize: 11, fill: "#475569" }}
              interval="preserveStartEnd"
              angle={-40}
              textAnchor="end"
              height={50}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              width={44}
              label={{
                value: unitLabel,
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 12, fill: "#94a3b8" },
              }}
            />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                fontSize: 13,
              }}
              formatter={(value: number, name: string) => {
                if (name === "Healthy range floor") return [null, null];
                if (name === "Healthy band")
                  return [`+${value} ${unitLabel}`, "Range width"];
                return [`${value} ${unitLabel}`, name];
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              payload={[
                { value: "Healthy range (BMI 18.5–24.9)", type: "rect", color: "#a7f3d0", id: "band" },
                { value: "Women ideal (Devine)", type: "line", color: "#f59e0b", id: "women" },
                { value: "Men ideal (Devine)", type: "line", color: "#0f766e", id: "men" },
              ]}
            />

            {/* Floating healthy band: invisible floor + visible span on top */}
            <Area
              dataKey="low"
              stackId="band"
              stroke="none"
              fill="transparent"
              name="Healthy range floor"
              legendType="none"
              activeDot={false}
            />
            <Area
              dataKey="span"
              stackId="band"
              stroke="none"
              fill="#a7f3d0"
              fillOpacity={0.55}
              name="Healthy band"
              legendType="none"
              activeDot={false}
            />

            <Line
              type="monotone"
              dataKey="women"
              name="Women ideal"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 2 }}
            />
            <Line
              type="monotone"
              dataKey="men"
              name="Men ideal"
              stroke="#0f766e"
              strokeWidth={3}
              dot={{ r: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Healthy range uses the CDC BMI window (18.5–24.9) for adults 20–64. Ideal
        target lines use the Devine formula. Both are screening guides, not a
        diagnosis. Frame size, muscle, and age move where you fit inside the band.
      </p>
    </div>
  );
}
