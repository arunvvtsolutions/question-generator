import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const aiModels = await prisma.ai_models.findMany({});
    const resModal = aiModels.map((modal) => {
      return {
        id: modal.s_no,
        name: modal.model_name,
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
