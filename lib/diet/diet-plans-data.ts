// lib/diet/diet-plans-data.ts
// Personalized 7-day diet plans for each body shape.
// Used by the PDF generator and on-page diet preview.

import type { ShapeId } from "@/lib/blog/body-shapes-data";

export interface MealDay {
  day: string;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

export interface DietPlan {
  shapeId: ShapeId;
  shapeName: string;
  goal: string;
  dailyCalories: string;        // range — adjust by user later
  macros: { protein: number; carbs: number; fats: number }; // %
  focusNutrients: string[];
  eat: string[];
  avoid: string[];
  hydration: string;
  weeklyPlan: MealDay[];
  fitnessTip: string;
}

export const dietPlans: DietPlan[] = [
  {
    shapeId: "pear",
    shapeName: "Pear",
    goal: "Reduce lower-body fat & build upper-body tone",
    dailyCalories: "1,600–1,800 kcal",
    macros: { protein: 35, carbs: 40, fats: 25 },
    focusNutrients: ["Lean protein", "Fiber", "Anti-inflammatory fats"],
    eat: [
      "Grilled chicken, fish, tofu",
      "Leafy greens (spinach, kale)",
      "Berries, citrus fruits",
      "Quinoa, brown rice, oats",
      "Almonds, walnuts, chia seeds",
    ],
    avoid: [
      "Refined sugar & sodas",
      "Fried foods",
      "Excess dairy",
      "White bread & pasta",
    ],
    hydration: "3 litres water + green tea 2x/day",
    weeklyPlan: [
      {
        day: "Monday",
        breakfast: "Oats with berries + 2 boiled eggs",
        lunch: "Grilled chicken salad with quinoa",
        snack: "Greek yogurt + almonds",
        dinner: "Baked salmon + sautéed spinach",
      },
      {
        day: "Tuesday",
        breakfast: "Veggie omelette + 1 toast",
        lunch: "Lentil soup + brown rice",
        snack: "Apple + walnuts",
        dinner: "Grilled tofu + roasted vegetables",
      },
      {
        day: "Wednesday",
        breakfast: "Smoothie (banana, spinach, protein)",
        lunch: "Chicken wrap with whole-wheat tortilla",
        snack: "Carrot sticks + hummus",
        dinner: "Fish curry + steamed broccoli",
      },
      {
        day: "Thursday",
        breakfast: "Greek yogurt parfait + chia seeds",
        lunch: "Quinoa bowl with chickpeas",
        snack: "Boiled egg + cucumber",
        dinner: "Grilled chicken + sweet potato",
      },
      {
        day: "Friday",
        breakfast: "Avocado toast + poached egg",
        lunch: "Tuna salad with mixed greens",
        snack: "Mixed berries",
        dinner: "Stir-fried tofu + bell peppers",
      },
      {
        day: "Saturday",
        breakfast: "Protein pancakes + berries",
        lunch: "Grilled fish + brown rice",
        snack: "Almonds + green tea",
        dinner: "Chicken stew + greens",
      },
      {
        day: "Sunday",
        breakfast: "Vegetable upma + nuts",
        lunch: "Mixed bean salad",
        snack: "Fruit smoothie",
        dinner: "Grilled paneer + sautéed greens",
      },
    ],
    fitnessTip:
      "30 min HIIT + lower-body strength 4x/week. Add upper-body resistance 2x/week to build shoulder volume.",
  },

  {
    shapeId: "apple",
    shapeName: "Apple",
    goal: "Reduce midsection fat & support metabolism",
    dailyCalories: "1,500–1,700 kcal",
    macros: { protein: 30, carbs: 35, fats: 35 },
    focusNutrients: ["Healthy fats", "Fiber", "Magnesium", "Omega-3"],
    eat: [
      "Salmon, mackerel, sardines",
      "Avocado, olive oil",
      "Cruciferous veggies (broccoli, cauliflower)",
      "Lentils & beans",
      "Green tea, turmeric",
    ],
    avoid: [
      "Refined carbs (white rice, pasta)",
      "Sugary drinks & desserts",
      "Processed snacks",
      "Trans fats",
    ],
    hydration: "3.5 litres water + lemon water on waking",
    weeklyPlan: [
      {
        day: "Monday",
        breakfast: "Avocado toast + poached eggs",
        lunch: "Salmon + roasted broccoli",
        snack: "Handful of walnuts",
        dinner: "Chicken stir-fry with vegetables",
      },
      {
        day: "Tuesday",
        breakfast: "Chia seed pudding + berries",
        lunch: "Lentil & vegetable curry",
        snack: "Cucumber + hummus",
        dinner: "Grilled fish + cauliflower mash",
      },
      {
        day: "Wednesday",
        breakfast: "Veggie omelette + green tea",
        lunch: "Quinoa bowl with chickpeas + tahini",
        snack: "Greek yogurt + flaxseeds",
        dinner: "Baked chicken + roasted vegetables",
      },
      {
        day: "Thursday",
        breakfast: "Smoothie (kale, almond milk, protein)",
        lunch: "Tuna salad with olive oil",
        snack: "Almonds + apple",
        dinner: "Tofu curry + brown rice (small portion)",
      },
      {
        day: "Friday",
        breakfast: "Oats with chia + walnuts",
        lunch: "Grilled chicken salad",
        snack: "Boiled egg + cucumber",
        dinner: "Salmon + steamed greens",
      },
      {
        day: "Saturday",
        breakfast: "Greek yogurt + berries + seeds",
        lunch: "Vegetable soup + grilled tofu",
        snack: "Green tea + nuts",
        dinner: "Stir-fried beef + bok choy",
      },
      {
        day: "Sunday",
        breakfast: "Veggie scramble + avocado",
        lunch: "Mixed bean & quinoa salad",
        snack: "Berries + nuts",
        dinner: "Grilled fish + asparagus",
      },
    ],
    fitnessTip:
      "Daily 45-min brisk walk + 3x/week core-focused strength training. Yoga 2x/week reduces cortisol — a major driver of belly fat.",
  },

  {
    shapeId: "hourglass",
    shapeName: "Hourglass",
    goal: "Maintain curves & even fat distribution",
    dailyCalories: "1,700–1,900 kcal",
    macros: { protein: 30, carbs: 45, fats: 25 },
    focusNutrients: ["Balanced macros", "Iron", "Calcium"],
    eat: [
      "Chicken, fish, lean beef",
      "Whole grains (brown rice, quinoa)",
      "Dairy (yogurt, paneer)",
      "All fruits & vegetables",
      "Nuts & seeds",
    ],
    avoid: [
      "Crash diets — they shrink curves",
      "Excess processed sugar",
      "Skipping meals",
    ],
    hydration: "3 litres water/day",
    weeklyPlan: [
      {
        day: "Monday",
        breakfast: "Oats + banana + peanut butter",
        lunch: "Chicken biryani (small) + raita",
        snack: "Fruit + yogurt",
        dinner: "Grilled fish + vegetable rice",
      },
      {
        day: "Tuesday",
        breakfast: "Egg sandwich on whole-wheat",
        lunch: "Paneer wrap + salad",
        snack: "Mixed nuts",
        dinner: "Dal + roti + sabzi",
      },
      {
        day: "Wednesday",
        breakfast: "Smoothie bowl with granola",
        lunch: "Grilled chicken + quinoa salad",
        snack: "Hummus + carrots",
        dinner: "Fish curry + rice",
      },
      {
        day: "Thursday",
        breakfast: "Poha + boiled egg",
        lunch: "Rajma + brown rice",
        snack: "Apple + cheese",
        dinner: "Chicken stir-fry + noodles",
      },
      {
        day: "Friday",
        breakfast: "Veggie paratha + curd",
        lunch: "Fish + sautéed greens",
        snack: "Roasted chickpeas",
        dinner: "Pasta primavera (whole wheat)",
      },
      {
        day: "Saturday",
        breakfast: "Pancakes + berries",
        lunch: "Mutton curry (small) + roti",
        snack: "Fruit smoothie",
        dinner: "Grilled tofu + rice",
      },
      {
        day: "Sunday",
        breakfast: "Idli + sambar",
        lunch: "Chicken biryani + raita",
        snack: "Yogurt + nuts",
        dinner: "Light soup + salad",
      },
    ],
    fitnessTip:
      "Mix cardio (3x/week) with full-body strength (3x/week). Avoid heavy spot-training — your goal is to maintain symmetry.",
  },

  {
    shapeId: "rectangle",
    shapeName: "Rectangle",
    goal: "Build curves at hips & bust, define waist",
    dailyCalories: "1,800–2,000 kcal",
    macros: { protein: 35, carbs: 45, fats: 20 },
    focusNutrients: ["Protein", "Complex carbs", "Creatine-friendly foods"],
    eat: [
      "Chicken breast, eggs, paneer",
      "Sweet potatoes, oats, brown rice",
      "Bananas, dates",
      "Legumes & beans",
      "Dairy (full-fat for curves)",
    ],
    avoid: [
      "Excessive cardio (burns muscle)",
      "Very low-calorie diets",
      "Skipping post-workout meals",
    ],
    hydration: "3.5 litres water + electrolytes post-workout",
    weeklyPlan: [
      {
        day: "Monday",
        breakfast: "Oats + banana + 3 eggs",
        lunch: "Chicken + sweet potato + greens",
        snack: "Protein shake + dates",
        dinner: "Beef stir-fry + brown rice",
      },
      {
        day: "Tuesday",
        breakfast: "Paneer paratha + curd",
        lunch: "Rajma + rice + salad",
        snack: "Banana + peanut butter",
        dinner: "Grilled chicken + quinoa",
      },
      {
        day: "Wednesday",
        breakfast: "Egg bhurji + toast + milk",
        lunch: "Fish + rice + dal",
        snack: "Greek yogurt + granola",
        dinner: "Chicken curry + roti",
      },
      {
        day: "Thursday",
        breakfast: "Protein smoothie + oats",
        lunch: "Mutton curry + rice",
        snack: "Trail mix",
        dinner: "Tofu + sweet potato + greens",
      },
      {
        day: "Friday",
        breakfast: "Pancakes + eggs + berries",
        lunch: "Chicken biryani + raita",
        snack: "Cottage cheese + fruit",
        dinner: "Salmon + rice + asparagus",
      },
      {
        day: "Saturday",
        breakfast: "Poha + boiled eggs",
        lunch: "Paneer butter masala + roti",
        snack: "Banana shake",
        dinner: "Beef stew + bread",
      },
      {
        day: "Sunday",
        breakfast: "French toast + milk",
        lunch: "Chicken roast + potatoes",
        snack: "Nuts + dates",
        dinner: "Pasta + meatballs",
      },
    ],
    fitnessTip:
      "Heavy strength training 4x/week — focus on glutes, chest, and shoulders. Limit cardio to 20-min sessions to preserve muscle.",
  },

  {
    shapeId: "inverted-triangle",
    shapeName: "Inverted Triangle",
    goal: "Reduce upper-body bulk & build lower-body curves",
    dailyCalories: "1,600–1,800 kcal",
    macros: { protein: 30, carbs: 50, fats: 20 },
    focusNutrients: ["Complex carbs", "Lower-body building protein"],
    eat: [
      "Chicken thighs, eggs, fish",
      "Sweet potatoes, oats",
      "Quinoa, brown rice",
      "Bananas, avocado",
      "Legumes",
    ],
    avoid: [
      "Heavy upper-body protein loading",
      "Excessive shoulder/chest workouts",
      "Refined sugar",
    ],
    hydration: "3 litres water/day",
    weeklyPlan: [
      {
        day: "Monday",
        breakfast: "Oats + banana + almonds",
        lunch: "Chicken + sweet potato",
        snack: "Greek yogurt + berries",
        dinner: "Quinoa bowl + roasted veggies",
      },
      {
        day: "Tuesday",
        breakfast: "Veggie omelette + toast",
        lunch: "Fish + brown rice + greens",
        snack: "Apple + peanut butter",
        dinner: "Tofu curry + rice",
      },
      {
        day: "Wednesday",
        breakfast: "Smoothie + chia",
        lunch: "Lentil soup + bread",
        snack: "Trail mix",
        dinner: "Grilled chicken + sweet potato",
      },
      {
        day: "Thursday",
        breakfast: "Pancakes + fruit",
        lunch: "Chickpea salad + quinoa",
        snack: "Yogurt + nuts",
        dinner: "Salmon + roasted vegetables",
      },
      {
        day: "Friday",
        breakfast: "Egg wrap + fruit",
        lunch: "Beef + rice + salad",
        snack: "Banana + almonds",
        dinner: "Vegetable curry + rice",
      },
      {
        day: "Saturday",
        breakfast: "Poha + curd",
        lunch: "Chicken biryani + raita",
        snack: "Smoothie",
        dinner: "Tofu stir-fry + noodles",
      },
      {
        day: "Sunday",
        breakfast: "Idli + chutney",
        lunch: "Fish curry + rice",
        snack: "Fruit + cheese",
        dinner: "Pasta + light sauce",
      },
    ],
    fitnessTip:
      "Lower-body focus: squats, lunges, glute bridges 4x/week. Limit upper-body weights — opt for high-rep, low-weight.",
  },
];

export function getDietPlan(shapeId: ShapeId): DietPlan | undefined {
  return dietPlans.find((p) => p.shapeId === shapeId);
}
