"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const fieldClass =
  "w-full border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition placeholder:text-stone/70 focus:border-primary focus:ring-1 focus:ring-primary/20";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5" htmlFor={htmlFor}>
      <span className="text-[11px] tracking-[0.14em] text-charcoal/70 uppercase">
        {label}
      </span>
      {children}
      {hint && !error ? (
        <span className="block text-xs font-light text-stone">{hint}</span>
      ) : null}
      {error ? (
        <span className="block text-xs text-red-700">{error}</span>
      ) : null}
    </label>
  );
}

export function TextInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${fieldClass} ${className}`} {...props} />;
}

export function TextArea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`${fieldClass} min-h-[110px] resize-y ${className}`}
      {...props}
    />
  );
}

export function SelectInput({
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${fieldClass} ${className}`} {...props}>
      {children}
    </select>
  );
}
