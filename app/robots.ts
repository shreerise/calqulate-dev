import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/"],
      },

      // OpenAI (ChatGPT, GPTBot)
      {
        userAgent: "GPTBot",
        allow: "/",
      },

      // Google AI (Gemini, Bard training)
      {
        userAgent: "Google-Extended",
        allow: "/",
      },

      // Anthropic (Claude)
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },

      // Common AI crawlers
      {
        userAgent: "CCBot", // Common Crawl (used by many AI models)
        allow: "/",
      },
    ],
    sitemap: "https://calqulate.net/sitemap.xml",
  }
}