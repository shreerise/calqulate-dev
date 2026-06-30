# Calqulate Blog #6 — Ozempic Muscle Loss & "Skinny Fat"

Sixth blog in the cluster. Same architecture as Blog #1 (Female Body Shapes),
#2 (Pear Shape Dresses), #3 (RMR Calculator), #4 (Weight Loss Percentage),
and #5 (Semaglutide Dosage Chart). Green brand theme (emerald + lime), with a
**gold premium tier** for the paid Body Composition Tracker. Like Blog #5 it
**links out** to the free GLP-1 tracker and the premium tracker (per request).

Target route → `/blog/ozempic-muscle-loss-body-composition`

**Target search intent:** "Ozempic muscle loss", "how to prevent skinny fat on
Wegovy", "body composition tracking GLP-1".

**The angle:** Up to ~1/3 of weight lost on a GLP-1 can be muscle (STEP 1 found
~40% lean mass). The bathroom scale can't see this — teach the reader to track
fat vs. muscle so every pound dropped is fat, not muscle.

> ⚕️ **Medical accuracy:** the lean-mass figures were verified against the
> STEP 1 body-composition analysis (Journal of the Endocrine Society / NEJM),
> the SEMALEAN study, FDA Wegovy prescribing information, and protein/resistance
> guidance reported by Healthline and U.S. News. Sources are listed in-page
> (References section) and in `ozempic-muscle-loss-data.ts` (`references` array).

---

## 📁 File paths (copy these into your Next.js project)

| File from this delivery          | Path in your project                                            |
| -------------------------------- | --------------------------------------------------------------- |
| `ozempic-muscle-loss-data.ts`    | `lib/blog/ozempic-muscle-loss-data.ts`                          |
| `OzempicMuscleLossBlog.tsx`      | `components/blog/OzempicMuscleLossBlog.tsx`                      |
| `MuscleLossChart.tsx`            | `components/charts/MuscleLossChart.tsx`                          |
| `MuscleGuidePdfButton.tsx`       | `components/plans/MuscleGuidePdfButton.tsx`                      |
| `page.tsx`                       | `app/blog/[slug]/page.tsx` *(REPLACES existing — now 6 cases)*  |
| `blogs-data.snippet.ts`          | Paste the object inside `lib/blog/blogs-data.ts`                |

> The `page.tsx` in this delivery is the **updated** `[slug]` page that now
> handles all six blog cases. Replace your current file with this one (the
> only change vs Blog #5 is the added `case "ozempic-muscle-loss-body-composition"`).

---

## 🔗 Tool routes (links, not embeds)

Both routes are centralised at the top of `OzempicMuscleLossBlog.tsx`:

```tsx
const GLP1_FREE_TRACKER_URL    = "https://calqulate.net/health/glp-1-dose-calculator"; // FREE
const GLP1_PREMIUM_TRACKER_URL = "/product/glp-1tracker";                              // PREMIUM (gold)
```

- **Free GLP-1 tracker** (green button) → linked from the hero, the intro, the
  TOFU dashboard, the dual-CTA block, and the final CTA.
- **Premium Body Composition Tracker** (`/product/glp-1tracker`, **gold-plated**
  button) → surfaced in the hero, the TOFU dashboard card (gold "Premium"
  badge), the dual-CTA block, and the final CTA.

The two TOFU buttons requested are present in the hero **and** repeated in the
TOFU dashboard strip and the dual-CTA section.

---

## 🖼 Image asset required

Add this single hero image:

```
public/images/blogs/ozempic-muscle-loss-cover.png
```

Recommended: a split-image — a bathroom scale on one side and a muscle/fat
body-composition readout on the other, in green — 4:3 aspect ratio, ~1200×900px.

---

## 📦 Dependencies

You already have `recharts` and `jspdf` from earlier blogs — no new packages.

---

## 🎨 Features baked in (matches Blog #1–5 pattern)

| Feature                                                       | Where                          |
| ------------------------------------------------------------ | ------------------------------ |
| TOFU dashboard: free tracker + **gold premium tracker** card | `OzempicMuscleLossBlog.tsx`    |
| Hero dual-CTA (free green + premium gold)                    | `OzempicMuscleLossBlog.tsx`    |
| "Why the scale is lying" comparison table                   | `OzempicMuscleLossBlog.tsx`    |
| Fat-vs-muscle **donut chart**                               | `MuscleLossChart.tsx`          |
| Muscle-loss-by-study cards (STEP 1, SEMALEAN, pooled, RT)   | `OzempicMuscleLossBlog.tsx`    |
| Fear → fix cards (Ozempic face, skinny fat, fatigue, heart) | `OzempicMuscleLossBlog.tsx`    |
| Protein-target cards by body weight                         | `OzempicMuscleLossBlog.tsx`    |
| 5 feature-to-benefit ("Mom Test") tracking blocks           | `OzempicMuscleLossBlog.tsx`    |
| Simple "lose fat not muscle" 4-step plan                    | `OzempicMuscleLossBlog.tsx`    |
| Free muscle-protection PDF download                         | `MuscleGuidePdfButton.tsx`     |
| 7-question FAQ (schema-ready)                               | `OzempicMuscleLossBlog.tsx`    |
| **References & Sources** (6 high-authority sources)         | `OzempicMuscleLossBlog.tsx` + data |
| Internal links (free tracker, premium tracker)             | woven throughout               |

---

## ✍️ Conversion copy ("Mom Test")

The whole page is written to the "Mom Test": clear not clever, zero jargon,
benefit over feature, and it names the real fears (Ozempic face, skinny fat,
muscle loss, hair thinning, heart). The five app features are translated into
plain-English benefits in the "5 Things You Should Track" section. A separate
`mom-test-copy.md` is included in this delivery with 5 hero headlines, 3
elevator pitches, and all 5 feature-to-benefit lines for reuse on the homepage,
Reddit, and TikTok.

---

## 🎯 SEO targeting

Keywords woven naturally into the H1, H2s, tables, and FAQ — no stuffing:

`ozempic muscle loss`, `glp-1 muscle loss`, `how to prevent skinny fat on
wegovy`, `skinny fat ozempic`, `ozempic face`, `body composition tracking
glp-1`, `lose fat not muscle on ozempic`, `protein on ozempic`, `mounjaro
muscle loss`, `is the scale lying to me`.

---

## 🔄 Adding Blog #7 later

Same pattern:

1. Pick the next slug from `blogs-data.ts`.
2. Create the data file → `lib/blog/[topic]-data.ts`.
3. Build any chart/USP component.
4. Build the blog body → `components/blog/[Topic]Blog.tsx`.
5. Add the `case "your-slug"` line to the switch in `app/blog/[slug]/page.tsx`.
