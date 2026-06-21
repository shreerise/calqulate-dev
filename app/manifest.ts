import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Calqulate Vitals — Mission Control for Your Body",
    short_name: "Calqulate",
    description:
      "Track your Metabolic Health Score, Longevity Index, heart age and 10-year disease risk — and model your future self.",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b1220",
    theme_color: "#059669",
    icons: [
      { src: "/logo.webp", sizes: "192x192", type: "image/webp", purpose: "any" },
      { src: "/logo.webp", sizes: "512x512", type: "image/webp", purpose: "any" },
      { src: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/jpeg", purpose: "maskable" },
    ],
  };
}
