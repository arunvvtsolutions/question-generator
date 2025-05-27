"use client";
import React from "react";
import Button from "../common/Button";
import { ChevronLeftIcon, ChevronRightIcon, ExitIcon } from "@radix-ui/react-icons";
import { IMcqQuestionProps } from "@/types/exam";
import { EXAM_BUTTONS } from "@/service/enums/texts";

const Footer = ({
  disableNext,
  disablePrev,
  questionIndex,
  subjectData,
  selectedAns,
  disableAllBts,
  disableResume,
  markForReviewStatus,
  handleNext,
  handleSelectAnswer,
  handleMarkForReview,
  leaveHandler,
  submitHandler,
}: {
  disableNext?: boolean;
  disablePrev?: boolean;
  questionIndex: number;
  selectedAns: string;
  disableResume?: boolean;
  disableAllBts?: boolean;
  markForReviewStatus: boolean;
  subjectData: IMcqQuestionProps;
  handleNext: (secId: number, sId: number, qId: number, count: -1 | 1) => void;
  handleSelectAnswer: (secId: number, sId: number, qId: number) => void;
  handleMarkForReview: (status: boolean, secId: number, sId: number, qId: number) => void;
  leaveHandler: (open: boolean) => void;
  submitHandler: (open: boolean) => void;
}) => {
  return (
    <div className="fixed bottom-0 w-full h-[80px]  bg-opacity-[40%] left-0 p-5 z-10 xl:px-52 flex justify-between items-center !bg-[#FFF] dark:!bg-[#0a0a0a]">
      <div className="w-full flex justify-between items-center max-w-[100%] lg:max-w-[65%] bg-[#FFF] dark:!bg-[#0a0a0a]">
        <>
          <Button
            text={EXAM_BUTTONS.PREVIOUS}
            ariaLabel="previous button"
            dataTestId="previous-button"
            onClick={() =>
              handleNext(subjectData.secId, subjectData.sId, subjectData.questions[questionIndex].qstId, -1)
            }
            disabled={disablePrev || disableAllBts}
            className="bg-[#F5F5F5] hover:bg-[#F5F5F5] text-[#101010] shadow-none hidden lg:flex"
            startIcon={<ChevronLeftIcon />}
          />
        </>
        <div className="flex gap-2 items-center w-full lg:w-auto justify-between ">
          <Button
            disabled={disableAllBts}
            text={markForReviewStatus ? EXAM_BUTTONS.UNMARK_FOR_REVIEW : EXAM_BUTTONS.MARK_FOR_REVIEW}
            ariaLabel={markForReviewStatus ? EXAM_BUTTONS.UNMARK_FOR_REVIEW : EXAM_BUTTONS.MARK_FOR_REVIEW}
            dataTestId={markForReviewStatus ? EXAM_BUTTONS.UNMARK_FOR_REVIEW : EXAM_BUTTONS.MARK_FOR_REVIEW}
            onClick={() =>
              handleMarkForReview(
                !markForReviewStatus,
                subjectData.secId,
                subjectData.sId,
                subjectData.questions[questionIndex].qstId
              )
            }
            className="bg-[#FFF2CC99] hover:bg-[#FFF2CC99] dark:bg-[#FFF2CC] dark:hover:bg-[#FFF2CC] shadow-none text-[#B75F00] flex-wrap font-medium text-[16px] text-wrap h-auto"
          />
          <Button
            text={EXAM_BUTTONS.SAVE_AND_NEXT}
            ariaLabel="save and next"
            dataTestId="save-and-next"
            disabled={!selectedAns || disableAllBts}
            onClick={() =>
              handleSelectAnswer(subjectData.secId, subjectData.sId, subjectData.questions[questionIndex].qstId)
            }
            className="bg-[#C7F7D499] hover:bg-[#C7F7D499] dark:bg-[#C7F7D4] dark:hover:bg-[#C7F7D4] text-[#046444] shadow-none font-medium"
          />
          <button className="shadow p-2 rounded bg-[#D70015] lg:hidden" onClick={() => leaveHandler(true)}>
            <ExitIcon className="text-[#ffff]" />
          </button>
        </div>
        <Button
          text="Next"
          ariaLabel=""
          dataTestId=""
          onClick={() => handleNext(subjectData.secId, subjectData.sId, subjectData.questions[questionIndex].qstId, 1)}
          className="hidden lg:flex"
          disabled={disableNext || disableAllBts}
          endIcon={<ChevronRightIcon />}
        />
      </div>
      <div className="ml-auto items-center gap-2 hidden lg:flex">
        {!disableResume && (
          <Button
            disabled={disableAllBts || disableResume}
            text={EXAM_BUTTONS.LEAVE_TEST}
            ariaLabel=""
            dataTestId=""
            onClick={() => leaveHandler(true)}
            className="bg-[#D70015] hover:bg-[#D70015] text-[#ffff]"
          />
        )}
        <Button
          text={EXAM_BUTTONS.SUBMIT_TEST}
          ariaLabel=""
          dataTestId=""
          onClick={() => submitHandler(true)}
          className="bg-[#046444] hover:bg-[#046444] text-[#ffff]"
          disabled={disableAllBts}
        />
      </div>
    </div>
  );
};

export default Footer;
