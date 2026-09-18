import { connectDB } from "@/lib/db/mongodb";
import { ProductModel } from "@/lib/db/models/Product";
import { toStoreProduct } from "@/lib/db/serialize";
import type { Product, ProductCategory } from "@/lib/products";

export async function getStoreProducts(
  category?: ProductCategory,
): Promise<Product[]> {
  try {
    await connectDB();
    const filter: Record<string, unknown> = {
      status: "published",
      enabled: true,
    };
    if (category) filter.category = category;
    const docs = await ProductModel.find(filter).sort({ updatedAt: -1 }).lean();
    return docs.map(toStoreProduct);
  } catch (error) {
    console.error("[getStoreProducts]", error);
    return [];
  }
}

export async function getStoreProductBySlug(
  slug: string,
): Promise<Product | null> {
  try {
    await connectDB();
    const doc = await ProductModel.findOne({
      slug,
      status: "published",
      enabled: true,
    }).lean();
    return doc ? toStoreProduct(doc) : null;
  } catch (error) {
    console.error("[getStoreProductBySlug]", error);
    return null;
  }
}

export async function getStoreProductSlugs(): Promise<string[]> {
  try {
    await connectDB();
    const docs = await ProductModel.find({
      status: "published",
      enabled: true,
    })
      .select("slug")
      .lean();
    return docs.map((d) => String(d.slug));
  } catch (error) {
    console.error("[getStoreProductSlugs]", error);
    return [];
  }
}
