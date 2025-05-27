import React, { FC, useState } from 'react';
import { ISubjectDetailsProps } from '@/types';
import ContentList from './List';

export interface IDataPropsLanding {
  id: number;
  name: string;
  shortUrl: string;
  chapters: IDataChaptersLanding[];
}

export interface IDataChaptersLanding {
  chapterId: number;
  chapterName: string;
  chapterUrl: string;
}

interface ILandingProps {
  baseLink: string;
  showAll?: boolean;
  title: string;
  data: ISubjectDetailsProps[];
}

const QuizContent: FC<ILandingProps> = ({
  data,
  baseLink,
  showAll = false,
  title,
}) => {
  const [open, setOpen] = useState('');

  const handleOpen = (shortUrl: string) => {
    if (showAll) return;
    setOpen((prev) => (prev === shortUrl ? '' : shortUrl));
  };
  return (
    <div className="">
      {data.map((subject, index) => {
        return (
          <div className="mx-auto mt-5" key={`${subject.name}-${index}`}>
            <div className=" my-[34px] lg:max-w-[320px] max-w-full ">
              <h3 className="text-[#101010] dark:text-[#fff] text-[18px] lg:text-[24px] font-semibold">{`${subject.name} ${title}`}</h3>
            </div>

            <div className="w-full">
              <ContentList
                key={subject.id}
                shortUrl={subject.shortUrl}
                chapters={subject.chapters}
                baseLink={baseLink}
                open={open === subject.shortUrl}
                handleOpen={handleOpen}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizContent;
