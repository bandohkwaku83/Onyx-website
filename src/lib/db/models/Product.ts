import { Schema, models, model } from "mongoose";
import type { PublishStatus } from "@/lib/admin/types";
import type { ProductCategory } from "@/lib/products";

export type ProductDocument = {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: ProductCategory;
  image: string;
  status: PublishStatus;
  enabled: boolean;
  features: string[];
  updatedAt: Date;
  createdAt: Date;
};

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: {
      type: String,
      enum: ["lighting", "sanitary-ware", "home-solutions"],
      required: true,
    },
    image: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    enabled: { type: Boolean, default: true },
    features: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const ProductModel =
  models.Product || model<ProductDocument>("Product", ProductSchema);
