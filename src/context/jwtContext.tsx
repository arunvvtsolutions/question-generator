"use client";

import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { DefaultRootStateProps } from "@/types";
import { dispatch, useDispatch, useSelector } from "@/store";
import { Api_endpoint,} from "@/types/enums";
import axios from "@/utils/axios";
import { userLoginSuccess, userLogoutSuccess } from "@/store/slices/auth";
import NextTopLoader from "nextjs-toploader";
import { otpVerification } from "@/utils/api/authentication";
import { VerificationProps } from "@/components/authentication/authentication-modal/forms/OtpVerificationForm";
import { usePathname } from "next/navigation";
import { AUTHENTICATION, COUNTRY_CODE, ERROR } from "@/service/enums/texts";

// constant
export const initialState: DefaultRootStateProps["userProfile"] = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  phone: null,
};

const verifyToken = (serviceToken: string | null) => {
  if (!serviceToken) return false;
  const decoded: any = jwtDecode(serviceToken);
  return decoded.exp > Date.now() / 1000;
};

export async function userLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem(AUTHENTICATION.USER_MOB_NO);
  localStorage.removeItem(AUTHENTICATION.USER_FROM_WEB)
  dispatch(userLogoutSuccess());
}

export async function userLogin(
  phoneNo?: string,
  otp?: string,
  marketingData?:any
): Promise<VerificationProps | undefined> {
  try {
    const res = await otpVerification(
      `${COUNTRY_CODE.INDIA}${phoneNo}`,
      `${otp}`,
      marketingData
    );
    if (res?.success) {
      localStorage.setItem("accessToken", `${res?.data?.accessToken}`);
      localStorage.removeItem(AUTHENTICATION.USER_MOB_NO);
      dispatch(userLoginSuccess(res?.data?.user));
    }
    return res;
  } catch (error) {
    return { success: false, message: ERROR.SOMETHING_WENT_WRONG };
  }
}

// ==============================|| PROVIDER ||============================== //

const JWTProvider = () => {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state) => state.authReducer);
  const path = usePathname();

  useEffect(() => {
    const init = async () => {
      const serviceToken = localStorage.getItem("accessToken");
      if (serviceToken && verifyToken(serviceToken)) {
        try {
          const res = await axios.get(`/${Api_endpoint.user_auth}`);
          dispatch(userLoginSuccess(res.data?.data));
        } catch {
          dispatch(userLogoutSuccess());
        }
      } else {
        dispatch(userLogoutSuccess());
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isInitialized) {
    return <NextTopLoader />;
  }

  return;
};

export default JWTProvider;
