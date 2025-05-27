import React from "react";
import MainCard from "../common/MainCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import RightAngleIcon from "../icons/RightAngle";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface IContentProps {
  icon: React.JSX.Element;
  title: string;
  link: string;
  className?: string;
}

const Card = ({
  title,
  content,
  className,
  titleClass,
  showAllLInk,
}: {
  title: string;
  titleClass?: string;
  className?: string;
  showAllLInk?: string;
  content: IContentProps[];
}) => {
  return (
    <MainCard
      cardAction={
        <div className="flex justify-end items-center w-full">
          {showAllLInk && (
            <Link href={showAllLInk} className=" justify-center items-center flex lg:hidden">
              <p className="text-[#0385ff] text-[14px]">Show All</p> <ChevronRightIcon className="w-[18px] h-[25px] text-[#0385ff]" />
            </Link>
          )}
        </div>
      }
      title={
        <div className="flex justify-between flex-nowrap">
          <h3 className={cn(`text-[16px] lg:text-[24px] font-[600] dark:!text-[#fff]`, titleClass)}>{title}</h3>
          {showAllLInk && (
            <Link href={showAllLInk} className=" justify-center items-center hidden lg:flex">
              <p className="text-[#0385ff]">Show All</p> <ChevronRightIcon className="w-[22px] h-[25px] text-[#0385ff]" />
            </Link>
          )}
        </div>
      }
      className="shadow-none"
      contentClassName="lg:px-[40px]"
    >
      <div className={cn("grid grid-cols-4 gap-4 ", className)}>
        {content.map((d, index) => {
          return (
            <Link href={d.link} key={index}>
              <div className=" flex-col justify-center items-center gap-2 flex">
                <div
                  className={cn(
                    "lg:w-[56px] lg:h-[56px] w-[32px] h-[32px] flex justify-center items-center bg-[#F4F4F4] dark:bg-[#0e0e0e] rounded-[12px] ",
                    d.className
                  )}
                >
                  {d.icon}
                </div>{" "}
                <p className="text-center text-[12px] lg:text-[16px] text-[#101010B2] font-[500] dark:text-[#fff]">{d.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </MainCard>
  );
};

export const CardSkelton = () => {
  return (
    <MainCard title={<Skeleton className="w-[250px] h-[10px]" />} className="shadow-none" contentClassName="lg:px-[40px]">
      <div className="flex flex-wrap gap-2 justify-between w-full">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="lg:w-[56px] lg:h-[56px] w-[32px] h-[32px] flex justify-center items-center bg-[#F4F4F4] dark:bg-[#0e0e0e] rounded-[12px]">
            <Skeleton className="h-[25px] w-[25px] rounded-lg]" />
          </div>
          <p className="text-center text-[12px] lg:text-[16px] text-[#101010B2] font-[500] dark:text-[#fff]">
            <Skeleton className="w-[100px] h-[10px]" />
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="lg:w-[56px] lg:h-[56px] w-[32px] h-[32px] flex justify-center items-center bg-[#F4F4F4] dark:bg-[#0e0e0e] rounded-[12px]">
            <Skeleton className="h-[25px] w-[25px] rounded-lg]" />
          </div>
          <p className="text-center text-[12px] lg:text-[16px] text-[#101010B2] font-[500] dark:text-[#fff]">
            <Skeleton className="w-[100px] h-[10px]" />
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="lg:w-[56px] lg:h-[56px] w-[32px] h-[32px] flex justify-center items-center bg-[#F4F4F4] dark:bg-[#0e0e0e] rounded-[12px]">
            <Skeleton className="h-[25px] w-[25px] rounded-lg]" />
          </div>
          <p className="text-center text-[12px] lg:text-[16px] text-[#101010B2] font-[500] dark:text-[#fff]">
            <Skeleton className="w-[100px] h-[10px]" />
          </p>
        </div>
      </div>
    </MainCard>
  );
};

export default Card;
