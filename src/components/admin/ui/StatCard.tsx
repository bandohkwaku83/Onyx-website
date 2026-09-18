import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  tone?: "default" | "accent";
};

export function StatCard({ label, value, hint, icon, tone = "default" }: Props) {
  return (
    <div className="border border-charcoal/10 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-stone uppercase">
            {label}
          </p>
          <p className="mt-3 font-serif text-3xl font-light tracking-tight text-charcoal sm:text-4xl">
            {value}
          </p>
          {hint ? (
            <p className="mt-2 text-xs font-light text-charcoal/50">{hint}</p>
          ) : null}
        </div>
        {icon ? (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center ${
              tone === "accent"
                ? "bg-primary text-ivory"
                : "bg-ivory text-primary"
            }`}
          >
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
}
