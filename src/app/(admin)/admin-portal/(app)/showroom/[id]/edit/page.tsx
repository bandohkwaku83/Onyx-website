"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
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

export default function EditShowroomItemPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { showroom, upsertShowroomItem, pushToast } = useAdminData();
  const existing = showroom.find((s) => s.id === params.id);

  const [image, setImage] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState<string>(PRODUCT_CATEGORIES[0]);
  const [availability, setAvailability] =
    useState<AvailabilityStatus>("available");
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);

  useEffect(() => {
    if (!existing) return;
    setImage(existing.image);
    setName(existing.name);
    setDescription(existing.description);
    setPrice(String(existing.price));
    setDiscountPrice(
      existing.discountPrice ? String(existing.discountPrice) : "",
    );
    setCategory(existing.category);
    setAvailability(existing.availability);
  }, [existing]);

  if (!existing) {
    return (
      <div className="border border-charcoal/10 bg-white p-8 text-center">
        <p className="text-charcoal">Shop item not found.</p>
        <AdminButton
          className="mt-4"
          variant="outline"
          onClick={() => router.push("/admin-portal/showroom")}
        >
          Back to Shop
        </AdminButton>
      </div>
    );
  }

  const submit = async (status: PublishStatus) => {
    if (!name.trim() || !description.trim() || !price || !image) {
      pushToast("Please complete all required fields.", "error");
      return;
    }
    setSaving(status === "published" ? "publish" : "draft");
    try {
      await upsertShowroomItem({
        ...existing,
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
          ? "Shop item updated successfully."
          : "Shop item saved as draft.",
      );
      router.push("/admin-portal/showroom");
    } catch (err) {
      pushToast(
        err instanceof Error ? err.message : "Failed to update shop item",
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
        title="Edit Shop Item"
        description="Changes published here will update the corresponding content on the main website."
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
              required
            />
          </Field>
          <Field label="Discount price (optional)" htmlFor="sr-discount">
            <TextInput
              id="sr-discount"
              type="number"
              min="0"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
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
