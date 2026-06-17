// lib/blog/facial-harmony-data.ts
// All facial measurements, ideal ranges, scoring helpers, tips, and FAQ data
// for the "Mathematics of Beauty: Facial Harmony Calculator" blog.
// Shared by FacialHarmonyBlog, FacialHarmonyRadarChart, and the calculator.

export type Gender = "neutral" | "male" | "female";

export interface FacialMetric {
  id: string;
  name: string;            // "Gonial Angle"
  short: string;           // "Jawline"
  unit: "deg" | "ratio";
  ideal: { min: number; max: number };
  idealBySex?: {
    male: { min: number; max: number };
    female: { min: number; max: number };
  };
  tolerance: number;       // units outside ideal that still earn partial points
  brandColor: string;
  blurb: string;
  points: string[];        // landmark points clicked in image mode, in order
  geometry: "angle3" | "tiltLine" | "ratioLenWidth";
}

/* THE SIX MEASUREMENTS */

export const facialMetrics: FacialMetric[] = [
  {
    id: "gonial",
    name: "Gonial Angle",
    short: "Jawline",
    unit: "deg",
    ideal: { min: 115, max: 130 },
    tolerance: 20,
    brandColor: "#10b981",
    blurb:
      "The angle of the lower jaw measured at the corner below the ear. Lower reads sharper and more square, higher reads softer and rounder.",
    points: ["Top of jaw near the ear (condylion)", "Jaw corner (gonion)", "Tip of chin (menton)"],
    geometry: "angle3",
  },
  {
    id: "nasolabial",
    name: "Nasolabial Angle",
    short: "Nose to lip",
    unit: "deg",
    ideal: { min: 95, max: 110 },
    idealBySex: {
      male: { min: 90, max: 105 },
      female: { min: 100, max: 115 },
    },
    tolerance: 18,
    brandColor: "#14b8a6",
    blurb:
      "The angle between the base of the nose and the upper lip. A slight upward tilt usually reads more feminine and youthful.",
    points: ["Base of the nose (columella)", "Point under the nose (subnasale)", "Upper lip edge (labrale superius)"],
    geometry: "angle3",
  },
  {
    id: "canthal",
    name: "Canthal Tilt",
    short: "Eye angle",
    unit: "deg",
    ideal: { min: 2, max: 8 },
    tolerance: 8,
    brandColor: "#22c55e",
    blurb:
      "The slope of the eye from the inner corner to the outer corner. A small positive tilt lifts the eye and reads alert; a negative tilt can read tired.",
    points: ["Inner eye corner (medial canthus)", "Outer eye corner (lateral canthus)"],
    geometry: "tiltLine",
  },
  {
    id: "nasofrontal",
    name: "Nasofrontal Angle",
    short: "Forehead to nose",
    unit: "deg",
    ideal: { min: 115, max: 130 },
    tolerance: 18,
    brandColor: "#84cc16",
    blurb:
      "The transition where the forehead meets the bridge of the nose, viewed from the side. It sets how deep or shallow the brow-to-nose curve looks.",
    points: ["Mid forehead (glabella)", "Deepest point at top of nose (nasion)", "Bridge of the nose (rhinion)"],
    geometry: "angle3",
  },
  {
    id: "mentolabial",
    name: "Mentolabial Angle",
    short: "Lip to chin",
    unit: "deg",
    ideal: { min: 110, max: 130 },
    tolerance: 18,
    brandColor: "#65a30d",
    blurb:
      "The fold between the lower lip and the chin. It controls whether the chin looks balanced, recessed, or over-projected.",
    points: ["Lower lip edge (labrale inferius)", "Deepest fold below lip (mentolabial sulcus)", "Tip of chin (pogonion)"],
    geometry: "angle3",
  },
  {
    id: "golden",
    name: "Golden Ratio",
    short: "Length to width",
    unit: "ratio",
    ideal: { min: 1.5, max: 1.7 },
    tolerance: 0.35,
    brandColor: "#0d9488",
    blurb:
      "Face length divided by face width. Faces close to Phi (about 1.618) tend to read as balanced.",
    points: ["Hairline center (trichion)", "Tip of chin (menton)", "Left cheekbone edge", "Right cheekbone edge"],
    geometry: "ratioLenWidth",
  },
];

