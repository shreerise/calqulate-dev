"use client";

import { useMemo, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ImagePlus, Ruler, Calculator, RefreshCw } from "lucide-react";

// Keep for parity with your pattern (no-op component, SSR-safe)
const Noop = dynamic(() => Promise.resolve(() => null), { ssr: false });

/* -------------------- Types & constants -------------------- */

type FaceShapeKey =
  | "oval"
  | "round"
  | "square"
  | "oblong"
  | "heart"
  | "diamond"
  | "triangle";

type Measures = {
  faceLength: number;
  foreheadWidth: number;
  cheekboneWidth: number;
  jawlineWidth: number;
};

const SHAPE_TIPS: Record<FaceShapeKey, { title: string; bullets: string[] }> = {
  oval: {
    title: "Oval",
    bullets: [
      "Most hairstyles suit; try textured quiff or long layers.",
      "Avoid heavy, straight fringe that hides length.",
      "Wayfarer, aviator, or rectangular glasses work well.",
    ],
  },
  round: {
    title: "Round",
    bullets: [
      "Add height on top (pompadour, faux hawk).",
      "Keep sides tighter for verticality.",
      "Choose angular or rectangular glasses.",
    ],
  },
  square: {
    title: "Square",
    bullets: [
      "Textured crop or side part to soften corners.",
      "Rounded beard lines can soften angles.",
      "Round/oval frames complement angular features.",
    ],
  },
  oblong: {
    title: "Oblong (Rectangular)",
    bullets: [
      "Add width with medium length and a side part.",
      "Avoid extra vertical height without side volume.",
      "Choose taller lenses; avoid ultra-narrow frames.",
    ],
  },
  heart: {
    title: "Heart (Inverted Triangle)",
    bullets: [
      "Side-swept fringe; add width at jaw with layers.",
      "Beard fullness near jaw balances a narrow chin.",
      "Light or rimless frames reduce top heaviness.",
    ],
  },
  diamond: {
    title: "Diamond",
    bullets: [
      "Add width at forehead/jaw with layers or fringe.",
      "Short beard to widen jaw; avoid ultra-pointy chins.",
      "Oval and rimless frames flatter this shape.",
    ],
  },
  triangle: {
    title: "Triangle (Pear)",
    bullets: [
      "Volume at crown/temples to offset a strong jaw.",
      "Keep beard sides shorter; avoid adding jaw width.",
      "Top-heavy or semi-rimless frames draw eyes upward.",
    ],
  },
};

/* -------------------- Classification -------------------- */

