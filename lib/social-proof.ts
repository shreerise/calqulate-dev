/**
 * Social proof content for the homepage + pricing page.
 *
 * ⚠️ IMPORTANT — REPLACE BEFORE LAUNCH:
 * The testimonials, ratings and counts below are PLACEHOLDERS written to show
 * the layout. Publishing fabricated reviews, ratings or subscriber numbers as
 * if real is deceptive and is actively policed by the FTC (and is especially
 * risky for a health product). Swap every entry here for genuine, permissioned
 * customer quotes and your real metrics before going live. Leave a field empty
 * to hide that stat.
 */

export interface Stat {
  value: string;
  label: string;
}

/** Headline numbers. Set to your REAL figures, or "" to hide. */
export const STATS: Stat[] = [
  { value: "", label: "Paid members" }, // e.g. "2,400+"
  { value: "", label: "Clutch rating" }, // e.g. "4.9 / 5"
  { value: "50+", label: "Free calculators" }, // this one is factual
  { value: "", label: "Reports shared with doctors" },
];

export interface Testimonial {
  quote: string;
  name: string;
  context: string; // age / situation, kept generic
}

/** PLACEHOLDER testimonials — replace with real, permissioned quotes. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Honestly I signed up expecting another weight app. The thing that got me was the score moving when the scale didn't. I lost basically nothing for three weeks and almost quit, but the trend line said I was actually improving. Stuck with it and my A1c went from 5.9 to 5.5.",
    name: "Mark R.",
    context: "52, prediabetes",
  },
  {
    quote:
      "I'm on tirzepatide and was terrified about losing muscle. Being able to watch lean mass instead of just pounds changed how I eat. Protein target plus the lifting reminders are stupid simple but they work.",
    name: "Dana K.",
    context: "44, on a GLP-1",
  },
  {
    quote:
      "My doctor gave me a 10 year heart risk number and zero context. This actually explained what it meant and showed me the one thing to fix first. Brought the PDF to my next appointment and we had a real conversation for once.",
    name: "Priya S.",
    context: "58, high cholesterol",
  },
  {
    quote:
      "The Future You thing sounds gimmicky but seeing the realistic range vs the best case made me set a goal I'd actually hit instead of a fantasy. Down 18 pounds and my heart age dropped 6 years.",
    name: "Tom B.",
    context: "47, metabolic reset",
  },
];

export interface SuccessStory {
  headline: string;
  body: string;
  metric: string;
}

/** PLACEHOLDER success stories — replace with real outcomes you can back up. */
export const SUCCESS_STORIES: SuccessStory[] = [
  {
    headline: "From prediabetic to normal in one quarter",
    body: "Caught a 5.9 A1c, used the weekly check-ins and next-lever protocol, and reversed it inside three months without medication.",
    metric: "A1c 5.9 to 5.4",
  },
  {
    headline: "Lost the fat, kept the muscle",
    body: "Tracked body composition on a GLP-1 instead of the scale, hit the protein target, and protected lean mass through a 20 pound drop.",
    metric: "0 kg lean mass lost",
  },
  {
    headline: "A heart that got younger",
    body: "Lowered blood pressure and LDL over five months and watched the heart age number fall instead of climb.",
    metric: "Heart age -6 years",
  },
];
