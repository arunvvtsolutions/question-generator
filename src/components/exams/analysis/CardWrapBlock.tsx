import React, { ReactNode } from 'react';

interface CardBlockProps {
  children: ReactNode;
  title: string;
}
const CardWrapBlock: React.FC<CardBlockProps> = ({ children, title }) => {
  return (
    <div className="lg:mb-[40px] mb-[30px]">
      <h1 className="mb-[24px] text-[20px] lg:mb-[24px] text-[#101010] dark:text-[#fff] leading-[24.2px] font-semibold">
        {title}
      </h1>
      {children}
    </div>
  );
};

export default CardWrapBlock;
