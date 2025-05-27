import { BASE_URL, GO_HIGH_LEVEL_URL } from "@/config";
import CCAvenue from "@/utils/ccAvenue";
import { NextResponse } from "next/server";
import {
  findPaymentSuccessDatas,
  findProduct,
  findUserTokens,
  getUserPaymentData,
  updatePayment,
  updateTokens,
} from "../query";
import { findUser } from "../../authentication/query";
import { customFetch } from "@/utils";
import { PAYMENT_STATUS } from "@/service/enums/texts";

export async function POST(req: Request, res: Response) {
  try {
    const formData = await req.formData();
    const encResp = formData.get("encResp");
    let marketingBody = {};
    if (encResp) {
      const response = CCAvenue.redirectResponseToJson(encResp);
      const paymentDetails = await getUserPaymentData(
        Number(response.merchant_param1)
      );
      const isOrderSuccess = response.order_status === PAYMENT_STATUS.SUCCESS;
      const isOrderFailed = response.order_status === PAYMENT_STATUS.FAILED;
      const isOrderAborted = response.order_status === PAYMENT_STATUS.ABORTED;
      const result = {
        orderId: response?.order_id,
        trackingId: response?.tracking_id,
        bankReference: response?.bank_ref_no,
        orderStatus: response?.order_status,
        failureMessage: isOrderFailed ? response.status_message : null,
        paymentMode: response?.payment_mode,
        cancelMessage: isOrderAborted ? response?.status_message : null,
        paidAmount: `${response?.amount}`,
        billingName: response?.billing_name,
        otherDetails: JSON.stringify({
          ...response,
        }),
      };
      const [userData, product, paymentSuccessDatas, tokenData] = await Promise.all([
        findUser(Number(response.merchant_param1)),
        findProduct(paymentDetails?.productId || 0),
        findPaymentSuccessDatas(Number(response.merchant_param1),
          response?.order_status?.toLowerCase()
        ),
        findUserTokens(Number(response.merchant_param1))
      ]);
      // for gohihglevel api
      marketingBody = {
        mobile_number: userData?.phone,
        full_name: userData?.name,
        email: userData?.email,
        payment_status: isOrderSuccess ? 2 : isOrderAborted ? 6 : 3,
        payment_plan: product?.productName,
        actual_amount: product?.amount,
        final_amount: response?.amount,
        payment_type: response?.payment_mode,
        purchased_tokens: product?.tokens,
        payment_card_type: null,
        transaction_id: isOrderSuccess ? response?.tracking_id : null,
        purchase_time: new Date(),
        payment_plan_expired: null,
        number_of_transactions: isOrderSuccess ? paymentSuccessDatas.length + 1 : null,
        reason_for_abort : isOrderAborted ? response?.status_message : null,
        actual_tokens: isOrderSuccess ? (tokenData?.remainingTokens || 0) + (product?.tokens || 0) : null,
      };
      await Promise.all([
        customFetch(`${GO_HIGH_LEVEL_URL}/${process.env.WEB_HOOK_ID}`, {
          method: "POST",
          body: JSON.stringify(marketingBody),
          headers: {
            "Content-type": "application/json",
          },
        }),
        updatePayment(paymentDetails?.id || 0, result),
      ]);
      if (isOrderSuccess) {
        await updateTokens(Number(response.merchant_param1),product?.tokens || 0);
        return NextResponse.redirect(`${BASE_URL}/payment/success`, {
          status: 301,
        });
      }
    }
    return NextResponse.redirect(`${BASE_URL}/payment/failed`, { status: 301 });
  } catch (error) {
    return NextResponse.redirect(`${BASE_URL}/payment/failed`, { status: 301 });
  }
}
