export interface Calculator {
  id: string
  title: string
  description: string
  href: string
  category: string
  tags: string[]
  keywords: string[]
}

export const calculators: Calculator[] = [
  {
    id: "absi",
    title: "ABSI Calculator",
    description: "Calculate your A Body Shape Index (ABSI) score",
    href: "/health/absi-calculator",
    category: "Health",
    tags: ["absi", "body shape", "index", "health", "fitness"],
    keywords: ["a body shape index", "absi calculator", "health risk", "body shape", "waist circumference"],
  },
  {
    id: "lean-body-mass",
    title: "Lean Body Mass Calculator",
    description: "Estimate your lean body mass using weight, height, and sex",
    href: "/health/lean-body-mass-calculator",
    category: "Health",
    tags: ["lean body mass", "lbm", "muscle", "weight", "composition"],
    keywords: ["lean body mass", "lbm calculator", "muscle mass", "body composition", "fitness"],
  },
  {
    id: "rfm",
    title: "RFM Calculator",
    description: "Estimate your body fat percentage with the Relative Fat Mass formula",
    href: "/health/rfm-calculator",
    category: "Health",
    tags: ["rfm", "relative fat mass", "body fat", "waist", "height"],
    keywords: ["rfm calculator", "relative fat mass", "body fat percentage", "body composition", "fitness"],
  },
  {
    id: "ponderal-index",
    title: "Ponderal Index Calculator",
    description: "Calculate your body proportion using the Ponderal Index",
    href: "/health/ponderal-index-calculator",
    category: "Health",
    tags: ["ponderal index", "pi", "bmi", "body proportion", "health"],
    keywords: ["ponderal index", "pi calculator", "body proportion", "bmi alternative", "health"],
  },
  {
  id: "adjusted-body-weight",
  title: "Adjusted Body Weight Calculator",
  description: "Calculate your adjusted body weight based on your ideal and actual body weight",
  href: "/health/adjusted-body-weight-calculator",
  category: "Health",
  tags: ["adjusted body weight", "abw", "ibw", "weight correction", "obesity"],
  keywords: ["adjusted body weight calculator","ibw calculator","ideal body weight","obesity dosing weight","nutrition"],
  },
  {
  id: "karvonen-formula",
  title: "Karvonen Formula Calculator",
  description: "Determine your target heart rate using the Karvonen formula",
  href: "/health/karvonen-formula-calculator",
  category: "Health",
  tags: ["karvonen formula", "target heart rate", "heart rate reserve", "exercise", "fitness"],
  keywords: ["karvonen formula calculator","target heart rate","heart rate reserve","exercise intensity","fitness"],
  },
  {
    id: "body-shape",
    title: "Body Shape Calculator",
    description: "Classify your body shape based on measurements of bust, waist, and hips",
    href: "/health/body-shape-calculator", 
    category: "Health",
    tags: ["body shape", "classification", "bust", "waist", "hips"],
    keywords: ["body shape calculator", "body classification", "bust measurement", "waist measurement", "hip measurement"],
  },
  {
    id: "draw-length",
    title: "Draw Length Calculator",
    description: "Calculate your ideal archery draw length based on your wingspan measurement",
    href: "/health/draw-length-calculator",
    category: "Health",
    tags: ["draw length", "archery", "wingspan", "bow", "archer"],
    keywords: ["draw length calculator","archery draw length","wingspan measurement","bow fitting","archer setup"],
  },
  {
    id: "face-shape",
    title: "Face Shape Calculator",
    description: "Determine your face shape using measurements of forehead, cheekbones, and jawline",
    href: "/health/face-shape-calculator",
    category: "Health",
    tags: ["face shape", "classification", "forehead", "cheekbones", "jawline"],
    keywords: ["face shape calculator", "face classification", "forehead measurement", "cheekbone measurement", "jawline measurement"],
  },
  {
    id: "cholesterol-ratio",
    title: "Cholesterol Ratio Calculator",
    description: "Calculate cholesterol ratios using total cholesterol, HDL, LDL, and triglycerides", 
    href: "/health/cholesterol-ratio-calculator",
    category: "Health",
    tags: ["cholesterol ratio", "total cholesterol", "hdl", "ldl", "triglycerides"],
    keywords: ["cholesterol ratio calculator","total cholesterol","hdl cholesterol","ldl cholesterol","triglycerides"],
  },
  {
    id: "heart-rate",
    title: "Heart Rate Calculator",
    description: "Estimate your maximum and target heart rates based on age and fitness level",
    href: "/health/heart-rate-calculator",
    category: "Health",
    tags: ["heart rate", "maximum heart rate", "target heart rate", "age", "fitness"],
    keywords: ["heart rate calculator","maximum heart rate","target heart rate","age based heart rate","fitness level"],
  },
  {
    id: "creatinine-clearance",
    title: "Creatinine Clearance Calculator",
    description: "Estimate kidney function using the Cockcroft-Gault equation",
    href: "/health/creatinine-clearance-calculator",
    category: "Health",
    tags: ["creatinine clearance", "kidney function", "cockcroft-gault", "renal", "glomerular filtration rate"],
    keywords: ["creatinine clearance calculator","kidney function estimation","cockcroft-gault equation","renal function","gfr estimation"],
  },
  {
    id: "pregnancy-weight-gain",
    title: "Pregnancy Weight Gain Calculator",
    description: "Determine recommended weight gain during pregnancy based on pre-pregnancy BMI",
    href: "/health/pregnancy-weight-gain-calculator",
    category: "Health",
    tags: ["pregnancy weight gain", "pregnancy", "weight gain", "bmi", "health"],
    keywords: ["pregnancy weight gain calculator","recommended weight gain","pre-pregnancy bmi","healthy pregnancy","maternal health"],
  },
  {
    id: "fat-intake",
    title: "Fat Intake Calculator",
    description: "Calculate your daily fat intake based on total calories and desired fat percentage",
    href: "/health/fat-intake-calculator",
    category: "Health",
    tags: ["fat intake", "diet", "nutrition", "calories", "health"],
    keywords: ["fat intake calculator","daily fat intake","dietary fat","nutrition planning","healthy eating"],
  },
  {
    id: "mean-arterial-pressure",
    title: "Mean Arterial Pressure Calculator",
    description: "Calculate your mean arterial pressure using systolic and diastolic blood pressure readings",
    href: "/health/mean-arterial-pressure-calculator",
    category: "Health",
    tags: ["mean arterial pressure", "map", "blood pressure", "systolic", "diastolic"],
    keywords: ["mean arterial pressure calculator","map calculation","blood pressure readings","systolic pressure","diastolic pressure"],
  },
  {
    id: "framingham-risk-score",
    title: "Framingham Risk Score Calculator",
    description: "Estimate 10-year cardiovascular risk using the Framingham Risk Score model",
    href: "/health/framingham-risk-score-calculator",
    category: "Health",
    tags: ["framingham risk score", "cardiovascular risk", "heart disease", "10-year risk", "health"],
    keywords: ["framingham risk score calculator","cardiovascular risk estimation","heart disease risk","10-year risk prediction","health assessment"],
  },
  {
    id: "pulse-pressure",
    title: "Pulse Pressure Calculator",
    description: "Determine your pulse pressure using systolic and diastolic blood pressure values",
    href: "/health/pulse-pressure-calculator",
    category: "Health",
    tags: ["pulse pressure", "blood pressure", "systolic", "diastolic", "health"],
    keywords: ["pulse pressure calculator","blood pressure values","systolic pressure","diastolic pressure","cardiovascular health"],
  },
  {
    id: "ascvd-risk",
    title: "ASCVD Risk Calculator",
    description: "Estimate your 10-year risk of atherosclerotic cardiovascular disease (ASCVD)",
    href: "/health/ascvd-risk-calculator",
    category: "Health",
    tags: ["ascvd risk", "cardiovascular disease", "10-year risk", "atherosclerosis", "health"],
    keywords: ["ascvd risk calculator","10-year cardiovascular risk","atherosclerotic disease","heart disease risk","health assessment"],
  },
  {
    id: "qrisk3",
    title: "Qrisk3 Calculator",
    description: "Calculate your risk of developing cardiovascular disease using the Qrisk3 model",
    href: "/health/qrisk3-calculator",
    category: "Health",
    tags: ["qrisk3", "cardiovascular disease", "risk assessment", "health", "disease prediction"],
    keywords: ["qrisk3 calculator","cardiovascular disease risk","risk assessment model","health prediction","disease prevention"],
  },
  {
    id: "tdee",
    title: "TDEE Calculator",
    description: "Calculate your Total Daily Energy Expenditure (TDEE) and recommended macros",
    href: "/health/tdee-calculator",
    category: "Health",
    tags: ["tdee", "total daily energy expenditure", "calories", "macros", "nutrition"],
    keywords: ["tdee calculator","total daily energy expenditure","calorie needs","macronutrient recommendations","nutrition planning"],
  },
  {
    id: "macro",
    title: "Macro Calculator",
    description: "Determine your ideal macronutrient breakdown based on fitness goals",
    href: "/health/macro-calculator",
    category: "Health",
    tags: ["macro calculator", "macronutrients", "nutrition", "fitness goals", "diet"],
    keywords: ["macro calculator","macronutrient breakdown","nutrition planning","fitness goals","diet management"],
  },
  {
    id: "one-rep-max",
    title: "One-Rep Max Calculator",
    description: "Estimate your one-rep max for various strength training exercises",
    href: "/health/one-rep-max-calculator",
    category: "Health",
    tags: ["one-rep max", "strength training", "exercise", "fitness", "workout"],
    keywords: ["one-rep max calculator","strength training estimation","exercise performance","fitness assessment","workout planning"],
  },
  {
    id: "vo2-max",
    title: "VO2 Max Calculator",
    description: "Estimate your VO2 max based on exercise performance and heart rate data",
    href: "/health/vo2-max-calculator",
    category: "Health",
    tags: ["vo2 max", "cardio fitness", "aerobic capacity", "exercise", "health"],
    keywords: ["vo2 max calculator","cardio fitness estimation","aerobic capacity assessment","exercise performance","health evaluation"],
  },
  {
    id: "wilks",
    title: "Wilks Calculator",
    description: "Calculate your Wilks score for powerlifting performance comparison",
    href: "/health/wilks-calculator",
    category: "Health",
    tags: ["wilks score", "powerlifting", "strength", "performance", "comparison"],
    keywords: ["wilks calculator","powerlifting performance","strength comparison","wilks score calculation","fitness assessment"],
  },
  {
    id: "bmi",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index (BMI) to assess if you are underweight, normal weight, overweight, or obese",
    href: "/health/bmi-calculator",
    category: "Health",
    tags: ["bmi", "body mass index", "weight", "health", "fitness"],
    keywords: ["bmi calculator","body mass index","weight assessment","underweight","overweight","obesity"],  
  },
  {
    id: "age",
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, and days based on your date of birth",
    href: "/health/age-calculator",
    category: "Health",
    tags: ["age", "date of birth", "time", "years", "months", "days"],
    keywords: ["age calculator","exact age","date of birth calculation","age in years","age in months","age in days"],
  },
  {
    id: "waist-to-height-ratio",
    title: "Waist-to-Height Ratio Calculator",
    description: "Calculate your waist-to-height ratio to assess health risk based on waist circumference and height",
    href: "/health/waist-to-height-ratio-calculator",
    category: "Health",
    tags: ["waist-to-height ratio", "health risk", "waist circumference", "height", "fitness"],
    keywords: ["waist-to-height ratio calculator","health risk assessment","waist circumference measurement","height measurement","fitness evaluation"],
  },
  {
    id: "ideal-body-weight",
    title: "Ideal Body Weight Calculator",
    description: "Calculate your ideal body weight using multiple medical formulas for accurate health insights",
    href: "/health/ideal-body-weight-calculator",
    category: "Health",
    tags: ["ideal body weight", "medical", "weight", "health", "fitness"],
    keywords: ["ideal body weight calculator","medical weight calculation","weight assessment","health insights","fitness evaluation"],
  },
  {
    id: "body-fat",
    title: "Body Fat Calculator",
    description: "Calculate your body fat percentage using the U.S. Navy method and get insights into your body composition",
    href: "/health/body-fat-calculator",
    category: "Health",
    tags: ["body fat calculator", "body fat percentage", "us navy method", "body composition", "fitness"],
    keywords: ["body fat calculator","body fat percentage","us navy method","body composition assessment","fitness evaluation"],
  },
  {
    id: "blood-pressure",
    title: "Blood Pressure Calculator",
    description: "Calculate your blood pressure category based on your systolic and diastolic readings", 
    href: "/health/blood-pressure-calculator",
    category: "Health",
    tags: ["blood pressure calculator", "blood pressure category", "systolic", "diastolic", "health"],
    keywords: ["blood pressure calculator","blood pressure category","systolic reading","diastolic reading","health assessment"],
  },
  {
    id: "resting-heart-rate",
    title: "Resting Heart Rate Calculator",
    description: "Calculate your resting heart rate and assess your cardiovascular health based on your pulse measurement",
    href: "/health/resting-heart-rate-calculator",
    category: "Health",
    tags: ["resting heart rate calculator", "resting heart rate", "pulse measurement", "cardiovascular health", "fitness"],
    keywords: ["resting heart rate calculator","resting heart rate assessment","pulse measurement","cardiovascular health evaluation","fitness assessment"],
  },
  {
    id: "heart-age",
    title: "Heart Age Calculator",
    description: "Calculate your heart age based on cardiovascular risk factors and health metrics",
    href: "/health/heart-age-calculator",
    category: "Health",
    tags: ["heart age calculator", "heart age", "cardiovascular risk", "health metrics", "fitness"],
    keywords: ["heart age calculator","cardiovascular risk assessment","health metrics evaluation","heart health","fitness assessment"],
  },
  {
    id: "diabetes-risk",
    title: "Diabetes Risk Calculator",
    description: "Estimate your risk of developing diabetes based on lifestyle factors and health indicators",
    href: "/health/diabetes-risk-calculator",
    category: "Health",
    tags: ["diabetes risk calculator", "diabetes risk", "lifestyle factors", "health indicators", "health"],
    keywords: ["diabetes risk calculator","diabetes risk assessment","lifestyle factors evaluation","health indicators analysis","diabetes prevention"],
  },
  {
    id: "estimated-average-glucose",
    title: "Estimated Average Glucose (EAG) Calculator",
    description: "Calculate your estimated average glucose (EAG) level based on your HbA1c test result",
    href: "/health/estimated-average-glucose-calculator",
    category: "Health",
    tags: ["estimated average glucose calculator", "eag calculator", "hba1c", "blood sugar", "diabetes"],
    keywords: ["estimated average glucose calculator","eag calculation","hba1c conversion","blood sugar estimation","diabetes management"],
  },
  {
    id: "daily-water-intake",
    title: "Daily Water Intake Calculator",
    description: "Calculate your recommended daily water intake based on your weight, activity level, and climate",
    href: "/health/daily-water-intake-calculator",
    category: "Health",
    tags: ["daily water intake calculator", "water intake", "hydration", "weight", "activity level", "climate"],
    keywords: ["daily water intake calculator","hydration needs","water intake recommendation","weight based water intake","activity level hydration"],
  },
  {
    id: "calorie-deficit",
    title: "Calorie Deficit Calculator",
    description: "Calculate your calorie deficit for weight loss based on your TDEE and weight loss goals",
    href: "/health/calorie-deficit-calculator",
    category: "Health",
    tags: ["calorie deficit calculator", "calorie deficit", "weight loss", "tdee", "fitness goals"],
    keywords: ["calorie deficit calculator","weight loss calorie deficit","tdee based calorie deficit","fitness goals","nutrition planning"],
  },
  {
    id: "bmr",
    title: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate (BMR) to understand your body's energy needs at rest",
    href: "/health/bmr-calculator",
    category: "Health",
    tags: ["bmr calculator", "basal metabolic rate", "energy needs", "resting metabolism", "health"],
    keywords: ["bmr calculator","basal metabolic rate estimation","energy needs calculation","resting metabolism assessment","health evaluation"],
  },
  {
    id: "obesity-risk",
    title: "Obesity Risk Calculator",
    description: "Estimate your risk of obesity-related health issues based on lifestyle factors and health metrics",
    href: "/health/obesity-risk-calculator",
    category: "Health",
    tags: ["obesity risk calculator", "obesity risk", "lifestyle factors", "health metrics", "health"],
    keywords: ["obesity risk calculator","obesity risk assessment","lifestyle factors evaluation","health metrics analysis","obesity prevention"],
  },
  {
    id: "stress-level",
    title: "Stress Level Calculator",
    description: "Assess your stress level based on lifestyle factors, health indicators, and psychological metrics",
    href: "/health/stress-level-calculator",
    category: "Health",
    tags: ["stress level calculator", "stress level", "lifestyle factors", "health indicators", "psychological metrics"],
    keywords: ["stress level calculator","stress assessment","lifestyle factors evaluation","health indicators analysis","stress management"],
  },
  {
    id: "child-bmi",
    title: "Child BMI Calculator",
    description: "Calculate your child's Body Mass Index (BMI) and assess their growth percentile",
    href: "/health/child-bmi-calculator",
    category: "Health",
    tags: ["child bmi calculator", "child bmi", "growth percentile", "weight", "height"],
    keywords: ["child bmi calculator","child bmi assessment","growth percentile calculation","weight height ratio","child health evaluation"],
  },
  {
    id: "breast-cancer-risk",
    title: "Breast Cancer Risk Calculator",
    description: "Calculate your risk of developing breast cancer using the Gail Model",
    href: "/health/breast-cancer-risk-calculator",
    category: "Health",
    tags: ["breast cancer risk calculator", "gail model", "breast cancer", "risk assessment", "women's health"],
    keywords: ["breast cancer risk calculator","gail model assessment","breast cancer risk estimation","women's health evaluation","cancer prevention"],
  },
  {
    id: "sleep-cycle",
    title: "Sleep Cycle Calculator",
    description: "Calculate your optimal sleep and wake times based on sleep cycles",
    href: "/health/sleep-cycle-calculator",
    category: "Health",
    tags: ["sleep cycle calculator", "sleep cycle", "sleep timing", "sleep quality", "health"],
    keywords: ["sleep cycle calculator","optimal sleep timing","sleep quality assessment","sleep cycle analysis","health evaluation"],
  },
  {
    id: "sleep-debt",
    title: "Sleep Debt Calculator",
    description: "Calculate your sleep debt based on your sleep needs and actual sleep duration",
    href: "/health/sleep-debt-calculator",
    category: "Health",
    tags: ["sleep debt calculator", "sleep debt", "sleep needs", "sleep duration", "health"],
    keywords: ["sleep debt calculator","sleep needs assessment","actual sleep duration","sleep deprivation evaluation","health management"],
  },
  {
    id: "calories-burned",
    title: "Calories Burned Calculator",
    description: "Calculate the calories burned during various activities based on MET values and duration",
    href: "/health/calories-burned-calculator",
    category: "Health",
    tags: ["calories burned calculator", "calories burned", "met values", "activity duration", "fitness"],
    keywords: ["calories burned calculator","met values","activity duration","calorie expenditure estimation","fitness assessment"],
  },
  {
    id: "running-pace",
    title: "Running Pace Calculator",
    description: "Calculate your running pace based on distance and time",
    href: "/health/running-pace-calculator",
    category: "Health",
    tags: ["running pace calculator", "running pace", "distance", "time", "fitness"],
    keywords: ["running pace calculator","pace calculation","distance time ratio","fitness assessment","running performance"],
  },
  {
    id: "metabolic-age",
    title: "Metabolic Age Calculator",
    description: "Calculate your metabolic age based on BMR and age",
    href: "/health/metabolic-age-calculator",
    category: "Health",
    tags: ["metabolic age calculator", "metabolic age", "bmr", "age", "health"],
    keywords: ["metabolic age calculator","bmr assessment","age related metabolism","health evaluation","metabolism analysis"],
  },
  {
    id: "period-cycle",
    title: "Period Cycle Calculator",
    description: "Calculate your menstrual cycle and predict ovulation days",
    href: "/health/period-cycle-calculator",
    category: "Health",
    tags: ["period cycle calculator", "menstrual cycle", "ovulation prediction", "fertility", "women's health"],
    keywords: ["period cycle calculator","menstrual cycle prediction","ovulation days estimation","fertility assessment","women's health evaluation"],
  }
  
]

export function searchCalculators(query: string): Calculator[] {
  if (!query.trim()) return calculators

  const searchTerm = query.toLowerCase().trim()

  return calculators.filter((calc) => {
    // Search in title
    if (calc.title.toLowerCase().includes(searchTerm)) return true

    // Search in description
    if (calc.description.toLowerCase().includes(searchTerm)) return true

    // Search in category
    if (calc.category.toLowerCase().includes(searchTerm)) return true

    // Search in tags
    if (calc.tags.some((tag) => tag.toLowerCase().includes(searchTerm))) return true

    // Search in keywords
    if (calc.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm))) return true

    return false
  })
}

export function getCalculatorsByCategory(category: string): Calculator[] {
  return calculators.filter((calc) => calc.category === category)
}

export function getAllCategories(): string[] {
  return Array.from(new Set(calculators.map((calc) => calc.category)))
}
