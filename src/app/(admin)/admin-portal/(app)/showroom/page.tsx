"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { formatAdminDate } from "@/lib/admin/data";
import { formatPrice } from "@/lib/products";
import { IconPlus } from "@/components/admin/icons";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ConfirmModal } from "@/components/admin/ui/ConfirmModal";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import {
  AvailabilityBadge,
  PublishStatusBadge,
} from "@/components/admin/ui/StatusBadge";

export default function ShowroomPage() {
  const { showroom, deleteShowroomItem, pushToast } = useAdminData();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const item = showroom.find((s) => s.id === deleteId);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteShowroomItem(deleteId);
      setDeleteId(null);
      pushToast("Shop item deleted successfully.");
    } catch (err) {
      pushToast(
        err instanceof Error ? err.message : "Failed to delete shop item",
        "error",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catalogue"
        title="Shop"
        description="Update shop pieces that appear on the main website — without editing code."
        actions={
          <Link href="/admin-portal/showroom/new">
            <AdminButton icon={<IconPlus className="h-4 w-4" />}>
              Add Shop Item
            </AdminButton>
          </Link>
        }
      />

      {showroom.length === 0 ? (
        <EmptyState
          title="No shop items yet. Add your first item."
          description="Published items will appear in the website shop section."
          action={
            <Link href="/admin-portal/showroom/new">
              <AdminButton icon={<IconPlus className="h-4 w-4" />}>
                Add Shop Item
              </AdminButton>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {showroom.map((entry) => (
            <article
              key={entry.id}
              className="overflow-hidden border border-charcoal/10 bg-white"
            >
              <div className="relative aspect-[4/3] bg-ivory">
                <Image
                  src={entry.image}
                  alt={entry.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 p-4">
                <div className="flex flex-wrap gap-1.5">
                  <PublishStatusBadge status={entry.status} />
                  <AvailabilityBadge status={entry.availability} />
                </div>
                <div>
                  <h3 className="font-medium text-charcoal">{entry.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-stone">
                    {entry.description}
                  </p>
                </div>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="font-medium text-charcoal">
                      {formatPrice(entry.discountPrice ?? entry.price)}
                    </p>
                    {entry.discountPrice ? (
                      <p className="text-xs text-stone line-through">
                        {formatPrice(entry.price)}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-xs text-stone">
                    Updated {formatAdminDate(entry.updatedAt)}
                  </p>
                </div>
                <div className="flex gap-2 pt-1">
                  <Link
                    href={`/admin-portal/showroom/${entry.id}/edit`}
                    className="flex-1"
                  >
                    <AdminButton variant="outline" size="sm" className="w-full">
                      Edit
                    </AdminButton>
                  </Link>
                  <AdminButton
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => setDeleteId(entry.id)}
                  >
                    Delete
                  </AdminButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete shop item?"
        description={`Are you sure you want to delete “${item?.name ?? "this item"}”? This will remove it from the website shop.`}
        confirmLabel="Delete"
        tone="danger"
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}
