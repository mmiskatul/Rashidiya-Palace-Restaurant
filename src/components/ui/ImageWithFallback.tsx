"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = ImageProps & {
  /** Extra classes for the wrapper that also receives the arch mask, if any. */
  wrapperClassName?: string;
};

/**
 * next/image with a graceful, on-brand fallback.
 *
 * A missing or broken photograph renders a warm textured panel carrying the
 * site's arch motif instead of a torn-image icon, so the layout never breaks
 * and the page still reads as designed.
 */
export function ImageWithFallback({
  className,
  wrapperClassName,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      /* A span, not a div: this can render inside a <button> or <span>, where
         flow content would be invalid HTML. */
      <span
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-ink-soft",
          wrapperClassName,
          className,
        )}
      >
        {/* Arch glyph — the site's motif, reused as the placeholder mark. */}
        <svg
          viewBox="0 0 40 56"
          aria-hidden="true"
          className="h-12 w-auto text-gold/35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 55V20a19 19 0 0 1 38 0v35" />
          <path d="M9 55V21a11 11 0 0 1 22 0v34" />
        </svg>
      </span>
    );
  }

  return (
    <Image
      alt={alt}
      className={cn(className, wrapperClassName)}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
