import { NextRequest, NextResponse } from "next/server";
import { verfiyAuthentication } from "@/utils";
import { getAllAiQuestions } from "../query";

export const GET = async (request: NextRequest) => {

  try {
    const user: any = verfiyAuthentication(request.headers.get("authorization"));
    if (user.status === 401) return user; 
    const data = await getAllAiQuestions(user.id);
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};