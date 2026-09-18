import { withDB, json } from "@/lib/db/api";
import { ActivityModel } from "@/lib/db/models/Activity";
import { toActivity } from "@/lib/db/serialize";

export async function GET() {
  return withDB(async () => {
    const docs = await ActivityModel.find().sort({ time: -1 }).limit(50).lean();
    return json(docs.map(toActivity));
  });
}
