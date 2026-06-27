import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GalleryClient } from "@/components/gallery/gallery-client";

export const metadata: Metadata = {
  title: "Health Visual Guides — Body Shapes, Face Shapes & More | Calqulate",
  description:
    "Browse our interactive visual health guides — body shapes, face shapes, BMI charts, sleep cycles, and more. Click any image to explore detailed guides with personalized calculator recommendations.",
  alternates: { canonical: "https://calqulate.net/gallery" },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main id="main" className="flex-1">
        <GalleryClient />
      </main>
      <Footer />
    </div>
  );
}
