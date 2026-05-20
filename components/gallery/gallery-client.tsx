"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Filter } from "lucide-react";
import { galleryItems, galleryCategories, type GalleryItem } from "@/lib/gallery/gallery-data";
import { GalleryModal } from "@/components/gallery/gallery-modal";

export function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [filteredItems, setFilteredItems] = useState(galleryItems);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter((item) => item.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const index = galleryItems.findIndex((item) => item.id === hash);
      if (index !== -1) {
        setModalIndex(index);
        setModalOpen(true);
      }
    }
  }, []);

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
    window.history.pushState(null, "", `#${filteredItems[index].id}`);
  };

  const closeModal = () => {
    setModalOpen(false);
    window.history.pushState(null, "", window.location.pathname);
  };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-emerald-600">
            Visual Health Guides
          </p>
          <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-800">
            See It. Understand It.{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Measure It.
            </span>
          </h1>
          <p className="mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg text-slate-600">
            Browse visual guides for body shapes, face shapes, health charts, and more. Click any image to explore detailed insights and find your perfect calculator match.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-[60px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => openModal(index)}
              className="group relative flex flex-col items-center rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 text-center ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            >
              {/* Image */}
              <div className="relative mb-2 sm:mb-3 w-full aspect-[4/3] overflow-hidden rounded-lg sm:rounded-xl bg-slate-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg sm:rounded-xl" />
              </div>

              {/* Category */}
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
                {item.category}
              </span>

              {/* Title */}
              <p className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                {item.title}
              </p>

              {/* Tags */}
              <div className="mt-1 sm:mt-2 flex flex-wrap justify-center gap-1">
                {item.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-medium text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-slate-500">No guides found for this category.</p>
          </div>
        )}
      </section>

      {/* Modal */}
      {modalOpen && (
        <GalleryModal
          items={filteredItems}
          initialIndex={modalIndex}
          onClose={closeModal}
        />
      )}
    </>
  );
}
