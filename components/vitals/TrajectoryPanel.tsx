import { TrendingUp, TrendingDown, Minus } from "lucide-react";

/**
 * Server-rendered summary of the Kalman trajectory engine output.
 * This is the "is it actually working?" panel — the engagement hook that makes
 * the score move between lab tests and separates real signal from noise.
 */
export interface TrajectorySummary {
  count: number;
  direction: "improving" | "worsening" | "holding";
  weeklyChange: number;
  netSignalChange: number;
  noiseShare: number;
  forecast8wk: number | null;
  realNote: string;
  current: number | null;
}

export function TrajectoryPanel({ s }: { s: TrajectorySummary }) {
  if (s.count < 2) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        <h3 className="text-sm font-medium text-gray-500">Your trajectory</h3>
        <p className="mt-2 text-sm text-gray-600">
          Add a second measurement and the trajectory engine will start telling you whether your score
          is genuinely improving — or just bouncing on daily noise.
        </p>
      </div>
    );
  }

  const cfg = {
    improving: { label: "Improving", color: "text-emerald-700", bg: "bg-emerald-50", icon: <TrendingUp className="h-5 w-5" /> },
    worsening: { label: "Worsening", color: "text-red-700", bg: "bg-red-50", icon: <TrendingDown className="h-5 w-5" /> },
    holding: { label: "Holding steady", color: "text-gray-700", bg: "bg-gray-100", icon: <Minus className="h-5 w-5" /> },
  }[s.direction];

  const signalPct = Math.round((1 - s.noiseShare) * 100);

  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">Your trajectory</h3>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
          {cfg.icon} {cfg.label}
        </span>
      </div>

      <p className="mt-3 text-sm text-gray-700">{s.realNote}</p>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="text-lg font-bold text-gray-900">
            {s.weeklyChange >= 0 ? "+" : ""}{s.weeklyChange.toFixed(2)}
          </div>
          <div className="text-[11px] text-gray-500">pts / week</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="text-lg font-bold text-gray-900">
            {s.netSignalChange >= 0 ? "+" : ""}{s.netSignalChange.toFixed(1)}
          </div>
          <div className="text-[11px] text-gray-500">real change so far</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="text-lg font-bold text-gray-900">{s.forecast8wk != null ? Math.round(s.forecast8wk) : "—"}</div>
          <div className="text-[11px] text-gray-500">8-week forecast</div>
        </div>
      </div>

      {/* Signal vs noise bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-gray-500">
          <span>Signal {signalPct}%</span>
          <span>Noise {100 - signalPct}%</span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full bg-emerald-500" style={{ width: `${signalPct}%` }} />
        </div>
        <p className="mt-2 text-[11px] text-gray-400">
          We model your history statistically so a normal daily wiggle doesn&apos;t read as progress — or as failure.
        </p>
      </div>
    </div>
  );
}
