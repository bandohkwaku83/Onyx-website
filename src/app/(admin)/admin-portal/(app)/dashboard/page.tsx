"use client";

import Link from "next/link";
import { useAdminData } from "@/context/AdminDataContext";
import { formatAdminDate } from "@/lib/admin/data";
import { formatPrice } from "@/lib/products";
import { IconPlus } from "@/components/admin/icons";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/components/admin/ui/StatusBadge";
import { StatCard } from "@/components/admin/ui/StatCard";

export default function DashboardPage() {
  const { products, orders, customers, activity } = useAdminData();

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const recentOrders = orders.slice(0, 5);
  const liveInShop = products.filter(
    (p) => p.enabled && p.status === "published",
  ).length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Business at a glance"
        description="Catalogue health, checkouts, and recent website activity — aligned with the live Home, Shop, and Contact experience."
        actions={
          <Link href="/admin-portal/products/new">
            <AdminButton icon={<IconPlus className="h-4 w-4" />}>
              Add Shop Item
            </AdminButton>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total Products"
          value={products.length}
          hint={`${products.filter((p) => p.enabled).length} enabled`}
        />
        <StatCard
          label="Live in Shop"
          value={liveInShop}
          hint="Published & enabled on the website"
        />
        <StatCard
          label="Total Checkouts"
          value={orders.length}
          hint="All-time sample volume"
        />
        <StatCard
          label="Pending Orders"
          value={pendingOrders}
          hint="Needs attention"
          tone="accent"
        />
        <StatCard
          label="Total Customers"
          value={customers.length}
          hint="Registered shoppers"
        />
        <StatCard
          label="Recent Activity"
          value={activity.length}
          hint="Logged events"
        />
      </div>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="overflow-hidden border border-charcoal/10 bg-white xl:col-span-2">
          <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
            <h2 className="font-serif text-xl font-light text-charcoal">
              Recent Checkouts
            </h2>
            <Link
              href="/admin-portal/orders"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-ivory/70 text-xs tracking-wide text-stone uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/6">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-ivory/40">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-charcoal">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-stone">{order.id}</p>
                    </td>
                    <td className="px-5 py-3.5 text-charcoal/80">
                      {order.items[0]?.name}
                      {order.items.length > 1
                        ? ` +${order.items.length - 1}`
                        : ""}
                    </td>
                    <td className="px-5 py-3.5 font-medium">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-5 py-3.5 text-stone">
                      {formatAdminDate(order.date)}
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
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-charcoal/10 bg-white p-5">
            <h2 className="font-serif text-xl font-light text-charcoal">
              Quick Actions
            </h2>
            <div className="mt-4 grid gap-2">
              <Link href="/admin-portal/products/new">
                <AdminButton variant="outline" className="w-full justify-start">
                  Add Product
                </AdminButton>
              </Link>
              <Link href="/admin-portal/products">
                <AdminButton variant="outline" className="w-full justify-start">
                  Update Shop
                </AdminButton>
              </Link>
              <Link href="/admin-portal/content">
                <AdminButton variant="outline" className="w-full justify-start">
                  Upload Image
                </AdminButton>
              </Link>
              <Link href="/admin-portal/orders">
                <AdminButton variant="outline" className="w-full justify-start">
                  View Checkouts
                </AdminButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
