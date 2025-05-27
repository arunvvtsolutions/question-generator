export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { validatingUserOtp } from "../query";
import { customFetch, generateJwt } from "@/utils";
import { GO_HIGH_LEVEL_URL } from "@/config";

// params are phone number and otp
export const GET = async (request: NextRequest) => {
  try {
    const params = request.nextUrl.searchParams;
    const [phone, otp, marketingSource, marketingMedium, marketingCampaign] = [
      params.get("phone"),
      params.get("otp"),
      params.get("marketingSource"),
      params.get("marketingMedium"),
      params.get("marketingCampaign"),
    ];
    if (phone && otp) {
      const user = await validatingUserOtp(phone, Number(otp));

      if (user) {
        const tokenData = {
          id: user.id,
          name: user.name,
          phone: user.phone,
        };
        const accessToken = await generateJwt(tokenData);
        const marketingBody = {
          mobile_number: user.phone,
          full_name: user.name,
          email: user.email,
          last_login_time: new Date(),
          last_login_medium: "phone",
          is_onboard: true,
          payment_status: 4,
          marketing_medium: marketingMedium,
          marketing_source: marketingSource,
          marketing_campaign_name: marketingCampaign,
        };
        await customFetch(`${GO_HIGH_LEVEL_URL}/${process.env.WEB_HOOK_ID}`, {
          method: "POST",
          body: JSON.stringify(marketingBody),
          headers: {
            "Content-type": "application/json",
          },
        });
        return Response.json({
          success: true,
          message: "Successfully logged",
          data: {
            user: { id: user.id, name: user.name, email: user.email },
            accessToken,
          },
        });
      }
    }
    return NextResponse.json(
      { success: false, message: "Wrong OTP or Mobile no" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
};
