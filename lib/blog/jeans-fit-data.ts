// lib/blog/jeans-fit-data.ts
//
// Single source of truth for the "Best Jeans for Your Body Shape" blog.
// Used by the dashboard, comparison tables, and the PDF generator.

export type Gender = "women" | "men";

export type BodyShape =
  // women
  | "pear"
  | "apple"
  | "hourglass"
  | "rectangle"
  | "inverted-triangle"
  | "petite"
  | "curvy"
  | "tall-women"
  // men
  | "slim-men"
  | "athletic-men"
  | "broad-upper"
  | "stocky-men"
  | "tall-men"
  | "shorter-men"
  | "larger-thighs";

export type FitType =
  | "skinny"
  | "slim"
  | "straight"
  | "slim-straight"
  | "bootcut"
  | "wide-leg"
  | "relaxed"
  | "tapered"
  | "athletic"
  | "mom"
  | "flared"
  | "boyfriend";

export type Rise = "low" | "mid" | "high" | "ultra-high";

export type StyleGoal =
  | "look-taller"
  | "define-waist"
  | "balance-hips"
  | "add-curves"
  | "slim-legs"
  | "daily-comfort"
  | "office-casual"
  | "weekend"
  | "travel"
  | "plus-size-comfort";

export interface JeansCard {
  id: string;
  name: string;
  gender: Gender[];
  bodyShapes: BodyShape[];
  fit: FitType;
  rise: Rise;
  stretchLevel: "none" | "low" | "medium" | "high";
  whyItWorks: string;
  styleTip: string;
  goals: StyleGoal[];
  badge?: "best-match" | "comfort-pick" | "most-versatile";
  // Local image path — keep WebP/JPG inside /public/blog/jeans/
  // The dashboard renders a graceful placeholder if the file is missing.
  image: string;
  imageAlt: string;
}

