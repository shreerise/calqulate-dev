"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function PonderalIndexCalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [pi, setPi] = useState<number | null>(null)

  const calculatePI = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height) / 100 // convert cm to meters
    if (!w || !h) return

    const result = w / Math.pow(h, 3)
    setPi(Math.round(result * 100) / 100)
  }

  const reset = () => {
    setWeight("")
    setHeight("")
    setPi(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ponderal Index Calculator</CardTitle>
          <CardDescription>
            Calculate the Ponderal Index (PI) to assess body composition.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
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
            <Button className="flex-1" onClick={calculatePI}>
              <Calculator className="h-4 w-4 mr-2" /> Calculate
            </Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>

          {pi !== null && (
            <>
              <Separator />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Your Ponderal Index</h3>
                <p className="text-2xl font-bold text-primary">{pi}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
