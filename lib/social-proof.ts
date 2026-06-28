/**
 * Headline stats for the homepage + pricing.
 *
 * ⚠️ Use REAL figures only. Leave a value as "" to hide that stat. Member quotes
 * and success stories now live in lib/reviews.ts (genuine, permissioned only).
 */

export interface Stat {
  value: string;
  label: string;
}

/** Headline numbers. Set to your REAL figures, or "" to hide. */
export const STATS: Stat[] = [
  { value: "", label: "Paid members" }, // e.g. "2,400+" once real
  { value: "", label: "Average rating" }, // e.g. "4.9 / 5" once real
  { value: "50+", label: "Free calculators" }, // factual
  { value: "", label: "Reports shared with doctors" },
];
