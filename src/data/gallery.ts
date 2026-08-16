import { images } from "./images";

/**
 * ============================================================================
 * GALLERY
 * ============================================================================
 * Add a photograph by dropping the file into `public/images/` and adding an
 * entry below. Filters are derived from the entries themselves, so a category
 * only appears once at least one photograph uses it.
 *
 * `orientation` drives the editorial layout: "tall" images occupy two rows in
 * the masonry grid, "wide" images span two columns on large screens.
 * ============================================================================
 */

export const GALLERY_IS_SAMPLE = true;

export const galleryCategories = ["Food", "The Room", "Details"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryImage = {
  src: string;
  /** Meaningful alt text describing the photograph, not the file. */
  alt: string;
  category: GalleryCategory;
  orientation: "tall" | "wide" | "square";
};

export const galleryImages: GalleryImage[] = [
  {
    src: images.gallery.grillClose,
    alt: "Skewers of marinated meat cooking over glowing charcoal",
    category: "Food",
    orientation: "tall",
  },
  {
    src: images.gallery.diningRoom,
    alt: "Warmly lit dining room with set tables and low pendant lighting",
    category: "The Room",
    orientation: "wide",
  },
  {
    src: images.gallery.tableSpread,
    alt: "A table laid with an assortment of Middle Eastern dishes and drinks",
    category: "Food",
    orientation: "square",
  },
  {
    src: images.gallery.breadOven,
    alt: "Flatbreads baking against the flames of a wood-fired oven",
    category: "Food",
    orientation: "wide",
  },
  {
    src: images.gallery.teaPour,
    alt: "Tea being poured at the table",
    category: "Details",
    orientation: "tall",
  },
  {
    src: images.gallery.spices,
    alt: "Ground spices in a row of small bowls",
    category: "Details",
    orientation: "square",
  },
  {
    src: images.gallery.lanterns,
    alt: "Coloured mosaic lanterns hanging in a market",
    category: "Details",
    orientation: "tall",
  },
  {
    src: images.gallery.plating,
    alt: "A chef arranging plates in the kitchen",
    category: "Food",
    orientation: "square",
  },
  {
    src: images.gallery.guests,
    alt: "Guests seated around a long table mid-meal",
    category: "The Room",
    orientation: "wide",
  },
  {
    src: images.gallery.counter,
    alt: "The service counter with stacked plates and warm lighting",
    category: "The Room",
    orientation: "square",
  },
  {
    src: images.gallery.dessert,
    alt: "A piece of pistachio baklava served with tea",
    category: "Food",
    orientation: "square",
  },
  {
    src: images.gallery.coffee,
    alt: "Dates in a woven basket beside an Arabic coffee pot",
    category: "Details",
    orientation: "tall",
  },
];

/** Only offer filters that actually have photographs behind them. */
export const activeGalleryCategories = galleryCategories.filter((category) =>
  galleryImages.some((image) => image.category === category),
);

/** First six, chosen to mix food and room, for the homepage preview. */
export const galleryPreview = [
  galleryImages[0],
  galleryImages[1],
  galleryImages[4],
  galleryImages[3],
  galleryImages[6],
].filter(Boolean);
