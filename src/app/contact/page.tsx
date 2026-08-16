import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { HoursCard } from "@/components/contact/HoursCard";
import { LocationCard } from "@/components/contact/LocationCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Container, Section } from "@/components/ui/Section";
import { restaurant, telHref } from "@/data/restaurant";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { formatPhone } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Call Rashidiya Palace Restaurant on +971 56 812 3717, get directions in Dubai, or send a table request.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Rashidiya Palace Restaurant",
    description:
      "Call, get directions, or request a table at Rashidiya Palace Restaurant in Dubai.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd({ name: "Contact", path: "/contact" })} />

      <PageHeader
        eyebrow="Contact"
        title="Call us, or come and find us"
        intro="The fastest way to get a table is to pick up the phone. If you would rather write, send a request and we will call you back."
      >
        {/* The phone number as display type — on this page it is the point. */}
        <a
          href={telHref}
          className="mt-9 inline-block font-display text-3xl tracking-[0.05em] text-gold-bright transition-colors duration-200 hover:text-ivory sm:text-4xl"
        >
          {formatPhone(restaurant.phone)}
        </a>
      </PageHeader>

      <Section id="reserve">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <ScrollReveal className="lg:col-span-7">
              <ContactForm />
            </ScrollReveal>

            <div className="flex flex-col gap-6 lg:col-span-5">
              <ScrollReveal delay={100}>
                <LocationCard headingLevel={2} />
              </ScrollReveal>
              <ScrollReveal delay={180}>
                <HoursCard />
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
