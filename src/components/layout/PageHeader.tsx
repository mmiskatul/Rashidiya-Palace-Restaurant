import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Container } from "@/components/ui/Section";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Optional trailing element, e.g. a contact strip. */
  children?: ReactNode;
};

/**
 * Masthead for inner pages.
 *
 * Sits below the fixed header with enough clearance that the h1 is never
 * overlapped, and carries the same eyebrow/rule treatment as SectionHeading so
 * page tops and section tops read as one system.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-ivory/8 bg-ink-raised pb-16 pt-32 sm:pb-20 sm:pt-40">
      {/* A single oversized arch, cropped by the section — the motif at scale. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 h-[26rem] w-[20rem] border border-gold/12 arch sm:right-4"
      />

      <Container className="relative">
        <ScrollReveal>
          <p className="label-xs flex items-center gap-3 text-gold">
            <span aria-hidden="true" className="rule-gold block w-8" />
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-display-lg text-ivory">{title}</h1>
          {intro ? (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-sand">
              {intro}
            </p>
          ) : null}
          {children}
        </ScrollReveal>
      </Container>
    </header>
  );
}
