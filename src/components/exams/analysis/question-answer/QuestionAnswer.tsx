import React  from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QnaResultAccordiun from './QnaResultAccordioun';
import { Accordion } from '@/components/ui/accordion';
import {  IQuestionWiseDataProps } from '@/types/exam';

interface Option {
  option: string;
  text?: string;
  optionImg?: string;
  isCorrect: boolean;
}

interface Question {
  quesId: number;
  difficulty: string;
  question?: string;
  questionImg?: string;
  selectedOption: string;
  options: Option[];
  explanation: string;
}

export interface ISectionProps {
  id: number;
  section: string;
  questions: Question[];
}

const QuestionAnswerSection = ({ questions }: { questions: IQuestionWiseDataProps[] | null }) => {
  return (
    <div>
      <Tabs defaultValue={String(questions?.[0]?.id)}>
        <div className="mb-4 overflow-x-auto">
          <TabsList className="bg-[#F9F9F9] dark:bg-[rgb(23,23,23)] space-x-2 mt-4 py-[25px] px-[4px] justify-start !rounded-[4px] border border-[#101010]/[10%] dark:border-[#fff]/[10%]">
            {questions?.map((subject, index) => (
              <TabsTrigger
                key={index}
                value={String(subject.id)}
                className="px-[16px] py-[10px] font-normal rounded !text-[16px] shadow-none !text-[#101010]/[70%] dark:!text-[#fff]/[70%] dark.data-[state=active]:bg-[#0A84FF] data-[state=active]:bg-[#0B57D0] data-[state=active]:!text-white dark:data-[state=active]:!text-[#fff]"
              >
                {subject.subject}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {questions?.map((subject, index) => (
          <TabsContent key={index} value={String(subject.id)}>
            <Accordion type="single" collapsible>
              {subject.sections.map((section) => (
                <QnaResultAccordiun key={section.id} section={section} />
              ))}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuestionAnswerSection;
