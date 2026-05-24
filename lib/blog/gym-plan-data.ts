// lib/blog/gym-plan-data.ts
// ─────────────────────────────────────────────────────────────────────────────
// All workout data for Best Gym Plan by Body Shape blog
// Covers male (Ectomorph, Mesomorph, Endomorph, Rectangle/Ruler)
//         female (Pear/Triangle, Apple/Round, Hourglass, Rectangle, Inverted Triangle)
// ─────────────────────────────────────────────────────────────────────────────

// ── TYPES ────────────────────────────────────────────────────────────────────

export type Gender = "male" | "female";

export type MaleShape = "ectomorph" | "mesomorph" | "endomorph" | "rectangle";
export type FemaleShape = "pear" | "apple" | "hourglass" | "rectangle" | "inverted-triangle";
export type BodyShape = MaleShape | FemaleShape;

export interface Exercise {
  name: string;
  sets: number;
  reps: string; // e.g. "8-10" or "12-15" or "30 sec"
  rest: string; // e.g. "60s" or "90s"
  tip: string;
  muscleGroup: string;
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  goal: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number; // minutes
  frequency: string; // e.g. "3x/week"
  focusScore: number; // 0-100 how well this routine fits the shape
  brandColor: string;
  icon: string;
  exercises: Exercise[];
  proTip: string;
}

export interface DayPlan {
  day: number;
  label: string; // e.g. "Monday"
  focus: string; // e.g. "Upper Body + Shoulders"
  type: "training" | "rest" | "active-recovery";
  routineId?: string; // maps to WorkoutRoutine.id
  notes?: string;
}

export interface ShapeData {
  id: BodyShape;
  gender: Gender;
  name: string;
  shortDesc: string;
  longDesc: string;
  characteristics: string[];
  goals: string[];
  avoid: string[];
  nutritionTip: string;
  keyFocusAreas: string[];
  routines: WorkoutRoutine[];
  weekPlan: DayPlan[];
}

// ── MALE SHAPES ──────────────────────────────────────────────────────────────

