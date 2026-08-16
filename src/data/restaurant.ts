/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH — restaurant details
 * ============================================================================
 * Every phone link, map link, address and social link on the site reads from
 * this file. Update it here and the whole site updates.
 *
 * VERIFIED fields are confirmed business information.
 * UNVERIFIED fields are `null` on purpose: the UI hides or gracefully degrades
 * anything that is null, so nothing false is ever shown. Fill one in and the
 * matching section appears automatically.
 * ============================================================================
 */

export type OpeningHours = {
  /** e.g. "Monday – Thursday" */
  days: string;
  /** e.g. "12:00 – 23:30" */
  hours: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const restaurant = {
  /* --- VERIFIED ---------------------------------------------------------- */
  name: "Rashidiya Palace Restaurant",
  /** Stored in E.164 for `tel:` links. Use formatPhone() for display. */
  phone: "+971568123717",
  mapsUrl: "https://maps.app.goo.gl/Deuaj4JK3RqSmk668",
  city: "Dubai",
  country: "United Arab Emirates",
  countryCode: "AE",
  /** Short display form used in headers, footers and schema. */
  location: "Dubai, United Arab Emirates",

  /* --- TO BE CONFIRMED BY THE RESTAURANT ---------------------------------
     Leave as null until confirmed. Each one is handled gracefully by the UI.
     ---------------------------------------------------------------------- */

  /** Full street address, e.g. "Shop 4, Al Rashidiya, Dubai". */
  addressLine: null as string | null,

  /** Contact email. When null, the site directs enquiries to the phone. */
  email: null as string | null,

  /**
   * Opening hours. When empty, the site shows an honest "call to confirm"
   * card instead of inventing times.
   * Example: [{ days: "Daily", hours: "12:00 – 01:00" }]
   */
  openingHours: [] as OpeningHours[],

  /**
   * Social profiles. Only add links that genuinely exist — the footer and
   * contact page render nothing when this array is empty.
   * Example: [{ label: "Instagram", href: "https://instagram.com/..." }]
   */
  socials: [] as SocialLink[],
} as const;

/**
 * Public site URL, used for canonical tags, sitemap and Open Graph.
 * Set NEXT_PUBLIC_SITE_URL in your hosting environment before going live.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://rashidiyapalace.ae";

/** Ready-to-use `tel:` href. */
export const telHref = `tel:${restaurant.phone}`;

export const hasOpeningHours = restaurant.openingHours.length > 0;
export const hasSocials = restaurant.socials.length > 0;
