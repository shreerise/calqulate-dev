"use client";

import { useState } from "react";
import {
  haircutGuides,
  haircutFaqs,
  identificationSteps,
  tldrBullets,
} from "../../lib/blog/haircut-face-shape-data";
import HaircutLookbookPdfButton from "../haircut/HaircutLookbookPdfButton";
import HairstyleIllustration from "../haircut/HairstyleIllustration";

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState<number>(1);

  const haircutImageByShape: Record<string, string> = {
    round: "/images/haircuts/round-women-1.jpg",
    oval: "/images/haircuts/oval-women-1.jpg",
    square: "/images/haircuts/square-women-1.jpg",
    heart: "/images/haircuts/heart-women-1.jpg",
    diamond: "/images/haircuts/diamond-women-1.jpg",
    oblong: "/images/haircuts/oblong-women-1.jpg",
  };

  const menHaircutImageByShape: Record<string, string> = {
    round: "/images/haircuts/round-men-1.jpg",
    oval: "/images/haircuts/oval-men-1.jpg",
    square: "/images/haircuts/square-men-1.jpg",
    heart: "/images/haircuts/heart-men-1.jpg",
    diamond: "/images/haircuts/diamond-men-1.jpg",
    oblong: "/images/haircuts/oblong-men-1.jpg",
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* ── EDITORIAL HERO HEADER - SPLIT DASHBOARD ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-emerald-50 py-16 lg:py-24 text-slate-900">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-x-0 -top-40 flex transform justify-center opacity-20">
          <div className="h-[500px] w-[1000px] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
                ⚡ Hair &amp; Premium Grooming Suite - 2026 Trends Report
              </span>

              <h1 className="mt-6 text-4.5xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Best Haircut for Your{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Face Shape
                </span>
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-bold text-slate-700">
                Discover Which Hairstyles Complement Your Natural Proportions
              </p>

              <p className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
                Soft layers, precise parts, and customized length. Discover how professional hair stylists match geometry, volume, and texture to balance features, with interactive illustrations for both women and men.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
                <a
                  href="https://calqulate.net/health/face-shape-calculator"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-xs font-black text-slate-950 hover:shadow-lg hover:shadow-emerald-500/10 transition-transform active:scale-95 text-center w-full sm:w-auto"
                >
                  Find My Face Shape First →
                </a>
                <a
                  href="#profiles"
                  className="rounded-xl border border-slate-700 bg-slate-800/40 px-6 py-3.5 text-xs font-black text-white hover:bg-slate-800 transition active:scale-95 text-center w-full sm:w-auto"
                >
                  Browse Hairstyle Profiles
                </a>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">
                  7 Min Read · VERIFIED FOR PROFESSIONAL SALON CONSULTATIONS
                </span>
                <span className="text-[10px] font-mono text-slate-600 bg-slate-800/55 px-2 py-0.5 rounded">
                  2026 UPDATE
                </span>
              </div>
            </div>

            {/* Right Column: Mini Face Shape Dashboard Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1.5 bg-emerald-500 text-slate-950 text-[8px] font-black uppercase tracking-wider rounded-bl-xl leading-none">
                  interactive dashboard
                </div>
                
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  calqulate.net - 2026 Haircut Guide
                </h3>

                {/* Little Face Outlines */}
                <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800/50 mb-4">
                  <svg viewBox="0 0 500 110" className="w-full h-auto text-white" aria-hidden="true">
                    {/* Round */}
                    <g className="cursor-pointer group" onClick={() => { document.getElementById("shape-round")?.scrollIntoView({ behavior: "smooth" }); }}>
                      <ellipse cx="50" cy="45" rx="28" ry="28" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" className="group-hover:fill-slate-800 transition-colors" />
                      <path d="M42,46 Q50,51 58,46" fill="none" stroke="#fdba74" strokeWidth="1.5" />
                      <circle cx="41" cy="38" r="2" fill="#94a3b8" />
                      <circle cx="59" cy="38" r="2" fill="#94a3b8" />
                      <text x="50" y="94" textAnchor="middle" className="text-[11px] font-black fill-slate-400 group-hover:fill-emerald-400 transition-colors tracking-wide">ROUND</text>
                    </g>
                    
                    {/* Oval */}
                    <g className="cursor-pointer group" onClick={() => { document.getElementById("shape-oval")?.scrollIntoView({ behavior: "smooth" }); }}>
                      <ellipse cx="150" cy="45" rx="25" ry="32" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" className="group-hover:fill-slate-800 transition-colors" />
                      <path d="M142,48 Q150,53 158,48" fill="none" stroke="#fdba74" strokeWidth="1.5" />
                      <circle cx="141" cy="39" r="2" fill="#94a3b8" />
                      <circle cx="159" cy="39" r="2" fill="#94a3b8" />
                      <text x="150" y="94" textAnchor="middle" className="text-[11px] font-black fill-slate-400 group-hover:fill-amber-400 transition-colors tracking-wide">OVAL</text>
                    </g>
                    
                    {/* Square */}
                    <g className="cursor-pointer group" onClick={() => { document.getElementById("shape-square")?.scrollIntoView({ behavior: "smooth" }); }}>
                      <rect x="225" y="16" width="50" height="54" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="2.5" className="group-hover:fill-slate-800 transition-colors" />
                      <path d="M242,46 Q250,51 258,46" fill="none" stroke="#fdba74" strokeWidth="1.5" />
                      <circle cx="241" cy="38" r="2" fill="#94a3b8" />
                      <circle cx="259" cy="38" r="2" fill="#94a3b8" />
                      <text x="250" y="94" textAnchor="middle" className="text-[11px] font-black fill-slate-400 group-hover:fill-pink-400 transition-colors tracking-wide">SQUARE</text>
                    </g>
                    
                    {/* Heart */}
                    <g className="cursor-pointer group" onClick={() => { document.getElementById("shape-heart")?.scrollIntoView({ behavior: "smooth" }); }}>
                      <path d="M350,68 C320,48 318,18 350,22 C382,18 380,48 350,68Z" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5" className="group-hover:fill-slate-800 transition-colors" />
                      <path d="M342,44 Q350,49 358,44" fill="none" stroke="#fdba74" strokeWidth="1.5" />
                      <circle cx="341" cy="35" r="2" fill="#94a3b8" />
                      <circle cx="359" cy="35" r="2" fill="#94a3b8" />
                      <text x="350" y="94" textAnchor="middle" className="text-[11px] font-black fill-slate-400 group-hover:fill-blue-400 transition-colors tracking-wide">HEART</text>
                    </g>
                    
                    {/* Diamond */}
                    <g className="cursor-pointer group" onClick={() => { document.getElementById("shape-diamond")?.scrollIntoView({ behavior: "smooth" }); }}>
                      <path d="M450,14 L478,45 L450,76 L422,45 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="2.5" className="group-hover:fill-slate-800 transition-colors" />
                      <path d="M442,46 Q450,51 458,46" fill="none" stroke="#fdba74" strokeWidth="1.5" />
                      <circle cx="441" cy="38" r="2" fill="#94a3b8" />
                      <circle cx="459" cy="38" r="2" fill="#94a3b8" />
                      <text x="450" y="94" textAnchor="middle" className="text-[11px] font-black fill-slate-400 group-hover:fill-purple-400 transition-colors tracking-wide">DIAMOND</text>
                    </g>
                  </svg>
                </div>

                <div className="mt-4 border-t border-slate-800/80 pt-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
                    2026 Key Objectives
                  </span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] leading-relaxed text-slate-300 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>Round: Add Crown Height</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>Heart: Add Jaw Weight</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                      <span>Square: Soften Outlines</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                      <span>Diamond: Widen Forehead</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/30">
                  <span className="rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                    ✦ Interior Layers
                  </span>
                  <span className="rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                    ✦ Curtain Bangs
                  </span>
                  <span className="rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                    ✦ Textured Quiff
                  </span>
                  <span className="rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                    ✦ Wispy Shag
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TOFU METADATA BANNER ────────────────────── */}
      <div className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-100 sm:grid-cols-4">
          <div className="py-5 text-center">
            <p className="text-3xl font-black text-slate-900 sm:text-4xl">6</p>
            <p className="mt-0.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Face Shapes Covered
            </p>
          </div>
          <div className="py-5 text-center">
            <p className="text-3xl font-black text-slate-900 sm:text-4xl">12+</p>
            <p className="mt-0.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Haircut Styles
            </p>
          </div>
          <div className="py-5 text-center">
            <p className="text-3xl font-black text-emerald-600 sm:text-4xl font-mono">2</p>
            <p className="mt-0.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Infographics
            </p>
          </div>
          <div className="py-5 text-center">
            <p className="text-3xl font-black text-slate-900 sm:text-4xl">Free</p>
            <p className="mt-0.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Face Shape Tool
            </p>
          </div>
        </div>
      </div>

      {/* ── CENTRAL LAYOUT ───────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* LEFT SIDEBAR: STICKY PROGRESSIVE TABLE OF CONTENTS & ADVOCACY */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              
              {/* Table of contents card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Quick NAVIGATION
                </p>
                <div className="mt-4 space-y-1">
                  <a
                    href="#identify"
                    className="group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <span>1. Quick Identity Test</span>
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-emerald-600">GO →</span>
                  </a>
                  
                  <div className="pt-2">
                    <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Face Shape Profiles
                    </p>
                    <div className="mt-1 space-y-0.5">
                      {haircutGuides.map((g, idx) => (
                        <a
                          key={g.id}
                          href={`#shape-${g.id}`}
                          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          <span className="font-mono text-[9px] text-slate-400">
                            PF-{idx + 1}
                          </span>
                          <span>{g.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#quick-ref"
                    className="group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700 mt-2"
                  >
                    <span>2. Quick Reference Table</span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">GO →</span>
                  </a>
                  <a
                    href="#lookbook"
                    className="group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <span>3. Lookbook PDF Generator</span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">GO →</span>
                  </a>
                  <a
                    href="#resources"
                    className="group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <span>4. Resources &amp; Guides</span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">GO →</span>
                  </a>
                </div>
              </div>

              {/* Static advocacy promo */}
              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-950 to-slate-900 p-6 text-white shadow-xl">
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">
                  CHOOSE WITH CONFLICT-FREE LOGIC
                </span>
                <h4 className="mt-2 text-sm font-bold leading-snug">
                  Why Face Shape Matters More Than Texture Alone
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed font-medium">
                  Hair texture determines how your hair moves, but your face shape determines where the weight lines should sit to establish structural harmony. Combining both ensures your stylist executes a masterpiece.
                </p>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <a
                    href="https://calqulate.net/health/face-shape-calculator"
                    className="inline-block text-xs font-extrabold text-emerald-300 underline"
                  >
                    Launch Calculator Suite →
                  </a>
                </div>
              </div>

            </div>
          </aside>

          {/* MAIN COLUMN: TL;DR, STEPS, DETAILED PROFILE CARDS */}
          <div className="lg:col-span-9 space-y-12">
            
            {/* ── TL;DR EXECUTIVE SUMMARY ─────────────────── */}
            <aside className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 shadow-sm md:p-8">
              <div className="flex items-center gap-2.5">
                <span className="h-5 w-5 shrink-0 rounded-md bg-emerald-600 text-center text-xs font-black leading-5 text-white">
                  ★
                </span>
                <h2 className="text-xl font-black text-emerald-900">
                  TL;DR - Executive Guidelines
                </h2>
              </div>
              
              <ul className="mt-4 space-y-3">
                {tldrBullets.map((b) => (
                  <li key={b.label} className="flex gap-3 text-sm leading-relaxed text-slate-700 md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>
                      <strong className="font-extrabold text-emerald-800">{b.label}</strong>:{" "}
                      {b.href ? (
                        <>
                          {b.text.replace(b.linkText ?? "", "")}{" "}
                          <a href={b.href} className="font-semibold text-emerald-700 underline hover:text-emerald-800">
                            {b.linkText}
                          </a>
                        </>
                      ) : (
                        b.text
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>

            {/* ── DETAILED TEST INSTRUCTIONS ───────────────── */}
            <section id="identify" className="scroll-mt-20">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  SECTION 1 OF 5
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">
                  How to Find Your Face Shape (Quick Calibration)
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                To identify the right hairstyle profile, you must first accurately categorize your bone structure. Perform this quick three-step measurement ritual in front of a mirror:
              </p>

              <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-3">
                {identificationSteps.map((s) => (
                  <div
                    key={s.n}
                    onClick={() => setActiveStep(s.n)}
                    className={`cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${
                      activeStep === s.n
                        ? "border-emerald-500 bg-white shadow-md ring-1 ring-emerald-500/20"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                        activeStep === s.n ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {s.n}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">METRIC</span>
                    </div>
                    <p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-950">
                      {s.title}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Calculator alert */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
                <div className="flex gap-3">
                  <span className="text-xl">📐</span>
                  <div>
                    <strong className="text-sm font-bold text-amber-900">Need High-Precision Calibration?</strong>
                    <p className="mt-0.5 text-xs text-amber-800">
                      Our interactive Face Shape Calculator uses relative face ratios (length, cheeks, forehead boundaries) to supply 100% objective feedback with personalized guides.
                    </p>
                  </div>
                </div>
                <a
                  href="https://calqulate.net/health/face-shape-calculator"
                  className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-700"
                >
                  Launch Live Calculator
                </a>
              </div>
            </section>

            {/* ── STYLING ENGINE PROFILE SECTIONS ───────────── */}
            <section id="profiles" className="scroll-mt-20 space-y-12">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  SECTION 2 OF 5
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">
                  Best Haircut for Your Face Shape Female and Men : 6 face shapes Hairstyle Profiles That Instantly Improve Your Look
                </h2>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed font-semibold">
                Click each face shape profile to discover the best hair alignments and haircut structure for your features.                </p>
              </div>

              {/* Six profiles flow */}
              {haircutGuides.map((guide, idx) => (
                <div
                  id={`shape-${guide.id}`}
                  key={guide.id}
                  className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Card head banner */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 bg-emerald-50/40 px-6 py-4 md:px-8">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 font-mono text-xs font-bold text-white">
                        0{idx + 1}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        GEOMETRIC SCHEMATIC
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
                      {guide.label} Formula
                    </h3>
                  </div>

                  {/* Split grid */}
                  <div className="space-y-8">
                    <div className="space-y-5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pl-1">
                        Recommended Artworks (Infographics)
                      </p>
                      <HairstyleIllustration
                        shape={guide.id}
                        gender="women"
                        headline={guide.women.headline}
                        pureGraphic={true}
                        images={[haircutImageByShape[guide.id]]}
                      />
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <span className="inline-flex rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-bold text-pink-700">
                          Women Cut Profile
                        </span>
                        <h4 className="mt-3 text-sm font-black text-slate-900">
                          {guide.women.headline}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500 font-medium">
                          {guide.women.description}
                        </p>
                        <div className="mt-3.5 grid gap-3 grid-cols-1 sm:grid-cols-2">
                          <div className="rounded-xl bg-emerald-50/40 p-3.5">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700 block">
                              ✓ Recommended Styles
                            </span>
                            <ul className="mt-1.5 space-y-1 text-xs text-slate-700 font-medium">
                              {guide.women.works.map((item) => (
                                <li key={item} className="flex gap-1.5 items-start">
                                  <span className="text-emerald-500">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-xl bg-red-50/40 p-3.5">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-red-700 block">
                              ✗ Elements to Avoid
                            </span>
                            <ul className="mt-1.5 space-y-1 text-xs text-slate-700 font-medium">
                              {guide.women.avoid.map((item) => (
                                <li key={item} className="flex gap-1.5 items-start">
                                  <span className="text-red-400">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <HairstyleIllustration
                        shape={guide.id}
                        gender="men"
                        headline={guide.men.headline}
                        pureGraphic={true}
                        images={[menHaircutImageByShape[guide.id]]}
                      />
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                          Men Cut Profile
                        </span>
                        <h4 className="mt-3 text-sm font-black text-slate-900">
                          {guide.men.headline}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500 font-medium">
                          {guide.men.description}
                        </p>
                        <div className="mt-3.5 grid gap-3 grid-cols-1 sm:grid-cols-2">
                          <div className="rounded-xl bg-emerald-50/40 p-3.5">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700 block">
                              ✓ Recommended Styles
                            </span>
                            <ul className="mt-1.5 space-y-1 text-xs text-slate-700 font-medium">
                              {guide.men.works.map((item) => (
                                <li key={item} className="flex gap-1.5 items-start">
                                  <span className="text-emerald-500">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-xl bg-red-50/40 p-3.5">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-red-700 block">
                              ✗ Elements to Avoid
                            </span>
                            <ul className="mt-1.5 space-y-1 text-xs text-slate-700 font-medium">
                              {guide.men.avoid.map((item) => (
                                <li key={item} className="flex gap-1.5 items-start">
                                  <span className="text-red-400">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/50 p-5 shadow-sm">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-800 block">
                          Core Geometric Objective
                        </span>
                        <p className="mt-1 text-sm font-bold leading-normal text-emerald-950">
                          {guide.stylingObjective}
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-50 border border-slate-150 p-4.5">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">
                          Bone Structure Profile
                        </span>
                        <p className="mt-1.5 text-xs text-slate-600 font-medium leading-relaxed">
                          {guide.howToIdentify}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-150 bg-slate-50 p-4.5 text-xs leading-relaxed font-semibold text-slate-600">
                        <span className="font-bold text-slate-800">⚡ Hair Texture Adaptation Rule:</span>{" "}
                        {guide.textureNote}
                      </div>
                    </div>
                  </div>

                  <div className="hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
                      
                      {/* LEFT COLUMN: VISUAL SCHEMATIC ENGINE */}
                      <div className="lg:col-span-5 flex flex-col gap-4">
                        <p className="text-[10px] font-bold text-slate-440 uppercase tracking-widest block pl-1">
                          Recommended Artworks (Infographics)
                        </p>
                        
                        {/* Desktop artwork cards stacked for female above male */}
                        <div className="grid grid-cols-1 gap-4">
                          {/* Female Illustration */}
                          <HairstyleIllustration
                            shape={guide.id}
                            gender="women"
                            headline={guide.women.headline}
                            pureGraphic={true}
                            images={[haircutImageByShape[guide.id]]}
                          />

                          {/* Male Illustration */}
                          <HairstyleIllustration
                            shape={guide.id}
                            gender="men"
                            headline={guide.men.headline}
                            pureGraphic={true}
                            images={[menHaircutImageByShape[guide.id]]}
                          />
                        </div>
                      </div>

                      {/* RIGHT COLUMN: REVELATIONS & CRITIQUE CARD */}
                      <div className="lg:col-span-7 flex flex-col justify-between">
                        <div>
                          {/* Styling objective block */}
                          <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/50 p-5 mb-5 shadow-sm">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-800 block">
                              Core Geometric Objective
                            </span>
                            <p className="mt-1 text-sm font-bold leading-normal text-emerald-950">
                              {guide.stylingObjective}
                            </p>
                          </div>

                          {/* Identification bounds */}
                          <div className="mb-6 rounded-xl bg-slate-50 border border-slate-150 p-4.5">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">
                              Bone Structure Profile
                            </span>
                            <p className="mt-1.5 text-xs text-slate-600 font-medium leading-relaxed">
                              {guide.howToIdentify}
                            </p>
                          </div>

                          {/* Side by side descriptive feedback */}
                          <div className="space-y-6 border-t border-slate-100 pt-5">
                            {/* Women content details */}
                            <div>
                              <span className="inline-flex rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-bold text-pink-700">
                                Women Cut Profile
                              </span>
                              <h4 className="mt-1.5 text-sm font-black text-slate-900">
                                {guide.women.headline}
                              </h4>
                              <p className="mt-1 text-xs leading-relaxed text-slate-500 font-medium">
                                {guide.women.description}
                              </p>

                              {/* Works Well & Avoid lists */}
                              <div className="mt-3.5 grid gap-3 grid-cols-1 sm:grid-cols-2">
                                <div className="rounded-xl bg-emerald-50/40 p-3.5">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700 block">
                                    ✓ Recommended Styles
                                  </span>
                                  <ul className="mt-1.5 space-y-1 text-xs text-slate-700 font-medium">
                                    {guide.women.works.map((item) => (
                                      <li key={item} className="flex gap-1.5 items-start">
                                        <span className="text-emerald-500">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="rounded-xl bg-red-50/40 p-3.5">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-700 block">
                                    ✗ Elements to Avoid
                                  </span>
                                  <ul className="mt-1.5 space-y-1 text-xs text-slate-700 font-medium">
                                    {guide.women.avoid.map((item) => (
                                      <li key={item} className="flex gap-1.5 items-start">
                                        <span className="text-red-400">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Men content details */}
                            <div className="border-t border-slate-100 pt-5">
                              <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                                Men Cut Profile
                              </span>
                              <h4 className="mt-1.5 text-sm font-black text-slate-900">
                                {guide.men.headline}
                              </h4>
                              <p className="mt-1 text-xs leading-relaxed text-slate-500 font-medium">
                                {guide.men.description}
                              </p>

                              {/* Works Well & Avoid lists */}
                              <div className="mt-3.5 grid gap-3 grid-cols-1 sm:grid-cols-2">
                                <div className="rounded-xl bg-emerald-50/40 p-3.5">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700 block">
                                    ✓ Recommended Styles
                                  </span>
                                  <ul className="mt-1.5 space-y-1 text-xs text-slate-700 font-medium">
                                    {guide.men.works.map((item) => (
                                      <li key={item} className="flex gap-1.5 items-start">
                                        <span className="text-emerald-500">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="rounded-xl bg-red-50/40 p-3.5">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-700 block">
                                    ✗ Elements to Avoid
                                  </span>
                                  <ul className="mt-1.5 space-y-1 text-xs text-slate-700 font-medium">
                                    {guide.men.avoid.map((item) => (
                                      <li key={item} className="flex gap-1.5 items-start">
                                        <span className="text-red-400">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Texture note */}
                        <div className="mt-6 rounded-2xl border border-slate-150 bg-slate-50 p-4.5 text-xs leading-relaxed font-semibold text-slate-600">
                          <span className="font-bold text-slate-800">⚡ Hair Texture Adaptation Rule:</span>{" "}
                          {guide.textureNote}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* ── CENTRALIZED CALCULATOR DRIVE CALLOUT ────── */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-800 p-8 text-white shadow-xl md:p-12">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 rotate-12 text-9xl font-extrabold text-emerald-500/10 select-none">
                CALQ
              </div>
              <div className="relative z-10 max-w-lg">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                  FREE STYLING ASSESSMENT
                </span>
                <p className="mt-2 text-3xl font-black leading-tight tracking-tight">
                  Not certain about your shape profile yet?
                </p>
                <p className="mt-4 text-xs leading-relaxed text-slate-200">
                  Our fully automated face geometry analysis calculator measures proportions of your facial markers via simple sliders to map you into the corresponding lookbook shape category.
                </p>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://calqulate.net/health/face-shape-calculator"
                    className="rounded-xl bg-white px-6 py-3.5 text-xs font-bold text-emerald-800 shadow-md transition hover:-translate-y-0.5"
                  >
                    Open Face Shape Calculator
                  </a>
                  <a
                    href="#lookbook"
                    className="rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
                  >
                    Generate Printable lookbook
                  </a>
                </div>
              </div>
            </div>

            {/* ── QUICK REFERENCE TABLE ─────────────────────── */}
            <section id="quick-ref" className="scroll-mt-20">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  SECTION 3 OF 5
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">
                  Quick Reference: 2026 Haircuts Index
                </h2>
              </div>
              
              <p className="mt-4 text-sm text-slate-500">
                A simple proportional grid comparing main styles. Perfect for showing reference to your stylist at your next appointment.
              </p>

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-black">Face Shape Outline</th>
                      <th className="px-6 py-4 font-black">Women's Pick</th>
                      <th className="px-6 py-4 font-black">Men's Pick</th>
                      <th className="px-6 py-4 font-black">Stylist's Key Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {haircutGuides.map((g) => (
                      <tr key={g.id} className="transition-all hover:bg-slate-50/35">
                        <td className="whitespace-nowrap px-6 py-4 font-bold text-slate-900">
                          {g.label}
                        </td>
                        <td className="px-6 py-4 text-slate-600">{g.quickRef.women}</td>
                        <td className="px-6 py-4 text-slate-600">{g.quickRef.men}</td>
                        <td className="px-6 py-4 font-bold text-emerald-700">
                          {g.quickRef.principle}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── PDF GENERATOR CLIENT WRAPPER ───────────────── */}
            <section id="lookbook" className="scroll-mt-20">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  SECTION 4 OF 5
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">
                  Personal Haircut Lookbook Generator
                </h2>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 md:p-8">
                <div className="md:col-span-8">
                  <h4 className="text-base font-bold text-slate-950">
                    Need a printout for the barbershop or salon appointment?
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 font-medium">
                    Our Lookbook generator constructs an A4-formatted, print-ready document containing the styled schematic guides, dos and don'ts list, and personalized instructions based on the six primary face shapes.
                  </p>
                </div>
                <div className="md:col-span-4 flex items-center justify-end">
                  <HaircutLookbookPdfButton />
                </div>
              </div>
            </section>

            {/* ── RESOURCES & HELPFUL TOOLS ── */}
            <section id="resources" className="scroll-mt-20">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                  SECTION 5 OF 5
                </span>
                <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">
                  References &amp; Styling Resources
                </h2>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Resource Card 1 */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-300 transition duration-200">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">
                    Source &amp; Context Link
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-2">
                    Original Haircut Context Suite
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Where the full context of these structural geometry rules, trends reports, and hair calculation metrics are maintained.
                  </p>
                  <a
                    href="https://calqulate.net/health/face-shape-calculator"
                    className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-emerald-700 underline hover:text-emerald-800"
                  >
                    Find original context on Calqulate.net &rarr;
                  </a>
                </div>

                {/* Resource Card 2 */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-300 transition duration-200">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">
                    Interactive Calculator
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-2">
                    Interactive Face Shape Calculator
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Measure your relative horizontal proportions to map your head structure objectively.
                  </p>
                  <a
                    href="https://calqulate.net/health/face-shape-calculator"
                    className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-emerald-700 underline hover:text-emerald-800"
                  >
                    Open Precision Calculator &rarr;
                  </a>
                </div>

                {/* Resource Card 3 */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-300 transition duration-200">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">
                    Measurement Manual
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-2">
                    Illustrated Measurement Guide
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Step-by-step math rules to discover and map facial geometry proportions like an expert.
                  </p>
                  <a
                    href="https://calqulate.net/blog/find-your-face-shape"
                    className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-emerald-700 underline hover:text-emerald-800"
                  >
                    Read step-by-step guide &rarr;
                  </a>
                </div>

                {/* Resource Card 4 */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-300 transition duration-200">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">
                    Local File Download
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-2">
                    Salon Lookbook PDF
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Generate and download a high-contrast binary lookbook document to carry to your stylist.
                  </p>
                  <a
                    href="#lookbook"
                    className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-emerald-700 underline hover:text-emerald-800"
                  >
                    Jump to Lookbook Generator &rarr;
                  </a>
                </div>
              </div>
            </section>

          </div>

        </div>
      </main>

    </div>
  );
}
