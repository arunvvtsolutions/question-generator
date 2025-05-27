import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import Image from 'next/image';
import { ISecQstProps } from '@/types/exam';
import { QB_IMG_BASE_URL } from '@/config';
import MarkDown from '@/components/common/MarkDown';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TimerIcon } from '@radix-ui/react-icons';
import { EXAM_ANALYSIS_RESULT } from '@/service/enums/texts';
const cognitiveLevelColor = (level: string) => {
  if (level === 'Application') return 'border-[#cefafd] bg-[#cefafd] !text-[#0e748e] ';
  if (level === 'Applying') return 'border-[#cefafd] bg-[#cefafd] !text-[#0e748e] ';
  if (level === 'Remembering') return 'border-[#f3e8fe] bg-[#f3e8fe] !text-[#a562d9] ';
  if (level === 'Understanding') return 'border-[#dce9fd] bg-[#dce9fd] !text-[#2550d4] ';
  if (level === 'Knowledge') return 'border-[#cbfbf1] bg-[#cbfbf1] !text-[#09756e] ';
};
const colorSchemes = [
  { bg: '#EADCF8', text: '#8A2BE2' },
  { bg: '#DCE9FD', text: '#2550D4' },
  { bg: '#D5F7F8', text: '#0D8F95' },
  { bg: '#DBFCE7', text: '#1C715A' },
  { bg: '#FDE2E4', text: '#D8345F' },
  { bg: '#FDDADA', text: '#C62828' },
];
let lastColorIndex = -1;

const getNextColor = () => {
  let nextColorIndex;
  do {
    nextColorIndex = Math.floor(Math.random() * colorSchemes.length);
  } while (nextColorIndex === lastColorIndex);
  lastColorIndex = nextColorIndex;
  return colorSchemes[nextColorIndex];
};

