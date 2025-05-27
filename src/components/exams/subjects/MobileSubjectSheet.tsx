import { MainSheet } from "@/components/common/MainSheet";
import React from "react";
import SubjectComponent from ".";
import { IExamUpdatesProps, IMcqQuestionProps } from "@/types/exam";

const MobileSubjectSheet = ({
  open,
  questions,
  currSubIndex,
  currQstIndex,
  examResponses,
  handleClose,
  handleQstIndexNext,
}: {
  open: boolean;
  currSubIndex: number;
  currQstIndex: number;
  questions: IMcqQuestionProps[];
  examResponses: IExamUpdatesProps[];
  handleClose: (open: boolean) => void;
  handleQstIndexNext: (
    qstIndex: number,
    subIndex: number,
    secId: number,
    sId: number,
    qId: number,
    curntSecId: number,
    curntSId: number,
    curntQId: number
  ) => void;
}) => {
  return (
    <MainSheet
      onClose={handleClose}
      open={open}
      side="bottom"
      title=""
      className="rounded-t-[16px] h-[90vh] "
    >
      <div className="w-full mt-[20px]">
        <SubjectComponent
          questions={questions}
          handleQstIndexNext={handleQstIndexNext}
          currSubIndex={currSubIndex}
          currQstIndex={currQstIndex}
          examResponses={examResponses}
        />
      </div>
    </MainSheet>
  );
};

export default MobileSubjectSheet;
