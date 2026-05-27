
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { FaceShapeKey } from "../../lib/blog/haircut-face-shape-data";

interface Props {
  shape: FaceShapeKey;
  gender: "women" | "men";
  headline: string;
  pureGraphic?: boolean;
  /** Optional list of image paths (public/) to display for this shape/gender */
  images?: string[];
}

export default function HairstyleIllustration({ shape, gender, headline, pureGraphic = false, images = [] }: Props) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Return specific features / secret techniques users can hover over or tap to understand
  const getSecrets = () => {
    switch (`${shape}_${gender}`) {
      case "round_women":
        return [
          { label: "Deep Side Part", desc: "Offset 2 inches to break horizontal symmetry and guide eyes vertically." },
          { label: "Collarbone Length", desc: "Creates an elongating vertical frame falling nicely below the heavy jaw line." },
          { label: "Interior Layers", desc: "Removes bulk from inside so sides lie closer, maintaining sleekness." },
        ];
      case "round_men":
        return [
          { label: "High Taper Fade", desc: "Drastically trims side width, immediately elongating overall proportions." },
          { label: "Crown Quiff Lift", desc: "Volumizes top hair upward 1.5–2 inches to build strong vertical interest." },
          { label: "Matte Clay Texture", desc: "Adds messy, angular visual separation rather than round helmet look." },
        ];
      case "oval_women":
        return [
          { label: "Blunt Perimeter", desc: "Clean, thick horizontal weight line at collarbone preserves natural fullness." },
          { label: "Curtain Fringe Split", desc: "Center split shapes cheekbones without interrupting balanced proportions." },
          { label: "Soft Face-Framers", desc: "Provides organic frame outlines without structural rigidity." },
        ];
      case "oval_men":
        return [
          { label: "Textured Crown Crop", desc: "Choppy layered tips lie naturally closer, utilizing balanced symmetry." },
          { label: "Low/Medium Taper", desc: "Soft blend behind ears that maintains classic temple profile." },
          { label: "Matte Sea-Salt Wave", desc: "Enhances movement naturally without heavy, flat-looking pomades." },
        ];
      case "square_women":
        return [
          { label: "Wispy Shag Layers", desc: "Razored multi-length pieces surround corners with feathers instead of corners." },
          { label: "Curved Soft Bangs", desc: "Gently arches across the temples to curve out hard hairline edges." },
          { label: "Organic Flow waves", desc: "Drawn-out beachy curves break up parallel jawline and cheek paths." },
        ];
      case "square_men":
        return [
          { label: "Scissor-Cut Temples", desc: "Softer frame outline compared to hard metallic edge skin fades." },
          { label: "Side-Swept Top Part", desc: "Gentle natural split offsets boxy bone lines without being rigid." },
          { label: "Feathered Overhang", desc: "Soft strands fall naturally close to forehead edges, minimizing blocks." },
        ];
      case "heart_women":
        return [
          { label: "Chin Bob Flare", desc: "Ends curl/flip outwards slightly at jaw level to add wide visual mass where chin narrows." },
          { label: "Side Sweep Parting", desc: "Narrows the wider temple horizon while highlighting high cheekbones." },
          { label: "Volume Bottom Ends", desc: "Texturized weight clustered low down to establish proportional balance." },
        ];
      case "heart_men":
        return [
          { label: "Textured Neck Flow", desc: "Medium strands cascade backward, filling out narrow spacing beside chin." },
          { label: "Soft Sweep Fringe", desc: "Partially screens the prominent forehead line to shift weight downward." },
          { label: "Taperless Side Blend", desc: "Maintains soft length around ears for maximum frame coverage." },
        ];
      case "diamond_women":
        return [
          { label: "Wispy Tassel Fringe", desc: "Blurs narrow hairline corners and widens apparent forehead span." },
          { label: "Mid-Shaft Wave Flare", desc: "Adds softness around the widest cheek bounds." },
          { label: "Under-Jaw Shag Ends", desc: "Flairs open at collarbone to widen narrow jaw proportion." },
        ];
      case "diamond_men":
        return [
          { label: "Forward Messy Fringe", desc: "Brushed forward, adding horizontal focus at upper face level." },
          { label: "Temple Length Blend", desc: "Barber leaves sides slightly longer to fill temple recess." },
          { label: "Low Taper Lines", desc: "Gentle, non-aggressive hairline trim that respects natural width." },
        ];
      case "oblong_women":
        return [
          { label: "Full Classic Bangs", desc: "Creates horizontal block, reducing visual length by up to 30%." },
          { label: "Cheek Level Waves", desc: "Spreads hair volume wide, counteracting tall vertical profile." },
          { label: "Blunt Shoulder Base", desc: "Establishes immediate bottom visual boundaries." },
        ];
      case "oblong_men":
        return [
          { label: "Full Side Profile", desc: "Kept thicker at sides with scissor comb to widen face span." },
          { label: "Textured Side-Part", desc: "Horizontal flow direction reduces vertical emphasis." },
          { label: "Splayed Hair Trim", desc: "Gentle comb down that adds nice horizontal thickness lines." },
        ];
      default:
        return [];
    }
  };

  const secrets = getSecrets();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight" && images && images.length > 0) {
        setCurrentImage((i) => (i + 1) % images.length);
      }
      if (e.key === "ArrowLeft" && images && images.length > 0) {
        setCurrentImage((i) => (i - 1 + images.length) % images.length);
      }
    };

    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, images]);

  // Render inline vector graphics matching precisely the shape & gender recommendations!
  const renderSVG = () => {
    const defaultColor = "#1e293b"; // Rich charcoal hair
    const highlightColor = "#059669"; // Emerald active highlight
    const strokeProps = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

    const renderRoundWomen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Round */}
        <ellipse cx="100" cy="110" rx="42" ry="46" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" {...strokeProps} />
        {/* Features */}
        <ellipse cx="85" cy="102" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="115" cy="102" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M92,126 Q100,132 108,126" fill="none" stroke="#fdba74" strokeWidth="1.5" {...strokeProps} />
        {/* Collarbone markers */}
        <path d="M55,190 Q100,198 145,190" fill="none" stroke="#fed7aa" strokeWidth="2" />

        {/* Hair - Long Bob with interior layers */}
        {/* Back volume */}
        <path d="M56,120 Q32,130 54,180 Q64,192 72,174" fill="none" stroke={defaultColor} strokeWidth="3" {...strokeProps} />
        <path d="M144,120 Q168,130 146,180 Q136,192 128,174" fill="none" stroke={defaultColor} strokeWidth="3" {...strokeProps} />

        {/* Main Hair Silhouette */}
        {/* Left Bob strand falling straight down to collarbone */}
        <path
          d="M72,66 Q48,90 54,166 Q56,178 68,174 Q68,140 76,110 Z"
          fill={activeFeature === "Collarbone Length" ? highlightColor : defaultColor}
          opacity="0.95"
        />
        {/* Right Bob strand */}
        <path
          d="M128,66 Q152,90 146,166 Q144,178 132,174 Q132,140 124,110 Z"
          fill={activeFeature === "Collarbone Length" ? highlightColor : defaultColor}
          opacity="0.95"
        />

        {/* Crown & Side part (Deep side part starting off-center at x=80) */}
        <path
          d="M72,66 Q54,34 100,32 Q144,34 128,66 Q122,86 124,110 Q98,54 74,70"
          fill={activeFeature === "Deep Side Part" ? highlightColor : defaultColor}
        />
        {/* Side Part Split Line */}
        <path d="M82,34 Q80,50 74,71" fill="none" stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="3,2" />

        {/* Interior Layer strands */}
        <path
          d="M92,62 Q72,84 76,122"
          fill="none"
          stroke={activeFeature === "Interior Layers" ? highlightColor : "#64748b"}
          strokeWidth="2"
          {...strokeProps}
        />
        <path
          d="M108,62 Q128,84 124,122"
          fill="none"
          stroke={activeFeature === "Interior Layers" ? highlightColor : "#64748b"}
          strokeWidth="2"
          {...strokeProps}
        />
      </svg>
    );

    const renderRoundMen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Round */}
        <ellipse cx="100" cy="115" rx="38" ry="42" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" {...strokeProps} />
        {/* Eyes and lips */}
        <ellipse cx="86" cy="108" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="114" cy="108" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M92,132 Q100,138 108,132" fill="none" stroke="#fdba74" strokeWidth="1.5" />

        {/* High taper fade sides (very short, represented as tiny dots or soft grey blend) */}
        <path
          d="M62,115 Q54,102 61,86 Q62,72 65,72"
          fill="none"
          stroke={activeFeature === "High Taper Fade" ? highlightColor : "#cbd5e1"}
          strokeWidth="6"
          strokeDasharray="1,2"
          {...strokeProps}
        />
        <path
          d="M138,115 Q146,102 139,86 Q138,72 135,72"
          fill="none"
          stroke={activeFeature === "High Taper Fade" ? highlightColor : "#cbd5e1"}
          strokeWidth="6"
          strokeDasharray="1,2"
          {...strokeProps}
        />

        {/* Crown Lift - Textured Quiff */}
        <path
          d="M62,72 Q60,34 100,18 Q140,34 138,72 Q115,75 100,60 Q85,75 62,72Z"
          fill={activeFeature === "Crown Quiff Lift" ? highlightColor : defaultColor}
          {...strokeProps}
        />

        {/* Matte Clay Texture Highlights (Spikes/Angles) */}
        <path
          d="M80,30 L74,15 L90,25"
          fill={activeFeature === "Matte Clay Texture" ? highlightColor : "#cbd5e1"}
          opacity="0.9"
        />
        <path
          d="M100,26 L104,8 L112,22"
          fill={activeFeature === "Matte Clay Texture" ? highlightColor : "#cbd5e1"}
          opacity="0.9"
        />
        <path
          d="M120,32 L126,16 L130,30"
          fill={activeFeature === "Matte Clay Texture" ? highlightColor : "#cbd5e1"}
          opacity="0.9"
        />
      </svg>
    );

    const renderOvalWomen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Oval */}
        <ellipse cx="100" cy="110" rx="35" ry="48" fill="#fff7ed" stroke="#f59e0b" strokeWidth="2" {...strokeProps} />
        {/* Features */}
        <ellipse cx="88" cy="102" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="112" cy="102" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M92,126 Q100,131 108,126" fill="none" stroke="#f59e0b" strokeWidth="1.5" />

        {/* Blunt Shoulder Base */}
        {/* Left/Right Blunt Locks */}
        <path
          d="M65,70 Q54,110 65,170 M135,70 Q146,110 135,170"
          stroke={activeFeature === "Blunt Perimeter" ? highlightColor : defaultColor}
          strokeWidth="12"
          {...strokeProps}
        />

        {/* Crown with center split curtain bangs */}
        <path
          d="M65,70 Q55,36 100,32 Q145,36 135,70 Q118,74 100,60 Q82,74 65,70Z"
          fill={activeFeature === "Curtain Fringe Split" ? highlightColor : defaultColor}
        />

        {/* Curtain bangs flowing out outwards */}
        <path
          d="M100,48 Q84,52 75,75 M100,48 Q116,52 125,75"
          fill="none"
          stroke={activeFeature === "Curtain Fringe Split" ? highlightColor : "#e2e8f0"}
          strokeWidth="2.5"
          {...strokeProps}
        />

        {/* Soft Face-Framers */}
        <path
          d="M68,100 C64,120 74,136 74,150"
          fill="none"
          stroke={activeFeature === "Soft Face-Framers" ? highlightColor : "#64748b"}
          strokeWidth="1.5"
          {...strokeProps}
        />
        <path
          d="M132,100 C136,120 126,136 126,150"
          fill="none"
          stroke={activeFeature === "Soft Face-Framers" ? highlightColor : "#64748b"}
          strokeWidth="1.5"
          {...strokeProps}
        />
      </svg>
    );

    const renderOvalMen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Oval */}
        <ellipse cx="100" cy="115" rx="34" ry="46" fill="#fff7ed" stroke="#f59e0b" strokeWidth="2" {...strokeProps} />
        {/* Eyes/Lips */}
        <ellipse cx="86" cy="108" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="114" cy="108" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M92,132 Q100,137 108,132" fill="none" stroke="#f59e0b" strokeWidth="1.5" />

        {/* Low/Medium Taper fade around ears */}
        <path
          d="M66,110 Q58,102 66,82"
          fill="none"
          stroke={activeFeature === "Low/Medium Taper" ? highlightColor : "#cbd5e1"}
          strokeWidth="5"
          strokeDasharray="2,2"
        />
        <path
          d="M134,110 Q142,102 134,82"
          fill="none"
          stroke={activeFeature === "Low/Medium Taper" ? highlightColor : "#cbd5e1"}
          strokeWidth="5"
          strokeDasharray="2,2"
        />

        {/* Textured crop crown */}
        <path
          d="M66,82 Q60,38 100,28 Q140,38 134,82 Q100,76 66,82Z"
          fill={activeFeature === "Textured Crown Crop" ? highlightColor : defaultColor}
          {...strokeProps}
        />

        {/* Matte Sea-Salt Waves details */}
        <path
          d="M84,40 C80,50 90,52 86,62 M116,40 C110,50 120,52 114,62"
          fill="none"
          stroke={activeFeature === "Matte Sea-Salt Wave" ? highlightColor : "#475569"}
          strokeWidth="2"
          {...strokeProps}
        />
      </svg>
    );

    const renderSquareWomen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Square (strong angular corners) */}
        <rect x="65" y="65" width="70" height="90" rx="12" fill="#fff7ed" stroke="#ec4899" strokeWidth="2" {...strokeProps} />
        {/* Eyes/Lips */}
        <ellipse cx="88" cy="102" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="112" cy="102" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M92,126 Q100,131 108,126" fill="none" stroke="#ec4899" strokeWidth="1.5" />

        {/* Wispy Shag Layers back length */}
        <path
          d="M55,140 Q40,160 52,185 M145,140 Q160,160 148,185"
          stroke={activeFeature === "Wispy Shag Layers" ? highlightColor : defaultColor}
          strokeWidth="10"
          {...strokeProps}
        />

        {/* Front layered Shag silhouette */}
        <path
          d="M66,74 Q54,42 100,38 Q146,42 134,74 Q124,105 130,142 Q115,145 100,140 Q85,145 70,142 Q76,105 66,74Z"
          fill={activeFeature === "Organic Flow waves" ? highlightColor : defaultColor}
        />

        {/* Curved soft bangs */}
        <path
          d="M74,66 Q100,50 126,66"
          fill="none"
          stroke={activeFeature === "Curved Soft Bangs" ? highlightColor : "#cbd5e1"}
          strokeWidth="3.5"
          {...strokeProps}
        />

        {/* Organic waves over jaw */}
        <path
          d="M65,110 Q52,125 72,135 M135,110 Q148,125 128,135"
          fill="none"
          stroke={activeFeature === "Organic Flow waves" ? highlightColor : "#cbd5e1"}
          strokeWidth="2"
          {...strokeProps}
        />
      </svg>
    );

    const renderSquareMen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Square */}
        <rect x="66" y="70" width="68" height="82" rx="6" fill="#fff7ed" stroke="#ec4899" strokeWidth="2" {...strokeProps} />
        {/* Facial details */}
        <ellipse cx="86" cy="108" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="114" cy="108" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M92,130 Q100,135 108,130" fill="none" stroke="#ec4899" strokeWidth="1.5" />

        {/* Scissor-Cut Temples (thicker blend on sides) */}
        <path
          d="M66,110 L62,82 L66,72 M134,110 L138,82 L134,72"
          fill="none"
          stroke={activeFeature === "Scissor-Cut Temples" ? highlightColor : defaultColor}
          strokeWidth="5"
          {...strokeProps}
        />

        {/* Side swept ivy league top */}
        <path
          d="M63,72 C62,44 100,38 100,38 C100,38 138,44 137,72 Q100,68 63,72Z"
          fill={activeFeature === "Side-Swept Top Part" ? highlightColor : defaultColor}
        />

        {/* Side Part Line */}
        <path d="M82,41 Q86,52 86,66" stroke="#ffffff" strokeWidth="1" strokeDasharray="3,1" />

        {/* Feathered overhang at temples */}
        <path
          d="M66,73 Q74,80 72,88 M134,73 Q126,80 128,88"
          fill="none"
          stroke={activeFeature === "Feathered Overhang" ? highlightColor : "#cbd5e1"}
          strokeWidth="1.5"
          {...strokeProps}
        />
      </svg>
    );

    const renderHeartWomen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Heart (wider top, tapering chin) */}
        <path
          d="M100,154 C58,130 52,86 100,86 C148,86 142,130 100,154Z"
          fill="#fff7ed"
          stroke="#3b82f6"
          strokeWidth="2"
          {...strokeProps}
        />
        {/* Features */}
        <ellipse cx="88" cy="106" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="112" cy="106" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M93,126 Q100,131 107,126" fill="none" stroke="#3b82f6" strokeWidth="1.5" />

        {/* Chin bob flare - adds width at jaw level */}
        <path
          d="M52,110 Q32,130 54,154 Q65,166 74,152"
          fill={activeFeature === "Chin Bob Flare" ? highlightColor : defaultColor}
          opacity="0.95"
          {...strokeProps}
        />
        <path
          d="M148,110 Q168,130 146,154 Q135,166 126,152"
          fill={activeFeature === "Chin Bob Flare" ? highlightColor : defaultColor}
          opacity="0.95"
          {...strokeProps}
        />

        {/* Hair - Crown with side sweep bangs */}
        <path
          d="M65,80 Q50,44 100,42 Q150,44 135,80 Q100,68 65,80Z"
          fill={activeFeature === "Side Sweep Parting" ? highlightColor : defaultColor}
        />

        {/* Highlight Volume Bottom Ends */}
        <circle
          cx="48"
          cy="144"
          r="6"
          fill={activeFeature === "Volume Bottom Ends" ? highlightColor : "none"}
          stroke={activeFeature === "Volume Bottom Ends" ? "none" : "#3b82f6"}
          strokeWidth="1"
          strokeDasharray="2,2"
        />
        <circle
          cx="152"
          cy="144"
          r="6"
          fill={activeFeature === "Volume Bottom Ends" ? highlightColor : "none"}
          stroke={activeFeature === "Volume Bottom Ends" ? "none" : "#3b82f6"}
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      </svg>
    );

    const renderHeartMen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Heart */}
        <path
          d="M100,150 C62,130 58,92 100,92 C142,92 138,130 100,150Z"
          fill="#fff7ed"
          stroke="#3b82f6"
          strokeWidth="2"
          {...strokeProps}
        />
        <ellipse cx="86" cy="110" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="114" cy="110" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M92,130 Q100,135 108,130" fill="none" stroke="#3b82f6" strokeWidth="1.5" />

        {/* Textured Neck Flow (rear medium locks curls) */}
        <path
          d="M56,120 Q50,146 64,152 C72,156 78,144 80,136 M144,120 Q150,146 136,152 C128,156 122,144 120,136"
          fill="none"
          stroke={activeFeature === "Textured Neck Flow" ? highlightColor : defaultColor}
          strokeWidth="8"
          {...strokeProps}
        />

        {/* Crown & Sides soft sweep */}
        <path
          d="M62,86 Q54,48 100,44 Q146,48 138,86 Q100,75 62,86Z"
          fill={activeFeature === "Soft Sweep Fringe" ? highlightColor : defaultColor}
        />

        {/* Sides preserved blend (no fade) */}
        <path
          d="M62,86 Q64,106 60,118 M138,86 Q136,106 140,118"
          fill="none"
          stroke={activeFeature === "Taperless Side Blend" ? highlightColor : "#cbd5e1"}
          strokeWidth="3.5"
        />
      </svg>
    );

    const renderDiamondWomen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Diamond (widest cheekbones, tapering forehead/chin) */}
        <path
          d="M100,66 Q135,104 135,122 Q135,145 100,156 Q65,145 65,122 Q65,104 100,66Z"
          fill="#fff7ed"
          stroke="#059669"
          strokeWidth="2"
          {...strokeProps}
        />
        {/* Features */}
        <ellipse cx="88" cy="108" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="112" cy="108" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M92,128 Q100,133 108,128" fill="none" stroke="#059669" strokeWidth="1.5" />

        {/* Expanded lookbook hair at bottom neck area */}
        <path
          d="M55,144 Q42,160 56,182 M145,144 Q158,160 144,182"
          stroke={activeFeature === "Under-Jaw Shag Ends" ? highlightColor : defaultColor}
          strokeWidth="10"
          {...strokeProps}
        />

        {/* Core crown Shag */}
        <path
          d="M66,80 Q52,52 100,48 Q148,52 134,80 Q146,110 134,142 Q100,136 66,142 Q54,110 66,80Z"
          fill={activeFeature === "Mid-Shaft Wave Flare" ? highlightColor : defaultColor}
        />

        {/* Wispy tasseled fringe */}
        <path
          d="M78,74 L74,90 M88,72 L86,92 M100,70 L100,94 M112,72 L114,92 M122,74 L126,90"
          stroke={activeFeature === "Wispy Tassel Fringe" ? highlightColor : "#f8fafc"}
          strokeWidth="1.5"
          {...strokeProps}
        />
      </svg>
    );

    const renderDiamondMen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Diamond */}
        <path
          d="M100,72 Q130,105 130,122 Q130,142 100,152 Q70,142 70,122 Q70,105 100,72Z"
          fill="#fff7ed"
          stroke="#059669"
          strokeWidth="2"
          {...strokeProps}
        />
        <ellipse cx="86" cy="112" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="114" cy="112" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M92,131 Q100,136 108,131" fill="none" stroke="#059669" strokeWidth="1.5" />

        {/* Medium Temples length */}
        <path
          d="M68,102 Q64,88 68,76 M132,102 Q136,88 132,76"
          stroke={activeFeature === "Temple Length Blend" ? highlightColor : defaultColor}
          strokeWidth="6"
          {...strokeProps}
        />

        {/* Forward brushed textured crop fringe */}
        <path
          d="M68,76 Q58,46 100,42 Q142,46 132,76 Q100,68 68,76Z"
          fill={activeFeature === "Forward Messy Fringe" ? highlightColor : defaultColor}
        />
        {/* Brushed strands lines */}
        <path
          d="M90,46 Q80,68 82,75 M110,46 Q120,68 118,75"
          fill="none"
          stroke={activeFeature === "Forward Messy Fringe" ? highlightColor : "#cbd5e1"}
          strokeWidth="1.5"
          {...strokeProps}
        />

        {/* Low Taper blend outline */}
        <path
          d="M68,102 Q72,116 70,122 M132,102 Q128,116 130,122"
          stroke={activeFeature === "Low Taper Lines" ? highlightColor : "#cbd5e1"}
          strokeWidth="4"
          strokeDasharray="2,1"
        />
      </svg>
    );

    const renderOblongWomen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Oblong (elongated rectangle) */}
        <ellipse cx="100" cy="110" rx="31" ry="54" fill="#fff7ed" stroke="#9333ea" strokeWidth="2" {...strokeProps} />
        {/* Features */}
        <ellipse cx="88" cy="100" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="112" cy="100" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M92,126 Q100,131 108,126" fill="none" stroke="#9333ea" strokeWidth="1.5" />

        {/* Wide horizontal waves at cheeks */}
        <path
          d="M64,96 Q32,120 56,156 Q65,166 74,152"
          fill={activeFeature === "Cheek Level Waves" ? highlightColor : defaultColor}
          opacity="0.95"
          {...strokeProps}
        />
        <path
          d="M136,96 Q168,120 144,156 Q135,166 126,152"
          fill={activeFeature === "Cheek Level Waves" ? highlightColor : defaultColor}
          opacity="0.95"
          {...strokeProps}
        />

        {/* Blunt Shoulder Base frame cut */}
        <path
          d="M52,156 L52,174 M148,156 L148,174"
          stroke={activeFeature === "Blunt Shoulder Base" ? highlightColor : defaultColor}
          strokeWidth="10"
          {...strokeProps}
        />

        {/* Horizon full thick bangs */}
        <path
          d="M68,76 Q54,42 100,38 Q146,42 132,76Z"
          fill={activeFeature === "Full Classic Bangs" ? highlightColor : defaultColor}
        />
        <path
          d="M68,76 Q100,64 132,76"
          stroke={activeFeature === "Full Classic Bangs" ? highlightColor : "#f8fafc"}
          strokeWidth="4"
          {...strokeProps}
        />
      </svg>
    );

    const renderOblongMen = () => (
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {/* Face Outline: Oblong */}
        <ellipse cx="100" cy="115" rx="30" ry="50" fill="#fff7ed" stroke="#9333ea" strokeWidth="2" {...strokeProps} />
        <ellipse cx="86" cy="106" rx="4" ry="4" fill="#cbd5e1" />
        <ellipse cx="114" cy="106" rx="4" ry="4" fill="#cbd5e1" />
        <path d="M92,130 Q100,135 108,130" fill="none" stroke="#9333ea" strokeWidth="1.5" />

        {/* Full Side Profile thicker sides */}
        <path
          d="M68,105 Q58,92 68,76 M132,105 Q142,92 132,76"
          stroke={activeFeature === "Full Side Profile" ? highlightColor : defaultColor}
          strokeWidth="7"
          {...strokeProps}
        />

        {/* Side-Swept upper height crop */}
        <path
          d="M68,76 Q60,48 100,44 Q140,48 132,76 Q100,68 68,76Z"
          fill={activeFeature === "Textured Side-Part" ? highlightColor : defaultColor}
        />

        {/* Splayed Hair trim details */}
        <path
          d="M62,100 Q58,120 62,126 M138,100 Q142,120 138,126"
          stroke={activeFeature === "Splayed Hair Trim" ? highlightColor : "#cbd5e1"}
          strokeWidth="3.5"
        />
      </svg>
    );

    switch (`${shape}_${gender}`) {
      case "round_women": return renderRoundWomen();
      case "round_men": return renderRoundMen();
      case "oval_women": return renderOvalWomen();
      case "oval_men": return renderOvalMen();
      case "square_women": return renderSquareWomen();
      case "square_men": return renderSquareMen();
      case "heart_women": return renderHeartWomen();
      case "heart_men": return renderHeartMen();
      case "diamond_women": return renderDiamondWomen();
      case "diamond_men": return renderDiamondMen();
      case "oblong_women": return renderOblongWomen();
      case "oblong_men": return renderOblongMen();
      default: return null;
    }
  };

  if (pureGraphic) {
    return (
      <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 text-white shadow-md overflow-hidden w-full transition-all duration-300 hover:ring-2 hover:ring-emerald-500/20">
        <div className="flex items-center justify-between border-b border-white/5 bg-slate-950 px-4 py-2 text-[10px] font-bold text-slate-400">
          <span className="flex items-center gap-1.5 uppercase tracking-wider">
            <span className={`inline-block h-2 w-2 rounded-full ${gender === "women" ? "bg-pink-500" : "bg-blue-500"}`} />
            {gender === "women" ? "Women Cut" : "Men Cut"}
          </span>
          <span className="font-mono text-[9px] text-emerald-400">2026 GEOMETRY</span>
        </div>
            <div className="flex items-center justify-center bg-slate-950 p-4 aspect-[4/3] lg:aspect-[16/9] max-w-full relative min-h-[200px] lg:min-h-[260px]">
              {images && images.length > 0 ? (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setLightboxOpen(true)}
                  onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
                  className="relative w-full h-full rounded-md overflow-hidden transition-transform duration-300 transform-gpu hover:scale-105 cursor-zoom-in"
                >
                  <Image src={images[currentImage]} alt={`${headline} ${gender} ${currentImage + 1}`} fill className="object-contain bg-slate-900" sizes="800px" />
                </div>
              ) : (
                renderSVG()
              )}
            </div>

            {lightboxOpen && images && images.length > 0 && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                onClick={() => setLightboxOpen(false)}
                role="dialog"
                aria-modal="true"
              >
                <button
                  aria-label="Close image"
                  onClick={() => setLightboxOpen(false)}
                  className="absolute right-4 top-4 z-60 rounded-full bg-white/90 text-black p-2 shadow-md"
                >
                  ✕
                </button>

                <div className="max-h-[90vh] max-w-[95vw] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                  <img src={images[currentImage]} alt={`fullscreen-${currentImage + 1}`} className="max-h-[90vh] max-w-[95vw] object-contain" />
                </div>
              </div>
            )}
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-slate-900 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-emerald-500/20">
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/2 px-4 py-2 text-xs font-bold text-slate-400">
        <span className="flex items-center gap-1.5 uppercase tracking-wider">
          <span className={`inline-block h-2 w-2 rounded-full ${gender === "women" ? "bg-pink-500" : "bg-blue-500"}`} />
          {gender === "women" ? "Women Recommendation" : "Men Recommendation"}
        </span>
        <span className="font-mono text-[10px] text-emerald-400">2026 TRENDS</span>
      </div>

      <div className="grid grid-cols-1 p-4 sm:grid-cols-12 sm:gap-4">
        {/* SVG Drawing Column */}
        <div className="sm:col-span-6 flex flex-col items-center justify-center rounded-xl bg-slate-950 p-2 relative h-40 sm:h-auto min-h-[180px]">
          {images && images.length > 0 ? (
            <div className="relative w-full h-full rounded-md overflow-hidden">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setLightboxOpen(true)}
                onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
                className="relative w-full h-full rounded-md overflow-hidden transition-transform duration-300 transform-gpu hover:scale-105 cursor-zoom-in"
              >
                <Image
                  src={images[currentImage]}
                  alt={`${headline} ${gender} ${currentImage + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 600px"
                  className="object-contain bg-slate-900"
                  priority={false}
                />
              </div>

              {images.length > 1 && (
                <div className="absolute bottom-2 left-2 right-2 flex gap-2 items-center justify-start overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setCurrentImage(idx)}
                      className={`h-12 w-24 shrink-0 overflow-hidden rounded-md ring-2 transition-all ${
                        idx === currentImage ? "ring-emerald-400" : "ring-transparent"
                      }`}
                      aria-label={`Show image ${idx + 1}`}
                    >
                      <Image src={img} alt={`thumb-${idx + 1}`} width={96} height={60} className="object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            renderSVG()
          )}
          
          {/* Subtle prompt indicator inside the artwork */}
          <span className="absolute bottom-2 right-2 text-[9px] font-mono text-slate-500">
            Hover technique tabs
          </span>
        </div>

        {/* Dynamic Details / Tab secrets list Column */}
        <div className="mt-3 sm:mt-0 sm:col-span-6 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-100 sm:text-base leading-tight">
              {headline}
            </h4>
            <p className="mt-1 text-[11px] leading-tight text-slate-400">
              Interactive Blueprint: Tap or hover custom zones below to reveal styling secrets.
            </p>

            {/* Feature pill highlights */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {secrets.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onMouseEnter={() => setActiveFeature(item.label)}
                  onMouseLeave={() => setActiveFeature(null)}
                  onClick={() => setActiveFeature(activeFeature === item.label ? null : item.label)}
                  className={`cursor-pointer rounded-lg px-2.5 py-1 text-[10px] sm:text-xs font-semibold transition ${
                    activeFeature === item.label
                      ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/30"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  🎯 {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Details screen */}
          <div className="mt-3 min-h-[56px] rounded-lg bg-emerald-950/20 border border-emerald-500/10 p-2.5 text-xs text-slate-300 transition-all">
            {activeFeature ? (
              <div>
                <strong className="text-emerald-400 font-bold uppercase text-[9px] tracking-wider block">
                  How it works:
                </strong>
                <p className="mt-0.5 font-medium leading-normal text-emerald-300">
                  {secrets.find((s) => s.label === activeFeature)?.desc}
                </p>
              </div>
            ) : (
              <p className="italic text-slate-500 text-[11px] leading-relaxed">
                Tip: Hover of touch any zone tab above to spotlight the corresponding haircut lines and alignment principles in real-time.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
