import Link from 'next/link';
import React from 'react';
import { IFooterProps } from '.';
import { cn } from '@/lib/utils';

const FooterContent = ({
  data,
  className,
}: {
  data: IFooterProps;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col', className)}>
      <h2 className="text-[#101010] text-[20px] font-semibold mb-[20px] text-start dark:text-[#FFF]">
        {data.subjectName}
      </h2>
      <ul className="list-disc leading-[35px]">
        {data.chapters.map((chp, index) => {
          return (
            <li key={`chapter-${index}`}>
              <Link
                href={`/${chp.link}`}
                className="text-[14px] leading-[24px] block text-[#101010] hover:text-[#0b57d0] dark:hover:text-[#0385ff]   dark:text-[#FFFFFFCC] font-normal"
              >
                {chp.name}
              </Link>
            </li>
          );
        })}
      </ul>
     
    </div>
  );
};

export default FooterContent;
