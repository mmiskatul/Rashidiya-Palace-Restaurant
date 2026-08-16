import { ArrowRight } from "lucide-react";
import { ArchImage } from "@/components/ui/ArchImage";
import { CTAButton } from "@/components/ui/CTAButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container, Section } from "@/components/ui/Section";
import { images } from "@/data/images";

/** Brand introduction — image and text, no claims the restaurant can't back. */
export function Welcome() {
  return (
    <Section space="loose" className="bg-ink">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <ScrollReveal variant="veil" className="lg:col-span-5">
            <ArchImage
              src={images.arch.welcome}
              alt="Tea being poured into a row of glasses"
              sizes="(min-width: 1024px) 40vw, 100vw"
              outlined
              className="aspect-3/4 w-full max-w-md lg:max-w-none"
            />
          </ScrollReveal>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The Welcome"
              title="You are seated before you are served."
              intro="Hospitality here starts at the door, not at the table. Tea arrives before the menu does, bread arrives before you ask, and nobody is hurried through a meal they came to enjoy."
            />

            <ScrollReveal delay={120}>
              <p className="mt-5 max-w-xl text-[0.975rem] leading-relaxed text-sand-deep">
                The kitchen works the way Arabic kitchens have always worked:
                charcoal for the grill, a hot oven for the bread, and rice given
                the hours it needs. Dishes come out to be shared, so order
                generously and put everything in the middle.
              </p>

              <div className="mt-9">
                <CTAButton
                  href="/about"
                  variant="quiet"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Discover Our Story
                </CTAButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
