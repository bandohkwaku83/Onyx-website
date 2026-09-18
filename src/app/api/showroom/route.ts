import { NextRequest } from "next/server";
import { withDB, json, error, logActivity } from "@/lib/db/api";
import { ShowroomItemModel } from "@/lib/db/models/ShowroomItem";
import { toAdminShowroom } from "@/lib/db/serialize";
import { toCategorySlug } from "@/lib/db/category";

export async function GET() {
  return withDB(async () => {
    const docs = await ShowroomItemModel.find()
      .sort({ updatedAt: -1 })
      .lean();
    return json(docs.map(toAdminShowroom));
  });
}

export async function POST(request: NextRequest) {
  return withDB(async () => {
    const body = await request.json();
    const {
      name,
      description,
      price,
      discountPrice,
      category,
      image,
      status,
      availability,
    } = body;

    if (!name || !description || price == null || !category || !image) {
      return error("Missing required showroom fields");
    }

    const doc = await ShowroomItemModel.create({
      name,
      description,
      price: Number(price),
      discountPrice:
        discountPrice != null && discountPrice !== ""
          ? Number(discountPrice)
          : undefined,
      category: toCategorySlug(category),
      image,
      status: status ?? "draft",
      availability: availability ?? "available",
    });

    await logActivity(
      "showroom",
      `Shop item “${name}” ${status === "published" ? "published" : "saved"}`,
    );

    return json(toAdminShowroom(doc.toObject()), 201);
  });
}
