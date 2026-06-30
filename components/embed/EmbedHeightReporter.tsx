"use client"

import { useEffect } from "react"

/**
 * Posts the embed document's height to the host page so an (optional) resizer
 * snippet on the embedding site can auto-size the iframe — no fixed-height
 * clipping. Safe no-op when not framed. We post height only (no PII).
 */
export function EmbedHeightReporter() {
  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) return

    const post = () => {
      const height = Math.ceil(document.documentElement.scrollHeight)
      window.parent.postMessage({ type: "calqulate-embed-height", height }, "*")
    }

    post()
    const ro = new ResizeObserver(post)
    ro.observe(document.documentElement)
    window.addEventListener("load", post)

    return () => {
      ro.disconnect()
      window.removeEventListener("load", post)
    }
  }, [])

  return null
}
