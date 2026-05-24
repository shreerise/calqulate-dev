// components/charts/WorkoutStatsBar.tsx
"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

/**
 * Visualises the training focus for each body shape across 6 dimensions.
 * Helps readers see what kind of gym plan matches their shape.
 */

const maleData = [
  { dimension: "Strength", ectomorph: 95, mesomorph: 90, endomorph: 65, rectangle: 70 },
  { dimension: "Fat Burn", ectomorph: 20, mesomorph: 60, endomorph: 95, rectangle: 55 },
  { dimension: "Cardio", ectomorph: 20, mesomorph: 75, endomorph: 90, rectangle: 50 },
  { dimension: "Muscle Size", ectomorph: 90, mesomorph: 85, endomorph: 55, rectangle: 70 },
  { dimension: "Core Focus", ectomorph: 40, mesomorph: 70, endomorph: 80, rectangle: 90 },
  { dimension: "Flexibility", ectomorph: 45, mesomorph: 60, endomorph: 50, rectangle: 55 },
];

const femaleData = [
  { dimension: "Glute Build", pear: 65, apple: 75, hourglass: 95, rectangle: 95, inverted: 95 },
  { dimension: "Fat Burn", pear: 60, apple: 95, hourglass: 50, rectangle: 40, inverted: 45 },
  { dimension: "Upper Build", pear: 95, apple: 55, hourglass: 70, rectangle: 75, inverted: 30 },
  { dimension: "Core Focus", pear: 50, apple: 90, hourglass: 80, rectangle: 85, inverted: 75 },
  { dimension: "Cardio", pear: 55, apple: 90, hourglass: 55, rectangle: 50, inverted: 50 },
  { dimension: "Flexibility", pear: 60, apple: 55, hourglass: 65, rectangle: 60, inverted: 55 },
];

export default function WorkoutStatsBar() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-8">
      <h3 className="text-xl font-bold text-black md:text-2xl">
        Training Focus by Body Shape — Visual Comparison
      </h3>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        The radar charts below show the recommended training emphasis for each body shape across six dimensions. A higher score means more training volume in that dimension for your shape — not a higher absolute intensity.
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {/* Male Chart */}
        <div>
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
            Male Body Types
          </p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={maleData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fontSize: 11, fill: "#374151", fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fontSize: 9, fill: "#9ca3af" }}
                  tickCount={4}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Radar name="Ectomorph" dataKey="ectomorph" stroke="#16a34a" fill="#16a34a" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Mesomorph" dataKey="mesomorph" stroke="#111827" fill="#111827" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="Endomorph" dataKey="endomorph" stroke="#6b7280" fill="#6b7280" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="Rectangle" dataKey="rectangle" stroke="#15803d" fill="#15803d" fillOpacity={0.1} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Female Chart */}
        <div>
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
            Female Body Shapes
          </p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={femaleData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fontSize: 11, fill: "#374151", fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fontSize: 9, fill: "#9ca3af" }}
                  tickCount={4}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Radar name="Pear" dataKey="pear" stroke="#16a34a" fill="#16a34a" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Apple" dataKey="apple" stroke="#111827" fill="#111827" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="Hourglass" dataKey="hourglass" stroke="#6b7280" fill="#6b7280" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="Rectangle" dataKey="rectangle" stroke="#15803d" fill="#15803d" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="Inv. Triangle" dataKey="inverted" stroke="#374151" fill="#374151" fillOpacity={0.1} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center">
        Training focus scores are relative weights, not absolute intensity levels. A score of 95 means that dimension is the highest priority for that shape.
      </p>
    </div>
  );
}
