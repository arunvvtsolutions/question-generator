export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { customFetch, decodeJwt } from "@/utils";
import { createUser, findExistingUser, generateOtp } from "./query";
import { GO_HIGH_LEVEL_URL } from "@/config";

export const GET = async (request: NextRequest) => {

  
  try {
    const authToken = request.headers.get("authorization");
    if (!authToken || !authToken.startsWith("Bearer"))
      return NextResponse.json(
        {
          success: false,
          message: "Couldn't find authtoken or not a valid token",
        },
        { status: 401 }
      );
    const decodedData: any = decodeJwt(authToken);
    const user = await findExistingUser("", decodedData.phone);
    return NextResponse.json({
      success: true,
      data: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
};

export const POST = async (request: Request) => {

  
  try {
    const { marketingData, userData } = await request.json();
    const isUserExist = await findExistingUser(userData.email, userData.phone);

    
    if (isUserExist)
      return Response.json(
        {
          status: false,
          message: `${
            isUserExist.email === userData.email ? "Email" : "Phone No"
          } already exist`,
        },
        { status: 409 }
      );
    const { otpNumber } = await generateOtp(userData.phone);
    await createUser({ ...userData, otp: otpNumber });

    const marketingBody = {
      mobile_number: userData.phone,
      full_name: userData.name,
      email: userData.email,
      City: userData.city,
      State: userData.state,
      Score: userData.targetedScore,
      date_joined: new Date(),
      is_onboard: false,
      mobile_verified: true,
      payment_status: 0,
      marketing_medium: marketingData.marketingMedium,
      marketing_source: marketingData.marketingSource,
      marketing_campaign_name: marketingData.marketingCampaign,
      billing_address_country: "India",
    };
    await customFetch(`${GO_HIGH_LEVEL_URL}/${process.env.WEB_HOOK_ID}`, {
      method: 'POST',
      body: JSON.stringify(marketingBody),
      headers: {
        'Content-type' : 'application/json'
      }
    });
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
};



