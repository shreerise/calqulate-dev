"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, RefreshCw, Loader2, Sparkles, Shirt, AlertTriangle, CheckCircle2, Info, TrendingDown } from "lucide-react";

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

type UnitSystem = "metric" | "imperial";
type MeasurementField = "bust" | "waist" | "hips";

type ReturnRisk = "Low" | "Medium" | "High";

interface SizeResult {
  us: string;
  uk: string;
  eu: string;
  india: string;
  plusSize: string | null;
}

interface BetweenSizesAdvice {
  show: boolean;
  advice: string;
}

interface CalculationResult {
  primarySize: SizeResult;
  altSize: SizeResult | null;
  betweenSizes: BetweenSizesAdvice;
  returnRisk: ReturnRisk;
  returnRiskReason: string;
  styleNote: string;
  bodyShapeNote: string;
  brandNote: string;
  measurements: { bust: number; waist: number; hips: number };
}

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------

const DRESS_STYLES = [
  { value: "bodycon", label: "Bodycon / Fitted" },
  { value: "aline", label: "A-line / Fit & Flare" },
  { value: "wrap", label: "Wrap Dress" },
  { value: "maxi", label: "Maxi / Shift" },
  { value: "wedding", label: "Wedding / Bridal" },
  { value: "casual", label: "Casual / Everyday" },
  { value: "other", label: "Other / Not sure" },
];

const BODY_SHAPES = [
  { value: "hourglass", label: "Hourglass" },
  { value: "pear", label: "Pear (Triangle)" },
  { value: "apple", label: "Apple (Round)" },
  { value: "rectangle", label: "Rectangle (Athletic)" },
  { value: "inverted", label: "Inverted Triangle" },
  { value: "unknown", label: "Not sure" },
];

const FIT_PREFERENCES = [
  { value: "tight", label: "Tight / Second skin" },
  { value: "comfortable", label: "Comfortable / True to size" },
  { value: "relaxed", label: "Relaxed / Slightly loose" },
  { value: "oversized", label: "Oversized" },
];

const FABRIC_TYPES = [
  { value: "stretch", label: "Stretchy (jersey, spandex, knit)" },
  { value: "structured", label: "Structured (woven, denim, linen)" },
  { value: "mixed", label: "Mixed / Not sure" },
];

const BRANDS = [
  { value: "standard", label: "Standard / Generic" },
  { value: "zara", label: "Zara", note: "runs true to EU sizing", adjust: 0 },
  { value: "hm", label: "H&M", note: "runs slightly large", adjust: -1 },
  { value: "asos", label: "ASOS", note: "runs true to UK sizing", adjust: 0 },
  { value: "shein", label: "Shein", note: "runs small — size up one", adjust: 1 },
  { value: "mango", label: "Mango", note: "runs true to EU sizing", adjust: 0 },
  { value: "forever21", label: "Forever 21", note: "runs slightly small", adjust: 1 },
  { value: "myntra", label: "Myntra (Indian brands)", note: "runs small — size up", adjust: 1 },
  { value: "fabindia", label: "Fabindia", note: "runs true to Indian sizing", adjust: 0 },
  { value: "uniqlo", label: "Uniqlo", note: "runs true to size, slightly boxy", adjust: 0 },
  { value: "marks", label: "Marks & Spencer", note: "runs true to UK sizing", adjust: 0 },
  { value: "primark", label: "Primark", note: "runs slightly large", adjust: -1 },
  { value: "topshop", label: "Topshop / ASOS Design", note: "runs true to UK sizing", adjust: 0 },
  { value: "anthropologie", label: "Anthropologie", note: "runs slightly small", adjust: 1 },
  { value: "gap", label: "Gap", note: "runs true to US sizing", adjust: 0 },
  { value: "target", label: "Target (US)", note: "runs slightly large", adjust: -1 },
  { value: "amazon", label: "Amazon Fashion", note: "varies by seller — use measurements", adjust: 0 },
  { value: "other", label: "Other brand" },
];

// ---------------------------------------------------------------------------
// SIZE DATA TABLES
// ---------------------------------------------------------------------------

