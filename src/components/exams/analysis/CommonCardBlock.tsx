import React, { FC, ReactNode } from 'react';

interface ICommonCardBlockProps {
  children: ReactNode;
  className: string;
}

const CommonCardBlock: FC<ICommonCardBlockProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`${className} lg:p-[20px] p-[16px] gap-2 bg-white border border-[#101010]/[15%] dark:border-[#fff]/[15%] dark:bg-[#171717]  rounded-[15px]`}
    >
      {children}
    </div>
  );
};

export default CommonCardBlock;
