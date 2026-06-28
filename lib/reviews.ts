/**
 * Calqulate Vitals — REAL member reviews (single source of truth).
 *
 * ⚠️ ONLY add genuine, permissioned reviews here. Publishing fabricated reviews,
 * ratings or outcomes for a health product is deceptive and FTC-actionable. This
 * array is intentionally EMPTY until you have real ones — the UI shows honest
 * trust signals (privacy, validated models, guarantee) instead of fake quotes.
 *
 * When you collect a real review (with the member's consent), add an entry like:
 *   { quote: "…", name: "Dana K.", context: "44, on Zepbound", rating: 5, tags: ["glp1"] }
 */

export type ReviewTag = "glp1" | "metabolic" | "heart-age" | "general";

export interface Review {
  /** The member's own words (permissioned). */
  quote: string;
  /** First name + last initial, as agreed with the member. */
  name: string;
  /** Light context: age / medication / situation. Kept generic. */
  context: string;
  /** 1–5 stars, if given. */
  rating?: number;
  /** Which product pages this review is relevant to. */
  tags?: ReviewTag[];
}

/** Genuine reviews only. Empty by default — do NOT add placeholders. */
export const REVIEWS: Review[] = [];

/** Reviews for a given product surface (falls back to general). */
export function getReviews(tag?: ReviewTag, limit = 4): Review[] {
  const list = tag
    ? REVIEWS.filter((r) => !r.tags || r.tags.includes(tag) || r.tags.includes("general"))
    : REVIEWS;
  return list.slice(0, limit);
}

export const hasReviews = REVIEWS.length > 0;
