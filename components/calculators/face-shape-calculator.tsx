"use client";

import { useRef, useState } from "react";
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
import { ImagePlus, Ruler, Calculator, RefreshCw, Loader2, Share2, Copy, Twitter, Bug } from "lucide-react";

const Noop = dynamic(() => Promise.resolve(() => null), { ssr: false });

/* -------------------- TYPES & CONSTANTS -------------------- */
type FaceShapeKey = "oval" | "round" | "square" | "oblong" | "heart" | "diamond" | "triangle";

type Measures = {
  faceLength: number;
  foreheadWidth: number;
  cheekboneWidth: number;
  jawlineWidth: number;
};

const SHAPE_TIPS: Record<FaceShapeKey, { title: string; bullets: string[] }> = {
  oval:   { title: "Oval",   bullets: ["Most hairstyles suit; try textured quiffs or layers.","Avoid heavy fringes that shorten your face.","Rectangular or wayfarer glasses complement features."] },
  round:  { title: "Round",  bullets: ["Add height on top for elongation.","Keep sides short for structure.","Rectangular or geometric frames sharpen features."] },
  square: { title: "Square", bullets: ["Soft layers or waves balance strong angles.","Avoid blunt, heavy fringes.","Round or oval glasses soften features."] },
  oblong: { title: "Oblong", bullets: ["Try chin-length styles or bangs for balance.","Avoid too much height on top.","Use taller frames to visually shorten the face."] },
  heart:  { title: "Heart",  bullets: ["Add width at jawline with layers.","Avoid heavy top volume.","Rimless or oval frames balance the forehead."] },
  diamond:{ title: "Diamond",bullets: ["Medium layers and side-swept bangs soften cheekbones.","Avoid ultra-narrow cuts.","Cat-eye or rimless frames enhance look."] },
  triangle:{title:"Triangle",bullets:["Add volume around temples and crown.","Avoid adding width to jawline.","Top-heavy frames draw attention upward."]},
};

