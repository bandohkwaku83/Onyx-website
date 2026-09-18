import { NextRequest } from "next/server";
import { withDB, json, error, logActivity } from "@/lib/db/api";
import { OrderModel } from "@/lib/db/models/Order";
import { toAdminOrder } from "@/lib/db/serialize";
import type { OrderStatus } from "@/lib/admin/types";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  return withDB(async () => {
    const { id } = await params;
    const doc = await OrderModel.findOne({ orderNumber: id }).lean();
    if (!doc) return error("Order not found", 404);
    return json(toAdminOrder(doc));
  });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  return withDB(async () => {
    const { id } = await params;
    const body = await request.json();
    const status = body.status as OrderStatus | undefined;
    if (!status) return error("status is required");

    const doc = await OrderModel.findOneAndUpdate(
      { orderNumber: id },
      { status },
      { new: true },
    ).lean();

    if (!doc) return error("Order not found", 404);

    await logActivity("order", `Order ${id} marked as ${status}`);
    return json(toAdminOrder(doc));
  });
}
