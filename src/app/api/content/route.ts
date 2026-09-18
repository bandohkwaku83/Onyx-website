import { NextRequest } from "next/server";
import { withDB, json, error, logActivity } from "@/lib/db/api";
import { WebsiteContentModel } from "@/lib/db/models/WebsiteContent";
import { INITIAL_CONTENT } from "@/lib/admin/data";
import { toContentUpdates, toWebsiteContent } from "@/lib/db/serialize";

export async function GET() {
  return withDB(async () => {
    let doc = await WebsiteContentModel.findOne().lean();
    if (!doc) {
      const created = await WebsiteContentModel.create({
        ...INITIAL_CONTENT,
        contentUpdates: [],
      });
      doc = created.toObject();
    }

    return json({
      content: toWebsiteContent(doc),
      contentUpdates: toContentUpdates(
        doc.contentUpdates as unknown as Array<Record<string, unknown>>,
      ),
    });
  });
}

export async function PUT(request: NextRequest) {
  return withDB(async () => {
    const body = await request.json();
    const { content, note } = body;
    if (!content?.homeHero || !content?.detailsSection || !content?.homeCta) {
      return error("Invalid website content payload");
    }

    const updateNote = {
      section: "Website",
      title: note ?? "Website content published",
      updatedAt: new Date(),
      image: content.homeHero.image,
    };

    let doc = await WebsiteContentModel.findOne();
    if (!doc) {
      doc = await WebsiteContentModel.create({
        ...content,
        contentUpdates: [updateNote],
      });
    } else {
      doc.homeHero = content.homeHero;
      doc.detailsSection = content.detailsSection;
      doc.homeCta = content.homeCta;
      doc.contactHero = content.contactHero;
      doc.shopIntro = content.shopIntro;
      doc.contentUpdates = [updateNote, ...(doc.contentUpdates ?? [])].slice(
        0,
        40,
      ) as typeof doc.contentUpdates;
      await doc.save();
    }

    await logActivity("content", note ?? "Website content published");

    const lean = doc.toObject();
    return json({
      content: toWebsiteContent(lean),
      contentUpdates: toContentUpdates(
        lean.contentUpdates as unknown as Array<Record<string, unknown>>,
      ),
    });
  });
}
