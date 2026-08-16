import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container, Section } from "@/components/ui/Section";

/**
 * Four reasons to come in.
 *
 * No icons — each block is capped by a small drawn arch instead, which keeps
 * the motif running through the page and avoids the stock-icon-grid look.
 */
const reasons = [
  {
    title: "Charcoal at the centre",
    body: "The grill does the work. Skewers go over open coals and come to the table while they are still smoking.",
  },
  {
    title: "Built for sharing",
    body: "Mezze, grills and rice arrive as platters, not portions. Order across the menu and put everything in the middle.",
  },
  {
    title: "Room for the table",
    body: "Coming with a group? Call ahead and we will put tables together before you arrive.",
  },
  {
    title: "Easy to find in Dubai",
    body: "One tap opens directions in Google Maps, so you can be on your way without hunting for the address.",
  },
];

export function Experience() {
  return (
    <Section className="border-t border-ivory/8 bg-ink">
      <Container>
        <SectionHeading
          eyebrow="Why Rashidiya Palace"
          title="Come for the grill. Stay for the table."
          align="center"
        />

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.title} delay={index * 90}>
              <article className="flex flex-col">
                <span
                  aria-hidden="true"
                  className="arch block h-7 w-5 border border-gold/55 border-b-0"
                />
                <h3 className="mt-6 font-display text-xl leading-snug text-ivory">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sand-deep">
                  {reason.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
