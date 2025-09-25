"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calculator, Scissors } from "lucide-react"

interface CalculationResult {
  perCut: number
  monthly: number
  seasonal: number
  annual: number
  factors: string[]
}

export function LawnMowingCalculator() {
  const [lawnSize, setLawnSize] = useState("")
  const [grassType, setGrassType] = useState("")
  const [terrain, setTerrain] = useState("")
  const [frequency, setFrequency] = useState("")
  const [extras, setExtras] = useState<string[]>([])
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculateCost = () => {
    const size = Number.parseInt(lawnSize)

    if (!size || !grassType || !terrain || !frequency) {
      return
    }

    // Base cost per 1000 sq ft
    let baseCostPer1000 = 35

    // Grass type multiplier
    const grassMultipliers: { [key: string]: number } = {
      bermuda: 1.0,
      fescue: 1.1,
      zoysia: 1.2,
      "st-augustine": 1.15,
      other: 1.05,
    }
    baseCostPer1000 *= grassMultipliers[grassType] || 1.05

    // Terrain multiplier
    const terrainMultipliers: { [key: string]: number } = {
      flat: 1.0,
      sloped: 1.3,
      hilly: 1.6,
    }
    baseCostPer1000 *= terrainMultipliers[terrain] || 1.0

    // Calculate base cost for lawn size
    const perCutCost = Math.round((size / 1000) * baseCostPer1000)

    // Add extras
    let extrasCost = 0
    if (extras.includes("edging")) extrasCost += Math.max(10, size * 0.01)
    if (extras.includes("trimming")) extrasCost += Math.max(15, size * 0.015)
    if (extras.includes("cleanup")) extrasCost += Math.max(20, size * 0.02)

    const totalPerCut = perCutCost + extrasCost

    // Calculate frequency costs
    const frequencyMultipliers: { [key: string]: number } = {
      weekly: 4.3,
      biweekly: 2.15,
      monthly: 1,
    }

    const monthly = Math.round(totalPerCut * (frequencyMultipliers[frequency] || 1))
    const seasonal = Math.round(monthly * 7) // 7 months growing season
    const annual = Math.round(monthly * 8) // 8 months including spring/fall cleanup

    const factors = []
    if (size > 10000) factors.push("Large lawn size increases base cost")
    if (terrain !== "flat") factors.push("Sloped or hilly terrain requires more time")
    if (grassType === "zoysia") factors.push("Zoysia grass requires specialized care")
    if (extras.length > 0) factors.push(`Additional services: ${extras.join(", ")}`)
    if (frequency === "weekly") factors.push("Weekly service provides best lawn health")

    setResult({
      perCut: totalPerCut,
      monthly,
      seasonal,
      annual,
      factors,
    })
  }

  const resetCalculator = () => {
    setLawnSize("")
    setGrassType("")
    setTerrain("")
    setFrequency("")
    setExtras([])
    setResult(null)
  }

  const toggleExtra = (extra: string) => {
    setExtras((prev) => (prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Scissors className="h-6 w-6 text-primary" />
            <CardTitle>Lawn Mowing Cost Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate lawn mowing and maintenance costs based on size, grass type, and service frequency.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="lawn-size">Lawn Size (square feet)</Label>
                <Input
                  id="lawn-size"
                  type="number"
                  placeholder="e.g., 5000"
                  value={lawnSize}
                  onChange={(e) => setLawnSize(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="grass-type">Grass Type</Label>
                <Select value={grassType} onValueChange={setGrassType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grass type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bermuda">Bermuda</SelectItem>
                    <SelectItem value="fescue">Fescue</SelectItem>
                    <SelectItem value="zoysia">Zoysia</SelectItem>
                    <SelectItem value="st-augustine">St. Augustine</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="terrain">Terrain Type</Label>
                <Select value={terrain} onValueChange={setTerrain}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select terrain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="sloped">Sloped</SelectItem>
                    <SelectItem value="hilly">Hilly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="frequency">Mowing Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Additional Services</Label>
                <div className="space-y-2 mt-2">
                  {[
                    { id: "edging", label: "Edging" },
                    { id: "trimming", label: "Trimming" },
                    { id: "cleanup", label: "Debris Cleanup" },
                  ].map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={service.id}
                        checked={extras.includes(service.id)}
                        onChange={() => toggleExtra(service.id)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={service.id} className="text-sm">
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateCost} className="flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Cost
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>

          {result && (
            <div className="space-y-4">
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4">Cost Estimates</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-primary">${result.perCut}</div>
                      <div className="text-sm text-muted-foreground">Per Cut</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-primary">${result.monthly}</div>
                      <div className="text-sm text-muted-foreground">Monthly</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-primary">${result.seasonal}</div>
                      <div className="text-sm text-muted-foreground">Seasonal</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-primary">${result.annual}</div>
                      <div className="text-sm text-muted-foreground">Annual</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {result.factors.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Cost Factors</h4>
                  <ul className="space-y-1">
                    {result.factors.map((factor, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
