import type { Metadata, Viewport } from "next";
import { Karla, Marcellus } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { restaurantJsonLd } from "@/lib/structured-data";
import { images } from "@/data/images";
import { restaurant, siteUrl } from "@/data/restaurant";

/* Display: Roman inscriptional, one weight — hierarchy comes from size and
   tracking rather than weight, which keeps the payload small too. */
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-marcellus",
});

/* Body/UI: warm grotesque, variable weight. */
const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${restaurant.name} — Arabic Grill & Mezze in Dubai`,
    template: `%s · ${restaurant.name}`,
  },
  description:
    "Arabic grill, mezze and slow-cooked rice in Dubai. Charcoal-fired plates and fresh bread, served for sharing. Call to book or get directions.",
  applicationName: restaurant.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: restaurant.name,
    locale: "en_AE",
    url: siteUrl,
    title: `${restaurant.name} — Arabic Grill & Mezze in Dubai`,
    description:
      "Charcoal-fired grills, mezze and fresh bread in Dubai. View the menu, call ahead, or get directions.",
    images: [
      {
        url: images.og,
        width: 1200,
        height: 630,
        alt: `A table of grilled dishes and mezze at ${restaurant.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${restaurant.name} — Arabic Grill & Mezze in Dubai`,
    description:
      "Charcoal-fired grills, mezze and fresh bread in Dubai. View the menu, call ahead, or get directions.",
    images: [images.og],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#12100E",
  // Zoom is never disabled — pinch-zoom is an accessibility requirement.
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${karla.variable}`}>
      <body className="min-h-screen antialiased">
        <JsonLd data={restaurantJsonLd()} />

        <a href="#main" className="sr-only-focusable z-[60] m-3 bg-gold px-5 py-3 text-sm font-medium text-ink">
          Skip to main content
        </a>

        {/* The bottom padding reserves room for the fixed mobile action bar,
            so it can never cover the end of the footer. */}
        <div className="flex min-h-screen flex-col pb-action-bar lg:pb-0">
          <Navbar />

          <main id="main" className="flex-1">
            {children}
          </main>

          <Footer />
        </div>

        <MobileActionBar />
      </body>
    </html>
  );
}