function classify(m: Measures): { key: FaceShapeKey; reasons: string[] } {
  const { faceLength, foreheadWidth, cheekboneWidth, jawlineWidth } = m;

  const lengthRatio = faceLength / cheekboneWidth;
  const f_v_j = foreheadWidth - jawlineWidth;

  const widthsClose =
    Math.abs(foreheadWidth - cheekboneWidth) / cheekboneWidth < 0.07 &&
    Math.abs(jawlineWidth - cheekboneWidth) / cheekboneWidth < 0.07;

  // Oblong: relaxed to 1.5 to match common tools
  if (lengthRatio >= 1.5 && Math.abs(f_v_j) <= cheekboneWidth * 0.08) {
    return {
      key: "oblong",
      reasons: [
        `Face length ≈ ${lengthRatio.toFixed(2)}× cheekbone width (≥1.50).`,
        "Forehead and jaw widths are similar.",
      ],
    };
  }

  // Diamond
  const cheekDominant =
    cheekboneWidth > foreheadWidth * 1.06 && cheekboneWidth > jawlineWidth * 1.06;
  if (cheekDominant && lengthRatio >= 1.35 && lengthRatio <= 1.6) {
    return {
      key: "diamond",
      reasons: [
        "Cheekbones are the widest area.",
        `Length/cheek ratio ${lengthRatio.toFixed(2)} fits diamond pattern.`,
      ],
    };
  }

  // Heart vs Triangle
  if (f_v_j > cheekboneWidth * 0.05 && jawlineWidth < foreheadWidth * 0.93) {
    return {
      key: "heart",
      reasons: [
        "Forehead noticeably wider than jawline.",
        `Δ ≈ ${f_v_j.toFixed(2)} units.`,
      ],
    };
  }
  if (f_v_j < -cheekboneWidth * 0.05 && jawlineWidth > foreheadWidth * 1.05) {
    return {
      key: "triangle",
      reasons: [
        "Jawline wider than forehead.",
        `Δ ≈ ${Math.abs(f_v_j).toFixed(2)} units.`,
      ],
    };
  }

  // Square vs Round when widths are similar
  if (widthsClose) {
    if (lengthRatio <= 1.15) {
      return {
        key: "round",
        reasons: [
          "Forehead, cheekbone, and jaw widths are very similar.",
          `Length/cheek ratio ${lengthRatio.toFixed(2)} suggests a round outline.`,
        ],
      };
    }
    if (lengthRatio > 1.15 && lengthRatio <= 1.35) {
      return {
        key: "square",
        reasons: [
          "Similar widths with a stronger lower third.",
          `Length/cheek ratio ${lengthRatio.toFixed(2)} suggests square.`,
        ],
      };
    }
  }

  // Oval window
  if (lengthRatio > 1.3 && lengthRatio < 1.6 && foreheadWidth >= jawlineWidth * 0.95) {
    return {
      key: "oval",
      reasons: [
        `Length ≈ ${lengthRatio.toFixed(2)}× cheek width (≈1.3–1.6).`,
        "Forehead is equal or slightly wider than jawline.",
      ],
    };
  }

  // Fallback
  return {
    key: lengthRatio >= 1.45 ? "oblong" : f_v_j >= 0 ? "oval" : "square",
    reasons: ["Fallback: length ratio + width balance."],
  };
}

/* -------------------- Manual form -------------------- */

const manualSchema = z.object({
  units: z.enum(["cm", "in"]),
  faceLength: z.string().min(1),
  foreheadWidth: z.string().min(1),
  cheekboneWidth: z.string().min(1),
  jawlineWidth: z.string().min(1),
});
type ManualValues = z.infer<typeof manualSchema>;

function convert(v: number, from: "cm" | "in", to: "cm" | "in") {
  if (from === to) return v;
  return from === "cm" ? v / 2.54 : v * 2.54;
}

/* -------------------- MediaPipe (on-device) -------------------- */

type MediaPipe = typeof import("@mediapipe/tasks-vision");
let FaceLandmarker: any;
let FilesetResolver: any;

async function loadMediapipe() {
  if (!FaceLandmarker || !FilesetResolver) {
    const mod: MediaPipe = await import("@mediapipe/tasks-vision");
    FaceLandmarker = mod.FaceLandmarker;
    FilesetResolver = mod.FilesetResolver;
  }
}

// geom utils
function rotatePoints(pts: number[][], angle: number, cx: number, cy: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return pts.map(([x, y]) => {
    const dx = x - cx;
    const dy = y - cy;
    return [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos];
  });
}
function dist(a: [number, number], b: [number, number]) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.hypot(dx, dy);
}
function getPt(lmks: any[], idx: number, W: number, H: number) {
  const p = lmks[idx];
  return p ? [p.x * W, p.y * H] : null;
}
function widthAtY(pts: number[][], y: number, band: number) {
  const slice = pts.filter((p) => Math.abs(p[1] - y) < band);
  if (slice.length < 2) return 0;
  const left = Math.min(...slice.map((p) => p[0]));
  const right = Math.max(...slice.map((p) => p[0]));
  return right - left;
}
const IDX = {
  top: 10,
  chin: 152,
  eyeLO: 33,
  eyeRO: 263,
  zygL: 93, // cheekbone zygion left
  zygR: 323, // cheekbone zygion right
  jawL: 227, // jaw angle left
  jawR: 447, // jaw angle right
  frL: 108, // forehead band left (above brow)
  frR: 338, // forehead band right
};

/* -------------------- Component -------------------- */

