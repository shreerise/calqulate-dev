import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Calqulate — Smart Health Calculators & Vitals Tracker",
    short_name: "Calqulate",
    description:
      "Calculate your health metrics, track Metabolic Health Score, heart age, and disease risk — all in one place.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#059669",
    categories: ["health", "fitness", "medical"],
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon/android-chrome-512x512.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "any maskable",
      },
      {
        src: "/favicon/android-chrome-192x192.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/favicon/apple-touch-icon.webp",
        sizes: "180x180",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
  };
}
