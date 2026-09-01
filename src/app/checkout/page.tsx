"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { BRAND } from "@/lib/constants";
import { formatPrice } from "@/lib/products";

const fieldClass =
  "w-full px-4 py-3 bg-[#f5f5f5] border border-charcoal/10 focus:border-gold focus:outline-none";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <section className="bg-white pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-lg text-center border border-gold/30 p-8 sm:p-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
            Order Received
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-charcoal mb-4">
            Thank You!
          </h1>
          <p className="text-charcoal/60 font-light leading-relaxed mb-6">
            Your order has been placed. Our team will call you within 24 hours
            to confirm delivery details and payment.
          </p>
          <p className="text-sm text-charcoal/50 mb-8">
            Questions? Call{" "}
            <a href={`tel:${BRAND.phone}`} className="text-gold">
              {BRAND.phone}
            </a>
          </p>
          <Link
            href="/shop"
            className="inline-flex px-8 py-3.5 text-sm tracking-[0.15em] uppercase bg-charcoal text-ivory hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-white pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-charcoal mb-4">
            Your cart is empty
          </p>
          <Link
            href="/shop"
            className="inline-flex px-8 py-3.5 text-sm tracking-[0.15em] uppercase bg-charcoal text-ivory hover:bg-gold transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-charcoal mb-8 sm:mb-12">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="font-serif text-xl font-light text-charcoal mb-4">
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs tracking-wider uppercase text-stone mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs tracking-wider uppercase text-stone mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs tracking-wider uppercase text-stone mb-2">
                Email (optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-xs tracking-wider uppercase text-stone mb-2">
                Delivery Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                placeholder="Street, area, city..."
                className={`${fieldClass} resize-none`}
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-xs tracking-wider uppercase text-stone mb-2">
                Order Notes (optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={2}
                placeholder="Preferred delivery time, installation needs..."
                className={`${fieldClass} resize-none`}
              />
            </div>

            <div>
              <p className="text-xs tracking-wider uppercase text-stone mb-3">
                Payment Method
              </p>
              <div className="space-y-2">
                {["Pay on Delivery", "Mobile Money", "Bank Transfer"].map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-3 p-4 border border-charcoal/10 cursor-pointer hover:border-gold/50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      defaultChecked={method === "Pay on Delivery"}
                      className="accent-gold"
                    />
                    <span className="text-sm text-charcoal">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-sm tracking-[0.15em] uppercase bg-charcoal text-ivory hover:bg-gold hover:text-charcoal transition-all duration-300"
            >
              Place Order — {formatPrice(subtotal)}
            </button>
          </form>

          <div className="lg:col-span-2">
            <div className="border border-charcoal/10 bg-white p-6 sticky top-28">
              <h2 className="font-serif text-xl font-light text-charcoal mb-4">
                Your Order
              </h2>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-14 h-14 shrink-0 overflow-hidden bg-charcoal/5">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-charcoal truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-stone">
                        Qty {item.quantity} × {formatPrice(item.product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-t border-charcoal/10 pt-4 mt-4">
                <span className="font-medium">Total</span>
                <span className="font-medium text-gold">{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
