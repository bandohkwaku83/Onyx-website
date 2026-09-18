import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { ActivityModel } from "@/lib/db/models/Activity";

export async function withDB<T>(
  handler: () => Promise<T>,
): Promise<T | NextResponse> {
  try {
    await connectDB();
    return await handler();
  } catch (error) {
    console.error("[api]", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    const status = message.includes("MONGODB_URI") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export function json<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function error(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function logActivity(
  type: "order" | "content" | "product" | "showroom",
  message: string,
) {
  await ActivityModel.create({ type, message, time: new Date() });
}
