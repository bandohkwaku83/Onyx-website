"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
};

export function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (!product.inStock) {
    return (
      <button
        type="button"
        disabled
        className={`w-full py-3.5 text-xs sm:text-sm tracking-[0.15em] uppercase bg-charcoal/20 text-charcoal/40 cursor-not-allowed ${className}`}
      >
        Out of Stock
      </button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        type="button"
        onClick={handleClick}
        className={`flex-1 py-3.5 text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
          added
            ? "bg-gold text-charcoal"
            : "bg-charcoal text-ivory hover:bg-gold hover:text-charcoal"
        } ${className}`}
      >
        {added ? "Added to Cart ✓" : "Add to Cart"}
      </button>
      {added && (
        <Link
          href="/cart"
          className="flex-1 py-3.5 text-center text-xs sm:text-sm tracking-[0.15em] uppercase border border-charcoal/20 text-charcoal hover:border-gold hover:text-gold transition-colors duration-300"
        >
          View Cart
        </Link>
      )}
    </div>
  );
}

export function BuyNowButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  function handleBuyNow() {
    addItem(product);
    window.location.href = "/checkout";
  }

  if (!product.inStock) return null;

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      className="w-full py-3.5 text-xs sm:text-sm tracking-[0.15em] uppercase border border-charcoal/30 text-charcoal hover:border-gold hover:text-gold transition-colors duration-300"
    >
      Order Now — {formatPrice(product.price)}
    </button>
  );
}
