"use client";

/** Simple SVG arc gauge for the 0-100 Metabolic Health Score. */
export function ScoreGauge({ score, grade }: { score: number; grade: string }) {
  const radius = 80;
  const circumference = Math.PI * radius; // half circle
  const pct = Math.min(100, Math.max(0, score)) / 100;
  const dash = circumference * pct;
  const color = score >= 80 ? "#16a34a" : score >= 60 ? "#ca8a04" : "#dc2626";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-full max-w-[200px]" height="auto">
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
        <text x="100" y="95" textAnchor="middle" className="fill-gray-900" fontSize="40" fontWeight="700">
          {score}
        </text>
      </svg>
      <div className="mt-1 text-sm font-medium text-gray-500">
        Metabolic Health Score · Grade {grade}
      </div>
    </div>
  );
}
