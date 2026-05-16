// lib/blog/pear-dress-data.ts
// All dress, neckline, fabric, occasion data for the pear-shape blog.
// Used by BestDressesPearShapeBlog and PearOutfitRecommender.

export type OccasionId =
  | "office"
  | "wedding"
  | "date-night"
  | "casual"
  | "party"
  | "brunch";

export interface PearDress {
  id: string;
  name: string;
  why: string;
  occasions: OccasionId[];
  fabricTip: string;
  fitScore: number;          // 0–100, how well it balances pear proportions
  image: string;             // /public path
  brandColor: string;
}

export interface OccasionMatch {
  id: OccasionId;
  label: string;
  emoji: string;
  matches: string[];         // dress ids that work
}

export const pearDresses: PearDress[] = [
  {
    id: "a-line",
    name: "A-Line Dress",
    why: "Skims over hips and thighs while highlighting your defined waist. The universal pear-shape winner.",
    occasions: ["office", "brunch", "date-night"],
    fabricTip: "Pick a structured cotton blend or ponte knit — it drapes without clinging.",
    fitScore: 95,
    image: "/images/pear-dresses/a-line.png",
    brandColor: "#E76F51",
  },
  {
    id: "fit-and-flare",
    name: "Fit-and-Flare Dress",
    why: "Cinches the waist and flows outward — balances wider hips with a feminine sweep.",
    occasions: ["wedding", "party", "date-night"],
    fabricTip: "A heavier crepe or scuba fabric holds the flare shape best.",
    fitScore: 92,
    image: "/images/pear-dresses/fit-and-flare.png",
    brandColor: "#F4A261",
  },
  {
    id: "wrap-dress",
    name: "Wrap Dress",
    why: "Defines the waist with a tie and creates an even silhouette top-to-bottom.",
    occasions: ["office", "brunch", "date-night"],
    fabricTip: "Jersey or silk crepe — soft drape that wraps without bulk at the hip.",
    fitScore: 90,
    image: "/images/pear-dresses/wrap-dress.png",
    brandColor: "#2A9D8F",
  },
  {
    id: "off-shoulder-set",
    name: "Off-Shoulder Top + Wide-Leg Pants",
    why: "Pulls the eye upward to shoulders and creates a longer leg line below.",
    occasions: ["casual", "date-night", "party"],
    fabricTip: "Pair a fitted off-shoulder knit with high-waist linen or wool-blend trousers.",
    fitScore: 88,
    image: "/images/pear-dresses/off-shoulder-set.png",
    brandColor: "#264653",
  },
  {
    id: "boat-neck-shift",
    name: "Boat-Neck Statement Dress",
    why: "Widens the visual shoulder line — instantly balances broader hips.",
    occasions: ["office", "wedding", "brunch"],
    fabricTip: "Structured fabrics like mikado or heavy cotton hold the neckline open.",
    fitScore: 86,
    image: "/images/pear-dresses/boat-neck.png",
    brandColor: "#9D4EDD",
  },
  {
    id: "peplum-top-set",
    name: "Peplum Top + Straight Skirt",
    why: "The flared peplum hits exactly where it skims the hip — never adds volume.",
    occasions: ["office", "party"],
    fabricTip: "Choose a peplum that ends at the high-hip, not low-hip — that's the magic line.",
    fitScore: 82,
    image: "/images/pear-dresses/peplum.png",
    brandColor: "#E9C46A",
  },
];

export const occasionList: OccasionMatch[] = [
  {
    id: "office",
    label: "Office / Workwear",
    emoji: "💼",
    matches: ["a-line", "wrap-dress", "boat-neck-shift", "peplum-top-set"],
  },
  {
    id: "wedding",
    label: "Wedding Guest",
    emoji: "💍",
    matches: ["fit-and-flare", "boat-neck-shift"],
  },
  {
    id: "date-night",
    label: "Date Night",
    emoji: "🌙",
    matches: ["a-line", "fit-and-flare", "wrap-dress", "off-shoulder-set"],
  },
  {
    id: "casual",
    label: "Weekend Casual",
    emoji: "☕",
    matches: ["off-shoulder-set", "wrap-dress"],
  },
  {
    id: "party",
    label: "Party / Cocktail",
    emoji: "🥂",
    matches: ["fit-and-flare", "off-shoulder-set", "peplum-top-set"],
  },
  {
    id: "brunch",
    label: "Brunch / Daytime",
    emoji: "🥞",
    matches: ["a-line", "wrap-dress", "boat-neck-shift"],
  },
];

export const pearNecklines: { name: string; why: string }[] = [
  { name: "Boat Neck", why: "Widens the shoulder line visually." },
  { name: "Sweetheart", why: "Adds soft volume to the bust to balance hips." },
  { name: "Off-Shoulder", why: "Showcases collarbones and broadens the upper frame." },
  { name: "Cowl Neck", why: "Adds graceful drape and visual mass to the chest." },
  { name: "Square Neck", why: "Creates structure across the shoulders." },
];

export const pearFabrics: { name: string; verdict: "love" | "avoid"; note: string }[] = [
  { name: "Ponte Knit", verdict: "love", note: "Holds shape over hips without clinging." },
  { name: "Crepe", verdict: "love", note: "Drapes elegantly and balances proportions." },
  { name: "Silk Charmeuse", verdict: "love", note: "Light and flowing — great for evening." },
  { name: "Mikado", verdict: "love", note: "Structured boat-neck dresses sit perfectly." },
  { name: "Stretch Denim (Skinny)", verdict: "avoid", note: "Hugs the heaviest area too tightly." },
  { name: "Stiff Pleated Cotton", verdict: "avoid", note: "Adds visual width at the hip." },
  { name: "Bias-Cut Satin (Hip-Length)", verdict: "avoid", note: "Pulls the eye to the widest point." },
];

export const pearAvoid: string[] = [
  "Skinny jeans paired with tight, plain tops",
  "Pencil skirts in stiff fabric",
  "Pleated or gathered bottoms that add hip volume",
  "Drop-waist dresses that elongate hips",
  "Cropped boxy jackets that end at the hip line",
];

export const pearStylingRules: { title: string; detail: string }[] = [
  {
    title: "Balance the silhouette",
    detail:
      "Add visual interest above the waist — bright tops, statement sleeves, embellished necklines — and keep the bottom half clean and dark.",
  },
  {
    title: "Define the waist",
    detail:
      "A defined waist is your strongest feature. Belts, wrap ties, and fit-and-flare cuts make every outfit work harder.",
  },
  {
    title: "Lengthen the lower body",
    detail:
      "Long skirts with high slits, wide-leg trousers, and pointed-toe shoes elongate the leg line.",
  },
  {
    title: "Choose fabric over structure",
    detail:
      "Stiff fabric adds volume where you don't want it. Soft drapes (jersey, crepe, silk) skim the body instead.",
  },
];

export function getDressById(id: string): PearDress | undefined {
  return pearDresses.find((d) => d.id === id);
}

export function getDressesForOccasion(occasionId: OccasionId): PearDress[] {
  const occasion = occasionList.find((o) => o.id === occasionId);
  if (!occasion) return [];
  return pearDresses.filter((d) => occasion.matches.includes(d.id));
}
