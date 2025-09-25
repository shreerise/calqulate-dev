"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator } from "lucide-react"

export default function ABSICalculator() {
  const [waist, setWaist] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const calculateABSI = () => {
    const waistNum = Number(waist)
    const weightNum = Number(weight)
    const heightNum = Number(height) / 100 // convert cm → meters

    if (!waistNum || !weightNum || !heightNum) return

    const bmi = weightNum / (heightNum * heightNum)
    const absi =
      waistNum / (Math.pow(bmi, 2 / 3) * Math.pow(heightNum, 0.5))

    setResult(absi)
  }

  const resetCalculator = () => {
    setWaist("")
    setWeight("")
    setHeight("")
    setResult(null)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-primary" />
          <CardTitle>ABSI Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate your A Body Shape Index (ABSI) using waist, weight, and height.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="number"
          placeholder="Waist circumference (cm)"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <div className="flex gap-4">
          <Button onClick={calculateABSI} className="flex-1">
            <Calculator className="h-4 w-4 mr-2" /> Calculate ABSI
          </Button>
          <Button variant="outline" onClick={resetCalculator}>
            Reset
          </Button>
        </div>

        {result !== null && (
          <div className="text-lg font-semibold text-green-600">
            Your ABSI: {result.toFixed(5)}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
