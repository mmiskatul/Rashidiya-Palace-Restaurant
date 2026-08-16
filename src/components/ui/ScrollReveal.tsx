"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in milliseconds. */
  delay?: number;
  /** "rise" translates up; "veil" scales a photograph down into place. */
  variant?: "rise" | "veil";
  as?: ElementType;
};

/**
 * Reveals its children once they scroll into view.
 *
 * Uses a single IntersectionObserver per instance and disconnects after the
 * first reveal — nothing keeps observing after the animation has run. The
 * animation itself lives in CSS, where `prefers-reduced-motion` forces the
 * final state immediately. If IntersectionObserver is unavailable the content
 * is shown straight away rather than staying hidden.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "rise",
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Opt in to the hidden state only now that JS is confirmed running.
    document.documentElement.classList.add("js-reveal");

    const show = () => node.setAttribute("data-visible", "true");
    const showInstantly = () => node.setAttribute("data-instant", "true");

    if (typeof IntersectionObserver === "undefined") {
      showInstantly();
      return;
    }

    // A hidden document (background tab, prerender, non-compositing frame)
    // fires no intersection callbacks *and* freezes CSS animations, so a
    // fill-mode reveal would strand the content at opacity 0. Show it outright.
    if (document.visibilityState !== "visible") {
      showInstantly();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(variant === "veil" ? "reveal veil" : "reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
