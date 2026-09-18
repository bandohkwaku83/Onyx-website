import { Schema, models, model } from "mongoose";
import type {
  AvailabilityStatus,
  PublishStatus,
} from "@/lib/admin/types";
import type { ProductCategory } from "@/lib/products";

export type ShowroomDocument = {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: ProductCategory;
  image: string;
  status: PublishStatus;
  availability: AvailabilityStatus;
  updatedAt: Date;
  createdAt: Date;
};

const ShowroomSchema = new Schema<ShowroomDocument>(
  {
    name: { type: String, required: true },
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
    availability: {
      type: String,
      enum: ["available", "unavailable", "coming-soon"],
      default: "available",
    },
  },
  { timestamps: true },
);

export const ShowroomItemModel =
  models.ShowroomItem ||
  model<ShowroomDocument>("ShowroomItem", ShowroomSchema);
