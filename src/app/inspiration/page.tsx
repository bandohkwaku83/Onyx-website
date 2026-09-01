import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero, PageCTA } from "@/components/ui/PageSections";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Inspiration",
  description:
    "Explore bathroom inspirations, living room ideas, lighting concepts, and modern home designs from Onyx Build & Partners.",
};

const galleries = [
  {
    title: "Bathroom Inspirations",
    count: "24 Projects",
    image: IMAGES.bathroomInspiration,
  },
  {
    title: "Living Room Ideas",
    count: "18 Projects",
    image: IMAGES.livingRoom,
  },
  {
    title: "Lighting Concepts",
    count: "32 Projects",
    image: IMAGES.lightingConcept,
  },
  {
    title: "Modern Homes",
    count: "15 Projects",
    image: IMAGES.modernHome,
  },
  {
    title: "Hotel & Hospitality",
    count: "12 Projects",
    image: IMAGES.hospitality,
  },
  {
    title: "Commercial Spaces",
    count: "9 Projects",
    image: IMAGES.office,
  },
];

const featuredProjects = [
  {
    title: "Lagos Penthouse",
    category: "Residential",
    image: IMAGES.penthouse,
  },
  {
    title: "Boutique Hotel Suite",
    category: "Hospitality",
    image: IMAGES.hotelBathroom,
  },
  {
    title: "Executive Office",
    category: "Commercial",
    image: IMAGES.office,
  },
  {
    title: "Modern Villa",
    category: "Residential",
    image: IMAGES.villa,
  },
];

export default function InspirationPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Inspiration"
        subtitle="Spaces begin with details. Explore completed projects and design concepts that showcase what's possible."
        image={IMAGES.showroom}
      />

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Browse By Category"
            title="Find Your Vision"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleries.map((gallery, i) => (
              <RevealOnScroll key={gallery.title} delay={i * 0.08}>
                <div className="group relative aspect-[16/10] sm:aspect-[4/5] overflow-hidden cursor-pointer">
                  <Image
                    src={gallery.image}
                    alt={gallery.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                    <p className="text-xs tracking-[0.15em] uppercase text-gold mb-2">
                      {gallery.count}
                    </p>
                    <h3 className="font-serif text-2xl text-ivory font-light group-hover:text-gold transition-colors duration-300">
                      {gallery.title}
                    </h3>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Featured"
            title="Completed Projects"
            subtitle="Residential apartments, hotels, offices, and luxury bathrooms — crafted with Onyx."
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {featuredProjects.map((project, i) => (
              <RevealOnScroll key={project.title} delay={i * 0.1}>
                <div className="group">
                  <div className="relative aspect-[16/10] overflow-hidden mb-5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase text-gold mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-serif text-2xl font-light text-ivory group-hover:text-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </>
  );
}
