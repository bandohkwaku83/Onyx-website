import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type PageHeroProps = {
  title: string;
  subtitle: string;
  image: string;
  eyebrow?: string;
};

export function PageHero({ title, subtitle, image, eyebrow }: PageHeroProps) {
  return (
    <section className="relative min-h-[50svh] sm:min-h-[55vh] md:min-h-[70vh] flex items-end overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/20" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 pt-24">
        {eyebrow && (
          <p className="text-ivory/80 text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light text-ivory leading-tight max-w-3xl">
          {title}
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-ivory/70 font-light max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

type RoomSection = {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
};

export function RoomSection({ title, description, image, reverse }: RoomSection) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
      <RevealOnScroll direction={reverse ? "right" : "left"}>
        <div
          className={`relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden ${
            reverse ? "lg:order-2" : ""
          }`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </RevealOnScroll>

      <RevealOnScroll direction={reverse ? "left" : "right"}>
        <div className={`px-1 sm:px-0 ${reverse ? "lg:order-1" : ""}`}>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-ivory mb-3 sm:mb-4">
            {title}
          </h3>
          <p className="text-ivory/60 font-light leading-relaxed text-base sm:text-lg">
            {description}
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
}

type CategoryGridProps = {
  items: { title: string; description: string; image: string }[];
};

export function CategoryGrid({ items }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
      {items.map((item, i) => (
        <RevealOnScroll
          key={item.title}
          delay={i * 0.1}
          className={i === items.length - 1 && items.length % 2 !== 0 ? "sm:col-span-2 sm:max-w-xl sm:mx-auto sm:w-full" : ""}
        >
          <div className="group h-full">
            <div className="relative aspect-[16/10] overflow-hidden mb-4 sm:mb-5">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-light text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base text-charcoal/60 font-light leading-relaxed">
              {item.description}
            </p>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}

export function PageCTA() {
  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-primary text-center">
      <RevealOnScroll>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-ivory mb-4 sm:mb-6 px-2">
          Ready to Transform Your Space?
        </h2>
        <p className="text-sm sm:text-base text-ivory/60 font-light mb-6 sm:mb-8 max-w-lg mx-auto px-2">
          Speak with our design consultants to find the perfect solutions for
          your project.
        </p>
        <div className="flex justify-center max-w-xs sm:max-w-none mx-auto">
        <Button href="/shop" variant="gold" fullWidth>
          Shop All Products
        </Button>
        </div>
      </RevealOnScroll>
    </section>
  );
}
