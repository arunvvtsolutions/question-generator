import React from 'react';
import { IChapterDetailsProps, ISubjectDetailsProps } from '@/types';
import HeroBanner from '../hero-banner';
import Introduction from './Subjects';
import Link from 'next/link';
import { HOMEPAGE } from '@/service/enums/texts';

interface ISubjectProps {
  data: ISubjectDetailsProps[];
  setIntroductionData: (item: {
    chapter: IChapterDetailsProps;
    subject: ISubjectDetailsProps;
  }) => void;
}
const SubjectIntroduction: React.FC<ISubjectProps> = ({
  data,
  setIntroductionData,
}) => {
  return (
    <div
      className="max-w-[750px] mx-auto"
      data-test-id="subject-introduction-card"
    >
      <div
        className="p-4 md:p-3 md:pr-0"
        data-test-id="welcome-introduction-card"
      >
        <HeroBanner />
      </div>
      <div
        className="p-4 md:p-3 md:pr-0 mt-0 md:mt-2 md:mb-5"
        data-test-id="welcome-introduction-card"
      >
        <h2 className="font-[500] text-[24px] lg:text-[32px]">
          {HOMEPAGE.EXPLORE_NEET}{' '}
          <span className="font-bold">{HOMEPAGE.AI_POWERED}</span>{' '}
          {HOMEPAGE.LESSONS_BY_CHAPTER}{' '}
        </h2>
        <p className="mt-1 font-normal text-[14px] lg:text-[16px]">
          {HOMEPAGE.AI_DESC}
        </p>
        <h3 className="font-semibold text-[18px] lg:text-[28px] mt-8">
          {HOMEPAGE.HOW_TO_USE}{' '}
        </h3>
        <p className="mt-1 font-normal text-[14px] lg:text-[16px] ">
          {HOMEPAGE.TO_START}{' '}
          <span className="ai_highlight_text">
            {HOMEPAGE.START_AI_POWERED_LESSON}
          </span>{' '}
          {HOMEPAGE.UNDER_CHAPTER}
        </p>
      </div>
      <Introduction data={data} setIntroductionData={setIntroductionData} />
    </div>
  );
};
export default SubjectIntroduction;