// Each entry: [bustMin, bustMax, waistMin, waistMax, hipsMin, hipsMax] in inches
// Key = size label
const SIZE_TABLE: Array<{
  label: string;
  us: string;
  uk: string;
  eu: string;
  india: string;
  bust: [number, number];
  waist: [number, number];
  hips: [number, number];
  plusLabel?: string;
}> = [
  { label: "XS", us: "XS (2)", uk: "6", eu: "34", india: "XS", bust: [31.5, 33], waist: [24, 25], hips: [33.5, 35] },
  { label: "S", us: "S (4–6)", uk: "8–10", eu: "36–38", india: "S", bust: [33, 35], waist: [25, 27], hips: [35, 37] },
  { label: "M", us: "M (8–10)", uk: "12–14", eu: "40–42", india: "M", bust: [35, 38], waist: [27, 30], hips: [37, 40] },
  { label: "L", us: "L (12–14)", uk: "16–18", eu: "44–46", india: "L", bust: [38, 41], waist: [30, 33], hips: [40, 43] },
  { label: "XL", us: "XL (16)", uk: "20", eu: "48", india: "XL", bust: [41, 44], waist: [33, 36], hips: [43, 46] },
  { label: "2XL", us: "2XL (18)", uk: "22", eu: "50", india: "XXL", bust: [44, 47], waist: [36, 39], hips: [46, 49], plusLabel: "1X" },
  { label: "3XL", us: "3XL (20)", uk: "24", eu: "52", india: "3XL", bust: [47, 50], waist: [39, 42], hips: [49, 52], plusLabel: "2X" },
  { label: "4XL", us: "4XL (22)", uk: "26", eu: "54", india: "4XL", bust: [50, 54], waist: [42, 46], hips: [52, 56], plusLabel: "3X" },
];

// ---------------------------------------------------------------------------
// ZOD SCHEMA
// ---------------------------------------------------------------------------

const formSchema = z.object({
  bust: z.string().min(1, "Bust measurement is required."),
  waist: z.string().min(1, "Waist measurement is required."),
  hips: z.string().min(1, "Hip measurement is required."),
  units: z.enum(["metric", "imperial"]),
  height: z.string().optional(),
  weight: z.string().optional(),
  bodyShape: z.string().default("unknown"),
  dressStyle: z.string().default("casual"),
  fitPreference: z.string().default("comfortable"),
  fabric: z.string().default("mixed"),
  brand: z.string().default("standard"),
});

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

function toInches(val: string, units: UnitSystem): number {
  const n = parseFloat(val);
  return units === "metric" ? n / 2.54 : n;
}

function getSize(bustIn: number, waistIn: number, hipsIn: number) {
  // Primary match: best fit across all three measurements
  let best: typeof SIZE_TABLE[0] | null = null;
  let bestScore = Infinity;
  let second: typeof SIZE_TABLE[0] | null = null;
  let secondScore = Infinity;

  for (const row of SIZE_TABLE) {
    const bustMid = (row.bust[0] + row.bust[1]) / 2;
    const waistMid = (row.waist[0] + row.waist[1]) / 2;
    const hipsMid = (row.hips[0] + row.hips[1]) / 2;

    // Weighted: hips matter most for dress fit, then bust, then waist
    const score =
      Math.abs(hipsMid - hipsIn) * 3 +
      Math.abs(bustMid - bustIn) * 2 +
      Math.abs(waistMid - waistIn);

    if (score < bestScore) {
      second = best;
      secondScore = bestScore;
      best = row;
      bestScore = score;
    } else if (score < secondScore) {
      second = row;
      secondScore = score;
    }
  }

  return { best: best!, second: second! };
}

function toSizeResult(row: typeof SIZE_TABLE[0]): SizeResult {
  return {
    us: row.us,
    uk: row.uk,
    eu: row.eu,
    india: row.india,
    plusSize: row.plusLabel ?? null,
  };
}

