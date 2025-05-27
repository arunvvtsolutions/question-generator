'use client';
import React, { useState } from 'react';
import RightArrow from '@/components/icons/RightArrow';
import { SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { IChapterDetailsProps, ISubjectDetailsProps } from '@/types';
import { HOMEPAGE } from '@/service/enums/texts';

const Introduction = ({
  data,
  setIntroductionData,
}: {
  data: ISubjectDetailsProps[];
  setIntroductionData: (item: {
    chapter: IChapterDetailsProps;
    subject: ISubjectDetailsProps;
  }) => void;
}) => {
  const [open, setOpen] = useState<boolean[]>(
    new Array(data?.length).fill(false)
  );
  const handleOpen = (index: number) => {
    setOpen((prev) => {
      const newOpen = [...prev];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };
  const handleClick = (
    item: IChapterDetailsProps,
    sub: ISubjectDetailsProps
  ) => {
    setIntroductionData({ chapter: item, subject: sub });
  };
  return (
    <>
      {data.map((subject: ISubjectDetailsProps, index: number) => (
        <div
          key={index}
          className="p-4 md:p-3 md:pr-0"
          data-test-id={`${subject.name}-introduction-card`}
        >
          <h1
            className="lg:text-[33px] text-[24px] font-bold text-left mb-4"
            data-test-id={`subject-title-${subject.name}`}
          >
            {subject.name}
          </h1>
          <div
            className={`scrollbar-thin transition-all ${
              open[index]
                ? 'h-[265px] overflow-auto pr-2'
                : 'h-[200px] overflow-hidden'
            }`}
          >
            <ul className="space-y-2">
              {subject.chapters?.map(
                (item: IChapterDetailsProps, chapterIndex: number) => (
                  <li
                    key={chapterIndex}
                    className="border-b py-2"
                    data-test-id={`subject-List-${item.chapterName}`}
                    onClick={() => handleClick(item, subject)}
                    aria-label={`${item.chapterName} Details`}
                  >
                    <SheetTrigger
                      className="group-hover:!text-[#0B57D0] flex justify-between items-center  w-full"
                      data-test-id={`${item.chapterName}-details`}
                      aria-label={`${item.chapterName} Details`}
                    >
                      <p
                        className="lg:text-[18px] text-left text-[14px] dark:text-[#D7D7D7] text-[#101010] hover:text-[#0385FF]
                      dark:hover:text-[#0385FF]"
                      >
                        {item.chapterName}
                      </p>
                      <RightArrow size="size-4" color="#000" />
                    </SheetTrigger>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="text-right mt-4">
            <button
              className={cn(
                `text-[#101010] hover:!text-[#0B57D0] dark:text-[#D7D7D7]  `,
                open[index] && 'text-[#0B57D0] dark:text-[#0385FF]'
              )}
              onClick={() => handleOpen(index)}
              data-test-id={`read-more-btn-${index}`}
              aria-label={`${subject.name} Read More And Read Less`}
            >
              {HOMEPAGE.READ} {open[index] ? 'Less' : 'More'}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Introduction;
