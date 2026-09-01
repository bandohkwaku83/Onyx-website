"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";

function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 sm:gap-6 py-6 border-b border-charcoal/10">
      <Link
        href={`/product/${item.product.slug}`}
        className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden bg-charcoal/5"
      >
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          href={`/product/${item.product.slug}`}
          className="font-serif text-lg sm:text-xl font-light text-charcoal hover:text-gold transition-colors"
        >
          {item.product.name}
        </Link>
        <p className="text-gold mt-1">{formatPrice(item.product.price)}</p>

        <div className="flex items-center justify-between mt-3 gap-4">
          <div className="flex items-center border border-charcoal/15">
            <button
              type="button"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="px-3 py-1.5 text-charcoal hover:bg-charcoal/5 transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-3 py-1.5 text-sm min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="px-3 py-1.5 text-charcoal hover:bg-charcoal/5 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.product.id)}
            className="text-xs tracking-wider uppercase text-stone hover:text-charcoal transition-colors"
          >
            Remove
          </button>
        </div>
      </div>

      <p className="hidden sm:block font-medium text-charcoal shrink-0">
        {formatPrice(item.product.price * item.quantity)}
      </p>
    </div>
  );
}

export function CartContent() {
  const { items, subtotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-16 sm:py-24">
        <p className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-4">
          Your cart is empty
        </p>
        <p className="text-charcoal/60 mb-8">
          Browse our collections and add products to get started.
        </p>
        <Link
          href="/shop"
          className="inline-flex px-8 py-3.5 text-sm tracking-[0.15em] uppercase bg-charcoal text-ivory hover:bg-gold hover:text-charcoal transition-all duration-300"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      <div className="lg:col-span-2">
        <p className="text-xs tracking-[0.2em] uppercase text-stone mb-4">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
        {items.map((item) => (
          <CartLineItem key={item.product.id} item={item} />
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="border border-charcoal/10 p-6 sm:p-8 sticky top-28">
          <h2 className="font-serif text-xl sm:text-2xl font-light text-charcoal mb-6">
            Order Summary
          </h2>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-charcoal/60">Subtotal</span>
            <span className="text-charcoal">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm mb-6">
            <span className="text-charcoal/60">Delivery</span>
            <span className="text-charcoal/60">Calculated at checkout</span>
          </div>
          <div className="flex justify-between border-t border-charcoal/10 pt-4 mb-6">
            <span className="font-medium text-charcoal">Total</span>
            <span className="font-medium text-gold text-lg">
              {formatPrice(subtotal)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="block w-full py-3.5 text-center text-sm tracking-[0.15em] uppercase bg-charcoal text-ivory hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="block w-full mt-3 py-3.5 text-center text-sm tracking-[0.15em] uppercase border border-charcoal/20 text-charcoal hover:border-gold hover:text-gold transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
