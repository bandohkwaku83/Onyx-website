import type { Metadata } from "next";
import { CartContent } from "@/components/shop/CartContent";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your order and proceed to checkout.",
};

export default function CartPage() {
  return (
    <section className="pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mb-8 sm:mb-12">
          Your Cart
        </h1>
        <CartContent />
      </div>
    </section>
  );
}