export const jeansCards: JeansCard[] = [
  {
    id: "high-rise-straight",
    name: "High-Rise Straight Jeans",
    gender: ["women"],
    bodyShapes: ["pear", "hourglass", "curvy", "rectangle", "apple"],
    fit: "straight",
    rise: "high",
    stretchLevel: "medium",
    whyItWorks:
      "Defines the waist while giving the hips and thighs enough room to move. Creates a long, clean vertical line.",
    styleTip: "Tuck in a fitted top or pair with a cropped jacket to highlight the waistline.",
    goals: ["define-waist", "balance-hips", "office-casual", "daily-comfort"],
    badge: "most-versatile",
    image: "/blogs/jeans/high-rise-straight.jpg",
    imageAlt: "Woman wearing classic high-rise straight-leg blue jeans",
  },
  {
    id: "bootcut-classic",
    name: "Bootcut Jeans",
    gender: ["women", "men"],
    bodyShapes: ["pear", "apple", "stocky-men", "curvy", "inverted-triangle"],
    fit: "bootcut",
    rise: "high",
    stretchLevel: "medium",
    whyItWorks:
      "The subtle flare from the knee down balances wider hips and thighs, and a higher rise smooths the waist.",
    styleTip: "Wear with heeled boots or platform sneakers so the hem skims the floor.",
    goals: ["balance-hips", "look-taller", "office-casual"],
    image: "/blogs/jeans/bootcut.jpg",
    imageAlt: "Dark wash bootcut jeans flaring from the knee",
  },
  {
    id: "wide-leg",
    name: "Wide-Leg Jeans",
    gender: ["women"],
    bodyShapes: ["pear", "rectangle", "inverted-triangle", "tall-women"],
    fit: "wide-leg",
    rise: "high",
    stretchLevel: "low",
    whyItWorks:
      "A wider leg opening hides hip and thigh fullness, while the high rise nips in at the waist for shape.",
    styleTip: "Pair with a tucked-in tee or fitted knit to keep the silhouette balanced.",
    goals: ["balance-hips", "look-taller", "weekend"],
    image: "/blogs/jeans/wide-leg.jpg",
    imageAlt: "Wide-leg high-rise jeans styled with a tucked-in top",
  },
  {
    id: "skinny-high-rise",
    name: "High-Rise Skinny Jeans",
    gender: ["women"],
    bodyShapes: ["hourglass", "petite", "tall-women"],
    fit: "skinny",
    rise: "high",
    stretchLevel: "high",
    whyItWorks:
      "Hugs your natural curves through the hip and thigh and locks in at the waist — no gapping at the back.",
    styleTip: "Layer with a longer top or blazer for the office. Cuff once at the ankle for a relaxed weekend look.",
    goals: ["define-waist", "slim-legs", "daily-comfort"],
    image: "/blogs/jeans/skinny-high-rise.jpg",
    imageAlt: "High-rise stretch skinny jeans in dark indigo",
  },
  {
    id: "mom-jeans",
    name: "Mom Jeans",
    gender: ["women"],
    bodyShapes: ["rectangle", "petite", "hourglass"],
    fit: "mom",
    rise: "high",
    stretchLevel: "none",
    whyItWorks:
      "The high waistband and slightly tapered leg add visual curves at the hips and shorten the leg in a flattering way.",
    styleTip: "Try a half-tuck and a belt to mark the smallest part of your waist.",
    goals: ["add-curves", "define-waist", "weekend"],
    image: "/blogs/jeans/mom-jeans.jpg",
    imageAlt: "Classic rigid mom jeans with a half-tucked t-shirt",
  },
  {
    id: "flared",
    name: "Flared Jeans",
    gender: ["women"],
    bodyShapes: ["rectangle", "inverted-triangle", "hourglass"],
    fit: "flared",
    rise: "high",
    stretchLevel: "low",
    whyItWorks:
      "The dramatic flare from the thigh down creates curves you may not naturally have and elongates the leg.",
    styleTip: "Always pair with a slim or tucked top so the lower half is the focus.",
    goals: ["add-curves", "look-taller", "weekend"],
    image: "/blogs/jeans/flared.jpg",
    imageAlt: "Retro 70s style flared jeans in mid wash",
  },
  {
    id: "curvy-fit",
    name: "Curvy-Fit Stretch Jeans",
    gender: ["women"],
    bodyShapes: ["curvy", "pear", "hourglass", "apple"],
    fit: "straight",
    rise: "high",
    stretchLevel: "high",
    whyItWorks:
      "Built with a contoured waistband so it sits flat on a smaller waist while still fitting fuller hips and thighs.",
    styleTip: "Look for the word 'curvy' on the label — it's a fit, not a size.",
    goals: ["define-waist", "plus-size-comfort", "daily-comfort"],
    badge: "comfort-pick",
    image: "/blogs/jeans/curvy-fit.jpg",
    imageAlt: "Curvy-fit stretch jeans designed for fuller hips",
  },
  {
    id: "cropped-ankle",
    name: "Cropped Ankle Jeans",
    gender: ["women"],
    bodyShapes: ["petite"],
    fit: "slim-straight",
    rise: "high",
    stretchLevel: "medium",
    whyItWorks:
      "Ends right at or above the ankle, which keeps the leg from looking shortened by extra fabric pooling on top of the shoe.",
    styleTip: "Show a sliver of ankle and pair with low-vamp flats or pointed mules to look taller.",
    goals: ["look-taller", "office-casual"],
    image: "/blogs/jeans/cropped-ankle.jpg",
    imageAlt: "Cropped ankle jeans with pointed flats",
  },
  {
    id: "slim-fit-men",
    name: "Slim-Fit Jeans",
    gender: ["men"],
    bodyShapes: ["slim-men", "shorter-men"],
    fit: "slim",
    rise: "mid",
    stretchLevel: "medium",
    whyItWorks:
      "Close to the leg without being painted on — adds shape to slimmer legs and creates a clean modern line.",
    styleTip: "Avoid extra-skinny if your legs are very thin; aim for slim, not compressed.",
    goals: ["daily-comfort", "office-casual"],
    image: "/blogs/jeans/slim-fit-men.jpg",
    imageAlt: "Men's slim-fit dark wash jeans with white sneakers",
  },
  {
    id: "athletic-tapered",
    name: "Athletic Tapered Jeans",
    gender: ["men"],
    bodyShapes: ["athletic-men", "larger-thighs", "broad-upper"],
    fit: "tapered",
    rise: "mid",
    stretchLevel: "high",
    whyItWorks:
      "Roomier through the seat and thigh, then tapered from the knee down — fits real quad and glute size without ballooning at the ankle.",
    styleTip: "Pair with low-top sneakers and a fitted tee to keep the proportions clean.",
    goals: ["daily-comfort", "weekend"],
    badge: "comfort-pick",
    image: "/blogs/jeans/athletic-tapered.jpg",
    imageAlt: "Men's athletic tapered jeans with extra room in the thigh",
  },
  {
    id: "relaxed-straight-men",
    name: "Relaxed Straight Jeans",
    gender: ["men"],
    bodyShapes: ["larger-thighs", "stocky-men", "tall-men", "broad-upper"],
    fit: "relaxed",
    rise: "mid",
    stretchLevel: "medium",
    whyItWorks:
      "Roomy through the seat, thigh, and leg opening — comfortable for big quads without looking shapeless.",
    styleTip: "Choose a darker wash to keep the look smart-casual instead of work-wear.",
    goals: ["daily-comfort", "plus-size-comfort", "travel"],
    badge: "comfort-pick",
    image: "/blogs/jeans/relaxed-straight-men.jpg",
    imageAlt: "Men's relaxed straight jeans in dark indigo",
  },
  {
    id: "straight-leg-men",
    name: "Straight-Leg Jeans (Men)",
    gender: ["men"],
    bodyShapes: ["stocky-men", "tall-men", "athletic-men", "shorter-men", "broad-upper"],
    fit: "straight",
    rise: "mid",
    stretchLevel: "low",
    whyItWorks:
      "Cuts a single straight line from hip to hem — works on almost every body type and never looks dated.",
    styleTip: "If you're shorter, choose a 30 or 32 inch inseam to avoid stacking at the ankle.",
    goals: ["daily-comfort", "office-casual", "weekend"],
    badge: "most-versatile",
    image: "/blogs/jeans/straight-leg-men.jpg",
    imageAlt: "Classic straight-leg men's jeans in mid wash",
  },
  {
    id: "slim-straight-men",
    name: "Slim Straight Jeans (Men)",
    gender: ["men"],
    bodyShapes: ["slim-men", "shorter-men", "athletic-men"],
    fit: "slim-straight",
    rise: "mid",
    stretchLevel: "medium",
    whyItWorks:
      "Slim through the thigh, straight from the knee — a modern alternative to skinny that flatters most builds.",
    styleTip: "Skip the ankle stacking. A clean break at the shoe makes you look taller.",
    goals: ["look-taller", "office-casual", "daily-comfort"],
    image: "/blogs/jeans/slim-straight-men.jpg",
    imageAlt: "Slim straight jeans for men with a clean ankle break",
  },
];

