import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "quiet";
type Size = "md" | "lg";

const base =
  "group/cta relative inline-flex items-center justify-center gap-2.5 " +
  "font-sans font-medium uppercase tracking-[0.16em] " +
  "transition-colors duration-300 ease-[var(--ease-arch)] cursor-pointer " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  /* Gold is the site's only filled surface — reserved for the single most
     important action in any given view. */
  primary: "bg-gold text-ink hover:bg-gold-bright",
  /* Hairline outline that fills on hover. Used for secondary actions. */
  outline:
    "border border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink",
  /* Type-only action with an underline that draws in from the left. */
  quiet: "text-sand hover:text-ivory px-0",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-6 text-[0.7rem]",
  lg: "min-h-13 px-8 text-xs",
};

type CTAButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
} & Omit<ComponentProps<"button">, "children" | "className">;

/**
 * The site's single action component.
 *
 * Renders a next/link for internal routes, a plain anchor for `tel:` and
 * external links, and a button when no href is given — so every action shares
 * one set of sizes, focus rings and hover behaviour.
 */
export function CTAButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  icon,
  ...buttonProps
}: CTAButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {icon ? (
        <span
          aria-hidden="true"
          className="shrink-0 transition-transform duration-300 ease-[var(--ease-arch)] group-hover/cta:translate-x-0.5"
        >
          {icon}
        </span>
      ) : null}
      <span className={variant === "quiet" ? "relative" : undefined}>
        {children}
        {variant === "quiet" ? (
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-[var(--ease-arch)] group-hover/cta:scale-x-100"
          />
        ) : null}
      </span>
    </>
  );

  if (href) {
    const isExternal = /^(https?:|tel:|mailto:)/.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
