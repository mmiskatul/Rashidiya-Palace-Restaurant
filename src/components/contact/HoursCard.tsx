import { Clock, Phone } from "lucide-react";
import { hasOpeningHours, restaurant, telHref } from "@/data/restaurant";
import { formatPhone } from "@/lib/utils";

/**
 * Opening hours.
 *
 * Hours are not confirmed for this restaurant, so rather than inventing them
 * this card says so plainly and offers the phone. Add entries to
 * `restaurant.openingHours` and the real table renders in place of the notice —
 * no code change needed.
 */
export function HoursCard() {
  return (
    <div className="border border-ivory/12 bg-ink-raised p-8">
      <h2 className="label-xs flex items-center gap-2.5 text-gold">
        <Clock aria-hidden="true" className="h-4 w-4" />
        Opening Hours
      </h2>

      {hasOpeningHours ? (
        <dl className="mt-6 flex flex-col gap-3.5 text-sm">
          {restaurant.openingHours.map((slot) => (
            <div
              key={slot.days}
              className="flex items-baseline justify-between gap-4 border-b border-ivory/8 pb-3.5 last:border-0 last:pb-0"
            >
              <dt className="text-sand">{slot.days}</dt>
              <dd className="shrink-0 text-ivory tabular-nums">{slot.hours}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <>
          <p className="mt-6 text-sm leading-relaxed text-sand-deep">
            Our hours are not published online yet. Give us a ring and we will
            tell you exactly when the kitchen is open today.
          </p>
          <a
            href={telHref}
            className="mt-6 inline-flex min-h-11 items-center gap-2.5 border border-gold/60 px-5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-gold-bright transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            <Phone aria-hidden="true" className="h-3.5 w-3.5" />
            {formatPhone(restaurant.phone)}
          </a>
        </>
      )}
    </div>
  );
}
