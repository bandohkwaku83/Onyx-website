import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <p className="font-serif text-xl sm:text-2xl text-ivory mb-3 sm:mb-4">Onyx</p>
            <p className="text-sm leading-relaxed text-ivory/50 max-w-sm">
              {BRAND.tagline}. Premium lighting, elegant sanitary solutions,
              and home innovations designed for spaces that inspire.
            </p>
          </div>

          <div>
            <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gold mb-4 sm:mb-6">
              Shop
            </p>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/shop" className="text-sm hover:text-gold transition-colors duration-300">
                  All Products
                </Link>
              </li>
              {NAV_LINKS.slice(1, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gold mb-4 sm:mb-6">
              Account
            </p>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/cart" className="text-sm hover:text-gold transition-colors duration-300">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-sm hover:text-gold transition-colors duration-300">
                  Checkout
                </Link>
              </li>
              {NAV_LINKS.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gold mb-4 sm:mb-6">
              Contact
            </p>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="hover:text-gold transition-colors duration-300"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li>{BRAND.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-ivory/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-[10px] sm:text-xs text-ivory/40">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] uppercase text-ivory/40">
            {BRAND.categories}
          </p>
        </div>
      </div>
    </footer>
  );
}
