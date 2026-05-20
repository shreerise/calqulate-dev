export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  relatedCalculator: {
    name: string;
    href: string;
  };
  tags: string[];
}

export const galleryItems: GalleryItem[] = [
  // ── Body Composition ──────────────────────────────────────────────
  {
    id: "bmi-chart",
    title: "BMI Chart – Weight Categories Explained",
    description: "Visual guide showing underweight, normal, overweight, and obese BMI ranges with practical health implications for each category.",
    image: "/bmi-chart.jpeg",
    category: "Body Composition",
    relatedCalculator: { name: "BMI Calculator", href: "/health/bmi-calculator" },
    tags: ["BMI", "Weight", "Health Chart"],
  },
  {
    id: "absi-vs-bmi",
    title: "ABSI vs BMI – Which Metric Is Better?",
    description: "Comparison of A Body Shape Index (ABSI) against traditional BMI, showing why waist circumference and height ratios matter more for health risk assessment.",
    image: "/absi-vs-bmi.png",
    category: "Body Composition",
    relatedCalculator: { name: "ABSI Calculator", href: "/health/absi-calculator" },
    tags: ["ABSI", "BMI", "Health Risk"],
  },
  {
    id: "body-shape-female",
    title: "Female Body Shape Classification Guide",
    description: "Visual breakdown of the five primary female body shapes — pear, apple, hourglass, rectangle, and inverted triangle — with measurement ratios for each.",
    image: "/body-shape-female.png",
    category: "Body Composition",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Body Shape", "Female", "Classification"],
  },
  {
    id: "body-shape-illustration",
    title: "Body Shape Visual Reference",
    description: "Side-by-side illustration of all body types showing how weight distribution differs across silhouettes and what that means for styling and fitness.",
    image: "/body-shape-illustration.png",
    category: "Body Composition",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Body Shape", "Illustration", "Reference"],
  },
  {
    id: "male-body-shapes",
    title: "Male Body Shape Guide",
    description: "Understanding male body types — trapezoid, rectangle, oval, triangle, and inverted triangle — with styling and fitness tips for each.",
    image: "/male-body-shapes.png",
    category: "Body Composition",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Body Shape", "Male", "Style Guide"],
  },
  {
    id: "visceral-fat",
    title: "Visceral Fat vs Subcutaneous Fat",
    description: "Understanding the difference between dangerous visceral fat around organs and harmless subcutaneous fat under the skin.",
    image: "/visceral-fat.png",
    category: "Body Composition",
    relatedCalculator: { name: "Body Fat Calculator", href: "/health/body-fat-calculator" },
    tags: ["Body Fat", "Visceral Fat", "Health Risk"],
  },
  {
    id: "lean-body-mass",
    title: "Lean Body Mass Breakdown",
    description: "Visual guide to understanding lean body mass — muscle, bone, water, and organs — and why it matters more than total weight for health.",
    image: "/LBM.png",
    category: "Body Composition",
    relatedCalculator: { name: "Lean Body Mass Calculator", href: "/health/lean-body-mass-calculator" },
    tags: ["Lean Mass", "Muscle", "Body Composition"],
  },
  {
    id: "ideal-body-weight",
    title: "Ideal Body Weight Reference Chart",
    description: "Visual comparison of ideal weight ranges across different clinical formulas — Devine, Hamwi, Robinson — for men and women at various heights.",
    image: "/ideal-body-weight-calculator.png",
    category: "Body Composition",
    relatedCalculator: { name: "Ideal Body Weight Calculator", href: "/health/ideal-body-weight-calculator" },
    tags: ["Ideal Weight", "Health Chart", "Formulas"],
  },
  {
    id: "obesity-risk",
    title: "Obesity Risk Assessment Visual Guide",
    description: "Understanding obesity risk factors, BMI thresholds, and health implications with visual risk level indicators.",
    image: "/obesity-risk-calculator.png",
    category: "Body Composition",
    relatedCalculator: { name: "Obesity Risk Calculator", href: "/health/obesity-risk-calculator" },
    tags: ["Obesity", "Risk Assessment", "Health"],
  },

  // ── Cardio Health ─────────────────────────────────────────────────
  {
    id: "framingham-heart-study",
    title: "Framingham Heart Study – Cardiovascular Risk Chart",
    description: "Historical cardiovascular risk assessment chart from the landmark Framingham Heart Study, showing how age, cholesterol, and blood pressure predict heart disease risk.",
    image: "/framingham-heart-study-chart.png",
    category: "Cardio Health",
    relatedCalculator: { name: "Framingham Risk Score Calculator", href: "/health/framingham-risk-score-calculator" },
    tags: ["Heart Disease", "Risk Chart", "Framingham"],
  },
  {
    id: "heart-age",
    title: "Heart Age Visual Guide",
    description: "Understanding your heart age vs chronological age — what factors accelerate heart aging and how lifestyle changes can reverse it.",
    image: "/Heart-age-calculator.png",
    category: "Cardio Health",
    relatedCalculator: { name: "Heart Age Calculator", href: "/health/heart-age-calculator" },
    tags: ["Heart Age", "Cardiovascular", "Lifestyle"],
  },

  // ── Nutrition & Weight ────────────────────────────────────────────
  {
    id: "bmr-calculator",
    title: "Basal Metabolic Rate Visual Guide",
    description: "Understanding your BMR — the calories your body burns at rest — and how it changes with age, gender, and body composition.",
    image: "/BMR-Calculator.png",
    category: "Nutrition & Weight",
    relatedCalculator: { name: "BMR Calculator", href: "/health/bmr-calculator" },
    tags: ["BMR", "Metabolism", "Calories"],
  },
  {
    id: "calorie-deficit",
    title: "Calorie Deficit Explained Visually",
    description: "How a calorie deficit works for weight loss — visual breakdown of energy balance, safe deficit ranges, and expected weekly weight loss.",
    image: "/calorie-deficit-calculator.png",
    category: "Nutrition & Weight",
    relatedCalculator: { name: "Calorie Deficit Calculator", href: "/health/calorie-deficit-calculator" },
    tags: ["Calorie Deficit", "Weight Loss", "Nutrition"],
  },
  {
    id: "calories-burned",
    title: "Calories Burned by Activity Chart",
    description: "Visual comparison of calories burned across common activities — walking, running, cycling, swimming — at different intensity levels.",
    image: "/calorie-burned-calcualtor.png",
    category: "Nutrition & Weight",
    relatedCalculator: { name: "Calories Burned Calculator", href: "/health/calories-burned-calculator" },
    tags: ["Calories Burned", "Exercise", "Activity"],
  },
  {
    id: "macro-protein",
    title: "Protein Intake Guide for Different Goals",
    description: "How much protein you need based on your goals — muscle building, fat loss, or maintenance — with visual portion guides.",
    image: "/macro-1.avif",
    category: "Nutrition & Weight",
    relatedCalculator: { name: "Macro Calculator", href: "/health/macro-calculator" },
    tags: ["Protein", "Macros", "Nutrition"],
  },
  {
    id: "macro-carbs",
    title: "Carbohydrate Types & Timing Guide",
    description: "Understanding simple vs complex carbs, glycemic index, and optimal carb timing for energy and recovery.",
    image: "/macro-2.avif",
    category: "Nutrition & Weight",
    relatedCalculator: { name: "Macro Calculator", href: "/health/macro-calculator" },
    tags: ["Carbs", "Glycemic Index", "Energy"],
  },
  {
    id: "macro-fats",
    title: "Healthy Fats vs Unhealthy Fats Guide",
    description: "Visual breakdown of saturated, unsaturated, and trans fats — which to include in your diet and which to limit for heart health.",
    image: "/macro-3.avif",
    category: "Nutrition & Weight",
    relatedCalculator: { name: "Fat Intake Calculator", href: "/health/fat-intake-calculator" },
    tags: ["Fats", "Heart Health", "Nutrition"],
  },

  // ── Fitness Performance ───────────────────────────────────────────
  {
    id: "draw-length-visual",
    title: "How to Measure Draw Length for Archery",
    description: "Step-by-step visual guide to measuring your wingspan and calculating the correct draw length for optimal archery form and accuracy.",
    image: "/draw-length-visual.png",
    category: "Fitness Performance",
    relatedCalculator: { name: "Draw Length Calculator", href: "/health/draw-length-calculator" },
    tags: ["Archery", "Draw Length", "Measurement"],
  },
  {
    id: "squat-safety",
    title: "Squat Safety & Form Guide",
    description: "Proper squat form visualization — foot placement, knee tracking, back angle, and depth — to prevent injury and maximize gains.",
    image: "/squat-safety.avif",
    category: "Fitness Performance",
    relatedCalculator: { name: "One-Rep Max Calculator", href: "/health/one-rep-max-calculator" },
    tags: ["Squat", "Form", "Safety"],
  },
  {
    id: "squat-rack",
    title: "Squat Rack Setup Guide",
    description: "How to properly set up a squat rack — bar height, safety pins, and spotter arms — for safe and effective heavy lifting.",
    image: "/squat-rack.avif",
    category: "Fitness Performance",
    relatedCalculator: { name: "Wilks Calculator", href: "/health/wilks-calculator" },
    tags: ["Squat Rack", "Setup", "Lifting"],
  },

  // ── Disease Risk ──────────────────────────────────────────────────
  {
    id: "diabetes-risk",
    title: "Type 2 Diabetes Risk Factors Visual Guide",
    description: "Key risk factors for Type 2 Diabetes — BMI, family history, blood pressure, age — with visual risk level indicators and prevention tips.",
    image: "/diabetes-risk-calculator.png",
    category: "Disease Risk",
    relatedCalculator: { name: "Diabetes Risk Calculator", href: "/health/diabetes-risk-calculator" },
    tags: ["Diabetes", "Risk Factors", "Prevention"],
  },
  {
    id: "breast-cancer-risk",
    title: "Breast Cancer Risk Assessment Guide",
    description: "Understanding breast cancer risk factors — age, genetics, lifestyle — and how screening recommendations change based on your risk profile.",
    image: "/breast-cancer-risk-calculator.png",
    category: "Disease Risk",
    relatedCalculator: { name: "Breast Cancer Risk Calculator", href: "/health/breast-cancer-risk-calculator" },
    tags: ["Breast Cancer", "Risk Assessment", "Screening"],
  },

  // ── Mental Wellness ───────────────────────────────────────────────
  {
    id: "sleep-cycle",
    title: "Sleep Cycle Recommendations by Age",
    description: "How many hours of sleep you actually need at every life stage, from teenagers to seniors, with optimal sleep window guidance.",
    image: "/recommendation-sleep-cycle-by-age-infographic.png",
    category: "Mental Wellness",
    relatedCalculator: { name: "Sleep Cycle Calculator", href: "/health/sleep-cycle-calculator" },
    tags: ["Sleep", "Health Guide", "Age"],
  },
  {
    id: "sleep-cycle-calculator",
    title: "Sleep Cycle Timing Visual Guide",
    description: "Understanding 90-minute sleep cycles, optimal bedtime windows, and how to wake up feeling refreshed instead of groggy.",
    image: "/sleep-cycle-calculator.png",
    category: "Mental Wellness",
    relatedCalculator: { name: "Sleep Cycle Calculator", href: "/health/sleep-cycle-calculator" },
    tags: ["Sleep Cycles", "Bedtime", "REM Sleep"],
  },
  {
    id: "stress-level",
    title: "Stress Level Indicators & Management Guide",
    description: "Recognizing physical and mental signs of stress — from mild to severe — with evidence-based coping strategies for each level.",
    image: "/stress-level-calculator.png",
    category: "Mental Wellness",
    relatedCalculator: { name: "Stress Level Calculator", href: "/health/stress-level-calculator" },
    tags: ["Stress", "Mental Health", "Coping"],
  },

  // ── Women's Health ────────────────────────────────────────────────
  {
    id: "ovulation-signs",
    title: "Signs & Symptoms of Ovulation",
    description: "Visual guide to recognizing ovulation signs — cervical mucus changes, basal body temperature shifts, and fertility window timing.",
    image: "/signs-and-symptoms-of-ovulation-infograpic.png",
    category: "Women's Health",
    relatedCalculator: { name: "Ovulation Calculator", href: "/health/ovulation-calculator" },
    tags: ["Ovulation", "Fertility", "Women's Health"],
  },

  // ── Body Shape (Female) ───────────────────────────────────────────
  {
    id: "pear-shape",
    title: "Pear Body Shape – Characteristics & Styling",
    description: "Hips wider than shoulders with a defined waist. Learn the best dress cuts, necklines, and fitness focus for pear shapes.",
    image: "/images/body-shapes/pear-shape.png",
    category: "Body Shape",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Body Shape", "Pear", "Style Guide"],
  },
  {
    id: "apple-shape",
    title: "Apple Body Shape – Characteristics & Styling",
    description: "Weight carried around the midsection with slimmer legs. Discover empire waistlines, V-necks, and core-strengthening workouts.",
    image: "/images/body-shapes/apple-shape.png",
    category: "Body Shape",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Body Shape", "Apple", "Style Guide"],
  },
  {
    id: "hourglass-shape",
    title: "Hourglass Body Shape – Characteristics & Styling",
    description: "Bust and hips nearly equal with a highly defined waist. Wrap dresses, bodycon styles, and balanced training are your best friends.",
    image: "/images/body-shapes/hourglass-shape.png",
    category: "Body Shape",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Body Shape", "Hourglass", "Style Guide"],
  },
  {
    id: "rectangle-shape",
    title: "Rectangle Body Shape – Characteristics & Styling",
    description: "Straight up-and-down figure with minimal waist definition. Peplum tops, belted dresses, and glute-focused workouts create curves.",
    image: "/images/body-shapes/rectangle-shape.png",
    category: "Body Shape",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Body Shape", "Rectangle", "Style Guide"],
  },
  {
    id: "inverted-triangle-shape",
    title: "Inverted Triangle Body Shape – Characteristics & Styling",
    description: "Broad shoulders with narrow hips. A-line skirts, wide-leg pants, and lower-body compound work balance your proportions.",
    image: "/images/body-shapes/inverted-triangle-shape.png",
    category: "Body Shape",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Body Shape", "Inverted Triangle", "Style Guide"],
  },

  // ── Face Shape ────────────────────────────────────────────────────
  {
    id: "face-shape-comparison",
    title: "All 6 Face Shapes – Visual Comparison Guide",
    description: "Side-by-side comparison of oval, round, square, heart, diamond, and oblong face shapes with their key distinguishing features.",
    image: "/face-shape-comparison.jpg",
    category: "Face Shape",
    relatedCalculator: { name: "Face Shape Calculator", href: "/health/face-shape-calculator" },
    tags: ["Face Shape", "Comparison", "Style Guide"],
  },
  {
    id: "face-shape-golden-ratio",
    title: "Golden Ratio Face Analysis",
    description: "How the Golden Ratio (1.618) applies to facial beauty — measuring proportions between eyes, nose, lips, and jawline for aesthetic balance.",
    image: "/face-shape-golden-ratio-image.png",
    category: "Face Shape",
    relatedCalculator: { name: "Golden Ratio Face Calculator", href: "/health/golden-ratio-face-calculator" },
    tags: ["Golden Ratio", "Facial Beauty", "Proportions"],
  },
  {
    id: "oval-face",
    title: "Oval Face Shape – Features & Styling",
    description: "Face length longer than cheekbone width, forehead wider than jawline. Most hairstyles and glasses work beautifully.",
    image: "/face-shapes/oval.png",
    category: "Face Shape",
    relatedCalculator: { name: "Face Shape Calculator", href: "/health/face-shape-calculator" },
    tags: ["Face Shape", "Oval", "Hairstyle"],
  },
  {
    id: "round-face",
    title: "Round Face Shape – Features & Styling",
    description: "Face length and cheekbone width similar with soft curved jawline. Add height and length to elongate the face.",
    image: "/face-shapes/round.png",
    category: "Face Shape",
    relatedCalculator: { name: "Face Shape Calculator", href: "/health/face-shape-calculator" },
    tags: ["Face Shape", "Round", "Hairstyle"],
  },
  {
    id: "square-face",
    title: "Square Face Shape – Features & Styling",
    description: "All measurements fairly similar with sharp angular jawline. Soften angles with texture, waves, or round frames.",
    image: "/face-shapes/square.png",
    category: "Face Shape",
    relatedCalculator: { name: "Face Shape Calculator", href: "/health/face-shape-calculator" },
    tags: ["Face Shape", "Square", "Hairstyle"],
  },
  {
    id: "oblong-face",
    title: "Oblong Face Shape – Features & Styling",
    description: "Face length is the greatest measurement. Create width illusion with volume on sides, avoid adding height.",
    image: "/face-shapes/oblong.png",
    category: "Face Shape",
    relatedCalculator: { name: "Face Shape Calculator", href: "/health/face-shape-calculator" },
    tags: ["Face Shape", "Oblong", "Hairstyle"],
  },
  {
    id: "heart-face",
    title: "Heart Face Shape – Features & Styling",
    description: "Forehead widest with narrow jawline and pointed chin. Add volume to lower face to balance the wider forehead.",
    image: "/face-shapes/heart.png",
    category: "Face Shape",
    relatedCalculator: { name: "Face Shape Calculator", href: "/health/face-shape-calculator" },
    tags: ["Face Shape", "Heart", "Hairstyle"],
  },
  {
    id: "diamond-face",
    title: "Diamond Face Shape – Features & Styling",
    description: "Cheekbones widest, forehead and jawline narrow. Soften cheekbones and add fullness to forehead and chin.",
    image: "/face-shapes/diamond.png",
    category: "Face Shape",
    relatedCalculator: { name: "Face Shape Calculator", href: "/health/face-shape-calculator" },
    tags: ["Face Shape", "Diamond", "Hairstyle"],
  },

  // ── Pear Shape Fashion ────────────────────────────────────────────
  {
    id: "pear-a-line-dress",
    title: "A-Line Dress for Pear Shape",
    description: "The universal pear-shape winner — skims over hips and thighs while highlighting your defined waist. Perfect for office, brunch, and date nights.",
    image: "/images/pear-dresses/a-line.png",
    category: "Fashion Guide",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["A-Line", "Pear Shape", "Dress Style"],
  },
  {
    id: "pear-fit-and-flare",
    title: "Fit-and-Flare Dress for Pear Shape",
    description: "Cinches the waist and flows outward — balances wider hips with a feminine sweep. Ideal for weddings, parties, and date nights.",
    image: "/images/pear-dresses/fit-and-flare.png",
    category: "Fashion Guide",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Fit-and-Flare", "Pear Shape", "Event Wear"],
  },
  {
    id: "pear-wrap-dress",
    title: "Wrap Dress for Pear Shape",
    description: "Defines the waist with a tie and creates an even silhouette top-to-bottom. Versatile for office, brunch, and evening.",
    image: "/images/pear-dresses/wrap-dress.png",
    category: "Fashion Guide",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Wrap Dress", "Pear Shape", "Versatile"],
  },
  {
    id: "pear-off-shoulder",
    title: "Off-Shoulder Set for Pear Shape",
    description: "Pulls the eye upward to shoulders and creates a longer leg line below. Perfect for casual outings and date nights.",
    image: "/images/pear-dresses/off-shoulder-set.png",
    category: "Fashion Guide",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Off-Shoulder", "Pear Shape", "Casual"],
  },
  {
    id: "pear-boat-neck",
    title: "Boat-Neck Statement Dress for Pear Shape",
    description: "Widens the visual shoulder line — instantly balances broader hips. Great for office, weddings, and daytime events.",
    image: "/images/pear-dresses/boat-neck.png",
    category: "Fashion Guide",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Boat Neck", "Pear Shape", "Statement"],
  },
  {
    id: "pear-peplum",
    title: "Peplum Top Set for Pear Shape",
    description: "The flared peplum hits exactly at the high-hip — never adds volume. Perfect for office and party occasions.",
    image: "/images/pear-dresses/peplum.png",
    category: "Fashion Guide",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Peplum", "Pear Shape", "Office Wear"],
  },

  // ── Blog Content ──────────────────────────────────────────────────
  {
    id: "female-body-shapes-blog",
    title: "Female Body Shapes Explained — Blog Cover",
    description: "Comprehensive guide to all five female body shapes with styling tips, workout plans, and diet recommendations for each type.",
    image: "/images/blogs/female-body-shapes-cover.png",
    category: "Blog",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Body Shapes", "Blog", "Style Guide"],
  },
  {
    id: "pear-dresses-blog",
    title: "Best Dresses for Pear Shape — Blog Cover",
    description: "Complete styling guide for pear-shaped women — A-line, fit-and-flare, and off-shoulder dresses that balance your silhouette beautifully.",
    image: "/images/blogs/pear-shape-dresses-cover.png",
    category: "Blog",
    relatedCalculator: { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
    tags: ["Pear Shape", "Dresses", "Blog"],
  },

  // ── Miscellaneous ─────────────────────────────────────────────────
  {
    id: "age-calculator",
    title: "Age Calculation Visual Guide",
    description: "Understanding how age is calculated precisely — years, months, days — and why exact age matters for health assessments and milestones.",
    image: "/age-calculator.png",
    category: "General Health",
    relatedCalculator: { name: "Age Calculator", href: "/health/age-calculator" },
    tags: ["Age", "Calculation", "Health Milestones"],
  },
  {
    id: "health-dashboard",
    title: "Personalized Health Dashboard Overview",
    description: "How Calqulate's health dashboard brings together 50+ calculators into one personalized health intelligence system — no login required.",
    image: "/Health-personalized-dashboard-calqulate.net.png",
    category: "General Health",
    relatedCalculator: { name: "BMI Calculator", href: "/health/bmi-calculator" },
    tags: ["Dashboard", "Health Tracking", "Overview"],
  },
];

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryItems.map((item) => item.category))),
];

export function getGalleryItemById(id: string): GalleryItem | undefined {
  return galleryItems.find((item) => item.id === id);
}

export function getGalleryItemsByCategory(category: string): GalleryItem[] {
  if (category === "All") return galleryItems;
  return galleryItems.filter((item) => item.category === category);
}