export const maleShapes: ShapeData[] = [
  // ── ECTOMORPH ────────────────────────────────────────────────────────────
  {
    id: "ectomorph",
    gender: "male",
    name: "Ectomorph",
    shortDesc: "Lean, fast metabolism, hard to gain muscle",
    longDesc:
      "Ectomorphs are naturally slim with narrow shoulders, hips, and a fast metabolism that burns calories quickly. Building mass requires a caloric surplus and low-rep, high-load compound lifting. Cardio should be minimal.",
    characteristics: [
      "Narrow frame, low body fat",
      "Fast metabolism — stays lean naturally",
      "Struggles to gain muscle or weight",
      "Long limbs relative to torso",
    ],
    goals: [
      "Build lean muscle mass",
      "Increase overall size and strength",
      "Improve shoulder and chest width",
    ],
    avoid: [
      "Excessive cardio — it burns the calories you need for growth",
      "Very high rep ranges (15+) without progressive overload",
      "Long workout sessions (>75 min) that spike cortisol",
      "Training every day without rest",
    ],
    nutritionTip:
      "Aim for a 300–500 kcal daily surplus. Prioritise 1.8–2.2 g protein per kg bodyweight. Time carbs around workouts for maximum muscle glycogen.",
    keyFocusAreas: ["Chest", "Shoulders", "Upper Back", "Legs"],
    routines: [
      {
        id: "ecto-mass-builder",
        name: "Mass Builder Compound Lifts",
        goal: "Maximum muscle hypertrophy",
        difficulty: "Intermediate",
        duration: 60,
        frequency: "4x/week",
        focusScore: 96,
        brandColor: "#3b82f6",
        icon: "💪",
        proTip:
          "Progressive overload is your #1 rule. Add 2.5 kg to each lift every week, or add 1 rep per set before increasing weight.",
        exercises: [
          { name: "Barbell Back Squat", sets: 4, reps: "6-8", rest: "120s", tip: "Break parallel for maximum quad and glute activation.", muscleGroup: "Legs" },
          { name: "Barbell Bench Press", sets: 4, reps: "6-8", rest: "120s", tip: "Retract scapula before lowering the bar.", muscleGroup: "Chest" },
          { name: "Bent-Over Barbell Row", sets: 4, reps: "6-8", rest: "120s", tip: "Keep chest up and hinge at 45°.", muscleGroup: "Back" },
          { name: "Overhead Press (Standing)", sets: 3, reps: "8-10", rest: "90s", tip: "Brace core — no lumbar hyperextension.", muscleGroup: "Shoulders" },
          { name: "Romanian Deadlift", sets: 3, reps: "8-10", rest: "90s", tip: "Push hips back, not knees forward.", muscleGroup: "Hamstrings" },
        ],
      },
      {
        id: "ecto-upper-push",
        name: "Upper Body Push — Width Builder",
        goal: "Shoulder and chest width",
        difficulty: "Intermediate",
        duration: 55,
        frequency: "2x/week",
        focusScore: 92,
        brandColor: "#8b5cf6",
        icon: "🏋️",
        proTip:
          "Wide-grip work and lateral raises are the fastest way to build the 'V-taper' width ectomorphs lack.",
        exercises: [
          { name: "Incline Dumbbell Press", sets: 4, reps: "8-10", rest: "90s", tip: "30–45° incline targets upper chest for a fuller look.", muscleGroup: "Upper Chest" },
          { name: "Dumbbell Lateral Raise", sets: 4, reps: "12-15", rest: "60s", tip: "Lead with elbows, not wrists.", muscleGroup: "Lateral Deltoid" },
          { name: "Cable Flye (High → Low)", sets: 3, reps: "12-15", rest: "60s", tip: "Full stretch at top of motion.", muscleGroup: "Chest" },
          { name: "Arnold Press", sets: 3, reps: "10-12", rest: "75s", tip: "Rotate palms outward as you press for full delt activation.", muscleGroup: "Shoulders" },
          { name: "Tricep Dips (Weighted)", sets: 3, reps: "8-10", rest: "90s", tip: "Stay upright to target triceps over chest.", muscleGroup: "Triceps" },
        ],
      },
      {
        id: "ecto-leg-mass",
        name: "Leg Mass Protocol",
        goal: "Lower body size and strength",
        difficulty: "Intermediate",
        duration: 60,
        frequency: "2x/week",
        focusScore: 89,
        brandColor: "#10b981",
        icon: "🦵",
        proTip:
          "Ectomorphs often skip legs — don't. Squats and deadlifts release the most anabolic hormones system-wide.",
        exercises: [
          { name: "Barbell Front Squat", sets: 4, reps: "6-8", rest: "120s", tip: "Elbows high keeps the torso upright for quad emphasis.", muscleGroup: "Quads" },
          { name: "Leg Press (Wide Stance)", sets: 4, reps: "10-12", rest: "90s", tip: "Lower until knees reach 90° — don't bounce at the bottom.", muscleGroup: "Quads/Glutes" },
          { name: "Walking Lunges (Barbell)", sets: 3, reps: "10 each", rest: "90s", tip: "Long stride maximises glute stretch.", muscleGroup: "Glutes/Quads" },
          { name: "Lying Leg Curl", sets: 3, reps: "12-15", rest: "60s", tip: "Pause 1 second at peak contraction.", muscleGroup: "Hamstrings" },
          { name: "Standing Calf Raise", sets: 4, reps: "15-20", rest: "45s", tip: "Full range — deep stretch at bottom, full extension at top.", muscleGroup: "Calves" },
        ],
      },
      {
        id: "ecto-pull-back",
        name: "Pull Day — Back Thickness",
        goal: "Back thickness and arm mass",
        difficulty: "Intermediate",
        duration: 55,
        frequency: "2x/week",
        focusScore: 88,
        brandColor: "#f59e0b",
        icon: "🔄",
        proTip:
          "A thick back makes you look bigger from every angle. Deadlifts, rows, and pull-ups are the holy trinity.",
        exercises: [
          { name: "Conventional Deadlift", sets: 4, reps: "5-6", rest: "150s", tip: "Bar over mid-foot, lats tight before the pull.", muscleGroup: "Full Back/Hamstrings" },
          { name: "Pull-Ups (Weighted)", sets: 4, reps: "6-8", rest: "120s", tip: "Dead hang start, chin over bar finish.", muscleGroup: "Lats" },
          { name: "Seated Cable Row (Wide Grip)", sets: 3, reps: "10-12", rest: "75s", tip: "Drive elbows back, not just hands.", muscleGroup: "Mid Back" },
          { name: "Face Pulls", sets: 3, reps: "15-20", rest: "60s", tip: "Target rear delts for shoulder health and width.", muscleGroup: "Rear Deltoid" },
          { name: "Barbell Curl", sets: 3, reps: "10-12", rest: "60s", tip: "No swinging — squeeze at the top.", muscleGroup: "Biceps" },
        ],
      },
    ],
    weekPlan: [
      { day: 1, label: "Monday", focus: "Mass Builder Compound Lifts", type: "training", routineId: "ecto-mass-builder" },
      { day: 2, label: "Tuesday", focus: "Upper Body Push — Width Builder", type: "training", routineId: "ecto-upper-push" },
      { day: 3, label: "Wednesday", focus: "Active Recovery — Light Walk + Stretching", type: "active-recovery", notes: "20 min walk, 15 min full-body stretch. No heavy lifting." },
      { day: 4, label: "Thursday", focus: "Leg Mass Protocol", type: "training", routineId: "ecto-leg-mass" },
      { day: 5, label: "Friday", focus: "Pull Day — Back Thickness", type: "training", routineId: "ecto-pull-back" },
      { day: 6, label: "Saturday", focus: "Upper Body Push — Width Builder (Repeat)", type: "training", routineId: "ecto-upper-push", notes: "Use same exercises but vary grip width or angle." },
      { day: 7, label: "Sunday", focus: "Full Rest", type: "rest", notes: "Essential for muscle protein synthesis. Sleep 8+ hours." },
    ],
  },

  // ── MESOMORPH ──────────────────────────────────────────────────────────────
  {
    id: "mesomorph",
    gender: "male",
    name: "Mesomorph",
    shortDesc: "Athletic build, gains muscle easily, moderate fat",
    longDesc:
      "Mesomorphs have a naturally athletic frame with wide shoulders, a narrow waist, and a body that responds quickly to both strength and cardio training. The goal is maintaining leanness while maximizing strength gains.",
    characteristics: [
      "Naturally muscular and athletic",
      "Wide shoulders, narrow waist",
      "Gains muscle and loses fat relatively easily",
      "Medium-to-fast metabolism",
    ],
    goals: ["Maximize strength", "Maintain low body fat", "Build symmetrical physique"],
    avoid: [
      "Only doing the same lifts — variety prevents adaptation plateaus",
      "Skipping cardio entirely — metabolic conditioning matters",
      "Ego lifting with bad form",
    ],
    nutritionTip:
      "Maintenance calories with high protein (1.8–2.0 g/kg) during cutting phases. Small surplus (200–300 kcal) for lean bulk phases. Cycle carbs on training vs. rest days.",
    keyFocusAreas: ["Symmetry", "Core", "Cardiovascular fitness", "Strength endurance"],
    routines: [
      {
        id: "meso-ppl",
        name: "Push / Pull / Legs Split",
        goal: "Balanced strength and hypertrophy",
        difficulty: "Intermediate",
        duration: 60,
        frequency: "6x/week",
        focusScore: 97,
        brandColor: "#ef4444",
        icon: "⚡",
        proTip:
          "The PPL split perfectly matches your fast recovery. Rotate intensity — one heavy day (4-6 reps) and one hypertrophy day (8-12 reps) per muscle group per week.",
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "6-8", rest: "90s", tip: "Focus on chest contraction, not just moving weight.", muscleGroup: "Chest" },
          { name: "Incline DB Press", sets: 3, reps: "10-12", rest: "75s", tip: "Upper chest gives the 'shelf' look.", muscleGroup: "Upper Chest" },
          { name: "Dips (Weighted)", sets: 3, reps: "8-10", rest: "90s", tip: "Lean forward slightly for more chest involvement.", muscleGroup: "Chest/Triceps" },
          { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90s", tip: "Full overhead lockout.", muscleGroup: "Shoulders" },
          { name: "Cable Lateral Raise", sets: 3, reps: "15-20", rest: "45s", tip: "Cables maintain tension at the top unlike dumbbells.", muscleGroup: "Side Delts" },
        ],
      },
      {
        id: "meso-strength",
        name: "Strength & Power Circuit",
        goal: "Maximal strength and explosive power",
        difficulty: "Advanced",
        duration: 65,
        frequency: "3x/week",
        focusScore: 94,
        brandColor: "#f97316",
        icon: "🏆",
        proTip:
          "Pair a heavy compound with a plyometric movement (contrast training). E.g. heavy squat → jump squat. This recruits more fast-twitch fibres.",
        exercises: [
          { name: "Back Squat", sets: 5, reps: "3-5", rest: "180s", tip: "Max depth, controlled descent, explosive ascent.", muscleGroup: "Full Leg" },
          { name: "Deadlift", sets: 4, reps: "3-5", rest: "180s", tip: "Think 'push the floor away' not 'pull the bar up'.", muscleGroup: "Full Posterior" },
          { name: "Bench Press (Paused)", sets: 4, reps: "4-6", rest: "150s", tip: "1-second pause removes stretch reflex — builds real strength.", muscleGroup: "Chest" },
          { name: "Barbell Row", sets: 4, reps: "5-6", rest: "120s", tip: "The most underrated upper-back builder.", muscleGroup: "Back" },
          { name: "Hang Power Clean", sets: 3, reps: "4", rest: "120s", tip: "Explosive hip extension is the key — not an arm curl.", muscleGroup: "Full Body Power" },
        ],
      },
      {
        id: "meso-hiit",
        name: "HIIT Metabolic Conditioning",
        goal: "Fat loss and cardiovascular fitness",
        difficulty: "Advanced",
        duration: 40,
        frequency: "2x/week",
        focusScore: 91,
        brandColor: "#06b6d4",
        icon: "🔥",
        proTip:
          "Keep intensity at 85–95% max heart rate during work intervals. If you can hold a conversation, you're not working hard enough.",
        exercises: [
          { name: "Kettlebell Swing", sets: 5, reps: "20", rest: "40s", tip: "Drive hips forward — not a squat, it's a hip hinge.", muscleGroup: "Full Posterior Chain" },
          { name: "Box Jump", sets: 4, reps: "10", rest: "45s", tip: "Soft landing with knees bent — step down, don't jump down.", muscleGroup: "Explosive Legs" },
          { name: "Battle Ropes (30s on/20s off)", sets: 5, reps: "30 sec", rest: "20s", tip: "Alternate arms in wave pattern.", muscleGroup: "Shoulders/Core" },
          { name: "Burpee to Pull-Up", sets: 4, reps: "8", rest: "60s", tip: "Explosive transition from floor to pull-up bar.", muscleGroup: "Full Body" },
          { name: "Sled Push (Heavy)", sets: 4, reps: "20m", rest: "60s", tip: "Low hips, powerful strides, arms straight.", muscleGroup: "Legs/Core" },
        ],
      },
      {
        id: "meso-core-symmetry",
        name: "Core & Symmetry Finisher",
        goal: "Visible abs and postural balance",
        difficulty: "Intermediate",
        duration: 30,
        frequency: "3x/week",
        focusScore: 88,
        brandColor: "#84cc16",
        icon: "🎯",
        proTip:
          "Add this as a 30-min finisher after any main session. Core training 3x/week at 10–15% body fat will reveal definition.",
        exercises: [
          { name: "Cable Crunch", sets: 4, reps: "15-20", rest: "45s", tip: "Round the lower back to fully contract abs.", muscleGroup: "Abs" },
          { name: "Ab Wheel Rollout", sets: 3, reps: "10-12", rest: "60s", tip: "Brace hard before rolling — protect the spine.", muscleGroup: "Deep Core" },
          { name: "Hanging Leg Raise", sets: 4, reps: "12-15", rest: "60s", tip: "Control the descent — no swinging.", muscleGroup: "Lower Abs" },
          { name: "Russian Twist (Weighted)", sets: 3, reps: "20 total", rest: "45s", tip: "Rotate from thoracic spine, not just arms.", muscleGroup: "Obliques" },
          { name: "Plank (Weighted)", sets: 3, reps: "45 sec", rest: "45s", tip: "Squeeze glutes and quads — full body tension.", muscleGroup: "Core Stabilisers" },
        ],
      },
    ],
    weekPlan: [
      { day: 1, label: "Monday", focus: "Push — Chest, Shoulders, Triceps", type: "training", routineId: "meso-ppl" },
      { day: 2, label: "Tuesday", focus: "Pull — Back, Biceps, Rear Delts", type: "training", routineId: "meso-strength" },
      { day: 3, label: "Wednesday", focus: "Legs + Core & Symmetry Finisher", type: "training", routineId: "meso-core-symmetry" },
      { day: 4, label: "Thursday", focus: "Push (Hypertrophy Focus)", type: "training", routineId: "meso-ppl", notes: "Higher reps (10-15), shorter rest." },
      { day: 5, label: "Friday", focus: "HIIT Metabolic Conditioning", type: "training", routineId: "meso-hiit" },
      { day: 6, label: "Saturday", focus: "Strength & Power Circuit", type: "training", routineId: "meso-strength" },
      { day: 7, label: "Sunday", focus: "Full Rest + Meal Prep", type: "rest", notes: "Foam rolling, mobility work, and prep your protein meals for the week." },
    ],
  },

  // ── ENDOMORPH ─────────────────────────────────────────────────────────────
  {
    id: "endomorph",
    gender: "male",
    name: "Endomorph",
    shortDesc: "Stocky build, gains fat easily, strong base",
    longDesc:
      "Endomorphs are naturally strong with a solid bone structure, but also tend to store fat more readily — especially around the abdomen. The workout focus is fat burning, metabolic acceleration, and revealing the muscular base underneath.",
    characteristics: [
      "Stocky, wide frame with higher body fat",
      "Strong naturally — lifts heavy easily",
      "Gains fat quickly, especially around the midsection",
      "Slower metabolism",
    ],
    goals: ["Reduce body fat", "Accelerate metabolism", "Reveal muscular base"],
    avoid: [
      "Low-intensity steady-state cardio as the only cardio",
      "High-calorie bulking phases",
      "Long rest periods (>90s) that lower heart rate too much",
      "Neglecting diet — you cannot out-train a bad diet",
    ],
    nutritionTip:
      "Caloric deficit of 300–500 kcal. Keep carbs low on rest days, higher on training days (carb cycling). 2.0–2.2 g protein/kg to preserve muscle in deficit.",
    keyFocusAreas: ["Fat Loss", "Cardiovascular System", "Core", "Full Body Compound Lifts"],
    routines: [
      {
        id: "endo-fat-burner",
        name: "Full Body Fat Burner Circuit",
        goal: "Maximum calorie burn and metabolic boost",
        difficulty: "Intermediate",
        duration: 50,
        frequency: "4x/week",
        focusScore: 96,
        brandColor: "#ef4444",
        icon: "🔥",
        proTip:
          "Supersets (two exercises back-to-back) keep heart rate elevated and double the calorie burn versus standard rest-between-sets training.",
        exercises: [
          { name: "Goblet Squat", sets: 4, reps: "15", rest: "45s", tip: "Heels on plate if mobility is limited.", muscleGroup: "Legs/Glutes" },
          { name: "Push-Up (Incline → Flat → Decline)", sets: 3, reps: "10 each", rest: "60s", tip: "Progress through inclines for triple chest activation.", muscleGroup: "Chest" },
          { name: "Dumbbell Romanian Deadlift", sets: 4, reps: "12", rest: "60s", tip: "Feel the hamstring stretch at the bottom.", muscleGroup: "Posterior Chain" },
          { name: "Dumbbell Row (Alternating)", sets: 3, reps: "12 each", rest: "45s", tip: "Elbow drives toward hip, not straight up.", muscleGroup: "Back" },
          { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "30s", tip: "Keep hips level — don't pike up.", muscleGroup: "Core/Cardio" },
        ],
      },
      {
        id: "endo-cardio-strength",
        name: "Cardio-Strength Hybrid",
        goal: "Simultaneous fat loss and muscle retention",
        difficulty: "Intermediate",
        duration: 55,
        frequency: "3x/week",
        focusScore: 93,
        brandColor: "#f97316",
        icon: "⚡",
        proTip:
          "Perform 5 min steady-state cardio (rowing or bike) between lifting blocks. This burns extra calories without compromising strength.",
        exercises: [
          { name: "Trap Bar Deadlift", sets: 4, reps: "8-10", rest: "90s", tip: "Upright torso reduces lower back strain.", muscleGroup: "Full Body" },
          { name: "Rowing Machine (5 min)", sets: 1, reps: "5 min", rest: "0s", tip: "Drive with legs first (60%), then core, then arms.", muscleGroup: "Cardio" },
          { name: "Dumbbell Bench Press", sets: 4, reps: "10-12", rest: "75s", tip: "Full range — touch chest, full extension.", muscleGroup: "Chest" },
          { name: "Bike Sprint (3 min)", sets: 1, reps: "3 min", rest: "0s", tip: "Alternate 30s hard / 30s moderate.", muscleGroup: "Cardio" },
          { name: "Farmer's Walk", sets: 4, reps: "30m", rest: "60s", tip: "Heavy dumbbells, shoulders back, core braced.", muscleGroup: "Full Body/Grip" },
        ],
      },
      {
        id: "endo-core-burn",
        name: "Core Blast & Ab Definition",
        goal: "Midsection fat reduction and core strength",
        difficulty: "Beginner",
        duration: 35,
        frequency: "3x/week",
        focusScore: 90,
        brandColor: "#8b5cf6",
        icon: "🎯",
        proTip:
          "You cannot spot-reduce belly fat, but building a strong core underneath accelerates overall metabolic rate and improves posture.",
        exercises: [
          { name: "Plank (Standard)", sets: 4, reps: "45 sec", rest: "30s", tip: "Think 'create full body tension' not just hold the position.", muscleGroup: "Core" },
          { name: "Dead Bug", sets: 3, reps: "10 each side", rest: "45s", tip: "Lower back must stay flat — move slowly.", muscleGroup: "Deep Core" },
          { name: "Bicycle Crunch", sets: 3, reps: "20 total", rest: "45s", tip: "Rotate fully — elbow to opposite knee.", muscleGroup: "Obliques/Abs" },
          { name: "Reverse Crunch", sets: 4, reps: "15", rest: "45s", tip: "Curl hips toward ceiling — not just lifting legs.", muscleGroup: "Lower Abs" },
          { name: "Jump Rope", sets: 5, reps: "60 sec", rest: "30s", tip: "Best low-impact calorie burner. Aim 120+ RPM.", muscleGroup: "Full Body/Cardio" },
        ],
      },
      {
        id: "endo-upper-recomp",
        name: "Upper Body Recomposition",
        goal: "Muscle retention while losing fat",
        difficulty: "Intermediate",
        duration: 50,
        frequency: "2x/week",
        focusScore: 87,
        brandColor: "#0ea5e9",
        icon: "💪",
        proTip:
          "Moderate weight with shorter rest (60s) and supersets keeps heart rate high — you get both a strength and cardio stimulus simultaneously.",
        exercises: [
          { name: "Cable Row (Close Grip)", sets: 4, reps: "12-15", rest: "60s", tip: "Squeeze at full contraction — 1 sec hold.", muscleGroup: "Back" },
          { name: "Dumbbell Shoulder Press", sets: 3, reps: "12-15", rest: "60s", tip: "Neutral grip reduces rotator cuff stress.", muscleGroup: "Shoulders" },
          { name: "Lat Pulldown (Wide Grip)", sets: 3, reps: "12-15", rest: "60s", tip: "Pull to upper chest, not behind neck.", muscleGroup: "Lats" },
          { name: "Dumbbell Bicep Curl (21s)", sets: 3, reps: "21", rest: "75s", tip: "7 bottom half + 7 top half + 7 full range.", muscleGroup: "Biceps" },
          { name: "Tricep Rope Pushdown", sets: 3, reps: "15-20", rest: "45s", tip: "Spread rope at bottom for long head activation.", muscleGroup: "Triceps" },
        ],
      },
    ],
    weekPlan: [
      { day: 1, label: "Monday", focus: "Full Body Fat Burner Circuit", type: "training", routineId: "endo-fat-burner" },
      { day: 2, label: "Tuesday", focus: "Cardio — 45 min Incline Treadmill + LISS", type: "active-recovery", notes: "Maintain 60–70% max heart rate. LISS = fat oxidation zone." },
      { day: 3, label: "Wednesday", focus: "Cardio-Strength Hybrid", type: "training", routineId: "endo-cardio-strength" },
      { day: 4, label: "Thursday", focus: "Core Blast & Ab Definition", type: "training", routineId: "endo-core-burn" },
      { day: 5, label: "Friday", focus: "Full Body Fat Burner Circuit (Repeat)", type: "training", routineId: "endo-fat-burner", notes: "Increase weights or reduce rest by 5s vs Monday." },
      { day: 6, label: "Saturday", focus: "Upper Body Recomposition", type: "training", routineId: "endo-upper-recomp" },
      { day: 7, label: "Sunday", focus: "Active Recovery — 30 min Walk", type: "active-recovery", notes: "Light walk, mobility drills, foam rolling. No structured training." },
    ],
  },

  // ── RECTANGLE (RULER) MALE ────────────────────────────────────────────────
  {
    id: "rectangle",
    gender: "male",
    name: "Rectangle / Ruler",
    shortDesc: "Even proportions, balanced metabolism, versatile trainer",
    longDesc:
      "Rectangle-shaped men have shoulders, chest, and hips at similar widths with minimal waist definition. The training goal is to create the illusion of a V-taper: build shoulder width, add chest thickness, grow glutes and quads, and define the waist through core work.",
    characteristics: [
      "Similar shoulder, chest, and hip width",
      "Low natural waist definition",
      "Average to moderate metabolism",
      "Good foundation for any style of training",
    ],
    goals: ["Create V-taper (shoulder width)", "Add waist definition", "Build balanced physique"],
    avoid: [
      "Neglecting shoulder volume — they are your most important feature",
      "Excessive ab isolation without compound core work",
      "Skipping leg work — leg mass adds to overall size",
    ],
    nutritionTip:
      "Maintenance to slight surplus (200 kcal). Standard 1.8 g/kg protein. No aggressive cut needed — focus on body recomposition through consistent training.",
    keyFocusAreas: ["Shoulders (Width)", "V-Taper", "Waist Definition", "Balanced Symmetry"],
    routines: [
      {
        id: "rect-vtaper",
        name: "V-Taper Builder",
        goal: "Shoulder width and lat flare for V-taper",
        difficulty: "Intermediate",
        duration: 60,
        frequency: "3x/week",
        focusScore: 97,
        brandColor: "#6366f1",
        icon: "⬛",
        proTip:
          "The V-taper formula: wide lats + wide lateral deltoids + narrow waist. Lateral raises and wide-grip pull-ups are the fastest route.",
        exercises: [
          { name: "Wide-Grip Pull-Up", sets: 4, reps: "8-10", rest: "90s", tip: "Pull elbows to hip pockets, not just chin up.", muscleGroup: "Lats" },
          { name: "Dumbbell Lateral Raise (Seated)", sets: 5, reps: "15-20", rest: "45s", tip: "5 sets of lateral raises per session — key for width.", muscleGroup: "Side Delts" },
          { name: "Cable Pullover", sets: 4, reps: "12-15", rest: "60s", tip: "Stretch the lat fully at the top.", muscleGroup: "Lats/Serratus" },
          { name: "Overhead Press (Wide Grip)", sets: 4, reps: "8-10", rest: "90s", tip: "Slightly wider than shoulder-width builds more lateral delt.", muscleGroup: "Shoulders" },
          { name: "Straight-Arm Lat Pulldown", sets: 3, reps: "15", rest: "60s", tip: "The best isolation for lat flare.", muscleGroup: "Lats" },
        ],
      },
      {
        id: "rect-balanced",
        name: "Balanced Full Body Routine",
        goal: "Overall muscle symmetry",
        difficulty: "Beginner",
        duration: 55,
        frequency: "3x/week",
        focusScore: 91,
        brandColor: "#14b8a6",
        icon: "⚖️",
        proTip:
          "Alternate between pushing, pulling, and leg patterns. Never skip a muscle group two weeks in a row.",
        exercises: [
          { name: "Squat", sets: 4, reps: "8-10", rest: "90s", tip: "Foundational movement for lower body mass.", muscleGroup: "Legs" },
          { name: "Push-Up to T-Plank", sets: 3, reps: "10", rest: "60s", tip: "Rotation adds shoulder stability.", muscleGroup: "Chest/Shoulders" },
          { name: "TRX or Cable Row", sets: 4, reps: "12", rest: "60s", tip: "Horizontal pull balances all the pressing.", muscleGroup: "Back" },
          { name: "Dumbbell Reverse Lunge", sets: 3, reps: "10 each", rest: "60s", tip: "Rear foot stays behind — activates glutes more.", muscleGroup: "Glutes/Legs" },
          { name: "Dumbbell Shrug + Lateral Raise Combo", sets: 3, reps: "12", rest: "60s", tip: "Superset for trap and delt width together.", muscleGroup: "Shoulders/Traps" },
        ],
      },
      {
        id: "rect-core-definition",
        name: "Waist Definition Core Program",
        goal: "Reduce waist, define obliques",
        difficulty: "Beginner",
        duration: 30,
        frequency: "4x/week",
        focusScore: 88,
        brandColor: "#f43f5e",
        icon: "🎯",
        proTip:
          "Oblique training creates the illusion of a narrower waist by building the muscle that 'frames' it. Don't neglect the sides.",
        exercises: [
          { name: "Side Plank (Each Side)", sets: 3, reps: "40 sec", rest: "30s", tip: "Stack feet, hips high — no sagging.", muscleGroup: "Obliques" },
          { name: "Woodchop (Cable)", sets: 3, reps: "12 each", rest: "45s", tip: "Rotate from the hips, not just arms.", muscleGroup: "Obliques/Core" },
          { name: "Pallof Press", sets: 3, reps: "12 each", rest: "45s", tip: "Anti-rotation exercise — resist the cable, don't follow it.", muscleGroup: "Deep Core" },
          { name: "Hollow Body Hold", sets: 4, reps: "30 sec", rest: "30s", tip: "Arms and legs both straight, lower back pressed to floor.", muscleGroup: "Abs" },
          { name: "Dragon Flag (Negative)", sets: 3, reps: "6", rest: "60s", tip: "Lower slowly — 4 seconds down.", muscleGroup: "Core/Lower Abs" },
        ],
      },
      {
        id: "rect-chest-build",
        name: "Chest Thickness Builder",
        goal: "Add chest depth and upper body mass",
        difficulty: "Intermediate",
        duration: 50,
        frequency: "2x/week",
        focusScore: 85,
        brandColor: "#d97706",
        icon: "🏋️",
        proTip:
          "A thick chest on a rectangle frame makes the upper body appear significantly wider and more defined.",
        exercises: [
          { name: "Flat Barbell Bench Press", sets: 4, reps: "6-8", rest: "120s", tip: "Arch the chest, not the lower back.", muscleGroup: "Chest" },
          { name: "Incline Dumbbell Flye", sets: 3, reps: "12-15", rest: "60s", tip: "Stretch the pec fully at the bottom.", muscleGroup: "Upper Chest" },
          { name: "Decline Push-Up", sets: 3, reps: "15", rest: "60s", tip: "Feet elevated targets upper chest — great bodyweight option.", muscleGroup: "Upper Chest" },
          { name: "Cable Crossover (Low to High)", sets: 3, reps: "15", rest: "60s", tip: "Squeeze hands together at the top.", muscleGroup: "Inner Chest" },
          { name: "Dumbbell Pullover", sets: 3, reps: "12", rest: "75s", tip: "Works both chest and lats — perfect for the rectangle shape.", muscleGroup: "Chest/Lats" },
        ],
      },
    ],
    weekPlan: [
      { day: 1, label: "Monday", focus: "V-Taper Builder — Shoulders & Lats", type: "training", routineId: "rect-vtaper" },
      { day: 2, label: "Tuesday", focus: "Chest Thickness Builder", type: "training", routineId: "rect-chest-build" },
      { day: 3, label: "Wednesday", focus: "Waist Definition Core + 20 min Cardio", type: "training", routineId: "rect-core-definition" },
      { day: 4, label: "Thursday", focus: "V-Taper Builder (Repeat)", type: "training", routineId: "rect-vtaper", notes: "Add 1 extra lateral raise set. Increase weight if possible." },
      { day: 5, label: "Friday", focus: "Balanced Full Body Routine", type: "training", routineId: "rect-balanced" },
      { day: 6, label: "Saturday", focus: "Waist Definition Core + Cardio 30 min", type: "training", routineId: "rect-core-definition" },
      { day: 7, label: "Sunday", focus: "Rest", type: "rest", notes: "Mobility work, foam rolling." },
    ],
  },
];

