import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import MainCard from "@/components/common/MainCard";
import ChatIcon from "@/components/icons/ChatIcon";
import image from "@/../public/images/chatbot.webp";
import { cn } from "@/lib/utils";
import { HOMEPAGE } from "@/service/enums/texts";

const HeroBanner = ({ className, botImg }: { className?: string; botImg?: StaticImageData }) => {
  return (
    <MainCard
      className={cn(
        "shadow-none border-none bg-[#CCFDD0] dark:bg-[#CCFDD0] !pl-[30px] !pt-[30px] rounded-[25px] relative",
        className
      )}
      title={
        <>
          <h1 className="font-bold text-[26px] lg:text-[33px] text-[#101010]">
            {HOMEPAGE.ULTIMATE} <span className="text-[#0B57D0]">{HOMEPAGE.NEET_PARTNER}</span>{" "}
          </h1>
          <h1 className="font-bold text-[26px] lg:text-[33px] !mt-0 text-[#101010]">{HOMEPAGE.GUIDENCE_AT_FIGER_TIP}</h1>
        </>
      }
    >
      <>
        <p className="text-[16px] text-[#101010]">{HOMEPAGE.ASK_DOUBTS}</p>
        <div className=" !bg-[#0B57D0] max-w-[fit-content] rounded-[28px] h-full mt-[30px]">
          <Link
            href="/ask-about-admissions"
            prefetch={false}
            className="flex flex-row items-center rounded-[28px] text-[#FFFF] px-[18px] py-[12px]"
          >
            <ChatIcon /> <p className="ml-2 text-[16px]">{HOMEPAGE.CHAT_NOW}</p>
          </Link>
        </div>
        <Image
          src={botImg || image}
          alt="Chat-ai"
          className="absolute bottom-[0] right-[0] w-[140px] md:w-auto"
          fetchPriority="low"
          loading="lazy"
          priority={false}
        />
      </>
    </MainCard>
  );
};

export default HeroBanner;
