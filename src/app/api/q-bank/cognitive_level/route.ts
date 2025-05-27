export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
 
  try {
   const data = await prisma.cognitiveLevel.findMany({
  where: { status: 1, deleteStatus: 0 },
});

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
