// lib/blog/face-shape-data.ts
//
// Single source of truth for the "Find Your Face Shape" blog.
// Used by the calculator/detector, the comparison tables, and the PDF lookbook.

export type FaceShape =
  | "oval"
  | "round"
  | "square"
  | "heart"
  | "diamond"
  | "oblong"
  | "rectangle"
  | "triangle";

export interface FaceShapeGuide {
  id: FaceShape;
  label: string;
  shortDescription: string;
  howToIdentify: string;
  features: string[];
  bestGlasses: string[];
  bestHairstyles: string[];
  bestBeard: string[]; // helpful for men's intent
  commonMistake: string;
  styleTip: string;
}

export const faceShapeGuides: FaceShapeGuide[] = [
  {
    id: "oval",
    label: "Oval Face Shape",
    shortDescription:
      "A balanced face that is a bit longer than it is wide, with a softly rounded jaw and slightly wider cheekbones than forehead and chin.",
    howToIdentify:
      "Your face length is about 1.5× your face width. Your forehead is slightly wider than your jaw, and your jawline is softly rounded — not sharp or pointed.",
    features: [
      "Face length is longer than width",
      "Softly rounded jawline",
      "Forehead slightly wider than chin",
      "Cheekbones are the widest part",
    ],
    bestGlasses: [
      "Almost every frame style works",
      "Square or geometric frames add a little structure",
      "Aviators and wayfarers look balanced",
    ],
    bestHairstyles: [
      "Long layers, bobs, and lobs",
      "Side parts, middle parts — both work",
      "Curtain bangs or no bangs at all",
    ],
    bestBeard: [
      "Almost any beard style suits an oval face",
      "Short stubble keeps proportions clean",
      "Full beards add masculinity without overwhelming",
    ],
    commonMistake:
      "Choosing very oversized frames or heavy hairstyles that hide your naturally balanced proportions.",
    styleTip:
      "Oval is considered the most versatile face shape — feel free to experiment with trends since most styles work in your favor.",
  },
  {
    id: "round",
    label: "Round Face Shape",
    shortDescription:
      "A face where length and width are about equal, with soft curves at the cheeks, jawline, and chin.",
    howToIdentify:
      "Your face length and width are nearly the same. Your jaw is soft and curved (not sharp), and your cheeks are full. There are no strong angles.",
    features: [
      "Face length and width are similar",
      "Soft, rounded jawline",
      "Full cheeks",
      "Wider, soft forehead",
    ],
    bestGlasses: [
      "Angular or rectangular frames add definition",
      "Square wayfarers and browline frames work well",
      "Cat-eye frames lift the cheekbones",
    ],
    bestHairstyles: [
      "Volume at the crown adds length",
      "Layers and long side-swept bangs",
      "Long bobs and styles that fall past the jaw",
    ],
    bestBeard: [
      "Goatee or extended goatee elongates the face",
      "Beard kept fuller at the chin, shorter on the sides",
      "Avoid round cheek beards",
    ],
    commonMistake:
      "Choosing round glasses, chin-length blunt bobs, or styles with extra volume at the sides — all add more roundness.",
    styleTip:
      "Always add a vertical line: a center part, taller hairstyle, longer earrings, or V-neck tops will visually slim a round face.",
  },
  {
    id: "square",
    label: "Square Face Shape",
    shortDescription:
      "A strong, angular face where the forehead, cheekbones, and jawline are roughly the same width.",
    howToIdentify:
      "Your face length and width are similar. Your jaw is strong, defined, and forms a clear angle. The forehead is usually flat or straight.",
    features: [
      "Forehead, cheekbones, and jaw are similar in width",
      "Strong, angular jawline",
      "Flat or straight forehead",
      "Face length close to face width",
    ],
    bestGlasses: [
      "Round or oval frames soften sharp angles",
      "Rimless or thin-frame styles work well",
      "Cat-eye frames lift the strong jawline",
    ],
    bestHairstyles: [
      "Soft layers and waves",
      "Side-swept styles to break the jaw line",
      "Long, layered hair frames the face beautifully",
    ],
    bestBeard: [
      "Short, rounded beards soften the jaw",
      "Avoid sharp, boxy chin lines",
      "Stubble with a softly trimmed jawline",
    ],
    commonMistake:
      "Choosing sharp, boxy frames or blunt cuts that exaggerate an already strong, angular jaw.",
    styleTip:
      "Soften, don't sharpen. Curves balance a square face — round frames, soft waves, and rounded jewelry all work.",
  },
  {
    id: "heart",
    label: "Heart Face Shape",
    shortDescription:
      "A face with a wider forehead, prominent cheekbones, and a narrow, often pointed chin.",
    howToIdentify:
      "Your forehead is the widest part of your face. Your chin is narrow and sometimes pointed. Cheekbones are usually prominent.",
    features: [
      "Wider forehead",
      "Narrow, sometimes pointed chin",
      "Defined cheekbones",
      "Face tapers from forehead to chin",
    ],
    bestGlasses: [
      "Lightweight, rimless, or thin-frame styles",
      "Bottom-heavy frames balance the wider forehead",
      "Aviators and oval frames",
    ],
    bestHairstyles: [
      "Chin-length cuts add width near the jaw",
      "Side-swept or curtain bangs soften the forehead",
      "Long layers ending below the chin",
    ],
    bestBeard: [
      "Fuller beards add width to a narrower chin",
      "Avoid clean-shaven looks that emphasize a pointed chin",
      "Boxed or rounded beards work best",
    ],
    commonMistake:
      "Slicked-back hairstyles or short pixie cuts that expose the forehead and emphasize the narrow chin.",
    styleTip:
      "Add weight below the cheekbones. Chin-length hairstyles, fuller beards, and statement collars all help balance the heart shape.",
  },
  {
    id: "diamond",
    label: "Diamond Face Shape",
    shortDescription:
      "A rare and striking face with narrow forehead and chin, and dramatically wide cheekbones.",
    howToIdentify:
      "Your cheekbones are the widest part of your face. Both your forehead and your jaw/chin are narrower than your cheekbones.",
    features: [
      "Cheekbones are the widest part",
      "Narrow forehead",
      "Narrow or pointed chin",
      "Face length usually longer than width",
    ],
    bestGlasses: [
      "Oval frames soften the angular cheekbones",
      "Cat-eye frames highlight the cheek structure",
      "Rimless frames keep the look soft",
    ],
    bestHairstyles: [
      "Side parts and chin-length bobs",
      "Layered cuts that add width at the forehead",
      "Curtain bangs balance the narrow forehead",
    ],
    bestBeard: [
      "Fuller, rounded beards add weight to the chin",
      "Avoid sharp goatees that narrow the face more",
    ],
    commonMistake:
      "Slicked-back hair or styles with no volume at the forehead — these emphasize the narrowest parts of the face.",
    styleTip:
      "Diamond faces have stunning cheekbones — work with them, not against them. Add a little softness around the forehead and chin.",
  },
  {
    id: "oblong",
    label: "Oblong Face Shape",
    shortDescription:
      "A long face shape with similar widths at the forehead, cheekbones, and jaw — but noticeably longer than it is wide.",
    howToIdentify:
      "Your face is clearly longer than it is wide. Your forehead, cheekbones, and jaw are similar in width, and your jawline is usually soft.",
    features: [
      "Face length noticeably greater than width",
      "Forehead, cheekbones, and jaw are similar widths",
      "Softly rounded chin",
      "Often a high forehead",
    ],
    bestGlasses: [
      "Oversized or tall frames add width visually",
      "Decorative side temples break the length",
      "Avoid narrow, rectangular frames",
    ],
    bestHairstyles: [
      "Bangs (blunt, curtain, or wispy) shorten the face",
      "Waves and curls add width at the sides",
      "Avoid extra height at the crown",
    ],
    bestBeard: [
      "Fuller cheek beards add width",
      "Avoid long goatees that elongate the face further",
      "Mutton chops or sideburns work well",
    ],
    commonMistake:
      "Long, straight hair with no bangs and tall hairstyles — both make the oblong face shape look even longer.",
    styleTip:
      "Add width, not height. Bangs, waves, statement earrings, and horizontal-line jewelry all balance an oblong face shape.",
  },
  {
    id: "rectangle",
    label: "Rectangle Face Shape",
    shortDescription:
      "Similar to oblong but with stronger, straighter sides and a more defined, angular jaw.",
    howToIdentify:
      "Your face is long with straight sides and a strong, clearly defined jaw. Forehead, cheekbones, and jaw are similar in width.",
    features: [
      "Face is noticeably long",
      "Strong, straight jawline",
      "Straight cheek lines",
      "Higher, often straight forehead",
    ],
    bestGlasses: [
      "Round and oval frames soften the structure",
      "Wider frames break up the face length",
      "Avoid narrow rectangular glasses",
    ],
    bestHairstyles: [
      "Layered hairstyles with waves add softness",
      "Bangs visually shorten the face",
      "Side parts work better than center parts",
    ],
    bestBeard: [
      "Short, rounded beards balance a strong jaw",
      "Avoid long, narrow goatees",
      "Stubble adds soft texture",
    ],
    commonMistake:
      "Straight, long hair with no layers and sharp angular frames — both emphasize the rectangular look.",
    styleTip:
      "Curves are your friend. Round frames, soft layers, and waves all balance the strong angles of a rectangle face shape.",
  },
  {
    id: "triangle",
    label: "Triangle Face Shape",
    shortDescription:
      "Also called pear-shaped — the jawline is wider than the forehead, with a strong lower face.",
    howToIdentify:
      "Your jawline is the widest part of your face. Your forehead is narrower than your cheekbones and jaw. Often a strong, defined jaw.",
    features: [
      "Wider jawline",
      "Narrower forehead",
      "Defined jaw",
      "Cheekbones soft or moderate",
    ],
    bestGlasses: [
      "Browline frames add width at the top",
      "Cat-eye frames balance the jaw",
      "Top-heavy or decorative top-rim frames",
    ],
    bestHairstyles: [
      "Volume near the temples and crown",
      "Side-swept bangs widen the forehead",
      "Pixie cuts and short layered styles",
    ],
    bestBeard: [
      "Keep beards short and tight to the jaw",
      "Avoid bushy beards that widen the lower face further",
      "Stubble or clean-shaven looks balance proportions",
    ],
    commonMistake:
      "Long beards or hair tucked behind the ears — both emphasize the wider jaw.",
    styleTip:
      "Add volume up top. Top-heavy frames, voluminous hair, statement earrings worn high, and structured shoulders all balance a triangle face.",
  },
];

