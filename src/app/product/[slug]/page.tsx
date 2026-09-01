import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, getProductBySlug, CATEGORY_LABELS, CATEGORY_PATHS, formatPrice } from "@/lib/products";
import { AddToCartButton, BuyNowButton } from "@/components/shop/AddToCartButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs tracking-wider uppercase text-stone mb-8">
            <Link href="/shop" className="hover:text-gold transition-colors">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={CATEGORY_PATHS[product.category]}
              className="hover:text-gold transition-colors"
            >
              {CATEGORY_LABELS[product.category]}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="relative aspect-square overflow-hidden bg-charcoal/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-xs tracking-[0.2em] uppercase text-stone mb-2">
                {CATEGORY_LABELS[product.category]}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal leading-tight">
                {product.name}
              </h1>
              <p className="mt-4 text-2xl sm:text-3xl text-gold font-medium">
                {formatPrice(product.price)}
              </p>

              <p className="mt-6 text-charcoal/70 font-light leading-relaxed">
                {product.description}
              </p>

              <ul className="mt-6 space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-charcoal/60"
                  >
                    <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <AddToCartButton product={product} />
                <BuyNowButton product={product} />
              </div>

              <p className="mt-6 text-xs text-charcoal/50 leading-relaxed">
                Orders are confirmed by phone. Pay on delivery or via mobile
                money. Call{" "}
                <a href="tel:0599032559" className="text-gold hover:underline">
                  0599032559
                </a>{" "}
                for bulk orders.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
