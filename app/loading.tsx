import { Calculator } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Calculator className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
        <p className="text-muted-foreground">Loading Calculator Hub...</p>
      </div>
    </div>
  )
}
