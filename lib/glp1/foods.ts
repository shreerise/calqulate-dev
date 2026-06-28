/**
 * Local food database — bundled, no API, no key (Phase 3, "code-only AI" food logging).
 *
 * Macros are PER SERVING (the serving size in grams is given so the parser can
 * scale gram/oz quantities). Values are rounded, population-typical figures for
 * common foods — enough for friction-free GLP-1 logging where protein & fiber
 * matter most. Not a clinical nutrition reference.
 */

export interface FoodItem {
  key: string;
  /** Match aliases (lowercase). Longer, more specific aliases win during parsing. */
  aliases: string[];
  servingLabel: string;
  servingGrams: number;
  protein: number;
  fiber: number;
  calories: number;
  carbs: number;
  fat: number;
}

export const FOODS: FoodItem[] = [
  // ── Protein anchors ──
  { key: "egg", aliases: ["egg", "eggs"], servingLabel: "1 large egg", servingGrams: 50, protein: 6, fiber: 0, calories: 72, carbs: 0.4, fat: 5 },
  { key: "egg-white", aliases: ["egg white", "egg whites"], servingLabel: "1 egg white", servingGrams: 33, protein: 3.6, fiber: 0, calories: 17, carbs: 0.2, fat: 0 },
  { key: "chicken-breast", aliases: ["chicken breast", "grilled chicken", "chicken"], servingLabel: "100 g cooked", servingGrams: 100, protein: 31, fiber: 0, calories: 165, carbs: 0, fat: 3.6 },
  { key: "turkey", aliases: ["turkey breast", "turkey"], servingLabel: "100 g cooked", servingGrams: 100, protein: 29, fiber: 0, calories: 135, carbs: 0, fat: 1 },
  { key: "beef", aliases: ["lean beef", "ground beef", "steak", "beef"], servingLabel: "100 g cooked", servingGrams: 100, protein: 26, fiber: 0, calories: 217, carbs: 0, fat: 12 },
  { key: "salmon", aliases: ["salmon"], servingLabel: "100 g cooked", servingGrams: 100, protein: 25, fiber: 0, calories: 208, carbs: 0, fat: 13 },
  { key: "tuna", aliases: ["canned tuna", "tuna"], servingLabel: "100 g", servingGrams: 100, protein: 26, fiber: 0, calories: 116, carbs: 0, fat: 1 },
  { key: "shrimp", aliases: ["shrimp", "prawns"], servingLabel: "100 g cooked", servingGrams: 100, protein: 24, fiber: 0, calories: 99, carbs: 0.2, fat: 0.3 },
  { key: "tofu", aliases: ["tofu"], servingLabel: "100 g", servingGrams: 100, protein: 8, fiber: 0.9, calories: 76, carbs: 1.9, fat: 4.8 },
  { key: "greek-yogurt", aliases: ["greek yogurt", "greek yoghurt"], servingLabel: "170 g cup", servingGrams: 170, protein: 17, fiber: 0, calories: 100, carbs: 6, fat: 0.7 },
  { key: "cottage-cheese", aliases: ["cottage cheese"], servingLabel: "1/2 cup", servingGrams: 113, protein: 12, fiber: 0, calories: 92, carbs: 5, fat: 2.6 },
  { key: "protein-shake", aliases: ["protein shake", "protein powder", "whey", "protein scoop"], servingLabel: "1 scoop", servingGrams: 32, protein: 24, fiber: 1, calories: 120, carbs: 3, fat: 1.5 },
  { key: "milk", aliases: ["milk", "skim milk", "2% milk"], servingLabel: "1 cup", servingGrams: 244, protein: 8, fiber: 0, calories: 103, carbs: 12, fat: 2.4 },
  { key: "cheese", aliases: ["cheddar", "cheese slice", "cheese"], servingLabel: "1 slice (28 g)", servingGrams: 28, protein: 7, fiber: 0, calories: 113, carbs: 0.4, fat: 9 },

  // ── Legumes / fiber ──
  { key: "black-beans", aliases: ["black beans", "beans"], servingLabel: "1/2 cup", servingGrams: 86, protein: 7.6, fiber: 7.5, calories: 114, carbs: 20, fat: 0.5 },
  { key: "lentils", aliases: ["lentils"], servingLabel: "1/2 cup cooked", servingGrams: 99, protein: 9, fiber: 8, calories: 115, carbs: 20, fat: 0.4 },
  { key: "chickpeas", aliases: ["chickpeas", "garbanzo"], servingLabel: "1/2 cup", servingGrams: 82, protein: 7.3, fiber: 6.2, calories: 135, carbs: 22, fat: 2.1 },
  { key: "edamame", aliases: ["edamame"], servingLabel: "1/2 cup", servingGrams: 78, protein: 9, fiber: 4, calories: 94, carbs: 7, fat: 4 },

  // ── Grains / carbs ──
  { key: "oats", aliases: ["oatmeal", "oats", "porridge"], servingLabel: "1/2 cup dry", servingGrams: 40, protein: 5, fiber: 4, calories: 150, carbs: 27, fat: 3 },
  { key: "rice", aliases: ["white rice", "brown rice", "rice"], servingLabel: "1 cup cooked", servingGrams: 158, protein: 4, fiber: 0.6, calories: 205, carbs: 45, fat: 0.4 },
  { key: "bread", aliases: ["whole wheat bread", "wheat bread", "toast", "bread slice", "bread"], servingLabel: "1 slice", servingGrams: 28, protein: 4, fiber: 2, calories: 80, carbs: 14, fat: 1 },
  { key: "pasta", aliases: ["pasta", "spaghetti"], servingLabel: "1 cup cooked", servingGrams: 140, protein: 8, fiber: 2.5, calories: 220, carbs: 43, fat: 1.3 },
  { key: "potato", aliases: ["potato", "baked potato"], servingLabel: "1 medium", servingGrams: 173, protein: 4, fiber: 4, calories: 161, carbs: 37, fat: 0.2 },
  { key: "sweet-potato", aliases: ["sweet potato"], servingLabel: "1 medium", servingGrams: 130, protein: 2, fiber: 4, calories: 112, carbs: 26, fat: 0.1 },
  { key: "tortilla", aliases: ["tortilla", "wrap"], servingLabel: "1 medium", servingGrams: 49, protein: 4, fiber: 1.5, calories: 144, carbs: 24, fat: 4 },

  // ── Fruit / veg ──
  { key: "banana", aliases: ["banana"], servingLabel: "1 medium", servingGrams: 118, protein: 1.3, fiber: 3.1, calories: 105, carbs: 27, fat: 0.4 },
  { key: "apple", aliases: ["apple"], servingLabel: "1 medium", servingGrams: 182, protein: 0.5, fiber: 4.4, calories: 95, carbs: 25, fat: 0.3 },
  { key: "berries", aliases: ["blueberries", "strawberries", "berries"], servingLabel: "1 cup", servingGrams: 148, protein: 1, fiber: 3.6, calories: 84, carbs: 21, fat: 0.5 },
  { key: "avocado", aliases: ["avocado"], servingLabel: "1/2 fruit", servingGrams: 100, protein: 2, fiber: 6.7, calories: 160, carbs: 9, fat: 15 },
  { key: "broccoli", aliases: ["broccoli"], servingLabel: "1 cup", servingGrams: 91, protein: 2.6, fiber: 2.4, calories: 31, carbs: 6, fat: 0.3 },
  { key: "spinach", aliases: ["spinach"], servingLabel: "1 cup", servingGrams: 30, protein: 0.9, fiber: 0.7, calories: 7, carbs: 1.1, fat: 0.1 },
  { key: "salad", aliases: ["mixed salad", "green salad", "salad"], servingLabel: "1 bowl", servingGrams: 100, protein: 1.5, fiber: 2, calories: 20, carbs: 4, fat: 0.2 },

  // ── Fats / snacks ──
  { key: "almonds", aliases: ["almonds"], servingLabel: "1 oz (23 nuts)", servingGrams: 28, protein: 6, fiber: 3.5, calories: 164, carbs: 6, fat: 14 },
  { key: "peanut-butter", aliases: ["peanut butter"], servingLabel: "2 tbsp", servingGrams: 32, protein: 7, fiber: 1.6, calories: 188, carbs: 6, fat: 16 },
  { key: "olive-oil", aliases: ["olive oil"], servingLabel: "1 tbsp", servingGrams: 14, protein: 0, fiber: 0, calories: 119, carbs: 0, fat: 14 },
  { key: "protein-bar", aliases: ["protein bar"], servingLabel: "1 bar", servingGrams: 60, protein: 20, fiber: 5, calories: 220, carbs: 22, fat: 7 },
];

/** Flattened alias index, longest aliases first for greedy matching. */
export const FOOD_ALIASES: { alias: string; food: FoodItem }[] = FOODS.flatMap((food) =>
  food.aliases.map((alias) => ({ alias, food })),
).sort((a, b) => b.alias.length - a.alias.length);
