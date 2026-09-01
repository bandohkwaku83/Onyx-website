import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { CATEGORY_LABELS, formatPrice } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      <div className="relative aspect-square overflow-hidden bg-charcoal/5 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {!product.inStock && (
          <span className="absolute top-3 left-3 bg-charcoal/80 text-ivory text-[10px] tracking-widest uppercase px-2 py-1">
            Out of Stock
          </span>
        )}
      </div>
      <p className="text-[10px] tracking-[0.15em] uppercase text-stone mb-1">
        {CATEGORY_LABELS[product.category]}
      </p>
      <h3 className="font-serif text-lg sm:text-xl font-light text-charcoal group-hover:text-gold transition-colors duration-300 mb-2">
        {product.name}
      </h3>
      <p className="text-gold font-medium tracking-wide">
        {formatPrice(product.price)}
      </p>
    </Link>
  );
}
