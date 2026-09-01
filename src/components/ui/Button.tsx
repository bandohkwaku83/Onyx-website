import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "light" | "lightOutline" | "gold";
  className?: string;
  fullWidth?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 sm:px-8 py-3.5 text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase transition-all duration-300";

  const variants = {
    primary:
      "bg-charcoal text-ivory hover:bg-gold hover:text-charcoal",
    outline:
      "border border-charcoal/30 text-charcoal hover:border-gold hover:text-gold",
    ghost:
      "text-charcoal hover:text-gold underline-offset-4 hover:underline",
    light:
      "bg-ivory text-charcoal hover:bg-gold hover:text-charcoal",
    lightOutline:
      "border border-ivory/40 text-ivory hover:border-gold hover:text-gold",
    gold:
      "bg-gold text-charcoal hover:bg-ivory",
  };

  const widthClass = fullWidth ? "w-full" : "w-full sm:w-auto";

  return (
    <Link
      href={href}
      className={`${base} ${widthClass} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