/* ─────────────────────────────────────────────────────────
 * Quiz logic — used by the FaceShapeCalculator detector.
 * Each question maps an answer to "points" for each face shape.
 * Whichever shape collects the most points wins.
 * ─────────────────────────────────────────────────────── */

export interface QuizAnswer {
  label: string;
  scores: Partial<Record<FaceShape, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  helperText?: string;
  answers: QuizAnswer[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "length",
    question: "Compared to its width, how long does your face look?",
    helperText: "Tie your hair back, look in a mirror, and compare top of forehead to chin.",
    answers: [
      {
        label: "About the same length as width",
        scores: { round: 3, square: 3 },
      },
      {
        label: "A little longer than wide",
        scores: { oval: 3, heart: 2, diamond: 2, triangle: 1 },
      },
      {
        label: "Noticeably longer than wide",
        scores: { oblong: 3, rectangle: 3 },
      },
    ],
  },
  {
    id: "widest",
    question: "Which part of your face is the widest?",
    answers: [
      {
        label: "My forehead",
        scores: { heart: 3 },
      },
      {
        label: "My cheekbones",
        scores: { diamond: 3, oval: 2 },
      },
      {
        label: "My jawline",
        scores: { triangle: 3, square: 2 },
      },
      {
        label: "They are all similar in width",
        scores: { round: 2, square: 2, oblong: 2, rectangle: 2 },
      },
    ],
  },
  {
    id: "jawline",
    question: "How would you describe your jawline?",
    answers: [
      {
        label: "Soft and rounded — no sharp angles",
        scores: { round: 3, oval: 2, oblong: 2, heart: 1 },
      },
      {
        label: "Strong and angular — clearly defined corners",
        scores: { square: 3, rectangle: 3, triangle: 2 },
      },
      {
        label: "Narrow or pointed",
        scores: { heart: 3, diamond: 3 },
      },
    ],
  },
  {
    id: "chin",
    question: "What does your chin look like?",
    answers: [
      {
        label: "Rounded and soft",
        scores: { round: 3, oval: 2, oblong: 1 },
      },
      {
        label: "Pointed or narrow",
        scores: { heart: 3, diamond: 3 },
      },
      {
        label: "Squared off, with a flat bottom",
        scores: { square: 3, rectangle: 2, triangle: 2 },
      },
    ],
  },
  {
    id: "forehead",
    question: "How wide is your forehead compared to the rest of your face?",
    answers: [
      {
        label: "Wider than my jaw — the widest part of my face",
        scores: { heart: 3 },
      },
      {
        label: "About the same as my cheekbones and jaw",
        scores: { square: 2, rectangle: 2, oblong: 2, round: 1 },
      },
      {
        label: "Narrower than my cheekbones or jaw",
        scores: { diamond: 3, triangle: 3 },
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
 * Measurement-based detector. User enters forehead, cheekbones,
 * jaw, and face length (in cm or inches — units don't matter,
 * we only compare ratios).
 * ─────────────────────────────────────────────────────── */

export interface FaceMeasurements {
  forehead: number;
  cheekbones: number;
  jawline: number;
  faceLength: number;
}

export function detectShapeFromMeasurements(
  m: FaceMeasurements,
): { shape: FaceShape; confidence: "high" | "medium" | "low"; reason: string } {
  const { forehead, cheekbones, jawline, faceLength } = m;
  const widest = Math.max(forehead, cheekbones, jawline);

  // Helper for "approximately equal" — within 5%.
  const close = (a: number, b: number) => Math.abs(a - b) / Math.max(a, b) <= 0.05;
  // "Notably bigger" — slightly bigger, 7%+.
  const notablyBigger = (a: number, b: number) => (a - b) / b >= 0.07;
  // "Much bigger" — substantially, 13%+ (used for diamond detection).
  const muchBigger = (a: number, b: number) => (a - b) / b >= 0.13;

  const ratio = faceLength / widest;
  // Length thresholds:
  //   < 1.10 → balanced (round/square)
  //   1.10–1.30 → moderately longer (oval / heart / diamond / triangle)
  //   1.30–1.50 → oblong (soft jaw, similar widths) or oval if cheek-widest
  //   > 1.50 → rectangle
  const lengthIsVeryLong = ratio >= 1.5;
  const lengthIsLong = ratio >= 1.3;
  const lengthIsBalanced = ratio < 1.15;

  // Cheekbones widest
  if (cheekbones > forehead && cheekbones > jawline) {
    const cheekDominant =
      muchBigger(cheekbones, forehead) && muchBigger(cheekbones, jawline);
    const cheekSlightlyWider =
      notablyBigger(cheekbones, forehead) || notablyBigger(cheekbones, jawline);

    if (cheekDominant) {
      // Cheekbones substantially the widest in both directions → diamond.
      return {
        shape: "diamond",
        confidence: "high",
        reason:
          "Cheekbones are clearly the widest, while forehead and jaw are narrower — a classic diamond.",
      };
    }
    if (cheekSlightlyWider && ratio >= 1.15 && ratio < 1.5) {
      // Cheekbones gently wider with moderate length → oval.
      return {
        shape: "oval",
        confidence: "high",
        reason:
          "Cheekbones are slightly the widest, with similar forehead and jaw — classic oval proportions.",
      };
    }
    // Cheeks barely wider — treat as "all equal" by falling through.
  }

  // Forehead widest
  if (forehead > cheekbones && forehead > jawline) {
    return {
      shape: "heart",
      confidence: "high",
      reason:
        "Your forehead is the widest part, tapering to a narrower chin — a heart-shaped face.",
    };
  }

  // Jawline widest
  if (jawline > forehead && jawline > cheekbones) {
    return {
      shape: "triangle",
      confidence: "high",
      reason: "Your jawline is the widest part of your face — a triangle (or pear) shape.",
    };
  }

  // All three roughly equal
  if (close(forehead, cheekbones) && close(cheekbones, jawline)) {
    if (lengthIsVeryLong) {
      return {
        shape: "rectangle",
        confidence: "high",
        reason:
          "Forehead, cheekbones, and jaw are similar widths and your face is significantly longer than wide.",
      };
    }
    if (lengthIsLong) {
      return {
        shape: "oblong",
        confidence: "high",
        reason: "Similar widths across the face with extra length — an oblong shape.",
      };
    }
    if (lengthIsBalanced) {
      // Round vs square depends on jawline angle, which we can't measure here.
      return {
        shape: "round",
        confidence: "medium",
        reason:
          "Your face length and width are similar with even proportions. If your jaw is sharp and angular, you may be square — try the quiz for confirmation.",
      };
    }
    return {
      shape: "oval",
      confidence: "medium",
      reason: "Similar widths across the face with moderate length — closest to oval.",
    };
  }

  return {
    shape: "oval",
    confidence: "low",
    reason: "Proportions are mixed. Oval is the closest match, but the quiz may give a clearer result.",
  };
}

/* ─────────────────────────────────────────────────────────
 * FAQs
 * ─────────────────────────────────────────────────────── */

export const faqs = [
  {
    q: "How to find your face shape?",
    a: "There are three reliable ways. First, take a clear front-facing photo and compare the widths of your forehead, cheekbones, and jawline. Second, measure those four points with a soft tape. Third, use a face shape calculator like the one on this page, which guides you through the same checks step by step.",
  },
  {
    q: "How can I find my face shape online free?",
    a: "Use the free face shape calculator at the top of this page. It works in any browser, on phone or desktop, with no download or sign-up required. Answer five quick questions or enter your measurements and you'll get your likely face shape in seconds.",
  },
  {
    q: "Can I find my face shape by uploading a photo?",
    a: "Photo upload tools exist, but selfies often distort proportions — wide-angle phone lenses make foreheads look wider, and tilted angles can change the apparent face length. A guided quiz or simple measurements usually gives a more reliable result than a single uploaded photo.",
  },
  {
    q: "What is the best face shape detector?",
    a: "The best face shape detector is one that uses multiple signals — face length, cheekbone width, jawline shape, and chin shape — instead of a single photo. Our calculator combines a quick quiz with optional measurements for a clearer estimate.",
  },
  {
    q: "Is there a find your face shape filter?",
    a: "Some apps offer AR filters that overlay face shape labels. They are fun, but they can be inaccurate because they rely on lighting and angle. A measurement or quiz-based tool is usually more reliable for choosing glasses or hairstyles.",
  },
  {
    q: "How to find your face shape for glasses?",
    a: "Look at the angularity of your jaw and the relative widths of your forehead, cheekbones, and jaw. Round and oval faces suit angular frames; square and rectangle faces suit round or oval frames; heart and diamond faces suit bottom-heavy or rimless frames; triangle faces suit browline or cat-eye frames.",
  },
  {
    q: "How to find your face shape for a haircut?",
    a: "For a haircut, the goal is balance. Round and square faces benefit from layers and vertical lines. Long faces (oblong, rectangle) benefit from bangs and waves that add width. Heart and diamond faces benefit from chin-length styles. Triangle faces benefit from volume near the temples.",
  },
  {
    q: "How to find your face shape (men)?",
    a: "Men can use the same calculator. The result helps you pick a beard style, haircut, and glasses. Square and rectangle face shapes look great with short, rounded beards. Heart and diamond shapes benefit from fuller beards. Round faces benefit from longer styles like a goatee.",
  },
  {
    q: "How to find your face shape (female)?",
    a: "Women use the same method — compare forehead, cheekbones, jaw, and face length. Once you know your shape, you can match it to flattering glasses, hairstyles, contouring, and earrings. Oval faces are the most versatile; round, heart, and oblong shapes benefit from specific style choices.",
  },
  {
    q: "How to find your face shape without measurements?",
    a: "Take a clear front-facing photo with hair pulled back. Look at three things: which part of your face is widest (forehead, cheekbones, or jaw), is your face longer than wide or about the same, and is your jaw sharp or soft. Those three answers point to your shape — exactly what our quiz uses.",
  },
  {
    q: "How to find your face shape with measurements?",
    a: "Measure four things with a soft tape: forehead width (across the widest part), cheekbone width (under the eyes), jawline width (just below the ear, around the curve to the chin), and face length (hairline to chin). Compare the numbers — the widest area and the length-to-width ratio decide your shape.",
  },
  {
    q: "What is an oblong face shape?",
    a: "An oblong face shape is one that is noticeably longer than it is wide, with forehead, cheekbones, and jaw at similar widths. The jawline is usually soft and the forehead is often high. It is similar to a rectangle but with softer, less angular features.",
  },
  {
    q: "Is a face shape detector accurate?",
    a: "A face shape detector gives a likely estimate, not a strict diagnosis. Many people have a mix of two shapes. Use the result as a starting point for styling decisions, not a fixed label. Trying a few hairstyles or frames will always be the final test.",
  },
  {
    q: "Can my face shape be a mix of two shapes?",
    a: "Yes — and most people are. You might be oval-with-square or heart-with-diamond. The calculator gives you the closest single match, but feel free to read the styling tips for your second-closest shape too.",
  },
  {
    q: "What is the difference between oval and oblong face shape?",
    a: "Both are longer than wide, but oval faces have cheekbones as the widest point and softer, balanced proportions. Oblong faces are noticeably longer with forehead, cheekbones, and jaw at roughly equal widths — they look more uniform vertically.",
  },
];
