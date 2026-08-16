"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { GalleryImage } from "@/data/gallery";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

/**
 * Full-screen image viewer.
 *
 * Keyboard: Escape closes, ArrowLeft/ArrowRight move between photographs, and
 * Tab is trapped inside the dialog. Focus is moved to the close button on open
 * and handed back to the thumbnail that opened it on close.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const image = images[index];
  const count = images.length;

  const goPrev = useCallback(
    () => onNavigate((index - 1 + count) % count),
    [index, count, onNavigate],
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % count),
    [index, count, onNavigate],
  );

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          onClose();
          break;
        case "ArrowLeft":
          event.preventDefault();
          goPrev();
          break;
        case "ArrowRight":
          event.preventDefault();
          goNext();
          break;
        case "Tab": {
          const items = Array.from(
            dialogRef.current?.querySelectorAll<HTMLElement>(
              "button:not([disabled])",
            ) ?? [],
          );
          if (items.length === 0) return;

          const first = items[0];
          const last = items[items.length - 1];

          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
    };
  }, [onClose, goPrev, goNext]);

  if (!image) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph ${index + 1} of ${count}: ${image.alt}`}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/97 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-ivory/10 px-4 py-3 sm:px-6">
        <span className="label-xs text-sand-deep tabular-nums">
          {index + 1} / {count}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 cursor-pointer items-center justify-center text-sand transition-colors duration-200 hover:text-ivory"
        >
          <X aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">Close gallery viewer</span>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8">
        <div className="relative h-full w-full max-w-5xl">
          <ImageWithFallback
            /* Key forces a fresh element per photograph so the fade replays. */
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 70vw, 95vw"
            className="animate-[veil-lift_0.45s_var(--ease-arch)_both] object-contain"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-ivory/10 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={goPrev}
          disabled={count < 2}
          className="flex min-h-11 cursor-pointer items-center gap-2 px-3 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-sand transition-colors duration-200 hover:text-ivory disabled:opacity-40"
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">Previous</span>
        </button>

        <p className="min-w-0 flex-1 truncate text-center text-xs text-sand-deep">
          {image.alt}
        </p>

        <button
          type="button"
          onClick={goNext}
          disabled={count < 2}
          className="flex min-h-11 cursor-pointer items-center gap-2 px-3 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-sand transition-colors duration-200 hover:text-ivory disabled:opacity-40"
        >
          <span className="sr-only sm:not-sr-only">Next</span>
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
