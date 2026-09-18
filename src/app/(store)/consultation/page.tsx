"use client";

import Image from "next/image";
import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useWebsiteContent } from "@/context/WebsiteContentContext";

const consultationTypes = [
  {
    id: "interior",
    title: "Interior Consultation",
    description:
      "Work with our design team to plan your entire space — from layout to finishes.",
  },
  {
    id: "product",
    title: "Product Consultation",
    description:
      "Get expert guidance on selecting the right lighting, sanitary ware, and home solutions.",
  },
  {
    id: "showroom",
    title: "Showroom Visit",
    description:
      "Experience our collections in person. Walk through curated room settings and product displays.",
  },
];

export default function ConsultationPage() {
  const { content } = useWebsiteContent();
  const hero = content.contactHero;
  const [selected, setSelected] = useState("interior");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="relative min-h-[40svh] sm:min-h-[50vh] flex items-end overflow-hidden">
        <Image
          src={hero.image}
          alt="Book a consultation"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized={hero.image.startsWith("blob:")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12 md:pb-16 pt-24">
          <p className="text-ivory/80 text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
            {hero.eyebrow}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-light text-ivory leading-tight">
            {hero.heading}
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ivory/70 font-light max-w-xl">
            {hero.description}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <RevealOnScroll>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-6 sm:mb-8">
                  How Can We Help?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                  {consultationTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelected(type.id)}
                      className={`w-full text-left p-4 sm:p-6 border transition-all duration-300 ${
                        selected === type.id
                          ? "border-gold bg-gold/5"
                          : "border-charcoal/10 hover:border-charcoal/30"
                      }`}
                    >
                      <h3 className="font-serif text-xl font-light text-charcoal mb-2">
                        {type.title}
                      </h3>
                      <p className="text-sm text-charcoal/60 font-light leading-relaxed">
                        {type.description}
                      </p>
                    </button>
                  ))}
                </div>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-3">
              <RevealOnScroll delay={0.2}>
                {submitted ? (
                  <div className="border border-gold/30 p-6 sm:p-12 text-center">
                    <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
                      Thank You
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-4">
                      We&apos;ll Be In Touch
                    </h3>
                    <p className="text-charcoal/60 font-light">
                      Our team will contact you within 24 hours to confirm your
                      consultation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-xs tracking-[0.15em] uppercase text-stone mb-2"
                        >
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-transparent border border-charcoal/15 focus:border-gold focus:outline-none transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-xs tracking-[0.15em] uppercase text-stone mb-2"
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-transparent border border-charcoal/15 focus:border-gold focus:outline-none transition-colors duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs tracking-[0.15em] uppercase text-stone mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-transparent border border-charcoal/15 focus:border-gold focus:outline-none transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs tracking-[0.15em] uppercase text-stone mb-2"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full px-4 py-3 bg-transparent border border-charcoal/15 focus:border-gold focus:outline-none transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs tracking-[0.15em] uppercase text-stone mb-2"
                      >
                        Tell Us About Your Project
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-3 bg-transparent border border-charcoal/15 focus:border-gold focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Room type, style preferences, timeline..."
                      />
                    </div>

                    <input type="hidden" name="consultationType" value={selected} />

                    <button
                      type="submit"
                      className="w-full md:w-auto px-10 py-3.5 bg-charcoal text-ivory text-sm tracking-[0.15em] uppercase hover:bg-primary hover:text-ivory transition-all duration-300"
                    >
                      Submit Request
                    </button>
                  </form>
                )}
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
