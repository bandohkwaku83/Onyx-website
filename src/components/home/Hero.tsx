"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useWebsiteContent } from "@/context/WebsiteContentContext";

export function Hero() {
  const { content } = useWebsiteContent();
  const hero = content.homeHero;

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      <Image
        src={hero.image}
        alt="Luxury modern living room with designer lighting"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        unoptimized={hero.image.startsWith("blob:")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/40" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-28 pt-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-ivory/80 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6 max-w-xs sm:max-w-none leading-relaxed"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-ivory leading-[1.08] max-w-4xl"
        >
          {hero.heading}
          <br />
          <span className="italic">{hero.headingAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-5 sm:mt-8 text-base sm:text-lg md:text-xl text-ivory/70 font-light max-w-xl leading-relaxed"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md sm:max-w-none"
        >
          <Button href="/shop" variant="light" fullWidth>
            {hero.primaryCta}
          </Button>
          <Button href="/consultation" variant="lightOutline" fullWidth>
            {hero.secondaryCta}
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <div className="w-px h-12 bg-ivory/30 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/2 bg-ivory"
          />
        </div>
      </motion.div>
    </section>
  );
}
