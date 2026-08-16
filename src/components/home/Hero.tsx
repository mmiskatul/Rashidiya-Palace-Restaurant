import { ArrowRight, MapPin } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Container } from "@/components/ui/Section";
import { images } from "@/data/images";
import { restaurant } from "@/data/restaurant";

/**
 * Cinematic hero.
 *
 * A full-bleed photograph carries the mood; a gold hairline arch is drawn over
 * it as a portal so the site's motif is established in the first screen. The
 * copy sits in a left-weighted editorial column rather than dead centre.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src={images.hero}
          alt="Grilled meats, mezze and fresh bread laid across a table"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Two scrims: a vertical one for the copy, a soft radial one to hold
            the centre of the image. Text contrast is never left to chance. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/72 to-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />
      </div>

      {/* The arch portal — drawn, not filled, so the photograph stays visible
          through it. Hidden on small screens where it would crowd the copy. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[6%] hidden w-[28rem] items-center xl:flex"
      >
        <div className="arch h-[68vh] w-full border border-gold/25" />
        <div className="arch absolute inset-x-8 h-[62vh] border border-gold/12" />
      </div>

      <Container className="relative z-10 pb-20 pt-36 sm:pb-24 lg:pb-32">
        <div className="max-w-2xl">
          <p className="label-xs flex items-center gap-3 text-gold-bright">
            <span aria-hidden="true" className="rule-gold block w-10" />
            {restaurant.name}
          </p>

          <h1 className="mt-7 text-display-xl text-ivory">
            Charcoal, saffron,
            <br />
            and a seat kept
            <br />
            for you.
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-ivory-dim sm:text-lg">
            An Arabic kitchen in Dubai built around open fire, bread pulled
            straight from the oven, and generous plates meant to be passed
            across the table.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <CTAButton
              href="/menu"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Explore Menu
            </CTAButton>
            <CTAButton
              href={restaurant.mapsUrl}
              variant="outline"
              size="lg"
              icon={<MapPin className="h-4 w-4" />}
            >
              Get Directions
            </CTAButton>
          </div>

          <p className="mt-10 flex items-center gap-2.5 text-xs tracking-wide text-sand-deep">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-gold" />
            {restaurant.location}
          </p>
        </div>
      </Container>
    </section>
  );
}
