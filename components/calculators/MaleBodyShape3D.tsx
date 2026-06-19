// components/calculators/MaleBodyShape3D.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  classifyMaleShape,
  getShape,
  shapePresets,
  defaultMeasurements,
  maleShapes,
  type Measurements,
  type ShapeId,
} from "@/lib/blog/male-body-shape-data";

/**
 * Interactive, pseudo-3D male body shape visualizer.
 *
 * How the "3D" works without a 3D library: the same SVG silhouette is stacked
 * in several layers along the Z axis inside a `transform-style: preserve-3d`
 * stage. With perspective applied and the stage rotated on Y, those layers
 * separate into a solid, extruded figure you can spin and drag. The outline
 * morphs in real time from four measurements, and the shape is classified with
 * the same ratio algorithm the calculator uses.
 *
 * Everything is React state plus one requestAnimationFrame loop. No WebGL, no
 * extra dependency, and it stays smooth on phones.
 */

const CALC_HREF = "/health/body-shape-calculator";
const LAYERS = 8;            // extrusion depth (more = heavier)
const DEPTH = 26;            // total Z spread in px
const VIEW_W = 200;
const VIEW_H = 380;

/* measurement slider config (inches) */
const SLIDERS: { key: keyof Measurements; label: string; min: number; max: number }[] = [
  { key: "shoulders", label: "Shoulders", min: 34, max: 56 },
  { key: "chest", label: "Chest", min: 32, max: 54 },
  { key: "waist", label: "Waist", min: 26, max: 50 },
  { key: "hips", label: "Hips", min: 32, max: 52 },
];

/* ── colour helpers ─────────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}
// back (dark jade) → front (light mint)
function layerColor(t: number) {
  const back = [6, 78, 59]; // #064e3b
  const front = [110, 231, 183]; // #6ee7b7
  return `rgb(${lerp(back[0], front[0], t)}, ${lerp(back[1], front[1], t)}, ${lerp(
    back[2],
    front[2],
    t
  )})`;
}

/* ── build the silhouette path from measurements ────────────────── */
function half(measure: number) {
  // map an inches measurement to a half-width in viewBox px, clamped
  const px = measure * 1.35;
  return Math.max(16, Math.min(82, px));
}

