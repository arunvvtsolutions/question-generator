import { NextResponse } from "next/server";
import { findProduct, phonePeInitialization } from "../query";
import { customFetch, decodeJwt } from "@/utils";
import { GO_HIGH_LEVEL_URL } from "@/config";
import { ERROR } from "@/service/enums/texts";

export const POST = async (request: Request) => {
  try {
    const authToken = request.headers.get("authorization");
    if (!authToken || !authToken.startsWith("Bearer"))
      return NextResponse.json(
        { success: false, message: ERROR.NOT_A_VALID_USER },
        { status: 401 }
      );
    const decodedData: any = decodeJwt(authToken);
    const bodyData = await request.json();
    await phonePeInitialization({ ...bodyData, userId: decodedData.id });
    const product = await findProduct(bodyData.productId);
    const marketingBody = {
      mobile_number: decodedData.phone,
      full_name: decodedData.name,
      email: decodedData.email,
      payment_status: 1,
      payment_plan: product?.productName,
      actual_amount: bodyData.planAmount,
      final_amount: bodyData.totalAmount,
      coupon_code: bodyData.coupon_id,
      payment_type: null,
      purchased_tokens: null,
      payment_card_type: null,
      payment_plan_expired: null,
      actual_tokens: null,
    };
    const res = await customFetch(`${GO_HIGH_LEVEL_URL}/${process.env.WEB_HOOK_ID}`, {
      method: "POST",
      body: JSON.stringify(marketingBody),
      headers: {
        "Content-type": "application/json",
      },
    });
    return NextResponse.json({ success: true, message: "Payment Initialized", marketingBody, res });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
};
