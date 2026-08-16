import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container, Section } from "@/components/ui/Section";
import { FoodCard } from "@/components/menu/FoodCard";
import { featuredDishes, MENU_IS_SAMPLE } from "@/data/menu";

/**
 * Homepage food showcase. Reads from the same menu data as /menu, so a dish is
 * never described two different ways on two different pages.
 */
export function FeaturedDishes() {
  if (featuredDishes.length === 0) return null;

  return (
    <Section className="border-t border-ivory/8 bg-ink-raised">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="From the Kitchen"
            title="Plates worth passing around"
          />
          <ScrollReveal delay={100} className="shrink-0">
            <CTAButton
              href="/menu"
              variant="quiet"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              View Full Menu
            </CTAButton>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDishes.map((dish, index) => (
            <ScrollReveal key={dish.name} delay={(index % 3) * 90}>
              <FoodCard
                item={dish}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              />
            </ScrollReveal>
          ))}
        </div>

        {MENU_IS_SAMPLE ? (
          <p className="mt-12 border-l-2 border-gold/40 pl-4 text-xs leading-relaxed text-sand-deep">
            Dishes and prices shown are a sample of the kind of menu this
            kitchen serves, pending confirmation from the restaurant. Please
            call to check today&rsquo;s availability.
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
