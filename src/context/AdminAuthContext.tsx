"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "@/lib/api-client";

const AUTH_KEY = "onyx-admin-auth";
const REMEMBER_KEY = "onyx-admin-remember";

export type AdminSession = {
  email: string;
  name: string;
  role: string;
};

type AdminAuthContextValue = {
  session: AdminSession | null;
  ready: boolean;
  login: (
    email: string,
    password: string,
    remember: boolean,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function readSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw =
      localStorage.getItem(AUTH_KEY) ?? sessionStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

function persistSession(session: AdminSession, remember: boolean) {
  const payload = JSON.stringify(session);
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
  if (remember) {
    localStorage.setItem(AUTH_KEY, payload);
    localStorage.setItem(REMEMBER_KEY, "1");
  } else {
    sessionStorage.setItem(AUTH_KEY, payload);
    localStorage.removeItem(REMEMBER_KEY);
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  const login = useCallback(
    async (email: string, password: string, remember: boolean) => {
      try {
        const next = await api.post<AdminSession>("/api/auth/login", {
          email,
          password,
        });
        persistSession(next, remember);
        setSession(next);
        return { ok: true as const };
      } catch (err) {
        return {
          ok: false as const,
          error:
            err instanceof Error
              ? err.message
              : "Incorrect email or password. Please try again.",
        };
      }
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ session, ready, login, logout }),
    [session, ready, login, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
}
