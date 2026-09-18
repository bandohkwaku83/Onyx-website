import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getStoreProducts } from "@/lib/db/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse and order premium lighting, sanitary ware, and home solutions from Onyx Build & Partners.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getStoreProducts();

  return (
    <section className="pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Our Store"
          title="Shop All Products"
          subtitle="Browse our full range of lighting, sanitary ware, and home solutions. Add to cart and order for delivery across Accra."
        />
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
