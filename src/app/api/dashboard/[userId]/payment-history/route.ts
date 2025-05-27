import { NextRequest, NextResponse } from "next/server";
import { getPaymentHistory } from "../../query";
import { ERROR } from "@/service/enums/texts";

export const GET = async (req: NextRequest, route: { params: { userId: string }}) => {
  try {
    const history = await getPaymentHistory(Number(route.params.userId));
    return NextResponse.json({ success: true, data: history });
  } catch (error) { 
    return NextResponse.json({ success: false, message: ERROR.SOMETHING_WENT_WRONG, error }, { status: 500 });
  }
};
