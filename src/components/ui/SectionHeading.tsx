import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

type SectionHeadingProps = {
  /** Small tracked label above the heading. */
  eyebrow: string;
  title: ReactNode;
  /** Optional supporting paragraph beneath the heading. */
  intro?: ReactNode;
  align?: "left" | "center";
  /** `h2` on inner sections, `h1` at the top of a page. */
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
};

/**
 * The section header used across every page: gold hairline, tracked eyebrow,
 * display title, optional intro. Keeping it in one place is what makes the
 * vertical rhythm identical from the homepage through to the contact page.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <ScrollReveal
      className={cn(
        "flex flex-col",
        centered && "items-center text-center",
        className,
      )}
    >
      <span
        className={cn(
          "label-xs flex items-center gap-3 text-gold",
          centered && "justify-center",
        )}
      >
        <span aria-hidden="true" className="rule-gold block w-8" />
        {eyebrow}
        {centered ? (
          <span aria-hidden="true" className="rule-gold block w-8" />
        ) : null}
      </span>

      <Tag
        className={cn(
          "mt-5 text-display-lg text-ivory",
          centered ? "max-w-3xl" : "max-w-2xl",
          titleClassName,
        )}
      >
        {title}
      </Tag>

      {intro ? (
        <p
          className={cn(
            "mt-6 max-w-xl text-[0.975rem] leading-relaxed text-sand",
            centered && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </ScrollReveal>
  );
}
