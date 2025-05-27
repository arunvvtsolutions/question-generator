import MainCard from "@/components/common/MainCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

const OptionSkelton = () => {
  return (
    <div className="col-span-12 grid grid-cols-12 gap-5 mt-5">
      <MainCard
        title=""
        className={cn("cursor-pointer flex flex-row  shadow-none col-span-12 ")}
        contentClassName="!p-0 flex flex-row w-full items-center"
      >
        <>
          <div
            className={cn(
              "w-[40px] lg:h-[40px] h-[37px] flex justify-center items-center text-center rounded-md "
            )}
          >
            <Skeleton className="h-10  w-10 rounded-sm mb-1 " />
          </div>
          <div className={cn(" w-full px-[16px] flex items-center flex-col")}>
            <Skeleton className="h-2  lg:w-[90%] w-full rounded-sm mb-1 " />
            <Skeleton className="h-2  lg:w-[90%] w-full rounded-sm " />
          </div>
        </>
      </MainCard>
    </div>
  );
};

export default OptionSkelton;
