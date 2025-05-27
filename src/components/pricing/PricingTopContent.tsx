"use client";
import React from "react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { PRICING_TITLES } from "@/service/enums/texts";

const PricingTopContent = () => {
  const router = useRouter();
  return (
    <div className="max-w-[1100px] m-auto px-[10px] relative">
      <div className="max-w-[486px] m-auto text-center llg:mb-[50px] mb-[29px]">
        <h3 className="!text-[#101010] dark:!text-[#fff] font-semibold lg:text-[58px] text-[33px] lg:mb-[20px] mb-[12px]">
          {PRICING_TITLES.PRICING_PLANS}
        </h3>
        <p className="text-[#585858] dark:text-[#fff] lg:text-[20px] text-[16px] font-light  text-center">
          {PRICING_TITLES.PRICING_CONTENT}
        </p>
        <p
          className="flex lg:hidden justify-center items-center cursor-pointer mt-3 text-[#101010] font-semibold"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="mr-2 text-[#101010] font-semibold" />
          {PRICING_TITLES.BACK}
        </p>
      </div>
      <Button
        dataTestId="back-to-chat"
        ariaLabel="Back to chat"
        text={PRICING_TITLES.BACK}
        onClick={() => router.back()}
        className="absolute top-0 left-[15px] hidden lg:flex"
        startIcon={<ChevronLeftIcon />}
      />
    </div>
  );
};

export default PricingTopContent;
