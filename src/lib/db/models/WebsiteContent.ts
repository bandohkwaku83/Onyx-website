import { Schema, models, model } from "mongoose";
import type { WebsiteContent } from "@/lib/admin/types";

export type WebsiteContentDocument = WebsiteContent & {
  contentUpdates: {
    section: string;
    title: string;
    updatedAt: Date;
    image?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

const DetailCardSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    href: { type: String, required: true },
  },
  { _id: false },
);

const ContentUpdateSchema = new Schema(
  {
    section: { type: String, required: true },
    title: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    image: { type: String },
  },
  { _id: true },
);

const WebsiteContentSchema = new Schema<WebsiteContentDocument>(
  {
    homeHero: {
      image: String,
      eyebrow: String,
      heading: String,
      headingAccent: String,
      description: String,
      primaryCta: String,
      secondaryCta: String,
    },
    detailsSection: {
      eyebrow: String,
      title: String,
      cards: [DetailCardSchema],
    },
    homeCta: {
      image: String,
      eyebrow: String,
      title: String,
      description: String,
      buttonLabel: String,
    },
    contactHero: {
      image: String,
      eyebrow: String,
      heading: String,
      description: String,
    },
    shopIntro: { type: String },
    contentUpdates: { type: [ContentUpdateSchema], default: [] },
  },
  { timestamps: true },
);

export const WebsiteContentModel =
  models.WebsiteContent ||
  model<WebsiteContentDocument>("WebsiteContent", WebsiteContentSchema);
