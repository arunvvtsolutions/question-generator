import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const questionTypeList = await prisma.question_types.findMany({
      where:{
        is_deleted: 0,
      }
    });
    const resModal = questionTypeList.map((question) => {
      return {
        id: question.s_no,
        questionType: question.question_type,
        shortUrl: question.short_url,
        status: question.status,
      };
    });
    return NextResponse.json(
      { success: true, data: resModal, status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};
