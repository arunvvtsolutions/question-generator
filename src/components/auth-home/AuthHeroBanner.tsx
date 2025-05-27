import MainCard from "@/components/common/MainCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthHeroBanner = ({ createStudPlan }: { createStudPlan: boolean }) => {
  return (
    <MainCard
      className="shadow-none lg:mt-[70px] mb-[40px] lg:!pe-[300px] lg:!ps-[40px] !ps-[20px] !pe-[130px] border-none bg-[#F6F0FF] dark:bg-[#F6F0FF] !pl-[30px] !pt-[30px] rounded-[25px] relative"
      title={<></>}
    >
      <>
        <div>
          <h1 className="font-bold text-[14px] lg:text-[33px] text-[#101010]">“Design Your Path to NEET Success”</h1>

          <div className=" !bg-[#7C64A1] max-w-[fit-content] rounded-[28px] h-full lg:mt-[30px] mt-[14px]">
            <Link
              href={createStudPlan ? "/create-study-plan/2" : '/study-plan/calendar'}
              prefetch={false}
              className="flex flex-row items-center rounded-[28px] text-[#FFFF] text-[14px] lg:text-[16px] px-[18px] py-[12px]"
            >
              {createStudPlan ? 'Create Your Task' : "Start Your Journey"}
            </Link>
          </div>
        </div>

        <Image
          src="/images/authillu.webp"
          alt="Chat-ai"
          className="absolute bottom-[0] right-[0]  md:w-auto !w-[130px] lg:!w-[260px] "
          fetchPriority="high"
          loading="eager"
          priority
          width={150}
          height={150}
        />
      </>
    </MainCard>
  );
};

export default AuthHeroBanner;
