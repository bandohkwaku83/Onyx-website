import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { ImageAssetModel } from "@/lib/db/models/ImageAsset";

export const runtime = "nodejs";

const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image must be under 4MB." },
        { status: 400 },
      );
    }

    await connectDB();
    const doc = await ImageAssetModel.create({
      data: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || "image/jpeg",
      filename: file.name || "upload.jpg",
    });

    return NextResponse.json({ url: `/api/images/${doc._id.toString()}` });
  } catch (err) {
    console.error("[upload]", err);
    const message = err instanceof Error ? err.message : "Upload failed";
    const status = message.includes("MONGODB_URI") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
