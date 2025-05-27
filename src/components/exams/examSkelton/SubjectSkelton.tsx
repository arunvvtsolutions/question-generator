import MainCard from "@/components/common/MainCard";
import { cn } from "@/lib/utils";
import React from "react";

const SubjectSkelton = () => {
  return (
    <div className="flex flex-col gap-2">
      <MainCard
      title=""
      className={cn("cursor-pointer flex flex-row  shadow-none col-span-12 ")}
      contentClassName="!p-0 flex flex-row w-full items-center"
    >
      <></>
    </MainCard>
    <MainCard
      title=""
      className={cn("cursor-pointer flex flex-row  shadow-none col-span-12 ")}
      contentClassName="!p-0 flex flex-row w-full items-center"
    >
      <></>
    </MainCard>
    <MainCard
      title=""
      className={cn("cursor-pointer flex flex-row  shadow-none col-span-12 ")}
      contentClassName="!p-0 flex flex-row w-full items-center"
    >
      <></>
    </MainCard>
    </div>
  );
};

export default SubjectSkelton;
