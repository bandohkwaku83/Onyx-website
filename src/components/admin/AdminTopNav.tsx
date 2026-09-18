"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useAdminData } from "@/context/AdminDataContext";
import { IconBell, IconMenu, IconSearch } from "./icons";

const TITLES: Record<string, string> = {
  "/admin-portal/dashboard": "Dashboard",
  "/admin-portal/showroom": "Shop",
  "/admin-portal/products": "Products",
  "/admin-portal/orders": "Orders",
  "/admin-portal/customers": "Customers",
  "/admin-portal/content": "Website",
  "/admin-portal/settings": "Settings",
};

function resolveTitle(pathname: string) {
  if (pathname.includes("/showroom/") && pathname.endsWith("/edit")) {
    return "Edit Shop Item";
  }
  if (pathname.endsWith("/showroom/new")) return "Add Shop Item";
  if (pathname.includes("/products/") && pathname.endsWith("/edit")) {
    return "Edit Product";
  }
  if (pathname.endsWith("/products/new")) return "Add Product";
  if (pathname.match(/\/orders\/ORD-/)) return "Order Details";
  for (const [path, title] of Object.entries(TITLES)) {
    if (pathname === path || pathname.startsWith(`${path}/`)) return title;
  }
  return "Admin";
}

type Props = {
  onMenuClick: () => void;
};

export function AdminTopNav({ onMenuClick }: Props) {
  const pathname = usePathname();
  const { session } = useAdminAuth();
  const { activity } = useAdminData();
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  const title = useMemo(() => resolveTitle(pathname), [pathname]);
  const initials =
    session?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "AD";

  return (
    <header className="sticky top-0 z-30 border-b border-charcoal/10 bg-ivory/90 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center text-charcoal transition hover:text-primary lg:hidden"
          aria-label="Open menu"
        >
          <IconMenu />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] tracking-[0.2em] text-stone uppercase">
            Onyx Admin
          </p>
          <h1 className="truncate font-serif text-xl font-light text-charcoal sm:text-2xl">
            {title}
          </h1>
        </div>

        <div className="hidden max-w-xs flex-1 md:block lg:max-w-sm">
          <label className="relative block">
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone">
              <IconSearch className="h-4 w-4" />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, orders…"
              className="h-10 w-full border border-charcoal/12 bg-white pr-3 pl-9 text-sm outline-none transition placeholder:text-stone/70 focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </label>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative inline-flex h-10 w-10 items-center justify-center text-charcoal transition hover:text-primary"
            aria-label="Notifications"
          >
            <IconBell />
            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-primary" />
          </button>
          {notifOpen ? (
            <>
              <button
                type="button"
                className="fixed inset-0 z-10"
                aria-label="Close notifications"
                onClick={() => setNotifOpen(false)}
              />
              <div className="absolute right-0 z-20 mt-2 w-80 overflow-hidden border border-charcoal/10 bg-white shadow-xl">
                <div className="border-b border-charcoal/8 px-4 py-3">
                  <p className="text-[10px] tracking-[0.18em] text-stone uppercase">
                    Notifications
                  </p>
                </div>
                <ul className="max-h-72 divide-y divide-charcoal/6 overflow-y-auto">
                  {activity.slice(0, 5).map((item) => (
                    <li key={item.id} className="px-4 py-3 text-sm">
                      <p className="text-charcoal">{item.message}</p>
                      <p className="mt-1 text-xs text-stone">
                        {new Date(item.time).toLocaleString("en-GB", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-2.5 border border-charcoal/10 bg-white py-1.5 pr-3 pl-1.5">
          <div className="flex h-8 w-8 items-center justify-center bg-primary text-[10px] font-semibold tracking-[0.12em] text-ivory">
            {initials}
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm text-charcoal">{session?.name}</p>
            <p className="truncate text-[10px] tracking-[0.12em] text-stone uppercase">
              {session?.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
