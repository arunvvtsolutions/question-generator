import React from "react";
import MainCard from "@/components/common/MainCard";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import MathJaxRender from "@/components/common/MathjaxRender";
import { IMcqQuestionProps, IQuestionProps } from "@/types/exam";
import Image from "next/image";
import { QB_IMG_BASE_URL } from "@/config";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "@/store";
import MarkDown from "@/components/common/MarkDown";
import { EXAM, EXAM_TYPE_SHORTURLS } from "@/service/enums/texts";

const QuestionCard = ({
  question,
  isBookMarked,
  subjectData,
  currentQstIndex,
  handleBookMark,
}: {
  question: IQuestionProps;
  isBookMarked: boolean;
  subjectData: IMcqQuestionProps;
  currentQstIndex: number;
  handleBookMark: (status: boolean, secId: number, sId: number, qId: number) => void;
}) => {
  const { examData } = useSelector((state) => state.examReducer);
  return (
    <div className="col-span-12">
      <MainCard
        title={
          <div className="flex flex-row justify-between items-center">
            <p className="text-[#101010] text-opacity-[70%] dark:text-[#ffff]">
              {EXAM.QUESTIONS} {currentQstIndex + 1} /{" "}
              <span className="text-[#101010] dark:text-[#ffff] font-[600]">{subjectData.questions.length}</span>
            </p>
            <div className="flex gap-1">
              {examData?.shortUrl === EXAM_TYPE_SHORTURLS.CUMULATIVE_TEST && (
                <Badge
                  className={` text-[10px] !px-[5px] !py-0 ${
                    question.difficulty === 1
                      ? "bg-[#248A3D] hover:bg-[#248A3D] !text-[#fff]"
                      : question.difficulty === 2
                      ? "bg-[#FFCC00] hover:bg-[#FFCC00] !text-[#101010]"
                      : question.difficulty === 3
                      ? "bg-[#FF3B30] !text-[#fff] hover:bg-[#FF3B30]"
                      : "bg-[#FFCC00] hover:bg-[#FFCC00]"
                  } text-[#101010]  rounded-[4px] py-[5px] px-[12px] text-center text-[12px] tracking-[0.40px]`}
                >
                  {question.difficulty === 1 ? "Easy" : question.difficulty === 2 ? "Medium" : "Hard"}
                </Badge>
              )}
              {!isBookMarked ? (
                <BookmarkIcon
                  className="cursor-pointer size-[21px]"
                  onClick={() =>
                    handleBookMark(
                      !isBookMarked,
                      subjectData.secId,
                      subjectData.sId,
                      subjectData.questions[currentQstIndex].qstId
                    )
                  }
                />
              ) : (
                <BookmarkFilledIcon
                  className="cursor-pointer size-[21px]"
                  onClick={() =>
                    handleBookMark(
                      !isBookMarked,
                      subjectData.secId,
                      subjectData.sId,
                      subjectData.questions[currentQstIndex].qstId
                    )
                  }
                />
              )}
            </div>
          </div>
        }
      >
        <>
          {question?.question && (
            <div>
              <h3 className="text-[16px] xl:text-[18px] font-medium  text-[#101010] dark:text-[#FFFF] !mt-0 xl:leading-[28px] leading-[22px]">
                <MarkDown content={question.question} />
              </h3>
            </div>
          )}
          {question?.questionImg && question?.questionImg != "#" && (
            <div className="w-full flex justify-center items-center">
              {" "}
              <Image
                src={`${QB_IMG_BASE_URL}/${question.questionImg}`}
                alt="question image"
                className="w-[260px] h-[160px]"
                width={100}
                height={100}
              />
            </div>
          )}
          {(!question?.questionImg || question?.questionImg) && !question?.question && <p>{EXAM.QST_NOT_AVAILABLE}</p>}
        </>
      </MainCard>
    </div>
  );
};

export default QuestionCard;
