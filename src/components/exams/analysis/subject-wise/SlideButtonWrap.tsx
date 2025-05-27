import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import React from 'react';

// Custom Next Button Component
export const NextArrow = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`absolute bottom-[0px] right-3 w-[48px] h-[48px] border cursor-pointer lg:flex items-center justify-center hover:bg-[#F5F5F5] bg-[#Fff] dark:bg-[#000] dark:hover:bg-[#ffff]/[20%] border-[#101010]/20%]  dark:border-[#fff]/40%] rounded-[4px] hidden`}
    >
      <ChevronRightIcon className="dark:text-[#fff] text-[#000]" />
    </div>
  );
};

// Custom Previous Button Component
export const PrevArrow = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={` -translate-x-[60px] absolute bottom-[0px] right-2 z-10 w-[48px] h-[48px] border lg:flex items-center justify-center cursor-pointer hover:bg-[#F5F5F5] bg-[#Fff] border-[#101010]/20%] dark:border-[#fff]/40%] dark:bg-[#000] dark:hover:bg-[#ffff]/[20%] rounded-[4px] hidden`}
    >
      <ChevronLeftIcon />
    </div>
  );
};
