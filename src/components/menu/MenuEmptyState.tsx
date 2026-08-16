import { Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container, Section } from "@/components/ui/Section";
import { telHref } from "@/data/restaurant";

/**
 * Shown when no menu data exists yet.
 *
 * An empty menu should still look like part of the site and still give the
 * visitor something to do — so it offers the phone, which is the fallback the
 * restaurant actually wants.
 */
export function MenuEmptyState() {
  return (
    <Section space="loose">
      <Container>
        <div className="mx-auto flex max-w-md flex-col items-center border border-ivory/12 bg-ink-raised px-8 py-16 text-center">
          <span
            aria-hidden="true"
            className="arch block h-10 w-7 border border-gold/50 border-b-0"
          />
          <h2 className="mt-8 font-display text-2xl text-ivory">
            The menu is being updated
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-sand-deep">
            Our dishes are not listed online just yet. Give us a call and we
            will talk you through what the kitchen is serving today.
          </p>
          <CTAButton
            href={telHref}
            size="lg"
            className="mt-9"
            icon={<Phone className="h-4 w-4" />}
          >
            Call the Restaurant
          </CTAButton>
        </div>
      </Container>
    </Section>
  );
}
