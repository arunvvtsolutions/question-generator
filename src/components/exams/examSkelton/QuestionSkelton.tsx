import MainCard from "@/components/common/MainCard";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const QuestionSkelton = () => {
  return (
    <div className="col-span-12">
      <MainCard
        title={
          <div className="flex flex-row justify-between items-center">
            <div className="text-[#101010] text-opacity-[70%] dark:text-[#ffff] flex gap-1">
              <Skeleton className="h-3 w-10 rounded-sm" />
              <span className="text-[#101010] dark:text-[#ffff] font-[600] ">
                <Skeleton className="h-3 w-14 rounded-sm" />
              </span>
            </div>
            <Skeleton className="h-3 w-8 rounded-sm" />
          </div>
        }
      >
        <>
          <Skeleton className="h-3 lg:w-[80%] rounded-sm mb-[6px] " />
          <Skeleton className="h-3 lg:w-[80%] rounded-sm mb-[6px] " />
          <Skeleton className="h-3 lg:w-[80%] rounded-sm mb-[6px]" />
        </>
      </MainCard>
    </div>
  );
};

export default QuestionSkelton;
