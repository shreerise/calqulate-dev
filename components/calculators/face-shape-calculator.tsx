"use client";

import { useRef, useState, DragEvent, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ImagePlus, Ruler, Calculator, RefreshCw, Loader2, Share2, 
  Copy, Twitter, Camera, UploadCloud, AlertTriangle, X,
  User, Star, ChevronRight, Bug
} from "lucide-react";

/* -------------------- TYPES & CONSTANTS -------------------- */
type FaceShapeKey = "oval" | "round" | "square" | "oblong" | "heart" | "diamond" | "triangle";

type BaseMeasures = {
  faceLength: number;
  faceWidth: number; // Cheekbone width
  foreheadWidth: number;
  jawWidth: number;
};

type AdvancedMeasures = BaseMeasures & {
  templeWidth:number
  midWidth:number

  eyeSpan:number
  interocular:number
  noseWidth:number
  noseLength:number
  mouthWidth:number

};

type FeatureRatings = {
  eyebrows: number;
  eyes: number;
  lips: number;
  nose: number;
};

type Characteristics = {
  cheeks: string;
  jaw: string;
  chin: string;
  faceProportion: string;
};

const SHAPE_TIPS: Record<FaceShapeKey, { title: string, desc: string, bullets: string[] }> = {
  oval:   { title: "Oval", desc: "Balanced proportions with a gently curved jawline.", bullets:["Most hairstyles suit perfectly.", "Avoid heavy fringes that cover features.", "Wayfarer or rectangular glasses are ideal."] },
  round:  { title: "Round", desc: "Soft features with similar width and length measurements.", bullets:["Add height and volume on top to elongate.", "Avoid round, circular frames.", "Create vertical lines with styling."] },
  square: { title: "Square", desc: "Strong, angular jawline with nearly equal width throughout.", bullets:["Soft layers or waves balance strong angles.", "Avoid blunt, straight-across bangs.", "Round or oval glasses soften features."] },
  oblong: { title: "Oblong", desc: "Noticeably longer than it is wide.", bullets:["Try chin-length styles to add width.", "Avoid excessive height on top.", "Taller, oversized frames help balance length."] },
  heart:  { title: "Heart", desc: "Wider forehead tapering down to a narrow chin.", bullets:["Add width at the jawline with layers.", "Avoid heavy top volume.", "Rimless or light-colored frames work best."] },
  diamond:{ title: "Diamond", desc: "High, prominent cheekbones with narrower forehead and jaw.", bullets:["Side-swept bangs soften cheekbones.", "Tuck hair behind ears to show structure.", "Cat-eye glasses enhance natural angles."] },
  triangle:{title: "Triangle", desc: "Wider jawline tapering up to a narrower forehead.", bullets:["Add volume around the temples.", "Avoid drawing attention to the jawline.", "Top-heavy frames bring balance."] },
};

/* -------------------- TRUE COSMETOLOGY VOTING ALGORITHM -------------------- */
// This replaces simple AI distance guessing with standard Cosmetology Rules
function classifyShape(m: BaseMeasures) {

  const FL = m.faceLength / m.faceWidth
  const FW = m.foreheadWidth / m.faceWidth
  const JW = m.jawWidth / m.faceWidth

  const tol = 0.08

  let shape: FaceShapeKey = "oval"

  const maxWidth = Math.max(FW, 1, JW)

  const cheekWidest = maxWidth === 1
  const foreheadWidest = maxWidth === FW
  const jawWidest = maxWidth === JW

  if (cheekWidest && FW < 0.9 && JW < 0.9) {

    shape = "diamond"

  }

  else if (foreheadWidest && JW < 0.85) {

    shape = "heart"

  }

  else if (jawWidest && FW < 0.9) {

    shape = "triangle"

  }

  else {

    if (FL < 1.15) {

      const widthsSimilar =
        Math.abs(FW - 1) < tol &&
        Math.abs(JW - 1) < tol

      shape = widthsSimilar ? "square" : "round"

    }

    else if (FL < 1.35) {

      shape = "oval"

    }

    else {

      shape = "oblong"

    }

  }

  const scores: Record<FaceShapeKey, number> = {
    oval:0,round:0,square:0,oblong:0,heart:0,diamond:0,triangle:0
  }

  scores[shape] = 70

  if (FL < 1.15) scores.round += 10
  if (FL > 1.4) scores.oblong += 10
  if (FW > 1.0) scores.heart += 10
  if (JW > 1.0) scores.triangle += 10

  const total = Object.values(scores).reduce((a,b)=>a+b,0)

  Object.keys(scores).forEach(k=>{
    scores[k as FaceShapeKey]=(scores[k as FaceShapeKey]/total)*100
  })

  const chars: Characteristics = {

    cheeks:(m.faceWidth/m.faceLength>0.75)?"Prominent":"Flat",

    jaw:(JW>0.9)?"Angular / Wide":(JW<0.78)?"Tapered / Narrow":"Soft",

    chin:(m.foreheadWidth/m.jawWidth>1.15)?"Pointed":(m.foreheadWidth/m.jawWidth<0.95)?"Broad":"Rounded",

    faceProportion:(FL>1.45)?"Elongated":(FL<1.20)?"Compact":"Balanced"

  }

  return { key:shape, probabilities:scores, chars }

}

