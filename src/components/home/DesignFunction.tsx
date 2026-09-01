import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IMAGES } from "@/lib/constants";

export function DesignFunction() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Philosophy"
          title="Where Design Meets Function"
          subtitle="We curate premium solutions for modern homes — spaces that begin with the finest details."
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <RevealOnScroll direction="left">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] overflow-hidden">
              <Image
                src={IMAGES.livingRoom}
                alt="Modern living room interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-8 lg:gap-12">
            {[
              {
                label: "Lighting",
                text: "Illuminate spaces. Create emotions.",
              },
              {
                label: "Sanitary",
                text: "Designed for comfort. Built for elegance.",
              },
              {
                label: "Home Solutions",
                text: "Everything your home needs.",
              },
            ].map((item, i) => (
              <RevealOnScroll
                key={item.label}
                delay={i * 0.15}
                direction="right"
                className="sm:last:col-span-2 lg:last:col-span-1"
              >
                <div className="border-l border-gold/40 pl-5 sm:pl-8 h-full">
                  <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold mb-2 sm:mb-3">
                    {item.label}
                  </p>
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-ivory/90">
                    {item.text}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
