"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { formatAdminDateTime } from "@/lib/admin/data";
import type { OrderStatus } from "@/lib/admin/types";
import { formatPrice } from "@/lib/products";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SelectInput, TextInput } from "@/components/admin/ui/FormFields";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/components/admin/ui/StatusBadge";
import { EmptyState } from "@/components/admin/ui/EmptyState";

export default function OrdersPage() {
  const { orders } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | OrderStatus>("all");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.items.some((i) => i.name.toLowerCase().includes(q));
      const matchesStatus = status === "all" || o.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders / Checkouts"
        description="Monitor checkout activity from the main website and update fulfilment status."
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <TextInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ID, customer, product…"
          className="sm:max-w-sm"
        />
        <SelectInput
          value={status}
          onChange={(e) => setStatus(e.target.value as "all" | OrderStatus)}
          className="sm:max-w-[180px]"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </SelectInput>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No checkouts found"
          description="Orders placed on the website will appear here."
        />
      ) : (
        <div className="overflow-hidden border border-charcoal/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-ivory/70 text-xs tracking-wide text-stone uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium">Order ID</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium">Qty</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/6">
                {filtered.map((order) => {
                  const qty = order.items.reduce(
                    (sum, i) => sum + i.quantity,
                    0,
                  );
                  return (
                    <tr key={order.id} className="hover:bg-ivory/40">
                      <td className="px-5 py-3.5 font-medium text-charcoal">
                        {order.id}
                      </td>
                      <td className="px-5 py-3.5">{order.customerName}</td>
                      <td className="px-5 py-3.5">
                        <p>{order.customerPhone}</p>
                        <p className="text-xs text-stone">
                          {order.customerEmail}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-charcoal/80">
                        {order.items[0]?.name}
                        {order.items.length > 1
                          ? ` +${order.items.length - 1}`
                          : ""}
                      </td>
                      <td className="px-5 py-3.5">{qty}</td>
                      <td className="px-5 py-3.5 font-medium">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-5 py-3.5 text-stone">
                        {formatAdminDateTime(order.date)}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1.5">
                          <OrderStatusBadge status={order.status} />
                          <PaymentStatusBadge status={order.paymentStatus} />
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/admin-portal/orders/${order.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          View details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
