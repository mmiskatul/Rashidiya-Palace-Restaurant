"use client";

import { useMemo, useState } from "react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import {
  activeGalleryCategories,
  galleryImages,
  type GalleryCategory,
} from "@/data/gallery";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

type Filter = GalleryCategory | "All";

/** Aspect ratio per orientation — what gives the masonry its uneven rhythm. */
const aspect = {
  tall: "aspect-3/4",
  wide: "aspect-4/3",
  square: "aspect-square",
} as const;

/**
 * Filterable masonry gallery with a lightbox.
 *
 * True masonry via CSS columns, so photographs keep their own proportions
 * instead of being cropped into a uniform grid. Filters are plain buttons in a
 * radio-style group; the lightbox indexes into the *filtered* list so the
 * arrow keys move through what the visitor is actually looking at.
 */
export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      filter === "All"
        ? galleryImages
        : galleryImages.filter((image) => image.category === filter),
    [filter],
  );

  const filters: Filter[] = ["All", ...activeGalleryCategories];

  if (galleryImages.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-sand-deep">
        Photographs of the restaurant are on their way.
      </p>
    );
  }

  return (
    <>
      {filters.length > 2 ? (
        <div
          role="group"
          aria-label="Filter photographs by subject"
          className="flex flex-wrap gap-2"
        >
          {filters.map((option) => {
            const active = option === filter;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setFilter(option);
                  setOpenIndex(null);
                }}
                aria-pressed={active}
                className={cn(
                  "min-h-11 cursor-pointer border px-5 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                  active
                    ? "border-gold bg-gold text-ink"
                    : "border-ivory/20 text-sand hover:border-ivory/50 hover:text-ivory",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-10 gap-4 [column-count:1] sm:[column-count:2] lg:[column-count:3]">
        {visible.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group/tile mb-4 block w-full cursor-pointer break-inside-avoid overflow-hidden bg-ink-soft"
          >
            <span className={cn("relative block w-full", aspect[image.orientation])}>
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-arch)] group-hover/tile:scale-[1.05]"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover/tile:bg-ink/25" />
            </span>
            <span className="sr-only">View larger: {image.alt}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-sm text-sand-deep">
          No photographs in this category yet.
        </p>
      ) : null}

      {openIndex !== null ? (
        <Lightbox
          images={visible}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      ) : null}
    </>
  );
}
