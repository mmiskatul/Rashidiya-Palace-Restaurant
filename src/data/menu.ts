import { images } from "./images";

/**
 * ============================================================================
 * MENU
 * ============================================================================
 * The menu page is generated entirely from `menuCategories`. Add, remove or
 * reorder categories and dishes here — the category rail, the section anchors
 * and the empty state all follow automatically. No menu content lives in JSX.
 *
 * The dishes below are a SAMPLE STRUCTURE, not confirmed offerings. While
 * `MENU_IS_SAMPLE` is true the menu page shows a short notice saying so. Once
 * the restaurant's real menu is entered, set it to false to remove the notice.
 * ============================================================================
 */

export const MENU_IS_SAMPLE = true;

export type MenuItem = {
  name: string;
  description: string;
  /** Display string including currency, e.g. "AED 32". Null hides the price. */
  price: string | null;
  /** Optional path from `images.dish`. Items without an image still look right. */
  image?: string;
  /** Flags a house favourite — renders a small gold marker. */
  signature?: boolean;
};

export type MenuCategory = {
  /** URL-safe anchor id, used by the category rail. */
  id: string;
  name: string;
  /** Arabic name, shown as a secondary label. Optional. */
  nameArabic?: string;
  /** One line setting up the category. */
  blurb: string;
  items: MenuItem[];
};

/** Ordered the way a meal is actually served — mezze through to coffee. */
export const menuCategories: MenuCategory[] = [
  {
    id: "mezze",
    name: "Mezze",
    nameArabic: "مقبلات",
    blurb: "Small cold plates to open the table, served with warm bread.",
    items: [
      {
        name: "Hummus",
        description:
          "Chickpeas blended with tahini and lemon, finished with olive oil.",
        price: "AED 22",
        image: images.dish.mezze,
        signature: true,
      },
      {
        name: "Moutabal",
        description:
          "Charred aubergine whipped with tahini, garlic and a squeeze of lemon.",
        price: "AED 24",
      },
      {
        name: "Tabbouleh",
        description:
          "Chopped parsley, tomato and burghul, dressed sharp with lemon.",
        price: "AED 24",
      },
      {
        name: "Fattoush",
        description: "Garden salad with crisp bread, radish and sumac dressing.",
        price: "AED 26",
      },
      {
        name: "Warak Enab",
        description: "Vine leaves rolled around rice, herbs and lemon.",
        price: "AED 26",
      },
      {
        name: "Muhammara",
        description:
          "Roasted red pepper and walnut, warm with chilli and pomegranate.",
        price: "AED 25",
      },
    ],
  },
  {
    id: "charcoal",
    name: "From the Charcoal",
    nameArabic: "مشاوي",
    blurb: "Cooked over open coals and brought to the table still smoking.",
    items: [
      {
        name: "Shish Taouk",
        description:
          "Chicken marinated in garlic and yoghurt, grilled on the skewer.",
        price: "AED 48",
        image: images.dish.skewers,
        signature: true,
      },
      {
        name: "Lamb Kofta",
        description: "Minced lamb with parsley and onion, char-grilled.",
        price: "AED 52",
      },
      {
        name: "Mixed Grill",
        description:
          "Taouk, kofta and lamb cubes on one platter — built for sharing.",
        price: "AED 145",
        image: images.dish.mixedGrill,
        signature: true,
      },
      {
        name: "Lamb Chops",
        description: "Seasoned simply and grilled to keep them pink inside.",
        price: "AED 95",
      },
      {
        name: "Shish Kebab",
        description: "Cubed lamb skewered with pepper and onion.",
        price: "AED 58",
      },
    ],
  },
  {
    id: "rice",
    name: "Rice & Slow-Cooked",
    nameArabic: "أطباق الأرز",
    blurb: "The long-cooked plates — rice, spice and patience.",
    items: [
      {
        name: "Lamb Mandi",
        description:
          "Lamb cooked low and slow over smoked rice, served with sauce.",
        price: "AED 78",
        image: images.dish.mandi,
        signature: true,
      },
      {
        name: "Chicken Machboos",
        description: "Gulf-spiced rice with chicken, dried lime and onion.",
        price: "AED 55",
      },
      {
        name: "Lamb Kabsa",
        description: "Tomato-spiced rice with tender lamb and toasted nuts.",
        price: "AED 72",
      },
      {
        name: "Chicken Biryani",
        description: "Layered rice with saffron, yoghurt and fried onion.",
        price: "AED 52",
      },
    ],
  },
  {
    id: "bread",
    name: "Bread & Sides",
    nameArabic: "الخبز والإضافات",
    blurb: "Baked to order. The bread does not wait, so neither should you.",
    items: [
      {
        name: "Manakish Zaatar",
        description: "Flatbread baked with thyme, sesame and olive oil.",
        price: "AED 18",
      },
      {
        name: "Manakish Cheese",
        description: "Akkawi cheese melted into fresh dough.",
        price: "AED 22",
        image: images.dish.manakishCheese,
        signature: true,
      },
      {
        name: "Arabic Bread Basket",
        description: "Straight from the oven, refilled on request.",
        price: "AED 8",
      },
      {
        name: "Garlic Sauce",
        description: "Whipped toum, sharp and cold.",
        price: "AED 6",
      },
      {
        name: "French Fries",
        description: "Salted and served hot.",
        price: "AED 18",
      },
    ],
  },
  {
    id: "sweets",
    name: "Sweets",
    nameArabic: "حلويات",
    blurb: "Ordered at the end, and usually shared off one plate.",
    items: [
      {
        name: "Kunafa",
        description: "Warm cheese under crisp pastry, soaked in sugar syrup.",
        price: "AED 32",
        signature: true,
      },
      {
        name: "Umm Ali",
        description: "Baked pastry pudding with milk, nuts and raisins.",
        price: "AED 28",
      },
      {
        name: "Baklava Selection",
        description: "Layered filo with pistachio and walnut.",
        price: "AED 26",
        image: images.dish.baklava,
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    nameArabic: "مشروبات",
    blurb: "Tea and coffee, poured for as long as you want to stay.",
    items: [
      {
        name: "Karak Chai",
        description: "Strong tea with cardamom and evaporated milk.",
        price: "AED 8",
      },
      {
        name: "Arabic Coffee",
        description: "Lightly roasted with cardamom, served with dates.",
        price: "AED 15",
      },
      {
        name: "Fresh Mint Lemonade",
        description: "Blended cold with plenty of mint.",
        price: "AED 20",
      },
      {
        name: "Fresh Juice",
        description: "Orange, mango or watermelon, pressed to order.",
        price: "AED 22",
      },
    ],
  },
];

/**
 * Homepage showcase. Reads from the same source as the menu so a dish is never
 * described two different ways in two different places. Only dishes that have
 * a photograph are featured, since this grid is image-led.
 */
const findItem = (categoryId: string, itemName: string): MenuItem | undefined =>
  menuCategories
    .find((category) => category.id === categoryId)
    ?.items.find((item) => item.name === itemName);

export const featuredDishes = [
  findItem("charcoal", "Mixed Grill"),
  findItem("rice", "Lamb Mandi"),
  findItem("mezze", "Hummus"),
  findItem("charcoal", "Shish Taouk"),
  findItem("bread", "Manakish Cheese"),
  findItem("sweets", "Baklava Selection"),
].filter((item): item is MenuItem => Boolean(item));