export interface BodyShapeGuide {
  id: BodyShape;
  gender: Gender;
  label: string;
  description: string;
  features: string[];
  recommendedJeans: string[];
  avoid: string[];
  styleTip: string;
}

export const bodyShapeGuides: BodyShapeGuide[] = [
  {
    id: "pear",
    gender: "women",
    label: "Pear Shape",
    description:
      "Hips and thighs are wider than the shoulders and bust, with a defined waist.",
    features: ["Wider hips and thighs", "Narrower shoulders and bust", "Defined waist"],
    recommendedJeans: [
      "High-rise straight jeans",
      "Bootcut jeans",
      "Wide-leg jeans",
      "Dark wash denim",
      "Stretch denim for thigh comfort",
    ],
    avoid: [
      "Very low-rise jeans that emphasize the hip dip",
      "Heavy fading or whiskering on the thighs",
      "Tight skinny jeans that pinch at the thigh",
    ],
    styleTip:
      "Draw the eye upward with a fitted top, statement earrings, or a tucked-in shirt. Dark indigo washes on the bottom slim the hips visually.",
  },
  {
    id: "apple",
    gender: "women",
    label: "Apple Shape",
    description:
      "Weight sits around the midsection, with slimmer legs and arms and a less defined waist.",
    features: ["Fuller midsection", "Slimmer legs and arms", "Less defined waist"],
    recommendedJeans: [
      "Mid-rise or high-rise straight jeans",
      "Relaxed slim jeans",
      "Bootcut jeans",
      "Jeans with a tummy-control panel",
    ],
    avoid: ["Very low-rise jeans", "Stiff non-stretch waistbands that dig in"],
    styleTip:
      "Soft, stretch waistbands sit better. Lengthen the torso with a V-neck top and avoid tucking unless the waistband is smooth.",
  },
  {
    id: "hourglass",
    gender: "women",
    label: "Hourglass Figure",
    description:
      "Shoulders and hips are roughly the same width, with a clearly defined waist.",
    features: ["Balanced shoulders and hips", "Narrow defined waist", "Curvy bust and seat"],
    recommendedJeans: [
      "High-rise skinny jeans",
      "Straight-leg jeans",
      "Bootcut jeans",
      "Curvy-fit jeans",
    ],
    avoid: ["Jeans with a straight waistband that gaps at the back"],
    styleTip:
      "Always check the waist gap. Curvy-fit lines from American Eagle, Levi's, or Madewell are built for an hourglass figure.",
  },
  {
    id: "rectangle",
    gender: "women",
    label: "Rectangle Shape",
    description:
      "Shoulders, waist, and hips are similar in width with little curve at the waist.",
    features: ["Straight up-and-down silhouette", "Subtle waist", "Athletic frame"],
    recommendedJeans: [
      "Mom jeans",
      "Wide-leg jeans",
      "Flared jeans",
      "High-rise jeans",
      "Jeans with back-pocket details or contrast stitching",
    ],
    avoid: ["Ultra-low-rise jeans that erase the waist further"],
    styleTip:
      "You can add curves visually. Look for jeans with seaming, contrast pockets, or a slight flare to suggest a curvier line.",
  },
  {
    id: "inverted-triangle",
    gender: "women",
    label: "Inverted Triangle",
    description:
      "Shoulders or bust are broader than the hips, often with an athletic upper body.",
    features: ["Broad shoulders", "Narrow hips", "Less defined waist"],
    recommendedJeans: [
      "Wide-leg jeans",
      "Flared jeans",
      "Bootcut jeans",
      "Relaxed straight jeans",
    ],
    avoid: ["Skinny jeans that exaggerate the top-heavy look"],
    styleTip:
      "Volume on the bottom half balances broader shoulders. Pair wide-leg jeans with a fitted top.",
  },
  {
    id: "petite",
    gender: "women",
    label: "Petite",
    description:
      "Generally 5'3\" / 160 cm or shorter, regardless of body shape.",
    features: ["Shorter inseam needs", "Smaller frame", "Proportions matter more than size"],
    recommendedJeans: [
      "High-rise straight jeans",
      "Slim straight jeans",
      "Cropped ankle jeans",
      "Petite-labeled lines (Old Navy Petite, Gap Petite, Madewell Petite)",
    ],
    avoid: ["Overly baggy jeans", "Wide-legs that puddle at the floor"],
    styleTip:
      "Length is everything. A clean ankle break or a deliberate crop makes you look taller — extra fabric does the opposite.",
  },
  {
    id: "curvy",
    gender: "women",
    label: "Curvy",
    description:
      "Fuller hips, thighs, and seat with a defined waist — often a 12+ inch waist-to-hip difference.",
    features: ["Hip-to-waist ratio is dramatic", "Fuller thighs", "Sometimes a fuller bust"],
    recommendedJeans: [
      "Curvy-fit jeans",
      "High-rise stretch denim",
      "Bootcut jeans",
      "Straight jeans with at least 2% elastane",
    ],
    avoid: [
      "Stiff 100% cotton denim with no give",
      "Straight waistbands that gap when you sit",
    ],
    styleTip:
      "The waist gap is the #1 complaint for curvy bodies. A contoured waistband or a curvy-fit line solves it instantly.",
  },
  {
    id: "tall-women",
    gender: "women",
    label: "Tall Women",
    description:
      "Generally 5'9\" / 175 cm and taller — fit problems are usually about length and inseam.",
    features: ["Long inseam", "Standard jeans often run short"],
    recommendedJeans: [
      "Tall-labeled jeans",
      "Wide-leg or flared jeans (extra length sits well)",
      "Straight-leg in 34+ inch inseam",
    ],
    avoid: ["Standard inseams that hit awkwardly at the ankle"],
    styleTip:
      "Brands like Gap, Old Navy, American Eagle, Levi's, and Madewell publish tall sizes. Filter for 'Tall' or 32+ inch inseam.",
  },
  {
    id: "slim-men",
    gender: "men",
    label: "Slim Men",
    description: "Lean build, narrower shoulders, slim legs.",
    features: ["Lean frame", "Slim thighs and calves", "Lower body mass"],
    recommendedJeans: [
      "Slim-fit jeans",
      "Tapered jeans",
      "Slim straight jeans",
    ],
    avoid: ["Very baggy jeans that swallow the frame", "Extreme skinny if legs look too thin"],
    styleTip:
      "Slim, not skinny. A small amount of stretch (2–3%) keeps the leg looking natural rather than vacuum-sealed.",
  },
  {
    id: "athletic-men",
    gender: "men",
    label: "Athletic Build",
    description:
      "Developed quads and glutes from training, with a relatively trimmer waist.",
    features: ["Bigger quads", "Defined glutes", "Narrower waist than thigh"],
    recommendedJeans: [
      "Athletic-fit jeans",
      "Tapered jeans with stretch",
      "Relaxed straight jeans",
    ],
    avoid: ["Skinny jeans that bind at the thigh"],
    styleTip:
      "Brands like American Eagle (AE77), Lululemon ABC, and Mott & Bow now sell true athletic-fit jeans designed for big legs.",
  },
  {
    id: "broad-upper",
    gender: "men",
    label: "Broad Upper Body",
    description: "Wider shoulders, larger chest, often a developed back.",
    features: ["Broad shoulders", "Fuller chest", "Slimmer hips relative to upper body"],
    recommendedJeans: ["Straight-leg jeans", "Relaxed fit", "Tapered with stretch"],
    avoid: ["Skinny jeans that make the upper body look heavier"],
    styleTip: "Keep the lower half clean and slightly structured to balance broader shoulders.",
  },
  {
    id: "stocky-men",
    gender: "men",
    label: "Stocky Build",
    description: "Shorter and solidly built, often muscular through the chest and core.",
    features: ["Compact frame", "Solid midsection", "Shorter legs proportionally"],
    recommendedJeans: [
      "Straight-leg jeans",
      "Relaxed straight jeans",
      "Dark wash denim",
      "Mid-rise jeans",
    ],
    avoid: ["Bootcut and wide-leg, which can shorten the leg visually"],
    styleTip:
      "A dark wash with a clean straight leg lengthens the body. Skip cuffs that visually chop your height.",
  },
  {
    id: "tall-men",
    gender: "men",
    label: "Tall Men",
    description: "Generally 6'2\" / 188 cm or taller.",
    features: ["Long inseam", "Off-the-rack jeans often run short"],
    recommendedJeans: [
      "Straight fit jeans in long inseam",
      "Relaxed fit jeans",
      "Slim straight in 34–36 inch inseam",
    ],
    avoid: ["Cropped or ankle-length jeans unless styled deliberately"],
    styleTip:
      "Levi's, Gap, Wrangler, and Lee all publish 34+ inch inseams. Always check the inseam, not just the waist size.",
  },
  {
    id: "shorter-men",
    gender: "men",
    label: "Shorter Men",
    description: "Generally 5'7\" / 170 cm and shorter.",
    features: ["Shorter inseam needs", "Stacking at the ankle becomes obvious"],
    recommendedJeans: [
      "Slim straight jeans",
      "Tapered jeans",
      "Mid-rise jeans",
      "Inseam 28–30 inches",
    ],
    avoid: ["Wide-leg and bootcut with too much break at the shoe"],
    styleTip:
      "Cleaner vertical lines make you look taller. Avoid extra fabric piling on top of the shoe.",
  },
  {
    id: "larger-thighs",
    gender: "men",
    label: "Men with Larger Thighs",
    description:
      "Athletic, naturally muscular, or simply a fuller build through the seat and thigh.",
    features: ["Bigger quads and glutes", "Smaller waist relative to thigh", "Skinny jeans bind"],
    recommendedJeans: [
      "Relaxed fit jeans",
      "Athletic fit jeans",
      "Straight fit jeans with 2%+ stretch",
      "Tapered with comfort stretch",
    ],
    avoid: ["Skinny fit", "Rigid 100% cotton slim jeans"],
    styleTip:
      "Look for the words 'athletic', 'curve', or 'comfort stretch' on the label — these are cut wider through the seat and thigh.",
  },
];

