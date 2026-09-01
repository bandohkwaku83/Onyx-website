import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IMAGES } from "@/lib/constants";

const categories = [
  {
    title: "Lighting",
    subtitle: "Illuminate your world",
    description:
      "Create atmosphere. Shape emotion. Designer pendants, ceiling fixtures, and smart lighting for every room.",
    href: "/lighting",
    image: IMAGES.pendant,
  },
  {
    title: "Sanitary Ware",
    subtitle: "Transform your bathroom",
    description:
      "Luxury bathrooms designed for comfort and elegance. Faucets, showers, and complete bathroom sets.",
    href: "/sanitary-ware",
    image: IMAGES.bathroom,
  },
  {
    title: "Home Solutions",
    subtitle: "Complete your space",
    description:
      "Kitchen innovations, smart home systems, storage, and renovation services for modern living.",
    href: "/home-solutions",
    image: IMAGES.kitchen,
  },
];

export function Categories() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Designed For Beautiful Spaces"
          title="Where Every Detail Matters"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, i) => (
            <RevealOnScroll
              key={cat.title}
              delay={i * 0.15}
              className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <Link href={cat.href} className="group block h-full">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[3/4] overflow-hidden mb-4 sm:mb-6">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
                </div>
                <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gold mb-2">
                  {cat.subtitle}
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-2 sm:mb-3 group-hover:text-gold transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className="text-sm sm:text-base text-charcoal/60 font-light leading-relaxed">
                  {cat.description}
                </p>
                <span className="inline-block mt-3 sm:mt-4 text-[10px] sm:text-xs tracking-[0.15em] uppercase text-charcoal group-hover:text-gold transition-colors duration-300">
                  Discover &rarr;
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
