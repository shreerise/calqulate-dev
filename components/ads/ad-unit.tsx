"use client"

import { useEffect, useRef } from "react"

interface AdUnitProps {
  html: string
  className?: string
}

export function AdUnit({ html, className = "" }: AdUnitProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.innerHTML = html

    const scripts = el.querySelectorAll("script")
    const newScripts: HTMLScriptElement[] = []

    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script")
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value)
      })
      if (oldScript.textContent) {
        newScript.textContent = oldScript.textContent
      }
      oldScript.parentNode?.replaceChild(newScript, oldScript)
      newScripts.push(newScript)
    })

    return () => {
      newScripts.forEach((s) => {
        s.parentNode?.removeChild(s)
      })
    }
  }, [html])

  return <div ref={ref} className={className} />
}
