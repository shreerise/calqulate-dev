"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calculator, Home } from "lucide-react"

interface CalculationResult {
  lowEstimate: number
  highEstimate: number
  averageEstimate: number
  costPerSqFt: number
  factors: string[]
}

export function HomeAdditionCalculator() {
  const [additionSize, setAdditionSize] = useState("")
  const [additionType, setAdditionType] = useState("")
  const [finishLevel, setFinishLevel] = useState("")
  const [foundation, setFoundation] = useState("")
  const [location, setLocation] = useState("")
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculateCost = () => {
    const size = Number.parseInt(additionSize)

    if (!size || !additionType || !finishLevel || !foundation || !location) {
      return
    }

    // Base cost per square foot by addition type
    const baseCosts: { [key: string]: number } = {
      room: 120,
      bathroom: 200,
      kitchen: 250,
      bedroom: 100,
      "family-room": 110,
      sunroom: 150,
      garage: 80,
      "second-story": 140,
    }

    let costPerSqFt = baseCosts[additionType] || 120

    // Finish level multiplier
    const finishMultipliers: { [key: string]: number } = {
      basic: 0.8,
      standard: 1.0,
      premium: 1.4,
      luxury: 1.8,
    }
    costPerSqFt *= finishMultipliers[finishLevel] || 1.0

    // Foundation multiplier
    const foundationMultipliers: { [key: string]: number } = {
      slab: 1.0,
      "crawl-space": 1.15,
      basement: 1.4,
    }
    costPerSqFt *= foundationMultipliers[foundation] || 1.0

    // Location multiplier
    const locationMultipliers: { [key: string]: number } = {
      rural: 0.85,
      suburban: 1.0,
      urban: 1.25,
      "high-cost": 1.5,
    }
    costPerSqFt *= locationMultipliers[location] || 1.0

    const averageEstimate = Math.round(size * costPerSqFt)
    const lowEstimate = Math.round(averageEstimate * 0.75)
    const highEstimate = Math.round(averageEstimate * 1.35)

    const factors = []
    if (additionType === "kitchen") factors.push("Kitchen additions require extensive plumbing and electrical work")
    if (additionType === "bathroom") factors.push("Bathroom additions need specialized plumbing and ventilation")
    if (additionType === "second-story") factors.push("Second-story additions require structural reinforcement")
    if (finishLevel === "luxury") factors.push("Luxury finishes significantly increase material costs")
    if (foundation === "basement") factors.push("Basement foundation adds excavation and waterproofing costs")
    if (location === "urban" || location === "high-cost")
      factors.push("Urban locations have higher labor and permit costs")
    if (size > 500) factors.push("Large additions may require additional structural work")

    setResult({
      lowEstimate,
      highEstimate,
      averageEstimate,
      costPerSqFt: Math.round(costPerSqFt),
      factors,
    })
  }

  const resetCalculator = () => {
    setAdditionSize("")
    setAdditionType("")
    setFinishLevel("")
    setFoundation("")
    setLocation("")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <CardTitle>Home Addition Cost Calculator</CardTitle>
          </div>
          <CardDescription>
            Estimate the cost of your home addition project based on size, type, and finish level.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="addition-size">Addition Size (square feet)</Label>
                <Input
                  id="addition-size"
                  type="number"
                  placeholder="e.g., 300"
                  value={additionSize}
                  onChange={(e) => setAdditionSize(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="addition-type">Addition Type</Label>
                <Select value={additionType} onValueChange={setAdditionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select addition type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room">General Room</SelectItem>
                    <SelectItem value="bathroom">Bathroom</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="family-room">Family Room</SelectItem>
                    <SelectItem value="sunroom">Sunroom</SelectItem>
                    <SelectItem value="garage">Garage</SelectItem>
                    <SelectItem value="second-story">Second Story</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="finish-level">Finish Level</Label>
                <Select value={finishLevel} onValueChange={setFinishLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select finish level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="foundation">Foundation Type</Label>
                <Select value={foundation} onValueChange={setFoundation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select foundation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slab">Slab on Grade</SelectItem>
                    <SelectItem value="crawl-space">Crawl Space</SelectItem>
                    <SelectItem value="basement">Basement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location Type</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rural">Rural</SelectItem>
                    <SelectItem value="suburban">Suburban</SelectItem>
                    <SelectItem value="urban">Urban</SelectItem>
                    <SelectItem value="high-cost">High-Cost Area</SelectItem>
                  </SelectContent>
                </Select>
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
                <h3 className="text-lg font-semibold mb-4">Estimated Project Cost</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-green-600">${result.lowEstimate.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Low Estimate</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-primary">${result.averageEstimate.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Average Estimate</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-orange-600">${result.highEstimate.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">High Estimate</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-muted-foreground">${result.costPerSqFt}</div>
                      <div className="text-sm text-muted-foreground">Per Sq Ft</div>
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
