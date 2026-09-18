"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartIcon } from "@/components/shop/CartIcon";
import { LOGO, NAV_LINKS } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/10 backdrop-blur-xl ${
        scrolled || menuOpen ? "bg-primary/80 shadow-lg" : "bg-primary/55"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
          <Link href="/" className="group shrink-0">
            <Image
              src={LOGO}
              alt="Onyx Build & Partners"
              width={651}
              height={558}
              priority
              className="h-8 sm:h-10 md:h-12 w-auto brightness-0 invert"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-[0.12em] uppercase transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-ivory/85 hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <CartIcon />
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-6 h-px bg-ivory transition-transform duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-ivory transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-ivory transition-transform duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 sm:px-6 pb-6 pt-2 flex flex-col gap-1 border-t border-white/10 bg-primary/95 backdrop-blur-xl max-h-[calc(100dvh-4rem)] overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-[0.12em] uppercase py-3 border-b border-white/5 ${
                isActive(link.href) ? "text-white" : "text-ivory/85"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="mt-4 text-center text-sm tracking-[0.15em] uppercase py-3.5 bg-ivory text-primary"
          >
            View Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
