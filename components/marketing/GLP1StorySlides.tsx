"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * "The GLP-1 story" — three high-CTR slides that tell the miracle → danger →
 * solution arc.
 *
 * Desktop: three full-width panels stacked vertically. The text/visual sides
 * alternate (left-text → right-text → left-text) and each panel fades + slides
 * into view on scroll via IntersectionObserver.
 *
 * Mobile: the three panels collapse into a single auto-advancing carousel that
 * cycles on its own, with tappable dots.
 *
 * Images live in /public with the SEO-friendly filenames below — drop them in
 * manually.
 */

type Slide = {
  eyebrow: string;
  title: string;
  sub: string;
  img: string;
  alt: string;
  /** tailwind color accents per theme */
  theme: {
    ring: string;
    chip: string;
    chipText: string;
    glow: string;
    title: string;
  };
};

const SLIDES: Slide[] = [
  {
    eyebrow: "The Miracle",
    title: "The scale is dropping. The food noise is gone.",
    sub: "This is why you started. Effortless weight loss, appetite finally silenced.",
    img: "/glp1-weight-dropping-food-noise-gone.webp",
    alt: "Person experiencing effortless GLP-1 weight loss with food noise silenced",
    theme: {
      ring: "ring-emerald-200",
      chip: "bg-emerald-100",
      chipText: "text-emerald-700",
      glow: "bg-emerald-400/25",
      title: "text-emerald-900",
    },
  },
  {
    eyebrow: "The Danger",
    title: "But what are you actually losing?",
    sub: "Every pound on the scale is muscle and metabolism too — and one dosing error makes it worse.",
    img: "/glp1-muscle-loss-metabolism-warning.webp",
    alt: "Warning that GLP-1 weight loss includes muscle and metabolism loss",
    theme: {
      ring: "ring-red-200",
      chip: "bg-red-100",
      chipText: "text-red-700",
      glow: "bg-red-400/25",
      title: "text-red-900",
    },
  },
  {
    eyebrow: "The Calqulate Solution",
    title: "Stronger. Leaner. Biologically younger.",
    sub: "Calqulate perfects your dose, protects your muscle, and turns your heart age back.",
    img: "/calqulate-dose-muscle-heart-age-solution.webp",
    alt: "Calqulate solution perfecting GLP-1 dose, protecting muscle and lowering heart age",
    theme: {
      ring: "ring-amber-200",
      chip: "bg-amber-100",
      chipText: "text-amber-700",
      glow: "bg-amber-400/30",
      title: "text-amber-900",
    },
  },
];

/* ── Desktop panel: alternating sides + scroll reveal ───────────────────── */
function DesktopPanel({ slide, index }: { slide: Slide; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const textFirst = index % 2 === 0; // slide 1 & 3 → text left, slide 2 → text right

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Text = (
    <div
      className={[
        "flex-1 transition-all duration-700 ease-out",
        shown ? "opacity-100 translate-x-0" : "opacity-0",
        shown ? "" : textFirst ? "-translate-x-10" : "translate-x-10",
      ].join(" ")}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-full ${slide.theme.chip} ${slide.theme.chipText} px-4 py-1.5 text-xs font-bold tracking-widest`}
      >
        {slide.eyebrow}
      </span>
      <h3
        className={`mt-4 text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight ${slide.theme.title}`}
      >
        {slide.title}
      </h3>
      <p className="mt-4 text-base md:text-lg text-gray-600 max-w-md leading-relaxed">
        {slide.sub}
      </p>
    </div>
  );

  const Visual = (
    <div
      className={[
        "relative flex-1 transition-all duration-700 ease-out delay-100",
        shown ? "opacity-100 translate-x-0 scale-100" : "opacity-0 scale-95",
        shown ? "" : textFirst ? "translate-x-10" : "-translate-x-10",
      ].join(" ")}
    >
      <div className={`absolute -inset-6 rounded-[2rem] ${slide.theme.glow} blur-3xl`} />
      <div
        className={`relative aspect-[5/4] w-full overflow-hidden rounded-3xl ring-1 ${slide.theme.ring} shadow-xl bg-white`}
      >
        <Image
          src={slide.img}
          alt={slide.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-contain p-1"
        />
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={`flex items-center gap-10 lg:gap-16 ${
        textFirst ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {Text}
      {Visual}
    </div>
  );
}

/* ── Mobile carousel: auto-advancing ────────────────────────────────────── */
function MobileCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {SLIDES.map((slide) => (
            <div key={slide.title} className="w-full flex-shrink-0 px-1">
              <div className="relative mb-5">
                <div
                  className={`absolute -inset-3 rounded-3xl ${slide.theme.glow} blur-2xl`}
                />
                <div
                  className={`relative aspect-[5/4] w-full overflow-hidden rounded-2xl ring-1 ${slide.theme.ring} shadow-lg bg-white`}
                >
                  <Image
                    src={slide.img}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    className="object-contain p-1"
                  />
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-2 rounded-full ${slide.theme.chip} ${slide.theme.chipText} px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest`}
              >
                {slide.eyebrow}
              </span>
              <h3
                className={`mt-3 text-xl font-extrabold tracking-tight ${slide.theme.title}`}
              >
                {slide.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {slide.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              setActive(i);
              setPaused(true);
            }}
            className={`h-2 rounded-full transition-all ${
              i === active
                ? "w-6 bg-emerald-600"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function GLP1StorySlides() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Desktop: alternating panels with scroll reveal */}
        <div className="hidden md:flex flex-col gap-20 lg:gap-28 max-w-6xl mx-auto">
          {SLIDES.map((slide, i) => (
            <DesktopPanel key={slide.title} slide={slide} index={i} />
          ))}
        </div>

        {/* Mobile: auto-advancing carousel */}
        <div className="md:hidden max-w-md mx-auto">
          <MobileCarousel />
        </div>
      </div>
    </section>
  );
}
