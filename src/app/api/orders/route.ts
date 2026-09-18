import { NextRequest } from "next/server";
import { withDB, json, error, logActivity } from "@/lib/db/api";
import { OrderModel } from "@/lib/db/models/Order";
import { CustomerModel } from "@/lib/db/models/Customer";
import { toAdminOrder } from "@/lib/db/serialize";

async function nextOrderNumber() {
  const latest = await OrderModel.findOne()
    .sort({ createdAt: -1 })
    .select("orderNumber")
    .lean();
  if (!latest?.orderNumber) return "ORD-1001";
  const num = Number(String(latest.orderNumber).replace(/\D/g, ""));
  return `ORD-${Number.isFinite(num) ? num + 1 : Date.now() % 100000}`;
}

export async function GET() {
  return withDB(async () => {
    const docs = await OrderModel.find().sort({ date: -1 }).lean();
    return json(docs.map(toAdminOrder));
  });
}

export async function POST(request: NextRequest) {
  return withDB(async () => {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      paymentMethod,
      items,
      notes,
    } = body;

    if (!customerName || !customerPhone || !Array.isArray(items) || !items.length) {
      return error("Missing required order fields");
    }

    const lineItems = items.map(
      (item: {
        productId: string;
        name: string;
        image: string;
        quantity: number;
        unitPrice: number;
      }) => ({
        productId: String(item.productId),
        name: String(item.name),
        image: String(item.image),
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      }),
    );

    const subtotal = lineItems.reduce(
      (sum: number, item: { quantity: number; unitPrice: number }) =>
        sum + item.quantity * item.unitPrice,
      0,
    );

    const orderNumber = await nextOrderNumber();
    const doc = await OrderModel.create({
      orderNumber,
      customerName,
      customerEmail: customerEmail ?? "",
      customerPhone,
      deliveryAddress,
      paymentMethod,
      items: lineItems,
      subtotal,
      total: subtotal,
      status: "pending",
      paymentStatus:
        paymentMethod === "Pay on Delivery" ? "pending" : "pending",
      notes,
      date: new Date(),
    });

    const phone = String(customerPhone);
    const email = String(customerEmail ?? "").toLowerCase();
    const existing = email
      ? await CustomerModel.findOne({ email })
      : await CustomerModel.findOne({ phone });

    if (existing) {
      existing.name = customerName;
      existing.phone = phone;
      if (email) existing.email = email;
      existing.orders += 1;
      existing.totalSpent += subtotal;
      await existing.save();
    } else {
      await CustomerModel.create({
        name: customerName,
        email,
        phone,
        orders: 1,
        totalSpent: subtotal,
        joinedAt: new Date(),
      });
    }

    await logActivity(
      "order",
      `New checkout ${orderNumber} from ${customerName}`,
    );

    return json(toAdminOrder(doc.toObject()), 201);
  });
}
