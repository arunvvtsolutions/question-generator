export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getAllTopics } from "../query";

export const GET = async () => {
  try {
    const topics = await getAllTopics();
    return NextResponse.json({ success: false, data: topics });
  } catch (error) {
    return NextResponse.json({ success: false, message: error },{ status: 500 });
  }
};
