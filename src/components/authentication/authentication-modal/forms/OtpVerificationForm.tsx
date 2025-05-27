'use client';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import OtpFields from './OtpFields';
import Button from '@/components/common/Button';
import { toast } from '@/components/ui/use-toast';
import { FormTypeProps } from '..';
import { userLogin } from '@/context/jwtContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from '@/store';
import { getLocalStorage } from '@/utils';
import { AUTHENTICATION, ERROR } from '@/service/enums/texts';

export type VerificationProps = {
  success: boolean;
  message: string;
  data?: {
    user: { id: number; name: string; email: string };
    accessToken: string;
  };
};

const OtpVerification = ({
  setFormType,
  setOpen,
  isVerificationPath
}: {
  setFormType?: (formType: FormTypeProps) => void;
  setOpen?: (open: boolean) => void;
  isVerificationPath?:boolean
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { phone } = useSelector((state) => state.authReducer);
  const { isInitialized } = useSelector((state) => state.authReducer)

  const [marketingSource, marketingMedium, marketingCampaign] = [
    searchParams.get("utm_source"),
    searchParams.get("utm_medium"),
    searchParams.get("utm_campaign"),
  ];

  const validationSchema = Yup.object({
    otp: Yup.string()
      .min(6, 'OTP number must be exactly 6 digits.')
      .max(6, 'OTP number cannot exceed 6 digits.')
      .required('OTP number is required.'),
  });

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const userPhoneNo = getLocalStorage('userPhoneNo')
      const res = await userLogin(phone || userPhoneNo || '', values.otp, { marketingCampaign, marketingMedium, marketingSource });
      if (res?.success) {
        toast({
          title: AUTHENTICATION.LOGGED_IN_SUCCESSFULL,
          variant: 'default',
          description: AUTHENTICATION.LOGGED_IN_SUCCESS_MESSAGE,
          timeout: 2000,
        });
        setOpen && setOpen(false);
        setFormType && setFormType('signIn');
      } else {
        toast({
          title: AUTHENTICATION.LOGGED_IN_FAILED,
          variant: 'destructive',
          description: typeof res?.message === 'string' ? res?.message: ERROR.SOMETHING_WENT_WRONG,
        });
      }
    },
  });

  // useEffect(() => {
  //   const userPhoneNo = getLocalStorage(AUTHENTICATION.USER_MOB_NO);
  //   (isInitialized && (!phone || !userPhoneNo)) && router.back();
  // }, [phone, router, isInitialized]);

  return (
    <div
      className=" m-auto   max-w-[400px] :"
      data-test-id="otp-verification-card"
    >
      <div className="my-[46px]">
        <h3 className="text-[26px] text-left font-[500] text-[#101010] dark:text-[#FFFF]">
          {AUTHENTICATION.WELCOME}
          <br />
          {AUTHENTICATION.SIGN_IN_CONTINUE}
        </h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
        noValidate
        className="flex justify-center items-center flex-col"
      >
        <div className="pb-[40px] w-full ">
          <div className="w-full lg:max-w-full  xl:px-0 ml-auto mr-auto">
            <label className="text-[16px] font-[400] block text-left !mb-[12px] text-[#101010] dark:text-[#FFFF]">
              {AUTHENTICATION.ENTER_OTP}
            </label>
            <OtpFields
              onChange={(value) => formik.setFieldValue('otp', value)}
              data-test-id="otp-verification-input-field"
              aria-label="Otp Field"
            />
            {formik.touched.otp && formik.errors.otp && (
              <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-2">
                {formik.errors.otp}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button
            text={AUTHENTICATION.CONTINUE}
            ariaLabel="Otp verfication button"
            dataTestId="otp-verification-button"
            className="w-full px-[163px] py-[26px] font-medium text-base max-w-[400px]"
            onClick={() => {}}
          />
        </div>
        <div className="mt-5">
          <p className="text-[14px] font-[400] text-center tracking-[0.30px] ">
            {AUTHENTICATION.WANT_TO_GO_BACK_LOGIN}
            <span
              className="text-[#0A84FF]  cursor-pointer"
              onClick={() => {
                setFormType && setFormType('signUp');
                if (isVerificationPath) router.push('/sign-in');
              }}
            >
              {AUTHENTICATION.CLICK_HERE}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default OtpVerification;
