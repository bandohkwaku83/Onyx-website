import type {
  ActivityItem,
  AdminCustomer,
  AdminOrder,
  AdminProduct,
  AdminShowroomItem,
  ContentUpdate,
  WebsiteContent,
} from "@/lib/admin/types";
import type { Product } from "@/lib/products";
import { toCategoryLabel } from "./category";

type WithId = { _id: { toString(): string }; updatedAt?: Date; createdAt?: Date };

export function toAdminProduct(doc: WithId & Record<string, unknown>): AdminProduct {
  return {
    id: doc._id.toString(),
    name: String(doc.name),
    slug: String(doc.slug),
    description: String(doc.description),
    price: Number(doc.price),
    discountPrice:
      doc.discountPrice != null ? Number(doc.discountPrice) : undefined,
    category: toCategoryLabel(String(doc.category)),
    image: String(doc.image),
    status: doc.status as AdminProduct["status"],
    enabled: Boolean(doc.enabled),
    updatedAt: (doc.updatedAt ?? new Date()).toISOString(),
  };
}

export function toStoreProduct(doc: WithId & Record<string, unknown>): Product {
  return {
    id: doc._id.toString(),
    slug: String(doc.slug),
    name: String(doc.name),
    price:
      doc.discountPrice != null ? Number(doc.discountPrice) : Number(doc.price),
    category: doc.category as Product["category"],
    image: String(doc.image),
    description: String(doc.description),
    features: Array.isArray(doc.features)
      ? (doc.features as string[])
      : [],
    inStock: Boolean(doc.enabled),
  };
}

export function toAdminShowroom(
  doc: WithId & Record<string, unknown>,
): AdminShowroomItem {
  return {
    id: doc._id.toString(),
    name: String(doc.name),
    description: String(doc.description),
    price: Number(doc.price),
    discountPrice:
      doc.discountPrice != null ? Number(doc.discountPrice) : undefined,
    category: toCategoryLabel(String(doc.category)),
    image: String(doc.image),
    status: doc.status as AdminShowroomItem["status"],
    availability: doc.availability as AdminShowroomItem["availability"],
    updatedAt: (doc.updatedAt ?? new Date()).toISOString(),
  };
}

export function toAdminOrder(doc: WithId & Record<string, unknown>): AdminOrder {
  return {
    id: String(doc.orderNumber),
    customerName: String(doc.customerName),
    customerEmail: String(doc.customerEmail ?? ""),
    customerPhone: String(doc.customerPhone),
    items: (doc.items as AdminOrder["items"]) ?? [],
    subtotal: Number(doc.subtotal),
    total: Number(doc.total),
    date: (doc.date as Date | undefined)?.toISOString?.() ??
      (doc.createdAt ?? new Date()).toISOString(),
    status: doc.status as AdminOrder["status"],
    paymentStatus: doc.paymentStatus as AdminOrder["paymentStatus"],
    notes: doc.notes ? String(doc.notes) : undefined,
  };
}

export function toAdminCustomer(
  doc: WithId & Record<string, unknown>,
): AdminCustomer {
  return {
    id: doc._id.toString(),
    name: String(doc.name),
    email: String(doc.email ?? ""),
    phone: String(doc.phone),
    orders: Number(doc.orders ?? 0),
    totalSpent: Number(doc.totalSpent ?? 0),
    joinedAt: (doc.joinedAt as Date | undefined)?.toISOString?.() ??
      (doc.createdAt ?? new Date()).toISOString(),
  };
}

export function toActivity(doc: WithId & Record<string, unknown>): ActivityItem {
  return {
    id: doc._id.toString(),
    type: doc.type as ActivityItem["type"],
    message: String(doc.message),
    time: (doc.time as Date | undefined)?.toISOString?.() ??
      (doc.createdAt ?? new Date()).toISOString(),
  };
}

export function toWebsiteContent(doc: Record<string, unknown>): WebsiteContent {
  return {
    homeHero: doc.homeHero as WebsiteContent["homeHero"],
    detailsSection: doc.detailsSection as WebsiteContent["detailsSection"],
    homeCta: doc.homeCta as WebsiteContent["homeCta"],
    contactHero: doc.contactHero as WebsiteContent["contactHero"],
    shopIntro: String(doc.shopIntro ?? ""),
  };
}

export function toContentUpdates(
  updates: Array<Record<string, unknown>> | undefined,
): ContentUpdate[] {
  if (!updates?.length) return [];
  return updates.map((u) => ({
    id: String(u._id ?? u.id ?? Math.random().toString(36).slice(2)),
    section: String(u.section),
    title: String(u.title),
    updatedAt:
      (u.updatedAt as Date | undefined)?.toISOString?.() ??
      new Date().toISOString(),
    image: u.image ? String(u.image) : undefined,
  }));
}
