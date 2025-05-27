'use client';
import React, { FC } from 'react';
import HeroBanner from '../home/hero-banner';
import CardWrap from './CardWrap';
import { ISubjectDetailsProps } from '@/types';
import LandingContentList from './landing-tabs/LandingContentList';
import Content from './content';
import { Marquee } from '../Marquee';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import QuizContent from './quiz-content';
import { SIDEBAR } from '@/service/enums/texts';


interface IAuthLandingProps {
  subject?: string;
  data: ISubjectDetailsProps[];
}

const startPracticeData = [
  {
    chapterName: 'Mock Test',
    shortUrl: '',
    topicShortUrl: '',
    Classes: {
      shortUrl: 'exams/instructions/1',
    },
  },
  {
    chapterName: 'Generate Test',
    shortUrl: '',
    topicShortUrl: '',
    Classes: {
      shortUrl: 'generate-questions',
    },
  },
];

const AiNeetMentorData = [
  {
    chapterName: 'AI NEET Mentor',
    shortUrl: '',
    topicShortUrl: '',
    Classes: {
      shortUrl: 'ask-about-admissions',
    },
  },
  {
    chapterName: 'Doubts AI',
    shortUrl: '',
    topicShortUrl: '',
    Classes: {
      shortUrl: 'neet-mentor',
    },
  },
];

const cardData = [
  'Help me master this chapter.',
  "Let's practice some MCQs.",
  'I want to practice application-based questions.',
  "Let's practice numerical problems.",
  'Can we practice some assertion-reason questions?',
  "Let's practice matching questions.",
  'Can you explain the difference between ionic and covalent bonds?',
  'What’s the formula for centripetal force, and how do I use it?',
  'Can you break down the process of glycolysis?',
  'How do I solve this integration problem from kinematics?',
  'Give me a quick tip for solving NEET-style assertion-reason questions.',
  'How does the electron transport chain work',
  'What’s the shortcut to remembering the periodic trends?',
  'Test me with some MCQs on electrostatics.',
  'Explain the Bohr model in simple terms.',
  'Show me a trick to solve complex organic reactions.',
  'Can you create a lesson plan to learn and practice (Physics topic)?',
  'What is the structure of DNA?',
  'Show me a shortcut to solve projectile motion problems',
  'Test me with MCQs on hydrocarbons.',
  'Give me a mnemonic to remember the Krebs cycle..',
];

// Calculate the chunk size for 3 rows
const chunkSize = Math.ceil(cardData.length / 3);

