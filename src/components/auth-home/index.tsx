"use client";
import React, { useEffect, useState } from "react";
import AuthHeroBanner from "./AuthHeroBanner";
import DateSection from "./DateSec";
import BasesTestResult from "./BasedTestResult";
import Card, { CardSkelton } from "./Card";
import PhysicsIcon from "../icons/Physics";
import ChemistryIcon from "../icons/Chemistry";
import BiologyIcon from "../icons/Biology";
import RightAngleIcon from "../icons/RightAngle";
import ExamIcon from "../icons/Exam";
import DoubtsIcon from "../icons/Doubts";
import BiologyChapterIcon from "../icons/BiologyChapter";
import ChemistryChapterIcon from "../icons/ChemistryChapter";
import PhysicsChapterIcon from "../icons/PhysicsChapter";
import { getDashboard } from "@/utils/api/dashboard";
import GenerateQstsIcon from "../icons/GenerateQsts";
import CompletedTestsIcon from "../icons/CompletedTests";
import BotanyIcon from "../icons/Botany";

const chapterWiseBot = [
  {
    icon: <PhysicsIcon className="w-[19px] h-[18px] lg:w-[35px] lg:h-[34px] bg-[dark]" />,
    title: "Physics",
    link: "chapter-wise/physics/ai",
  },
  {
    icon: <ChemistryIcon className="w-[16px] h-[18]  lg:w-[28px] lg:h-[32px]" />,
    title: "Chemistry",
    link: "chapter-wise/chemistry/ai",
  },
  {
    icon: <BotanyIcon className="h-[20px] w-[18px] lg:w-[32px] lg:h-[33px]" />,
    title: "Botany",
    link: "chapter-wise/botany/ai",
  },
  {
    icon: <BiologyIcon className="w-[16px] h-[21px] lg:w-[24px] lg:h-[32px]" />,
    title: "Zoology",
    link: "chapter-wise/zoology/ai",
  },
];

const chapterWise = [
  {
    icon: <PhysicsChapterIcon className="h-[18px] w-[18px] lg:w-[26px] lg:h-[33px]" />,
    title: "Physics",
    link: "chapter-wise/physics/notes",
  },
  {
    icon: <ChemistryChapterIcon className="!h-[18px] !w-[18px] lg:!w-[26px] lg:!h-[33px]" />,
    title: "Chemistry",
    link: "chapter-wise/chemistry/notes",
  },
  {
    icon: <BotanyIcon className="h-[20px] w-[18px] lg:w-[32px] lg:h-[33px]" />,
    title: "Botany",
    link: "chapter-wise/botany/notes",
  },
  {
    icon: <BiologyChapterIcon className="h-[18px] w-[18px] lg:w-[26px] lg:h-[33px]" />,
    title: "Zoology",
    link: "chapter-wise/zoology/notes",
  },
];

const practiceNow = [
  {
    icon: <DoubtsIcon className="h-[19px] w-[18px] lg:w-[37px] lg:h-[34px]" />,
    title: "Ask Doubts",
    link: "/neet-mentor",
  },
];

const bots = [
  {
    icon: <DoubtsIcon className="h-[19px] w-[18px] lg:w-[37px] lg:h-[34px]" />,
    title: "Your Personal NEET Guide",
    link: "/ask-about-admissions",
  },
  {
    icon: <DoubtsIcon className="h-[19px] w-[18px] lg:w-[37px] lg:h-[34px]" />,
    title: "Doubts AI",
    link: "/neet-mentor",
  },
];

export interface IAuthHomeExamResProps {
  totalMarksScored: number;
  totalMarks: number;
  allIndiaRank: number;
}

export interface IAuthTopicProps {
  id: number;
  topicName: string;
  shortUrl: string;
  chapterId: number;
  isCompleted: boolean;
}

export interface IAuthChapterProps {
  id: number;
  chapterName: string;
  shortUrl: string;
  classUrl: string;
  topics: IAuthTopicProps[];
}

export interface IAuthSubjectProps {
  id: number;
  subjectName: string;
  shortUrl: string;
  chapters: IAuthChapterProps[];
}

export interface IAuthStudyPlanProps {
  id: number;
  uuid: string;
  day: number;
  date: string;
  subjects: IAuthSubjectProps[];
  topics: string;
  completed_topics: null | string;
  completedTopics: IAuthTopicProps[];
}

export interface IAuthExamProps {
  id: number;
  examName: string;
  shortUrl: string;
}

export interface IAuthHomeProps {
  examResult: IAuthHomeExamResProps;
  studyPlan: IAuthStudyPlanProps[];
  mcqExam: IAuthExamProps;
}

const AuthHome = () => {
  const [homeData, setHomeData] = useState<IAuthHomeProps>();
  const [loading, setLoading] = useState(true);
  const testModule = [
    {
      icon: <ExamIcon className="h-[18px] w-[18px] lg:w-[34px] lg:h-[34px] ml-[3px]" />,
      title: "Mock Test",
      link: `exams/instructions/${homeData?.mcqExam?.id}`,
    },
    {
      icon: <GenerateQstsIcon className="h-[19px] w-[18px] lg:w-[32px] lg:h-[31px] ml-[3px]" />,
      title: "Create Custom Practice Tests",
      link: `generate-questions`,
      className: "!pr-[6px]",
    },
    {
      icon: <CompletedTestsIcon className="ml-[3px] lg:ml-0" />,
      title: "Completed Tests",
      link: `generated-questions`,
      className: "!pr-[6px]",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const result = await getDashboard();
      if (result.success && result.data) {
        setHomeData(result.data);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div>
      <AuthHeroBanner createStudPlan={!loading && (!homeData?.studyPlan || homeData.studyPlan.length === 0)} />
      <div className="mb-[42px]">
        <DateSection />
      </div>

      <div className="mb-[42px]">
        <Card title="Learning Chapter Wise Bots" content={chapterWiseBot} titleClass="ai_highlight_text" showAllLInk="chapter-wise/physics/ai" />
      </div>
      <div className="mb-[42px]">
        {loading ? (
          <CardSkelton />
        ) : (
          homeData?.mcqExam && (
            <Card
              title="Practice Test Module"
              content={testModule}
              titleClass="!text-[#101010]"
              className="lg:grid-cols-4 grid-cols-3"
            />
          )
        )}
      </div>
      <div className="mb-[42px]">
        <Card
          title="As Get Expert Help 24/7"
          content={bots}
          titleClass="!text-[#101010]"
          className="lg:grid-cols-4 grid-cols-3"
        />
      </div>
      <div className="mb-[42px]">
        <BasesTestResult examResult={homeData?.examResult} />
      </div>
      <div className="mb-[42px]">
        <Card
          title="Chapter Wise Notes"
          content={chapterWise}
          titleClass="!text-[#101010]"
          showAllLInk="chapter-wise/physics/notes"
        />
      </div>
    </div>
  );
};

export default AuthHome;
