"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { formatAdminDateTime } from "@/lib/admin/data";
import type { OrderStatus } from "@/lib/admin/types";
import { formatPrice } from "@/lib/products";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ConfirmModal } from "@/components/admin/ui/ConfirmModal";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/components/admin/ui/StatusBadge";

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { orders, updateOrderStatus, pushToast } = useAdminData();
  const order = orders.find((o) => o.id === params.id);
  const [acting, setActing] = useState<OrderStatus | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);

  if (!order) {
    return (
      <div className="border border-charcoal/10 bg-white p-8 text-center">
        <p className="text-charcoal">Order not found.</p>
        <Link
          href="/admin-portal/orders"
          className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  const applyStatus = async (status: OrderStatus) => {
    setActing(status);
    try {
      await updateOrderStatus(order.id, status);
      setConfirmCancel(false);
      pushToast(`Order marked as ${status}.`);
    } catch (err) {
      pushToast(
        err instanceof Error ? err.message : "Failed to update order",
        "error",
      );
    } finally {
      setActing(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title={order.id}
        description={`Checkout placed ${formatAdminDateTime(order.date)}`}
        actions={
          <AdminButton
            variant="outline"
            onClick={() => router.push("/admin-portal/orders")}
          >
            Back to orders
          </AdminButton>
        }
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <section className="border border-charcoal/10 bg-white p-5 sm:p-6">
            <h2 className="font-serif text-lg font-light text-charcoal">
              Products purchased
            </h2>
            <ul className="mt-4 divide-y divide-charcoal/6">
              {order.items.map((item) => (
                <li
                  key={`${item.productId}-${item.name}`}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-ivory">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-charcoal">{item.name}</p>
                    <p className="mt-1 text-sm text-stone">
                      Qty {item.quantity} · {formatPrice(item.unitPrice)} each
                    </p>
                  </div>
                  <p className="font-medium text-charcoal">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t border-charcoal/10 pt-4 text-sm">
              <div className="flex justify-between text-stone">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-base font-medium text-charcoal">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <section className="border border-charcoal/10 bg-white p-5 sm:p-6">
            <h2 className="font-serif text-lg font-light text-charcoal">
              Customer information
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-stone">Name</dt>
                <dd className="mt-0.5 font-medium text-charcoal">
                  {order.customerName}
                </dd>
              </div>
              <div>
                <dt className="text-stone">Email</dt>
                <dd className="mt-0.5 text-charcoal">{order.customerEmail}</dd>
              </div>
              <div>
                <dt className="text-stone">Phone</dt>
                <dd className="mt-0.5 text-charcoal">{order.customerPhone}</dd>
              </div>
            </dl>
          </section>

          <section className="border border-charcoal/10 bg-white p-5 sm:p-6">
            <h2 className="font-serif text-lg font-light text-charcoal">
              Status
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <OrderStatusBadge status={order.status} />
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>
            {order.notes ? (
              <p className="mt-4 text-sm leading-relaxed text-stone">
                {order.notes}
              </p>
            ) : null}

            <div className="mt-5 grid gap-2">
              <AdminButton
                variant="outline"
                loading={acting === "processing"}
                disabled={
                  order.status === "processing" ||
                  order.status === "completed" ||
                  order.status === "cancelled"
                }
                onClick={() => void applyStatus("processing")}
              >
                Mark as Processing
              </AdminButton>
              <AdminButton
                loading={acting === "completed"}
                disabled={
                  order.status === "completed" || order.status === "cancelled"
                }
                onClick={() => void applyStatus("completed")}
              >
                Mark as Completed
              </AdminButton>
              <AdminButton
                variant="danger"
                disabled={order.status === "cancelled"}
                onClick={() => setConfirmCancel(true)}
              >
                Cancel Order
              </AdminButton>
            </div>
          </section>
        </div>
      </div>

      <ConfirmModal
        open={confirmCancel}
        title="Cancel this order?"
        description="Are you sure you want to cancel this order? This action is for demonstration and can be wired to real fulfilment later."
        confirmLabel="Cancel Order"
        tone="danger"
        loading={acting === "cancelled"}
        onConfirm={() => void applyStatus("cancelled")}
        onClose={() => setConfirmCancel(false)}
      />
    </div>
  );
}
