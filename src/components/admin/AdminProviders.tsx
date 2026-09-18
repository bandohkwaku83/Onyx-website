"use client";

import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { AdminDataProvider } from "@/context/AdminDataContext";
import type { ReactNode } from "react";

export function AdminProviders({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>{children}</AdminDataProvider>
    </AdminAuthProvider>
  );
}
