import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ArchImage } from "@/components/ui/ArchImage";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { JsonLd } from "@/components/ui/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container, Section } from "@/components/ui/Section";
import { images } from "@/data/images";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "How we cook and how we host: charcoal, fresh bread and slow-cooked rice, served for sharing at Rashidiya Palace Restaurant in Dubai.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Rashidiya Palace Restaurant",
    description:
      "Charcoal, fresh bread and slow-cooked rice, served for sharing in Dubai.",
    url: "/about",
  },
};

/**
 * Storytelling page.
 *
 * Every claim here is about method and intent — how food is cooked and how
 * guests are looked after. Nothing about history, awards or ratings, because
 * none of that is confirmed.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd({ name: "About", path: "/about" })} />

      <PageHeader
        eyebrow="Our Story"
        title="A kitchen that cooks the long way round"
        intro="Charcoal takes time to settle. Bread has to be baked to order. Rice will not be rushed. Everything we serve is built on those three inconveniences — because they are what make the food worth sitting down for."
      />

      {/* --- Philosophy ---------------------------------------------------- */}
      <Section space="loose">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="The Cooking"
                title="Fire first, everything else after"
                intro="The grill is the centre of the kitchen. Skewers are seasoned simply and cooked over open coals, because good lamb and good chicken do not need to be hidden under sauce."
              />
              <ScrollReveal delay={120}>
                <p className="mt-5 max-w-xl text-[0.975rem] leading-relaxed text-sand-deep">
                  Alongside it, the oven runs all evening for bread and
                  manakish, and the rice pots sit low and slow until the lamb
                  gives way. It is not complicated cooking. It is patient
                  cooking, which is harder.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="veil" className="lg:col-span-6">
              <ArchImage
                src={images.arch.craft}
                alt="A cook grilling over open coals"
                sizes="(min-width: 1024px) 45vw, 100vw"
                outlined
                className="aspect-4/5 w-full"
              />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* --- Hospitality, on a full-bleed plate ---------------------------- */}
      <section className="relative isolate overflow-hidden border-y border-ivory/8">
        <div className="absolute inset-0 -z-10">
          <ImageWithFallback
            src={images.gallery.tableSpread}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/90" />
        </div>

        <Container className="py-24 sm:py-32">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="label-xs text-gold">Hospitality</span>
            <blockquote className="mt-7 font-display text-display-md text-ivory">
              &ldquo;Sit down. Eat something first. We can talk after.&rdquo;
            </blockquote>
            <p className="mt-7 text-[0.975rem] leading-relaxed text-sand">
              That instinct — feed the guest before anything else — is the whole
              idea behind how we run the room. Tea comes out before the menu.
              Bread is refilled without being asked. Nobody is moved along
              because the table is wanted.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* --- The table ----------------------------------------------------- */}
      <Section space="loose">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
            <ScrollReveal variant="veil" className="lg:col-span-6 lg:order-1">
              <ArchImage
                src={images.arch.table}
                alt="A wooden table set with bowls of food for sharing"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-4/5 w-full"
              />
            </ScrollReveal>

            <div className="lg:col-span-6 lg:order-2">
              <SectionHeading
                eyebrow="The Table"
                title="Food that only works when it is shared"
                intro="Nothing on the menu is designed to be eaten alone in front of you. Mezze is meant to be reached across. A mixed grill is meant to be pulled apart. Rice comes on a platter because it is for the table, not the plate."
              />
              <ScrollReveal delay={120}>
                <p className="mt-5 max-w-xl text-[0.975rem] leading-relaxed text-sand-deep">
                  So bring people. Bring the family after work, bring the group
                  that can never agree on where to eat, bring whoever has not
                  had a proper meal in a while. Call ahead if there are a lot of
                  you and we will join the tables before you get here.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
