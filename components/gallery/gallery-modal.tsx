"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Share2, ThumbsUp, ThumbsDown, ExternalLink, Copy, Twitter, Facebook, MessageCircle, Loader2 } from "lucide-react";
import type { GalleryItem } from "@/lib/gallery/gallery-data";
import { galleryItems } from "@/lib/gallery/gallery-data";
import { supabase } from "@/lib/supabase";

interface GalleryModalProps {
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
}

export function GalleryModal({ items, initialIndex, onClose }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showShare, setShowShare] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [copied, setCopied] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Voting state
  const [counts, setCounts] = useState({ up: 0, down: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const item = items[currentIndex];
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/gallery#${item.id}` : "";

  // Fetch votes and check local storage
  useEffect(() => {
    const fetchVotes = async () => {
      const { data, error } = await supabase
        .from("gallery_votes")
        .select("vote_type")
        .eq("image_id", item.id);

      if (data) {
        const upCount = data.filter((v) => v.vote_type === "up").length;
        const downCount = data.filter((v) => v.vote_type === "down").length;
        setCounts({ up: upCount, down: downCount });
      }

      // Check if user already voted for this image
      const voted = localStorage.getItem(`voted-${item.id}`);
      if (voted) {
        setHasVoted(true);
        setFeedback(voted as "up" | "down");
      }
    };

    fetchVotes();
  }, [item.id]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [currentIndex, items.length]);

  const navigate = useCallback(
    (dir: number) => {
      setShowShare(false);
      setFeedback(null);
      setHasVoted(false);
      setCurrentIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return items.length - 1;
        if (next >= items.length) return 0;
        return next;
      });
    },
    [items.length]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? 1 : -1);
    }
  };

  const handleShare = (platform: string) => {
    const text = `${item.title} — ${item.description.slice(0, 100)}...`;
    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
    setShowShare(false);
  };

  const handleVote = async (type: "up" | "down") => {
    if (hasVoted || loading) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("gallery_votes")
        .insert([{ image_id: item.id, vote_type: type }]);

      if (!error) {
        setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
        setHasVoted(true);
        setFeedback(type);
        localStorage.setItem(`voted-${item.id}`, type);
      } else {
        console.error("Vote submission failed:", error);
      }
    } catch (err) {
      console.error("Vote submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute right-2 top-2 z-50 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-4 sm:top-4"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close gallery"
      >
        <X className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Left arrow */}
      <button
        className="absolute left-1 top-1/2 z-50 -translate-y-1/2 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-4"
        onClick={(e) => { e.stopPropagation(); navigate(-1); }}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Right arrow */}
      <button
        className="absolute right-1 top-1/2 z-50 -translate-y-1/2 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-4"
        onClick={(e) => { e.stopPropagation(); navigate(1); }}
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Content area */}
      <div
        className="flex h-full w-full max-w-6xl flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image section */}
        <div className="relative flex-1 flex items-center justify-center p-3 sm:p-6 md:p-8 pt-12 sm:pt-4">
          <div className="relative w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[80vh] flex items-center justify-center">
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={600}
              className="object-contain max-h-[50vh] sm:max-h-[60vh] md:max-h-[80vh] w-auto"
              priority
            />
          </div>
          {/* Counter */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm text-white backdrop-blur-sm">
            {currentIndex + 1} / {items.length}
          </div>
        </div>

        {/* Info panel */}
        <div className="w-full md:w-96 bg-white text-slate-900 flex flex-col overflow-y-auto max-h-[40vh] sm:max-h-[50vh] md:max-h-full">
          <div className="p-4 sm:p-6 flex-1">
            {/* Category badge */}
            <span className="inline-block rounded-full bg-emerald-100 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 sm:mb-3">
              {item.category}
            </span>

            {/* Title */}
            <h2 className="text-base sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2">{item.title}</h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-4">{item.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-slate-600">
                  {tag}
                </span>
              ))}
            </div>

            {/* Related calculator CTA */}
            <Link
              href={item.relatedCalculator.href}
              className="flex items-center gap-2 w-full justify-center rounded-lg sm:rounded-xl bg-emerald-600 px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-emerald-500 mb-4 sm:mb-6"
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              Try {item.relatedCalculator.name}
            </Link>

            {/* Share section */}
            <div className="border-t border-slate-200 pt-3 sm:pt-4 mb-3 sm:mb-4">
              <button
                onClick={() => setShowShare(!showShare)}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition"
              >
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                Share this guide
              </button>
              {showShare && (
                <div className="mt-2 sm:mt-3 flex gap-2">
                  <button onClick={() => handleShare("twitter")} className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition" aria-label="Share on Twitter">
                    <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  <button onClick={() => handleShare("facebook")} className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition" aria-label="Share on Facebook">
                    <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  <button onClick={() => handleShare("whatsapp")} className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition" aria-label="Share on WhatsApp">
                    <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  <button onClick={() => handleShare("copy")} className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition" aria-label="Copy link">
                    <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              )}
              {copied && <p className="text-[10px] sm:text-xs text-emerald-600 mt-2">Link copied!</p>}
            </div>

            {/* Feedback with Live Counts */}
            <div className="border-t border-slate-200 pt-3 sm:pt-4">
              <p className="text-xs sm:text-sm font-medium text-slate-600 mb-2">Was this helpful?</p>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => handleVote("up")}
                  disabled={hasVoted || loading}
                  className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition ${
                    feedback === "up" 
                      ? "bg-emerald-100 text-emerald-700" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                  ) : (
                    <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                  Yes ({counts.up})
                </button>
                <button
                  onClick={() => handleVote("down")}
                  disabled={hasVoted || loading}
                  className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition ${
                    feedback === "down" 
                      ? "bg-rose-100 text-rose-700" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50"
                  }`}
                >
                  <ThumbsDown className="h-3 w-3 sm:h-4 sm:w-4" />
                  No ({counts.down})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
