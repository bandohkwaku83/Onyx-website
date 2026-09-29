import { Schema, models, model } from "mongoose";

export type ImageAssetDocument = {
  data: Buffer;
  contentType: string;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
};

const ImageAssetSchema = new Schema<ImageAssetDocument>(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    filename: { type: String, default: "upload.jpg" },
  },
  { timestamps: true },
);

export const ImageAssetModel =
  models.ImageAsset || model<ImageAssetDocument>("ImageAsset", ImageAssetSchema);
