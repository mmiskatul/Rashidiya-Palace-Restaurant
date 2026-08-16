import { ArchImage } from "@/components/ui/ArchImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container, Section } from "@/components/ui/Section";
import { LocationCard } from "@/components/contact/LocationCard";
import { images } from "@/data/images";

export function LocationSection() {
  return (
    <Section id="visit" className="border-t border-ivory/8 bg-ink">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Find Us"
              title="Come and eat with us"
              intro="Call ahead for larger groups, or open directions and head straight over."
            />

            <ScrollReveal variant="veil" delay={140} className="mt-12 hidden lg:block">
              <ArchImage
                src={images.arch.table}
                alt="A wooden table set with bowls of food for sharing"
                sizes="35vw"
                shallow
                className="aspect-4/3 w-full"
              />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={100} className="lg:col-span-7">
            <LocationCard />
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
