import { ArchImage } from "@/components/ui/ArchImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Container } from "@/components/ui/Section";
import type { MenuCategory } from "@/data/menu";
import { cn } from "@/lib/utils";

/**
 * One menu category: a sticky editorial column on the left, the dish list on
 * the right. The category's first illustrated dish supplies the arch image, so
 * categories without photography still lay out correctly.
 */
export function MenuCategorySection({
  category,
  index,
}: {
  category: MenuCategory;
  index: number;
}) {
  const leadImage = category.items.find((item) => item.image);

  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      className={cn(
        "scroll-mt-32 border-t border-ivory/8 py-16 sm:py-20 lg:py-24",
        index % 2 === 1 && "bg-ink-raised",
      )}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <ScrollReveal>
                <h2
                  id={`${category.id}-heading`}
                  className="text-display-md text-ivory"
                >
                  {category.name}
                </h2>

                {category.nameArabic ? (
                  <p
                    lang="ar"
                    dir="rtl"
                    className="mt-2 text-lg text-gold-bright"
                  >
                    {category.nameArabic}
                  </p>
                ) : null}

                <span
                  aria-hidden="true"
                  className="rule-gold mt-6 block w-14"
                />

                <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand-deep">
                  {category.blurb}
                </p>
              </ScrollReveal>

              {leadImage?.image ? (
                <ScrollReveal variant="veil" delay={120} className="mt-9 hidden lg:block">
                  <ArchImage
                    src={leadImage.image}
                    alt={leadImage.name}
                    sizes="30vw"
                    className="aspect-3/4 w-full max-w-[15rem]"
                  />
                </ScrollReveal>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
              {category.items.map((item, itemIndex) => (
                <ScrollReveal
                  key={item.name}
                  as="li"
                  delay={Math.min(itemIndex, 5) * 60}
                >
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-lg leading-snug text-ivory">
                      {item.name}
                    </h3>

                    {item.signature ? (
                      <span
                        aria-label="House favourite"
                        title="House favourite"
                        className="arch mt-0.5 block h-2.5 w-2 shrink-0 bg-gold"
                      />
                    ) : null}

                    <span
                      aria-hidden="true"
                      className="mb-1 h-px flex-1 bg-ivory/15"
                    />

                    {item.price ? (
                      <span className="shrink-0 text-sm tracking-wide text-gold-bright tabular-nums">
                        {item.price}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-sand-deep">
                    {item.description}
                  </p>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
