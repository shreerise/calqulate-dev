"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, ImagePlus, Ruler, Calculator, RefreshCw } from "lucide-react";
import next from "next";

// Lazy import to avoid SSR issues if someone extracts the logic later.
// (Main photo logic below doesn't require dynamic here, but keeping pattern consistent)
const Noop = dynamic(() => Promise.resolve(() => null), { ssr: false });

// -------------------- Classification & helpers --------------------

type FaceShapeKey =
  | "oval"
  | "round"
  | "square"
  | "oblong"
  | "heart"
  | "diamond"
  | "triangle";

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

type Measures = {
  faceLength: number;
  foreheadWidth: number;
  cheekboneWidth: number;
  jawlineWidth: number;
};

function classify(m: Measures): { key: FaceShapeKey; reasons: string[] } {
  const { faceLength, foreheadWidth, cheekboneWidth, jawlineWidth } = m;

  const lengthRatio = faceLength / cheekboneWidth;
  const f_v_j = foreheadWidth - jawlineWidth;

  const widthsClose =
    Math.abs(foreheadWidth - cheekboneWidth) / cheekboneWidth < 0.07 &&
    Math.abs(jawlineWidth - cheekboneWidth) / cheekboneWidth < 0.07;

  // Oblong first
  if (lengthRatio >= 1.6 && Math.abs(f_v_j) <= cheekboneWidth * 0.08) {
    return {
      key: "oblong",
      reasons: [
        `Face length ≈ ${lengthRatio.toFixed(2)}× cheekbone width (≥1.60).`,
        "Forehead and jaw widths are similar.",
      ],
    };
  }

  // Diamond: cheekbone dominant + ratio window
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

  // Square vs Round when widths similar
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

  // Oval default window
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

// -------------------- Manual form --------------------

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

// -------------------- Photo mode (MediaPipe, on-device) --------------------

/**
 * We load MediaPipe only after user intent (click). Files come from CDN by default.
 * If you prefer self-hosting, copy the model & wasm into /public/mediapipe and
 * replace URLs below.
 */
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

export default function FaceShapeCalculator() {
  const [activeTab, setActiveTab] = useState<"photo" | "manual">("photo");

  // ---------------- manual form ----------------
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
  const [manualResult, setManualResult] = useState<{ key: FaceShapeKey; reasons: string[] } | null>(null);
  const [unitSystem, setUnitSystem] = useState<"cm" | "in">("cm");

const handleUnitsChange = (newUnit: "cm" | "in") => {
  const prevUnit = manualForm.getValues("units");
  if (prevUnit === newUnit) return;

  const keys = ["faceLength", "foreheadWidth", "cheekboneWidth", "jawlineWidth"] as const;

  keys.forEach((k) => {
    const raw = manualForm.getValues(k) as unknown as string;
    const num = parseFloat(raw);
    if (Number.isFinite(num) && num > 0) {
      const converted = convert(num, prevUnit, newUnit).toFixed(2);
      manualForm.setValue(k, converted, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: false,
      });
    }
  });

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

  // ---------------- photo mode ----------------
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [isModelReady, setIsModelReady] = useState(false);
  const [photoMeasures, setPhotoMeasures] = useState<Measures | null>(null);
  const [photoResult, setPhotoResult] = useState<{ key: FaceShapeKey; reasons: string[] } | null>(null);
  const [ipdMm, setIpdMm] = useState<number | "">(62);
  const [loading, setLoading] = useState(false);
  const faceLmRef = useRef<any>(null);

  const pxPerCm = useMemo(() => {
    if (!photoMeasures || !ipdMm || ipdMm <= 0) return undefined;
    // heuristic: cheekbone width ~ 2 × IPD
    const assumedIpdCm = Number(ipdMm) / 10;
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

  function measureFromLandmarks(landmarks: { x: number; y: number }[], W: number, H: number): Measures {
    const pts = landmarks.map((p) => [p.x * W, p.y * H]);

    const minY = Math.min(...pts.map((p) => p[1]));
    const maxY = Math.max(...pts.map((p) => p[1]));
    const faceLength = maxY - minY;

    const widthAt = (ratio: number) => {
      const y = minY + ratio * faceLength;
      const band = faceLength * 0.04;
      const slice = pts.filter((p) => Math.abs(p[1] - y) < band);
      if (slice.length < 2) return 0;
      const left = Math.min(...slice.map((p) => p[0]));
      const right = Math.max(...slice.map((p) => p[0]));
      return right - left;
    };

    const foreheadWidth = Math.max(widthAt(0.18), widthAt(0.25), widthAt(0.30));
    const cheekboneWidth = Math.max(widthAt(0.45), widthAt(0.50), widthAt(0.58));
    const jawlineWidth = Math.max(widthAt(0.70), widthAt(0.78), widthAt(0.85));

    return { faceLength, foreheadWidth, cheekboneWidth, jawlineWidth };
  }

  async function analyzePhoto() {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas || !faceLmRef.current) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    const res = faceLmRef.current.detect(img);
    if (!res?.faceLandmarks?.length) {
      setPhotoMeasures(null);
      setPhotoResult(null);
      return;
    }
    const lmks = res.faceLandmarks[0] as any[];
    const m = measureFromLandmarks(
      lmks.map((p) => ({ x: p.x, y: p.y })), canvas.width, canvas.height
    );
    setPhotoMeasures(m);
    setPhotoResult(classify(m));

    // guide lines
    const minY = Math.min(...lmks.map((p) => p.y * canvas.height));
    const maxY = Math.max(...lmks.map((p) => p.y * canvas.height));
    const faceLen = maxY - minY;
    const yGuide = (r: number) => minY + r * faceLen;
    [0.25, 0.50, 0.78].forEach((r) => {
      const y = yGuide(r);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  // ---------------- UI ----------------

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Face Shape Calculator
          </CardTitle>
          <CardDescription>
            Choose a method below. The photo option runs completely in your browser (privacy-safe).
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
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={ensureModel}
                    disabled={isModelReady || loading}
                  >
                    {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                    {isModelReady ? "Model Ready" : "Load Analyzer"}
                  </Button>

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

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      const url = URL.createObjectURL(f);
                      setFileUrl(url);
                      setPhotoMeasures(null);
                      setPhotoResult(null);
                    }
                  }}
                />

                {fileUrl && (
                  <div className="mt-4 grid gap-3">
                    <img
                      ref={imgRef}
                      src={fileUrl}
                      alt="Uploaded face"
                      onLoad={() => (isModelReady ? analyzePhoto() : null)}
                      className="max-w-full rounded-lg"
                    />
                    <canvas ref={canvasRef} className="max-w-full rounded-lg border" />
                    {!isModelReady && (
                      <p className="text-xs text-muted-foreground">
                        Click <b>Load Analyzer</b> to process your photo (stays on-device).
                      </p>
                    )}
                  </div>
                )}
              </div>

              {photoMeasures && photoResult && (
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Your Face Shape</CardTitle>
                      <CardDescription>Transparent ratios + tips</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{photoResult.key.toUpperCase()}</p>
                      <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                        {photoResult.reasons.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <h4 className="font-semibold">{SHAPE_TIPS[photoResult.key].title} tips</h4>
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
                      <CardDescription>Pixels with optional cm estimate</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3 text-sm">
                      {[
                        ["Face length", photoMeasures.faceLength],
                        ["Forehead width", photoMeasures.foreheadWidth],
                        ["Cheekbone width", photoMeasures.cheekboneWidth],
                        ["Jawline width", photoMeasures.jawlineWidth],
                      ].map(([label, px]) => {
                        const cm = toCm(px as number);
                        return (
                          <div key={label as string} className="rounded border p-3">
                            <div className="font-medium">{label}</div>
                            <div>
                              {Math.round(px as number)} px
                              {cm ? ` • ${cm.toFixed(1)} cm` : ""}
                            </div>
                          </div>
                        );
                      })}
                      <p className="col-span-2 text-xs text-muted-foreground">
                        Real-world sizes estimated using IPD heuristic (edit the IPD for better accuracy).
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
                                    handleUnitsChange(newUnit);   // converts current inputs + updates form
                                    field.onChange(newUnit);      // keep RHF state in sync
                                }}
                                className="flex items-center gap-6"
                                >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="cm" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Centimeters</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="in" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Inches</FormLabel>
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
                                <Input type="number" step="0.1" placeholder="e.g., 19.5" {...field} />
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
                                <Input type="number" step="0.1" placeholder="e.g., 14.0" {...field} />
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
                                <Input type="number" step="0.1" placeholder="e.g., 13.0" {...field} />
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
                                <Input type="number" step="0.1" placeholder="e.g., 12.5" {...field} />
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
                          <p className="text-2xl font-bold">{manualResult.key.toUpperCase()}</p>
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
                          <h4 className="font-semibold">{SHAPE_TIPS[manualResult.key].title}</h4>
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
