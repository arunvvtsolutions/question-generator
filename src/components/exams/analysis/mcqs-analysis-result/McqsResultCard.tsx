import { EXAM_ANALYSIS_RESULT, EXAM_TYPE_SHORTURLS } from "@/service/enums/texts";
import { IExamDetailsProps } from "@/types/exam";
import React from "react";

interface McqsResultData {
  overallScore: number;
  totalMark: number;
  allIndiaRank: number;
}

const McqsResultCard = ({
  mcqsResultData,
  examData,
}: {
  mcqsResultData: McqsResultData;
  examData: IExamDetailsProps | null;
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 bg-white border border-[#101010]/[15%] lg:border-none dark:border-[#fff]/[15%] dark:bg-[#171717] lg:bg-transparent lg:rounded-[0px] rounded-[10px] lg:dark:bg-transparent  max-w-[700px] overflow-hidden">
      <div className="lg:col-span-5 col-span-12">
        <div className="flex bg-white dark:bg-[#171717] items-center justify-between lg:p-[20px] px-[16px] py-[20px] lg:border lg:border-[#10101026]/[15%] lg:dark:border-[#10101026]/[0%] lg:rounded-[15px] rounded-[0px] border-[0px]">
          <p className="lg:text-[16px] text-[14px] dark:text-[#fff]/[70%] text-[#101010]/[70%]">
            {EXAM_ANALYSIS_RESULT.OVERALL_SCORE}
          </p>
          <p className="font-semibold lg:text-[20px] text-[16px] text-[#101010] dark:text-[#fff] leading-[0.50px]">
            {mcqsResultData.overallScore}
            <span className="text-[#101010]/[70%] dark:text-[#fff]/[70%]">/{mcqsResultData.totalMark}</span>
          </p>
        </div>
      </div>

      {!(examData?.shortUrl === EXAM_TYPE_SHORTURLS.CUMULATIVE_TEST) && (
        <div className="lg:col-span-7 col-span-12 lg:border-t-[0px] border-t-[1px] border-[#101010]/[15%] dark:border-[#fff]/[15%] ">
          <div className="flex bg-white dark:bg-[#171717] items-center justify-between lg:p-[20px] px-[16px] py-[20px] lg:border lg:border-[#10101026]/[15%] lg:dark:border-[#10101026]/[0%] lg:rounded-[15px] rounded-[0px] border-[0px]">
            <p className="lg:text-[16px] text-[14px] dark:text-[#fff]/[70%] text-[#101010]/[70%]">
              {EXAM_ANALYSIS_RESULT.BASED_ON_ALL_INDIA_RANK}
            </p>
            <p className="font-semibold lg:text-[20px] text-[16px] text-[#0B57D0] dark:text-[#0A84FF] leading-[0.50px]">
              {mcqsResultData.allIndiaRank || "NA"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default McqsResultCard;
