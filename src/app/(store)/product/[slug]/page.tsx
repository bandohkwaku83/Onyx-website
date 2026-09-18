import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORY_LABELS,
  CATEGORY_PATHS,
  formatPrice,
} from "@/lib/products";
import { AddToCartButton, BuyNowButton } from "@/components/shop/AddToCartButton";
import {
  getStoreProductBySlug,
} from "@/lib/db/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStoreProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getStoreProductBySlug(slug);
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="relative aspect-square overflow-hidden bg-charcoal/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
                {CATEGORY_LABELS[product.category]}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-gold mb-6">{formatPrice(product.price)}</p>
              <p className="text-charcoal/70 font-light leading-relaxed mb-8">
                {product.description}
              </p>

              {product.features.length > 0 ? (
                <ul className="space-y-2 mb-8">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm text-charcoal/70 flex gap-2"
                    >
                      <span className="text-gold">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="flex flex-col gap-3">
                <AddToCartButton product={product} />
                <BuyNowButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
