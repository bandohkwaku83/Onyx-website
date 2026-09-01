import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero, PageCTA } from "@/components/ui/PageSections";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lighting",
  description:
    "Shop premium pendant lighting, ceiling fixtures, outdoor lighting, and smart home solutions online.",
};

export default function LightingPage() {
  const products = getProductsByCategory("lighting");

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Lighting"
        subtitle="Illuminate your world. Browse our collection of designer lighting — order online for delivery across Accra."
        image={IMAGES.pendant}
      />

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow={`${products.length} Products`}
            title="Lighting Collection"
            subtitle="Pendant lights, ceiling panels, outdoor fixtures, and smart lighting solutions."
          />
          <ProductGrid products={products} />
        </div>
      </section>

      <PageCTA />
    </>
  );
}
