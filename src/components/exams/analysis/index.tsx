"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import McqsResultCard from "./mcqs-analysis-result/McqsResultCard";
import OverallAnalysisResultCard from "./overall-analysis-result/OverallAnalysisResultCard";
import SubjectWiseResultSlide from "./subject-wise/SubjectWiseResultSlide";
import QuestionAnswerSection from "./question-answer/QuestionAnswer";
import CardWrapBlock from "./CardWrapBlock";
import {
  generateCumulativeResult,
  generateResult,
  getCumulativeQuestionWiseData,
  getExamData,
  getQuestionWiseData,
} from "@/utils/api/exam";
import { IExamDetailsProps, IExamResult, IQuestionWiseDataProps } from "@/types/exam";
import LoadingSpinner from "@/components/icons/LoadingSpinner";
import Link from "next/link";
import { ERROR, EXAM_ANALYSIS_RESULT, EXAM_TYPE_SHORTURLS } from "@/service/enums/texts";

const AnalyisComponenet = () => {
  const router = useRouter();
  const params: any = useParams();

  const [result, setResult] = useState<IExamResult | null>(null);
  const [questionWiseData, setQuestionWiseData] = useState<IQuestionWiseDataProps[] | null>(null);
  const [examData, setExamData] = useState<IExamDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);

  const handleGenerateResult = async () => {
    const examData = await getExamData(params?.shortUrls[0]);
    if (examData.success) {
      if (examData.data.shortUrl === EXAM_TYPE_SHORTURLS.CUMULATIVE_TEST) {
        return await generateCumulativeResult(params?.shortUrls[0], params?.shortUrls[1]);
      } else {
        return await generateResult(params?.shortUrls[0], params?.shortUrls[1]);
      }
    } else {
      return { success: false };
    }
  };

  const handleGetQuestions = async () => {
    const examData = await getExamData(params?.shortUrls[0]);
    if (examData.success) {
      if (examData.data.shortUrl === EXAM_TYPE_SHORTURLS.CUMULATIVE_TEST) {
        return await getCumulativeQuestionWiseData(params?.shortUrls[0], params?.shortUrls[1]);
      } else {
        return await getQuestionWiseData(params?.shortUrls[0], params?.shortUrls[1]);
      }
    } else {
      return { success: false };
    }
  };

  useEffect(() => {
    const getData = async () => {
      const examData = await getExamData(params?.shortUrls[0]);
      const [result, questionData] = await Promise.all([handleGenerateResult(), handleGetQuestions()]);
      result.success && result.data && setResult(result.data);
      questionData.success && questionData.data && setQuestionWiseData(questionData.data);
      examData.success && examData.data && setExamData(examData.data);
      setLoading(false);
    };
    params?.shortUrls?.length && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.shortUrls]);
  return (
    <>
      {loading ? (
        <>
          <div className="w-full h-[30vh] flex justify-center items-center">
            <LoadingSpinner />
          </div>
        </>
      ) : (
        <>
          {result ? (
            <>
              <div className="w-[100%] max-w-[842px] mx-auto lg:py-16 py-4 px-4 lg:px-0">
                <div className="my-[52px]">
                  <div title="Back To Home">
                    <Button
                      ariaLabel=""
                      dataTestId=""
                      onClick={() => (params?.shortUrls[1] ? router.push("/study-plan/calendar") : router.push("/"))}
                      text="Back"
                      startIcon={<ChevronLeftIcon />}
                    />
                  </div>
                </div>

                <CardWrapBlock title="MCQ’s Analysis">
                  <McqsResultCard
                    examData={examData}
                    mcqsResultData={{
                      allIndiaRank: result?.allIndiaRank,
                      overallScore: result?.overallScore,
                      totalMark: Number(result?.totalMark),
                    }}
                  />
                </CardWrapBlock>

                <CardWrapBlock title="Overall Analysis">
                  <OverallAnalysisResultCard overallAnalysisResult={result.overAllAnalysis} />
                </CardWrapBlock>

                <CardWrapBlock title="Subject Wise">
                  <SubjectWiseResultSlide subjectWiseData={result.sectionWiseData} />
                </CardWrapBlock>

                {!(EXAM_TYPE_SHORTURLS.BENCHMARK_TEST === examData?.shortUrl) && (
                  <CardWrapBlock title="Question & Answer">
                    <QuestionAnswerSection questions={questionWiseData} />
                  </CardWrapBlock>
                )}
                {EXAM_TYPE_SHORTURLS.BENCHMARK_TEST === examData?.shortUrl && (
                  <div className="w-full flex sticky bottom-5">
                    <Link
                      href={`/create-study-plan/${params?.shortUrls[0]}`}
                      data-test-id="crate-study-plan-button"
                      onClick={() => {}}
                      className="mx-auto bg-[#0B57D0] text-[#fff]  py-2 px-4 rounded-md text-sm font-medium shadow-sm"
                    >
                      {EXAM_ANALYSIS_RESULT.CREATE_STUDY_PLAN}
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-[30vh] flex justify-center items-center">
                <p className="font-semibold">{ERROR.NO_DATA_FOUND}</p>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AnalyisComponenet;
