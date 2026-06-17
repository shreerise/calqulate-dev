import { Stethoscope } from "lucide-react"

export function MedicalReviewerBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm border border-blue-500/30">
      <Stethoscope className="w-3.5 h-3.5" />
      Medically Reviewed by Dr. Jaydeep Sanghani
    </div>
  )
}
