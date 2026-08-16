# Rashidiya Palace Restaurant

Website for Rashidiya Palace Restaurant, Dubai. Next.js 16 (App Router) ·
TypeScript (strict) · Tailwind CSS v4 · Lucide icons.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

---

## What is confirmed, and what is not

This is the most important section for anyone updating the site.

**Confirmed and used throughout:** restaurant name, phone `+971 56 812 3717`,
the Google Maps link, and the city (Dubai, UAE).

**Not confirmed — deliberately left editable and never invented:**

| Item | Current behaviour | Where to fill it in |
| --- | --- | --- |
| Street address | Only "Dubai, United Arab Emirates" is shown | `restaurant.addressLine` |
| Opening hours | Contact page shows a "call to confirm" card instead of times | `restaurant.openingHours` |
| Email | Hidden; enquiries point at the phone | `restaurant.email` |
| Social profiles | No icons or links rendered at all | `restaurant.socials` |
| Menu dishes & prices | Shown with a visible notice that they await confirmation | `src/data/menu.ts` |
| Photography | Licensed stock stand-ins, with a notice on the gallery page | `public/images/` |

Every one of these is `null` or empty in `src/data/restaurant.ts`, and the UI
degrades gracefully around each. Fill one in and its section appears
automatically — no component changes needed.

There are **no** invented awards, ratings, reviews, years in business, chef
names, opening hours or social accounts anywhere in the site or in its
structured data.

---

## Updating content

All content lives in `src/data/` — no copy is hardcoded in components.

- **`restaurant.ts`** — name, phone, maps link, address, hours, email, socials.
  Single source of truth; every `tel:` and map link on the site reads from it.
- **`menu.ts`** — menu categories and dishes. The category rail, section
  anchors, footer menu links and homepage showcase are all generated from this
  file. Set `MENU_IS_SAMPLE = false` once the real menu is entered to remove the
  placeholder notice.
- **`gallery.ts`** — gallery photographs, alt text and categories. Filters only
  appear for categories that actually have photographs. Set
  `GALLERY_IS_SAMPLE = false` once the restaurant's own photography is in.
- **`images.ts`** — every image path on the site.
- **`nav.ts`** — navigation links.

### Swapping in the restaurant's own photography

Drop the new files into `public/images/` using the **existing filenames** and
they appear everywhere automatically. Recommended sizes are documented at the
top of `src/data/images.ts`.

The current photographs are free-licence Unsplash images used as stand-ins.
Unsplash+ *premium* images were deliberately avoided, as those are not licensed
for this use.

---

## Connecting the enquiry form

The contact form validates on the client **and** on the server, then forwards
the enquiry to whatever service you choose. Nothing is faked: with no service
configured it reports plainly that enquiries are not connected and points the
visitor at the phone number.

To switch it on, set `ENQUIRY_WEBHOOK_URL` (see `.env.example`) to an endpoint
that delivers the payload — a mail service (Resend, Postmark), an automation
hook (Zapier, Make), or a WhatsApp Business webhook. It receives:

```json
{ "name": "…", "phone": "…", "guests": "…", "when": "…", "message": "…", "receivedAt": "…" }
```

The variable is server-only and never reaches the browser. Set
`NEXT_PUBLIC_SITE_URL` to the live domain before launch so canonical URLs, the
sitemap and Open Graph images resolve correctly.

---

## Design system

Defined once in `src/app/globals.css` under `@theme`.

**Palette** — warm ink `#12100E`, ivory `#F4EFE6`, sand `#D9CBB3`, muted gold
`#B08D4F`, clay `#4A3728`. Gold is an accent only: hairlines, small labels and a
single filled button per view. Ivory on ink is 16.4:1; gold on ink is 6.3:1.

**Type** — Marcellus (Roman inscriptional) for display, Karla for body and UI,
both self-hosted through `next/font`. Marcellus has one weight on purpose:
hierarchy comes from size and letter-spacing, not weight.

**The arch** — the site's one signature form, used structurally rather than
decoratively: the hero portal, image masks, section markers, the active item in
the mobile drawer, and the image-failure placeholder. It is enforced by a house
rule in `globals.css`: `border-radius: 0` on everything, with arches as the only
opt-in curve. That is what keeps the site clear of generic rounded cards.

---

## Accessibility & performance notes

- Semantic landmarks, one `h1` per page, no skipped heading levels.
- Skip link, visible gold focus ring on every interactive element.
- Mobile drawer and gallery lightbox both move focus in, trap Tab, close on
  Escape, and return focus to the control that opened them. When closed, the
  drawer is `inert`, so it is removed from the tab order and the accessibility
  tree together.
- All motion is CSS and fully disabled under `prefers-reduced-motion`.
  `ScrollReveal` only hides content once JavaScript has confirmed it is running,
  and shows content outright in a hidden document — content can never be left
  permanently invisible.
- Server Components by default; client JS is limited to the header, drawer,
  category rail, gallery and form.
- All images go through `next/image`; below-the-fold images are lazy-loaded and
  the hero is prioritised.
- Verified: no horizontal overflow at 320, 375, 430, 768, 1024, 1280, 1440 or
  1920px on any page.

---

## Structure

```
src/
  app/            routes, sitemap, robots, error + not-found, /api/enquiry
  components/
    layout/       Navbar, MobileMenu, Footer, MobileActionBar, PageHeader, Wordmark
    home/         Hero, Welcome, FeaturedDishes, Experience, GalleryPreview,
                  LocationSection, FinalCTA
    menu/         MenuCategoryRail, MenuCategorySection, FoodCard, MenuEmptyState
    gallery/      GalleryGrid, Lightbox
    contact/      ContactForm, LocationCard, HoursCard
    ui/           CTAButton, SectionHeading, ArchImage, ImageWithFallback,
                  ScrollReveal, Section/Container, JsonLd
  data/           restaurant, menu, gallery, images, nav
  lib/            utils, enquiry validation, structured data
```
