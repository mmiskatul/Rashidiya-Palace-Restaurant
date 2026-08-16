import { cn } from "@/lib/utils";
import { ImageWithFallback } from "./ImageWithFallback";

type ArchImageProps = {
  src: string;
  alt: string;
  /** Sizes hint for the responsive image — always pass a realistic value. */
  sizes: string;
  className?: string;
  /** Draws a gold hairline arch offset behind the photograph. */
  outlined?: boolean;
  /** Shallower dome, for wider crops. */
  shallow?: boolean;
  priority?: boolean;
};

/**
 * The site's signature form: a photograph masked into a palace arch.
 *
 * The optional gold outline is offset behind the image so the two arches read
 * as one drawn shape — the detail that ties the homepage, about page and menu
 * together.
 */
export function ArchImage({
  src,
  alt,
  sizes,
  className,
  outlined = false,
  shallow = false,
  priority = false,
}: ArchImageProps) {
  const archClass = shallow ? "arch-shallow" : "arch";

  return (
    <div className={cn("relative", className)}>
      {outlined ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-gold/40 sm:translate-x-5 sm:translate-y-5",
            archClass,
          )}
        />
      ) : null}

      <div className={cn("relative h-full w-full overflow-hidden bg-ink-soft", archClass)}>
        <ImageWithFallback
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-arch)] hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}
