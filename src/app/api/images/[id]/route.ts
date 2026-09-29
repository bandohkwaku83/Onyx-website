import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { ImageAssetModel } from "@/lib/db/models/ImageAsset";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await connectDB();
    const doc = await ImageAssetModel.findById(id);
    if (!doc?.data) {
      return new NextResponse("Not found", { status: 404 });
    }

    return new NextResponse(new Uint8Array(doc.data), {
      headers: {
        "Content-Type": doc.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("[images]", err);
    return new NextResponse("Image unavailable", { status: 500 });
  }
}
