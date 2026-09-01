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
  title: "Home Solutions",
  description:
    "Complete your space with kitchen solutions, smart home systems, storage, accessories, and renovation services.",
};

const categories = [
  {
    title: "Kitchen Solutions",
    description:
      "Functional elegance for the heart of your home. Sinks, taps, and accessories that complement your culinary space.",
    image: IMAGES.kitchen,
  },
  {
    title: "Smart Home",
    description:
      "Integrated automation for lighting, climate, and security. Technology that adapts to your lifestyle seamlessly.",
    image: IMAGES.smartHome,
  },
  {
    title: "Storage & Organisation",
    description:
      "Thoughtful storage systems that maintain clean lines while maximising every square metre of your home.",
    image: IMAGES.storage,
  },
  {
    title: "Accessories",
    description:
      "The details that complete a room. Hardware, finishes, and accents selected to elevate your interior.",
    image: IMAGES.accessories,
  },
  {
    title: "Renovation Services",
    description:
      "End-to-end project support from concept to completion. Our team partners with you to realise your vision.",
    image: IMAGES.renovation,
  },
];

export default function HomeSolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Complete"
        title="Home Solutions"
        subtitle="Everything your home needs. From smart technology to renovation expertise — one partner for modern living."
        image={IMAGES.kitchen}
      />

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Services & Products"
            title="Beyond The Basics"
            subtitle="Holistic home solutions for architects, developers, interior designers, and luxury homeowners."
          />
          <CategoryGrid items={categories} />
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 md:space-y-32">
          <RoomSection
            title="Commercial & Office"
            description="Professional environments that reflect your brand values. Lighting and fixtures for offices, retail, and hospitality."
            image={IMAGES.office}
          />
          <RoomSection
            title="Residential Projects"
            description="Apartments, villas, and estates — we deliver cohesive solutions across every room and every detail."
            image={IMAGES.villa}
            reverse
          />
        </div>
      </section>

      <PageCTA />
    </>
  );
}
