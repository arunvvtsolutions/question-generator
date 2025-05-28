import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const GET = async () => {
  try {
    const qualities = await prisma.questionQuality.findMany({
      select: {
        id: true,
        credit: true,
        label: true,
        value: true,
      },
    });

    // Convert BigInt IDs to numbers because JSON can't handle BigInt directly
    const qualitiesSafe = qualities.map(({ id, ...rest }) => ({
      id: Number(id),
      ...rest,
    }));

    return NextResponse.json({
      success: true,
      data: qualitiesSafe,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch question qualities." },
      { status: 500 }
    );
  }
};
