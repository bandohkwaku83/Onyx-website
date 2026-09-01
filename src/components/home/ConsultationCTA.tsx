import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/constants";

export function ConsultationCTA() {
  return (
    <section className="relative py-20 sm:py-32 md:py-40 overflow-hidden">
      <Image
        src={IMAGES.showroom}
        alt="Onyx showroom interior"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-charcoal/60" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold mb-4 sm:mb-6">
            Transform Your Space
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-light text-ivory leading-tight">
            Planning Your Dream Space?
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-ivory/70 font-light leading-relaxed">
            Book an interior consultation, product consultation, or showroom
            visit with our design experts.
          </p>
          <div className="mt-8 sm:mt-10 flex justify-center max-w-xs sm:max-w-none mx-auto">
            <Button href="/shop" variant="gold" fullWidth>
              Shop Now
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export function ShowroomFlow() {
  const steps = [
    { title: "Enter Our World", href: "/" },
    { title: "Lighting Gallery", href: "/lighting" },
    { title: "Bathroom Collection", href: "/sanitary-ware" },
    { title: "Smart Home Solutions", href: "/home-solutions" },
    { title: "Book A Consultation", href: "/consultation" },
  ];

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-ivory">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-stone mb-8 sm:mb-12 text-center">
            The Showroom Experience
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {steps.map((step, i) => (
              <Link
                key={step.title}
                href={step.href}
                className={`group flex items-center justify-between p-5 sm:p-6 border border-charcoal/10 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 ${
                  i === steps.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-stone mb-1">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-charcoal group-hover:text-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>
                <span className="text-gold text-lg shrink-0 ml-4">&rarr;</span>
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
