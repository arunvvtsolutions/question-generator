import { VerificationProps } from "@/components/authentication/authentication-modal/forms/OtpVerificationForm";
import { CreateUserProps } from "@/types/auth";
import { Api_endpoint } from "@/types/enums";
import axios from "axios";

export const postSignIn = async (
  phone: string
): Promise<{ success: boolean; message: string } | undefined> => {
  try {
    const res = await axios.get(`/${Api_endpoint.user_signIn}?phone=${phone}`);
    return res.data;
  } catch (error: any) {
    return (
      error?.response?.data || {
        success: false,
        message: "Something went wrong, Please try again later",
      }
    );
  }
};

export const otpVerification = async (
  phone: string,
  otp: string,
  marketingData?: any
): Promise<VerificationProps | undefined> => {
  try {
    const res = await axios.get(
      `/${Api_endpoint.user_verification}?phone=${phone}&otp=${otp}&marketingCampaign=${marketingData.marketingCampaign}&marketingMedium=${marketingData.marketingMedium}&marketingSource=${marketingData.marketingSource}`
    );
    return res.data;
  } catch (error: any) {
    return (
      error?.response?.data || {
        success: false,
        message: "Something went wrong, Please try again later",
      }
    );
  }
};

export const createUser = async (
  userData: CreateUserProps,
  marketingData: any
) => {
  try {
    const res = await axios.post(`/${Api_endpoint.user_auth}`, {
      userData,
      marketingData,
    });
    return res.data;
  } catch (error: any) {
    return (
      error?.response?.data || {
        success: false,
        message: "Something went wrong, Please try again later",
      }
    );
  }
};
