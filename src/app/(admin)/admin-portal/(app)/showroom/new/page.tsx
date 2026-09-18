"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { PRODUCT_CATEGORIES } from "@/lib/admin/data";
import type {
  AvailabilityStatus,
  PublishStatus,
} from "@/lib/admin/types";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import {
  Field,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/admin/ui/FormFields";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { PageHeader } from "@/components/admin/ui/PageHeader";

export default function NewShowroomItemPage() {
  const router = useRouter();
  const { upsertShowroomItem, pushToast } = useAdminData();
  const [image, setImage] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState<string>(PRODUCT_CATEGORIES[0]);
  const [availability, setAvailability] =
    useState<AvailabilityStatus>("available");
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);

  const submit = async (status: PublishStatus) => {
    if (!name.trim() || !description.trim() || !price) {
      pushToast("Please fill in name, description, and price.", "error");
      return;
    }
    if (!image) {
      pushToast("Please upload an image before continuing.", "error");
      return;
    }
    setSaving(status === "published" ? "publish" : "draft");
    try {
      await upsertShowroomItem({
        id: `sr-${Math.random().toString(36).slice(2, 7)}`,
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        category,
        image,
        status,
        availability,
        updatedAt: new Date().toISOString(),
      });
      pushToast(
        status === "published"
          ? "Shop item published successfully."
          : "Shop item saved as draft.",
      );
      router.push("/admin-portal/showroom");
    } catch (err) {
      pushToast(
        err instanceof Error ? err.message : "Failed to save shop item",
        "error",
      );
    } finally {
      setSaving(null);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Add Shop Item"
        description="Upload imagery and product details. Publishing updates the corresponding content on the main website."
      />

      <form
        onSubmit={onSubmit}
        className="space-y-6 border border-charcoal/10 bg-white p-5 sm:p-8"
      >
        <ImageUpload value={image} onChange={setImage} />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Item / Product Name" htmlFor="sr-name">
              <TextInput
                id="sr-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Modern Pendant Light"
                required
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Description" htmlFor="sr-desc">
              <TextArea
                id="sr-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Elegant contemporary pendant light suitable for modern living spaces."
                required
              />
            </Field>
          </div>
          <Field label="Price (GH₵)" htmlFor="sr-price">
            <TextInput
              id="sr-price"
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2500"
              required
            />
          </Field>
          <Field
            label="Discount price (optional)"
            htmlFor="sr-discount"
            hint="Leave blank if no discount"
          >
            <TextInput
              id="sr-discount"
              type="number"
              min="0"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="2200"
            />
          </Field>
          <Field label="Category" htmlFor="sr-category">
            <SelectInput
              id="sr-category"
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
          <Field label="Availability / Status" htmlFor="sr-availability">
            <SelectInput
              id="sr-availability"
              value={availability}
              onChange={(e) =>
                setAvailability(e.target.value as AvailabilityStatus)
              }
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="coming-soon">Coming soon</option>
            </SelectInput>
          </Field>
        </div>

        {image && name ? (
          <div className="border border-charcoal/10 bg-ivory/60 p-4">
            <p className="text-xs font-medium tracking-wide text-stone uppercase">
              Preview
            </p>
            <p className="mt-2 font-medium text-charcoal">{name}</p>
            <p className="mt-1 line-clamp-2 text-sm text-stone">
              {description || "Description will appear here."}
            </p>
            <p className="mt-2 text-sm font-medium text-primary">
              GH₵ {discountPrice || price || "—"}
              {discountPrice ? (
                <span className="ml-2 text-stone line-through">
                  GH₵ {price}
                </span>
              ) : null}
            </p>
            <p className="mt-3 text-xs text-stone">
              Publishing will update the shop section on the main website.
            </p>
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-2 border-t border-charcoal/10 pt-5 sm:flex-row sm:justify-end">
          <AdminButton
            type="button"
            variant="ghost"
            onClick={() => router.push("/admin-portal/showroom")}
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
