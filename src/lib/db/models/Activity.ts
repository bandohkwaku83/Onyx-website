import { Schema, models, model } from "mongoose";

export type ActivityDocument = {
  type: "order" | "content" | "product" | "showroom";
  message: string;
  time: Date;
  createdAt: Date;
  updatedAt: Date;
};

const ActivitySchema = new Schema<ActivityDocument>(
  {
    type: {
      type: String,
      enum: ["order", "content", "product", "showroom"],
      required: true,
    },
    message: { type: String, required: true },
    time: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const ActivityModel =
  models.Activity || model<ActivityDocument>("Activity", ActivitySchema);
