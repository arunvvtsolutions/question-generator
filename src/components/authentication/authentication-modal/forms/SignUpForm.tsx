"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@/components/common/Button";
import { FormTypeProps } from "..";
import { createUser, postSignIn } from "@/utils/api/authentication";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "@/store";
import { userMobileNumber } from "@/store/slices/auth";
import { setLocalStorage } from "@/utils";
import { AUTHENTICATION, COUNTRY_CODE } from "@/service/enums/texts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SignUpForm = ({
  setFormType,
  isSignUpPage,
}: {
  setFormType?: (formType: FormTypeProps) => void;
  isSignUpPage?: boolean;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [marketingSource, marketingMedium, marketingCampaign] = [
    searchParams.get("utm_source"),
    searchParams.get("utm_medium"),
    searchParams.get("utm_campaign"),
  ];

  const [processing, setProcessing] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Name must contain atleast 3 letters").required("Name is required."),
    email: Yup.string().email("Not a valid email").required("Email is required."),
    phone: Yup.string()
      .min(10, "Mobile number must be exactly 10 digits.")
      .max(10, "Mobile number cannot exceed 10 digits.")
      .required("Mobile number is required."),

    role: Yup.string().required("Please select a role."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      
      setProcessing(true);
      const res = await createUser(
        {
          ...values,
          phone: `${COUNTRY_CODE.INDIA}${values.phone}`,
          otp: 0,
        },
        { marketingCampaign, marketingMedium, marketingSource }
      );
      if (res?.success) {
        await dispatch(userMobileNumber(values.phone));
        setLocalStorage(AUTHENTICATION.USER_MOB_NO, values.phone);
        if (isSignUpPage)
          router.replace(
            `/otp-verification?utm_source=${marketingSource}&utm_medium=${marketingMedium}&utm_campaign=${marketingCampaign}`
          );
        setFormType && setFormType("verification");
      } else {
        setProcessing(false);
        toast({
          title: AUTHENTICATION.LOGGED_IN_FAILED,
          variant: "destructive",
          description: res?.message,
        });
      }
    },
  });

  return (
    <div
      className="w-11/12 md:w-1/2 lg:max-w-[400px] lg:mt-[40px] mt-[20px] mb-[20px]  ml-auto mr-auto"
      data-test-id="sign-up-form-card"
    >
      <div className="lg:mt-[40px] mt-[25px] lg:mb-[46px] mb-[20px]">
        <h3 className="text-[26px] font-[500] text-center dark:text-[#FFFF]">
          {AUTHENTICATION.WELCOME} <br /> {AUTHENTICATION.SIGN_UP_CONTINUE}
        </h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          !processing && formik.handleSubmit();
        }}
        noValidate
      >
        <div className="pb-[20px]">
          <div className="mb-[20px]">
            <Select onValueChange={(value) => formik.setFieldValue("role", value)} value={formik.values.role}>
              <SelectTrigger className="h-[48px] mt-[5px] text-[#333] border border-gray-300 rounded-md">
                <SelectValue placeholder="Choose your role" className="text-[#333]" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md">
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="student" className="text-[#555] hover:bg-gray-100 cursor-pointer px-3 py-2">
                    Student
                  </SelectItem>
                  <SelectItem value="faculty" className="text-[#555] hover:bg-gray-100 cursor-pointer px-3 py-2">
                    Faculty
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.role && formik.errors.role && (
              <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-2">{formik.errors.role}</p>
            )}
          </div>
          <div className="mb-[20px]">
            <Input
              aria-label="Name input "
              data-test-id="name-input-label"
              name="name"
              type="text"
              id="user_name"
              onChange={formik.handleChange}
              placeholder="Enter your Name"
              className="h-[48px] mt-[5px]"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-2">{formik.errors.name}</p>
            )}
          </div>
          <div className="mb-[20px]">
            <Input
              aria-label="email input "
              data-test-id="email-input-label"
              name="email"
              type="email"
              id="user_email"
              onChange={formik.handleChange}
              placeholder="Enter your Email"
              className="h-[48px] mt-[5px]"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-2">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-[20px]">
            <Input
              aria-label="Phone input"
              data-test-id="phone-input-label"
              name="phone"
              type="number"
              id="mobile_no"
              onChange={formik.handleChange}
              placeholder="Enter your Mobile no"
              className="h-[48px] mt-[5px]"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-[#f04749] font-[500] text-[14px] mx-2 mt-2">{formik.errors.phone}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center lg:mt-[40px] mt-[20px]">
          <Button
            disabled={processing}
            text={AUTHENTICATION.CONTINUE}
            ariaLabel="SignUp continue button"
            dataTestId="sign-up-continue-button"
            className="w-full h-[48px] font-medium text-base"
            onClick={() => {}}
          />
        </div>
        <div className="mt-5">
          <p className="text-[14px] font-[400] text-center tracking-[0.30px]">
            {AUTHENTICATION.ALREADY_ACC_EXIST}{" "}
            <span
              className="text-[#1976D2]  cursor-pointer"
              onClick={() => {
                setFormType && setFormType("signIn");
                isSignUpPage && router.push("/sign-in");
              }}
              aria-label="Already have an account, Click here"
              data-test-id="already-have-an-account"
            >
              {AUTHENTICATION.SIGN_IN}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
