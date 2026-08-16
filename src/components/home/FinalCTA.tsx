import { MapPin, Phone, UtensilsCrossed } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Container } from "@/components/ui/Section";
import { images } from "@/data/images";
import { restaurant, telHref } from "@/data/restaurant";
import { formatPhone } from "@/lib/utils";

/**
 * Closing call to action.
 *
 * The headline answers the hero — "a seat kept for you" becomes "the seat we
 * kept for you" — and the three buttons are the three things this site exists
 * to make easy.
 */
export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden border-t border-gold/20">
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src={images.arch.craft}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/88" />
      </div>

      <Container className="relative py-24 text-center sm:py-32 lg:py-40">
        <ScrollReveal className="flex flex-col items-center">
          <span
            aria-hidden="true"
            className="arch block h-10 w-7 border border-gold/60 border-b-0"
          />

          <h2 className="mt-8 text-display-lg text-ivory">
            The seat we kept for you
          </h2>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-sand">
            Bring the family, bring the whole office, or come on your own and
            sit by the grill. Call us and we will have the table ready.
          </p>

          <div className="mt-11 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <CTAButton
              href={telHref}
              size="lg"
              icon={<Phone className="h-4 w-4" />}
            >
              Call Now
            </CTAButton>
            <CTAButton
              href={restaurant.mapsUrl}
              variant="outline"
              size="lg"
              icon={<MapPin className="h-4 w-4" />}
            >
              Get Directions
            </CTAButton>
            <CTAButton
              href="/menu"
              variant="outline"
              size="lg"
              icon={<UtensilsCrossed className="h-4 w-4" />}
            >
              View Menu
            </CTAButton>
          </div>

          <a
            href={telHref}
            className="mt-9 font-display text-2xl tracking-[0.06em] text-gold-bright transition-colors duration-200 hover:text-ivory sm:text-3xl"
          >
            {formatPhone(restaurant.phone)}
          </a>
        </ScrollReveal>
      </Container>
    </section>
  );
}
