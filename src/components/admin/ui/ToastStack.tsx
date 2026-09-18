"use client";

import { useAdminData } from "@/context/AdminDataContext";

export function ToastStack() {
  const { toasts, dismissToast } = useAdminData();

  if (!toasts.length) return null;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[90] flex w-[min(100%-2rem,22rem)] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 border px-4 py-3 ${
            toast.tone === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : toast.tone === "info"
                ? "border-primary/20 bg-primary/5 text-primary"
                : "border-emerald-200 bg-emerald-50 text-emerald-900"
          }`}
        >
          <p className="flex-1 text-sm leading-snug">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="text-current/60 transition hover:text-current"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
