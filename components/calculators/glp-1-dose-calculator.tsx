"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Syringe } from "lucide-react"

export default function GLP1DoseCalculator() {
  const [dose, setDose] = useState("")
  const [concentration, setConcentration] = useState("")
  const [result, setResult] = useState<{ units: number; volume: number } | null>(null)

  const calculate = () => {
    const d = parseFloat(dose)
    const c = parseFloat(concentration)
    if (d > 0 && c > 0) {
      const units = (d / c) * 100
      const volume = d / c
      setResult({ units: Math.round(units), volume: Math.round(volume * 100) / 100 })
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Syringe className="h-6 w-6" />
          GLP-1 Dose Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="dose">Prescribed Dose (mg)</Label>
          <Input
            id="dose"
            type="number"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            placeholder="e.g., 1.0"
          />
        </div>
        <div>
          <Label htmlFor="concentration">Vial Concentration (mg/mL)</Label>
          <Input
            id="concentration"
            type="number"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
            placeholder="e.g., 2.0"
          />
        </div>
        <Button onClick={calculate} className="w-full">
          Calculate Units
        </Button>
        {result && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold">Units to Draw: {result.units}</p>
            <p className="text-sm text-gray-600">Volume: {result.volume} mL</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}