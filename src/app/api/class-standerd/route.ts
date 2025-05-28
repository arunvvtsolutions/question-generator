export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getAllClasses } from './query';

export const GET = async (req: NextRequest) => {
  try {
      const data = await getAllClasses();    
      return NextResponse.json({ success: true, data});
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};

