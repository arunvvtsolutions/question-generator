import { IMcqQuestionProps } from "@/types/exam";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";

const MobileNextButtons = ({
  disableNext,
  disablePrev,
  questionIndex,
  subjectData,
  handleNext,
  disableAllBts,
}: {
  disableNext: boolean;
  disablePrev: boolean;
  questionIndex: number;
  subjectData: IMcqQuestionProps;
  disableAllBts: boolean;
  handleNext: (secId: number, sId: number, qId: number, count?: -1 | 1) => void;
}) => {
  return (
    <div className="flex lg:hidden fixed bottom-0 mb-[90px] justify-between items-center w-full left-0 px-[15px]">
      <button
        className="p-[10px] bg-[#e9e9e9] dark:bg-[#d1ddf7] rounded-[50%] disabled:bg-[#f5f5f5]"
        onClick={() =>
          handleNext(
            subjectData.secId,
            subjectData.sId,
            subjectData.questions[questionIndex].qstId,
            -1
          )
        }
        disabled={disablePrev || disableAllBts}
      >
        <ChevronLeftIcon className="text-[#101010]" />
      </button>
      <button
        className="p-[10px] bg-[#e9e9e9] dark:bg-[#d1ddf7] rounded-[50%] disabled:bg-[#f5f5f5]"
        onClick={() =>
          handleNext(
            subjectData.secId,
            subjectData.sId,
            subjectData.questions[questionIndex].qstId,
            1
          )
        }
        disabled={disableNext || disableAllBts}
      >
        <ChevronRightIcon className="text-[#101010]" />
      </button>
    </div>
  );
};

export default MobileNextButtons;
