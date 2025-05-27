export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { verfiyAuthentication } from "@/utils";
import { getUserDashboard } from "../service";

export const GET = async (req: NextRequest) => {
  try {
    const user: any = verfiyAuthentication(req.headers.get("authorization"));
    const data = await getUserDashboard(user.id);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
