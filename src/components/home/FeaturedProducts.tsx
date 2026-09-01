import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { PRODUCTS } from "@/lib/products";

const featured = PRODUCTS.slice(0, 8);

export function FeaturedProducts() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Shop Online"
          title="Featured Products"
          subtitle="Order premium lighting, sanitary ware, and home solutions for delivery across Accra."
        />
        <ProductGrid products={featured} />
        <RevealOnScroll className="text-center mt-10 sm:mt-14">
          <Link
            href="/shop"
            className="inline-flex px-8 py-3.5 text-xs sm:text-sm tracking-[0.15em] uppercase border border-charcoal/30 text-charcoal hover:border-gold hover:text-gold transition-colors duration-300"
          >
            View All Products
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
