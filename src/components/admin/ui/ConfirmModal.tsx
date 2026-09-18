"use client";

import { useEffect, type ReactNode } from "react";
import { AdminButton } from "./AdminButton";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "default";
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children?: ReactNode;
};

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  loading,
  onConfirm,
  onClose,
  children,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-[1px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="relative w-full max-w-md border border-charcoal/10 bg-white p-6 sm:p-8"
      >
        <p className="text-[10px] tracking-[0.2em] text-stone uppercase">
          Confirm
        </p>
        <h2
          id="confirm-title"
          className="mt-2 font-serif text-2xl font-light text-charcoal"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm font-light leading-relaxed text-charcoal/60">
            {description}
          </p>
        ) : null}
        {children}
        <div className="mt-8 flex justify-end gap-2">
          <AdminButton variant="outline" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </AdminButton>
          <AdminButton
            variant={tone === "danger" ? "danger" : "primary"}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
