"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { formatAdminDate, PRODUCT_CATEGORIES } from "@/lib/admin/data";
import { formatPrice } from "@/lib/products";
import { IconPlus } from "@/components/admin/icons";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ConfirmModal } from "@/components/admin/ui/ConfirmModal";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SelectInput, TextInput } from "@/components/admin/ui/FormFields";
import { PublishStatusBadge } from "@/components/admin/ui/StatusBadge";

export default function ProductsPage() {
  const { products, deleteProduct, upsertProduct, pushToast } = useAdminData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  const item = products.find((p) => p.id === deleteId);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteId);
      setDeleteId(null);
      pushToast("Product deleted successfully.");
    } catch (err) {
      pushToast(
        err instanceof Error ? err.message : "Failed to delete product",
        "error",
      );
    } finally {
      setDeleting(false);
    }
  };

  const toggleEnabled = async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    try {
      await upsertProduct({
        ...product,
        enabled: !product.enabled,
        updatedAt: new Date().toISOString(),
      });
      pushToast(
        product.enabled
          ? "Product disabled on the website."
          : "Product enabled on the website.",
      );
    } catch (err) {
      pushToast(
        err instanceof Error ? err.message : "Failed to update product",
        "error",
      );
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catalogue"
        title="Products"
        description="Add, edit, price, and enable products that appear in the Shop."
        actions={
          <Link href="/admin-portal/products/new">
            <AdminButton icon={<IconPlus className="h-4 w-4" />}>
              Add Product
            </AdminButton>
          </Link>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <TextInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="sm:max-w-xs"
        />
        <SelectInput
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="sm:max-w-[200px]"
        >
          <option value="all">All categories</option>
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectInput>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try a different search, or add your first product."
          action={
            <Link href="/admin-portal/products/new">
              <AdminButton icon={<IconPlus className="h-4 w-4" />}>
                Add Product
              </AdminButton>
            </Link>
          }
        />
      ) : (
        <div className="overflow-hidden border border-charcoal/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="bg-ivory/70 text-xs tracking-wide text-stone uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Enabled</th>
                  <th className="px-5 py-3 font-medium">Updated</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/6">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-ivory/40">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-ivory">
                          <Image
                            src={product.image}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-charcoal">
                            {product.name}
                          </p>
                          <p className="truncate text-xs text-stone">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-charcoal/80">
                      {product.category}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium">
                        {formatPrice(product.discountPrice ?? product.price)}
                      </p>
                      {product.discountPrice ? (
                        <p className="text-xs text-stone line-through">
                          {formatPrice(product.price)}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-5 py-3.5">
                      <PublishStatusBadge status={product.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        type="button"
                        onClick={() => toggleEnabled(product.id)}
                        className={`relative h-6 w-11 rounded-full transition ${
                          product.enabled ? "bg-primary" : "bg-charcoal/20"
                        }`}
                        aria-label={
                          product.enabled ? "Disable product" : "Enable product"
                        }
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition ${
                            product.enabled ? "translate-x-5" : ""
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-stone">
                      {formatAdminDate(product.updatedAt)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin-portal/products/${product.id}/edit`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteId(product.id)}
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete product?"
        description={`Are you sure you want to delete “${item?.name ?? "this product"}”?`}
        confirmLabel="Delete"
        tone="danger"
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}
