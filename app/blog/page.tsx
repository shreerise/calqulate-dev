// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogs } from "@/lib/blog/blogs-data";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Calqulate Blog — Body Shape, Face Shape & Health Guides",
  description:
    "Read interactive guides on body shapes, face shapes, fashion, fitness, and health. Personalized recommendations powered by Calqulate's calculators.",
  alternates: { canonical: "https://calqulate.net/blog" },
};

const categories = ["All", "Body Shape", "Face Shape"] as const;

export default function BlogListingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-slate-50 to-white">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-600">
            Calqulate Journal
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-800 md:text-5xl">
            Why Do Some Diets, Workouts & Clothes Work for Others But Not You?{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
             Your Body Type Holds the Answer
            </span>
            .
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Interactive guides powered by smart calculators - discover your body shape, perfect style, ideal diet, and fitness plan personalized specifically for your body and goals.
          </p>
        </div>
      </section>

      {/* ── Category Filter (client-side toggle would go here in v2) ── */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/blog" : `/blog?category=${cat}`}
              className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Blog Grid ───────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Featured image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-contain transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Category badge */}
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
                  {blog.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-bold leading-snug text-slate-900 group-hover:text-emerald-700">
                  {blog.title}
                </h2>
                <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                  {blog.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-5 text-xs text-slate-500">
                  <span>{blog.readTime}</span>
                  <span className="font-medium text-emerald-600 group-hover:translate-x-1 transition">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
