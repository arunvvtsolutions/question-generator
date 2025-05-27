import React, { FC, useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ISubjectWiseAnalysisProps, ISubjectwiseResult } from "@/types/exam";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

interface ISubjectSectionProp {
  name: string;
  percentage: string;
  marks: string;
  timeTaken: string;
  accuracy: string;
  correct: number;
  incorrect: number;
  notAnswered: number;
}

interface ISubjectAccordionProp extends ISubjectSectionProp {
  sections?: ISubjectSectionProp[];
}

interface SubjectWiseAccordionProps {
  data: ISubjectwiseResult[];
}
const header = ["Name", "Percentage", "Marks", "Time Taken", "Accuracy", "Correct", "Wrong", "Not Answered"];

const SubjectWiseTableAccordion: FC<SubjectWiseAccordionProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="max-w-full overflow-x-auto">
      {/* Desktop Table View */}

      <div className="overflow-auto max-h-[500px]  scrollbar-thin">
        <table className="min-w-full border-collapse bg-white dark:bg-[#1F1F1F] shadow-lg rounded-lg overflow-hidden hidden md:table">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#F3F4F6] dark:bg-[#2A2A2A]">
              {header.map((title, index) => (
                <th
                  key={index}
                  className={cn(
                    "p-4  !text-[#111827] dark:!text-[#E5E7EB] md:!text-base sm:!text-sm",
                    index === 0 ? "!text-left" : "!text-center"
                  )}
                >
                  {title}
                </th>
              ))}
              <th className="p-4 !text-center !text-[#111827] dark:!text-[#E5E7EB] md:!text-base sm:!text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((subject, index) => (
              <React.Fragment key={index}>
                <tr
                  className={`border-t cursor-pointer transition duration-200  ${
                    expanded === index ? "bg-[#F9FAFB] dark:bg-[#343434]" : "hover:bg-[#F3F4F6] dark:hover:bg-[#2E2E2E]"
                  }`}
                  onClick={() => subject.section && subject.section.length > 0 && toggleExpand(index)}
                >
                  <td className="p-4 md:!text-base sm:!text-sm">{subject.subjectName}</td>
                  <td className="p-4 !text-center md:!text-base sm:!text-sm">{subject.percentage.toFixed(2)}</td>
                  <td className="p-4 !text-center md:!text-base sm:!text-sm">{subject.scoredMark}</td>
                  <td className="p-4 !text-center md:!text-base sm:!text-sm">
                    {subject.timeTaken / 60 > 1
                      ? `${(subject.timeTaken / 60).toFixed(2)} Mins`
                      : `${subject.timeTaken.toFixed(2)} Sec`}
                  </td>
                  <td className="p-4 !text-center md:!text-base sm:!text-sm">{subject.accuracy.toFixed(2)}</td>
                  <td className="p-4 !text-center !text-green-600 dark:!text-green-400 md:!text-base sm:!text-sm">
                    {subject.correct}
                  </td>
                  <td className="p-4 !text-center !text-red-600 dark:!text-red-400 md:!text-base sm:!text-sm">
                    {subject.wrong}
                  </td>
                  <td className="p-4 !text-center !text-yellow-600 dark:!text-yellow-400 md:!text-base sm:!text-sm">
                    {subject.left}
                  </td>
                  <td className="p-4 !text-center md:!text-base sm:!text-sm">
                    {subject.section && subject.section.length > 0 ? (
                      expanded === index ? (
                        <ChevronUpIcon />
                      ) : (
                        <ChevronDownIcon />
                      )
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                {expanded === index &&
                  subject.section &&
                  subject.section.map((sec, subIndex) => (
                    <tr key={subIndex} className="bg-green-100 dark:bg-[#3A3A3A] border-t">
                      <td className="p-4 pl-8 md:!text-base sm:!text-sm">{sec.sectionName}</td>
                      <td className="p-4 !text-center md:!text-base sm:!text-sm">{Number(sec.percentage).toFixed(2)}</td>
                      <td className="p-4 !text-center md:!text-base sm:!text-sm">{sec.marks}</td>
                      <td className="p-4 !text-center md:!text-base sm:!text-sm">
                        {Number(sec.timeTaken) / 60 > 1
                          ? `${(Number(sec.timeTaken) / 60).toFixed(2)} Mins`
                          : `${Number(sec.timeTaken).toFixed(2)} Sec`}
                      </td>
                      <td className="p-4 !text-center md:!text-base sm:!text-sm">{Number(sec.accuracy).toFixed(2)}</td>
                      <td className="p-4 !text-center !text-green-600 dark:!text-green-400 md:!text-base sm:!text-sm">
                        {sec.correct}
                      </td>
                      <td className="p-4 !text-center !text-red-600 dark:!text-red-400 md:!text-base sm:!text-sm">
                        {sec.wrong}
                      </td>
                      <td className="p-4 !text-center !text-yellow-600 dark:!text-yellow-400 md:!text-base sm:!text-sm">
                        {sec.left}
                      </td>
                      <td className="p-4 md:!text-base sm:!text-sm"></td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion View */}
      <Accordion type="single" collapsible className="md:hidden">
        {data.map((subject, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="bg-[#F3F4F6] dark:bg-[#2A2A2A] mb-2  pe-2 rounded-[4px]">
              <div className="flex justify-between w-full items-center p-4 rounded-md">
                <span className="!text-[#111827] dark:!text-[#E5E7EB] font-medium">{subject.subjectName}</span>
                {/* <span>{expanded === index ? '▲' : '▼'}</span> */}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 bg-white dark:bg-[#1F1F1F] border-t">
                <div className="flex justify-between !text-xs !text-gray-500 dark:!text-gray-300 border-b py-2">
                  <span>Percentage</span> <span>Marks</span> <span>Time</span> <span>Accuracy</span>
                </div>
                <div className="flex justify-between items-center !text-sm py-2">
                  <span className="!text-center">{subject.percentage.toFixed(1)}</span>
                  <span className="!text-center">{subject.scoredMark}</span>
                  <span className="!text-center">
                    {subject.timeTaken / 60 > 1
                      ? `${(subject.timeTaken / 60).toFixed(1)} m`
                      : `${subject.timeTaken.toFixed(1)} s`}
                  </span>
                  <span className="!text-center">{subject.accuracy.toFixed(1)}</span>
                </div>
                <div className="flex justify-between !text-xs !text-gray-500 dark:!text-gray-300 border-b py-2">
                  <span>Correct</span> <span>Wrong</span> <span>Left</span>
                </div>
                <div className="flex justify-between items-center !text-sm py-2">
                  <span className="!text-green-600 dark:!text-green-400">{subject.correct}</span>
                  <span className="!text-red-600 dark:!text-red-400">{subject.wrong}</span>
                  <span className="!text-yellow-600 dark:!text-yellow-400">{subject.left}</span>
                </div>
              </div>
              {subject.section &&
                subject.section.map((sec, subIndex) => (
                  <div key={subIndex} className="p-4 border-t bg-[#F3F9F9] dark:bg-[#3A3A3A]">
                    <p className="font-medium">{sec.sectionName}</p>
                    <div className="flex justify-between !text-xs !text-gray-500 dark:!text-gray-300 border-b py-2">
                      <span>Percentage</span> <span>Marks</span> <span>Time</span> <span>Accuracy</span>
                    </div>
                    <div className="flex justify-between items-center !text-sm py-2">
                      <span>{Number(sec.percentage).toFixed(1)}</span>
                      <span>{sec.marks}</span>
                      <span>
                        {Number(sec.timeTaken) / 60 > 1
                          ? `${(Number(sec.timeTaken) / 60).toFixed(1)} m`
                          : `${Number(sec.timeTaken).toFixed(1)} s`}
                      </span>
                      <span>{Number(sec.accuracy).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between !text-xs !text-gray-500 dark:!text-gray-300 border-b py-2">
                      <span>Correct</span> <span>Wrong</span> <span>Left</span>
                    </div>
                    <div className="flex justify-between items-center !text-sm py-2">
                      <span className="!text-green-600 dark:!text-green-400">{sec.correct}</span>
                      <span className="!text-red-600 dark:!text-red-400">{sec.wrong}</span>
                      <span className="!text-yellow-600 dark:!text-yellow-400">{sec.left}</span>
                    </div>
                  </div>
                ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SubjectWiseTableAccordion;
