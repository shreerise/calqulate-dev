"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/90 p-4 sm:p-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <div className="relative flex h-full max-h-[90vh] w-full max-w-5xl items-center justify-center">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
        <button
          className="absolute right-0 top-0 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/30 md:-right-4 md:-top-4"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close image preview"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface ClickableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  priority?: boolean;
}

export function ClickableImage({
  src,
  alt,
  width,
  height,
  fill,
  className = "",
  containerClassName = "",
  sizes,
  priority,
}: ClickableImageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleClose = useCallback(() => setLightboxOpen(false), []);

  return (
    <>
      <div
        className={`group relative overflow-hidden cursor-zoom-in h-full w-full ${containerClassName}`}
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          className={`transition-transform duration-500 ease-out group-hover:scale-110 ${className}`}
          sizes={sizes}
          priority={priority}
        />
      </div>
      {lightboxOpen && (
        <ImageLightbox src={src} alt={alt} onClose={handleClose} />
      )}
    </>
  );
}
