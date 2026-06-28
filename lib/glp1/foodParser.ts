/**
 * Food text estimator — the code-only alternative to "AI food-photo logging".
 *
 * Parses a free-text meal ("3 eggs, 2 slices wheat toast, greek yogurt") into
 * matched foods × quantities and sums the macros from the bundled local database.
 * 100% deterministic, no API, no key — and unit-testable.
 *
 * Estimates only — reduced appetite makes precise logging a chore, so the goal is
 * a fast, good-enough protein/fiber/calorie estimate the user can tweak.
 */

import { FOOD_ALIASES, type FoodItem } from "./foods";

const GRAMS_PER_OZ = 28.3495;

const WORD_NUMBERS: Record<string, number> = {
  a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10, half: 0.5,
  dozen: 12,
};

export interface ParsedFood {
  food: FoodItem;
  /** Quantity in servings (after any gram/oz scaling). */
  servings: number;
  protein: number;
  fiber: number;
  calories: number;
  carbs: number;
  fat: number;
  matchedText: string;
}

export interface FoodEstimate {
  items: ParsedFood[];
  unmatched: string[];
  totals: { protein: number; fiber: number; calories: number; carbs: number; fat: number };
}

/** Parse a leading quantity + optional unit from a segment. Returns the remainder text. */
function parseQuantity(seg: string): { qty: number; unit: "serving" | "g" | "oz"; rest: string } {
  let s = seg.trim();
  let qty = 1;
  let unit: "serving" | "g" | "oz" = "serving";

  // fraction e.g. "1/2"
  const frac = s.match(/^(\d+)\s*\/\s*(\d+)\b/);
  const dec = s.match(/^(\d+(?:\.\d+)?)\b/);
  const wordNum = s.match(/^([a-z]+)\b/);

  if (frac) {
    qty = Number(frac[1]) / Number(frac[2]);
    s = s.slice(frac[0].length).trim();
  } else if (dec) {
    qty = Number(dec[1]);
    s = s.slice(dec[0].length).trim();
  } else if (wordNum && WORD_NUMBERS[wordNum[1]] !== undefined) {
    qty = WORD_NUMBERS[wordNum[1]];
    s = s.slice(wordNum[0].length).trim();
  }

  // optional unit token
  const unitMatch = s.match(/^(grams?|g|ounces?|oz|servings?|slices?|cups?|scoops?|pieces?|each)\b/);
  if (unitMatch) {
    const u = unitMatch[1];
    if (/^(grams?|g)$/.test(u)) unit = "g";
    else if (/^(ounces?|oz)$/.test(u)) unit = "oz";
    else unit = "serving";
    s = s.slice(unitMatch[0].length).trim();
  }

  // strip filler words
  s = s.replace(/^(of|a|an)\s+/, "").trim();
  return { qty, unit, rest: s };
}

function matchFood(text: string): FoodItem | null {
  for (const { alias, food } of FOOD_ALIASES) {
    if (text.includes(alias)) return food;
  }
  return null;
}

function scale(food: FoodItem, qty: number, unit: "serving" | "g" | "oz"): number {
  if (unit === "serving") return qty;
  const grams = unit === "oz" ? qty * GRAMS_PER_OZ : qty;
  return grams / food.servingGrams;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Estimate macros from a free-text meal description. */
export function estimateFromText(input: string): FoodEstimate {
  const segments = input
    .toLowerCase()
    .split(/,|\band\b|\bwith\b|\+|\n|;/)
    .map((s) => s.trim())
    .filter(Boolean);

  const items: ParsedFood[] = [];
  const unmatched: string[] = [];

  for (const seg of segments) {
    const { qty, unit, rest } = parseQuantity(seg);
    const food = matchFood(rest || seg);
    if (!food) {
      unmatched.push(seg);
      continue;
    }
    const servings = scale(food, qty, unit);
    items.push({
      food,
      servings: r1(servings),
      protein: r1(food.protein * servings),
      fiber: r1(food.fiber * servings),
      calories: Math.round(food.calories * servings),
      carbs: r1(food.carbs * servings),
      fat: r1(food.fat * servings),
      matchedText: seg,
    });
  }

  const totals = items.reduce(
    (acc, i) => ({
      protein: r1(acc.protein + i.protein),
      fiber: r1(acc.fiber + i.fiber),
      calories: acc.calories + i.calories,
      carbs: r1(acc.carbs + i.carbs),
      fat: r1(acc.fat + i.fat),
    }),
    { protein: 0, fiber: 0, calories: 0, carbs: 0, fat: 0 },
  );

  return { items, unmatched, totals };
}
