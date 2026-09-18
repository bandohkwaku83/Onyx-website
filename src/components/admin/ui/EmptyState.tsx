import type { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center border border-dashed border-charcoal/20 bg-white px-6 py-16 text-center ${className}`}
    >
      {icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center bg-ivory text-stone">
          {icon}
        </div>
      ) : null}
      <h3 className="font-serif text-xl font-light text-charcoal">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-charcoal/55">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
