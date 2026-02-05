"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, addYears, isValid, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Calculator, RefreshCw, Loader2, CalendarDays, Clock, PartyPopper, Star, Hourglass } from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  dob: z.string().refine((val) => isValid(new Date(val)), {
    message: "Please enter a valid date of birth.",
  }),
  targetDate: z.string().refine((val) => isValid(new Date(val)), {
    message: "Please enter a valid target date.",
  }),
});

// --- HELPER FUNCTIONS ---
const getZodiacSign = (day: number, month: number) => {
  const signs = [
    "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
    "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
  ];
  const lastDay = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
  return day > lastDay[month] ? signs[(month + 1) % 12] : signs[month % 12];
};

const getBirthstone = (month: number) => {
  const stones = [
    "Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl",
    "Ruby", "Peridot", "Sapphire", "Opal", "Topaz", "Turquoise"
  ];
  return stones[month];
};

// --- TYPES ---
interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: {
    days: number;
    months: number;
    weekday: string;
    date: string;
  };
  zodiac: string;
  birthstone: string;
  dayBorn: string;
}

export default function AgeCalculator() {
  const [result, setResult] = useState<AgeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: "",
      targetDate: todayStr,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Simulate calculation delay for UX "feel"
    setTimeout(() => {
      const birthDate = new Date(values.dob);
      const targetDate = new Date(values.targetDate);

      // Core Age Calculation
      let years = differenceInYears(targetDate, birthDate);
      let months = differenceInMonths(targetDate, birthDate) % 12;
      
      // Calculate remaining days accurately
      const tempDate = new Date(birthDate);
      tempDate.setFullYear(tempDate.getFullYear() + years);
      tempDate.setMonth(tempDate.getMonth() + months);
      let days = differenceInDays(targetDate, tempDate);

      // Negative handling if target is before temp (edge cases)
      if (days < 0) {
        months -= 1;
        const previousMonthDate = new Date(birthDate);
        previousMonthDate.setFullYear(previousMonthDate.getFullYear() + years);
        previousMonthDate.setMonth(previousMonthDate.getMonth() + months);
        days = differenceInDays(targetDate, previousMonthDate);
      }
      
      // Total stats
      const totalMonths = differenceInMonths(targetDate, birthDate);
      const totalWeeks = differenceInWeeks(targetDate, birthDate);
      const totalDays = differenceInDays(targetDate, birthDate);
      const totalHours = differenceInHours(targetDate, birthDate);
      const totalMinutes = differenceInMinutes(targetDate, birthDate);

      // Next Birthday Logic
      const currentYear = targetDate.getFullYear();
      let nextBday = new Date(birthDate);
      nextBday.setFullYear(currentYear);
      if (nextBday < targetDate) {
        nextBday.setFullYear(currentYear + 1);
      }
      
      const nextBdayMonths = differenceInMonths(nextBday, targetDate);
      // Adjust next bday days
      const tempNextDate = new Date(targetDate);
      tempNextDate.setMonth(tempNextDate.getMonth() + nextBdayMonths);
      const nextBdayDays = differenceInDays(nextBday, tempNextDate);

      const weekdayBorn = birthDate.toLocaleDateString("en-US", { weekday: "long" });
      const nextBirthdayWeekday = nextBday.toLocaleDateString("en-US", { weekday: "long" });
      const nextBirthdayDateStr = nextBday.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

      // Fun Facts
      const zodiac = getZodiacSign(birthDate.getDate(), birthDate.getMonth());
      const birthstone = getBirthstone(birthDate.getMonth());

      setResult({
        years,
        months,
        days,
        totalMonths,
        totalWeeks,
        totalDays,
        totalHours,
        totalMinutes,
        nextBirthday: {
          days: nextBdayDays,
          months: nextBdayMonths,
          weekday: nextBirthdayWeekday,
          date: nextBirthdayDateStr,
        },
        zodiac,
        birthstone,
        dayBorn: weekdayBorn,
      });

      setIsLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 600);
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-lg border-t-4 border-t-primary" id="calculator">
        <CardHeader className="bg-muted/20">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Hourglass className="w-6 h-6 text-primary" /> 
            Age Calculator
          </CardTitle>
          <CardDescription>
            Calculate your exact age in years, months, and days, plus discover interesting facts about your time on earth.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-12 text-lg" max={todayStr} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Calculate Age At (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-12 text-lg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" className="flex-1 text-lg h-12" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Calculator className="h-5 w-5 mr-2" />}
                  {isLoading ? "Calculating..." : "Calculate Age"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 text-lg h-12"
                  onClick={() => {
                    form.reset();
                    setResult(null);
                  }}
                  disabled={isLoading}
                >
                  <RefreshCw className="h-5 w-5 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* RESULTS SECTION */}
      <div ref={resultsRef}>
        {result && (
          <div className="max-w-4xl mx-auto mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Main Age Card */}
            <Card className="overflow-hidden border-primary/20 shadow-xl">
              <div className="bg-primary/5 p-6 md:p-10 text-center">
                <p className="text-lg text-muted-foreground font-medium mb-2">You are exactly</p>
                <div className="flex flex-wrap justify-center items-baseline gap-4 text-primary">
                  <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tight">{result.years}</span>
                  <span className="text-xl md:text-2xl font-medium text-muted-foreground">years,</span>
                  <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tight">{result.months}</span>
                  <span className="text-xl md:text-2xl font-medium text-muted-foreground">months, and</span>
                  <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tight">{result.days}</span>
                  <span className="text-xl md:text-2xl font-medium text-muted-foreground">days old</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border shadow-sm text-sm font-medium text-muted-foreground">
                  <CalendarDays className="w-4 h-4 text-primary" /> Born on {result.dayBorn}
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Next Birthday Card */}
              <Card className="flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PartyPopper className="w-5 h-5 text-orange-500" /> Next Birthday
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center">
                   <div className="text-center space-y-2 mb-6">
                      <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                        {result.nextBirthday.months} <span className="text-lg font-normal text-muted-foreground">months</span> {result.nextBirthday.days} <span className="text-lg font-normal text-muted-foreground">days</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        until your special day on <b>{result.nextBirthday.date}</b> ({result.nextBirthday.weekday})
                      </p>
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Last Birthday</span>
                        <span>Next Birthday</span>
                      </div>
                      {/* Inverse logic for progress: closer to 0 days remaining = 100% */}
                      <Progress value={Math.max(5, 100 - ((result.nextBirthday.months * 30 + result.nextBirthday.days) / 3.65))} className="h-3" />
                   </div>
                </CardContent>
              </Card>

              {/* Fun Facts Card */}
              <Card>
                <CardHeader className="pb-2">
                   <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="w-5 h-5 text-purple-500" /> Did You Know?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                    <span className="text-sm font-medium">Zodiac Sign</span>
                    <span className="font-bold text-primary">{result.zodiac}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                    <span className="text-sm font-medium">Birthstone</span>
                    <span className="font-bold text-primary">{result.birthstone}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                     <span className="text-sm font-medium">Day of Birth</span>
                     <span className="font-bold text-primary">{result.dayBorn}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Time Alive Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" /> Time Alive Breakdown
                </CardTitle>
                <CardDescription>A precise look at how long you have been on this journey.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                    <p className="text-xs uppercase text-muted-foreground font-semibold mb-1">Total Months</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200">{result.totalMonths.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                    <p className="text-xs uppercase text-muted-foreground font-semibold mb-1">Total Weeks</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200">{result.totalWeeks.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                    <p className="text-xs uppercase text-muted-foreground font-semibold mb-1">Total Days</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200">{result.totalDays.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                    <p className="text-xs uppercase text-muted-foreground font-semibold mb-1">Total Hours</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200">{result.totalHours.toLocaleString()}</p>
                  </div>
                </div>
                <Separator className="my-6" />
                <p className="text-center text-sm text-muted-foreground">
                  You have lived for approximately <span className="font-mono font-medium text-foreground">{result.totalMinutes.toLocaleString()}</span> minutes.
                  <br/>That's a lot of time to make a difference!
                </p>
              </CardContent>
            </Card>

          </div>
        )}
      </div>
    </>
  );
}