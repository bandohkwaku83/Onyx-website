import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero, PageCTA } from "@/components/ui/PageSections";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getStoreProducts } from "@/lib/db/products";
import { IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sanitary Ware",
  description:
    "Shop luxury sanitary ware, faucets, shower systems, and bathroom accessories online.",
};

export const dynamic = "force-dynamic";

export default async function SanitaryWarePage() {
  const products = await getStoreProducts("sanitary-ware");

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Sanitary Ware"
        subtitle="Transform your bathroom with premium sanitary solutions. Order online for delivery across Accra."
        image={IMAGES.bathroom}
      />

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow={`${products.length} Products`}
            title="Bathroom Collection"
            subtitle="Basins, showers, taps, toilets, and accessories for luxury bathrooms."
          />
          <ProductGrid products={products} />
        </div>
      </section>

      <PageCTA />
    </>
  );
}
