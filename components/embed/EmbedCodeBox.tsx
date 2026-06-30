"use client"

import { useState } from "react"
import { Check, Copy, Code2 } from "lucide-react"

const EMBED_SRC = "https://calqulate.net/embed/glp-1-dose-calculator"

// Includes a plain-text attribution link too, so the credit survives even if a
// site strips the iframe — and an optional auto-resize listener keyed to the
// height messages broadcast by EmbedHeightReporter.
const SNIPPET = `<iframe
  src="${EMBED_SRC}"
  title="GLP-1 Dose Calculator by Calqulate.net"
  width="100%"
  height="760"
  loading="lazy"
  style="max-width:680px;border:1px solid #e5e7eb;border-radius:12px;"
></iframe>
<p style="font-size:12px;font-family:sans-serif;color:#6b7280;">
  Free <a href="https://calqulate.net/health/glp-1-dose-calculator">GLP-1 Dose Calculator</a> by Calqulate.net
</p>
<script>
  window.addEventListener("message", function (e) {
    if (e.data && e.data.type === "calqulate-embed-height") {
      var f = document.querySelector('iframe[src="${EMBED_SRC}"]');
      if (f && e.data.height) f.style.height = e.data.height + "px";
    }
  });
</script>`

export function EmbedCodeBox() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPET)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — user can still select the text manually */
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100">
          <Code2 className="h-5 w-5 text-emerald-700" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Embed this calculator on your site — free</h2>
          <p className="mt-1 text-sm text-gray-500">
            Run a clinic, coaching, or GLP-1 community site? Drop this calculator into any page. Free
            to use, no sign-up — just keep the visible credit link.
          </p>
        </div>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 pr-28 text-xs leading-relaxed text-gray-100">
          <code>{SNIPPET}</code>
        </pre>
        <button
          type="button"
          onClick={copy}
          className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
          aria-label="Copy embed code"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy code"}
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        The widget resizes automatically. Need a custom size or a white-label version?{" "}
        <a href="/contact-us" className="font-medium text-emerald-700 hover:underline">
          Contact us
        </a>
        .
      </p>
    </div>
  )
}
