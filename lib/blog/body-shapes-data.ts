// lib/blog/body-shapes-data.ts
// All 5 female body shapes with full styling and measurement data.

export type ShapeId =
  | "pear"
  | "apple"
  | "hourglass"
  | "rectangle"
  | "inverted-triangle";

export interface DressRecommendation {
  name: string;
  why: string;
  occasions: string[];
}

export interface BodyShape {
  id: ShapeId;
  name: string;
  alsoKnownAs: string;
  illustration: string;          // /public path
  ratioRule: string;             // e.g. "Hips > Bust by 5%+"
  description: string;
  characteristics: string[];
  bestDresses: DressRecommendation[];
  bestNecklines: string[];
  avoid: string[];
  celebrities: string[];
  stylingGoal: string;
  brandColor: string;            // hex — used by charts and cards
}

export const bodyShapes: BodyShape[] = [
  {
    id: "pear",
    name: "Pear",
    alsoKnownAs: "Triangle / A-Shape",
    illustration: "/images/body-shapes/pear-shape.webp",
    ratioRule: "Hips > Bust by 5% or more",
    description:
      "Your hips are wider than your shoulders and bust, with a beautifully defined waist. The lower body carries more weight than the upper.",
    characteristics: [
      "Narrower shoulders than hips",
      "Defined waistline",
      "Fuller thighs and hips",
      "Smaller bust",
    ],
    bestDresses: [
      {
        name: "A-Line Dress",
        why: "Skims over hips while highlighting your waist.",
        occasions: ["Office", "Brunch", "Date night"],
      },
      {
        name: "Fit-and-Flare",
        why: "Cinches the waist and flows out — balances proportions perfectly.",
        occasions: ["Wedding", "Cocktail", "Party"],
      },
      {
        name: "Off-Shoulder Top + Wide-Leg Pants",
        why: "Draws attention upward and balances wider hips.",
        occasions: ["Casual", "Evening dinner"],
      },
      {
        name: "Wrap Dress",
        why: "Defines the waist and creates an even silhouette.",
        occasions: ["Office", "Daytime events"],
      },
    ],
    bestNecklines: ["Boat neck", "Sweetheart", "Off-shoulder", "Cowl neck"],
    avoid: [
      "Skinny jeans with tight tops",
      "Pencil skirts in stiff fabric",
      "Pleated bottoms that add hip volume",
    ],
    celebrities: ["Beyoncé", "Jennifer Lopez", "Shakira"],
    stylingGoal: "Add visual weight to the upper body to balance hips.",
    brandColor: "#E76F51",
  },
  {
    id: "apple",
    name: "Apple",
    alsoKnownAs: "Round / O-Shape",
    illustration: "/images/body-shapes/apple-shape.webp",
    ratioRule: "Bust > Hips, undefined waistline",
    description:
      "You carry weight around the midsection with a fuller bust and slimmer legs. Your silhouette is rounded through the torso.",
    characteristics: [
      "Fuller bust and midsection",
      "Less defined waist",
      "Slimmer hips and legs",
      "Rounded shoulders",
    ],
    bestDresses: [
      {
        name: "Empire Waist Dress",
        why: "Cinches just below the bust, flows over the midsection.",
        occasions: ["Wedding guest", "Formal event"],
      },
      {
        name: "V-Neck Wrap Dress",
        why: "Lengthens the torso and creates a defined waist illusion.",
        occasions: ["Office", "Date night"],
      },
      {
        name: "Shift Dress",
        why: "Skims the body without clinging to the midsection.",
        occasions: ["Casual", "Daytime"],
      },
      {
        name: "Straight-Leg Trousers + Tunic Top",
        why: "Elongates the leg line and balances the upper body.",
        occasions: ["Office", "Smart casual"],
      },
    ],
    bestNecklines: ["V-neck", "Scoop neck", "U-neck"],
    avoid: [
      "Pencil skirts in clingy fabric",
      "Cropped tops",
      "Belts at the natural waist",
    ],
    celebrities: ["Adele", "Drew Barrymore", "Queen Latifah"],
    stylingGoal: "Elongate the torso and draw attention to legs and bust.",
    brandColor: "#F4A261",
  },
  {
    id: "hourglass",
    name: "Hourglass",
    alsoKnownAs: "X-Shape",
    illustration: "/images/body-shapes/hourglass-shape.webp",
    ratioRule: "Bust ≈ Hips, Waist 25%+ smaller",
    description:
      "Your bust and hips are roughly equal in measurement, with a clearly defined narrow waist. The classic balanced silhouette.",
    characteristics: [
      "Bust and hips nearly equal",
      "Highly defined waist",
      "Curvy proportional figure",
      "Soft shoulder line",
    ],
    bestDresses: [
      {
        name: "Bodycon Dress",
        why: "Hugs every curve and showcases your natural waist.",
        occasions: ["Cocktail", "Night out"],
      },
      {
        name: "Wrap Dress",
        why: "Made for hourglass figures — defines and flatters every curve.",
        occasions: ["Office", "Wedding guest"],
      },
      {
        name: "Pencil Skirt + Fitted Top",
        why: "Highlights your waist-to-hip ratio.",
        occasions: ["Office", "Formal"],
      },
      {
        name: "Belted Sheath Dress",
        why: "Cinches the waist while skimming the body.",
        occasions: ["Business", "Date night"],
      },
    ],
    bestNecklines: ["Sweetheart", "V-neck", "Scoop neck"],
    avoid: [
      "Boxy or shapeless cuts",
      "Drop-waist dresses",
      "Oversized blazers without a belt",
    ],
    celebrities: ["Scarlett Johansson", "Kim Kardashian", "Marilyn Monroe"],
    stylingGoal: "Emphasize the waist — your strongest feature.",
    brandColor: "#2A9D8F",
  },
  {
    id: "rectangle",
    name: "Rectangle",
    alsoKnownAs: "Athletic / Straight / Banana",
    illustration: "/images/body-shapes/rectangle-shape.webp",
    ratioRule: "Bust ≈ Waist ≈ Hips (within 5%)",
    description:
      "Your shoulders, waist, and hips are roughly the same width. A lean, athletic silhouette with minimal waist definition.",
    characteristics: [
      "Straight up-and-down figure",
      "Minimal waist definition",
      "Even shoulder and hip line",
      "Athletic build",
    ],
    bestDresses: [
      {
        name: "Peplum Dress",
        why: "Creates curves at the hip — instant hourglass illusion.",
        occasions: ["Office", "Party"],
      },
      {
        name: "Belted Shirt Dress",
        why: "Defines a waist where there isn't one naturally.",
        occasions: ["Brunch", "Casual"],
      },
      {
        name: "Ruffle or Tiered Dress",
        why: "Adds volume and creates curves on a straight frame.",
        occasions: ["Date", "Garden party"],
      },
      {
        name: "Skater Dress",
        why: "Cinched waist + flared skirt = curves on demand.",
        occasions: ["Casual", "Day events"],
      },
    ],
    bestNecklines: ["Halter", "Sweetheart", "Scoop", "Square neck"],
    avoid: [
      "Straight shift dresses with no waist detail",
      "Boxy crop tops",
      "Drop-waist styles that elongate further",
    ],
    celebrities: ["Cameron Diaz", "Nicole Kidman", "Gwyneth Paltrow"],
    stylingGoal: "Create curves and fake a defined waist.",
    brandColor: "#264653",
  },
  {
    id: "inverted-triangle",
    name: "Inverted Triangle",
    alsoKnownAs: "V-Shape / Athletic",
    illustration: "/images/body-shapes/inverted-triangle-shape.webp",
    ratioRule: "Shoulders/Bust > Hips by 5%+",
    description:
      "Your shoulders and bust are wider than your hips. Strong, broad upper body with a slimmer lower half.",
    characteristics: [
      "Broad shoulders",
      "Fuller bust",
      "Narrow hips",
      "Slim legs",
    ],
    bestDresses: [
      {
        name: "A-Line Skirt + Simple Top",
        why: "Adds volume to hips and balances broad shoulders.",
        occasions: ["Office", "Casual"],
      },
      {
        name: "Wide-Leg or Flared Pants",
        why: "Adds proportion to the lower body.",
        occasions: ["Office", "Evening"],
      },
      {
        name: "Wrap Dress with Full Skirt",
        why: "Defines the waist and adds curves to hips.",
        occasions: ["Date", "Wedding guest"],
      },
      {
        name: "Printed Bottoms + Plain Top",
        why: "Visually adds weight and interest below the waist.",
        occasions: ["Casual", "Vacation"],
      },
    ],
    bestNecklines: ["V-neck", "Scoop neck", "Halter (avoid wide boat necks)"],
    avoid: [
      "Shoulder pads",
      "Boat necks and puffy sleeves",
      "Skinny jeans with fitted tops",
    ],
    celebrities: ["Angelina Jolie", "Naomi Campbell", "Demi Moore"],
    stylingGoal: "Add volume to the lower body to balance broad shoulders.",
    brandColor: "#9D4EDD",
  },
];

export function getShapeById(id: ShapeId): BodyShape | undefined {
  return bodyShapes.find((s) => s.id === id);
}
