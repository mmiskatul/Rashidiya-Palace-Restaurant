import { MapPin, Navigation, Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { restaurant, telHref } from "@/data/restaurant";
import { cn, formatPhone } from "@/lib/utils";

/**
 * Location and contact card.
 *
 * No map iframe: embedding a live map would mean either a fake API key or an
 * extra third-party script on every page. Instead this is a drawn card whose
 * "Get Directions" button opens the restaurant's real Google Maps listing,
 * which is what someone actually wants from a map anyway.
 */
export function LocationCard({
  className,
  /**
   * Heading level. The card sits under a section heading on the homepage (h3)
   * but directly under the page title on /contact (h2) — passing the level in
   * keeps the document outline correct in both places.
   */
  headingLevel = 3,
}: {
  className?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-ivory/12 bg-ink-raised",
        className,
      )}
    >
      {/* Arcade of arches — the motif used as a quiet background texture. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex h-40 justify-center gap-3 opacity-30"
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="arch block h-full w-14 border border-gold/25 border-b-0"
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent to-ink-raised"
      />

      <div className="relative p-8 pt-24 sm:p-10 sm:pt-28">
        <Heading className="font-display text-display-md text-ivory">
          {restaurant.name}
        </Heading>

        <ul className="mt-7 flex flex-col gap-5 text-sm">
          <li className="flex items-start gap-3.5">
            <MapPin
              aria-hidden="true"
              className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold"
            />
            <span className="text-sand">
              {restaurant.addressLine ? (
                <>
                  {restaurant.addressLine}
                  <br />
                </>
              ) : null}
              {restaurant.location}
            </span>
          </li>
          <li className="flex items-start gap-3.5">
            <Phone
              aria-hidden="true"
              className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold"
            />
            <a
              href={telHref}
              className="text-ivory transition-colors duration-200 hover:text-gold-bright"
            >
              {formatPhone(restaurant.phone)}
            </a>
          </li>
        </ul>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CTAButton
            href={telHref}
            size="lg"
            className="sm:flex-1"
            icon={<Phone className="h-4 w-4" />}
          >
            Call Restaurant
          </CTAButton>
          <CTAButton
            href={restaurant.mapsUrl}
            variant="outline"
            size="lg"
            className="sm:flex-1"
            icon={<Navigation className="h-4 w-4" />}
          >
            Get Directions
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