function getBetweenSizesAdvice(
  bustIn: number,
  waistIn: number,
  hipsIn: number,
  best: typeof SIZE_TABLE[0],
  second: typeof SIZE_TABLE[0],
  dressStyle: string,
  fabric: string,
  fitPref: string
): BetweenSizesAdvice {
  const bustBorder =
    Math.abs(bustIn - best.bust[0]) < 0.75 || Math.abs(bustIn - best.bust[1]) < 0.75;
  const hipsBorder =
    Math.abs(hipsIn - best.hips[0]) < 0.75 || Math.abs(hipsIn - best.hips[1]) < 0.75;
  const waistBorder =
    Math.abs(waistIn - best.waist[0]) < 0.75 || Math.abs(waistIn - best.waist[1]) < 0.75;

  if (!bustBorder && !hipsBorder && !waistBorder) {
    return { show: false, advice: "" };
  }

  const isBiggerSecond =
    SIZE_TABLE.indexOf(second) > SIZE_TABLE.indexOf(best);

  let direction = isBiggerSecond ? "up" : "down";

  // Style overrides
  if (dressStyle === "bodycon") direction = "up";
  if (dressStyle === "wedding") direction = "up";
  if (dressStyle === "maxi" || dressStyle === "wrap") direction = fabric === "stretch" ? "down" : direction;
  if (fitPref === "tight") direction = "down";
  if (fitPref === "oversized" || fitPref === "relaxed") direction = "up";

  const sizeLabel = isBiggerSecond
    ? `${best.label} or ${second.label}`
    : `${second.label} or ${best.label}`;

  let reason = "";
  if (dressStyle === "bodycon")
    reason = "Bodycon styles are unforgiving — size up for comfort and movement.";
  else if (dressStyle === "wedding")
    reason = "Bridal wear runs 1–2 sizes small. Always size up and plan for alterations.";
  else if (fabric === "stretch" && fitPref === "tight")
    reason = "Stretch fabric allows sizing down for a second-skin fit.";
  else if (fabric === "stretch")
    reason = "Stretch fabric is forgiving — true size or size down is fine.";
  else if (fabric === "structured")
    reason = "Structured fabric has no give — size up to avoid discomfort.";
  else
    reason = `You are between ${sizeLabel}. Size ${direction} for your preferred fit.`;

  return {
    show: true,
    advice: `You fall between sizes. Recommendation: size ${direction}. ${reason}`,
  };
}

function getReturnRisk(
  betweenSizes: BetweenSizesAdvice,
  brand: string,
  dressStyle: string
): { risk: ReturnRisk; reason: string } {
  let score = 0;

  if (betweenSizes.show) score += 2;

  const highRiskBrands = ["shein", "amazon", "myntra"];
  const lowRiskBrands = ["marks", "gap", "zara"];
  if (highRiskBrands.includes(brand)) score += 2;
  if (lowRiskBrands.includes(brand)) score -= 1;

  if (dressStyle === "bodycon" || dressStyle === "wedding") score += 1;
  if (dressStyle === "maxi" || dressStyle === "wrap") score -= 1;

  let risk: ReturnRisk = "Low";
  let reason = "Your measurements align well with this size. Low return risk.";

  if (score >= 4) {
    risk = "High";
    reason =
      "You are between sizes and shopping a brand with inconsistent sizing. Consider ordering two adjacent sizes.";
  } else if (score >= 2) {
    risk = "Medium";
    reason =
      "You are close to a size boundary. Check the brand's own chart before buying, and read recent customer reviews on fit.";
  }

  return { risk, reason };
}

function getStyleNote(dressStyle: string): string {
  switch (dressStyle) {
    case "bodycon":
      return "Bodycon dresses are sized for the hips. If your hip measurement is larger than your bust, your hips determine your size.";
    case "aline":
      return "A-line and fit-and-flare styles are forgiving through the hip. Your bust measurement is the primary fit point.";
    case "wrap":
      return "Wrap dresses are adjustable. They work across a range of measurements — true to size or one size down for a closer look.";
    case "maxi":
      return "Maxi and shift styles have generous proportions. You can often size down if you prefer less volume.";
    case "wedding":
      return "Bridal sizing runs 1–2 sizes smaller than ready-to-wear. Always size up and plan for a professional fitting and alterations.";
    case "casual":
      return "Casual everyday dresses are generally true to size across most brands.";
    default:
      return "Always measure yourself before buying and compare with the brand's own size chart.";
  }
}

function getBodyShapeNote(bodyShape: string): string {
  switch (bodyShape) {
    case "hourglass":
      return "As an hourglass, size by your hips first — your defined waist can always be cinched with a belt or taken in.";
    case "pear":
      return "As a pear shape, size by your hips. You may find the waist is slightly loose — this is normal and can be altered.";
    case "apple":
      return "As an apple shape, size by your bust and torso. Look for styles with empire waists or ruching through the midsection.";
    case "rectangle":
      return "As a rectangle shape, your measurements are similar all over — standard sizing applies well. Peplum and tiered styles add shape.";
    case "inverted":
      return "As an inverted triangle, size by your shoulders and bust. Flared and A-line skirts balance your proportions beautifully.";
    default:
      return "Not sure of your body shape? Use our Body Shape Calculator for a full analysis before buying.";
  }
}

