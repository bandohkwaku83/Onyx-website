import { RevealOnScroll } from "./RevealOnScroll";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <RevealOnScroll className={`max-w-3xl mb-10 sm:mb-14 md:mb-20 ${alignClass}`}>
      {eyebrow && (
        <p
          className={`text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 ${
            light ? "text-gold" : "text-stone"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight ${
          light ? "text-ivory" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-light leading-relaxed ${
            light ? "text-ivory/70" : "text-charcoal/60"
          }`}
        >
          {subtitle}
        </p>
      )}
    </RevealOnScroll>
  );
}