// Create three rows by slicing the cardData array
const firstRow = cardData.slice(0, chunkSize);
const secondRow = cardData.slice(chunkSize, chunkSize * 2);
const thirdRow = cardData.slice(chunkSize * 2);
const baseLink = '/physics-chapter-bots';
const homeScreenWidth = 'container w-full sm:max-w-[820px]  ';
const AuthLanding: FC<IAuthLandingProps> = ({ data, subject }) => {
  return (
    <>
      <div className={cn('sm:container w-full sm:max-w-[820px]')}>
        <HeroBanner />
      </div>
      <div className="container my-10 max-w-[820px]">
        <h2 className="lg:text-[40px] text-center text-[28px] font-semibold text-[#101010] mb-[16px] lg:mb-[20px] lg:leading-[48.4px] leading-[33.8px]">
          Your NEET Doubts, Instantly Clarified
          <br /> All You Have to Do is Ask.
        </h2>
        <p className="text-[16px] text-center lg:text-[18px] lg:leading-[24px] leading-[22px] text-[#101010] text-opacity-80 ">
          With NEET AI Mentor, you can ask questions on any NEET topic, from
          complex physics formulas to biology mnemonics. Get detailed
          step-by-step answers instantly!
        </p>
      </div>

      <div className="w-full my-10">
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((text, index) => (
            <MCQCard key={index} text={text} link={`${baseLink}`} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((text, index) => (
            <MCQCard key={index} text={text} link={`${baseLink}`} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:30s]">
          {thirdRow.map((text, index) => (
            <MCQCard key={index} text={text} link={`${baseLink}`} />
          ))}
        </Marquee>
      </div>
      <div className={`${homeScreenWidth}`}>
        <CardWrap
          title={
            <h3 className="text-[#101010] dark:text-[#fff] lg:text-center text-left lg:text-[33px] text-[24px] lg:leading-[39.93px] leading-[29.04px]  font-semibold lg:mb-[26px] mb-[20px]">
              {SIDEBAR.START}{' '}
              <span className="ai_highlight_text">
                {SIDEBAR.AI_POWERED_LESSON}
              </span>
            </h3>
          }
        >
          <Content
            baseLink={'ask-your-doubts'}
            data={data}
            title="Chapter Bots"
          />
        </CardWrap>

        <CardWrap
          title={
            <h3 className="text-[#101010] dark:text-[#fff] lg:text-center text-left lg:text-[33px] text-[24px] lg:leading-[39.93px] leading-[29.04px]  font-semibold lg:mb-[26px] mb-[20px]">
              {SIDEBAR.CHAPTER_WISE_QUIZ}
            </h3>
          }
        >
          <QuizContent
            baseLink={'exams/chapter-wise-quiz'}
            data={data}
            title="Quiz"
          />
        </CardWrap>

        <CardWrap
          title={
            <h3 className="text-[#101010] dark:text-[#fff] lg:text-center text-left lg:text-[33px] text-[24px] lg:leading-[39.93px] leading-[29.04px]  font-semibold lg:mb-[26px] mb-[20px]">
              {SIDEBAR.START_UR_PRACTICE}{' '}
              <span className="ai_highlight_text">{SIDEBAR.GENERATE_TEST}</span>
            </h3>
          }
        >
          <LandingContentList
            key={3}
            chapters={startPracticeData as any[]}
            shortUrl={''}
            baseLink={''}
            showAll={true}
          />
        </CardWrap>

        <CardWrap
          title={
            <h3 className="text-[#101010]  dark:text-[#fff] lg:text-center text-left lg:text-[33px] text-[24px] lg:leading-[39.93px] leading-[29.04px]  font-semibold lg:mb-[26px] mb-[20px]">
              {SIDEBAR.CLEAR_DOUBTS_TEST}{' '}
              <span className="ai_highlight_text">{SIDEBAR.ON_ADMISSION}</span>
            </h3>
          }
        >
          <LandingContentList
            chapters={AiNeetMentorData as any[]}
            key={4}
            shortUrl={''}
            baseLink={''}
            showAll={true}
          />
        </CardWrap>

        <CardWrap
          title={
            <h3 className="text-[#101010] dark:text-[#fff] lg:text-center text-left lg:text-[33px] text-[24px] lg:leading-[39.93px] leading-[29.04px]  font-semibold lg:mb-[26px] mb-[20px]">
              {SIDEBAR.REVISION_NOTES}
            </h3>
          }
        >
          <Content baseLink={'revision-notes'} data={data} title="Notes" />
        </CardWrap>
      </div>
         
    </>
  );
};

export default AuthLanding;

const MCQCard = ({ text, link }: { text: string; link: string }) => {
  return (
    <Link href={link} className="me-[5px]">
      <div className="border lg:py-2 gap-3 rounded-md flex bg-white items-center lg:h-[100px] h-[99px] p-3 cursor-pointer flex-shrink-0">
        <div className="flex justify-between flex-col w-full">
          <p className="lg:text-[14px] text-black text-[14px] cursor-pointer multi-line-truncate text-left">
            {text}
          </p>
        </div>
        <div className="ml-3 cursor-pointer">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.25"
              y="0.25"
              width="29.5"
              height="29.5"
              rx="14.75"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="0.5"
            />
            <path
              d="M15.8786 15L12.1663 11.2877L13.2269 10.227L17.9999 15L13.2269 19.7729L12.1663 18.7123L15.8786 15Z"
              fill="currentColor"
              fillOpacity="0.2"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
