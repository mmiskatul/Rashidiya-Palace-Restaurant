"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { MapPin, Phone, X } from "lucide-react";
import { navLinks } from "@/data/nav";
import { restaurant, telHref } from "@/data/restaurant";
import { formatPhone, cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

/**
 * Full-screen navigation drawer.
 *
 * Handles the three things a modal owes a keyboard user: focus moves in on
 * open, Tab is trapped inside while it is open, and focus returns to the
 * trigger on close. Escape and background scroll-lock are handled here too.
 */
export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      /* The drawer stays mounted so it can slide in and out. `inert` (not
         aria-hidden) is what makes the closed state correct: it removes the
         subtree from the tab order *and* the accessibility tree together, so
         keyboard users can never tab into a panel they cannot see. */
      inert={!open}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 h-full w-full bg-ink/80 backdrop-blur-sm transition-opacity duration-[400ms]",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto border-l border-gold/20 bg-ink-raised",
          "transition-transform duration-[400ms] ease-[var(--ease-arch)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-ivory/10 px-6 py-5">
          <span className="label-xs text-gold">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center text-sand transition-colors duration-200 hover:text-ivory"
          >
            <X aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">Close navigation</span>
          </button>
        </div>

        <nav className="flex flex-col px-6 py-4">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-4 border-b border-ivory/8 py-4 font-display text-2xl transition-colors duration-200",
                  active ? "text-gold-bright" : "text-ivory hover:text-gold-bright",
                )}
              >
                {/* Active page is marked with a small arch, not a bullet. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-3 w-2.5 shrink-0 border transition-colors duration-200 arch",
                    active ? "border-gold-bright bg-gold/20" : "border-transparent",
                  )}
                />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-3 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] pt-6">
          <a
            href={telHref}
            className="flex min-h-13 items-center justify-center gap-2.5 bg-gold px-6 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-gold-bright"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            {formatPhone(restaurant.phone)}
          </a>
          <a
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-13 items-center justify-center gap-2.5 border border-ivory/30 px-6 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-ink"
          >
            <MapPin aria-hidden="true" className="h-4 w-4" />
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}
