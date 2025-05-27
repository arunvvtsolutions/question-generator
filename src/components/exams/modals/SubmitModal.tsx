import Button from "@/components/common/Button";
import { MainModal } from "@/components/common/MainModal";
import LoadingSpinner from "@/components/icons/LoadingSpinner";
import { EXAM } from "@/service/enums/texts";
import { IExamUpdatesProps, IMcqQuestionProps } from "@/types/exam";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IExanResult {
  notVisited: number;
  answered: number;
  notAnswered: number;
  answeredAndMarked: number;
  marked: number;
}

const SubmitModal = ({
  open,
  examResponses,
  questions,
  disableBtns,
  loading = false,
  onOpenChange,
  handleSubmit,
}: {
  open: boolean;
  disableBtns: boolean;
  examResponses: IExamUpdatesProps[];
  questions: IMcqQuestionProps[];
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  handleSubmit: () => void;
}) => {
  const params: any = useParams();
  const [{ answeredAndMarked, answered, marked, notAnswered, notVisited }, setExamResult] = useState<IExanResult>({
    answeredAndMarked: 0,
    answered: 0,
    marked: 0,
    notAnswered: 0,
    notVisited: 0,
  });

  // calculting the count of all the data
  useEffect(() => {
    const initialCounts = {
      answeredAndMarked: 0,
      answered: 0,
      marked: 0,
      notAnswered: 0,
      notVisited: 0,
    };
    const examResult = examResponses.reduce((acc, { ans, mr, qId }) => {
      if (ans && mr) {
        acc.answeredAndMarked++;
      } else if (ans) {
        acc.answered++;
      } else if (mr) {
        acc.marked++;
      } else if (ans === "") {
        acc.notAnswered++;
      }
      return acc;
    }, initialCounts);
    let notVisitedCount = 0;
    questions.forEach(({ questions: sectionQuestions }) =>
      sectionQuestions.forEach(({ qstId }) => {
        const isQstVisited = examResponses.some(({ qId }) => qId === qstId);
        if (!isQstVisited) notVisitedCount++;
      })
    );
    setExamResult(() => ({
      ...examResult,
      notVisited: notVisitedCount,
    }));
  }, [examResponses, questions]);

  return (
    <MainModal
      open={open}
      title={EXAM.SUBMIT_EXAM_CONTENT}
      onOpenChange={onOpenChange}
      className="!max-w-2xl"
      titleClassName="leading-2 mt-1 text-center"
      footer={
        <>
          <Button
            disabled={disableBtns}
            ariaLabel=""
            dataTestId=""
            onClick={() => onOpenChange(false)}
            text="Cancel"
            className="bg-[#F5F5F5] hover:bg-[#F5F5F5] text-[#101010] shadow-none"
          />
          <Button
            disabled={disableBtns || loading}
            ariaLabel=""
            dataTestId=""
            onClick={handleSubmit}
            startIcon={loading && <LoadingSpinner />}
            text="Submit"
            className="bg-[#046444] hover:bg-[#046444] text-[#ffff] shadow-none mb-3 disabled:opacity-20"
          />
        </>
      }
    >
      <div className="flex w-full flex-wrap justify-center items-center gap-5">
        <div className="w-[150px] h-[100px] bg-[#f1f1f199] rounded-md min-w-[30%] p-3">
          <p className=" text-[#101010] font-semibold text-center text-[12px] lg:text-[14px] mt-2">
            {EXAM.QST_NOT_VISITED}
          </p>
          <p className="text-[#101010] font-semibold text-center text-[16px] my-2">{notVisited}</p>
        </div>

        <div className="w-[150px] h-[100px] bg-[#f1f1f199] rounded-md p-3 min-w-[30%]">
          <p className=" text-[#101010] font-semibold text-center text-[12px] lg:text-[14px] mt-2">
            {EXAM.QST_ANSWERED}
          </p>
          <p className="text-[#046444] font-semibold text-center text-[16px] my-2">{answered}</p>
        </div>

        <div className="w-[150px] h-[100px] bg-[#f1f1f199] rounded-md p-3 min-w-[30%]">
          <p className=" text-[#101010] font-semibold text-center text-[12px] lg:text-[14px] mt-2">
            {EXAM.QST_NOT_ANSWERED}
          </p>
          <p className="text-[#D70015] font-semibold text-center text-[16px] my-2">{notAnswered}</p>
        </div>

        <div className="w-[150px] h-[100px] bg-[#f1f1f199] rounded-md p-3 min-w-[30%]">
          <p className=" text-[#101010] font-semibold  text-center text-[12px] lg:text-[14px] mt-2">
            {EXAM.QST_ANS_AND_MARKED}
          </p>
          <p className="text-[#DB7A00] font-semibold text-center text-[16px] my-2">{answeredAndMarked}</p>
        </div>

        <div className="w-[150px] h-[100px] bg-[#f1f1f199] rounded-md  p-3 min-w-[33%]">
          <p className=" text-[#101010] font-semibold text-center text-[12px] lg:text-[14px] mt-2">{EXAM.QST_MARKED}</p>
          <p className="text-[#DB7A00] font-semibold text-center text-[16px] my-2">{marked}</p>
        </div>
      </div>
    </MainModal>
  );
};

export default SubmitModal;
