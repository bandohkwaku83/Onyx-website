import { Schema, models, model } from "mongoose";
import type { OrderStatus, PaymentStatus } from "@/lib/admin/types";

export type OrderLineDocument = {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
};

export type OrderDocument = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress?: string;
  paymentMethod?: string;
  items: OrderLineDocument[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

const OrderLineSchema = new Schema<OrderLineDocument>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  },
  { _id: false },
);

const OrderSchema = new Schema<OrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, default: "" },
    customerPhone: { type: String, required: true },
    deliveryAddress: { type: String },
    paymentMethod: { type: String },
    items: { type: [OrderLineSchema], required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    notes: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const OrderModel =
  models.Order || model<OrderDocument>("Order", OrderSchema);
