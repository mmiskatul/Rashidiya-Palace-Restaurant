export type NavLink = {
  href: string;
  label: string;
};

/** Primary navigation — shared by the header, mobile drawer and footer. */
export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];
