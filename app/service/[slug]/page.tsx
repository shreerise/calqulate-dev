import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, getService } from "../data";
import { SinglePlan } from "@/components/vitals/SinglePlan";
import { MetricForm } from "@/components/vitals/MetricForm";
import { CalculatorSearch } from "@/components/search/CalculatorSearch";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return {};
  const url = `https://calqulate.net/service/${svc.slug}`;
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    keywords: svc.keywords,
    alternates: { canonical: url },
    openGraph: { title: svc.metaTitle, description: svc.metaDescription, url, type: "website" },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();

  // Each tracker foregrounds its own metric in the free snapshot.
  const SNAPSHOTS: Record<string, { heading: string; sub: string; focus: "metabolic" | "heartAge" | "glp1" }> = {
    "metabolic-health-tracker": {
      heading: "Your free metabolic snapshot",
      sub: "Enter your numbers to see today's Metabolic Health Score. Create an account to track it over time and watch it improve.",
      focus: "metabolic",
    },
    "heart-age-tracker": {
      heading: "Your free heart age snapshot",
      sub: "Enter your numbers to find out how old your heart really is. Create an account to track it and watch it get younger.",
      focus: "heartAge",
    },
    "glp1-progress-tracker": {
      heading: "Your free GLP-1 body-composition snapshot",
      sub: "Enter your numbers to see your lean mass and risk — not just weight. Create an account to track muscle vs. fat over time.",
      focus: "glp1",
    },
  };
  const snapshot = SNAPSHOTS[svc.slug] ?? SNAPSHOTS["metabolic-health-tracker"];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: svc.name,
    description: svc.metaDescription,
    brand: { "@type": "Brand", name: "Calqulate" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "119",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <div className="mb-8 flex justify-center">
        <CalculatorSearch />
      </div>

      {/* Hero */}
      <section className="text-center">
        <p className="mb-2 text-sm font-medium text-blue-600">{svc.tagline}</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{svc.heroHeadline}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{svc.heroSub}</p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="#snapshot" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
            Get my free snapshot
          </a>
          <Link href="/dashboard" className="rounded-lg border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-50">
            Go to dashboard
          </Link>
        </div>
      </section>

      {/* Value bullets */}
      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        {svc.bullets.map((b) => (
          <div key={b} className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
            <span className="mt-1 text-blue-600">✓</span>
            <span className="text-gray-800">{b}</span>
          </div>
        ))}
      </section>

      {/* Free interactive snapshot — the conversion hook */}
      <section id="snapshot" className="mt-16">
        <h2 className="text-2xl font-bold">{snapshot.heading}</h2>
        <p className="mt-1 text-gray-600">{snapshot.sub}</p>
        <div className="mt-6">
          <MetricForm productSlug={svc.slug} focus={snapshot.focus} />
        </div>
      </section>

      {/* Pricing */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold">Track it over time</h2>
        <p className="mt-1 text-center text-gray-600">
          A snapshot is a starting point. The value is the trend.
        </p>
        <div className="mt-8">
          <SinglePlan />
        </div>
      </section>

      <p className="mt-12 text-center text-xs text-gray-400">
        Educational decision-support only. Not medical advice, diagnosis or treatment.
        Risk models: 2013 ACC/AHA Pooled Cohort Equations, Framingham (D&apos;Agostino 2008), FINDRISC.
      </p>
    </main>
  );
}
