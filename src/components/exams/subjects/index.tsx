'use client'
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  IExamUpdatesProps,
  IMcqQuestionProps,
  QuestionIndexValue,
} from "@/types/exam";

const SubjectComponent = ({
  questions,
  currSubIndex,
  currQstIndex,
  examResponses,
  handleQstIndexNext,
}: {
  questions: IMcqQuestionProps[];
  currSubIndex: number;
  currQstIndex: number;
  examResponses: IExamUpdatesProps[];
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
  const [accordionValue, setAccordionValue] = useState(currSubIndex);

  useEffect(() => setAccordionValue(currSubIndex), [currSubIndex]);
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-h-[70vh] overflow-y-auto scrollbar-thin"
      defaultValue={String(accordionValue)}
      value={String(accordionValue)}
    >
      {questions.map((subject, index) => (
        <SubjectAccordion
          key={index}
          subIndex={index}
          subject={subject}
          examResponses={examResponses}
          currSubIndex={currSubIndex}
          currQstIndex={currQstIndex}
          accordionValue={accordionValue}
          currentSubject={questions[currSubIndex]}
          handleQstIndexNext={handleQstIndexNext}
          setAccordionValue={setAccordionValue}
        />
      ))}
    </Accordion>
  );
};

const SubjectAccordion = ({
  subject,
  subIndex,
  currQstIndex,
  currSubIndex,
  examResponses,
  currentSubject,
  accordionValue,
  handleQstIndexNext,
  setAccordionValue,
}: {
  subIndex: number;
  currQstIndex: number;
  currSubIndex: number;
  accordionValue: number;
  subject: IMcqQuestionProps;
  currentSubject: IMcqQuestionProps;
  examResponses: IExamUpdatesProps[];
  setAccordionValue: (index: number) => void;
  handleQstIndexNext: (
    index: number,
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
    <>
      <AccordionItem
        value={String(subIndex)}
        className="lg:border-[1px] rounded-t-md dark:bg-[#0E0E0E] dark:border-transparent mb-[16px] data-[state=open]:bg-[#edf1fb] max-h-[60vh]"
        data-id="biology-accordium"
      >
        <div
          className={cn(
            "flex flex-nowrap justify-between items-center text-center  font-medium  px-2 dark:bg-[#171717]"
          )}
        >
          <AccordionTrigger
            className="justify-start hover:no-underline w-full "
            onClick={() =>
              setAccordionValue(accordionValue === subIndex ? -1 : subIndex)
            }
          >
            <div className="flex w-full">
              <p>
                {subject.subject} {subject.sectionName}
              </p>
            </div>
          </AccordionTrigger>
        </div>
        <AccordionContent className=" p-4 scrollbar-thin !max-h-[500px] overflow-y-auto bg-[#f5f5f582] dark:bg-[#0E0E0E] bg-[#fff]">
          <div className="w-full flex justify-between items-center mb-3 gap-1 overflow-y-auto scrollbar-thin">
            <Indicater color="before:bg-[#046444]" text="Answered" />
            <Indicater color="before:bg-[#D70015]" text="Not Answered" />
            <Indicater color="before:bg-[#FF9900]" text="Mark For Review" />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            {subject.questions.map((qst, index) => {
              const status = examResponses.find(
                (res) =>
                  res.secId === subject.secId &&
                  res.sId === subject.sId &&
                  res.qId === qst.qstId
              );
              return (
                <QuestionNumber
                  key={index}
                  subject={subject}
                  subIndex={subIndex}
                  currQstIndex={currQstIndex}
                  currSubIndex={currSubIndex}
                  currentSubject={currentSubject}
                  questionIndex={index + 1}
                  staus={
                    status?.ans && status.mr
                      ? QuestionIndexValue.SAVE_MARK_REVIEW
                      : status?.ans
                      ? QuestionIndexValue.ANSWERED
                      : status?.mr
                      ? QuestionIndexValue.MARK_FOR_REVIEW
                      : status?.ans === ""
                      ? QuestionIndexValue.NOT_ANSWERED
                      : QuestionIndexValue.NOT_VISITED
                  }
                  handleQstIndexNext={handleQstIndexNext}
                />
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

const QuestionNumber = ({
  staus,
  subject,
  subIndex,
  currQstIndex,
  currSubIndex,
  questionIndex,
  currentSubject,
  handleQstIndexNext,
}: {
  subIndex: number;
  currQstIndex: number;
  currSubIndex: number;
  questionIndex: number;
  staus?: QuestionIndexValue;
  subject: IMcqQuestionProps;
  currentSubject: IMcqQuestionProps;
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
    <div
      className={cn(
        "w-[40px] h-[40px] shadow-sm flex justify-center items-center border cursor-pointer rounded-[8px] transition-all font-semibold text-[14px] select-none",
        staus === QuestionIndexValue.SAVE_MARK_REVIEW
          ? " before:w-[13px] before:h-[13px]  before:inline-block before:rounded-[50%] before:bg-[#ffcb72] before:absolute before:bottom-[-1px] before:right-[-2px] bg-[#C7F7D499] dark:bg-[#C7F7D4] dark:border-[#C7F7D4] text-[#046444] border-[#C7F7D499] relative"
          : staus === QuestionIndexValue.ANSWERED
          ? "bg-[#C7F7D499] text-[#046444] dark:bg-[#C7F7D4] dark:border-[#C7F7D4] border-[#C7F7D499]"
          : staus === QuestionIndexValue.NOT_ANSWERED
          ? "bg-[#FDD7CA99] text-[#D70015] border-[#FDD7CA99] dark:bg-[#FDD7CA] dark:border-[#FDD7CA] "
          : staus === QuestionIndexValue.MARK_FOR_REVIEW
          ? "bg-[#FFF2CCB3] text-[#DB7A00]  border-[#FFF2CCB3]dark:bg-[#FFF2CC] dark:border-[#FFF2CC]"
          : "",
        subIndex === currSubIndex && questionIndex - 1 === currQstIndex
          ? "!border-[#101010] dark:!border-[#FFFF] dark:!border-[#f5f5f5] !border-[1px] dark:border-[1px] cursor-default"
          : ""
      )}
      // this is for direct access to question , 
      // purticular question number and under what subject, subjectId and question id need to pass for update the status, 
      // current secid, subid and qid, is the ids of last subject and questions, and subject sec id sid and question ids for next ids
      onClick={() => {
        if (subIndex === currSubIndex && questionIndex - 1 === currQstIndex)
          return;
        handleQstIndexNext(
          questionIndex - 1,
          subIndex,
          currentSubject.secId,
          currentSubject.sId,
          currentSubject.questions[currQstIndex].qstId,
          subject.secId,
          subject.sId,
          subject.questions[questionIndex - 1].qstId
        );
      }}
    >
      {questionIndex}
    </div>
  );
};

export const Indicater = ({ color, text, className, indicatorClassName }: { color: string; text: string, className?:string, indicatorClassName?:string }) => {
  return (
    <div
      className={cn(
        `before:content-[''] before:w-[10px] before:h-[10px]  before:inline-block before:rounded-[50%] flex items-center flex-row`,
        color, indicatorClassName
      )}
    >
      <p className={cn("ml-2 text-[11px] text-nowrap", className)}>{text}</p>
    </div>
  );
};
export default SubjectComponent;