/* SCORING HELPERS */

export function idealFor(metric: FacialMetric, gender: Gender) {
  if (metric.idealBySex && gender !== "neutral") {
    return metric.idealBySex[gender];
  }
  return metric.ideal;
}

export function scoreMetric(
  metric: FacialMetric,
  value: number | null,
  gender: Gender
): number | null {
  if (value === null || Number.isNaN(value)) return null;
  const range = idealFor(metric, gender);
  if (value >= range.min && value <= range.max) return 100;
  const dist = value < range.min ? range.min - value : value - range.max;
  const pct = 100 - (dist / metric.tolerance) * 100;
  return Math.max(0, Math.round(pct));
}

export function overallScore(
  values: Record<string, number | null>,
  gender: Gender
): number | null {
  const scores: number[] = [];
  for (const m of facialMetrics) {
    const s = scoreMetric(m, values[m.id] ?? null, gender);
    if (s !== null) scores.push(s);
  }
  if (scores.length === 0) return null;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

export function scoreBand(score: number): { label: string; color: string } {
  if (score >= 85) return { label: "Very harmonious", color: "#10b981" };
  if (score >= 70) return { label: "Harmonious", color: "#22c55e" };
  if (score >= 55) return { label: "Fairly balanced", color: "#84cc16" };
  if (score >= 40) return { label: "Mixed", color: "#eab308" };
  return { label: "Room to balance", color: "#f97316" };
}

/* GEOMETRY (pure trig) */

export interface Pt {
  x: number;
  y: number;
}

/** Interior angle at vertex B for points A-B-C, in degrees (0-180). */
export function angle3(a: Pt, b: Pt, c: Pt): number {
  const v1 = { x: a.x - b.x, y: a.y - b.y };
  const v2 = { x: c.x - b.x, y: c.y - b.y };
  const dot = v1.x * v2.x + v1.y * v2.y;
  const m1 = Math.hypot(v1.x, v1.y);
  const m2 = Math.hypot(v2.x, v2.y);
  if (m1 === 0 || m2 === 0) return 0;
  let cos = dot / (m1 * m2);
  cos = Math.min(1, Math.max(-1, cos));
  return (Math.acos(cos) * 180) / Math.PI;
}

/** Canthal tilt: signed angle of inner-to-outer eye line versus horizontal. */
export function tiltAngle(inner: Pt, outer: Pt): number {
  const dx = Math.abs(outer.x - inner.x);
  const dy = inner.y - outer.y; // positive when outer corner sits higher
  if (dx === 0) return 0;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

/** Golden ratio: vertical face length divided by horizontal face width. */
export function ratioLenWidth(top: Pt, bottom: Pt, left: Pt, right: Pt): number {
  const length = Math.hypot(bottom.x - top.x, bottom.y - top.y);
  const width = Math.hypot(right.x - left.x, right.y - left.y);
  if (width === 0) return 0;
  return length / width;
}

/* PHOTO TIPS */

export interface PhotoTip {
  id: string;
  title: string;
  detail: string;
}

export const photoTips: PhotoTip[] = [
  {
    id: "distance",
    title: "Stand back, then zoom in",
    detail:
      "Shoot from at least five feet away and zoom, instead of a close selfie. Close lenses stretch the nose and flatten the jaw, which throws every angle off.",
  },
  {
    id: "profile",
    title: "Use a true side profile for jaw and nose angles",
    detail:
      "Gonial, nasofrontal, nasolabial, and mentolabial angles are read from the side. Turn a full 90 degrees and keep your head level, eyes forward.",
  },
  {
    id: "front",
    title: "Use a straight front shot for eyes and ratios",
    detail:
      "Canthal tilt and the golden ratio need a face-on photo. Keep the camera at eye height so your features are not tilted up or down.",
  },
  {
    id: "neutral",
    title: "Relax your face",
    detail:
      "No smiling, no clenching. A tense jaw or a grin changes the lip and chin angles and gives you a reading that won't repeat next time.",
  },
  {
    id: "light",
    title: "Flat, even light",
    detail:
      "Hard shadows hide the exact landmark points. Face a window or use soft, even light so the inner eye corner, jaw corner, and chin tip are easy to mark.",
  },
  {
    id: "repeat",
    title: "Keep conditions the same to compare later",
    detail:
      "If you want to track changes over time, repeat the same distance, angle, and lighting. Consistent photos make your saved results comparable.",
  },
];

/* WHAT HELPS / HURTS ACCURACY */

export const accuracyHabits: {
  name: string;
  verdict: "good" | "bad";
  note: string;
}[] = [
  {
    name: "Marking the deepest point of a fold, not the surface",
    verdict: "good",
    note: "Nasion and the mentolabial sulcus are the deepest dips. Mark those, not the skin around them.",
  },
  {
    name: "Zooming the photo before placing points",
    verdict: "good",
    note: "Bigger landmarks mean smaller click errors. A few pixels off can shift an angle by two or three degrees.",
  },
  {
    name: "Taking the same shot twice and averaging",
    verdict: "good",
    note: "Two careful reads that agree give you confidence the number is real, not a fluke of one click.",
  },
  {
    name: "Using a close-up selfie",
    verdict: "bad",
    note: "Lens distortion near the face inflates the nose and warps the jaw line. Your angles will be wrong.",
  },
  {
    name: "Tilting the head up or down",
    verdict: "bad",
    note: "A tilted head changes the apparent jaw and nose angles. Keep the chin level and eyes forward.",
  },
  {
    name: "Reading one number as a verdict",
    verdict: "bad",
    note: "A single degree outside a range means little. Look at the full picture across all measurements.",
  },
];

/* FAQ */

export const faqs: { q: string; a: string }[] = [
  {
    q: "How does a facial harmony calculator work?",
    a: "It uses basic trigonometry. You mark a few landmark points on your photo, like the corner of your jaw or the inner and outer corners of your eye. The tool then measures the angle between those points and compares it to the ranges that surgeons and orthodontists treat as balanced. The math is exact. The only thing that affects the result is how carefully you place the points.",
  },
  {
    q: "What is the most attractive gonial angle?",
    a: "Most aesthetic studies put the balanced gonial angle between 115 and 130 degrees. An angle near 120 gives a defined, structured jaw. Above about 140 degrees the jaw can look soft or sloping, while a very low angle reads as square and strong. There is no single correct number, since a stronger or softer jaw suits different faces.",
  },
  {
    q: "What does a positive canthal tilt mean?",
    a: "It means the outer corner of your eye sits slightly higher than the inner corner. A tilt of roughly +2 to +8 degrees is the range people tend to find alert and youthful. A negative tilt, where the outer corner drops below the inner corner, can give a tired or downturned look.",
  },
  {
    q: "Is the golden ratio really linked to beauty?",
    a: "Partly. Faces with a length-to-width ratio near 1.618 often read as balanced, and the proportion shows up across many faces people rate highly. But it is one signal among many. Symmetry, skin, expression, and proportion between features matter just as much. Treat the ratio as a guide, not a grade.",
  },
  {
    q: "Do the ideal angles differ for men and women?",
    a: "For most angles, no. The jaw, eye, forehead, and chin angles use the same balanced ranges. The clear exception is the nasolabial angle. Men tend to look balanced around 90 to 105 degrees, while women often look balanced with a slight upward tilt around 100 to 115 degrees. The calculator adjusts that range when you set your sex.",
  },
  {
    q: "Will I get the same result every time?",
    a: "You will if your photo and your point placement stay consistent. Different lighting, camera distance, or head tilt will move the numbers. That is why the tool lets you save each result with the date. When you repeat the measurement under the same conditions, you can compare the readings and trust the trend.",
  },
  {
    q: "Are average or mathematically perfect faces the most attractive?",
    a: "Not always. Faces built to be perfectly average can look flat or synthetic. Small departures from the ideal, like a distinct nose or an uneven smile, often add character that people find more appealing. The math gives you a blueprint of balance. It does not measure charm, expression, or the things that make a face memorable.",
  },
];
