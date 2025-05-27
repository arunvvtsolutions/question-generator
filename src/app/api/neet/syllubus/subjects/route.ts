export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getAllSubjects } from "../query";

export const GET = async () => {
  try {
    const subjects = await getAllSubjects();
    return NextResponse.json({ success: false, data: subjects });
  } catch (error) {
    return NextResponse.json({ success: false, message: error },{ status: 500 });
  }
};
