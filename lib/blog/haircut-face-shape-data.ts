export type FaceShapeKey =
  | "round"
  | "oval"
  | "square"
  | "heart"
  | "diamond"
  | "oblong";

// ─────────────────────────────────────────────────────────
// Core data types
// ─────────────────────────────────────────────────────────

export interface HaircutGuide {
  id: FaceShapeKey;
  label: string;
  /** 1-sentence description used in quick-reference and PDF */
  shortDescription: string;
  /** Identifying characteristics */
  howToIdentify: string;
  /** 2026 styling objective for this shape */
  stylingObjective: string;
  women: {
    headline: string;
    description: string;
    works: string[];
    avoid: string[];
  };
  men: {
    headline: string;
    description: string;
    works: string[];
    avoid: string[];
  };
  textureNote: string;
  /** Used in the Quick Reference table */
  quickRef: {
    women: string;
    men: string;
    principle: string;
  };
}

export interface HaircutFaq {
  q: string;
  a: string;
}

// ─────────────────────────────────────────────────────────
// Haircut guide data
// ─────────────────────────────────────────────────────────

export const haircutGuides: HaircutGuide[] = [
  {
    id: "round",
    label: "Round Face",
    shortDescription:
      "A round face has a similar length and width with soft curves at the cheek and jawline and no strong angles.",
    howToIdentify:
      "Face length and width are nearly equal. Jaw is soft and curved. Cheeks are full with a wide, soft forehead and no sharp angles.",
    stylingObjective:
      "Introduce vertical visual interest - either through added height at the crown or through length that falls below the jaw.",
    women: {
      headline: "Long Bob (Lob) with Soft Interior Layers",
      description:
        "The 2026 Long Bob sitting at collarbone length emphasizes interior layers rather than surface layers. Interior layering removes bulk from the middle of the hair without shortening the overall length, keeping the silhouette elongated. A deep side part breaks up symmetry by creating an asymmetrical line from the forehead downward, drawing the eye vertically rather than across the widest horizontal point. Avoid center parts - they can draw attention to the face's equal width-to-length ratio.",
      works: [
        "Collarbone-length or longer lob",
        "Interior layers for movement",
        "Deep side part (2 inches off center)",
        "Face-framing pieces at the front",
        "Slight wave or blow-dried volume at crown",
      ],
      avoid: [
        "Chin-length blunt bobs (adds width)",
        "Center parts",
        "Volume at cheek level",
        "Tightly curled styles at jaw line",
      ],
    },
    men: {
      headline: "Modern Textured Quiff with High-Contrast Fade",
      description:
        "The textured quiff is a strong 2026 choice for round-faced men. Tighter sides through a high-contrast fade combined with deliberate volume directed upward at the crown balances facial width by adding perceived height. The visual proportion shifts from circular to more elongated. The key word is textured - a flat, helmet-shaped quiff sits wide and low, producing the opposite effect. Ask your barber to disconnect the fade and leave enough length at the top to build vertical movement with a matte clay or paste.",
      works: [
        "Textured quiff with high-contrast fade",
        "Disconnected undercut with crown volume",
        "Side-swept styles with fade",
      ],
      avoid: [
        "Low-volume buzz cuts",
        "Wide, flat crops",
        "Round afro shapes without height",
      ],
    },
    textureNote:
      "Straight or fine hair: light volumizing spray at roots to build crown height. Wavy or curly: let natural texture do the lifting - ask for a dry cut so the stylist shapes around the curl pattern. Coily hair naturally creates height; focus the layering request on length retention rather than adding volume.",
    quickRef: {
      women: "Soft lob · Interior layers · Side part",
      men: "Textured quiff · High-contrast fade",
      principle: "Add vertical height",
    },
  },
  {
    id: "oval",
    label: "Oval Face",
    shortDescription:
      "Oval faces have balanced proportions - slightly longer than wide, with a gently rounded jaw and forehead.",
    howToIdentify:
      "Face length is about 1.5× the face width. Forehead is slightly wider than the jaw. Jawline is softly rounded, not sharp or pointed. Cheekbones are the widest point.",
    stylingObjective:
      "Maintain natural movement rather than forcing dramatic changes - oval faces respond well to a wide range of cuts.",
    women: {
      headline: "Blunt Collarbone Cut with Curtain Bangs",
      description:
        "A blunt-edge cut at collarbone length with a clean, even line across the bottom creates a polished, modern look prominent in 2026 collections. Curtain bangs - soft, center-parted fringe that frames the face without covering the entire forehead - complement this cut well for oval faces because they add facial framing without disrupting the shape's natural balance. Very heavy layering or extreme volume at one area can throw off the natural equilibrium. The 2026 direction is clean lines with a hint of movement - not dramatic architectural haircuts.",
      works: [
        "Blunt collarbone-length cut",
        "Curtain bangs with center part",
        "Long layers with natural movement",
        "Sleek buns or ponytails",
        "Lobs - blunt or lightly layered",
      ],
      avoid: [
        "Oversized frames or shapes that hide balanced proportions",
        "Very heavy top-of-head volume",
        "Extreme architectural precision cuts",
      ],
    },
    men: {
      headline: "Textured Crop or Swept-Back Pompadour",
      description:
        "The textured crop - a short cut with choppy, deliberately uneven ends on top - suits oval faces because it sits close to the head without needing to compensate for any imbalance. The swept-back pompadour (a modern, lower-profile version) adds a controlled degree of height while keeping the sides tight and clean. Avoid over-gelled or lacquered finishes. A light matte pomade or sea salt spray preserves the flexible, textured look that defines 2026 men's styling.",
      works: [
        "Textured crop with matte finish",
        "Modern swept-back pompadour",
        "Classic side part with taper fade",
        "Slick back with soft hold product",
      ],
      avoid: [
        "Stiff gel or lacquered finishes",
        "Overly sculpted, rigid styles",
      ],
    },
    textureNote:
      "Most styles work for oval faces regardless of texture. Fine hair benefits from the blunt cut's added fullness illusion. Thick hair: light layers prevent bulk. Curly hair: let the curl pattern define edges naturally.",
    quickRef: {
      women: "Blunt collarbone cut · Curtain bangs",
      men: "Textured crop · Swept pompadour",
      principle: "Maintain natural movement",
    },
  },
  {
    id: "square",
    label: "Square Face",
    shortDescription:
      "A square face has a broad, angular jaw and a forehead that is roughly the same width - giving a strong, rectangular outline.",
    howToIdentify:
      "Forehead, cheekbones, and jawline are all roughly similar in width. Jaw is strong, angular, and well-defined. Face length and width are similar.",
    stylingObjective:
      "Soften the visual sharpness of angular jaw lines through wispy, organic texture rather than blunt geometric cuts.",
    women: {
      headline: "Long Wispy Shag with Soft Textured Layers",
      description:
        "The 2026 shag - a layered cut with wispy, feathered ends - is among the best options for square face shapes. Its irregular, organic texture reduces the visual rigidity of a strong jaw by surrounding the face with movement and softness. Unlike a blunt bob that ends exactly at the jaw (framing the jaw's width), a shag that falls below the jaw draws the eye downward. Layers should be cut with a point-cutting or razored technique rather than blunt scissors to ensure the ends remain airy rather than solid.",
      works: [
        "Long wispy shag below the jaw",
        "Soft, point-cut layers throughout",
        "Curtain bangs or wispy fringe",
        "Long waves and loose texture",
        "Face-framing pieces at front",
      ],
      avoid: [
        "Blunt-cut bobs ending exactly at the jaw",
        "Cuts with a straight, hard perimeter",
        "Short bobs with extra jaw-level volume",
      ],
    },
    men: {
      headline: "Soft Textured Ivy League or Classic Scissor Cut",
      description:
        "The 2026 direction for square-faced men is away from sharp, rigid fades and toward softer, scissor-cut styles. A textured ivy league - a slightly longer version of the crew cut with a gentle side part and enough length to show texture - reduces the visual contrast that a skin fade creates against a strong jaw. A longer, messier classic scissor cut that reaches the temples without being overly styled is the alternative. Avoid high-contrast skin fades that go up to the temples - the abrupt transition from bare skin to hair can sharpen the impression of an already angular jaw.",
      works: [
        "Soft textured ivy league",
        "Longer messy scissor cut",
        "Tapered (not faded) sides",
        "Light side part with natural fall",
      ],
      avoid: [
        "High-contrast skin fades at temple",
        "Buzz cuts with sharp outlines",
        "Very structured, geometric crops",
      ],
    },
    textureNote:
      "Curly and coily hair naturally softens strong jaw lines due to the organic shape of curl clusters - ask for long layers to encourage downward flow without losing curl integrity. Straight, fine hair: use a light texturizing spray to prevent layers from lying flat and re-creating a blunt edge.",
    quickRef: {
      women: "Wispy shag · Point-cut layers",
      men: "Soft ivy league · Scissor cut",
      principle: "Soften angles with texture",
    },
  },
  {
    id: "heart",
    label: "Heart Face",
    shortDescription:
      "A heart-shaped face is wider at the forehead and temples and narrows progressively toward a pointed or narrow chin.",
    howToIdentify:
      "Forehead is the widest part. Chin is noticeably narrower than forehead. Jaw tapers to a soft or pointed chin. Cheekbones are high and prominent.",
    stylingObjective:
      "Add visual weight near the jaw to create a more proportional balance between the upper and lower face.",
    women: {
      headline: "Chin-Length Bob with Side-Swept Bangs",
      description:
        "A chin-length bob adds width and volume exactly where a heart face needs it - at the jaw. When the ends of the bob sit at or just below chin level, they create a visual bracket around the lower third of the face, drawing attention downward from a wider forehead. Side-swept bangs complement this cut by breaking up the forehead's width on one side rather than covering it entirely. A full, heavy fringe sitting across a wide forehead can emphasize its proportions - side-swept bangs redirect the eye instead.",
      works: [
        "Chin-length bob with volume at ends",
        "Side-swept bangs",
        "Lob with soft volume below cheekbone",
        "Side-parted long hair with mid-length layers",
        "Waves starting below the ear",
      ],
      avoid: [
        "Volume at the crown and temples",
        "Heavy straight-across fringe",
        "Pixie cuts without jaw-level detail",
      ],
    },
    men: {
      headline: "Mid-Length Textured Flow or Side Part with Moderate Length",
      description:
        "Mid-length textured cuts that reach the jaw area - sometimes referred to as a flow style - work well for heart-faced men because they add softness and coverage around the narrower lower face. The extra length at the sides and bottom adds the visual width the lower face lacks, creating a more balanced overall silhouette. A classic side part with moderate length on the sides (avoiding a tight skin fade) is a more structured alternative. The key is keeping enough length through the mid-section to prevent the lower face from looking bare or narrow against a fuller upper face.",
      works: [
        "Mid-length flow / curtained style",
        "Side part with moderate side length",
        "Soft taper (not aggressive fade)",
        "Textured medium cut at ear level",
      ],
      avoid: [
        "Very short sides with heavy crown",
        "Mohawk or high-top styles",
        "Styles that add volume at the temples only",
      ],
    },
    textureNote:
      "Waves starting below the ear add jaw width naturally for all hair textures. Straight hair: a curl iron at the ends adds the jaw-level volume that balances a heart-shaped face. Curly or wavy hair is well-suited here - let natural volume sit at the jaw rather than the roots.",
    quickRef: {
      women: "Chin bob · Side-swept bangs",
      men: "Mid-length flow · Moderate side length",
      principle: "Add width near the jaw",
    },
  },
  {
    id: "diamond",
    label: "Diamond Face",
    shortDescription:
      "A diamond face is widest at the cheekbones, with a narrower forehead and jaw - creating a pointed, angular outline.",
    howToIdentify:
      "Cheekbones are the widest point. Forehead and jaw are both narrower than cheekbones. Chin is often pointed or sharp. Face is longer than wide.",
    stylingObjective:
      "Create width at the forehead and jaw to balance prominent, wide cheekbones.",
    women: {
      headline: "Textured Fringe or Chin-Length Shag",
      description:
        "Textured fringe - wispy rather than blunt - adds width at the forehead, which balances the prominent cheekbone width of a diamond face. A chin-length shag or lob with layers that fan outward at cheekbone level draws attention to the broadest part of the face in a flattering way. Avoid very sleek, center-parted styles that emphasize the narrowness of the forehead and chin.",
      works: [
        "Textured fringe (wispy, not blunt)",
        "Chin-length shag or lob",
        "Side-swept bangs over narrow forehead",
        "Layers that widen at cheekbone level",
      ],
      avoid: [
        "Sleek center parts with no fringe",
        "Volume only at cheekbones",
        "Very narrow, column-like styles",
      ],
    },
    men: {
      headline: "Forward-Brushed Textured Style with Temple Width",
      description:
        "Men with diamond faces benefit from medium-length cuts that maintain width at the temples and sides rather than tapering aggressively. A swept fringe or forward-brushed style that reaches the forehead adds horizontal weight at the top of the face. Keeping the sides longer with a soft taper prevents additional length from being added through a very high or voluminous crown style.",
      works: [
        "Swept fringe over narrow forehead",
        "Forward-brushed textured style",
        "Medium length with temple width",
        "Soft taper preserving side length",
      ],
      avoid: [
        "Aggressive high fades at temple",
        "Very tall crown volume with narrow sides",
      ],
    },
    textureNote:
      "Wavy hair works especially well for diamond faces - natural volume at the forehead and sides adds the width needed without a specific cut technique. Straight hair: ask for a razored fringe and wispy ends to avoid a blunt line that emphasizes narrow proportions.",
    quickRef: {
      women: "Textured fringe · Chin shag",
      men: "Forward-brushed fringe · Medium sides",
      principle: "Widen forehead and jaw",
    },
  },
  {
    id: "oblong",
    label: "Oblong / Rectangle Face",
    shortDescription:
      "An oblong or rectangle face is noticeably longer than wide, with relatively consistent widths from forehead to jaw.",
    howToIdentify:
      "Face length is significantly greater than width. Forehead, cheekbones, and jaw are all roughly similar in width. Jawline may be slightly angular (rectangle) or soft (oblong).",
    stylingObjective:
      "Introduce horizontal width through layering, bangs, and styles that reduce the apparent length of the face.",
    women: {
      headline: "Side-Swept Bangs with Layers at Cheek and Shoulder",
      description:
        "Oblong faces benefit from cuts with horizontal emphasis. Side-swept or blunt-cut bangs reduce the visible forehead length - which is the primary driver of face elongation. Layers that add width at the cheeks and temples and styles that do not add excessive length at the top of the head all help. Avoid very long, straight styles without layers, as they can further elongate an already long face.",
      works: [
        "Side-swept or blunt bangs",
        "Layers at cheek and shoulder level",
        "Wavy or curly styles with width",
        "Medium-length bobs with volume at sides",
        "Textured styles with horizontal movement",
      ],
      avoid: [
        "Very long, straight styles without layers",
        "Center parts with no bangs",
        "Tall, narrow styles that add vertical height",
      ],
    },
    men: {
      headline: "Medium Sides with Soft Taper",
      description:
        "For oblong-faced men, keeping the sides longer with a soft taper prevents additional length from being added through a very high or voluminous crown style. A side-swept style with moderate volume distributed across the width of the top - rather than concentrated at the very crown - helps reduce the apparent face length. Avoid crew cuts or flat tops that add visible height.",
      works: [
        "Medium sides with soft taper",
        "Side-swept with moderate width",
        "Textured fringe to reduce forehead length",
        "Styles with horizontal weight distribution",
      ],
      avoid: [
        "Tall styles at crown adding height",
        "Crew cuts emphasizing length",
        "Very short sides making face look taller",
      ],
    },
    textureNote:
      "Curly or wavy hair is naturally beneficial for oblong faces - the horizontal spread of curl volume adds width. Straight hair: blunt-cut bangs are particularly effective; ask your stylist to cut them with a slight angle for a more modern look.",
    quickRef: {
      women: "Side-swept bangs · Wavy layers",
      men: "Medium sides · Soft taper",
      principle: "Add horizontal width",
    },
  },
];

