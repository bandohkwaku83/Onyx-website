import { Schema, models, model } from "mongoose";

export type CustomerDocument = {
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

const CustomerSchema = new Schema<CustomerDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, default: "", index: true },
    phone: { type: String, required: true, index: true },
    orders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const CustomerModel =
  models.Customer || model<CustomerDocument>("Customer", CustomerSchema);
