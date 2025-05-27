import MainCard from "@/components/common/MainCard";
import { Skeleton } from "@/components/ui/skeleton";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React from "react";

const TopBarSkelton = () => {
  return (
    <div className="fixed top-[7px] w-full left-0 mt-[50px] px-[20px] py-[12px] flex lg:hidden dark:bg-[#0a0a0a] bg-[#ffff] rounded-b-sm z-50">
      <MainCard
        title=""
        className="!p-0 w-full shadow-none"
        contentClassName="!p-[10px] flex justify-between items-center flex-row"
      >
        <>
          <HamburgerMenuIcon className="cursor-pointer" />
          <Skeleton className="h-2 w-10" />
          <div>
            <Skeleton className="h-4 w-8" />
          </div>
        </>
      </MainCard>
    </div>
  );
};

export default TopBarSkelton;