// ── FEMALE SHAPES ─────────────────────────────────────────────────────────────

export const femaleShapes: ShapeData[] = [
  // ── PEAR / TRIANGLE ───────────────────────────────────────────────────────
  {
    id: "pear",
    gender: "female",
    name: "Pear / Triangle",
    shortDesc: "Wider hips and thighs, narrower shoulders and bust",
    longDesc:
      "Pear-shaped women carry weight in the hips, thighs, and glutes while the upper body is narrower. The gym goal is to build shoulder and back width to balance proportions, while sculpting and toning the lower body.",
    characteristics: [
      "Hips wider than bust and shoulders",
      "Defined waist, heavier lower body",
      "Strong glutes and thighs naturally",
      "Tends to gain weight in hips and thighs first",
    ],
    goals: ["Balance upper-to-lower body ratio", "Sculpt and tone legs/glutes", "Build upper body width"],
    avoid: [
      "Excessive lower body volume — already well developed",
      "Skipping upper body — it creates the balance you need",
      "Only doing cardio — resistance training reshapes more effectively",
    ],
    nutritionTip:
      "Moderate caloric deficit (200–300 kcal) if fat loss is the goal. Higher protein (1.8 g/kg) to support muscle sculpting. Reduce processed carbs and sodium to reduce water retention in lower body.",
    keyFocusAreas: ["Shoulders", "Back Width", "Arms", "Glute Shaping (not mass)"],
    routines: [
      {
        id: "pear-upper-balance",
        name: "Upper Body Balance Workout",
        goal: "Build shoulder width and back to balance hips",
        difficulty: "Beginner",
        duration: 45,
        frequency: "3x/week",
        focusScore: 97,
        brandColor: "#ec4899",
        icon: "💪",
        proTip:
          "Every pear-shape woman should do lateral raises 3x per week minimum. Wide shoulders create an optical illusion that makes hips appear narrower instantly.",
        exercises: [
          { name: "Dumbbell Lateral Raise", sets: 4, reps: "12-15", rest: "45s", tip: "Lead with elbows, arms slightly bent.", muscleGroup: "Side Deltoid" },
          { name: "Seated Row (Cable)", sets: 4, reps: "12-15", rest: "60s", tip: "Squeeze shoulder blades together at the end of the movement.", muscleGroup: "Back" },
          { name: "Overhead Press (Dumbbell)", sets: 3, reps: "10-12", rest: "60s", tip: "Full overhead extension adds shoulder height.", muscleGroup: "Shoulders" },
          { name: "Wide-Grip Lat Pulldown", sets: 3, reps: "12-15", rest: "60s", tip: "Widen the lats — this creates your V-shape.", muscleGroup: "Lats" },
          { name: "Upright Row", sets: 3, reps: "12", rest: "60s", tip: "Elbows should lead and stay above wrists.", muscleGroup: "Shoulders/Traps" },
        ],
      },
      {
        id: "pear-glute-sculpt",
        name: "Glute Sculpt & Tone",
        goal: "Shape and lift glutes without adding hip mass",
        difficulty: "Intermediate",
        duration: 50,
        frequency: "2x/week",
        focusScore: 93,
        brandColor: "#a855f7",
        icon: "🍑",
        proTip:
          "For pear shapes, glute training is about shaping and lifting — not adding mass. Use moderate weights, high reps, and focus on the mind-muscle connection.",
        exercises: [
          { name: "Hip Thrust (Barbell or Bodyweight)", sets: 4, reps: "15-20", rest: "60s", tip: "Full hip extension — squeeze at the top for 1 second.", muscleGroup: "Glutes" },
          { name: "Romanian Deadlift (Light-Moderate)", sets: 3, reps: "15", rest: "60s", tip: "Feel the hamstring stretch — this is a shaping exercise.", muscleGroup: "Glutes/Hamstrings" },
          { name: "Sumo Squat (Wide Stance)", sets: 3, reps: "15-20", rest: "60s", tip: "Toes out 45°, push knees out over toes.", muscleGroup: "Inner Thighs/Glutes" },
          { name: "Donkey Kick (Cable or Band)", sets: 3, reps: "15 each", rest: "45s", tip: "Isolate glute max — don't swing the hip.", muscleGroup: "Glutes" },
          { name: "Clamshell (Band)", sets: 3, reps: "20 each", rest: "30s", tip: "Works glute medius — key for round, lifted shape.", muscleGroup: "Glute Medius" },
        ],
      },
      {
        id: "pear-cardio-tone",
        name: "Full Body Cardio Sculpt",
        goal: "Overall fat loss and body toning",
        difficulty: "Beginner",
        duration: 40,
        frequency: "3x/week",
        focusScore: 89,
        brandColor: "#f43f5e",
        icon: "🏃",
        proTip:
          "For pear shapes, cardio that emphasises upper body (rowing, swimming, elliptical with arms) burns calories while building shoulder definition simultaneously.",
        exercises: [
          { name: "Rowing Machine", sets: 1, reps: "10 min", rest: "0s", tip: "Rowing is 60% legs, 40% upper body — perfect balance for pear shapes.", muscleGroup: "Full Body" },
          { name: "Resistance Band Squat to Press", sets: 3, reps: "15", rest: "45s", tip: "Combines lower body work with upper body press.", muscleGroup: "Full Body" },
          { name: "Step-Up with Shoulder Press", sets: 3, reps: "12 each", rest: "45s", tip: "The press while stepping redirects attention to shoulders.", muscleGroup: "Legs + Shoulders" },
          { name: "Plank Shoulder Tap", sets: 3, reps: "20 total", rest: "45s", tip: "Squeeze glutes to keep hips stable.", muscleGroup: "Core/Shoulders" },
          { name: "Jump Rope or Skip", sets: 5, reps: "60 sec", rest: "30s", tip: "Low-impact, high calorie burn. Great for pear shapes.", muscleGroup: "Cardio" },
        ],
      },
      {
        id: "pear-inner-thigh",
        name: "Inner Thigh & Leg Toning",
        goal: "Slim and tone inner thighs and legs",
        difficulty: "Beginner",
        duration: 35,
        frequency: "2x/week",
        focusScore: 86,
        brandColor: "#f59e0b",
        icon: "✨",
        proTip:
          "Inner thigh exercises combined with overall fat loss create the lean, toned look. Use light-moderate weight and high reps (15-25).",
        exercises: [
          { name: "Sumo Squat Pulse", sets: 3, reps: "30 pulses", rest: "45s", tip: "Small range pulses in the lowest position burn deeply.", muscleGroup: "Inner Thighs" },
          { name: "Cable Hip Adduction", sets: 3, reps: "15 each", rest: "45s", tip: "Control the movement — no swinging.", muscleGroup: "Inner Thigh" },
          { name: "Side Lunge (Bodyweight)", sets: 3, reps: "12 each", rest: "45s", tip: "Push through heel of bent leg to return.", muscleGroup: "Inner Thigh/Glutes" },
          { name: "Wall Sit (30 sec)", sets: 4, reps: "30 sec", rest: "30s", tip: "90° knee angle. Add a squeeze of a ball between knees for inner thigh.", muscleGroup: "Quads/Inner Thigh" },
          { name: "Leg Raise (Lying, Crossed)", sets: 3, reps: "15", rest: "45s", tip: "Cross ankles as you raise for adductor activation.", muscleGroup: "Lower Abs/Inner Thigh" },
        ],
      },
    ],
    weekPlan: [
      { day: 1, label: "Monday", focus: "Upper Body Balance Workout", type: "training", routineId: "pear-upper-balance" },
      { day: 2, label: "Tuesday", focus: "Glute Sculpt & Tone", type: "training", routineId: "pear-glute-sculpt" },
      { day: 3, label: "Wednesday", focus: "Full Body Cardio Sculpt", type: "training", routineId: "pear-cardio-tone" },
      { day: 4, label: "Thursday", focus: "Upper Body Balance Workout (Repeat)", type: "training", routineId: "pear-upper-balance", notes: "Add 1 extra set of lateral raises." },
      { day: 5, label: "Friday", focus: "Inner Thigh & Leg Toning", type: "training", routineId: "pear-inner-thigh" },
      { day: 6, label: "Saturday", focus: "Full Body Cardio Sculpt OR Yoga", type: "training", routineId: "pear-cardio-tone", notes: "Swap for a 60-min yoga class for active recovery alternative." },
      { day: 7, label: "Sunday", focus: "Rest + Stretching", type: "rest", notes: "Hip flexor and hamstring stretching is especially important for pear shapes." },
    ],
  },

  // ── APPLE / ROUND ─────────────────────────────────────────────────────────
  {
    id: "apple",
    gender: "female",
    name: "Apple / Round",
    shortDesc: "Fuller midsection, slimmer legs and arms",
    longDesc:
      "Apple-shaped women carry more weight around the midsection with slimmer legs and arms. The workout focus is on cardiovascular health, core strengthening, and overall fat reduction — especially the visceral fat around the midsection which has the greatest health implications.",
    characteristics: [
      "Fuller bust and waist, slimmer hips and legs",
      "Tends to gain weight in upper abdomen first",
      "Slim arms and legs relative to torso",
      "Often has a larger chest",
    ],
    goals: ["Reduce midsection fat", "Improve cardiovascular health", "Strengthen and lengthen the core"],
    avoid: [
      "Crunches and sit-ups as the main core work — they worsen posture",
      "Ignoring cardio — metabolic health is a priority for this shape",
      "Very heavy loading with poor core stability",
    ],
    nutritionTip:
      "Prioritise anti-inflammatory foods. Reduce refined sugars (linked to visceral fat). 300–400 kcal deficit. Emphasise fibre (25–30g/day) and lean protein (1.6 g/kg). Avoid processed food as a priority.",
    keyFocusAreas: ["Cardiovascular health", "Core (deep stabilisers)", "Lower Body Sculpting", "Upper Body Toning"],
    routines: [
      {
        id: "apple-cardio-core",
        name: "Cardio + Core Priority",
        goal: "Visceral fat reduction and core strength",
        difficulty: "Beginner",
        duration: 45,
        frequency: "4x/week",
        focusScore: 96,
        brandColor: "#f97316",
        icon: "🔥",
        proTip:
          "Combine 25 min cardio with 20 min deep core work every session. This combination is the most effective approach for reducing midsection fat clinically.",
        exercises: [
          { name: "Elliptical (Arms On)", sets: 1, reps: "20 min", rest: "0s", tip: "Use the arm handles — burns 30% more calories and tones upper arms.", muscleGroup: "Full Body Cardio" },
          { name: "Dead Bug", sets: 4, reps: "8 each side", rest: "30s", tip: "Breathing: exhale as you lower the limbs.", muscleGroup: "Deep Core" },
          { name: "Bird Dog", sets: 3, reps: "10 each side", rest: "30s", tip: "Opposite arm and leg — keep hips square.", muscleGroup: "Core Stabilisers" },
          { name: "Standing Oblique Crunch", sets: 3, reps: "20 each", rest: "30s", tip: "Elbow to knee while standing — no lower back strain.", muscleGroup: "Obliques" },
          { name: "Modified Plank (Knees)", sets: 4, reps: "40 sec", rest: "30s", tip: "Build to full plank over 4 weeks.", muscleGroup: "Core" },
        ],
      },
      {
        id: "apple-lower-sculpt",
        name: "Lower Body Sculpt",
        goal: "Shape and strengthen slimmer legs",
        difficulty: "Beginner",
        duration: 40,
        frequency: "2x/week",
        focusScore: 91,
        brandColor: "#22c55e",
        icon: "🦵",
        proTip:
          "Building lean leg and glute muscle increases your total metabolic rate, helping burn abdominal fat even at rest.",
        exercises: [
          { name: "Goblet Squat (Light)", sets: 4, reps: "15-20", rest: "60s", tip: "Hold dumbbell at chest, elbows in.", muscleGroup: "Quads/Glutes" },
          { name: "Glute Bridge (Bodyweight)", sets: 4, reps: "20", rest: "45s", tip: "Squeeze glutes hard at the top — hold 1 second.", muscleGroup: "Glutes" },
          { name: "Step-Ups (Low Box)", sets: 3, reps: "12 each", rest: "45s", tip: "Drive through the heel of the lead foot.", muscleGroup: "Glutes/Legs" },
          { name: "Lying Inner Thigh Raise", sets: 3, reps: "20 each", rest: "30s", tip: "Lift from hip, not foot — slight internal rotation.", muscleGroup: "Inner Thigh" },
          { name: "Calf Raise (Bodyweight)", sets: 3, reps: "25", rest: "30s", tip: "Full range at top and bottom.", muscleGroup: "Calves" },
        ],
      },
      {
        id: "apple-upper-tone",
        name: "Upper Body Toning & Posture",
        goal: "Tone arms, improve posture, elongate silhouette",
        difficulty: "Beginner",
        duration: 40,
        frequency: "2x/week",
        focusScore: 88,
        brandColor: "#06b6d4",
        icon: "💪",
        proTip:
          "Posture work is critical for apple shapes — improving thoracic extension makes the torso appear longer and the midsection less prominent.",
        exercises: [
          { name: "Face Pull (Cable/Band)", sets: 4, reps: "15", rest: "45s", tip: "Pulls shoulders back and improves posture dramatically.", muscleGroup: "Rear Delt/Posture" },
          { name: "Tricep Dip (Bench)", sets: 3, reps: "12-15", rest: "60s", tip: "Keep back close to bench — arms do the work.", muscleGroup: "Triceps" },
          { name: "Band Pull-Apart", sets: 4, reps: "20", rest: "30s", tip: "Keep arms straight throughout the movement.", muscleGroup: "Upper Back/Posture" },
          { name: "Dumbbell Bicep Curl", sets: 3, reps: "15", rest: "45s", tip: "Alternate arms for better core stability.", muscleGroup: "Biceps" },
          { name: "Lat Pulldown (Machine)", sets: 3, reps: "12-15", rest: "60s", tip: "Creates the shoulder-width illusion that lengthens the torso.", muscleGroup: "Lats" },
        ],
      },
      {
        id: "apple-hiit-burn",
        name: "Low-Impact HIIT",
        goal: "Calorie burning without joint stress",
        difficulty: "Intermediate",
        duration: 35,
        frequency: "2x/week",
        focusScore: 90,
        brandColor: "#e11d48",
        icon: "⚡",
        proTip:
          "Low-impact HIIT (no jumping) is ideal for apple shapes — same calorie burn as high-impact but easier on knees and back.",
        exercises: [
          { name: "Kettlebell Swing (Light)", sets: 4, reps: "20", rest: "45s", tip: "All in the hips — not a squat.", muscleGroup: "Posterior Chain" },
          { name: "Standing Bicycle (No floor)", sets: 4, reps: "30 sec", rest: "30s", tip: "Keeps core upright — better for larger torso.", muscleGroup: "Obliques/Cardio" },
          { name: "Resistance Band Walk (Lateral)", sets: 3, reps: "15 each", rest: "30s", tip: "Band around ankles, toes forward, squat lightly.", muscleGroup: "Glute Medius" },
          { name: "March in Place (High Knee)", sets: 4, reps: "40 sec", rest: "20s", tip: "Drive arms to increase heart rate.", muscleGroup: "Cardio/Core" },
          { name: "Wall Push-Up", sets: 4, reps: "15", rest: "30s", tip: "Excellent upper body entry movement — progress to incline then floor.", muscleGroup: "Chest/Shoulders" },
        ],
      },
    ],
    weekPlan: [
      { day: 1, label: "Monday", focus: "Cardio + Core Priority", type: "training", routineId: "apple-cardio-core" },
      { day: 2, label: "Tuesday", focus: "Lower Body Sculpt", type: "training", routineId: "apple-lower-sculpt" },
      { day: 3, label: "Wednesday", focus: "Low-Impact HIIT", type: "training", routineId: "apple-hiit-burn" },
      { day: 4, label: "Thursday", focus: "Upper Body Toning & Posture", type: "training", routineId: "apple-upper-tone" },
      { day: 5, label: "Friday", focus: "Cardio + Core Priority (Repeat)", type: "training", routineId: "apple-cardio-core", notes: "Increase cardio by 5 minutes each week." },
      { day: 6, label: "Saturday", focus: "Active Recovery — Swimming or Walking", type: "active-recovery", notes: "Swimming is the #1 cross-training activity for apple shapes — full body, low-impact, and great calorie burn." },
      { day: 7, label: "Sunday", focus: "Full Rest", type: "rest", notes: "Prioritise 7–8 hours sleep — cortisol from poor sleep is directly linked to abdominal fat storage." },
    ],
  },

  // ── HOURGLASS ─────────────────────────────────────────────────────────────
  {
    id: "hourglass",
    gender: "female",
    name: "Hourglass",
    shortDesc: "Balanced bust and hips, defined natural waist",
    longDesc:
      "Hourglass women have nearly equal bust and hip measurements with a significantly narrower waist. The gym goal is to maintain and enhance this natural symmetry — building curves proportionally without losing the waist definition that defines the shape.",
    characteristics: [
      "Bust and hips approximately equal in width",
      "Well-defined, narrow waist",
      "Gains weight proportionally (all over)",
      "Naturally curvy silhouette",
    ],
    goals: ["Maintain and enhance natural curves", "Build glutes and chest proportionally", "Preserve waist definition"],
    avoid: [
      "Heavy oblique isolation (side bends, loaded twists) — can widen the waist",
      "Neglecting glute work — it keeps the hip-to-waist ratio defined",
      "Only doing cardio without resistance training",
    ],
    nutritionTip:
      "Maintenance calories or very slight deficit (150–200 kcal). Consistent protein (1.6–1.8 g/kg) to maintain muscle curves. Focus on food quality over restriction.",
    keyFocusAreas: ["Glutes", "Chest", "Waist (Maintenance)", "Full Body Curves"],
    routines: [
      {
        id: "hour-curves",
        name: "Curve-Building Full Body",
        goal: "Enhance natural curves symmetrically",
        difficulty: "Intermediate",
        duration: 55,
        frequency: "3x/week",
        focusScore: 96,
        brandColor: "#f43f5e",
        icon: "⏳",
        proTip:
          "Hourglass training is about volume and proportion. Build chest and glutes equally to maintain your natural waist-to-hip ratio.",
        exercises: [
          { name: "Barbell Hip Thrust", sets: 4, reps: "12-15", rest: "75s", tip: "Bar padded, drive through heels, full extension.", muscleGroup: "Glutes" },
          { name: "Incline Dumbbell Press", sets: 4, reps: "10-12", rest: "75s", tip: "30° incline — upper chest lift creates a 'fuller bust' appearance.", muscleGroup: "Upper Chest" },
          { name: "Romanian Deadlift", sets: 3, reps: "12", rest: "60s", tip: "Weight close to legs throughout.", muscleGroup: "Glutes/Hamstrings" },
          { name: "Cable Flye (Low to High)", sets: 3, reps: "15", rest: "60s", tip: "Keeps upper chest tension throughout the lift.", muscleGroup: "Chest" },
          { name: "Standing Glute Kickback (Cable)", sets: 3, reps: "15 each", rest: "45s", tip: "Isolates glute max for the rounded 'peak'.", muscleGroup: "Glutes" },
        ],
      },
      {
        id: "hour-waist",
        name: "Waist Definition & Core Toning",
        goal: "Preserve and define natural waist",
        difficulty: "Intermediate",
        duration: 35,
        frequency: "3x/week",
        focusScore: 93,
        brandColor: "#ec4899",
        icon: "✨",
        proTip:
          "For hourglasses, keep all core work in the sagittal plane (forward/backward). Avoid loaded lateral flexion (heavy side bends) which can widen the waist.",
        exercises: [
          { name: "Vacuum Exercise (Standing)", sets: 4, reps: "30 sec", rest: "30s", tip: "Deep exhale, then pull belly button to spine. Best for waist cinching.", muscleGroup: "Transverse Abs" },
          { name: "Cable Crunch", sets: 4, reps: "15-20", rest: "45s", tip: "Avoid any lateral rotation.", muscleGroup: "Rectus Abdominis" },
          { name: "Leg Raise (Hanging or Lying)", sets: 3, reps: "12-15", rest: "60s", tip: "Control descent — don't swing.", muscleGroup: "Lower Abs" },
          { name: "Plank (Arms Extended)", sets: 3, reps: "45 sec", rest: "30s", tip: "Arms extended plank activates more transverse abdominis.", muscleGroup: "Core" },
          { name: "Kneeling Cable Crunch", sets: 3, reps: "15", rest: "45s", tip: "Round the spine — full contraction.", muscleGroup: "Abs" },
        ],
      },
      {
        id: "hour-glute-peak",
        name: "Glute Peak & Leg Sculpt",
        goal: "Build rounded, lifted glutes and toned legs",
        difficulty: "Intermediate",
        duration: 50,
        frequency: "2x/week",
        focusScore: 91,
        brandColor: "#8b5cf6",
        icon: "🍑",
        proTip:
          "Hourglass shapes benefit from 'glute specialisation' — prioritising 3 types of glute work: hip thrust (max), kickback (isolation), and lateral band work (medius).",
        exercises: [
          { name: "Bulgarian Split Squat", sets: 4, reps: "10-12 each", rest: "75s", tip: "Front foot far from bench — targets glute, not quad.", muscleGroup: "Glutes/Quads" },
          { name: "Cable Kickback (Hip Extension)", sets: 4, reps: "15 each", rest: "45s", tip: "Keep hips still — pure glute work.", muscleGroup: "Glutes" },
          { name: "Leg Press (Feet High, Wide)", sets: 3, reps: "15-20", rest: "60s", tip: "High foot placement = more glute emphasis.", muscleGroup: "Glutes" },
          { name: "Lateral Band Walk", sets: 3, reps: "15 each", rest: "30s", tip: "Keep toes forward — targets glute medius for rounded sides.", muscleGroup: "Glute Medius" },
          { name: "Stiff-Leg Deadlift", sets: 3, reps: "12", rest: "60s", tip: "Feel the hamstring stretch throughout.", muscleGroup: "Hamstrings/Glutes" },
        ],
      },
      {
        id: "hour-full-body",
        name: "Full Body Sculpt Circuit",
        goal: "Overall conditioning and body maintenance",
        difficulty: "Beginner",
        duration: 45,
        frequency: "2x/week",
        focusScore: 87,
        brandColor: "#14b8a6",
        icon: "🏋️",
        proTip:
          "Maintain the hourglass by never neglecting any major muscle group. This circuit hits everything proportionally.",
        exercises: [
          { name: "Sumo Deadlift", sets: 3, reps: "12", rest: "60s", tip: "Wide stance activates inner thighs and glutes.", muscleGroup: "Full Posterior" },
          { name: "Push-Up (Full or Modified)", sets: 3, reps: "12-15", rest: "60s", tip: "Full range — nose to floor.", muscleGroup: "Chest/Shoulders" },
          { name: "Dumbbell Row (Single Arm)", sets: 3, reps: "12 each", rest: "45s", tip: "Elbow drives to hip, not ceiling.", muscleGroup: "Back" },
          { name: "Dumbbell Reverse Lunge", sets: 3, reps: "10 each", rest: "45s", tip: "Keep torso upright.", muscleGroup: "Glutes/Legs" },
          { name: "Band Pull-Apart", sets: 3, reps: "20", rest: "30s", tip: "Great for rear delt and posture.", muscleGroup: "Rear Delts/Posture" },
        ],
      },
    ],
    weekPlan: [
      { day: 1, label: "Monday", focus: "Curve-Building Full Body", type: "training", routineId: "hour-curves" },
      { day: 2, label: "Tuesday", focus: "Waist Definition & Core Toning", type: "training", routineId: "hour-waist" },
      { day: 3, label: "Wednesday", focus: "30 min Cardio (Cycling or Elliptical)", type: "active-recovery", notes: "Moderate intensity. Burns calories without risking waist widening from heavy carries." },
      { day: 4, label: "Thursday", focus: "Glute Peak & Leg Sculpt", type: "training", routineId: "hour-glute-peak" },
      { day: 5, label: "Friday", focus: "Curve-Building Full Body (Repeat)", type: "training", routineId: "hour-curves" },
      { day: 6, label: "Saturday", focus: "Full Body Sculpt Circuit", type: "training", routineId: "hour-full-body" },
      { day: 7, label: "Sunday", focus: "Rest + Stretch", type: "rest", notes: "Hip flexor stretch, chest stretch, and pigeon pose for glute recovery." },
    ],
  },

  // ── RECTANGLE (FEMALE) ────────────────────────────────────────────────────
  {
    id: "rectangle",
    gender: "female",
    name: "Rectangle",
    shortDesc: "Balanced proportions, minimal waist curve",
    longDesc:
      "Rectangle-shaped women have similar measurements across bust, waist, and hips with minimal waist definition. Training focuses on building curves: growing glutes and chest while creating waist definition to achieve an hourglass-like appearance.",
    characteristics: [
      "Shoulder, waist, and hip measurements are similar",
      "Athletic, straight figure",
      "Low body fat in most cases",
      "Fast or moderate metabolism",
    ],
    goals: ["Build glutes and chest to create curves", "Define the waist", "Add feminine muscle shape"],
    avoid: [
      "Only doing endurance cardio — it keeps the body 'flat'",
      "Neglecting glute volume — it's your biggest curve lever",
      "Heavy loaded oblique work without equal glute volume",
    ],
    nutritionTip:
      "Maintenance or slight surplus (150–200 kcal) to support muscle growth. Adequate protein (1.8 g/kg) for curve building. Don't under-eat — curves require calories.",
    keyFocusAreas: ["Glutes (Priority)", "Chest", "Waist Definition", "Overall Curves"],
    routines: [
      {
        id: "rect-f-glute",
        name: "Glute Growth Protocol",
        goal: "Build round, full glutes to create curves",
        difficulty: "Intermediate",
        duration: 55,
        frequency: "3x/week",
        focusScore: 97,
        brandColor: "#d946ef",
        icon: "🍑",
        proTip:
          "For rectangle shapes, glute building is the fastest way to create the illusion of curves. Aim for progressive overload on hip thrusts every single session.",
        exercises: [
          { name: "Barbell Hip Thrust", sets: 5, reps: "10-12", rest: "90s", tip: "Add 2.5 kg every 1–2 weeks. This is your primary growth lift.", muscleGroup: "Glutes" },
          { name: "Back Squat (Moderate)", sets: 4, reps: "10-12", rest: "90s", tip: "Hip-width stance, break parallel.", muscleGroup: "Glutes/Quads" },
          { name: "Cable Kickback", sets: 4, reps: "15 each", rest: "45s", tip: "Focus on the squeeze — full hip extension.", muscleGroup: "Glutes" },
          { name: "Walking Lunge (Dumbbell)", sets: 3, reps: "12 each", rest: "60s", tip: "Long stride for maximum glute stretch.", muscleGroup: "Glutes/Legs" },
          { name: "Glute Bridge Pulse (Band)", sets: 3, reps: "30 pulses", rest: "30s", tip: "Burn finisher — max blood flow to glutes.", muscleGroup: "Glutes" },
        ],
      },
      {
        id: "rect-f-chest",
        name: "Chest Curve Builder",
        goal: "Build upper chest for a curvier upper body",
        difficulty: "Beginner",
        duration: 40,
        frequency: "2x/week",
        focusScore: 91,
        brandColor: "#f472b6",
        icon: "💫",
        proTip:
          "Upper pec training creates a lifted, full chest appearance. Incline movements are your priority for this shape.",
        exercises: [
          { name: "Incline Push-Up (Progressing to Flat)", sets: 4, reps: "12-15", rest: "60s", tip: "Progress: wall → incline → flat over 4 weeks.", muscleGroup: "Upper Chest" },
          { name: "Incline Dumbbell Press", sets: 4, reps: "10-12", rest: "75s", tip: "Control the descent for deeper pec stretch.", muscleGroup: "Upper Chest" },
          { name: "Cable Flye", sets: 3, reps: "12-15", rest: "60s", tip: "Constant tension throughout the movement.", muscleGroup: "Chest" },
          { name: "Dumbbell Pullover", sets: 3, reps: "12", rest: "60s", tip: "Works chest and lats together.", muscleGroup: "Chest/Lats" },
          { name: "Chest Dip (Assisted)", sets: 3, reps: "10-12", rest: "75s", tip: "Lean slightly forward for chest emphasis.", muscleGroup: "Chest/Triceps" },
        ],
      },
      {
        id: "rect-f-waist",
        name: "Waist Cinching Core",
        goal: "Define and narrow the waist",
        difficulty: "Beginner",
        duration: 30,
        frequency: "4x/week",
        focusScore: 93,
        brandColor: "#fb923c",
        icon: "✨",
        proTip:
          "For rectangles, the waist is created from two directions: building hips outward AND building abs/obliques inward. Both matter equally.",
        exercises: [
          { name: "Stomach Vacuum (Standing)", sets: 4, reps: "30 sec", rest: "20s", tip: "The single best exercise for waist reduction. Do it fasted.", muscleGroup: "Transverse Abs" },
          { name: "Cable Crunch (Forward Only)", sets: 4, reps: "20", rest: "30s", tip: "No lateral movement — forward only to avoid waist widening.", muscleGroup: "Abs" },
          { name: "Pallof Press", sets: 3, reps: "12 each", rest: "45s", tip: "Anti-rotation = deep core activation.", muscleGroup: "Deep Core" },
          { name: "Dead Bug", sets: 3, reps: "10 each", rest: "30s", tip: "The best low-back safe core exercise.", muscleGroup: "Core" },
          { name: "Lying Twist (Light Weight)", sets: 3, reps: "15 each", rest: "30s", tip: "Light weight only — creates oblique lines, not bulk.", muscleGroup: "Obliques" },
        ],
      },
      {
        id: "rect-f-fullbody",
        name: "Curve-Enhancing Full Body",
        goal: "Overall proportional curve development",
        difficulty: "Intermediate",
        duration: 50,
        frequency: "2x/week",
        focusScore: 88,
        brandColor: "#a78bfa",
        icon: "🌟",
        proTip:
          "Hit glutes, chest, and core in every full body session to reinforce the proportional curve goal.",
        exercises: [
          { name: "Sumo Squat to Shoulder Press", sets: 4, reps: "12", rest: "60s", tip: "Compound movement that builds both curves simultaneously.", muscleGroup: "Full Body" },
          { name: "Bent-Over Row (Dumbbell)", sets: 3, reps: "12", rest: "60s", tip: "Back development supports the chest projection look.", muscleGroup: "Back" },
          { name: "Step-Up with Glute Drive", sets: 3, reps: "12 each", rest: "45s", tip: "Drive the hip forward at the top for peak glute activation.", muscleGroup: "Glutes/Legs" },
          { name: "Chest Press (Dumbbell, Flat)", sets: 3, reps: "12-15", rest: "60s", tip: "Full range of motion — do not lock elbows.", muscleGroup: "Chest" },
          { name: "Hip Abduction (Machine or Band)", sets: 3, reps: "20", rest: "30s", tip: "Builds the lateral glute for the hip curve.", muscleGroup: "Glute Medius" },
        ],
      },
    ],
    weekPlan: [
      { day: 1, label: "Monday", focus: "Glute Growth Protocol", type: "training", routineId: "rect-f-glute" },
      { day: 2, label: "Tuesday", focus: "Chest Curve Builder + Waist Cinching Core", type: "training", routineId: "rect-f-chest", notes: "Add 20 min core work after chest session." },
      { day: 3, label: "Wednesday", focus: "30 min Cardio + Waist Cinching Core", type: "training", routineId: "rect-f-waist" },
      { day: 4, label: "Thursday", focus: "Glute Growth Protocol (Repeat)", type: "training", routineId: "rect-f-glute", notes: "Prioritise progressive overload — add weight if previous session felt easy." },
      { day: 5, label: "Friday", focus: "Curve-Enhancing Full Body", type: "training", routineId: "rect-f-fullbody" },
      { day: 6, label: "Saturday", focus: "Chest Curve Builder + Waist Cinching Core", type: "training", routineId: "rect-f-chest" },
      { day: 7, label: "Sunday", focus: "Rest", type: "rest", notes: "Muscle protein synthesis peaks 24–48 hrs post-training. Rest is when curves are built." },
    ],
  },

  // ── INVERTED TRIANGLE ─────────────────────────────────────────────────────
  {
    id: "inverted-triangle",
    gender: "female",
    name: "Inverted Triangle",
    shortDesc: "Wider shoulders and bust, narrower hips",
    longDesc:
      "Inverted triangle women have broader shoulders and chest relative to their hips. The training goal is to add hip and glute volume to balance the wider upper body, while maintaining the naturally athletic upper body.",
    characteristics: [
      "Shoulders wider than hips",
      "Athletic, broad upper body",
      "Narrow hips and smaller glutes naturally",
      "Strong naturally in the upper body",
    ],
    goals: ["Build hips and glutes to balance shoulders", "Create waist definition", "Soften upper body broadness"],
    avoid: [
      "Heavy overhead pressing (can further widen shoulders)",
      "Wide-grip pull-ups with heavy weight (widens the back)",
      "Neglecting hip and glute work — it's your balance lever",
    ],
    nutritionTip:
      "Maintenance calories. Moderate protein (1.6 g/kg). Focus on adequate carbs around lower body training sessions to support glute and hip muscle growth.",
    keyFocusAreas: ["Hips & Glutes (Priority)", "Quads", "Waist Definition", "Lower Body Volume"],
    routines: [
      {
        id: "inv-hip-builder",
        name: "Hip & Glute Volume Builder",
        goal: "Add hip and glute width to balance broad shoulders",
        difficulty: "Intermediate",
        duration: 55,
        frequency: "4x/week",
        focusScore: 97,
        brandColor: "#6366f1",
        icon: "🦋",
        proTip:
          "Hip abduction machines and wide-stance squats are the fastest way to build lateral glute width — the key proportional fix for inverted triangles.",
        exercises: [
          { name: "Hip Abduction Machine", sets: 5, reps: "20-25", rest: "45s", tip: "High reps, moderate weight. This is your width builder.", muscleGroup: "Glute Medius/Hips" },
          { name: "Wide-Stance Leg Press", sets: 4, reps: "15-20", rest: "75s", tip: "Feet wide and high — maximum glute and outer thigh.", muscleGroup: "Glutes/Outer Thigh" },
          { name: "Sumo Deadlift", sets: 4, reps: "10-12", rest: "75s", tip: "Wide stance shifts force to glutes and inner thighs.", muscleGroup: "Glutes/Hamstrings" },
          { name: "Lateral Band Walk", sets: 4, reps: "20 each", rest: "30s", tip: "Builds the side glute — the most visible 'hip curve'.", muscleGroup: "Glute Medius" },
          { name: "Standing Hip Abduction (Cable)", sets: 3, reps: "20 each", rest: "30s", tip: "Slow and controlled — isolation for the hip curve.", muscleGroup: "Hip Abductors" },
        ],
      },
      {
        id: "inv-lower-body",
        name: "Lower Body Sculpt Focus",
        goal: "Build overall lower body to balance upper body",
        difficulty: "Intermediate",
        duration: 50,
        frequency: "2x/week",
        focusScore: 93,
        brandColor: "#0891b2",
        icon: "🦵",
        proTip:
          "Heavy lower body training has a secondary benefit: it draws attention downward, making the broad shoulders less visually dominant.",
        exercises: [
          { name: "Barbell Back Squat (Moderate Weight)", sets: 4, reps: "10-15", rest: "90s", tip: "Hip-width stance, controlled tempo.", muscleGroup: "Quads/Glutes" },
          { name: "Bulgarian Split Squat", sets: 4, reps: "10-12 each", rest: "60s", tip: "Front foot far forward for more glute engagement.", muscleGroup: "Glutes/Quads" },
          { name: "Reverse Hyper (or Back Extension)", sets: 3, reps: "15", rest: "60s", tip: "Great for lower glute and hamstring sweep.", muscleGroup: "Glutes/Hamstrings" },
          { name: "Leg Extension", sets: 3, reps: "15-20", rest: "45s", tip: "Builds quad sweep — adds leg width.", muscleGroup: "Quads" },
          { name: "Inner Thigh Squat Pulse", sets: 3, reps: "30 pulses", rest: "30s", tip: "Add inner thigh width to complement the outer hip build.", muscleGroup: "Inner Thigh" },
        ],
      },
      {
        id: "inv-waist-core",
        name: "Waist & Core Definition",
        goal: "Create waist definition and reduce upper body dominance",
        difficulty: "Beginner",
        duration: 35,
        frequency: "3x/week",
        focusScore: 89,
        brandColor: "#d946ef",
        icon: "✨",
        proTip:
          "A defined waist visually creates an 'hour curve' between your naturally broad shoulders and the hips you're building. Core work is essential for inverted triangles.",
        exercises: [
          { name: "Stomach Vacuum", sets: 4, reps: "30 sec", rest: "20s", tip: "The best waist-narrowing exercise. Do it daily.", muscleGroup: "Transverse Abs" },
          { name: "Cable Crunch (Straight Forward)", sets: 4, reps: "15", rest: "45s", tip: "Only forward — no lateral movement.", muscleGroup: "Abs" },
          { name: "Pallof Press (Standing)", sets: 3, reps: "12 each", rest: "45s", tip: "Resist rotation — deep core activation.", muscleGroup: "Deep Core" },
          { name: "Flutter Kick (Lying)", sets: 3, reps: "40 sec", rest: "30s", tip: "Lower back pressed to floor throughout.", muscleGroup: "Lower Abs" },
          { name: "Side Plank (Hold)", sets: 3, reps: "40 sec each", rest: "30s", tip: "Creates oblique definition without widening the waist.", muscleGroup: "Obliques" },
        ],
      },
      {
        id: "inv-upper-soft",
        name: "Upper Body Maintenance (Low Volume)",
        goal: "Maintain upper body tone without adding width",
        difficulty: "Beginner",
        duration: 30,
        frequency: "2x/week",
        focusScore: 82,
        brandColor: "#f59e0b",
        icon: "💪",
        proTip:
          "Maintain — don't build — the upper body. Use moderate weights, moderate reps, and avoid max effort pressing. This keeps the upper body toned but not broader.",
        exercises: [
          { name: "Push-Up (Moderate)", sets: 3, reps: "12", rest: "60s", tip: "Standard — not wide grip (wide grip builds width).", muscleGroup: "Chest" },
          { name: "Narrow Grip Row (Cable)", sets: 3, reps: "12", rest: "60s", tip: "Narrow grip reduces lat flare vs wide grip.", muscleGroup: "Back" },
          { name: "Dumbbell Curl (Light)", sets: 2, reps: "15", rest: "45s", tip: "Maintenance — not max effort.", muscleGroup: "Biceps" },
          { name: "Tricep Overhead Extension", sets: 2, reps: "15", rest: "45s", tip: "Elongates the arm line without adding shoulder width.", muscleGroup: "Triceps" },
          { name: "Front Raise (Light)", sets: 2, reps: "12", rest: "45s", tip: "Front delt only — NOT lateral raises (these add width).", muscleGroup: "Front Delt" },
        ],
      },
    ],
    weekPlan: [
      { day: 1, label: "Monday", focus: "Hip & Glute Volume Builder", type: "training", routineId: "inv-hip-builder" },
      { day: 2, label: "Tuesday", focus: "Lower Body Sculpt Focus", type: "training", routineId: "inv-lower-body" },
      { day: 3, label: "Wednesday", focus: "Waist & Core Definition + 20 min Cardio", type: "training", routineId: "inv-waist-core" },
      { day: 4, label: "Thursday", focus: "Hip & Glute Volume Builder (Repeat)", type: "training", routineId: "inv-hip-builder", notes: "Progressive overload: increase hip abduction weight by 5 kg." },
      { day: 5, label: "Friday", focus: "Upper Body Maintenance (Low Volume)", type: "training", routineId: "inv-upper-soft" },
      { day: 6, label: "Saturday", focus: "Lower Body Sculpt + Core", type: "training", routineId: "inv-lower-body", notes: "Add 20 min waist core finisher." },
      { day: 7, label: "Sunday", focus: "Rest", type: "rest", notes: "Hip flexor and glute stretching. Recovery is when the glute growth happens." },
    ],
  },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

export function getMaleShape(id: MaleShape): ShapeData | undefined {
  return maleShapes.find((s) => s.id === id);
}

export function getFemaleShape(id: FemaleShape): ShapeData | undefined {
  return femaleShapes.find((s) => s.id === id);
}

export const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const maleShapeList = [
  { id: "ectomorph" as MaleShape, name: "Ectomorph", icon: "📐", desc: "Lean, hard gainer" },
  { id: "mesomorph" as MaleShape, name: "Mesomorph", icon: "💪", desc: "Athletic, responds fast" },
  { id: "endomorph" as MaleShape, name: "Endomorph", icon: "🔥", desc: "Strong, loses fat slower" },
  { id: "rectangle" as MaleShape, name: "Rectangle", icon: "⬛", desc: "Even proportions" },
];

export const femaleShapeList = [
  { id: "pear" as FemaleShape, name: "Pear / Triangle", icon: "🍐", desc: "Wider hips, narrower bust" },
  { id: "apple" as FemaleShape, name: "Apple / Round", icon: "🍎", desc: "Fuller midsection" },
  { id: "hourglass" as FemaleShape, name: "Hourglass", icon: "⏳", desc: "Balanced, defined waist" },
  { id: "rectangle" as FemaleShape, name: "Rectangle", icon: "📏", desc: "Balanced proportions" },
  { id: "inverted-triangle" as FemaleShape, name: "Inverted Triangle", icon: "🔺", desc: "Broader shoulders" },
];
