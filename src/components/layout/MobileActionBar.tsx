import Link from "next/link";
import { MapPin, Phone, UtensilsCrossed } from "lucide-react";
import { restaurant, telHref } from "@/data/restaurant";

const actions = [
  { label: "Call", href: telHref, Icon: Phone, external: false },
  { label: "Menu", href: "/menu", Icon: UtensilsCrossed, external: false },
  {
    label: "Directions",
    href: restaurant.mapsUrl,
    Icon: MapPin,
    external: true,
  },
] as const;

/**
 * Persistent mobile action bar — the three things someone on a phone actually
 * came for. Sits above the device safe area; every page reserves space for it
 * with `pb-action-bar` so it never covers content.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gold/25 bg-ink/95 backdrop-blur-md pb-[env(safe-area-inset-bottom,0px)] lg:hidden">
      <ul className="grid grid-cols-3">
        {actions.map(({ label, href, Icon, external }, index) => {
          const className =
            "flex min-h-[3.5rem] w-full flex-col items-center justify-center gap-1.5 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-sand transition-colors duration-200 hover:text-gold-bright active:text-gold-bright";

          return (
            <li
              key={label}
              className={index > 0 ? "border-l border-ivory/10" : undefined}
            >
              {external ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  <Icon aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
                  {label}
                </a>
              ) : href.startsWith("tel:") ? (
                <a href={href} className={className}>
                  <Icon aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
                  {label}
                </a>
              ) : (
                <Link href={href} className={className}>
                  <Icon aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
