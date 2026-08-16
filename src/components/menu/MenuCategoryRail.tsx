"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MenuCategoryRailProps = {
  categories: { id: string; name: string }[];
};

/**
 * Sticky category rail with scroll spy.
 *
 * Anchors are real `#id` links, so the menu is still navigable (and deep
 * linkable) with JavaScript disabled — the observer only adds the highlight.
 * The active chip is scrolled into view on narrow screens so it never ends up
 * hidden off the edge of the rail.
 */
export function MenuCategoryRail({ categories }: MenuCategoryRailProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = categories
      .map((category) => document.getElementById(category.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Top band only, so the "current" category is the one under the header.
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.querySelector<HTMLElement>(`[data-chip="${activeId}"]`);
    if (!rail || !chip) return;

    const overflowsLeft = chip.offsetLeft < rail.scrollLeft;
    const overflowsRight =
      chip.offsetLeft + chip.offsetWidth > rail.scrollLeft + rail.clientWidth;

    if (overflowsLeft || overflowsRight) {
      rail.scrollTo({
        left: chip.offsetLeft - 24,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  }, [activeId]);

  return (
    <div className="sticky top-[3.75rem] z-20 border-b border-ivory/10 bg-ink/90 backdrop-blur-md lg:top-[4.25rem]">
      <nav aria-label="Menu categories">
        <div
          ref={railRef}
          className="mx-auto flex max-w-[80rem] gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 lg:justify-center lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => {
            const active = category.id === activeId;

            return (
              <a
                key={category.id}
                href={`#${category.id}`}
                data-chip={category.id}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "flex min-h-11 shrink-0 items-center whitespace-nowrap border-b-2 px-4 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-200",
                  active
                    ? "border-gold text-gold-bright"
                    : "border-transparent text-sand hover:text-ivory",
                )}
              >
                {category.name}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
