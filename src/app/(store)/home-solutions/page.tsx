import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero, PageCTA } from "@/components/ui/PageSections";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getStoreProducts } from "@/lib/db/products";
import { IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Home Solutions",
  description:
    "Shop kitchen solutions, smart home systems, storage, and home accessories online.",
};

export const dynamic = "force-dynamic";

export default async function HomeSolutionsPage() {
  const products = await getStoreProducts("home-solutions");

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Home Solutions"
        subtitle="Everything your home needs. Kitchen, smart home, storage, and more — order for delivery."
        image={IMAGES.kitchen}
      />

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow={`${products.length} Products`}
            title="Home Solutions"
            subtitle="Kitchen fittings, smart locks, storage systems, and home accessories."
          />
          <ProductGrid products={products} />
        </div>
      </section>

      <PageCTA />
    </>
  );
}