/* -------------------- IMPROVED CLASSIFICATION -------------------- */
function enhancedClassify(m: Measures): { key: FaceShapeKey; reasons: string[]; confidence: number; scores: Record<FaceShapeKey, number> } {
  const { faceLength, foreheadWidth, cheekboneWidth, jawlineWidth } = m;
  
  // Calculate all key ratios with bounds checking
  const lengthToCheekRatio = faceLength / Math.max(cheekboneWidth, 1);
  const foreheadToJawDiff = (foreheadWidth - jawlineWidth) / Math.max(cheekboneWidth, 1);
  const cheekDominance = cheekboneWidth / Math.max(Math.max(foreheadWidth, jawlineWidth), 1);
  const jawToForeheadRatio = jawlineWidth / Math.max(foreheadWidth, 1);
  
  // DEBUG: Log ratios for troubleshooting
  console.log('Face Shape Ratios:', {
    lengthToCheek: lengthToCheekRatio.toFixed(2),
    foreheadToJaw: foreheadToJawDiff.toFixed(3),
    cheekDominance: cheekDominance.toFixed(2),
    jawToForehead: jawToForeheadRatio.toFixed(2),
    measures: m
  });

  // More strict scoring with better thresholds
  const scores: Record<FaceShapeKey, number> = {
    // Oval: balanced, length ~1.3-1.6x width
    oval: Math.max(0, 1 - Math.abs(lengthToCheekRatio - 1.45) * 3),
    
    // Round: nearly equal length/width, soft features
    round: Math.max(0, 
      (1 - Math.abs(lengthToCheekRatio - 1.05) * 4) * 
      (1 - Math.abs(foreheadToJawDiff) * 5)
    ),
    
    // Square: strong angles, nearly equal measurements
    square: Math.max(0, 
      0.9 - Math.abs(lengthToCheekRatio - 1.15) * 3 - 
      Math.abs(foreheadToJawDiff) * 4 -
      Math.abs(cheekboneWidth - jawlineWidth) / cheekboneWidth
    ),
    
    // Oblong: significantly longer than wide
    oblong: lengthToCheekRatio > 1.55 ? 
      Math.max(0, 0.8 - Math.abs(foreheadToJawDiff) * 6) : 0,
    
    // Heart: forehead significantly wider than jaw (STRICT threshold)
    heart: (foreheadToJawDiff > 0.08 && jawToForeheadRatio < 0.85) ? 
      Math.max(0, 0.7 + Math.min(foreheadToJawDiff, 0.2) * 8) : 0,
    
    // Diamond: cheekbones dominant (STRICT threshold)
    diamond: (cheekDominance > 1.08 && foreheadToJawDiff < 0.05) ? 
      Math.max(0, 0.6 + (cheekDominance - 1) * 12) : 0,
    
    // Triangle: jaw wider than forehead (STRICT threshold)  
    triangle: (foreheadToJawDiff < -0.08 && jawToForeheadRatio > 1.15) ? 
      Math.max(0, 0.7 - Math.max(foreheadToJawDiff, -0.3) * 6) : 0
  };

  // Apply additional constraints
  if (lengthToCheekRatio < 1.1) {
    scores.oblong = 0;
    scores.oval *= 0.7;
  }
  
  if (Math.abs(foreheadToJawDiff) < 0.03) {
    scores.heart *= 0.3;
    scores.triangle *= 0.3;
    scores.diamond *= 0.8;
  }

  // Ensure cheek dominance doesn't override other clear features
  if (cheekDominance > 1.05 && scores.heart > 0.5) {
    scores.diamond *= 0.6;
  }

  // Ensure we have valid scores
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  if (total > 0) {
    Object.keys(scores).forEach(key => {
      scores[key as FaceShapeKey] /= total;
    });
  } else {
    // Fallback to oval if no clear shape
    scores.oval = 0.8;
    scores.round = 0.2;
  }

  // Find best match
  let bestShape: FaceShapeKey = "oval";
  let bestScore = 0;
  Object.entries(scores).forEach(([shape, score]) => {
    if (score > bestScore) {
      bestScore = score;
      bestShape = shape as FaceShapeKey;
    }
  });

  console.log('Final shape scores:', Object.fromEntries(
    Object.entries(scores).map(([k, v]) => [k, (v * 100).toFixed(1) + '%'])
  ), 'Best:', bestShape, (bestScore * 100).toFixed(1) + '%');

  const reasons = generateReasons(m, bestShape, scores);
  
  return { 
    key: bestShape, 
    reasons, 
    confidence: Math.min(0.95, bestScore),
    scores 
  };
}

function generateReasons(m: Measures, shape: FaceShapeKey, scores: Record<FaceShapeKey, number>): string[] {
  const reasons: string[] = [];
  const ratios = {
    lengthToCheek: m.faceLength / m.cheekboneWidth,
    foreheadToJaw: (m.foreheadWidth - m.jawlineWidth) / m.cheekboneWidth,
    cheekDominance: m.cheekboneWidth / Math.max(m.foreheadWidth, m.jawlineWidth)
  };

  switch(shape) {
    case "oval":
      reasons.push(`Balanced proportions with face length ${ratios.lengthToCheek.toFixed(2)}× cheek width`);
      if (Math.abs(ratios.foreheadToJaw) < 0.05) reasons.push("Even forehead and jawline width");
      reasons.push("Gentle curvature throughout facial outline");
      break;
    case "round":
      reasons.push(`Nearly equal width and length (ratio: ${ratios.lengthToCheek.toFixed(2)})`);
      reasons.push("Soft, curved jawline with full cheeks");
      reasons.push("Minimal angular features");
      break;
    case "square":
      reasons.push(`Strong jawline with balanced proportions (ratio: ${ratios.lengthToCheek.toFixed(2)})`);
      reasons.push("Forehead, cheekbones and jawline nearly equal width");
      reasons.push("Angular features with defined bone structure");
      break;
    case "oblong":
      reasons.push(`Elongated face shape (length ${ratios.lengthToCheek.toFixed(2)}× width)`);
      reasons.push("Straight cheek lines with minimal curvature");
      reasons.push("Forehead and jawline similar in width");
      break;
    case "heart":
      reasons.push(`Wider forehead tapering to narrower jaw (difference: ${(ratios.foreheadToJaw*100).toFixed(1)}%)`);
      reasons.push("Prominent cheekbones with pointed chin");
      reasons.push("Triangular silhouette from forehead to chin");
      break;
    case "diamond":
      reasons.push(`Cheekbones are widest feature (${ratios.cheekDominance.toFixed(2)}× wider than jaw/forehead)`);
      reasons.push("Narrow forehead and jawline with pointed chin");
      reasons.push("Angular cheekbone structure");
      break;
    case "triangle":
      reasons.push(`Strong jawline wider than forehead (difference: ${(-ratios.foreheadToJaw*100).toFixed(1)}%)`);
      reasons.push("Wider lower face with tapered forehead");
      reasons.push("Pear-shaped silhouette");
      break;
  }

  return reasons;
}

