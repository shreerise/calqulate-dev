// lib/blog/male-body-shape-data.ts
// The five male body shapes, the ratio-based classification algorithm,
// measurement steps, comparison data, and FAQ for the
// "Body Shape Calculator for Men: How to Measure Your Body Shape" blog.
//
// Used by MaleBodyShape3D, MaleBodyShapeChart, and MensBodyShapeBlog.
//
// Shapes and measurement ranges match Calqulate's body shape calculator
// (verified June 2026). Classification is ratio-based, so it works in inches
// or centimetres as long as all four numbers use the same unit.

/* ───────────────────────────── TYPES ───────────────────────────── */

export type ShapeId = "inverted" | "trapezoid" | "rectangle" | "triangle" | "oval";

export interface MaleShape {
  id: ShapeId;
  name: string;
  tagline: string;
  shoulderToWaist: number;   // typical ratio, used by the chart
  rule: string;              // plain-English detection rule
  description: string;
  styleTips: string[];
  trainingTips: string[];
  brandColor: string;        // fill for the 3D figure + chart
  accent: string;            // tailwind ring/badge tone class
}

export interface MeasureStep {
  id: string;
  part: string;
  how: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

/* ─────────────────────── THE FIVE SHAPES ───────────────────────── */

export const maleShapes: MaleShape[] = [
  {
    id: "inverted",
    name: "Inverted Triangle",
    tagline: "The athletic V-taper",
    shoulderToWaist: 1.47,
    rule: "Shoulders much wider than the waist (ratio about 1.4 or higher), hips narrow.",
    description:
      "Broad shoulders and chest taper sharply to a narrow waist and hips. Common in swimmers, lifters, and naturally wide-framed men. Shirts that fit the shoulders tend to balloon at the waist.",
    styleTips: [
      "Slim-fit shirts with stretch, or have shirts taken in at the waist",
      "Avoid heavy shoulder padding, your frame already has width up top",
      "Straight or slim trousers add a little visual weight to the lower half",
    ],
    trainingTips: [
      "Keep training the legs so the lower body keeps pace with the upper",
      "Add mobility work to offset tight chest and shoulders",
    ],
    brandColor: "#059669",
    accent: "ring-emerald-200 bg-emerald-50",
  },
  {
    id: "trapezoid",
    name: "Trapezoid",
    tagline: "The balanced athletic build",
    shoulderToWaist: 1.34,
    rule: "Shoulders moderately wider than the waist (ratio about 1.25 to 1.4), hips slightly narrower than shoulders.",
    description:
      "Shoulders and chest are broader than the waist, with a gentle taper. This is the build most off-the-rack clothing is cut for, so standard sizes usually fit well. Often called the ideal male proportion.",
    styleTips: [
      "Most standard cuts work, so buy for fit and fabric",
      "Slim and tailored fits show the natural taper",
      "Layering works without bulking you out",
    ],
    trainingTips: [
      "Balanced training keeps the proportions, no single area needs chasing",
      "Mix resistance, conditioning, and mobility",
    ],
    brandColor: "#10b981",
    accent: "ring-emerald-200 bg-emerald-50",
  },
  {
    id: "rectangle",
    name: "Rectangle",
    tagline: "Straight up and down",
    shoulderToWaist: 1.18,
    rule: "Shoulders, waist, and hips are close to the same width (shoulder-to-waist under about 1.25).",
    description:
      "Shoulders, chest, waist, and hips sit at roughly the same width, so the torso reads straight. Lean men often land here. The goal with clothing and training is to build the appearance of an upper-body taper.",
    styleTips: [
      "Structured jackets with light shoulder padding widen the upper line",
      "Tapered trousers narrow the lower half for contrast",
      "Horizontal detail on top, like chest pockets, adds width where you want it",
    ],
    trainingTips: [
      "Prioritize shoulders, upper back, and chest to build a V-taper",
      "Bench press, pull-ups, and lateral raises help most",
    ],
    brandColor: "#34d399",
    accent: "ring-slate-200 bg-slate-50",
  },
  {
    id: "triangle",
    name: "Triangle",
    tagline: "Wider through the hips",
    shoulderToWaist: 1.1,
    rule: "Hips wider than the shoulders, weight carried in the lower body.",
    description:
      "Hips and waist are wider than the shoulders and chest, so the lower body dominates. This shape often shows up with age or after a long stretch of low activity. Clothing and training both aim to widen the top.",
    styleTips: [
      "Structured blazers with a strong shoulder line widen the upper body",
      "Avoid raglan sleeves, which narrow the shoulders",
      "Darker trousers and lighter tops draw the eye upward",
    ],
    trainingTips: [
      "Build shoulders, chest, and arms to balance the frame",
      "Overhead press and rows are high-value lifts here",
    ],
    brandColor: "#6ee7b7",
    accent: "ring-lime-200 bg-lime-50",
  },
  {
    id: "oval",
    name: "Oval",
    tagline: "Fullness through the middle",
    shoulderToWaist: 1.05,
    rule: "Waist is the widest measurement, wider than both chest and hips.",
    description:
      "Most of the visual weight sits in the midsection, with the waist wider than the shoulders and hips. The aim is a longer, leaner line through clothing and a focus on core and overall conditioning in training.",
    styleTips: [
      "Monochrome outfits and vertical lines lengthen the silhouette",
      "Avoid clingy knits and boxy oversized fits, both add bulk",
      "An open jacket or layer creates a vertical frame down the center",
    ],
    trainingTips: [
      "Combine steady cardio with full-body strength work",
      "Core stability and posture work make the biggest visual difference",
    ],
    brandColor: "#a7f3d0",
    accent: "ring-amber-200 bg-amber-50",
  },
];

export function getShape(id: ShapeId): MaleShape {
  return maleShapes.find((s) => s.id === id) as MaleShape;
}

/* ─────────────────── CLASSIFICATION ALGORITHM ──────────────────── */
// Ratio-based, unit-agnostic. Pass shoulders, chest, waist, hips in the
// same unit. The order of checks matters: the most distinctive shapes
// (oval, triangle, inverted) are tested before the in-between ones.

export interface Measurements {
  shoulders: number;
  chest: number;
  waist: number;
  hips: number;
}

export function classifyMaleShape(m: Measurements): ShapeId {
  const { shoulders, chest, waist, hips } = m;
  if (shoulders <= 0 || waist <= 0) return "rectangle";

  const shoulderToWaist = shoulders / waist;
  const hipsVsShoulders = hips - shoulders;

  // 1. Oval: the waist is the widest point.
  if (waist >= chest && waist >= shoulders) return "oval";

  // 2. Triangle: hips clearly wider than shoulders.
  if (hipsVsShoulders > shoulders * 0.03) return "triangle";

  // 3. Inverted triangle: a strong shoulder-to-waist taper.
  if (shoulderToWaist >= 1.4) return "inverted";

  // 4. Trapezoid: a moderate taper.
  if (shoulderToWaist >= 1.25) return "trapezoid";

  // 5. Rectangle: everything close to even.
  return "rectangle";
}

/* ─────────────────── HOW TO MEASURE (4 STEPS) ──────────────────── */

export const measureSteps: MeasureStep[] = [
  {
    id: "shoulders",
    part: "Shoulders",
    how: "Wrap the tape around the widest point of your shoulders and upper arms, keeping it level with the floor.",
  },
  {
    id: "chest",
    part: "Chest",
    how: "Measure the fullest part of your chest, with the tape sitting just under your armpits. Breathe normally, do not puff out.",
  },
  {
    id: "waist",
    part: "Waist",
    how: "Measure your natural waist at navel level, not where your jeans sit. Keep the tape snug, not tight.",
  },
  {
    id: "hips",
    part: "Hips",
    how: "Stand with your feet together and measure around the widest part of your hips and glutes.",
  },
];

/* ───────────────── SAMPLE PRESETS FOR THE 3D FIGURE ─────────────── */
// Default starting measurements (inches) plus quick presets so a reader can
// see each shape morph without typing. Values fall inside Calqulate's chart.

export const shapePresets: Record<ShapeId, Measurements> = {
  inverted:  { shoulders: 48, chest: 45, waist: 32, hips: 38 },
  trapezoid: { shoulders: 46, chest: 43, waist: 34, hips: 39 },
  rectangle: { shoulders: 40, chest: 38, waist: 35, hips: 39 },
  triangle:  { shoulders: 40, chest: 38, waist: 36, hips: 43 },
  oval:      { shoulders: 43, chest: 45, waist: 44, hips: 42 },
};

export const defaultMeasurements: Measurements = shapePresets.trapezoid;

/* ─────────────────────────── FAQ ────────────────────────────────── */

export const maleShapeFaqs: FaqItem[] = [
  {
    q: "How do I find my body shape as a man?",
    a: "Measure four things with a soft tape: shoulders, chest, waist, and hips, all level with the floor. Compare the numbers. If your shoulders are much wider than your waist you are an inverted triangle, if they are moderately wider you are a trapezoid, if everything is even you are a rectangle, if your hips are widest you are a triangle, and if your waist is widest you are an oval. The body shape calculator does this in one click.",
  },
  {
    q: "What are the five male body shapes?",
    a: "Inverted triangle (broad shoulders, narrow waist), trapezoid (a moderate shoulder-to-waist taper and the most common athletic build), rectangle (shoulders, waist, and hips about even), triangle (hips wider than shoulders), and oval (the waist is the widest point). They are based on the ratios between your measurements, not your weight.",
  },
  {
    q: "What is the most common male body shape?",
    a: "The trapezoid and the rectangle are the two most common. The trapezoid has a gentle taper from broad shoulders to a narrower waist, which is also the build most clothing is cut for. The rectangle runs straight up and down with little taper.",
  },
  {
    q: "What measurements do I need for a male body type calculator?",
    a: "Four: shoulders, chest, waist, and hips. Inches or centimetres both work, since the result comes from the ratios between them, not the raw size. Measure twice and take the average for a cleaner read.",
  },
  {
    q: "Is body shape the same as body type or somatotype?",
    a: "Not quite. Body shape describes your silhouette from your measurements (inverted triangle, rectangle, and so on). Somatotype, the ectomorph, mesomorph, and endomorph idea, describes how easily you build muscle or store fat. You can be a lean rectangle or a muscular rectangle. Shape is about proportions, somatotype is about how your body responds to training and food.",
  },
  {
    q: "Can I change my body shape?",
    a: "You can shift it, within limits. Your bone structure is fixed, but training changes how the frame looks. A rectangle who builds shoulders and back can read closer to a trapezoid, and an oval who loses midsection fat moves toward a rectangle. The shape categories are a starting point, not a life sentence.",
  },
  {
    q: "How accurate is an online body shape calculator?",
    a: "The math is exact, since it just compares your ratios. Accuracy comes down to your measuring. Use a soft tape, keep it level, do not flex, and measure each spot twice. Get that right and the result is reliable. It does not account for height, posture, or limb length, so treat it as a styling and training guide, not a medical reading.",
  },
];
