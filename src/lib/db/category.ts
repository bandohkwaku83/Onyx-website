import type { ProductCategory } from "@/lib/products";

export const CATEGORY_SLUG_TO_LABEL: Record<ProductCategory, string> = {
  lighting: "Lighting",
  "sanitary-ware": "Sanitary Ware",
  "home-solutions": "Home Solutions",
};

export const CATEGORY_LABEL_TO_SLUG: Record<string, ProductCategory> = {
  Lighting: "lighting",
  "Sanitary Ware": "sanitary-ware",
  "Home Solutions": "home-solutions",
};

export function toCategoryLabel(slug: string): string {
  return CATEGORY_SLUG_TO_LABEL[slug as ProductCategory] ?? slug;
}

export function toCategorySlug(label: string): ProductCategory {
  return CATEGORY_LABEL_TO_SLUG[label] ?? (label as ProductCategory);
}
