import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { ProductModel } from "@/lib/db/models/Product";
import { ShowroomItemModel } from "@/lib/db/models/ShowroomItem";
import { OrderModel } from "@/lib/db/models/Order";
import { CustomerModel } from "@/lib/db/models/Customer";
import { ActivityModel } from "@/lib/db/models/Activity";
import { WebsiteContentModel } from "@/lib/db/models/WebsiteContent";
import { AdminUserModel } from "@/lib/db/models/AdminUser";
import {
  DEMO_ADMIN,
  INITIAL_ACTIVITY,
  INITIAL_CONTENT,
  INITIAL_CONTENT_UPDATES,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_SHOWROOM,
} from "@/lib/admin/data";
import { PRODUCTS } from "@/lib/products";
import { toCategorySlug } from "@/lib/db/category";

export async function POST() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_DB_SEED !== "true"
  ) {
    return NextResponse.json(
      { error: "Seeding is disabled in production." },
      { status: 403 },
    );
  }

  try {
    await connectDB();

    await Promise.all([
      ProductModel.deleteMany({}),
      ShowroomItemModel.deleteMany({}),
      OrderModel.deleteMany({}),
      CustomerModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      WebsiteContentModel.deleteMany({}),
      AdminUserModel.deleteMany({}),
    ]);

    const productFeatures = new Map(
      PRODUCTS.map((p) => [p.slug, p.features] as const),
    );

    await ProductModel.insertMany(
      INITIAL_PRODUCTS.map((p) => ({
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        discountPrice: p.discountPrice,
        category: toCategorySlug(p.category),
        image: p.image,
        status: p.status,
        enabled: p.enabled,
        features: productFeatures.get(p.slug) ?? [],
        updatedAt: new Date(p.updatedAt),
        createdAt: new Date(p.updatedAt),
      })),
    );

    await ShowroomItemModel.insertMany(
      INITIAL_SHOWROOM.map((s) => ({
        name: s.name,
        description: s.description,
        price: s.price,
        discountPrice: s.discountPrice,
        category: toCategorySlug(s.category),
        image: s.image,
        status: s.status,
        availability: s.availability,
        updatedAt: new Date(s.updatedAt),
        createdAt: new Date(s.updatedAt),
      })),
    );

    await OrderModel.insertMany(
      INITIAL_ORDERS.map((o) => ({
        orderNumber: o.id,
        customerName: o.customerName,
        customerEmail: o.customerEmail,
        customerPhone: o.customerPhone,
        items: o.items,
        subtotal: o.subtotal,
        total: o.total,
        status: o.status,
        paymentStatus: o.paymentStatus,
        notes: o.notes,
        date: new Date(o.date),
      })),
    );

    await CustomerModel.insertMany(
      INITIAL_CUSTOMERS.map((c) => ({
        name: c.name,
        email: c.email,
        phone: c.phone,
        orders: c.orders,
        totalSpent: c.totalSpent,
        joinedAt: new Date(c.joinedAt),
      })),
    );

    await ActivityModel.insertMany(
      INITIAL_ACTIVITY.map((a) => ({
        type: a.type,
        message: a.message,
        time: new Date(a.time),
      })),
    );

    await WebsiteContentModel.create({
      ...INITIAL_CONTENT,
      contentUpdates: INITIAL_CONTENT_UPDATES.map((u) => ({
        section: u.section,
        title: u.title,
        updatedAt: new Date(u.updatedAt),
        image: u.image,
      })),
    });

    await AdminUserModel.create({
      email: DEMO_ADMIN.email,
      password: DEMO_ADMIN.password,
      name: DEMO_ADMIN.name,
      role: DEMO_ADMIN.role,
    });

    return NextResponse.json({
      ok: true,
      message: "Database seeded with demo data.",
      admin: { email: DEMO_ADMIN.email, password: DEMO_ADMIN.password },
    });
  } catch (err) {
    console.error("[seed]", err);
    const message = err instanceof Error ? err.message : "Seed failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
