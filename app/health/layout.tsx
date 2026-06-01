import type React from "react"
import { AdUnit } from "@/components/ads/ad-unit"
import { NATIVE_AD } from "@/components/ads/ad-codes"

export default function HealthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}

      {/* Native Ad - between content and footer on every calculator page */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <AdUnit html={NATIVE_AD} />
          </div>
        </div>
      </div>
    </>
  )
}
