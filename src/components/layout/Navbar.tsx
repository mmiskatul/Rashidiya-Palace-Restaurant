"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { navLinks } from "@/data/nav";
import { telHref } from "@/data/restaurant";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";

/**
 * Fixed site header.
 *
 * Over the homepage hero it starts transparent and settles into a blurred ink
 * bar once the page scrolls; on every other route it is solid from the outset,
 * because those pages have no hero image to sit on.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !overHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-[var(--ease-arch)]",
          solid
            ? "border-b border-ivory/10 bg-ink/85 backdrop-blur-md supports-[backdrop-filter]:bg-ink/70"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[80rem] items-center justify-between gap-6 px-6 transition-all duration-500 sm:px-8 lg:px-12",
            solid ? "py-3.5" : "py-5",
          )}
        >
          <Wordmark compact={solid} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group/nav relative block py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                        active ? "text-gold-bright" : "text-sand hover:text-ivory",
                      )}
                    >
                      {link.label}
                      {/* Underline draws in from the left on hover, and stays
                          drawn for the current page. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute bottom-0 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ease-[var(--ease-arch)]",
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover/nav:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telHref}
              className="hidden min-h-11 items-center gap-2.5 border border-gold/60 px-5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-gold-bright transition-colors duration-300 hover:bg-gold hover:text-ink sm:inline-flex"
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5" />
              Call Now
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center text-ivory transition-colors duration-200 hover:text-gold-bright lg:hidden"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
              <span className="sr-only">Open navigation</span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
