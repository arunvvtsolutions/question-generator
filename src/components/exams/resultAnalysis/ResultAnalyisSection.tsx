import React, { FC, ReactNode } from 'react';

interface IResultAnanlysiSecProps {
  title?: string;
  children: ReactNode;
  styleClass?:string
}
const ResultAnalyisSection: FC<IResultAnanlysiSecProps> = ({ children, title, styleClass }) => {
  return (
    <div className={`border-b mb-[20px] ${styleClass}`}>
      <h1 className="lg:text-[25px] font-bold text-[16px] !text-[#101010]/[90%] dark:!text-white mb-5">{title}</h1>
      {children}
    </div>
  );
};

export default ResultAnalyisSection;
