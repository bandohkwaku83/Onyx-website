import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  PageHero,
  RoomSection,
  CategoryGrid,
  PageCTA,
} from "@/components/ui/PageSections";
import { IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lighting",
  description:
    "Illuminate your world with premium pendant lighting, ceiling fixtures, outdoor lighting, and smart home solutions.",
};

const categories = [
  {
    title: "Pendant Lighting",
    description:
      "Create a warm atmosphere for your dining experience. Designer pendants that become the focal point of any room.",
    image: IMAGES.pendant,
  },
  {
    title: "Ceiling Lighting",
    description:
      "Seamless integration with architectural spaces. Recessed, surface-mounted, and statement ceiling fixtures.",
    image: IMAGES.ceilingLighting,
  },
  {
    title: "Outdoor Lighting",
    description:
      "Extend your design language beyond walls. Garden, facade, and pathway lighting for exterior elegance.",
    image: IMAGES.outdoor,
  },
  {
    title: "Smart Lighting",
    description:
      "Control ambiance with precision. Automated scenes, dimming, and colour temperature for every moment.",
    image: IMAGES.smartLighting,
  },
  {
    title: "Decorative Lighting",
    description:
      "Sculptural pieces that double as art. Wall sconces, table lamps, and accent lighting with character.",
    image: IMAGES.decorativeLighting,
  },
];

export default function LightingPage() {
  return (
    <>
      <PageHero
        eyebrow="Illuminate"
        title="Lighting"
        subtitle="Illuminate spaces. Create emotions. Premium lighting solutions designed to transform how you experience every room."
        image={IMAGES.pendant}
      />

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Collections"
            title="Designed For Atmosphere"
            subtitle="Room-based solutions, not product grids. Every fixture chosen to enhance the way you live."
          />
          <CategoryGrid items={categories} />
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 md:space-y-32">
          <RoomSection
            title="Dining & Entertainment"
            description="Set the mood for memorable gatherings. Layered lighting that transitions from intimate dinners to vibrant celebrations."
            image={IMAGES.dining}
          />
          <RoomSection
            title="Bedrooms & Retreats"
            description="Soft, adjustable illumination for rest and relaxation. Wake gently, unwind peacefully."
            image={IMAGES.bedroom}
            reverse
          />
        </div>
      </section>

      <PageCTA />
    </>
  );
}
