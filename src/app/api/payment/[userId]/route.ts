import { sha256 } from "node-forge";
import { NextResponse } from "next/server";

import { BASE_URL, GO_HIGH_LEVEL_URL } from "@/config";
import { phonePePaymentStatusRequest } from "@/utils/api/payment";
import { findPaymentSuccessDatas, findProduct, findUserTokens, getUserPaymentData, updatePayment, updateTokens } from "../query";
import { IUpdatePaymentProps } from "@/types/payment";
import { findUser } from "../../authentication/query";
import { customFetch } from "@/utils";
import { PAYMENT } from "@/service/enums/texts";

export async function POST( req: Request, router: { params: { userId: string } }
) {
  try {
    const paymentDetails = await getUserPaymentData(Number(router.params.userId));
    const data = await req.formData();
    const merchantId = data.get(PAYMENT.MERCHANT_ID);
    const transactionId = data.get(PAYMENT.TRANSACTION_ID);

    const md = sha256.create();
    const saltKey = process.env.NEXT_PUBLIC_PHONE_PE_SALT_KEY;
    const st = `/pg/v1/status/${merchantId}/${transactionId}${saltKey}`;
    md.update(st, "utf8");
    const dataSha256 = md.digest().toHex();
    const checksum = `${dataSha256}###${process.env.NEXT_PUBLIC_PHONE_PE_SALT_INDEX}`;

    const response = await phonePePaymentStatusRequest(
      merchantId,
      transactionId,
      checksum
    );

    const result: IUpdatePaymentProps = {
      bankReference: response.data.paymentInstrument.bankTransactionId,
      orderStatus: response.data.responseCode,
      failureMessage: !response.success ? response.message : null,
      paymentMode: response.data.paymentInstrument.type,
      cancelMessage: !response.success ? response.message : null,
      paidAmount: `${response.data.amount}`,
      otherDetails: JSON.stringify({
        ...response.data,
        ...data,
        csTransactionId: transactionId,
      }),
    };
    const isOrderSuccess = response.code === PAYMENT.PAYMENT_SUCCESS_STATUS
    const [userData, product, paymentSuccessDatas, updatePaymentStatus, tokenData] = await Promise.all([
      findUser(Number(paymentDetails?.userId)),
      findProduct(paymentDetails?.productId || 0),
      findPaymentSuccessDatas(Number(paymentDetails?.userId),response?.order_status?.toLowerCase()),
      updatePayment(paymentDetails?.id || 0, result),
      findUserTokens(Number(paymentDetails?.userId))
    ]);
    // for gohighlevel api, 
    const marketingBody = {
      mobile_number: userData?.phone,
      full_name: userData?.name,
      email: userData?.email,
      payment_status: isOrderSuccess ? 2 : 3,
      payment_plan: product?.productName,
      actual_amount: product?.amount,
      final_amount: response.data.amount,
      payment_type: response.data.paymentInstrument.type,
      purchased_tokens: product?.tokens,
      payment_card_type: null,
      transaction_id: isOrderSuccess ? response?.tracking_id : null,
      purchase_time: new Date(),
      payment_plan_expired: null,
      number_of_transactions: isOrderSuccess ? paymentSuccessDatas.length + 1 : null,
      actual_tokens: isOrderSuccess ? (tokenData?.remainingTokens || 0) + (product?.tokens || 0) : null,
    };
    customFetch(`${GO_HIGH_LEVEL_URL}/${process.env.WEB_HOOK_ID}`, {
      method: "POST",
      body: JSON.stringify(marketingBody),
      headers: {
        "Content-type": "application/json",
      },
    })
    if (isOrderSuccess) {
      await updateTokens(Number(router.params.userId), product?.tokens || 0);
      return NextResponse.redirect(`${BASE_URL}/payment/success`, { status: 301 });
    } else
      return NextResponse.redirect(`${BASE_URL}/payment/failed`, {
        status: 301,
      });
  } catch (error) {
    return NextResponse.redirect(`${BASE_URL}/payment/failed`, { status: 301 });
  }
}
