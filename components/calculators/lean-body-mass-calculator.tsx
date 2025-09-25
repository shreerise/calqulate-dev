"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function LeanBodyMassCalculator() {
  const [sex, setSex] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [lbm, setLbm] = useState<number | null>(null)

  const calculateLBM = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    if (!w || !h || !sex) return

    let result = 0
    if (sex === "male") {
      result = 0.407 * w + 0.267 * h - 19.2
    } else if (sex === "female") {
      result = 0.252 * w + 0.473 * h - 48.3
    }
    setLbm(Math.round(result * 10) / 10)
  }

  const reset = () => {
    setSex("")
    setWeight("")
    setHeight("")
    setLbm(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lean Body Mass Calculator</CardTitle>
          <CardDescription>
            Estimate your lean body mass (LBM) using the Boer formula.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Sex</Label>
              <Select value={sex} onValueChange={setSex}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
              />
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" onClick={calculateLBM}>
              <Calculator className="h-4 w-4 mr-2" /> Calculate
            </Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>

          {lbm !== null && (
            <>
              <Separator />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Your Lean Body Mass</h3>
                <p className="text-2xl font-bold text-primary">{lbm} kg</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
