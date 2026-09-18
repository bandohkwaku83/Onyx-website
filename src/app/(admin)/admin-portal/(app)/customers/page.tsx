"use client";

import { useMemo, useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { formatAdminDate } from "@/lib/admin/data";
import { formatPrice } from "@/lib/products";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { TextInput } from "@/components/admin/ui/FormFields";

export default function CustomersPage() {
  const { customers } = useAdminData();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q),
    );
  }, [customers, query]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="People who have checked out or registered through the website."
      />

      <TextInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search customers…"
        className="max-w-sm"
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No customers found"
          description="Customer records will appear here once checkout is connected."
        />
      ) : (
        <div className="overflow-hidden border border-charcoal/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-ivory/70 text-xs tracking-wide text-stone uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Orders</th>
                  <th className="px-5 py-3 font-medium">Total spent</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/6">
                {filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-ivory/40">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-charcoal">
                        {customer.name}
                      </p>
                      <p className="text-xs text-stone">{customer.id}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p>{customer.email}</p>
                      <p className="text-xs text-stone">{customer.phone}</p>
                    </td>
                    <td className="px-5 py-3.5">{customer.orders}</td>
                    <td className="px-5 py-3.5 font-medium">
                      {formatPrice(customer.totalSpent)}
                    </td>
                    <td className="px-5 py-3.5 text-stone">
                      {formatAdminDate(customer.joinedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
