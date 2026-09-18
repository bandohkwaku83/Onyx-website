import { Schema, models, model } from "mongoose";

export type AdminUserDocument = {
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

const AdminUserSchema = new Schema<AdminUserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "Administrator" },
  },
  { timestamps: true },
);

export const AdminUserModel =
  models.AdminUser || model<AdminUserDocument>("AdminUser", AdminUserSchema);
