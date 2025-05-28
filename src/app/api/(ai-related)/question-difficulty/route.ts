import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const difficulties = await prisma.questionDifficulty.findMany({
      select: {
        id: true,
        difficulty_level: true,
      },
    });

    // Convert BigInt id to number if needed
    const difficultiesSafe = difficulties.map(({ id, ...rest }) => ({
      id: Number(id),
      ...rest,
    }));

    return NextResponse.json({
      success: true,
      data: difficultiesSafe,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch question difficulties." },
      { status: 500 }
    );
  }
};
