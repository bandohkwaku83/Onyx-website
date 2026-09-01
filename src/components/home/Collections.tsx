import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IMAGES } from "@/lib/constants";

const collections = [
  {
    title: "Lighting",
    image: IMAGES.pendant,
    href: "/lighting",
  },
  {
    title: "Bathroom",
    image: IMAGES.bathroom,
    href: "/sanitary-ware",
  },
  {
    title: "Smart Home",
    image: IMAGES.smartHome,
    href: "/home-solutions",
  },
];

export function Collections() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Curated For You" title="Our Collections" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {collections.map((col, i) => (
            <RevealOnScroll
              key={col.title}
              delay={i * 0.1}
              className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <Link
                href={col.href}
                className="group relative block aspect-[16/10] sm:aspect-[4/3] lg:aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light group-hover:text-gold transition-colors duration-300">
                    {col.title}
                  </h3>
                  <span className="inline-block mt-1 sm:mt-2 text-[10px] sm:text-xs tracking-[0.15em] uppercase text-ivory/60 group-hover:text-gold transition-colors duration-300">
                    View Collection &rarr;
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
