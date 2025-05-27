import { NextRequest, NextResponse } from "next/server";
import { generateAiQuestionsService } from "../service";
import { IGenrateQstBodyProps } from "@/types/generate-questions";
import { verfiyAuthentication } from "@/utils";



export const POST = async (request: Request) => {
  try {
    const user: any = verfiyAuthentication(request.headers.get("authorization"));

    if (user.status === 401) return user;
    const body: IGenrateQstBodyProps = await request.json();
    
    const data = await generateAiQuestionsService(user.id, body);

    
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
