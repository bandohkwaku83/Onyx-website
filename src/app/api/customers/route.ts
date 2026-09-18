import { withDB, json } from "@/lib/db/api";
import { CustomerModel } from "@/lib/db/models/Customer";
import { toAdminCustomer } from "@/lib/db/serialize";

export async function GET() {
  return withDB(async () => {
    const docs = await CustomerModel.find().sort({ joinedAt: -1 }).lean();
    return json(docs.map(toAdminCustomer));
  });
}
