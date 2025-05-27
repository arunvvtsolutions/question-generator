import React   from "react";
import CommonCardBlock from "../CommonCardBlock";
import { IExamOverAllAnalysis } from "@/types/exam";
import { EXAM_ANALYSIS_RESULT } from "@/service/enums/texts";

const OverallAnalysisResultCard = ({
  overallAnalysisResult,
}: {
  overallAnalysisResult: IExamOverAllAnalysis;
}) => {
  return (
    <CommonCardBlock className="max-w-[608px]">
      <div className="grid grid-cols-12  gap-2  ">
        <div className="lg:col-span-3 col-span-12">
          <div className=" flex lg:flex-col flex-row  items-start justify-between lg:p-[0px]  p-[16px] border-b lg:border-b-0">
            <p className="lg:text-[16px] text-[14px] dark:text-[#fff]/[70%] text-[#101010]/[70%] lg:pb-[32px] pb-[0px] font-normal">
              {EXAM_ANALYSIS_RESULT.TOTAL_MCQS}
            </p>
            <p className="font-semibold lg:text-[20px] text-[16px] text-[#101010] dark:text-[#fff]">
              {overallAnalysisResult.totalMcqs}
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 col-span-12 lg:px-[40px] px-0 lg:border-l lg:border-r lg:border-[#101010]/[15%] lg:dark:border-[#fff]/[15%] border-0  ">
          <div className="flex lg:flex-col flex-row  items-start justify-between lg:p-[0px]  p-[16px] border-b lg:border-b-0 border-[#101010]/[15%] dark:border-[#fff]/[15%]">
            <p className="lg:text-[16px] text-[14px] dark:text-[#fff]/[70%] text-[#101010]/[70%] lg:pb-[32px] pb-[0px] font-normal">
              {EXAM_ANALYSIS_RESULT.CORRECT}
            </p>
            <p className="font-semibold lg:text-[20px] text-[16px] text-[#248A3D] dark:text-[#30D158] ">
              {overallAnalysisResult.correct}
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 col-span-12 lg:px-[40px] px-0  lg:border-r lg:border-[#101010]/[15%] lg:dark:border-[#fff]/[15%] border-0">
          <div className="flex lg:flex-col flex-row  items-start justify-between lg:p-[0px]  p-[16px] border-b lg:border-b-0 border-[#101010]/[15%] dark:border-[#fff]/[15%]">
            <p className="lg:text-[16px] text-[14px] dark:text-[#fff]/[70%] text-[#101010]/[70%] lg:pb-[32px] pb-[0px] font-normal">
              {EXAM_ANALYSIS_RESULT.WRONG}
            </p>
            <p className="font-semibold lg:text-[20px] text-[16px] text-[#FF3B30] dark:text-[#FF453A] ">
              {overallAnalysisResult.wrong}
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 col-span-12 lg:px-[40px] px-0 ">
          <div className="flex lg:flex-col flex-row  items-center justify-between lg:p-[0px]  p-[16px] border-b lg:border-b-0 border-[#101010]/[15%] dark:border-[#fff]/[15%]">
            <p className="lg:text-[16px] text-[14px] dark:text-[#fff]/[70%] text-[#101010]/[70%] lg:pb-[32px] pb-[0px] font-normal">
              {EXAM_ANALYSIS_RESULT.LEFT}
            </p>
            <p className="font-semibold lg:text-[20px] text-[16px] text-[#FF9500] dark:text-[#FFD60A] ">
              {overallAnalysisResult.left}
            </p>
          </div>
        </div>
      </div>
    </CommonCardBlock>
  );
};

export default OverallAnalysisResultCard;
