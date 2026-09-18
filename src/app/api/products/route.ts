import { NextRequest } from "next/server";
import { withDB, json, error, logActivity } from "@/lib/db/api";
import { ProductModel } from "@/lib/db/models/Product";
import { toAdminProduct, toStoreProduct } from "@/lib/db/serialize";
import { toCategorySlug } from "@/lib/db/category";

export async function GET(request: NextRequest) {
  return withDB(async () => {
    const { searchParams } = request.nextUrl;
    const scope = searchParams.get("scope") ?? "store";
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");

    if (slug) {
      const doc = await ProductModel.findOne({ slug }).lean();
      if (!doc) return error("Product not found", 404);
      return json(
        scope === "admin" ? toAdminProduct(doc) : toStoreProduct(doc),
      );
    }

    const filter: Record<string, unknown> = {};
    if (scope === "store") {
      filter.status = "published";
      filter.enabled = true;
    }
    if (category) {
      filter.category = category.includes("-")
        ? category
        : toCategorySlug(category);
    }

    const docs = await ProductModel.find(filter).sort({ updatedAt: -1 }).lean();
    return json(
      scope === "admin"
        ? docs.map(toAdminProduct)
        : docs.map(toStoreProduct),
    );
  });
}

export async function POST(request: NextRequest) {
  return withDB(async () => {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      discountPrice,
      category,
      image,
      status,
      enabled,
      features,
    } = body;

    if (!name || !slug || !description || price == null || !category || !image) {
      return error("Missing required product fields");
    }

    const doc = await ProductModel.create({
      name,
      slug,
      description,
      price: Number(price),
      discountPrice:
        discountPrice != null && discountPrice !== ""
          ? Number(discountPrice)
          : undefined,
      category: toCategorySlug(category),
      image,
      status: status ?? "draft",
      enabled: enabled ?? true,
      features: features ?? [],
    });

    await logActivity(
      "product",
      `Product “${name}” ${status === "published" ? "published" : "created"}`,
    );

    return json(toAdminProduct(doc.toObject()), 201);
  });
}
