"use client"

import { useEffect } from "react"

interface AdProps {
  slot: string
  className?: string
  format?: string
}

export function AdsenseAd({
  slot,
  className = "",
  format = "auto",
}: AdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {}
  }, [])

  return (
    <div className={`w-full text-center my-6 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4361792190799561"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}