import RightArrow from "@/components/icons/RightArrow";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { IContentList } from "./Content";

interface IContentCardProps {
  name: string;
  logo: React.ReactNode;
  className?: string
}
const ContentCard: React.FC<IContentList> = ({ logo, name, className,id }) => {
  const clonedLogo = React.cloneElement(logo as React.ReactElement, {
    className: "dark:fill-[#FFFFFF] dark:group-hover:fill-[#101010]",
    fill: "dark:group-hover:fill-[#101010]",
  });
  return (
    <>
      <Card
        className={cn(`px-[24px] py-[22px] bg-[#F5F5F580] border-0 grid grid-cols-12 rounded-[10px]  dark:bg-[#000000] group cursor-pointer shadow-sm`,  className)}
        aria-label={`${name}`}
        data-test-id={`${name}-card`}
      >
        <div className="flex items-center gap-3 col-span-11">
          <div className="w-[26px]">{clonedLogo}</div>
          <h3 className="font-normal md:text-lg lg:text-lg !text-[#101010] dark:!text-[#FFFFFF] text-base cursor-pointer hover:!text-[#192B69] dark:group-hover:!text-[#101010] ">
            {name}
          </h3>
        </div>
        <div
          className="col-span-1 flex items-center justify-end"
          data-test-id={`${name}-card-arrow`}
        >
          <RightArrow
            size="size-5"
            stroke={2.5}
            color="#101010"
            className={cn(id === 'doubt-module' ? 'stroke-[#c04c8a]' : 'group-hover:stroke-black ')}
          />
        </div>
      </Card>
    </>
  );
};
export default ContentCard;
