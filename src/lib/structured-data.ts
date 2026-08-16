import { images } from "@/data/images";
import { hasOpeningHours, restaurant, siteUrl } from "@/data/restaurant";

/**
 * Restaurant JSON-LD.
 *
 * Only fields that are confirmed business information are emitted. Ratings,
 * reviews, price range, cuisine and opening hours are deliberately absent —
 * publishing unverified values in structured data is a Google policy breach,
 * not just a copy problem. `openingHoursSpecification` appears automatically
 * once real hours are added to `restaurant.ts`.
 */
export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: restaurant.name,
    url: siteUrl,
    telephone: restaurant.phone,
    image: `${siteUrl}${images.og}`,
    hasMap: restaurant.mapsUrl,
    address: {
      "@type": "PostalAddress",
      ...(restaurant.addressLine ? { streetAddress: restaurant.addressLine } : {}),
      addressLocality: restaurant.city,
      addressCountry: restaurant.countryCode,
    },
    ...(restaurant.email ? { email: restaurant.email } : {}),
    ...(hasOpeningHours
      ? {
          openingHoursSpecification: restaurant.openingHours.map((slot) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: slot.days,
            description: slot.hours,
          })),
        }
      : {}),
    ...(restaurant.socials.length > 0
      ? { sameAs: restaurant.socials.map((social) => social.href) }
      : {}),
  };
}

/** Breadcrumb trail for inner pages. */
export function breadcrumbJsonLd(page: { name: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.name,
        item: `${siteUrl}${page.path}`,
      },
    ],
  };
}
