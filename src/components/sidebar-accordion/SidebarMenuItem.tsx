import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface SidebarMenuItemProps {
  pathName?: string;
  setOpen?: (open: boolean) => void;
  link?: string;
  linkText?: string;
  icon?: any;
  target?: string;
  aiAnimationColor? : string;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ pathName, setOpen, link, linkText, icon ,target ,aiAnimationColor}) => {
  return (
    <div
      className={cn(
        "lg:border-[0.5px] border-b-[0.5px] border-[#10101017] rounded-md dark:bg-[#0E0E0E] dark:border-transparent  !mb-[18px] "
      )}
      data-id="biology-accordium"
    >
      <Link
        href={link || ''}
        target={target}
        className="text-[16px] text-[#0e0d0d] dark:text-[#fff] ml-[12px] flex py-[15px]"
        onClick={() => setOpen && setOpen(false)}
      >
        <div className={cn(aiAnimationColor ? aiAnimationColor : "",  "flex w-full items-center  ")}>
          <div className="w-[20px]">{icon}</div>
          <p
            className={cn(
              "text-[16px] text-[#0e0d0d] dark:text-[#fff] ml-[12px] font-medium "
              // (pathName.includes('create-study-plan') || pathName.includes('calendar')) &&
              //   '!text-[#0B57D0] dark:!text-[#a6bcf0]'
            )}
          >
            {linkText}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SidebarMenuItem;