export default function FaceShapeCalculator() {
  const [activeTab, setActiveTab] = useState<"photo" | "manual">("photo");

  // manual form
  const manualForm = useForm<ManualValues>({
    resolver: zodResolver(manualSchema),
    defaultValues: {
      units: "cm",
      faceLength: "",
      foreheadWidth: "",
      cheekboneWidth: "",
      jawlineWidth: "",
    },
  });
  const [unitSystem, setUnitSystem] = useState<"cm" | "in">("cm");
  const [manualResult, setManualResult] = useState<{
    key: FaceShapeKey;
    reasons: string[];
  } | null>(null);

  const handleUnitsChange = (newUnit: "cm" | "in") => {
    const prevUnit = manualForm.getValues("units");
    if (prevUnit === newUnit) return;

    (["faceLength", "foreheadWidth", "cheekboneWidth", "jawlineWidth"] as const).forEach(
      (k) => {
        const raw = manualForm.getValues(k) as unknown as string;
        const num = parseFloat(raw);
        if (Number.isFinite(num) && num > 0) {
          manualForm.setValue(k, convert(num, prevUnit, newUnit).toFixed(2), {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: false,
          });
        }
      }
    );

    manualForm.setValue("units", newUnit, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    });
    setUnitSystem(newUnit);
  };

  const onManualSubmit = (v: ManualValues) => {
    const m: Measures = {
      faceLength: parseFloat(v.faceLength),
      foreheadWidth: parseFloat(v.foreheadWidth),
      cheekboneWidth: parseFloat(v.cheekboneWidth),
      jawlineWidth: parseFloat(v.jawlineWidth),
    };
    setManualResult(classify(m));
  };

  // photo mode
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [isModelReady, setIsModelReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const faceLmRef = useRef<any>(null);

  const [photoMeasures, setPhotoMeasures] = useState<Measures | null>(null);
  const [photoResult, setPhotoResult] = useState<{
    key: FaceShapeKey;
    reasons: string[];
    confidence: number;
  } | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const [ipdMm, setIpdMm] = useState<number | "">(62);
  const pxPerCm = useMemo(() => {
    if (!photoMeasures || !ipdMm || ipdMm <= 0) return undefined;
    const assumedIpdCm = Number(ipdMm) / 10; // mm -> cm
    // heuristic: cheekbone width ≈ 2 × IPD
    return photoMeasures.cheekboneWidth / (assumedIpdCm * 2.0);
  }, [photoMeasures, ipdMm]);
  const toCm = (px?: number) => (pxPerCm && px ? px / pxPerCm : undefined);

  async function ensureModel() {
    if (isModelReady) return;
    setLoading(true);
    await loadMediapipe();
    const fileset = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );
    faceLmRef.current = await FaceLandmarker.createFromOptions(fileset, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
      runningMode: "IMAGE",
      numFaces: 1,
    });
    setIsModelReady(true);
    setLoading(false);
  }

  async function analyzePhoto(src: string) {
    const canvas = canvasRef.current;
    if (!canvas || !faceLmRef.current || !src) return;

    const img = new Image();
    img.onload = () => {
      const maxH = 640;
      const scale = img.height > maxH ? maxH / img.height : 1;
      const W = Math.round(img.width * scale);
      const H = Math.round(img.height * scale);
      canvas.width = W;
      canvas.height = H;

      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0, W, H);

      const res = faceLmRef.current.detect(canvas);
      if (!res?.faceLandmarks?.length) {
        setPhotoMeasures(null);
        setPhotoResult(null);
        setPhotoError("No face detected. Try a brighter, front-facing photo without glasses.");
        return;
      }
      setPhotoError(null);

      const lmks = res.faceLandmarks[0] as any[];

      // landmarks we need (canvas coords)
      const L = getPt(lmks, IDX.eyeLO, W, H);
      const R = getPt(lmks, IDX.eyeRO, W, H);
      const top = getPt(lmks, IDX.top, W, H);
      const chin = getPt(lmks, IDX.chin, W, H);

      if (!L || !R || !top || !chin) {
        // fallback: slice method
        const pts0 = lmks.map((p: any) => [p.x * W, p.y * H]);
        const minY = Math.min(...pts0.map((p) => p[1]));
        const maxY = Math.max(...pts0.map((p) => p[1]));
        const faceLen = (maxY - minY) * 1.08; // hairline compensation
        const band = (maxY - minY) * 0.035;

        const eyeY = (L && R) ? (L[1] + R[1]) / 2 : minY + 0.5 * (maxY - minY);
        const foreheadY = minY + 0.24 * (maxY - minY);
        const cheekY = eyeY;
        const jawY = minY + 0.8 * (maxY - minY);

        const foreheadWidth = Math.max(
          widthAtY(pts0, foreheadY, band),
          widthAtY(pts0, foreheadY + band * 0.6, band)
        );
        const cheekboneWidth = Math.max(
          widthAtY(pts0, cheekY, band),
          widthAtY(pts0, cheekY + band * 0.6, band)
        );
        const jawlineWidth = Math.max(
          widthAtY(pts0, jawY, band),
          widthAtY(pts0, jawY + band * 0.6, band)
        );

        const m = { faceLength: faceLen, foreheadWidth, cheekboneWidth, jawlineWidth };
        setPhotoMeasures(m);
        const cls = classify(m);
        setPhotoResult({ ...cls, confidence: 0.45 });
        return;
      }

      // ALIGN by eye line
      const cx = W / 2,
        cy = H / 2;
      const angle = Math.atan2(R[1] - L[1], R[0] - L[0]);
      const pts = lmks.map((p: any) => [p.x * W, p.y * H]);
      const rot = rotatePoints(pts, -angle, cx, cy);
      const P = (i: number) =>
        rotatePoints([getPt(lmks, i, W, H)!], -angle, cx, cy)[0] as [number, number];

      // Preferred landmark pairs (with hairline compensation on length)
      const zL = getPt(lmks, IDX.zygL, W, H);
      const zR = getPt(lmks, IDX.zygR, W, H);
      const jL = getPt(lmks, IDX.jawL, W, H);
      const jR = getPt(lmks, IDX.jawR, W, H);
      const fL = getPt(lmks, IDX.frL, W, H);
      const fR = getPt(lmks, IDX.frR, W, H);

      let measures: Measures | null = null;
      if (zL && zR && jL && jR && fL && fR) {
        const topR = rotatePoints([top], -angle, cx, cy)[0] as [number, number];
        const chinR = rotatePoints([chin], -angle, cx, cy)[0] as [number, number];

        const faceLength = dist(topR, chinR) * 1.08; // +8% hairline
        const cheekboneWidth = dist(P(IDX.zygL), P(IDX.zygR));
        const jawlineWidth = dist(P(IDX.jawL), P(IDX.jawR));
        const foreheadWidth = dist(P(IDX.frL), P(IDX.frR));

        measures = { faceLength, foreheadWidth, cheekboneWidth, jawlineWidth };
      } else {
        // fallback to slice
        const minY = Math.min(...rot.map((p) => p[1]));
        const maxY = Math.max(...rot.map((p) => p[1]));
        const faceLen = (maxY - minY) * 1.08;
        const band = (maxY - minY) * 0.035;
        const eyeMidY = rotatePoints(
          [[(L[0] + R[0]) / 2, (L[1] + R[1]) / 2]],
          -angle,
          cx,
          cy
        )[0][1];

        const foreheadY = minY + 0.24 * (maxY - minY);
        const cheekY = eyeMidY;
        const jawY = minY + 0.8 * (maxY - minY);

        const foreheadWidth = Math.max(
          widthAtY(rot, foreheadY, band),
          widthAtY(rot, foreheadY + band * 0.6, band)
        );
        const cheekboneWidth = Math.max(
          widthAtY(rot, cheekY, band),
          widthAtY(rot, cheekY + band * 0.6, band)
        );
        const jawlineWidth = Math.max(
          widthAtY(rot, jawY, band),
          widthAtY(rot, jawY + band * 0.6, band)
        );

        measures = { faceLength: faceLen, foreheadWidth, cheekboneWidth, jawlineWidth };
      }

      setPhotoMeasures(measures);

      // draw thin guides (optional; using fallback Y levels)
      ctx.save();
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0,0,0,0.5)";
      // approximate guide lines: use thirds between top & chin in rotated space
      const topR = rotatePoints([top], -angle, cx, cy)[0] as [number, number];
      const chinR = rotatePoints([chin], -angle, cx, cy)[0] as [number, number];
      const minY = topR[1];
      const maxY = chinR[1];
      const faceLen = maxY - minY;
      const gYs = [minY + 0.24 * faceLen, minY + 0.5 * faceLen, minY + 0.8 * faceLen];
      gYs.forEach((gy) => {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      });
      ctx.restore();

      const cls = classify(measures);
      const lengthRatio = measures.faceLength / measures.cheekboneWidth;
      const f_v_j = measures.foreheadWidth - measures.jawlineWidth;
      let conf = 0.45;
      if (cls.key === "oblong") conf = Math.min(0.95, 0.5 + (lengthRatio - 1.5) * 0.7);
      if (cls.key === "diamond")
        conf = Math.min(
          0.9,
          0.5 +
            (measures.cheekboneWidth /
              Math.max(measures.foreheadWidth, measures.jawlineWidth) -
              1.06) *
              3
        );
      if (cls.key === "heart" || cls.key === "triangle")
        conf = Math.min(0.9, 0.5 + (Math.abs(f_v_j) / measures.cheekboneWidth) * 2.5);
      if (cls.key === "square" || cls.key === "round")
        conf = Math.min(
          0.85,
          0.5 +
            Math.abs(lengthRatio - (cls.key === "round" ? 1.05 : 1.25)) * 1.5
        );

      setPhotoResult({ ...cls, confidence: Math.max(0.35, conf) });
    };
    img.src = src;
  }

  const ensureModelAndAnalyze = async (src: string) => {
    await ensureModel();
    await analyzePhoto(src);
  };

  /* -------------------- UI -------------------- */

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Face Shape Calculator
          </CardTitle>
          <CardDescription>
            Choose a method below. The photo option runs completely in your browser
            (privacy-safe).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="photo" className="flex items-center gap-2">
                <ImagePlus className="w-4 h-4" /> From Photo
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <Ruler className="w-4 h-4" /> Manual
              </TabsTrigger>
            </TabsList>

            {/* PHOTO TAB */}
            <TabsContent value="photo" className="mt-6 space-y-4">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Use a front-facing, well-lit photo. Processing happens <b>on your device</b>.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded bg-muted">
                    {isModelReady ? "Model Ready" : loading ? "Loading model…" : "Model not loaded"}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm">IPD (mm)</label>
                    <Input
                      type="number"
                      className="w-24"
                      value={ipdMm}
                      onChange={(e) =>
                        setIpdMm(e.target.value === "" ? "" : Number(e.target.value))
                      }
                    />
                  </div>
                </div>

                {/* Upload area */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer.files?.[0];
                    if (f) {
                      const url = URL.createObjectURL(f);
                      setFileUrl(url);
                      setPhotoMeasures(null);
                      setPhotoResult(null);
                      setPhotoError(null);
                      ensureModelAndAnalyze(url);
                    }
                  }}
                  className="rounded-lg border border-dashed p-4 bg-muted/30"
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                  }}
                >
                  <input
                    ref={fileInputRef}
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    capture="user"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const url = URL.createObjectURL(f);
                      setFileUrl(url);
                      setPhotoMeasures(null);
                      setPhotoResult(null);
                      setPhotoError(null);
                      ensureModelAndAnalyze(url);
                    }}
                  />
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="shrink-0"
                    >
                      <ImagePlus className="w-4 h-4 mr-2" />
                      Upload / Take a photo
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Click to choose, or drag & drop an image here.
                    </p>
                  </div>
                </div>

                {/* Single compact canvas preview */}
                {fileUrl && (
                  <div className="mt-4">
                    <canvas
                      ref={canvasRef}
                      className="w-full max-h-80 rounded-lg border object-contain"
                    />
                  </div>
                )}
                {photoError && (
                  <p className="text-sm text-red-600 mt-2">{photoError}</p>
                )}
              </div>

              {/* Results */}
              {photoMeasures && photoResult && (
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Your Face Shape</CardTitle>
                      <CardDescription>Transparent ratios + tips</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-3">
                        <p className="text-2xl font-bold">
                          {photoResult.key.toUpperCase()}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          {Math.round(photoResult.confidence * 100)}% confidence
                        </div>
                      </div>
                      <div className="mt-2 h-2 w-full rounded bg-muted overflow-hidden">
                        <div
                          className="h-2 bg-primary"
                          style={{
                            width: `${Math.max(
                              8,
                              Math.min(100, Math.round(photoResult.confidence * 100))
                            )}%`,
                          }}
                        />
                      </div>
                      <ul className="list-disc pl-5 text-sm mt-3 space-y-1">
                        {photoResult.reasons.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <h4 className="font-semibold">
                          {SHAPE_TIPS[photoResult.key].title} tips
                        </h4>
                        <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                          {SHAPE_TIPS[photoResult.key].bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Measurements</CardTitle>
                      <CardDescription>
                        Pixels with optional cm estimate
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3 text-sm">
                      {(
                        [
                          ["Face length", photoMeasures.faceLength],
                          ["Forehead width", photoMeasures.foreheadWidth],
                          ["Cheekbone width", photoMeasures.cheekboneWidth],
                          ["Jawline width", photoMeasures.jawlineWidth],
                        ] as const
                      ).map(([label, px]) => {
                        const cm = toCm(px);
                        return (
                          <div key={label} className="rounded border p-3">
                            <div className="font-medium">{label}</div>
                            <div>
                              {Math.round(px)} px
                              {cm ? ` • ${cm.toFixed(1)} cm` : ""}
                            </div>
                          </div>
                        );
                      })}
                      <p className="col-span-2 text-xs text-muted-foreground">
                        Real-world sizes estimated via IPD heuristic (edit IPD for better
                        accuracy).
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {/* MANUAL TAB */}
            <TabsContent value="manual" className="mt-6">
              <Card className="border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-primary" />
                    Enter Measurements
                  </CardTitle>
                  <CardDescription>
                    Use a flexible tape measure. Keep it level with the floor.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...manualForm}>
                    <form
                      onSubmit={manualForm.handleSubmit(onManualSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={manualForm.control}
                        name="units"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Units</FormLabel>
                            <FormControl>
                              <RadioGroup
                                value={field.value}
                                onValueChange={(val) => {
                                  const newUnit = val as "cm" | "in";
                                  handleUnitsChange(newUnit);
                                  field.onChange(newUnit);
                                }}
                                className="flex items-center gap-6"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="cm" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Centimeters
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="in" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Inches
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={manualForm.control}
                          name="faceLength"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Face Length ({unitSystem})</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.1"
                                  placeholder="e.g., 19.5"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={manualForm.control}
                          name="foreheadWidth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Forehead Width ({unitSystem})</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.1"
                                  placeholder="e.g., 14.0"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={manualForm.control}
                          name="cheekboneWidth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cheekbone Width ({unitSystem})</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.1"
                                  placeholder="e.g., 13.0"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={manualForm.control}
                          name="jawlineWidth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Jawline Width ({unitSystem})</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.1"
                                  placeholder="e.g., 12.5"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Button type="submit" className="flex-1">
                          <Calculator className="h-4 w-4 mr-2" />
                          Classify Face Shape
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            manualForm.reset();
                            setManualResult(null);
                          }}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </form>
                  </Form>

                  {manualResult && (
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Your Face Shape</CardTitle>
                          <CardDescription>Based on your inputs</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">
                            {manualResult.key.toUpperCase()}
                          </p>
                          <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                            {manualResult.reasons.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Style Tips</CardTitle>
                          <CardDescription>Quick recommendations</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <h4 className="font-semibold">
                            {SHAPE_TIPS[manualResult.key].title}
                          </h4>
                          <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                            {SHAPE_TIPS[manualResult.key].bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
