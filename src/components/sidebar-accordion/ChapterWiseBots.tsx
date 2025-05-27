import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import botLogo from '../../../public/images/bot-icon.png' ;
import { useRouter } from "next/navigation";

interface ChapterWiseBotsProps {
  pathName: string;
  setOpen?: (open: boolean) => void;
  link: string; 
  linkText: string; 
}
const ChapterWiseBots: React.FC<ChapterWiseBotsProps> = ({ pathName, setOpen, link,linkText }) => {
  const router = useRouter();

   const handleNavigation = (e: React.MouseEvent) => {
      if (setOpen) setOpen(false);
      router.push(link); 
      router.refresh();
    };
  return (
    <div
      className={cn(
        "lg:border-[0.5px] border-b-[0.5px] border-[#10101017] rounded-t-md dark:bg-[#0E0E0E] dark:border-transparent mb-[16px]",
        pathName.includes(link) && "bg-[#edf1fb]"
      )}
      data-test-id="biology-accordium"
    >
      <a
        href={link}
        className="text-[16px] text-[#0e0d0d] dark:text-[#fff] ml-[12px] flex py-[15px]"
        onClick={handleNavigation}
      >
        <div className="flex w-full items-center neet-mentor-div">
          <div className="w-[20px]">
          <Image
            src={botLogo}
            alt=" logo"
            height={10}
            className="!w-3.5"
          />
          </div>
          <p className="text-[16px] text-[#0e0d0d] dark:text-[#fff] ml-[12px] font-medium ">{linkText}</p>
        </div>
      </a>
    </div>
  );
};

export default ChapterWiseBots;
