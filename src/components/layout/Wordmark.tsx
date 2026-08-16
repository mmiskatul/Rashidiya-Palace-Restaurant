import Link from "next/link";
import { cn } from "@/lib/utils";
import { restaurant } from "@/data/restaurant";

/**
 * The wordmark: an arch drawn around the initial, then the name set in two
 * tracked lines. Stands in for a logo until the restaurant supplies one.
 */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group/mark flex items-center gap-3 text-ivory transition-opacity duration-300 hover:opacity-85",
        className,
      )}
      aria-label={`${restaurant.name} — home`}
    >
      <span
        aria-hidden="true"
        className="relative flex h-10 w-8 shrink-0 items-end justify-center border border-gold/50 arch"
      >
        <span className="pb-1.5 font-display text-base leading-none text-gold-bright">
          R
        </span>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display tracking-[0.14em] text-ivory",
            compact ? "text-sm" : "text-[0.9375rem]",
          )}
        >
          RASHIDIYA
        </span>
        <span className="label-xs mt-1 text-[0.5625rem] text-sand-deep">
          Palace Restaurant
        </span>
      </span>
    </Link>
  );
}
