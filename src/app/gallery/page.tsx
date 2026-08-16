import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCTA } from "@/components/home/FinalCTA";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { JsonLd } from "@/components/ui/JsonLd";
import { Container, Section } from "@/components/ui/Section";
import { GALLERY_IS_SAMPLE } from "@/data/gallery";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs of the food, the dining room and the details at Rashidiya Palace Restaurant in Dubai.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery · Rashidiya Palace Restaurant",
    description:
      "The food, the room and the details at Rashidiya Palace Restaurant, Dubai.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd({ name: "Gallery", path: "/gallery" })} />

      <PageHeader
        eyebrow="Gallery"
        title="The food, the room, the details"
        intro="Charcoal, bread, warm light and full tables. Select a photograph to view it larger."
      />

      <Section>
        <Container>
          <GalleryGrid />

          {GALLERY_IS_SAMPLE ? (
            <p className="mt-14 max-w-2xl border-l-2 border-gold/40 pl-5 text-xs leading-relaxed text-sand-deep">
              These photographs illustrate the style and atmosphere of the
              restaurant while we wait on the venue&rsquo;s own photography.
              Replace the files in <code className="text-sand">public/images/</code>{" "}
              to publish the real thing.
            </p>
          ) : null}
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