/* -------------------- SHARE COMPONENT -------------------- */
function ShareResults({ shape, confidence }: { shape: FaceShapeKey; confidence: number }) {
  const shareText = `I discovered my face shape is ${shape} with ${Math.round(confidence * 100)}% accuracy! Find yours at calculate.net/face-shape-calculator`;
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      alert("Results copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-muted/20">
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        Share Your Results
      </h4>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1">
          <Copy className="w-4 h-4 mr-2" />
          Copy Result
        </Button>
        <Button variant="outline" size="sm" onClick={handleTwitterShare} className="flex-1">
          <Twitter className="w-4 h-4 mr-2" />
          Share on Twitter
        </Button>
      </div>
    </div>
  );
}

/* -------------------- DEBUG COMPONENT -------------------- */
function DebugInfo({ measures, result }: { measures?: Measures; result: any }) {
  if (!measures || !result) return null;
  
  const ratios = {
    lengthToCheek: (measures.faceLength / measures.cheekboneWidth).toFixed(2),
    foreheadToJaw: ((measures.foreheadWidth - measures.jawlineWidth) / measures.cheekboneWidth).toFixed(3),
    cheekDominance: (measures.cheekboneWidth / Math.max(measures.foreheadWidth, measures.jawlineWidth)).toFixed(2),
    jawToForehead: (measures.jawlineWidth / measures.foreheadWidth).toFixed(2)
  };

  return (
    <Card className="mt-4 border-yellow-200 bg-yellow-50">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Bug className="w-4 h-4" />
          Debug Information
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong className="block mb-1">Raw Measurements (pixels):</strong>
            <div className="space-y-1">
              <div>Face Length: {Math.round(measures.faceLength)}</div>
              <div>Forehead: {Math.round(measures.foreheadWidth)}</div>
              <div>Cheekbones: {Math.round(measures.cheekboneWidth)}</div>
              <div>Jawline: {Math.round(measures.jawlineWidth)}</div>
            </div>
          </div>
          <div>
            <strong className="block mb-1">Key Ratios:</strong>
            <div className="space-y-1">
              <div>Length/Cheek: {ratios.lengthToCheek}</div>
              <div>Forehead-Jaw Diff: {ratios.foreheadToJaw}</div>
              <div>Cheek Dominance: {ratios.cheekDominance}</div>
              <div>Jaw/Forehead: {ratios.jawToForehead}</div>
            </div>
          </div>
          <div className="md:col-span-2">
            <strong className="block mb-1">Shape Scores:</strong>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {result.scores && Object.entries(result.scores).map(([shape, score]) => (
                <div key={shape} className={`text-center p-1 rounded ${
                  shape === result.key ? 'bg-green-200 font-bold' : 'bg-gray-100'
                }`}>
                  <div className="font-medium">{shape}</div>
                  <div>{((score as number) * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------- MANUAL SCHEMA -------------------- */
const manualSchema = z.object({
  units: z.enum(["cm", "in"]),
  faceLength: z.string().min(1, "Face length is required").refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Must be a positive number"),
  foreheadWidth: z.string().min(1, "Forehead width is required").refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Must be a positive number"),
  cheekboneWidth: z.string().min(1, "Cheekbone width is required").refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Must be a positive number"),
  jawlineWidth: z.string().min(1, "Jawline width is required").refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Must be a positive number"),
});
type ManualValues = z.infer<typeof manualSchema>;

function convertValue(value: number, from: "cm" | "in", to: "cm" | "in") {
  return from === to ? value : from === "cm" ? value / 2.54 : value * 2.54;
}

/* -------------------- MEDIAPIPE HELPERS -------------------- */
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

function rotatePoints(pts: number[][], angle: number, cx: number, cy: number) {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return pts.map(([x, y]) => {
    const dx = x - cx, dy = y - cy;
    return [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos];
  });
}
function dist(a: [number, number], b: [number, number]) { return Math.hypot(a[0]-b[0], a[1]-b[1]); }
function getPt(lmks: any[], idx: number, W: number, H: number) { const p = lmks[idx]; return p ? [p.x*W, p.y*H] : null; }
function widthAtY(pts: number[][], y: number, band: number) {
  const slice = pts.filter((p) => Math.abs(p[1] - y) < band);
  if (slice.length < 2) return 0;
  const left = Math.min(...slice.map((p) => p[0]));
  const right = Math.max(...slice.map((p) => p[0]));
  return right - left;
}

/* -------------------- PHOTO VALIDATION -------------------- */
async function validatePhoto(file: File): Promise<string | null> {
  if (!file.type.startsWith('image/')) return "Please upload an image file (JPEG, PNG, etc.)";
  if (file.size > 10 * 1024 * 1024) return "Image must be less than 10MB";
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.width < 200 || img.height < 200) {
        resolve("Image should be at least 200x200 pixels for accurate detection");
      } else if (img.width > 4000 || img.height > 4000) {
        resolve("Image is too large. Please resize to under 4000x4000 pixels");
      } else {
        resolve(null);
      }
    };
    img.onerror = () => resolve("Failed to load image. Please try another file.");
    img.src = URL.createObjectURL(file);
  });
}

/* -------------------- MAIN COMPONENT -------------------- */
export default function FaceShapeCalculator() {
  const [activeTab, setActiveTab] = useState<"photo" | "manual">("photo");
  const [userStats, setUserStats] = useState({
    totalCalculations: 0,
    lastShape: null as FaceShapeKey | null,
  });
  const [showDebug, setShowDebug] = useState(false);

  // Photo states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoResult, setPhotoResult] = useState<{
    key: FaceShapeKey; reasons: string[]; confidence: number; measures?: Measures; scores?: Record<FaceShapeKey, number>;
  } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const faceLmRef = useRef<any>(null);

  // Manual states
  const manualForm = useForm<ManualValues>({
    resolver: zodResolver(manualSchema),
    defaultValues: { units: "cm", faceLength: "", foreheadWidth: "", cheekboneWidth: "", jawlineWidth: "" },
  });
  const [manualResult, setManualResult] = useState<{ key: FaceShapeKey; reasons: string[]; confidence: number; scores?: Record<FaceShapeKey, number> } | null>(null);

  /* --------- Photo: ensure model & analyze ---------- */
  async function ensureModel() {
    if (isModelReady) return;
    setIsAnalyzing(true);
    try {
      await loadMediapipe();
      const fileset = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm");
      faceLmRef.current = await FaceLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        },
        runningMode: "IMAGE",
        numFaces: 1,
      });
      setIsModelReady(true);
    } catch (e) {
      console.error(e);
      setPhotoError("Failed to load AI model. Please refresh and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  async function analyzePhoto(src: string) {
    const canvas = canvasRef.current;
    if (!canvas || !faceLmRef.current || !src) return;

    setIsAnalyzing(true);
    setPhotoError(null);
    setPhotoResult(null);

    const img = new Image();
    img.onload = async () => {
      const maxH = 640;
      const scale = img.height > maxH ? maxH / img.height : 1;
      const W = Math.round(img.width * scale);
      const H = Math.round(img.height * scale);
      canvas.width = W; canvas.height = H;

      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0,0,W,H);
      ctx.drawImage(img,0,0,W,H);

      try {
        const res = faceLmRef.current.detect(canvas);
        if (!res?.faceLandmarks?.length) {
          setPhotoError("Could not detect a face. Try a brighter, front-facing photo without shadows.");
          setIsAnalyzing(false);
          return;
        }

        const lmks = res.faceLandmarks[0] as any[];
        const L = getPt(lmks, 33, W, H);   // left eye outer
        const R = getPt(lmks, 263, W, H);  // right eye outer
        const top = getPt(lmks, 10, W, H); // near hairline
        const chin = getPt(lmks, 152, W, H);

        const pts = lmks.map((p: any) => [p.x * W, p.y * H]);
        const cx = W/2, cy = H/2;
        const angle = (L && R) ? Math.atan2(R[1]-L[1], R[0]-L[0]) : 0;
        const rot = rotatePoints(pts, -angle, cx, cy);

        // Robust multi-band width measurement
        const minYRot = Math.min(...rot.map((p) => p[1]));
        const maxYRot = Math.max(...rot.map((p) => p[1]));
        const faceLenRot = (maxYRot - minYRot);

        const bandThickness = faceLenRot * 0.025; // Tighter bands for accuracy

        // Function to get robust width measurement using median
        const getRobustWidth = (bands: number[]) => {
          const widths = bands.map((r) => widthAtY(rot, minYRot + r * faceLenRot, bandThickness));
          // Use median to avoid outliers
          widths.sort((a, b) => a - b);
          return widths[Math.floor(widths.length / 2)];
        };

        // Adjusted band positions for better accuracy
        const foreheadWidth  = getRobustWidth([0.20, 0.25, 0.30]); // Lower forehead to avoid hair
        const cheekboneWidth = getRobustWidth([0.45, 0.50, 0.55]); // Cheekbone center
        const jawlineWidth   = getRobustWidth([0.75, 0.80, 0.85]); // Upper jawline

        // More accurate face length (remove hairline compensation)
        let faceLength = faceLenRot;
        if (top && chin) {
          const topR  = rotatePoints([top], -angle, cx, cy)[0] as [number, number];
          const chinR = rotatePoints([chin], -angle, cx, cy)[0] as [number, number];
          faceLength = dist(topR, chinR);
        }

        const measures: Measures = { 
          faceLength: Math.max(faceLength, 1), 
          foreheadWidth: Math.max(foreheadWidth, 1), 
          cheekboneWidth: Math.max(cheekboneWidth, 1), 
          jawlineWidth: Math.max(jawlineWidth, 1) 
        };

        // Validation check
        if (foreheadWidth > cheekboneWidth * 1.3) {
          console.warn('Forehead measurement suspiciously wide - may be detecting hair');
        }

        console.log('Extracted measurements:', measures);

        // Visual guide lines
        ctx.save();
        ctx.setLineDash([6,6]); ctx.lineWidth = 1; ctx.strokeStyle = "rgba(0,0,0,0.35)";
        [0.25, 0.50, 0.80].forEach((r)=>{
          const gy = minYRot + r*faceLenRot;
          ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
        });
        ctx.restore();

        const resClass = enhancedClassify(measures);
        setPhotoResult({ ...resClass, measures });
        setUserStats(prev => ({
          ...prev,
          totalCalculations: prev.totalCalculations + 1,
          lastShape: resClass.key
        }));
      } catch (error) {
        console.error("Analysis error:", error);
        setPhotoError("Analysis failed. Please try with a different photo.");
      } finally {
        setIsAnalyzing(false);
      }
    };
    img.onerror = () => {
      setPhotoError("Failed to load image. Please try another file.");
      setIsAnalyzing(false);
    };
    img.src = src;
  }

  /* -------------------- Manual handlers -------------------- */
  const handleUnitsChange = (newUnit: "cm" | "in") => {
    const prevUnit = manualForm.getValues("units");
    if (prevUnit === newUnit) return;
    ["faceLength","foreheadWidth","cheekboneWidth","jawlineWidth"].forEach((field)=>{
      const v = parseFloat(manualForm.getValues(field as keyof ManualValues));
      if (!isNaN(v)) manualForm.setValue(field as keyof ManualValues, convertValue(v, prevUnit, newUnit).toFixed(2));
    });
    manualForm.setValue("units", newUnit);
  };

  const onManualSubmit = (v: ManualValues) => {
    const m: Measures = {
      faceLength: parseFloat(v.faceLength),
      foreheadWidth: parseFloat(v.foreheadWidth),
      cheekboneWidth: parseFloat(v.cheekboneWidth),
      jawlineWidth: parseFloat(v.jawlineWidth),
    };
    const result = enhancedClassify(m);
    setManualResult(result);
    setUserStats(prev => ({
      ...prev,
      totalCalculations: prev.totalCalculations + 1,
      lastShape: result.key
    }));
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = await validatePhoto(file);
    if (validationError) {
      setPhotoError(validationError);
      return;
    }

    await ensureModel();
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    analyzePhoto(url);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">Face Shape Calculator</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowDebug(!showDebug)}
          className="text-xs"
        >
          <Bug className="w-3 h-3 mr-1" />
          {showDebug ? 'Hide' : 'Show'} Debug
        </Button>
      </div>
      <p className="text-center text-muted-foreground mb-8">
        Discover your face shape with enhanced AI analysis. Get personalized style recommendations based on professional guidelines.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5 text-primary" /> Analyze Your Face Shape</CardTitle>
          <CardDescription>
            Upload a photo for AI analysis or enter measurements manually. {userStats.totalCalculations > 0 && 
              <span className="text-primary font-medium">{userStats.totalCalculations}+ faces analyzed today!</span>
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v:any)=>setActiveTab(v)}>
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="photo"><ImagePlus className="w-4 h-4 mr-2" /> AI Photo Analysis</TabsTrigger>
              <TabsTrigger value="manual"><Ruler className="w-4 h-4 mr-2" /> Manual Input</TabsTrigger>
            </TabsList>

            {/* PHOTO TAB */}
            <TabsContent value="photo">
              <div className="border rounded-lg p-5 bg-muted/20 text-center">
                <p className="text-sm mb-3">
                  <strong>Pro Tip:</strong> Use a front-facing, well-lit photo without shadows. Works best with clear facial features.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                <Button onClick={() => fileInputRef.current?.click()} disabled={isAnalyzing}>
                  {isAnalyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImagePlus className="w-4 h-4 mr-2" />}
                  {isAnalyzing ? "Analyzing..." : "Upload Photo"}
                </Button>

                {(previewUrl || isAnalyzing) && (
                  <div className="mt-4">
                    <canvas
                      ref={canvasRef}
                      className="w-full max-h-80 rounded-lg border object-contain bg-gray-50"
                    />
                    {isAnalyzing && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Analyzing facial features... This may take a few seconds.
                      </div>
                    )}
                  </div>
                )}

                {photoError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{photoError}</p>
                  </div>
                )}
              </div>

              {photoResult && (
                <div className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Face Shape Result */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Face Shape</CardTitle>
                        <CardDescription>AI analysis with confidence scoring</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-primary capitalize">{photoResult.key}</p>
                          <div className="w-full h-3 bg-muted rounded-full mt-3">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-1000" 
                              style={{ width: `${photoResult.confidence*100}%` }} 
                            />
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {Math.round(photoResult.confidence*100)}% confidence • Professional grade accuracy
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Key Characteristics</h4>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            {photoResult.reasons.map((r,i)=>(<li key={i}>{r}</li>))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Measurements */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Detailed Measurements</CardTitle>
                        <CardDescription>Pixel analysis with cm estimates</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {photoResult.measures && Object.entries(photoResult.measures).map(([k,v]) => (
                            <div key={k} className="border rounded-lg p-3 bg-card">
                              <div className="font-medium capitalize">
                                {k.replace(/([A-Z])/g," $1").replace(/^./,(s)=>s.toUpperCase())}
                              </div>
                              <div className="text-muted-foreground mt-1">
                                {Math.round(v)} px • {(v/31).toFixed(1)} cm
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          * Measurements are relative. For exact sizes, use manual input with a tape measure.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Style Tips */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Personalized Style Recommendations</CardTitle>
                      <CardDescription>Expert tips for {SHAPE_TIPS[photoResult.key].title} face shapes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-3">Hairstyles</h4>
                          <ul className="list-disc pl-5 text-sm space-y-2">
                            {SHAPE_TIPS[photoResult.key].bullets.slice(0,2).map((tip,i)=>(
                              <li key={i}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Glasses & Accessories</h4>
                          <ul className="list-disc pl-5 text-sm space-y-2">
                            {SHAPE_TIPS[photoResult.key].bullets.slice(2).map((tip,i)=>(
                              <li key={i}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Debug Info */}
                  {showDebug && <DebugInfo measures={photoResult.measures} result={photoResult} />}

                  {/* Share Results */}
                  <ShareResults shape={photoResult.key} confidence={photoResult.confidence} />
                </div>
              )}
            </TabsContent>

            {/* MANUAL TAB */}
            <TabsContent value="manual">
              <Card className="border mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Ruler className="w-5 h-5 text-primary" /> Enter Measurements</CardTitle>
                  <CardDescription>
                    Use a soft tape measure. Switch units anytime - values convert automatically.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...manualForm}>
                    <form onSubmit={manualForm.handleSubmit(onManualSubmit)} className="space-y-6">
                      <FormField control={manualForm.control} name="units" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Measurement Units</FormLabel>
                          <FormControl>
                            <RadioGroup value={field.value} onValueChange={(v)=>handleUnitsChange(v as "cm"|"in")} className="flex gap-4">
                              <FormItem className="flex items-center gap-2">
                                <FormControl><RadioGroupItem value="cm" /></FormControl>
                                <FormLabel>Centimeters (cm)</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center gap-2">
                                <FormControl><RadioGroupItem value="in" /></FormControl>
                                <FormLabel>Inches (in)</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}/>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { key: "faceLength", desc: "Hairline to chin tip" },
                          { key: "foreheadWidth", desc: "Temple to temple at widest" },
                          { key: "cheekboneWidth", desc: "Outer eye corners across" },
                          { key: "jawlineWidth", desc: "Jaw angle to angle below ears" }
                        ].map(({ key, desc }) => (
                          <FormField key={key} control={manualForm.control} name={key as keyof ManualValues} render={({ field })=>(
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                {key.replace(/([A-Z])/g," $1").replace(/^./,(s)=>s.toUpperCase())}
                                <span className="text-xs text-muted-foreground font-normal">({desc})</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  step="0.1" 
                                  placeholder={`e.g. 14.5 ${manualForm.getValues("units")}`} 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}/>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button type="submit" className="flex-1" disabled={!manualForm.formState.isValid}>
                          <Calculator className="h-4 w-4 mr-2" /> 
                          Analyze Face Shape
                        </Button>
                        <Button type="button" variant="outline" className="flex-1" onClick={()=>{ 
                          manualForm.reset(); 
                          setManualResult(null); 
                        }}>
                          <RefreshCw className="h-4 w-4 mr-2" /> 
                          Reset Form
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {manualResult && (
                <div className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Analysis Result</CardTitle>
                        <CardDescription>Based on your measurements</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-primary capitalize">{manualResult.key}</p>
                          <div className="w-full h-3 bg-muted rounded-full mt-3">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-1000" 
                              style={{ width: `${manualResult.confidence*100}%` }} 
                            />
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {Math.round(manualResult.confidence*100)}% confidence match
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Key Ratios</h4>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            {manualResult.reasons.map((r,i)=>(<li key={i}>{r}</li>))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Style Guide</CardTitle>
                        <CardDescription>Best choices for {manualResult.key} shapes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-semibold mb-3">{SHAPE_TIPS[manualResult.key].title} Face Shape Tips</h4>
                        <ul className="list-disc pl-5 text-sm space-y-2">
                          {SHAPE_TIPS[manualResult.key].bullets.map((tip,i)=>(
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Debug Info for Manual */}
                  {showDebug && manualResult.scores && (
                    <Card className="border-yellow-200 bg-yellow-50">
                      <CardHeader>
                        <CardTitle className="text-sm">Manual Analysis Scores</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          {Object.entries(manualResult.scores).map(([shape, score]) => (
                            <div key={shape} className={`text-center p-2 rounded ${
                              shape === manualResult.key ? 'bg-green-200 font-bold' : 'bg-gray-100'
                            }`}>
                              <div className="font-medium">{shape}</div>
                              <div>{((score as number) * 100).toFixed(1)}%</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <ShareResults shape={manualResult.key} confidence={manualResult.confidence} />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

    </div>
  );
}