function getBrandNote(brand: string): string {
  const found = BRANDS.find((b) => b.value === brand);
  if (!found || brand === "standard" || brand === "other") return "";
  return found.note ? `${found.label} ${found.note}.` : "";
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

const ReturnRiskMeter = ({ risk, reason }: { risk: ReturnRisk; reason: string }) => {
  const config: Record<ReturnRisk, { color: string; textColor: string; icon: React.ReactNode; width: string }> = {
    Low: {
      color: "bg-emerald-500",
      textColor: "text-emerald-700",
      icon: <CheckCircle2 className="w-4 h-4" />,
      width: "w-1/3",
    },
    Medium: {
      color: "bg-yellow-400",
      textColor: "text-yellow-700",
      icon: <Info className="w-4 h-4" />,
      width: "w-2/3",
    },
    High: {
      color: "bg-red-500",
      textColor: "text-red-700",
      icon: <AlertTriangle className="w-4 h-4" />,
      width: "w-full",
    },
  };

  const c = config[risk];

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">Return Risk</p>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div className={`${c.color} h-3 rounded-full transition-all duration-700 ${c.width}`} />
      </div>
      <div className={`flex items-center gap-1.5 mt-2 font-semibold ${c.textColor}`}>
        {c.icon}
        <span>{risk} Risk</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{reason}</p>
    </div>
  );
};

const SizeDisplay = ({
  title,
  result,
  accent,
}: {
  title: string;
  result: SizeResult;
  accent?: boolean;
}) => (
  <div className={`rounded-xl border p-4 space-y-3 ${accent ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" : ""}`}>
    <p className={`text-xs font-semibold uppercase tracking-wider ${accent ? "text-emerald-700" : "text-muted-foreground"}`}>
      {title}
    </p>
    <div className="grid grid-cols-2 gap-2">
      {[
        { label: "US", value: result.us },
        { label: "UK", value: result.uk },
        { label: "EU", value: result.eu },
        { label: "India", value: result.india },
      ].map(({ label, value }) => (
        <div key={label} className="text-center">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={`font-bold text-lg ${accent ? "text-emerald-700" : ""}`}>{value}</p>
        </div>
      ))}
    </div>
    {result.plusSize && (
      <div className="text-center border-t pt-2 mt-2">
        <p className="text-xs text-muted-foreground">Plus Size</p>
        <p className={`font-bold text-lg ${accent ? "text-emerald-700" : ""}`}>{result.plusSize}</p>
      </div>
    )}
  </div>
);