export interface JeansStyleExplainer {
  name: string;
  bestFor: string;
  bodyShapes: string;
  styleTip: string;
}

export const jeansStyles: JeansStyleExplainer[] = [
  {
    name: "Skinny Jeans",
    bestFor: "Showing off legs and creating a slim line.",
    bodyShapes: "Hourglass, petite, slim men.",
    styleTip: "Look for 1–3% elastane so they stretch with you and don't bag out at the knee.",
  },
  {
    name: "Slim-Fit Jeans",
    bestFor: "A close-but-not-tight leg with room to move.",
    bodyShapes: "Slim men, athletic men with stretch, hourglass.",
    styleTip: "Best office-friendly modern fit. Pair with a button-down or knit polo.",
  },
  {
    name: "Straight-Leg Jeans",
    bestFor: "Almost everyone — the safest, most timeless cut.",
    bodyShapes: "All body shapes.",
    styleTip: "If you only own one pair of jeans, make it a mid-blue straight-leg.",
  },
  {
    name: "Bootcut Jeans",
    bestFor: "Balancing wider hips or thighs.",
    bodyShapes: "Pear, apple, stocky men.",
    styleTip: "The flare should clear the boot but not drag on the floor.",
  },
  {
    name: "Flared Jeans",
    bestFor: "Adding curves and length to a straight figure.",
    bodyShapes: "Rectangle, inverted triangle.",
    styleTip: "Pair with a tucked top to keep the silhouette balanced.",
  },
  {
    name: "Wide-Leg Jeans",
    bestFor: "Hiding hip and thigh fullness, adding length.",
    bodyShapes: "Pear, rectangle, tall women.",
    styleTip: "Volume on the bottom requires a slim or fitted top to stay flattering.",
  },
  {
    name: "Mom Jeans",
    bestFor: "Adding visual curves with a high waist and tapered leg.",
    bodyShapes: "Rectangle, hourglass, petite.",
    styleTip: "Tuck in a soft tee and add a belt for the classic look.",
  },
  {
    name: "Boyfriend Jeans",
    bestFor: "Relaxed weekend wear.",
    bodyShapes: "All shapes — but watch the rise on petites.",
    styleTip: "Cuff once at the ankle for shape, and pair with a fitted top.",
  },
  {
    name: "Relaxed-Fit Jeans",
    bestFor: "Comfort, larger thighs, daily wear.",
    bodyShapes: "Larger thighs, stocky men, tall men.",
    styleTip: "Dark wash relaxed jeans still look smart-casual.",
  },
  {
    name: "Athletic-Fit Jeans",
    bestFor: "Big quads and a smaller waist.",
    bodyShapes: "Athletic men, larger thighs.",
    styleTip: "A modern alternative to skinny for anyone who lifts.",
  },
  {
    name: "Tapered Jeans",
    bestFor: "Roomy at the top, slim at the ankle.",
    bodyShapes: "Athletic men, shorter men, larger thighs.",
    styleTip: "Pairs perfectly with low-top sneakers.",
  },
];

