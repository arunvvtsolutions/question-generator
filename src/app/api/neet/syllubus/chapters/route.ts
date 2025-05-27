export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getAllChapters } from "../query";

export const GET = async () => {
  try {
    const chapters = await getAllChapters();
    return NextResponse.json({ success: false, data: chapters });
  } catch (error) {
    return NextResponse.json({ success: false, message: error },{ status: 500 });
  }
};
