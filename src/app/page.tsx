import { Hero } from "@/components/home/Hero";
import { Welcome } from "@/components/home/Welcome";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { Experience } from "@/components/home/Experience";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { LocationSection } from "@/components/home/LocationSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <FeaturedDishes />
      <Experience />
      <GalleryPreview />
      <LocationSection />
      <FinalCTA />
    </>
  );
}