export const goalToFit: Record<StyleGoal, string> = {
  "look-taller": "Slim straight, cropped ankle, or high-rise straight",
  "define-waist": "High-rise straight, mom jeans, curvy-fit",
  "balance-hips": "Bootcut, wide-leg, or flared",
  "add-curves": "Mom jeans, flared, or wide-leg with a fitted top",
  "slim-legs": "High-rise skinny or slim straight",
  "daily-comfort": "Relaxed straight, athletic tapered, stretch straight",
  "office-casual": "Slim-fit or straight-leg in dark wash",
  weekend: "Boyfriend, mom jeans, or relaxed straight",
  travel: "Relaxed or straight in stretch denim",
  "plus-size-comfort": "Curvy-fit, relaxed straight with stretch",
};

export const faqs = [
  {
    q: "What jeans look good on every body type?",
    a: "Mid-blue, mid-rise to high-rise straight-leg jeans are the most universally flattering. They skim the hip without clinging, fall in a clean vertical line, and work for both men and women across body shapes — pear, apple, hourglass, rectangle, athletic, or stocky.",
  },
  {
    q: "Which jeans are best for curvy women?",
    a: "Curvy-fit jeans with a contoured waistband and at least 2% elastane are the best choice for curvy women. They prevent the back-waist gap that standard jeans leave, fit fuller hips and thighs, and still nip in at the smaller waist. High-rise straight and bootcut styles are the most flattering cuts.",
  },
  {
    q: "Which jeans are best for men with big thighs?",
    a: "Men with bigger thighs should look for athletic fit, relaxed fit, or straight fit jeans with 2% or more stretch. These are cut wider through the seat and thigh and taper down cleanly — unlike slim or skinny jeans, which bind at the quad.",
  },
  {
    q: "Are straight-leg jeans flattering?",
    a: "Yes. Straight-leg jeans are the most universally flattering cut for both men and women. They create a long, clean vertical line, work with any body shape, and never look dated. They are the safest first jeans purchase if you are unsure.",
  },
  {
    q: "Should I choose high-rise or mid-rise jeans?",
    a: "High-rise jeans are best for women who want to define the waist and smooth the tummy. Mid-rise is the most comfortable everyday fit for men and works for women who don't like a tight waistband. Low-rise is trend-driven and less forgiving for most body types.",
  },
  {
    q: "What jeans make you look taller?",
    a: "To look taller, choose a high-rise straight or slim-straight jean with a clean ankle break (no stacking). A long unbroken vertical line — top, bottom, and shoes in similar tones — adds visual height. Cropped ankle jeans with pointed shoes also work well for petite frames.",
  },
  {
    q: "Are skinny jeans still in style?",
    a: "Skinny jeans are no longer the dominant trend, but they remain a wardrobe staple. They are still flattering for hourglass and petite women, and useful for men with slim legs. Straight, wide-leg, and bootcut have taken over as the trending cuts in 2025–2026.",
  },
  {
    q: "How do I know if jeans fit correctly?",
    a: "Well-fitting jeans pass three tests: the sitting test (no pinch or gap at the back waist), the walking test (no pulling at the thigh), and the pocket test (back pockets sit on, not below, the seat). The waistband should be snug enough that you don't need a belt to keep them up.",
  },
];