// Catmull-Rom through a closed loop of points → smooth SVG path
function smoothClosedPath(pts: [number, number][]): string {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} `;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
  }
  return d + "Z";
}

function bodyPaths(m: Measurements) {
  const cx = 100;
  const sh = half(m.shoulders);
  const ch = half(m.chest);
  const wa = half(m.waist);
  const hp = half(m.hips);
  const neck = 12;

  // torso outline, clockwise
  const torso: [number, number][] = [
    [cx + neck, 64],
    [cx + sh, 92],
    [cx + ch, 130],
    [cx + wa, 196],
    [cx + hp, 232],
    [cx - hp, 232],
    [cx - wa, 196],
    [cx - ch, 130],
    [cx - sh, 92],
    [cx - neck, 64],
  ];
  const torsoPath = smoothClosedPath(torso);

  // two legs below the hips
  const legL = `M ${cx - hp} 232 L ${cx - 6} 232 L ${cx - 9} 372 L ${(cx - hp * 0.55).toFixed(1)} 372 Z`;
  const legR = `M ${cx + hp} 232 L ${cx + 6} 232 L ${cx + 9} 372 L ${(cx + hp * 0.55).toFixed(1)} 372 Z`;

  return { torsoPath, legL, legR };
}

export default function MaleBodyShape3D() {
  const [m, setM] = useState<Measurements>(defaultMeasurements);
  const [angle, setAngle] = useState(-22);
  const [spinning, setSpinning] = useState(true);
  const [activePreset, setActivePreset] = useState<ShapeId | null>("trapezoid");

  const dragging = useRef(false);
  const last = useRef({ x: 0, a: 0 });
  const rafA = useRef(angle);

  // auto-spin loop
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (spinning && !dragging.current) {
        rafA.current += 0.45;
        setAngle(rafA.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [spinning]);

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    last.current = { x: e.clientX, a: rafA.current };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const next = last.current.a + (e.clientX - last.current.x) * 0.6;
    rafA.current = next;
    setAngle(next);
  }
  function onPointerUp() {
    dragging.current = false;
  }

  function update(key: keyof Measurements, value: number) {
    setActivePreset(null);
    setM((prev) => ({ ...prev, [key]: value }));
  }
  function applyPreset(id: ShapeId) {
    setActivePreset(id);
    setM(shapePresets[id]);
  }

  const shapeId = classifyMaleShape(m);
  const shape = getShape(shapeId);
  const { torsoPath, legL, legR } = bodyPaths(m);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-4 ring-1 ring-emerald-200 md:p-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* ── 3D STAGE ─────────────────────────────── */}
        <div className="flex flex-col items-center">
          <div
            className="relative aspect-square w-full max-w-sm cursor-grab touch-none select-none active:cursor-grabbing"
            style={{ perspective: "1100px" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {/* ground shadow */}
            <div className="absolute bottom-[8%] left-1/2 h-6 w-2/5 -translate-x-1/2 rounded-[100%] bg-emerald-900/20 blur-md" />

            <div
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(8deg) rotateY(${angle}deg)`,
                transition: dragging.current ? "none" : "transform 0.05s linear",
              }}
            >
              {Array.from({ length: LAYERS }).map((_, i) => {
                const t = i / (LAYERS - 1);
                const z = -DEPTH / 2 + t * DEPTH;
                const isFront = i === LAYERS - 1;
                return (
                  <svg
                    key={i}
                    viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                    className="absolute inset-0 h-full w-full"
                    style={{ transform: `translateZ(${z}px)` }}
                  >
                    {/* head */}
                    <circle cx={100} cy={40} r={20} fill={layerColor(t)} />
                    <rect x={89} y={56} width={22} height={14} fill={layerColor(t)} />
                    {/* torso + legs */}
                    <path d={torsoPath} fill={layerColor(t)} />
                    <path d={legL} fill={layerColor(t)} />
                    <path d={legR} fill={layerColor(t)} />
                    {/* front-face soft highlight */}
                    {isFront && (
                      <>
                        <path d={torsoPath} fill="url(#sheen)" opacity={0.25} />
                      </>
                    )}
                    {isFront && (
                      <defs>
                        <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    )}
                  </svg>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSpinning((s) => !s)}
              className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              {spinning ? "Pause spin" : "Auto-spin"}
            </button>
            <span className="text-xs text-slate-500">Drag the figure to rotate</span>
          </div>
        </div>

        {/* ── CONTROLS + RESULT ────────────────────── */}
        <div className="flex flex-col">
          {/* preset chips */}
          <div className="flex flex-wrap gap-2">
            {maleShapes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => applyPreset(s.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  activePreset === s.id
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-emerald-300"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* sliders */}
          <div className="mt-4 space-y-3">
            {SLIDERS.map((s) => (
              <div key={s.key}>
                <div className="flex items-center justify-between text-sm">
                  <label className="font-semibold text-slate-700">{s.label}</label>
                  <span className="font-bold text-slate-900">{m[s.key]}"</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={m[s.key]}
                  onChange={(e) => update(s.key, parseInt(e.target.value, 10))}
                  className="mt-1 w-full accent-emerald-600"
                />
              </div>
            ))}
          </div>

          {/* live result */}
          <div className="mt-5 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Your shape
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{shape.name}</p>
            <p className="text-sm font-medium text-slate-500">{shape.tagline}</p>
            <p className="mt-2 text-sm text-slate-600">{shape.description}</p>
            <Link
              href={CALC_HREF}
              className="mt-4 inline-block rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Get my full result on the calculator →
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Visual estimate for guidance. The figure morphs from your numbers and the
        shape is read from your ratios. Enter exact measurements on the free{" "}
        <Link href={CALC_HREF} className="font-semibold text-emerald-600">
          body shape calculator
        </Link>{" "}
        for your saved result.
      </p>
    </div>
  );
}
