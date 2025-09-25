"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function RFMCalculator() {
  const [sex, setSex] = useState("")
  const [height, setHeight] = useState("")
  const [waist, setWaist] = useState("")
  const [rfm, setRfm] = useState<number | null>(null)

  const calculateRFM = () => {
    const h = parseFloat(height)
    const w = parseFloat(waist)
    if (!h || !w || !sex) return

    let result = 0
    if (sex === "male") {
      result = 64 - (20 * h) / w
    } else if (sex === "female") {
      result = 76 - (20 * h) / w
    }
    setRfm(Math.round(result * 10) / 10)
  }

  const reset = () => {
    setSex("")
    setHeight("")
    setWaist("")
    setRfm(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relative Fat Mass (RFM) Calculator</CardTitle>
          <CardDescription>
            Estimate body fat percentage using the RFM formula.
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
              <Label>Height (cm)</Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
              />
            </div>
            <div>
              <Label>Waist Circumference (cm)</Label>
              <Input
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="e.g. 85"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" onClick={calculateRFM}>
              <Calculator className="h-4 w-4 mr-2" /> Calculate
            </Button>
            <Button variant="outline" onClick={reset}>Reset</Button>
          </div>

          {rfm !== null && (
            <>
              <Separator />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Your Estimated Body Fat</h3>
                <p className="text-2xl font-bold text-primary">{rfm}%</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
