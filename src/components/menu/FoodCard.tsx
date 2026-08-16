import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

type FoodCardProps = {
  item: MenuItem;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * A dish presented as a photograph with the name and price on one baseline.
 *
 * The image is square-cropped and square-cornered — arches are reserved for
 * the editorial sections, so the food grids stay quiet by comparison.
 */
export function FoodCard({ item, sizes, className, priority }: FoodCardProps) {
  return (
    <article className={cn("group/card flex flex-col", className)}>
      {item.image ? (
        <div className="relative aspect-4/5 w-full overflow-hidden bg-ink-soft">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[900ms] ease-[var(--ease-arch)] group-hover/card:scale-[1.05]"
          />
          {item.signature ? (
            <span className="absolute left-0 top-0 bg-ink/85 px-3 py-1.5 label-xs text-gold-bright backdrop-blur-sm">
              House Favourite
            </span>
          ) : null}
        </div>
      ) : null}

      <div className={cn("flex flex-1 flex-col", item.image && "pt-5")}>
        <div className="flex items-baseline gap-4">
          <h3 className="font-display text-xl leading-snug text-ivory">
            {item.name}
          </h3>
          <span
            aria-hidden="true"
            className="mb-1 h-px flex-1 bg-ivory/15"
          />
          {item.price ? (
            <span className="shrink-0 font-sans text-sm tracking-wide text-gold-bright tabular-nums">
              {item.price}
            </span>
          ) : null}
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-sand-deep">
          {item.description}
        </p>
      </div>
    </article>
  );
}
