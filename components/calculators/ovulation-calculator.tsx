"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarHeart, Baby, ShieldCheck, Activity, Info, CalendarClock, Beaker } from "lucide-react"

// Define validation schema
const formSchema = z.object({
  goal: z.enum(["conceive", "prevent", "track"]),
  lastPeriodDate: z.string().min(1, "Please select the first day of your last period."),
  cycleLength: z.string().refine((val) => {
    const num = parseInt(val)
    return num >= 20 && num <= 45
  }, "Cycle length must be between 20 and 45 days."),
  lutealPhase: z.string().refine((val) => {
    const num = parseInt(val)
    return num >= 10 && num <= 16
  }, "Luteal phase is typically between 10 and 16 days."),
})

// Define the shape of our calculated results
interface ResultsState {
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  nextPeriodDate: Date;
  pregnancyTestDate: Date;
  estimatedDueDate: Date;
  goal: "conceive" | "prevent" | "track";
}

// Utility functions for safe date math without external libraries
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

export default function AdvancedOvulationCalculator() {
  const [results, setResults] = useState<ResultsState | null>(null)
  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: "conceive",
      lastPeriodDate: "",
      cycleLength: "28",
      lutealPhase: "14", // Giving users the power to change this based on the Reddit feedback!
    },
  })

  const calculateOvulation = (values: z.infer<typeof formSchema>) => {
    setError("")
    setResults(null)

    try {
      // Parse date safely (YYYY-MM-DD) to avoid timezone shifts
      const [year, month, day] = values.lastPeriodDate.split('-').map(Number)
      const lmp = new Date(year, month - 1, day)
      
      const cycle = parseInt(values.cycleLength)
      const luteal = parseInt(values.lutealPhase)

      if (isNaN(lmp.getTime())) {
        setError("Invalid date selected.")
        return
      }

      // Math Logic for Calculations
      const nextPeriodDate = addDays(lmp, cycle)
      const ovulationDate = addDays(nextPeriodDate, -luteal)
      
      // Fertile window: 5 days before ovulation + day of ovulation + 1 day after
      const fertileWindowStart = addDays(ovulationDate, -5)
      const fertileWindowEnd = addDays(ovulationDate, 1)
      
      // Best time to test is typically 14 Days Past Ovulation (DPO)
      const pregnancyTestDate = addDays(ovulationDate, 14)

      // Due date calculation (if they conceive this cycle). Standard is Ovulation + 266 days.
      const estimatedDueDate = addDays(ovulationDate, 266)

      setResults({
        ovulationDate,
        fertileWindowStart,
        fertileWindowEnd,
        nextPeriodDate,
        pregnancyTestDate,
        estimatedDueDate,
        goal: values.goal,
      })
    } catch (err) {
      setError("An error occurred while calculating. Please check your inputs.")
    }
  }

  return (
    <Card className="max-w-5xl mx-auto border-green-100 shadow-lg">
      <CardHeader className="bg-green-50 border-b border-green-100 rounded-t-xl">
        <div className="flex items-center gap-3 mb-2">
          <CalendarHeart className="w-8 h-8 text-green-600" />
          <CardTitle className="text-2xl text-green-900">100 percent accurate ovulation calculator</CardTitle>
        </div>
        <CardDescription className="text-green-700 text-md">
          Personalize your cycle. Unlike basic apps, we let you adjust your luteal phase for truly accurate results.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN - FORM */}
          <div className="lg:col-span-5 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calculateOvulation)} className="space-y-5">
                
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">What is your primary goal?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:ring-green-500">
                            <SelectValue placeholder="Select your goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="conceive">I'm trying to conceive (TTC)</SelectItem>
                          <SelectItem value="prevent">I'm avoiding pregnancy (TTA)</SelectItem>
                          <SelectItem value="track">I just want to track my health</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastPeriodDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">First day of last period (LMP)</FormLabel>
                      <FormControl>
                        <Input type="date" className="border-gray-300 focus:ring-green-500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cycleLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Cycle Length (Days)</FormLabel>
                        <FormControl>
                          <Input type="number" min="20" max="45" className="border-gray-300 focus:ring-green-500" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">Usually 21-35 days.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lutealPhase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Luteal Phase</FormLabel>
                        <FormControl>
                          <Input type="number" min="10" max="16" className="border-gray-300 focus:ring-green-500" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs text-gray-500">Default is 14 days.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg transition-colors">
                  Calculate My Cycle
                </Button>
              </form>
            </Form>

            {/* Informational Tooltip Block based on Reddit Data */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3 border border-gray-200">
              <Info className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                <strong className="text-gray-800">Why ask for Luteal Phase?</strong> Standard apps assume a 14-day luteal phase. If yours is 12 days, standard apps will miscalculate your ovulation by 2 whole days! Adjusting this ensures exact accuracy.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN - DYNAMIC DASHBOARD */}
          <div className="lg:col-span-7">
            {error && <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>}
            
            {!results && !error && (
              <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-green-200 rounded-xl bg-green-50/50 text-center">
                <CalendarClock className="w-16 h-16 text-green-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to Calculate</h3>
                <p className="text-gray-500 max-w-sm">Enter your details on the left to generate your personalized cycle dashboard and exact fertile window.</p>
              </div>
            )}

            {results && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Goal Based Highlight Header */}
                <div className={`p-4 rounded-xl flex items-center gap-3 text-white ${
                  results.goal === 'conceive' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                  results.goal === 'prevent' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  'bg-gradient-to-r from-teal-500 to-teal-600'
                }`}>
                  {results.goal === 'conceive' && <Baby className="w-8 h-8" />}
                  {results.goal === 'prevent' && <ShieldCheck className="w-8 h-8" />}
                  {results.goal === 'track' && <Activity className="w-8 h-8" />}
                  <div>
                    <h3 className="text-lg font-bold">
                      {results.goal === 'conceive' ? "Your Conception Dashboard" :
                       results.goal === 'prevent' ? "Your Cycle Tracking (Prevention)" :
                       "Your Health & Cycle Dashboard"}
                    </h3>
                    <p className="text-sm opacity-90">Based on a {form.getValues('cycleLength')}-day cycle and {form.getValues('lutealPhase')}-day luteal phase.</p>
                  </div>
                </div>

                {/* Primary Result - Ovulation */}
                <div className="bg-white border-2 border-green-200 rounded-xl p-5 text-center shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 bg-green-500 h-full"></div>
                  <p className="text-sm font-bold text-green-600 uppercase tracking-wider mb-1">Estimated Ovulation Date</p>
                  <p className="text-3xl font-extrabold text-gray-900">{formatDate(results.ovulationDate)}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {results.goal === 'prevent' 
                      ? "If avoiding pregnancy, strictly avoid unprotected sex during the days leading up to this." 
                      : "This is when an egg is released. Combine this with Basal Body Temperature (BBT) tracking for confirmation."}
                  </p>
                </div>

                {/* Grid Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-500 mb-1 flex items-center gap-2"><Activity className="w-4 h-4 text-green-500"/> Fertile Window</p>
                    <p className="text-lg font-bold text-gray-800">{formatDate(results.fertileWindowStart)}</p>
                    <p className="text-sm text-gray-400">to</p>
                    <p className="text-lg font-bold text-gray-800">{formatDate(results.fertileWindowEnd)}</p>
                    {results.goal === 'conceive' && <p className="text-xs text-green-600 mt-2 font-medium">Have intercourse every 1-2 days during this time.</p>}
                  </div>

                  <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-500 mb-1 flex items-center gap-2"><Beaker className="w-4 h-4 text-purple-500"/> Pregnancy Test Date</p>
                    <p className="text-lg font-bold text-gray-800">{formatDate(results.pregnancyTestDate)}</p>
                    <p className="text-xs text-gray-500 mt-2">Wait until this date (14 DPO) to avoid false negatives on tests.</p>
                  </div>
                </div>

                {/* Secondary Results Array */}
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-600 font-medium">Expected Next Period</span>
                    <span className="text-gray-900 font-bold">{formatDate(results.nextPeriodDate)}</span>
                  </div>
                  
                  {results.goal === 'conceive' && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Estimated Due Date <br/><span className="text-xs font-normal text-gray-400">(If conceived this cycle)</span></span>
                      <span className="text-green-700 font-bold">{formatDate(results.estimatedDueDate)}</span>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}