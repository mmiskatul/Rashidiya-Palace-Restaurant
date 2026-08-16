import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { MenuCategoryRail } from "@/components/menu/MenuCategoryRail";
import { MenuCategorySection } from "@/components/menu/MenuCategorySection";
import { MenuEmptyState } from "@/components/menu/MenuEmptyState";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/ui/JsonLd";
import { Container } from "@/components/ui/Section";
import { menuCategories, MENU_IS_SAMPLE } from "@/data/menu";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Mezze, charcoal grills, slow-cooked rice, fresh bread and Arabic sweets. Browse the full menu at Rashidiya Palace Restaurant in Dubai.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu · Rashidiya Palace Restaurant",
    description:
      "Mezze, charcoal grills, slow-cooked rice and Arabic sweets in Dubai.",
    url: "/menu",
  },
};

export default function MenuPage() {
  const categories = menuCategories.filter(
    (category) => category.items.length > 0,
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd({ name: "Menu", path: "/menu" })} />

      <PageHeader
        eyebrow="The Menu"
        title="Mezze to charcoal, in the order it arrives"
        intro="The menu follows the shape of the meal — cold plates first, then the grill, then rice, bread and sweets. Order across the table and share."
      />

      {categories.length === 0 ? (
        <MenuEmptyState />
      ) : (
        <>
          <MenuCategoryRail
            categories={categories.map(({ id, name }) => ({ id, name }))}
          />

          {categories.map((category, index) => (
            <MenuCategorySection
              key={category.id}
              category={category}
              index={index}
            />
          ))}

          {MENU_IS_SAMPLE ? (
            <Container className="pb-20 pt-14">
              <p className="mx-auto max-w-2xl border-l-2 border-gold/40 pl-5 text-xs leading-relaxed text-sand-deep">
                This menu shows the structure and style of dishes served by an
                Arabic grill kitchen and is awaiting confirmation from the
                restaurant. Dishes, descriptions and prices are subject to
                change — please call to confirm today&rsquo;s menu and
                availability.
              </p>
            </Container>
          ) : null}
        </>
      )}

      <FinalCTA />
    </>
  );
}
