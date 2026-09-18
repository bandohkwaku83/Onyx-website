import { NextRequest } from "next/server";
import { withDB, json, error, logActivity } from "@/lib/db/api";
import { ProductModel } from "@/lib/db/models/Product";
import { toAdminProduct } from "@/lib/db/serialize";
import { toCategorySlug } from "@/lib/db/category";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  return withDB(async () => {
    const { id } = await params;
    const doc = await ProductModel.findById(id).lean();
    if (!doc) return error("Product not found", 404);
    return json(toAdminProduct(doc));
  });
}

export async function PUT(request: NextRequest, { params }: Params) {
  return withDB(async () => {
    const { id } = await params;
    const body = await request.json();
    const update: Record<string, unknown> = { ...body };
    if (body.category) update.category = toCategorySlug(body.category);
    if (body.price != null) update.price = Number(body.price);
    if (body.discountPrice === "" || body.discountPrice == null) {
      update.discountPrice = undefined;
    } else if (body.discountPrice != null) {
      update.discountPrice = Number(body.discountPrice);
    }
    delete update.id;
    delete update._id;

    const doc = await ProductModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();

    if (!doc) return error("Product not found", 404);

    await logActivity(
      "product",
      `Product “${doc.name}” ${doc.status === "published" ? "published" : "updated"}`,
    );

    return json(toAdminProduct(doc));
  });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  return withDB(async () => {
    const { id } = await params;
    const doc = await ProductModel.findByIdAndDelete(id).lean();
    if (!doc) return error("Product not found", 404);
    await logActivity("product", `Product “${doc.name}” deleted`);
    return json({ ok: true });
  });
}
