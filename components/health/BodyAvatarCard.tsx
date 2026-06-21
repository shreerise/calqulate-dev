"use client";
import dynamic from "next/dynamic";
import { Box } from "lucide-react";

// three/R3F must not run on the server.
const BodyAvatar = dynamic(() => import("./BodyAvatar"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-gray-500">Loading 3D model…</div>,
});

export interface BodyAvatarCardProps {
  score: number;
  bodyFatPct?: number | null;
  waistToHeight?: number | null;
  leanMassKg?: number | null;
  bmi?: number | null;
  sex?: "male" | "female";
}

export function BodyAvatarCard(props: BodyAvatarCardProps) {
  const stats = [
    { label: "Body fat", value: props.bodyFatPct != null ? `${props.bodyFatPct}%` : "—" },
    { label: "Lean mass", value: props.leanMassKg != null ? `${props.leanMassKg} kg` : "—" },
    { label: "Waist / height", value: props.waistToHeight != null ? `${props.waistToHeight}` : "—" },
    { label: "BMI", value: props.bmi != null ? `${props.bmi}` : "—" },
  ];

  return (
    <section className="overflow-hidden rounded-3xl bg-gray-950 text-gray-100">
      <div className="grid lg:grid-cols-[1fr_1fr]">
        {/* 3D viewport */}
        <div className="relative h-[340px] bg-gradient-to-b from-gray-900 to-gray-950 lg:h-auto lg:min-h-[360px]">
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            <Box className="h-4 w-4" /> Digital twin
          </div>
          <BodyAvatar score={props.score} bodyFatPct={props.bodyFatPct} waistToHeight={props.waistToHeight} sex={props.sex} />
          <div className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-gray-500">drag to rotate · color = metabolic score</div>
        </div>

        {/* Readout */}
        <div className="flex flex-col justify-center p-6 lg:p-8">
          <h2 className="text-xl font-bold text-white">Your body, modeled</h2>
          <p className="mt-1 text-sm text-gray-400">
            The model morphs with your composition and is tinted by your metabolic score. Watch it lean out as your
            numbers improve.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-gray-800 bg-gray-900/60 p-4">
                <div className="text-lg font-extrabold text-white">{s.value}</div>
                <div className="text-[11px] uppercase tracking-wide text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
