"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-ivory hover:bg-charcoal disabled:bg-primary/50",
  secondary: "bg-charcoal text-ivory hover:bg-primary disabled:bg-charcoal/40",
  outline:
    "border border-charcoal/30 text-charcoal hover:border-primary hover:text-primary disabled:opacity-50",
  ghost:
    "text-charcoal/70 hover:text-primary disabled:opacity-50",
  danger:
    "border border-red-700/30 text-red-700 hover:bg-red-50 disabled:opacity-50",
  light: "bg-ivory text-charcoal hover:bg-primary hover:text-ivory disabled:opacity-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[10px] tracking-[0.14em]",
  md: "px-5 py-2.5 text-[11px] tracking-[0.14em]",
  lg: "px-6 py-3.5 text-xs tracking-[0.15em]",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
};

export const AdminButton = forwardRef<HTMLButtonElement, Props>(
  function AdminButton(
    {
      className = "",
      variant = "primary",
      size = "md",
      loading,
      disabled,
      icon,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent" />
        ) : (
          icon
        )}
        {children}
      </button>
    );
  },
);
