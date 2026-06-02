"use client"

import { useEffect } from "react"

// Client-only helper that finds paragraphs inside `.prose` and, when a
// paragraph's rendered line count exceeds 3, splits it into multiple <p>
// blocks of shorter sentence groups for easier reading.
export default function ImproveParagraphs() {
  useEffect(() => {
    const proseBlocks = Array.from(document.querySelectorAll(".prose"))

    const getLineCount = (el: HTMLElement) => {
      const style = window.getComputedStyle(el)
      const lineHeight = parseFloat(style.lineHeight || "0")
      if (!lineHeight) return 0
      const height = el.getBoundingClientRect().height
      return Math.round(height / lineHeight)
    }

    const splitIntoGroups = (sentences: string[], maxSentencesPerGroup = 3) => {
      const groups: string[][] = []
      let current: string[] = []
      for (const s of sentences) {
        current.push(s)
        if (current.length >= maxSentencesPerGroup) {
          groups.push(current)
          current = []
        }
      }
      if (current.length) groups.push(current)
      return groups
    }

    proseBlocks.forEach((block) => {
      const paras = Array.from(block.querySelectorAll("p")) as HTMLParagraphElement[]
      paras.forEach((p) => {
        // skip paragraphs that already contain inner elements (lists, links, etc.)
        if (p.querySelector("*") && p.childElementCount > 0) return
        const text = p.textContent?.trim() || ""
        if (!text) return

        const lines = getLineCount(p)
        if (lines <= 3) return

        // split into sentences (simple regex). Keep punctuation.
        const sentences = text.match(/[^.!?]+[.!?\u2026]?/g)?.map((s) => s.trim()) || [text]
        if (sentences.length <= 1) return

        const groups = splitIntoGroups(sentences, 2) // aim for 2 sentences per paragraph

        // build new HTML
        const frag = document.createDocumentFragment()
        groups.forEach((g, i) => {
          const np = document.createElement("p")
          np.className = p.className
          np.textContent = g.join(" ")
          frag.appendChild(np)
        })

        p.replaceWith(frag)
      })
    })
  }, [])

  return null
}
