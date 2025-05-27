'use client';
import React, { useEffect, useState } from 'react';
import ResultAnalyisSection from './ResultAnalyisSection';
import PieCardsBlock from './Piecard';
import DoughnutCardsBlock from './DoughtnutCard';
import MarksCard from './MarksCard';
import TimeTakenCard from './TimeTakenCard';
import RadialChartCard from './AccuracyCard';
import MainCard from '@/components/common/MainCard';
import ChapterWiseTableAccordion from './ChapterWiseTableAccordion';
import SubjectWiseTableAccordion from './SubjectWiseTableAccordion';
import TimeAnalysisTable from './TimeAnalysisTable';
import DifficultyPerformace from './DifficultyPerformance';
import { useParams } from 'next/navigation';
import {
  generateCumulativeAnalysis,
  generateExamAnalysis,
  getCumulativeQuestionWiseData,
  getExamData,
  getQuestionWiseData,
} from '@/utils/api/exam';
import { IExamDetailsProps, IExamResultAnalysis, IQuestionWiseDataProps } from '@/types/exam';
import CardWrapBlock from '../analysis/CardWrapBlock';
import QuestionAnswerSection from '../analysis/question-answer/QuestionAnswer';
import LoadingSpinner from '@/components/icons/LoadingSpinner';
import { ERROR, EXAM_TYPE_SHORTURLS } from '@/service/enums/texts';

const ResultAnalysis = () => {
  const params: any = useParams();
  const [examResult, setExamResult] = useState<IExamResultAnalysis>();
  const [examData, setExamData] = useState<IExamDetailsProps | null>(null);
  const [questionWiseData, setQuestionWiseData] = useState<IQuestionWiseDataProps[] | null>(null);
  const [loading, setLoading] = useState(false);

  const getMcqResult = async (examId: number) => {
    const data = await generateExamAnalysis(examId, params?.shortUrl[1]);
    if (data.success && data.data) {
      setExamResult(data.data);
    }
  };

  const getCumulativeResult = async (examId: number, planId: number) => {
    const data = await generateCumulativeAnalysis(examId, planId);
    if (data.success && data.data) {
      setExamResult(data.data);
    }
  };

  const handleGetQuestions = async (examData: IExamDetailsProps) => {
    if (examData) {
      if (examData.shortUrl === EXAM_TYPE_SHORTURLS.CUMULATIVE_TEST) {
        return await getCumulativeQuestionWiseData(params?.shortUrl[0], params?.shortUrl[1]);
      } else {
        return await getQuestionWiseData(params?.shortUrl[0], params?.shortUrl[1]);
      }
    } else {
      return { success: false };
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const examData = await getExamData(params?.shortUrl[0]);
      setExamData(examData.data);
      if (examData.success) {
        const questions = await handleGetQuestions(examData.data);
        setQuestionWiseData(questions.data || []);
        if (examData.data.shortUrl === EXAM_TYPE_SHORTURLS.CUMULATIVE_TEST) {
          await getCumulativeResult(params?.shortUrl[0], params?.shortUrl[1]);
        } else if (params?.shortUrl[0]) {
          await getMcqResult(Number(params?.shortUrl[0]));
        }
      }
      setLoading(false);
    };
    params?.shortUrl[0] && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.shortUrl]);

  return (
    <>
      {loading ? (
        <>
          <div className="max-h-[50vh] mt-[100px] px-4 2xl:mx-[20rem] xl:mx-[50px] flex justify-center items-center">
            <LoadingSpinner />
          </div>
        </>
      ) : (
        <>
          {examResult ? (
            <>
              <div className="mt-[100px] px-4 2xl:mx-[20rem] xl:mx-[50px]">
                <ResultAnalyisSection title="Well done!! Your result is here for">
                  <div className="grid grid-cols-12 gap-6 place-items-center mb-6  h-full">
                    <MarksCard data={{ marksScored: examResult.overallScore, totalMarks: Number(examResult.totalMark) }} />
                    <TimeTakenCard
                      data={{
                        totalTestTime: examResult.totalTime || 0,
                        timeTaken: examResult.timeTaken || 0,
                        avgTimePerQuestion: examResult.avgTimePerQst || 0,
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 mx-auto">
                    <PieCardsBlock
                      correct={examResult.correct}
                      wrong={examResult.wrong}
                      left={examResult.left}
                      correctPercent={examResult.correctPercent}
                      wrongPercent={examResult.wrongPercent}
                      leftPercent={examResult.leftPercent}
                      totalQsts={examResult.totalQuestions}
                    />
                    <RadialChartCard title="Accuracy" accuracy={examResult.accuracy || 0} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <DoughnutCardsBlock data={examResult?.subjectWiseAnalysis} />
                  </div>
                </ResultAnalyisSection>
                <ResultAnalyisSection title="Subject wise result">
                  <MainCard title="" key={'Subject wise analysis'}>
                    <SubjectWiseTableAccordion data={examResult.subjectWiseResult} />
                  </MainCard>
                </ResultAnalyisSection>

                <ResultAnalyisSection>
                  <div className="grid grid-cols-12 gap-6 place-items-center mb-6 w-full h-full">
                    <div className="lg:col-span-6 col-span-12 w-full h-full bg-white dark:bg-[#1a1a1a]  rounded-lg">
                      <DifficultyPerformace data={examResult.difficultyPerformance} />
                    </div>
                    <div className="lg:col-span-6 col-span-12 w-full h-full bg-white dark:bg-[#1a1a1a] shadow rounded-lg">
                      <TimeAnalysisTable data={examResult.timeAnalysis} />
                    </div>
                  </div>
                </ResultAnalyisSection>

                <ResultAnalyisSection title="Chapter wise result" styleClass="border-none">
                  <MainCard title="" key={'Subject wise result'}>
                    <ChapterWiseTableAccordion data={examResult.chapterwiseResult} />
                  </MainCard>
                </ResultAnalyisSection>
                {!(EXAM_TYPE_SHORTURLS.BENCHMARK_TEST === examData?.shortUrl) && (
                  <CardWrapBlock title="Question & Answer">
                    <QuestionAnswerSection questions={questionWiseData} />
                  </CardWrapBlock>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="max-h-[70vh] h-full lg:mt-[200px] mt-[100px] px-4 2xl:mx-[20rem] xl:mx-[50px] flex justify-center items-center font-semibold">
                {ERROR.NO_DATA_FOUND}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ResultAnalysis;
