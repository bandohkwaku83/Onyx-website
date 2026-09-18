"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { PRODUCT_CATEGORIES } from "@/lib/admin/data";
import type { PublishStatus } from "@/lib/admin/types";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import {
  Field,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/admin/ui/FormFields";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { PageHeader } from "@/components/admin/ui/PageHeader";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function NewProductPage() {
  const router = useRouter();
  const { upsertProduct, pushToast } = useAdminData();
  const [image, setImage] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState<string>(PRODUCT_CATEGORIES[0]);
  const [enabled, setEnabled] = useState(true);
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);

  const submit = async (status: PublishStatus) => {
    if (!name.trim() || !description.trim() || !price || !image) {
      pushToast("Please complete all required fields.", "error");
      return;
    }
    setSaving(status === "published" ? "publish" : "draft");
    try {
      await upsertProduct({
        id: `pr-${Math.random().toString(36).slice(2, 7)}`,
        name: name.trim(),
        slug: slugify(name),
        description: description.trim(),
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        category,
        image,
        status,
        enabled,
        updatedAt: new Date().toISOString(),
      });
      pushToast(
        status === "published"
          ? "Product published successfully."
          : "Product saved as draft.",
      );
      router.push("/admin-portal/products");
    } catch (err) {
      pushToast(
        err instanceof Error ? err.message : "Failed to save product",
        "error",
      );
    } finally {
      setSaving(null);
    }
  };

  const onSubmit = (e: FormEvent) => e.preventDefault();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Add Product"
        description="Create a product for the online catalogue. Publishing makes it available on the shop."
      />

      <form
        onSubmit={onSubmit}
        className="space-y-6 border border-charcoal/10 bg-white p-5 sm:p-8"
      >
        <ImageUpload value={image} onChange={setImage} label="Product Image" />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Product Name" htmlFor="pr-name">
              <TextInput
                id="pr-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Brass Pendant Light"
                required
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Description" htmlFor="pr-desc">
              <TextArea
                id="pr-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Field>
          </div>
          <Field label="Price (GH₵)" htmlFor="pr-price">
            <TextInput
              id="pr-price"
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Field>
          <Field label="Discount price (optional)" htmlFor="pr-discount">
            <TextInput
              id="pr-discount"
              type="number"
              min="0"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
            />
          </Field>
          <Field label="Category" htmlFor="pr-category">
            <SelectInput
              id="pr-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Enabled on website" htmlFor="pr-enabled">
            <SelectInput
              id="pr-enabled"
              value={enabled ? "yes" : "no"}
              onChange={(e) => setEnabled(e.target.value === "yes")}
            >
              <option value="yes">Enabled</option>
              <option value="no">Disabled</option>
            </SelectInput>
          </Field>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-charcoal/10 pt-5 sm:flex-row sm:justify-end">
          <AdminButton
            type="button"
            variant="ghost"
            onClick={() => router.push("/admin-portal/products")}
            disabled={Boolean(saving)}
          >
            Cancel
          </AdminButton>
          <AdminButton
            type="button"
            variant="outline"
            loading={saving === "draft"}
            onClick={() => void submit("draft")}
          >
            Save Draft
          </AdminButton>
          <AdminButton
            type="button"
            loading={saving === "publish"}
            onClick={() => void submit("published")}
          >
            Publish
          </AdminButton>
        </div>
      </form>
    </div>
  );
}
