# Calqulate Blog #5 — The Mathematics of Beauty (Facial Harmony Calculator)

Fifth blog in the cluster. Same architecture as Blog #1–#4. Green brand theme
(emerald + lime). The facial harmony calculator is **embedded directly inline**
in the article, and is the page's USP.

Target route → `/blog/mathematics-of-beauty-facial-harmony-calculator`
Calculator page route → `/tools/facial-harmony-calculator`

---

## What makes this calculator different

| Feature | Where |
| --- | --- |
| **Photo mode** — upload a face photo, tap landmark points, angles computed by real trigonometry | `FacialHarmonyCalculator.tsx` |
| **Manual mode** — type angles from a digital protractor | `FacialHarmonyCalculator.tsx` |
| **6 measurements** — gonial, nasolabial, canthal tilt, nasofrontal, mentolabial, golden ratio | `facial-harmony-data.ts` |
| **Sex-aware ranges** — nasolabial range adjusts for male/female/neutral | `facial-harmony-data.ts` |
| **Harmony score** — 0–100 ring with per-feature bars vs. balanced ranges | `FacialHarmonyCalculator.tsx` |
| **Saved history (USP)** — every result stored in `localStorage`, dated | `FacialHarmonyCalculator.tsx` |
| **Compare two dates** — side-by-side table with up/down deltas | `FacialHarmonyCalculator.tsx` |
| **100% private** — image and data never leave the browser | by design |
| Mobile responsive, green theme | all components |

---

## File paths (copy into your Next.js project)

| File from this delivery | Path in your project |
| --- | --- |
| `facial-harmony-data.ts` | `lib/blog/facial-harmony-data.ts` |
| `FacialHarmonyCalculator.tsx` | `components/calculators/FacialHarmonyCalculator.tsx` |
| `FacialHarmonyRadarChart.tsx` | `components/charts/FacialHarmonyRadarChart.tsx` |
| `FacialHarmonyBlog.tsx` | `components/blog/FacialHarmonyBlog.tsx` |
| `page.tsx` | `app/blog/[slug]/page.tsx` *(adds the new case; replaces existing)* |
| `blogs-data.snippet.ts` | paste the object inside `lib/blog/blogs-data.ts` |

---

## Calculator page (optional but recommended)

The blog imports a reusable component, so you can also drop it on its own page.
Create `app/tools/facial-harmony-calculator/page.tsx`:

```tsx
import FacialHarmonyCalculator from "@/components/calculators/FacialHarmonyCalculator";

export const metadata = {
  title: "Facial Harmony Calculator | Calqulate",
  description:
    "Free facial harmony calculator. Upload a photo or enter angles to score your gonial, nasolabial, canthal, nasofrontal, mentolabial angles and golden ratio.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Facial Harmony Calculator</h1>
      <p className="mt-2 text-slate-600">
        Upload a photo and tap the points, or type your angles. Save and compare your
        results over time. Everything stays in your browser.
      </p>
      <div className="mt-8">
        <FacialHarmonyCalculator />
      </div>
    </main>
  );
}
```

---

## Image asset required

Add one hero image:

```
public/images/blogs/facial-harmony-cover.png
```

Recommended: a side-profile face with angle overlays on a clean green background,
4:3 aspect ratio (~1200×900px).

---

## Dependencies

Only `recharts` (already used by Blog #1). No new packages. No PDF library needed
(this blog replaces the PDF download with the saved-history + compare feature).

---

## Test it without Next.js

Open `preview.html` (in the parent folder of this delivery) directly in any
browser. It is a standalone port of the calculator with identical math and the
same save/compare features, so you can see exactly how the widget behaves before
wiring it into the site.

---

## The math (for reference)

- **3-point angles** (gonial, nasolabial, nasofrontal, mentolabial):
  `angle at B = arccos( (BA · BC) / (|BA| × |BC|) )`
- **Canthal tilt**: signed slope of the inner-to-outer eye line vs. horizontal
  (image y grows downward, so a higher outer corner gives a positive tilt).
- **Golden ratio**: face length ÷ face width.

Points are stored normalised (0–1) and converted to aspect-correct pixel space
using the image's natural dimensions, so readings stay accurate regardless of how
the image is scaled on screen.

---

## Balanced ranges used for scoring

| Measurement | Balanced range |
| --- | --- |
| Gonial angle | 115°–130° |
| Nasolabial angle | 90°–105° (men), 100°–115° (women) |
| Canthal tilt | +2° to +8° |
| Nasofrontal angle | 115°–130° |
| Mentolabial angle | 110°–130° |
| Golden ratio | ~1.5–1.7 (centered on Phi 1.618) |

Inside the range scores 100. Outside, the score falls off linearly across a
tolerance band, then sits at 0. The overall harmony score is the average of every
measurement that has been filled in.

---

## SEO targeting

Primary: `facial harmony calculator`. Secondary: `golden ratio face calculator`,
`gonial angle`, `canthal tilt`, `nasolabial angle`, `facial symmetry`,
`how to measure facial attractiveness`. Woven into the H1, H2s, intro, the angle
deep-dive cards, and the FAQ. No stuffing.
