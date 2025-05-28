import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await prisma.streams.findMany({
      where: {
        is_deleted: 0,
      },
    });
    console.log(res);
    const resModal = res?.map((item) => {
        return {
            id: item.s_no,
            streamName: item.stream_name,
            shortUrl: item.short_url,
            employeeId: item.employee_id,
            status: item.status,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
        };
    });
    return NextResponse.json({ success: true, data: resModal });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
