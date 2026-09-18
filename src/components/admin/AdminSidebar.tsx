"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { BRAND, LOGO } from "@/lib/constants";
import {
  IconContent,
  IconCustomers,
  IconDashboard,
  IconLogout,
  IconOrders,
  IconProducts,
  IconSettings,
} from "./icons";

const NAV = [
  { href: "/admin-portal/dashboard", label: "Dashboard", icon: IconDashboard },
  { href: "/admin-portal/products", label: "Products", icon: IconProducts },
  { href: "/admin-portal/orders", label: "Orders", icon: IconOrders },
  { href: "/admin-portal/customers", label: "Customers", icon: IconCustomers },
  { href: "/admin-portal/content", label: "Website", icon: IconContent },
  { href: "/admin-portal/settings", label: "Settings", icon: IconSettings },
] as const;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AdminSidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    router.replace("/admin-portal");
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-charcoal/50 transition lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-primary text-ivory transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 flex-col justify-center gap-1 border-b border-white/10 px-6">
          <Image
            src={LOGO}
            alt={BRAND.name}
            width={140}
            height={40}
            className="h-8 w-auto invert"
          />
          <p className="text-[10px] tracking-[0.22em] text-ivory/50 uppercase">
            Admin Portal
          </p>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-5">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 text-[11px] tracking-[0.14em] uppercase transition ${
                  active
                    ? "bg-ivory/10 text-ivory"
                    : "text-ivory/55 hover:bg-white/5 hover:text-ivory"
                }`}
              >
                <Icon className="h-[16px] w-[16px] shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/10 p-3">
          <Link
            href="/"
            target="_blank"
            onClick={onClose}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-[11px] tracking-[0.14em] text-ivory/55 uppercase transition hover:bg-white/5 hover:text-ivory"
          >
            View website
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-[11px] tracking-[0.14em] text-ivory/55 uppercase transition hover:bg-white/5 hover:text-ivory"
          >
            <IconLogout className="h-[16px] w-[16px]" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
