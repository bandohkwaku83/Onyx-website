import { NextRequest } from "next/server";
import { withDB, json, error } from "@/lib/db/api";
import { AdminUserModel } from "@/lib/db/models/AdminUser";
import { DEMO_ADMIN } from "@/lib/admin/data";

export async function POST(request: NextRequest) {
  return withDB(async () => {
    const body = await request.json();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return error("Email and password are required");
    }

    let user = await AdminUserModel.findOne({ email });
    if (!user && email === DEMO_ADMIN.email) {
      user = await AdminUserModel.create({
        email: DEMO_ADMIN.email,
        password: DEMO_ADMIN.password,
        name: DEMO_ADMIN.name,
        role: DEMO_ADMIN.role,
      });
    }

    if (!user || user.password !== password) {
      return error("Incorrect email or password. Please try again.", 401);
    }

    return json({
      email: user.email,
      name: user.name,
      role: user.role,
    });
  });
}
