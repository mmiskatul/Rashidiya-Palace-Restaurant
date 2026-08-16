/**
 * ============================================================================
 * IMAGE REGISTRY
 * ============================================================================
 * Every photograph on the site is referenced through this file. To swap in the
 * restaurant's own photography, drop the new files into `public/images/…` using
 * these exact filenames — no code changes required anywhere else.
 *
 * Recommended source sizes (JPEG or WebP, sRGB):
 *   hero      2400 × 1600   landscape, dark enough for white text
 *   arch      1200 × 1600   portrait 3:4, subject centred (dome crops the top)
 *   dish      1200 × 1200   square, plated dish centred
 *   gallery   1600 × 1200   landscape or portrait, see `orientation` in gallery.ts
 *   og        1200 ×  630   social share card
 * ============================================================================
 */

export const images = {
  hero: "/images/hero.jpg",
  og: "/images/og.jpg",

  /** Portrait, arch-masked images used in editorial sections. */
  arch: {
    welcome: "/images/arch-welcome.jpg",
    craft: "/images/arch-craft.jpg",
    table: "/images/arch-table.jpg",
  },

  /**
   * Featured dishes on the homepage and cards on the menu page.
   *
   * A dish is only given a photograph when the photograph genuinely shows that
   * dish — a menu picture that does not match its label is worse than no
   * picture. Items without an entry here render as a clean text row.
   */
  dish: {
    mezze: "/images/dish-mezze.jpg",
    mixedGrill: "/images/dish-mixed-grill.jpg",
    mandi: "/images/dish-mandi.jpg",
    skewers: "/images/dish-skewers.jpg",
    manakishCheese: "/images/dish-manakish-cheese.jpg",
    baklava: "/images/dish-baklava.jpg",
  },

  /** Gallery library. */
  gallery: {
    grillClose: "/images/gallery-grill-close.jpg",
    breadOven: "/images/gallery-bread-oven.jpg",
    diningRoom: "/images/gallery-dining-room.jpg",
    tableSpread: "/images/gallery-table-spread.jpg",
    teaPour: "/images/gallery-tea-pour.jpg",
    spices: "/images/gallery-spices.jpg",
    lanterns: "/images/gallery-lanterns.jpg",
    plating: "/images/gallery-plating.jpg",
    guests: "/images/gallery-guests.jpg",
    counter: "/images/gallery-counter.jpg",
    dessert: "/images/gallery-dessert.jpg",
    coffee: "/images/gallery-coffee.jpg",
  },
} as const;
