export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { verfiyAuthentication } from "@/utils";
import { getGeneratedQuestions } from "../../query";


export const GET = async (request: NextRequest) => {
  try {
    const user: any = verfiyAuthentication(request.headers.get("authorization"));
    if (user.status === 401) return user;

    // ✅ Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));
    const uuid = searchParams.get("uuId");

    if (!userId || !uuid) {
      return NextResponse.json({ success: false, message: "Missing userId or uuId" }, { status: 400 });
    }

    // ✅ Call your service/query function
    const data = await getGeneratedQuestions(userId, uuid);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
