'use client';
import React, { FC } from 'react';
import CardWrap from './CardWrap';
import LandingTabs from './landing-tabs';
import { ISubjectDetailsProps } from '@/types';
import { SIDEBAR } from '@/service/enums/texts';

interface IAuthLandingProps {
  showBanner?: boolean;
  type?: 'notes' | 'ai';
  subject?: string;
  data: ISubjectDetailsProps[];
}

const HomeContent: FC<IAuthLandingProps> = ({ data, type, subject }) => {

  return (
    <>
      {(type === 'ai') && (
        <CardWrap
          title={
            <h2 className="text-[#101010] dark:text-[#fff] lg:text-center text-left lg:text-[33px] text-[24px] lg:leading-[39.93px] leading-[29.04px]  font-semibold lg:mb-[26px] mb-[20px]">
              {SIDEBAR.START} <span className="ai_highlight_text">{SIDEBAR.AI_POWERED_LESSON}</span>
            </h2>
          }
        >
          <LandingTabs baseLink={'ask-your-doubts'} data={data} showAll={type === 'ai'} subject={subject} />
        </CardWrap>
      )}

      {(type === 'notes') && (
        <CardWrap
          title={
            <h2 className="text-[#101010] dark:text-[#fff] lg:text-center text-left lg:text-[33px] text-[24px] lg:leading-[39.93px] leading-[29.04px]  font-semibold lg:mb-[26px] mb-[20px]">
              {SIDEBAR.REVISION_NOTES}
            </h2>
          }
        >
          <LandingTabs baseLink={'revision-notes'} data={data} showAll={type === 'notes'} subject={subject} />
        </CardWrap>
      )}
    </>
  );
};

export default HomeContent;