const ProportionChart = ({
  measurements,
  units,
}: {
  measurements: { bust: number; waist: number; hips: number };
  units: UnitSystem;
}) => {
  const { bust, waist, hips } = measurements;
  const maxVal = Math.max(bust, waist, hips);
  const unit = units === "metric" ? "cm" : "in";

  const bars = [
    { label: "Bust", value: bust },
    { label: "Waist", value: waist },
    { label: "Hips", value: hips },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold mb-3">Your Measurements</h3>
      <div className="space-y-3">
        {bars.map(({ label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-12 text-sm font-medium text-muted-foreground">{label}</span>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
              <div
                className="bg-emerald-600/90 h-full rounded-full transition-all duration-700"
                style={{ width: `${(value / maxVal) * 100}%` }}
              />
            </div>
            <span className="w-20 text-right text-sm font-semibold">
              {value.toFixed(1)} {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// MAIN CALCULATOR COMPONENT
// ---------------------------------------------------------------------------

export default function DressSizeCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bust: "",
      waist: "",
      hips: "",
      units: "metric",
      height: "",
      weight: "",
      bodyShape: "unknown",
      dressStyle: "casual",
      fitPreference: "comfortable",
      fabric: "mixed",
      brand: "standard",
    },
  });

  const { getValues, setValue } = form;
  const units = form.watch("units");

  // Unit conversion
  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;

    const fields: MeasurementField[] = ["bust", "waist", "hips"];
    fields.forEach((field) => {
      const val = getValues(field);
      if (val && !isNaN(parseFloat(val))) {
        const n = parseFloat(val);
        const converted = newUnit === "metric" ? n * 2.54 : n / 2.54;
        setValue(field, converted.toFixed(1));
      }
    });
    setValue("units", newUnit);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      const bustIn = toInches(values.bust, values.units);
      const waistIn = toInches(values.waist, values.units);
      const hipsIn = toInches(values.hips, values.units);

      const { best, second } = getSize(bustIn, waistIn, hipsIn);

      // Brand adjustment
      const brandData = BRANDS.find((b) => b.value === values.brand);
      const adjust = brandData && "adjust" in brandData ? (brandData.adjust ?? 0) : 0;
      const adjustedIndex = Math.max(
        0,
        Math.min(SIZE_TABLE.length - 1, SIZE_TABLE.indexOf(best) + adjust)
      );
      const adjustedBest = SIZE_TABLE[adjustedIndex];

      const betweenSizes = getBetweenSizesAdvice(
        bustIn,
        waistIn,
        hipsIn,
        best,
        second,
        values.dressStyle,
        values.fabric,
        values.fitPreference
      );

      const { risk, reason } = getReturnRisk(betweenSizes, values.brand, values.dressStyle);

      setResult({
        primarySize: toSizeResult(adjustedBest),
        altSize: betweenSizes.show ? toSizeResult(second) : null,
        betweenSizes,
        returnRisk: risk,
        returnRiskReason: reason,
        styleNote: getStyleNote(values.dressStyle),
        bodyShapeNote: getBodyShapeNote(values.bodyShape),
        brandNote: getBrandNote(values.brand),
        measurements: {
          bust: parseFloat(values.bust),
          waist: parseFloat(values.waist),
          hips: parseFloat(values.hips),
        },
      });

      setIsLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 600);
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto" id="calculator">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" /> Smart Dress Size Calculator
          </CardTitle>
          <CardDescription>
            Enter your measurements and optional details for a personalised size recommendation
            across US, UK, EU, and India — with brand-specific and style-specific advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Units */}
              <FormField
                control={form.control}
                name="units"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Units</FormLabel>
                    <RadioGroup
                      onValueChange={(value) => handleUnitChange(value as UnitSystem)}
                      value={field.value}
                      className="flex flex-col sm:flex-row flex-wrap items-start gap-3 pt-2"
                    >
                      {[
                        { value: "metric", label: "Metric (cm)" },
                        { value: "imperial", label: "Imperial (inches)" },
                      ].map((opt) => (
                        <FormItem
                          key={opt.value}
                          className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50/50"
                        >
                          <FormControl>
                            <RadioGroupItem value={opt.value} />
                          </FormControl>
                          <FormLabel className="font-medium text-sm">{opt.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormItem>
                )}
              />

              {/* Core measurements */}
              <div>
                <p className="text-sm font-semibold mb-3">Your Measurements (Required)</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(["bust", "waist", "hips"] as MeasurementField[]).map((field) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field}
                      render={({ field: f }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold capitalize">{field}</FormLabel>
                          <FormControl>
                            <Input
                              className="h-12"
                              type="number"
                              step="0.1"
                              placeholder={
                                units === "metric"
                                  ? field === "bust" ? "90" : field === "waist" ? "70" : "95"
                                  : field === "bust" ? "36" : field === "waist" ? "28" : "38"
                              }
                              {...f}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Optional: height & weight */}
              <div>
                <p className="text-sm font-semibold mb-1">
                  Height &amp; Weight{" "}
                  <span className="font-normal text-muted-foreground">(Optional — for secondary estimate)</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Height ({units === "metric" ? "cm" : "inches"})
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12"
                            type="number"
                            step="0.5"
                            placeholder={units === "metric" ? "165" : "65"}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Weight ({units === "metric" ? "kg" : "lbs"})
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-12"
                            type="number"
                            step="0.5"
                            placeholder={units === "metric" ? "60" : "132"}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Smart inputs */}
              <div>
                <p className="text-sm font-semibold mb-3">
                  Smart Fit Options{" "}
                  <span className="font-normal text-muted-foreground">(Optional — dramatically improves accuracy)</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Body Shape */}
                  <FormField
                    control={form.control}
                    name="bodyShape"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Your Body Shape</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select body shape" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BODY_SHAPES.map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          Not sure?{" "}
                          <a
                            href="https://calqulate.net/health/body-shape-calculator"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 underline underline-offset-2"
                          >
                            Find your body shape first
                          </a>
                        </p>
                      </FormItem>
                    )}
                  />

                  {/* Dress Style */}
                  <FormField
                    control={form.control}
                    name="dressStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Dress Style</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select dress style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DRESS_STYLES.map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {/* Fit Preference */}
                  <FormField
                    control={form.control}
                    name="fitPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Fit Preference</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select fit preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {FIT_PREFERENCES.map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {/* Fabric Type */}
                  <FormField
                    control={form.control}
                    name="fabric"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Fabric Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select fabric type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {FABRIC_TYPES.map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                </div>

                {/* Brand */}
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Brand</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BRANDS.map((b) => (
                              <SelectItem key={b.value} value={b.value}>
                                {b.label}
                                {"note" in b && b.note ? ` — ${b.note}` : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Calculator className="h-4 w-4 mr-2" />
                  )}
                  {isLoading ? "Calculating..." : "Find My Dress Size"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    form.reset();
                    setResult(null);
                  }}
                  className="flex-1"
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results */}
      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-4xl mx-auto mt-8">
            <CardContent className="p-6 md:p-8 space-y-8">

              {/* Headline */}
              <div className="text-center">
                <p className="text-sm font-semibold text-muted-foreground">Your Recommended Dress Size</p>
                <p className="text-6xl font-bold text-emerald-700 mt-1">
                  {result.primarySize.us}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Across regions: UK {result.primarySize.uk} · EU {result.primarySize.eu} · India{" "}
                  {result.primarySize.india}
                  {result.primarySize.plusSize ? ` · Plus: ${result.primarySize.plusSize}` : ""}
                </p>
              </div>

              {/* Size cards + alt */}
              <div className={`grid gap-4 border-t pt-8 ${result.altSize ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
                <SizeDisplay title="Your Primary Size" result={result.primarySize} accent />
                {result.altSize && (
                  <SizeDisplay title="Alternative Size (if between sizes)" result={result.altSize} />
                )}
              </div>

              {/* Between sizes advice */}
              {result.betweenSizes.show && (
                <div className="border rounded-xl p-4 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-300 space-y-1">
                  <p className="font-semibold text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Between Sizes — Here&apos;s What to Do
                  </p>
                  <p className="text-sm text-yellow-900 dark:text-yellow-200">
                    {result.betweenSizes.advice}
                  </p>
                </div>
              )}

              {/* Measurements + Return Risk */}
              <div className="grid md:grid-cols-2 gap-8 items-start border-t pt-8">
                <ProportionChart measurements={result.measurements} units={units} />
                <ReturnRiskMeter risk={result.returnRisk} reason={result.returnRiskReason} />
              </div>

              {/* Style Note */}
              {result.styleNote && (
                <div className="border-t pt-8">
                  <h3 className="text-base font-semibold flex items-center gap-2 mb-2">
                    <Shirt className="w-5 h-5 text-emerald-600" /> Style Fit Note
                  </h3>
                  <p className="text-sm text-muted-foreground">{result.styleNote}</p>
                </div>
              )}

              {/* Body Shape Note */}
              <div className="border-t pt-8">
                <h3 className="text-base font-semibold flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" /> Body Shape Advice
                </h3>
                <p className="text-sm text-muted-foreground">{result.bodyShapeNote}</p>
                {result.bodyShapeNote.includes("Not sure") && (
                  <a
                    href="https://calqulate.net/health/body-shape-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
                  >
                    Find your body shape →
                  </a>
                )}
              </div>

              {/* Brand Note */}
              {result.brandNote && (
                <div className="border-t pt-8">
                  <h3 className="text-base font-semibold flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-emerald-600" /> Brand Sizing Note
                  </h3>
                  <p className="text-sm text-muted-foreground">{result.brandNote}</p>
                </div>
              )}

              {/* Links */}
              <div className="border-t pt-8">
                <h3 className="text-base font-semibold mb-4">Explore More</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Button asChild variant="outline" size="lg" className="w-full justify-center text-sm whitespace-normal text-center">
                    <Link href="https://calqulate.net/health/body-shape-calculator">
                      Body Shape Calculator
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full justify-center text-sm whitespace-normal text-center">
                    <Link href="https://calqulate.net/health/face-shape-calculator">
                      Face Shape Calculator
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="w-full justify-center text-sm whitespace-normal text-center bg-emerald-700 text-white hover:bg-emerald-600"
                  >
                    <Link href="https://calqulate.net/blog/female-body-shapes-explained">
                      Female Body Shapes Guide
                    </Link>
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