const QnAResultAccordion = ({ section }: { section: ISecQstProps }) => {
  return (
    <AccordionItem
      value={`section${section.id}`}
      className="mb-[20px] border bg-white dark:bg-[#171717] border-[#101010]/[10%] dark:border-[#fff]/[10%]"
    >
      <AccordionTrigger className="lg:py-[20px] lg:px-[20px] px-[16px] dark:text-[#fff]/[70%] hover:no-underline lg:text-[20px] text-[16px] text-[#101010] font-semibold bg-white dark:bg-[#171717] flex justify-between border-b-0 data-[state=open]:border-b !rounded-[4px] border-[#101010]/[10%] dark:border-[#fff]/[10%] ">
        {section.section}
      </AccordionTrigger>
      <AccordionContent>
        {section.questions.map((question, index) => (
          <div
            key={question.qstId}
            className="px-4 py-2 mt-0 rounded-tl-none rounded-br-[4px] rounded-tr-none rounded-bl-[4px] border-b last:border-none last:pb-0"
          >
            <div className="flex justify-between items-center lg:mb-[26px] mb-[18px] lg:pt-4 pt-2 flex-wrap gap-2 sm:gap-0">
              <h3 className="font-normal lg:text-[16px] text-[12px] text-[#101010]/[70%] dark:!text-[#fff]/[70%]">
                {EXAM_ANALYSIS_RESULT.QUESTION} {index + 1} of {section.questions.length}
              </h3>
              <div className="flex gap-2 flex-wrap">
                {question?.title && (
                  <div
                    className={`flex items-center gap-2 rounded-3xl border px-3 md:px-4 !py-1 ${cognitiveLevelColor(
                      question?.title || ''
                    )}`}
                  >
                    <span className="text-nowrap text-[11px] sm:text-[12px] font-medium capitalize  tracking-wider">
                      {question?.title}
                    </span>
                  </div>
                )}

                <Badge
                  className={cn(
                    ' rounded-[25px] px-3 md:px-4 !py-1 !shadow-none text-nowrap text-[11px] sm:text-[12px] font-medium capitalize  tracking-wider',
                    question.difficulty === 1
                      ? 'border-[#d0fae5] bg-[#d0fae5] !text-[#007758] hover:bg-[#d0fae5] '
                      : question.difficulty === 2
                      ? 'border-[#fdf9c7] bg-[#fdf9c7] !text-[#a1621b] hover:bg-[#fdf9c7]'
                      : question.difficulty === 3
                      ? 'border-[#fee2e2] bg-[#fee2e2] !text-[#ba2023] hover:bg-[#fee2e2]'
                      : 'border-[#fdf9c7] bg-[#fdf9c7] !text-[#a1621b] hover:bg-[#fdf9c7]'
                  )}
                >
                  {question.difficulty === 1 ? 'Easy' : question.difficulty === 2 ? 'Medium' : 'Hard'}
                </Badge>

                {question?.estimatedTime && (
                  <Badge className=" rounded-[25px] !bg-[#e0f2fe] px-3 md:px-4 !py-1 text-[#0a699e] !shadow-none text-[11px] sm:text-[12px] ">
                    <TimerIcon className="me-2" /> {question?.estimatedTime} mins
                  </Badge>
                )}
                <Badge
                  className={` rounded-[25px]  px-3 md:px-4 !py-1 !shadow-none text-[11px] sm:text-[12px] ${
                    question.selectedAns === question.correctOpt
                      ? 'bg-[#248A3D] !text-[#fff]'
                      : question.selectedAns && question.selectedAns !== question.correctOpt
                      ? 'bg-[#FF3B30] !text-[#fff]'
                      : 'bg-[#FFCC00] !text-[#101010]'
                  }`}
                >
                  {question.selectedAns === question.correctOpt
                    ? 'Correct'
                    : question.selectedAns && question.selectedAns !== question.correctOpt
                    ? 'Wrong'
                    : 'Left'}
                </Badge>
              </div>
            </div>

            <p className="lg:text-[20px] text-[16px] leading-[24px] text-[#101010] dark:text-[#fff] font-semibold lg:leading-[28px] mb-[30px]">
              <MarkDown content={question.question} />
            </p>

            {question?.questionImg && question?.questionImg !== '#' && (
              <div className="w-[150px] relative my-2">
                <Image
                  src={`${QB_IMG_BASE_URL}/${question.questionImg}`}
                  alt="Question Image"
                  className="object-contain !w-[100%] !h-[100%]"
                  width={300}
                  height={300}
                />
              </div>
            )}

            <div className="mt-2 space-y-2">
              {question.options.map((option, index) => {
                const isSelected = question.selectedAns === option.optionId;
                const isCorrect = option.optionId === question.correctOpt;
                let optionStyle = 'bg-[#D9F9D466]/[50%] dark:bg-[#D9F9D4] border border-[#09644380]/[50%]';
                if (isSelected && !isCorrect) {
                  optionStyle = 'bg-[#FFE5D566]/[40%] dark:bg-[#FFE5D5]/[100%] border border-red-400';
                } else if (!isCorrect && !isSelected) {
                  optionStyle = 'bg-[#fff] border ';
                }

                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-[4px] flex justify-between items-center  lg:mb-[14px] mb-[10px] ${optionStyle}`}
                  >
                    <div className="w-[100%] flex  items-center lg:p-[15px] p-[12px] relative">
                      <div className="">
                        <div
                          className={` w-[40px] h-[40px] flex-shrink-0 flex items-center justify-center   ${
                            isCorrect
                              ? 'bg-[#248A3D] text-[#fff]'
                              : isSelected
                              ? 'bg-[#FF3B30] text-[#fff]'
                              : 'bg-[#F5F5F5B2] text-[#101010]'
                          } font-bold text-[14px]`}
                        >
                          {option.optionKey}
                        </div>
                      </div>

                      <div className="  ps-6 pe-4 ">
                        {option.option && (
                          <p
                            className={`text-[12px] lg:text-[14px] ${
                              isCorrect ? 'text-[#248A3D]' : isSelected ? 'text-[#FF3B30]' : 'text-[#101010]/[70%]'
                            }`}
                          >
                            <MarkDown content={option.option} />
                          </p>
                        )}

                        {option.optionImg && option.optionImg !== '#' && (
                          <div className="lg:w-[70px] w-[50px] relative my-2">
                            <Image
                              src={`${QB_IMG_BASE_URL}/${option.optionImg}`}
                              alt="Question Image"
                              className="object-contain !w-[100%] !h-[100%]"
                              width={300}
                              height={300}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <span
                      className={`absolute top-[50%] right-[15px] translate-y-[-50%] font-bold ${
                        isCorrect ? 'text-[#248A3D]' : isSelected ? 'text-red-500' : 'text-gray-700'
                      }`}
                    >
                      {isCorrect ? '✓' : isSelected ? '✕' : ''}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mb-2 mt-6 flex flex-wrap items-center gap-2 rounded-lg">
              {question?.subjectName && (
                <div className="flex items-center gap-2 rounded-3xl border-[#e0e7fe] bg-[#e0e7fe] px-2 md:px-4 py-[6px] md:py-2 ">
                  <span className="text-nowrap text-[13px] font-medium text-[#000] lg:text-[14px]  ">📚 Subject:</span>
                  <span className="text-nowrap text-[13px]  font-medium text-[#473ac5] lg:text-[14px] ">
                    {question.subjectName}
                  </span>
                </div>
              )}

              {question.chapterName && (
                <div className="borer-[#fef2ca] flex items-center gap-2 rounded-3xl bg-[#fef2ca] px-2 md:px-4 py-[6px] md:py-2">
                  <span className="text-nowrap text-[13px] font-medium text-[#000] lg:text-[14px]  ">📑 Chapter:</span>
                  <span className="text-nowrap text-[13px]  font-medium text-[#b4541c] lg:text-[14px] ">
                    {question.chapterName}
                  </span>
                </div>
              )}

              {question.topicName && (
                <div className="flex items-center gap-2 rounded-3xl border-[#ecfbce] bg-[#ecfbce] px-2 md:px-4 py-[6px] md:py-2">
                  <span className="text-nowrap text-[13px] font-medium text-[#000] lg:text-[14px]  ">🎯 Topic:</span>
                  <span className="text-nowrap text-[13px]  font-medium text-[#4d7d1f] lg:text-[14px] ">
                    {question.topicName}
                  </span>
                </div>
              )}
            </div>

            {question.keywords && (
              <div className="flex flex-wrap items-center gap-2 my-4">
                <div className=" text-nowrap text-[12px] md:text-[13px] font-semibold text-[#101010] lg:text-[14px] dark:text-[#fff]  ">
                  🔄 Concepts:
                </div>
                {question.keywords.split(',').map((keyword, i) => {
                  const colors = getNextColor();
                  return (
                    <div className="rounded-lg" key={i}>
                      <div
                        className="flex items-center rounded-3xl px-2 py-[6px] md:px-4 md:py-2"
                        style={{ backgroundColor: colors.bg }}
                      >
                        <span
                          style={{ color: colors.text }}
                          className="text-nowrap text-[12px] md:text-[13px]  font-medium text-blue-600 lg:text-[14px]"
                        >
                          {keyword || 'NA'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="bg-[#D1DDF74D]/[30%] dark:bg-[#DDE7FA] lg:p-[16px] p-[14px] rounded-[10px] my-4">
              <h4 className="font-semibold text-[#101010] lg:text-[18px] text-[16px] lg:mb-[13px] mb-[10px]">
                {EXAM_ANALYSIS_RESULT.EXPLAINATION}
              </h4>
              <p className="text-[#040A32] lg:text-[16px] text-[14px] leading-[24px] mark_down_text">
                <MarkDown content={question.answerDesc} />
              </p>
              {question.answerImg && question.answerImg !== '#' && (
                <div className="lg:w-[70px] w-[50px] relative my-2">
                  <Image
                    src={`${QB_IMG_BASE_URL}/${question.answerImg}`}
                    alt="Question Image"
                    className="object-contain !w-[100%] !h-[100%]"
                    width={300}
                    height={300}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default QnAResultAccordion;
