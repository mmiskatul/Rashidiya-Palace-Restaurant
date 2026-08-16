import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page gutter and max width — the one container used site-wide. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[80rem] px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Vertical rhythm. "tight" for stacked sections, "loose" for feature blocks. */
  space?: "tight" | "normal" | "loose";
  "aria-labelledby"?: string;
};

const spacing = {
  tight: "py-16 sm:py-20",
  normal: "py-20 sm:py-28 lg:py-32",
  loose: "py-24 sm:py-32 lg:py-40",
} as const;

/**
 * Section wrapper owning all vertical rhythm.
 *
 * Padding lives here and nowhere else, which is what keeps two adjacent
 * sections from fighting over margins.
 */
export function Section({
  children,
  className,
  id,
  space = "normal",
  ...rest
}: SectionProps) {
  return (
    <section id={id} className={cn(spacing[space], className)} {...rest}>
      {children}
    </section>
  );
}
