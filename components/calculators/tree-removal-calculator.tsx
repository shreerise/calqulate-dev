"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calculator, TreePine } from "lucide-react"

interface CalculationResult {
  lowEstimate: number
  highEstimate: number
  averageEstimate: number
  factors: string[]
}

export function TreeRemovalCalculator() {
  const [treeHeight, setTreeHeight] = useState("")
  const [treeDiameter, setTreeDiameter] = useState("")
  const [treeType, setTreeType] = useState("")
  const [accessibility, setAccessibility] = useState("")
  const [stumpRemoval, setStumpRemoval] = useState("")
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculateCost = () => {
    const height = Number.parseInt(treeHeight)
    const diameter = Number.parseInt(treeDiameter)

    if (!height || !diameter || !treeType || !accessibility) {
      return
    }

    // Base cost calculation
    let baseCost = 0
    if (height <= 30) baseCost = 300
    else if (height <= 60) baseCost = 600
    else if (height <= 80) baseCost = 900
    else baseCost = 1200

    // Diameter multiplier
    const diameterMultiplier = Math.max(1, diameter / 12)
    baseCost *= diameterMultiplier

    // Tree type multiplier
    const treeTypeMultipliers: { [key: string]: number } = {
      oak: 1.3,
      pine: 1.0,
      maple: 1.2,
      birch: 0.9,
      other: 1.1,
    }
    baseCost *= treeTypeMultipliers[treeType] || 1.1

    // Accessibility multiplier
    const accessibilityMultipliers: { [key: string]: number } = {
      easy: 1.0,
      moderate: 1.3,
      difficult: 1.8,
    }
    baseCost *= accessibilityMultipliers[accessibility] || 1.0

    // Stump removal
    let stumpCost = 0
    if (stumpRemoval === "yes") {
      stumpCost = Math.max(100, diameter * 8)
    }

    const totalBaseCost = baseCost + stumpCost
    const lowEstimate = Math.round(totalBaseCost * 0.8)
    const highEstimate = Math.round(totalBaseCost * 1.4)
    const averageEstimate = Math.round(totalBaseCost)

    const factors = []
    if (height > 60) factors.push("Large tree height increases cost")
    if (diameter > 24) factors.push("Large diameter requires specialized equipment")
    if (accessibility === "difficult") factors.push("Limited access increases labor time")
    if (treeType === "oak") factors.push("Hardwood trees are more expensive to remove")
    if (stumpRemoval === "yes") factors.push("Stump removal adds additional cost")

    setResult({
      lowEstimate,
      highEstimate,
      averageEstimate,
      factors,
    })
  }

  const resetCalculator = () => {
    setTreeHeight("")
    setTreeDiameter("")
    setTreeType("")
    setAccessibility("")
    setStumpRemoval("")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TreePine className="h-6 w-6 text-primary" />
            <CardTitle>Tree Removal Cost Calculator</CardTitle>
          </div>
          <CardDescription>
            Get an accurate estimate for tree removal costs based on size, type, and accessibility.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="height">Tree Height (feet)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 40"
                  value={treeHeight}
                  onChange={(e) => setTreeHeight(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="diameter">Trunk Diameter (inches)</Label>
                <Input
                  id="diameter"
                  type="number"
                  placeholder="e.g., 18"
                  value={treeDiameter}
                  onChange={(e) => setTreeDiameter(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="tree-type">Tree Type</Label>
                <Select value={treeType} onValueChange={setTreeType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tree type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oak">Oak</SelectItem>
                    <SelectItem value="pine">Pine</SelectItem>
                    <SelectItem value="maple">Maple</SelectItem>
                    <SelectItem value="birch">Birch</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="accessibility">Accessibility</Label>
                <Select value={accessibility} onValueChange={setAccessibility}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accessibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy Access</SelectItem>
                    <SelectItem value="moderate">Moderate Access</SelectItem>
                    <SelectItem value="difficult">Difficult Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="stump-removal">Include Stump Removal?</Label>
                <Select value={stumpRemoval} onValueChange={setStumpRemoval}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
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
                <h3 className="text-lg font-semibold mb-4">Estimated Cost Range</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">${result.lowEstimate.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Low Estimate</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">${result.averageEstimate.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Average Estimate</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">${result.highEstimate.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">High Estimate</div>
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