// ─────────────────────────────────────────────────────────
// Quick identification steps (Section 1)
// ─────────────────────────────────────────────────────────

export const identificationSteps = [
  {
    n: 1,
    title: "Pull your hair back and use a mirror",
    body: "Tie or clip all your hair away from your face so your full hairline, cheekbones, and jaw are visible. Use a well-lit mirror. If you wear glasses, remove them.",
  },
  {
    n: 2,
    title: "Identify the widest point",
    body: "Look at three horizontal lines: your forehead (temple to temple), your cheekbones (widest point just below your eyes), and your jaw (just below the ears). Note which is widest - this is the single most useful data point.",
  },
  {
    n: 3,
    title: "Compare length to width and note your jaw",
    body: "Is your face longer than it is wide, or roughly equal? Is your jaw angular and sharp, softly rounded, or pointed toward the chin? These two observations combined with step two will place you in one of the primary face shape categories.",
  },
];

// ─────────────────────────────────────────────────────────
// FAQ data
// ─────────────────────────────────────────────────────────

export const haircutFaqs: HaircutFaq[] = [
  {
    q: "How do I find my face shape before choosing a haircut?",
    a: "Pull your hair back and compare the widths of your forehead, cheekbones, and jaw in a mirror. Note whether your face is longer than it is wide or roughly equal, and observe whether your jaw is angular, rounded, or pointed. For a more reliable result, the Calqulate face shape calculator walks you through four quick measurements and gives you a specific answer at calqulate.net/health/face-shape-calculator.",
  },
  {
    q: "What haircut works best for a round face in 2026?",
    a: "A collarbone-length lob with interior layers and a deep side part is one of the stronger options for round faces in 2026. The lob's length keeps the silhouette vertical rather than wide, interior layers add movement without bulk, and a side part breaks up symmetry. Men with round faces generally benefit from a textured quiff - height at the crown offsets facial width.",
  },
  {
    q: "Can oval faces really wear any haircut?",
    a: "Oval faces are considered the most adaptable shape because their proportions are already balanced. Most styles work - from blunt bobs and curtain bangs to long layers and crops. The main consideration for oval faces in 2026 is to maintain natural movement and avoid over-styling, rather than picking a specific shape-correcting cut.",
  },
  {
    q: "What should I avoid if I have a square face shape?",
    a: "Avoid blunt-cut bobs that end exactly at the jaw - the straight line at jaw level frames and draws attention to an already angular jaw. High-contrast skin fades that go up to the temple have a similar effect for men. The 2026 direction for square faces is soft, wispy texture rather than precision-cut geometric shapes.",
  },
  {
    q: "How does hair texture affect these haircut recommendations?",
    a: "Texture is the second most important factor after face shape. Curly and coily hair adds its own volume and can soften angles or add width naturally. Straight and fine hair may need additional layering, texturizing products, or blow-dry techniques to achieve the same effect. Each section in this guide includes specific texture notes for the recommended cuts.",
  },
  {
    q: "What should I tell my stylist to get the right cut?",
    a: "Screenshot the quick reference table from this page and show it to your stylist. Be specific about technique: say 'interior layers' rather than just 'layers,' or 'soft taper' rather than 'fade.' Knowing the distinction between these requests helps your stylist understand the exact outcome you are looking for.",
  },
];

// ─────────────────────────────────────────────────────────
// TL;DR bullets
// ─────────────────────────────────────────────────────────

export const tldrBullets = [
  {
    label: "The Problem",
    text: "Trendy haircuts don't always suit your facial structure - the wrong cut can work against your natural proportions rather than with them.",
  },
  {
    label: "The Solution",
    text: "A curated breakdown of 2026 hair trends paired with six distinct face shapes - Round, Oval, Square, Heart, Diamond, and Oblong - for both men and women.",
  },
  {
    label: "Key Features",
    text: "Tailored style recommendations, professional styling tips, and infographic visual layouts to bring to your next salon or barber appointment.",
  },
  {
    label: "Texture Guidance",
    text: "Each section includes notes on adapting cuts to fine, thick, wavy, curly, or coily hair - because texture determines the final result as much as the cut itself.",
  },
  {
    label: "Start Here",
    text: "Use the Calqulate face shape calculator to confirm your shape before scrolling to your section.",
    href: "https://calqulate.net/health/face-shape-calculator",
    linkText: "calqulate.net/health/face-shape-calculator",
  },
];
