import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container, Section } from "@/components/ui/Section";
import { galleryPreview } from "@/data/gallery";
import { cn } from "@/lib/utils";

/**
 * Editorial gallery preview.
 *
 * Deliberately not a grid of equal cards: spans, aspect ratios and a staggered
 * top offset give the block its own rhythm. The first image is arched, tying
 * the section back to the hero.
 */
const layout = [
  { span: "lg:col-span-5", aspect: "aspect-3/4", arch: true, offset: "" },
  { span: "lg:col-span-7", aspect: "aspect-4/3 lg:aspect-16/11", arch: false, offset: "lg:mt-14" },
  { span: "lg:col-span-4", aspect: "aspect-4/5", arch: false, offset: "" },
  { span: "lg:col-span-4", aspect: "aspect-square", arch: false, offset: "lg:mt-10" },
  { span: "lg:col-span-4", aspect: "aspect-4/5", arch: false, offset: "lg:mt-20" },
];

export function GalleryPreview() {
  if (galleryPreview.length === 0) return null;

  return (
    <Section space="loose" className="border-t border-ivory/8 bg-ink-raised">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="The Room"
            title="Warm light, low tables, open fire"
          />
          <ScrollReveal delay={100} className="shrink-0">
            <CTAButton
              href="/gallery"
              variant="quiet"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              View Gallery
            </CTAButton>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12">
          {galleryPreview.map((image, index) => {
            const cell = layout[index] ?? layout[layout.length - 1];

            return (
              <ScrollReveal
                key={image.src}
                variant="veil"
                delay={index * 80}
                className={cn(cell.span, cell.offset)}
              >
                <div
                  className={cn(
                    "group/tile relative w-full overflow-hidden bg-ink-soft",
                    cell.aspect,
                    cell.arch && "arch",
                  )}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 48vw, 92vw"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-arch)] group-hover/tile:scale-[1.05]"
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