function calculateAdvancedRatings(m: AdvancedMeasures): FeatureRatings {
  return {
    eyebrows: Math.min(9.8, Math.max(7.0, 10 - Math.abs((m.eyeSpan / m.faceWidth) - 0.5) * 10)),
    eyes: Math.min(9.9, Math.max(7.5, 10 - Math.abs((m.interocular / m.eyeSpan) - 0.4) * 10)),
    lips: Math.min(9.7, Math.max(6.5, 10 - Math.abs((m.mouthWidth / m.interocular) - 1.5) * 5)),
    nose: Math.min(9.6, Math.max(7.0, 10 - Math.abs((m.noseWidth / m.interocular) - 1.0) * 8))
  };
}

/* -------------------- UI COMPONENTS -------------------- */
function ProgressBar({ label, value, colorClass = "bg-primary" }: { label: string, value: number, colorClass?: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1 font-medium text-muted-foreground">
        <span className="capitalize">{label}</span>
        <span>{value.toFixed(1)}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} rounded-full transition-all duration-1000`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="border border-border rounded-lg p-3 bg-card shadow-sm flex flex-col justify-center items-center text-center">
      <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mb-1">{label}</span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

function ShareResults({ shape, confidence }: { shape: FaceShapeKey; confidence: number }) {
  const shareText = `I discovered my face shape is ${shape} with ${Math.round(confidence)}% accuracy! Find yours at calculate.net`;
  
  return (
    <div className="mt-6 p-4 border rounded-xl bg-primary/5">
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <Share2 className="w-4 h-4 text-primary" />
        Share Your AI Results
      </h4>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareText)} className="flex-1 bg-background">
          <Copy className="w-4 h-4 mr-2" /> Copy Result
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')} className="flex-1 bg-background">
          <Twitter className="w-4 h-4 mr-2 text-blue-500" /> Share on Twitter
        </Button>
      </div>
    </div>
  );
}

/* -------------------- MANUAL SCHEMA -------------------- */
const manualSchema = z.object({
  units: z.enum(["cm", "in"]),
  faceLength: z.string().min(1, "Required").refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Positive number"),
  foreheadWidth: z.string().min(1, "Required").refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Positive number"),
  faceWidth: z.string().min(1, "Required").refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Positive number"),
  jawWidth: z.string().min(1, "Required").refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Positive number"),
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

function dist(a: [number, number], b:[number, number]) { return Math.hypot(a[0]-b[0], a[1]-b[1]); }
function getPt(lmks: any[], idx: number, W: number, H: number): [number, number] | null { 
  const p = lmks[idx]; return p ?[p.x * W, p.y * H] : null; 
}

/* -------------------- MAIN COMPONENT -------------------- */
export default function FaceShapeCalculator() {
  const[activeTab, setActiveTab] = useState<"photo" | "manual">("photo");
  const [userStats, setUserStats] = useState({ totalCalculations: 0 });
  const [showDebug, setShowDebug] = useState(false);

  // Photo states
  const[isAnalyzing, setIsAnalyzing] = useState(false);
  const[loadingStep, setLoadingStep] = useState<string>("");
  const[isModelReady, setIsModelReady] = useState(false);
  const[photoError, setPhotoError] = useState<string | null>(null);
  const[tiltWarning, setTiltWarning] = useState<string | null>(null);
  const[isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const[photoResult, setPhotoResult] = useState<{
    key: FaceShapeKey;
    probabilities: Record<FaceShapeKey, number>;
    chars: Characteristics;
    ratings: FeatureRatings;
    measures: AdvancedMeasures;
  } | null>(null);

  // Manual States
  const manualForm = useForm<ManualValues>({
    resolver: zodResolver(manualSchema),
    defaultValues: { units: "cm", faceLength: "", foreheadWidth: "", faceWidth: "", jawWidth: "" },
  });
  const [manualResult, setManualResult] = useState<{
    key: FaceShapeKey;
    probabilities: Record<FaceShapeKey, number>;
    chars: Characteristics;
    measures: BaseMeasures;
  } | null>(null);

  // Live Camera states
  const[isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const faceLmRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  },[]);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  async function ensureModel() {
    if (isModelReady) return;
    setLoadingStep("Loading AI Engine...");
    try {
      await loadMediapipe();
      const fileset = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm");
      faceLmRef.current = await FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task" },
        runningMode: "IMAGE",
        numFaces: 1,
      });
      setIsModelReady(true);
    } catch (e) {
      setPhotoError("Failed to load AI model. Please check connection.");
      throw e;
    }
  }

  async function analyzePhoto(src: string) {
    setIsAnalyzing(true);
    setPhotoError(null);
    setTiltWarning(null);
    setPhotoResult(null);

    await delay(150); 
    const canvas = canvasRef.current;
    if (!canvas || !src) return;

    try {
      await ensureModel();
      setLoadingStep("Mapping Facial Coordinates...");

      const img = new Image();
      img.onload = async () => {
        const maxH = 640;
        const scale = img.height > maxH ? maxH / img.height : 1;
        const W = Math.round(img.width * scale);
        const H = Math.round(img.height * scale);
        canvas.width = W; canvas.height = H;

        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0,0,W,H);
        ctx.drawImage(img, 0, 0, W, H);

        setLoadingStep("Extracting Landmarks...");
        await delay(200);

        const res = faceLmRef.current.detect(canvas);
        if (!res?.faceLandmarks?.length) {
          setPhotoError("Could not detect a face. Try a brighter, front-facing photo.");
          setIsAnalyzing(false);
          return;
        }

        const lmks = res.faceLandmarks[0] as any[];
        
        // Tilt detection
        const nose = getPt(lmks, 1, W, H);
        const leftEye = getPt(lmks, 33, W, H);
        const rightEye = getPt(lmks, 263, W, H);
        if (nose && leftEye && rightEye) {
          const dL = dist(nose, leftEye);
          const dR = dist(nose, rightEye);
          const ratio = Math.max(dL, dR) / Math.min(dL, dR);
          if (ratio > 1.3) setTiltWarning("Your face appears turned. Please look straight for best accuracy.");
        }

        const eyeTilt = Math.abs(leftEye![1] - rightEye![1])
        if(eyeTilt > 20){
          setTiltWarning("Your head is tilted. Please upload a straight photo.")
        }

        // TRUE LANDMARK MATRIX
        const pTop = getPt(lmks, 10, W, H);        
        const pChin = getPt(lmks, 152, W, H);      
        const pLForehead = getPt(lmks, 103, W, H); // True Left Outer Temple
        const pRForehead = getPt(lmks, 332, W, H); // True Right Outer Temple
        const pLCheek = getPt(lmks, 234, W, H);    // True Left Cheekbone
        const pRCheek = getPt(lmks, 454, W, H);    // True Right Cheekbone
        const pLJaw = getPt(lmks, 132, W, H);      // True Left Gonial Angle (Jaw Hinge)
        const pRJaw = getPt(lmks, 361, W, H);      // True Right Gonial Angle (Jaw Hinge)
        const pLTemple = getPt(lmks, 71, W, H);
        const pRTemple = getPt(lmks, 301, W, H);
        const pLMid = getPt(lmks, 93, W, H);
        const pRMid = getPt(lmks, 323, W, H);

        const templeWidth = dist(pLTemple!, pRTemple!);
        const midWidth = dist(pLMid!, pRMid!)

        function calcAngle(a:[number,number], b:[number,number], c:[number,number]) {
          const ab = [a[0]-b[0], a[1]-b[1]]
          const cb = [c[0]-b[0], c[1]-b[1]]
          const dot = ab[0]*cb[0] + ab[1]*cb[1]
          const magAB = Math.hypot(ab[0],ab[1])
          const magCB = Math.hypot(cb[0],cb[1])
          return Math.acos(dot/(magAB*magCB)) * (180/Math.PI)
        }
        
        const jawAngleValue = calcAngle(pLJaw!, pChin!, pRJaw!);
        // Secondary landmarks
        const pLEyeIn = getPt(lmks, 133, W, H);
        const pREyeIn = getPt(lmks, 362, W, H);
        const pLNose = getPt(lmks, 129, W, H);
        const pRNose = getPt(lmks, 358, W, H);
        const pNoseTip = getPt(lmks, 2, W, H);
        const pNoseRoot = getPt(lmks, 8, W, H);
        const pLMouth = getPt(lmks, 61, W, H);
        const pRMouth = getPt(lmks, 291, W, H);

        if (!pTop || !pChin || !pLCheek || !pRCheek) {
           setPhotoError("Could not map core landmarks.");
           setIsAnalyzing(false);
           return;
        }

        const measures: AdvancedMeasures = {

          faceLength: dist(pTop, pChin),
          faceWidth: dist(pLCheek, pRCheek) * 1.03, // Slightly increase cheekbone width for better classification
          foreheadWidth: dist(pLForehead!, pRForehead!),
          jawWidth: dist(pLJaw!, pRJaw!),
          templeWidth: dist(pLTemple!, pRTemple!),
          midWidth: dist(pLMid!, pRMid!),
          eyeSpan: dist(leftEye!, rightEye!),
          interocular: dist(pLEyeIn!, pREyeIn!),
          noseWidth: dist(pLNose!, pRNose!),
          noseLength: dist(pNoseRoot!, pNoseTip!),
          mouthWidth: dist(pLMouth!, pRMouth!)

        }

        if(measures.eyeSpan < 80){
          setPhotoError("Face too small in image. Please upload a closer photo.")
          setIsAnalyzing(false)
          return
        }


        // Draw Visual Guidelines
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0,0,W,H); 
        
        const drawLine = (p1:[number,number], p2:[number,number], label: string, color: string) => {
           ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]);
           ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
           ctx.beginPath(); ctx.arc(p1[0], p1[1], 4, 0, Math.PI*2); ctx.fillStyle = "white"; ctx.fill();
           ctx.beginPath(); ctx.arc(p2[0], p2[1], 4, 0, Math.PI*2); ctx.fillStyle = "white"; ctx.fill();
           ctx.fillStyle = color; ctx.font = "bold 12px sans-serif";
           ctx.fillText(label, (p1[0]+p2[0])/2 + 8, (p1[1]+p2[1])/2 - 8);
        };

        drawLine(pTop, pChin, "LENGTH", "#00ffff");
        drawLine(pLForehead!, pRForehead!, "FOREHEAD", "#ff00ff");
        drawLine(pLCheek, pRCheek, "CHEEKBONE", "#ffff00");
        drawLine(pLJaw!, pRJaw!, "JAWLINE", "#00ff00");

        setLoadingStep("Calculating Proportions...");
        await delay(300); 

        let baseShape = classifyShape(measures)
        // Improve Round vs Square accuracy
        if(jawAngleValue <115){
          baseShape.probabilities.square +=10
        }
        if(jawAngleValue >130){
          baseShape.probabilities.round +=10
        }
        const ratings = calculateAdvancedRatings(measures);
        
        setPhotoResult({ ...baseShape, measures, ratings });
        setUserStats(prev => ({ totalCalculations: prev.totalCalculations + 1 }));
        setIsAnalyzing(false);
      };
      
      img.onerror = () => {
        setPhotoError("Failed to load image format.");
        setIsAnalyzing(false);
      };
      img.src = src;
    } catch (err) {
      setIsAnalyzing(false);
    }
  }

  // File Handlers
  const handleFileProcess = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return setPhotoError("Please upload an image file.");
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    analyzePhoto(url);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileProcess(e.dataTransfer.files?.[0]);
  };

  const startCamera = async () => {
    setPhotoError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      setIsCameraOpen(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch (err) {
      setPhotoError("Camera access denied.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    const url = canvas.toDataURL("image/jpeg");
    stopCamera();
    setPreviewUrl(url);
    analyzePhoto(url);
  };

  // Manual Submission
  const onManualSubmit = (v: ManualValues) => {
    const measures: BaseMeasures = {
      faceLength: parseFloat(v.faceLength),
      foreheadWidth: parseFloat(v.foreheadWidth),
      faceWidth: parseFloat(v.faceWidth),
      jawWidth: parseFloat(v.jawWidth),
    };
    const analysis = classifyShape(measures);
    setManualResult({ ...analysis, measures });
    setUserStats(prev => ({ totalCalculations: prev.totalCalculations + 1 }));
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">Face Shape Calculator</h1>
        <Button variant="ghost" size="sm" onClick={() => setShowDebug(!showDebug)} className="text-xs text-muted-foreground">
          <Bug className="w-3 h-3 mr-1" /> {showDebug ? 'Hide' : 'Show'} Debug
        </Button>
      </div>
      <p className="text-muted-foreground mb-8">
        Discover your face shape with advanced biometric AI analysis. Get personalized style recommendations based on standard cosmetology guidelines.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" /> Analyze Your Features
          </CardTitle>
          <CardDescription>
            Upload a photo for instant AI analysis or map measurements manually.
            {userStats.totalCalculations > 0 && <span className="ml-2 text-primary font-medium">({userStats.totalCalculations} features analyzed)</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v:any)=>setActiveTab(v)}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="photo"><ImagePlus className="w-4 h-4 mr-2" /> AI Photo Analysis</TabsTrigger>
              <TabsTrigger value="manual"><Ruler className="w-4 h-4 mr-2" /> Manual Input</TabsTrigger>
            </TabsList>

            {/* ---------- PHOTO TAB ---------- */}
            <TabsContent value="photo" className="space-y-6">
              {isCameraOpen ? (
                <div className="max-w-md mx-auto relative rounded-2xl overflow-hidden shadow-lg border bg-black">
                  <video ref={videoRef} className="w-full max-h-[500px] object-cover scale-x-[-1]" playsInline muted />
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-4">
                     <Button onClick={takeSnapshot} size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg font-bold">
                       <Camera className="w-5 h-5 mr-2" /> Snap Photo
                     </Button>
                     <Button variant="destructive" size="icon" className="rounded-full shadow-lg h-11 w-11" onClick={stopCamera}>
                       <X className="w-5 h-5" />
                     </Button>
                  </div>
                </div>
              ) : (!previewUrl && !isAnalyzing) ? (
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                    isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50 bg-muted/10'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-background rounded-full shadow-sm ring-1 ring-border">
                      <UploadCloud className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Drag & Drop your photo here</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Ensure you are facing forward with good lighting. Hair tied back works best.
                  </p>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileProcess(e.target.files?.[0])} />
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Button onClick={() => fileInputRef.current?.click()} className="shadow-sm">
                      <ImagePlus className="w-4 h-4 mr-2" /> Upload Image
                    </Button>
                    <Button onClick={startCamera} variant="outline" className="bg-background">
                      <Camera className="w-4 h-4 mr-2" /> Take Photo
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="max-w-md mx-auto text-center relative">
                  <div className="relative rounded-xl overflow-hidden shadow-sm border bg-black">
                    <canvas ref={canvasRef} className="w-full max-h-[500px] object-contain" />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
                        <Loader2 className="w-10 h-10 mb-4 animate-spin text-primary" />
                        <p className="text-lg font-medium text-foreground">{loadingStep}</p>
                      </div>
                    )}
                  </div>
                  {!isAnalyzing && (
                    <Button variant="outline" size="sm" className="mt-4" onClick={() => { setPreviewUrl(""); setPhotoResult(null); }}>
                      <RefreshCw className="w-4 h-4 mr-2" /> Scan Another Photo
                    </Button>
                  )}
                </div>
              )}

              {photoError && !isCameraOpen && (
                <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                  <p className="text-sm text-destructive-foreground">{photoError}</p>
                </div>
              )}
              {tiltWarning && !isAnalyzing && (
                <div className="p-4 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
                  <p className="text-sm text-yellow-700">{tiltWarning}</p>
                </div>
              )}

              {/* PHOTO RESULT RENDER */}
              {photoResult && !isAnalyzing && (
                <div className="space-y-6 mt-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="grid lg:grid-cols-12 gap-6">
                    
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-5 space-y-6">
                      <Card className="border-primary/20 bg-primary/5">
                        <CardContent className="p-6 text-center">
                          <h2 className="text-3xl font-extrabold text-primary capitalize mb-2">{photoResult.key}</h2>
                          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Face Shape</div>
                          <p className="text-sm text-foreground/80">{SHAPE_TIPS[photoResult.key].desc}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="py-4 border-b">
                          <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2">
                            <Star className="w-4 h-4 text-primary" /> Feature Ratings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-5 space-y-4">
                          <ProgressBar label="Eyebrows" value={photoResult.ratings.eyebrows * 10} />
                          <ProgressBar label="Eyes" value={photoResult.ratings.eyes * 10} />
                          <ProgressBar label="Lips" value={photoResult.ratings.lips * 10} />
                          <ProgressBar label="Nose" value={photoResult.ratings.nose * 10} />
                        </CardContent>
                      </Card>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader className="py-4 border-b">
                            <CardTitle className="text-sm uppercase tracking-widest">Characteristics</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-3 text-sm">
                            <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Cheeks</span><span className="font-semibold">{photoResult.chars.cheeks}</span></div>
                            <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Jawline</span><span className="font-semibold">{photoResult.chars.jaw}</span></div>
                            <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Chin</span><span className="font-semibold">{photoResult.chars.chin}</span></div>
                            <div className="flex justify-between pb-1"><span className="text-muted-foreground">Proportion</span><span className="font-semibold">{photoResult.chars.faceProportion}</span></div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="py-4 border-b">
                            <CardTitle className="text-sm uppercase tracking-widest">Shape Match %</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-4">
                            {Object.entries(photoResult.probabilities)
                              .sort((a,b) => b[1] - a[1])
                              .slice(0, 4) // Show top 4
                              .map(([shape, prob]) => (
                                <ProgressBar key={shape} label={shape} value={prob} colorClass={shape === photoResult.key ? "bg-primary" : "bg-muted-foreground/30"} />
                            ))}
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="py-4 border-b bg-muted/20">
                          <CardTitle className="text-sm uppercase tracking-widest">Style Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-5">
                          <ul className="space-y-3">
                            {SHAPE_TIPS[photoResult.key].bullets.map((tip, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm">
                                <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {tip}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Measurements & Proportions */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="py-4 border-b bg-muted/20">
                        <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2">
                          <Ruler className="w-4 h-4" /> Facial Measurements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <StatBox label="Face Height" value={`${photoResult.measures.faceLength.toFixed(1)} px`} />
                          <StatBox label="Face Width" value={`${photoResult.measures.faceWidth.toFixed(1)} px`} />
                          <StatBox label="Forehead" value={`${photoResult.measures.foreheadWidth.toFixed(1)} px`} />
                          <StatBox label="Jaw Width" value={`${photoResult.measures.jawWidth.toFixed(1)} px`} />
                          <StatBox label="Eye Span" value={`${photoResult.measures.eyeSpan.toFixed(1)} px`} />
                          <StatBox label="Mouth" value={`${photoResult.measures.mouthWidth.toFixed(1)} px`} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-4 border-b bg-muted/20">
                        <CardTitle className="text-sm uppercase tracking-widest">Core Proportions</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <ProgressBar label="Face Ratio (W/L)" value={(photoResult.measures.faceWidth / photoResult.measures.faceLength) * 100} />
                        <ProgressBar label="Forehead Ratio (F/W)" value={(photoResult.measures.foreheadWidth / photoResult.measures.faceWidth) * 100} />
                        <ProgressBar label="Jaw Width Ratio (J/W)" value={(photoResult.measures.jawWidth / photoResult.measures.faceWidth) * 100} />
                        <ProgressBar label="Eye Spacing Ratio" value={(photoResult.measures.interocular / photoResult.measures.eyeSpan) * 100} />
                      </CardContent>
                    </Card>
                  </div>
                  <ShareResults shape={photoResult.key} confidence={photoResult.probabilities[photoResult.key]} />
                </div>
              )}
            </TabsContent>

            {/* ---------- MANUAL TAB ---------- */}
            <TabsContent value="manual" className="space-y-6">
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/20 border-b">
                  <CardTitle className="text-lg">Enter Measurements</CardTitle>
                  <CardDescription>Use a soft measuring tape. Ensure hair is tied back.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...manualForm}>
                    <form onSubmit={manualForm.handleSubmit(onManualSubmit)} className="space-y-6">
                      <FormField control={manualForm.control} name="units" render={({ field }) => (
                        <FormItem className="bg-muted/10 p-3 rounded-lg border">
                          <FormControl>
                            <RadioGroup value={field.value} onValueChange={(v)=> {
                              const newUnit = v as "cm"|"in";
                              const prevUnit = manualForm.getValues("units");
                              if (prevUnit !== newUnit) {["faceLength","foreheadWidth","faceWidth","jawWidth"].forEach((f)=>{
                                  const val = parseFloat(manualForm.getValues(f as keyof ManualValues));
                                  if (!isNaN(val)) manualForm.setValue(f as keyof ManualValues, convertValue(val, prevUnit, newUnit).toFixed(2));
                                });
                                manualForm.setValue("units", newUnit);
                              }
                            }} className="flex justify-center gap-6">
                              <FormItem className="flex items-center gap-2 space-y-0">
                                <FormControl><RadioGroupItem value="cm" /></FormControl>
                                <FormLabel className="cursor-pointer font-medium">Centimeters (cm)</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center gap-2 space-y-0">
                                <FormControl><RadioGroupItem value="in" /></FormControl>
                                <FormLabel className="cursor-pointer font-medium">Inches (in)</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}/>
                      
                      <div className="grid sm:grid-cols-2 gap-5">
                        {[
                          { key: "faceLength", label: "Face Length", desc: "Hairline to chin tip" },
                          { key: "foreheadWidth", label: "Forehead Width", desc: "Temple to temple" },
                          { key: "faceWidth", label: "Cheekbone Width", desc: "Outer ear to ear across face" },
                          { key: "jawWidth", label: "Jawline Width", desc: "Jaw angle to angle (under ears)" }
                        ].map(({ key, label, desc }) => (
                          <FormField key={key} control={manualForm.control} name={key as keyof ManualValues} render={({ field })=>(
                            <FormItem>
                              <FormLabel className="font-semibold">{label}</FormLabel>
                              <p className="text-xs text-muted-foreground mb-2">{desc}</p>
                              <FormControl>
                                <Input type="number" step="0.1" placeholder={`e.g. 15.0`} className="bg-background" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}/>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button type="submit" size="lg" className="flex-1" disabled={!manualForm.formState.isValid}>
                          <Calculator className="h-4 w-4 mr-2" /> Calculate Shape
                        </Button>
                        <Button type="button" size="lg" variant="outline" className="sm:w-1/3" onClick={()=>{ manualForm.reset(); setManualResult(null); }}>
                          <RefreshCw className="h-4 w-4 mr-2" /> Reset
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* MANUAL RESULT RENDER */}
              {manualResult && (
                <div className="space-y-6 mt-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-5 space-y-6">
                      <Card className="border-primary/20 bg-primary/5">
                        <CardContent className="p-6 text-center">
                          <h2 className="text-3xl font-extrabold text-primary capitalize mb-2">{manualResult.key}</h2>
                          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Face Shape</div>
                          <p className="text-sm text-foreground/80">{SHAPE_TIPS[manualResult.key].desc}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="py-4 border-b">
                          <CardTitle className="text-sm uppercase tracking-widest">Shape Match %</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                          {Object.entries(manualResult.probabilities)
                            .sort((a,b) => b[1] - a[1])
                            .slice(0, 4)
                            .map(([shape, prob]) => (
                              <ProgressBar key={shape} label={shape} value={prob} colorClass={shape === manualResult.key ? "bg-primary" : "bg-muted-foreground/30"} />
                          ))}
                        </CardContent>
                      </Card>
                    </div>

                    <div className="lg:col-span-7 space-y-6">
                      <Card>
                        <CardHeader className="py-4 border-b bg-muted/20">
                          <CardTitle className="text-sm uppercase tracking-widest">Style Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-5">
                          <ul className="space-y-3">
                            {SHAPE_TIPS[manualResult.key].bullets.map((tip, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm">
                                <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {tip}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="py-4 border-b bg-muted/20">
                          <CardTitle className="text-sm uppercase tracking-widest">Core Proportions</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <ProgressBar label="Face Ratio (W/L)" value={(manualResult.measures.faceWidth / manualResult.measures.faceLength) * 100} />
                          <ProgressBar label="Forehead Ratio (F/W)" value={(manualResult.measures.foreheadWidth / manualResult.measures.faceWidth) * 100} />
                          <ProgressBar label="Jaw Width Ratio (J/W)" value={(manualResult.measures.jawWidth / manualResult.measures.faceWidth) * 100} />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <ShareResults shape={manualResult.key} confidence={manualResult.probabilities[manualResult.key]} />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}