import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { navLinks } from "@/data/nav";
import { menuCategories } from "@/data/menu";
import {
  hasSocials,
  restaurant,
  telHref,
} from "@/data/restaurant";
import { formatPhone } from "@/lib/utils";
import { Container } from "@/components/ui/Section";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ivory/10 bg-ink">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Wordmark />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-sand-deep">
              An Arabic kitchen in Dubai built around open charcoal, fresh bread
              and plates meant to be passed across the table.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="label-xs text-gold">Explore</h2>
            {/* Links carry their own vertical padding so each one is a
                comfortable tap target on a phone; the list gap shrinks to
                match, keeping the visual rhythm unchanged. */}
            <ul className="mt-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-2 text-sm text-sand transition-colors duration-200 hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="label-xs text-gold">The Menu</h2>
            <ul className="mt-3 flex flex-col gap-0.5">
              {menuCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/menu#${category.id}`}
                    className="inline-block py-2 text-sm text-sand transition-colors duration-200 hover:text-ivory"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic lg:col-span-3">
            <h2 className="label-xs text-gold">Visit</h2>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li>
                <a
                  href={telHref}
                  className="inline-flex min-h-11 items-center gap-2.5 text-ivory transition-colors duration-200 hover:text-gold-bright"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
                  {formatPhone(restaurant.phone)}
                </a>
              </li>
              <li>
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 text-sand transition-colors duration-200 hover:text-ivory"
                >
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  />
                  <span>
                    {restaurant.addressLine ? (
                      <>
                        {restaurant.addressLine}
                        <br />
                      </>
                    ) : null}
                    {restaurant.location}
                    <span className="mt-1 block text-xs text-sand-deep">
                      View on Google Maps
                    </span>
                  </span>
                </a>
              </li>
              {restaurant.email ? (
                <li>
                  <a
                    href={`mailto:${restaurant.email}`}
                    className="text-sand transition-colors duration-200 hover:text-ivory"
                  >
                    {restaurant.email}
                  </a>
                </li>
              ) : null}
            </ul>

            {/* Rendered only when real profiles are added to restaurant.ts. */}
            {hasSocials ? (
              <ul className="mt-6 flex flex-wrap gap-4">
                {restaurant.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-xs text-sand transition-colors duration-200 hover:text-gold-bright"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </address>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-xs text-sand-deep sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {restaurant.name}. All rights reserved.
          </p>
          <p>{restaurant.location}</p>
        </div>
      </Container>
    </footer>
  );
}
