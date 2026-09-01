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
  title: "Sanitary Ware",
  description:
    "Transform your bathroom with luxury sanitary ware, faucets, shower systems, and elegant bathroom accessories.",
};

const categories = [
  {
    title: "Luxury Bathrooms",
    description:
      "Complete bathroom environments where every surface, fixture, and detail speaks to refined taste.",
    image: IMAGES.bathroom,
  },
  {
    title: "Bathroom Sets",
    description:
      "Coordinated collections that bring harmony to your space. Basins, toilets, and bidets in unified design languages.",
    image: IMAGES.bathroomSets,
  },
  {
    title: "Faucets",
    description:
      "The touchpoint of daily ritual. Precision-engineered mixers and taps in brushed gold, matte black, and chrome.",
    image: IMAGES.faucets,
  },
  {
    title: "Shower Systems",
    description:
      "Rainfall heads, body jets, and thermostatic controls for a spa-like experience in your own home.",
    image: IMAGES.shower,
  },
  {
    title: "Accessories",
    description:
      "Towel warmers, mirrors, storage, and finishing touches that complete the bathroom narrative.",
    image: IMAGES.bathroomAccessories,
  },
];

export default function SanitaryWarePage() {
  return (
    <>
      <PageHero
        eyebrow="Transform"
        title="Sanitary Ware"
        subtitle="Designed for comfort. Built for elegance. Luxury bathroom solutions that redefine your daily rituals."
        image={IMAGES.bathroom}
      />

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Collections"
            title="Bathrooms That Inspire"
            subtitle="From intimate ensuite retreats to statement powder rooms — curated for the discerning homeowner."
          />
          <CategoryGrid items={categories} />
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 md:space-y-32">
          <RoomSection
            title="Residential Retreats"
            description="Private sanctuaries designed for relaxation. Natural materials, soft lighting, and fixtures that feel like sculpture."
            image={IMAGES.bathroom}
          />
          <RoomSection
            title="Hospitality & Hotels"
            description="Bathrooms that leave lasting impressions on guests. Durable luxury for high-traffic environments."
            image={IMAGES.hotelBathroom}
            reverse
          />
        </div>
      </section>

      <PageCTA />
    </>
  );
}
