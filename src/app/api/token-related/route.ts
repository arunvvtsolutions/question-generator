export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get("userId");

    if (!userIdParam) {
      return NextResponse.json(
        { success: false, message: "Missing 'userId' query parameter" },
        { status: 400 }
      );
    }

    const userId = Number(userIdParam);
    if (isNaN(userId) || userId <= 0) {
      return NextResponse.json(
        { success: false, message: "'userId' must be a valid positive number" },
        { status: 400 }
      );
    }

    const data = await prisma.tokens.findFirst({
      where: { userId },
      select: {
        id: true,
        totalTokens: true,
        remainingTokens: true,
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
