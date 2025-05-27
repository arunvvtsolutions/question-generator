import React, { FC, useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { IChapterwiseResultProps } from "@/types/exam";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface ITableAccordionProp {
  name: string;
  total: number;
  correct: number;
  incorrect: number;
  notAnswered: number;
  time: string;
  accuracy: string;
}

interface TableAccordionProps {
  data: IChapterwiseResultProps[];
}

const header = ["Chapter Name", "Total", "Correct", "Incorrect", "Not Answered", "Time", "Accuracy"];

const ChapterWiseTableAccordion: FC<TableAccordionProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="max-w-full">
      {/* Desktop Table View */}

      <div className="overflow-auto max-h-[500px]  scrollbar-thin">
        <table className="min-w-full border-collapse bg-white dark:bg-[#1F1F1F] shadow-lg rounded-lg  hidden md:table  overflow-y-auto">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#F3F4F6] dark:bg-[#2A2A2A]">
              {header.map((title, index) => (
                <th
                  className={cn(
                    "p-4 !text-left !text-[#111827] dark:!text-[#E5E7EB] md:!text-base",
                    index === 0 ? "!text-left" : "!text-center"
                  )}
                  key={index}
                >
                  {title}
                </th>
              ))}
              <th className="p-4 !text-center !text-[#111827] dark:!text-[#E5E7EB] md:!text-base"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((chapter, index) => (
              <React.Fragment key={index}>
                <tr
                  className={`border-t cursor-pointer transition duration-200  ${
                    expanded === index ? "bg-[#F9FAFB] dark:bg-[#343434]" : "hover:bg-[#F3F4F6] dark:hover:bg-[#2E2E2E]"
                  }`}
                  onClick={() => chapter.topics && chapter.topics.length > 0 && toggleExpand(index)}
                >
                  <td className="p-4 md:!text-base">{chapter.chapterName}</td>
                  <td className="p-4 !text-center md:!text-base">{chapter.totalQsts}</td>
                  <td className="p-4 !text-center !text-green-600 dark:!text-green-400 md:!text-base">{chapter.correct}</td>
                  <td className="p-4 !text-center !text-red-600 dark:!text-red-400 md:!text-base">{chapter.wrong}</td>
                  <td className="p-4 !text-center !text-yellow-600 dark:!text-yellow-400 md:!text-base">{chapter.left}</td>
                  <td className="p-4 !text-center md:!text-base">
                    {chapter.time / 60 > 1
                      ? `${(chapter.time / 60).toFixed(2)} mins`
                      : `${chapter.time.toFixed(2)} Sec`}
                  </td>
                  <td className="p-4 !text-center md:!text-base">{chapter.accuracy.toFixed(2)}</td>
                  <td className="p-4 !text-center md:!text-base">
                    {chapter.topics && chapter.topics.length > 0 ? (
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
                  chapter.topics.map((topic, subIndex) => (
                    <tr key={subIndex} className="bg-[#F3F9F9] dark:bg-[#3A3A3A] border-t">
                      <td className="p-4 pl-8 md:!text-base">{topic.topicName}</td>
                      <td className="p-4 !text-center md:!text-base">{topic.totalQsts}</td>
                      <td className="p-4 !text-center !text-green-600 dark:!text-green-400 md:!text-base">
                        {topic.correct}
                      </td>
                      <td className="p-4 !text-center !text-red-600 dark:!text-red-400 md:!text-base">{topic.wrong}</td>
                      <td className="p-4 !text-center !text-yellow-600 dark:!text-yellow-400 md:!text-base">
                        {topic.left}
                      </td>
                      <td className="p-4 !text-center md:!text-base">
                        {topic.time / 60 > 1 ? `${(topic.time / 60).toFixed(2)} mins` : `${topic.time.toFixed(2)} Sec`}
                      </td>
                      <td className="p-4 !text-center md:!text-base">{topic.accuracy.toFixed(2)}</td>
                      <td className="p-4 md:!text-base"></td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion View */}
      <Accordion type="single" collapsible className="md:hidden">
        {data.map((chapter, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="bg-[#F3F4F6] dark:bg-[#2A2A2A] mb-2  pe-2 rounded-[4px]">
              <div className="flex justify-between w-full items-center p-4 rounded-md">
                <span className="!text-[#111827] dark:!text-[#E5E7EB] font-medium text-start">{chapter.chapterName}</span>
                {/* <span>{expanded === index ? '▲' : '▼'}</span> */}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 bg-white dark:bg-[#1F1F1F] border-t">
                <div className="flex justify-between !text-xs !text-gray-500 dark:!text-gray-300 border-b py-2">
                  <span>Total</span> <span>Correct</span> <span>Wrong</span> <span>Left</span> <span>Accuracy</span>
                </div>
                <div className="flex justify-between items-center !text-sm py-2">
                  <span>{chapter.totalQsts}</span>
                  <span className="!text-green-600 dark:!text-green-400">{chapter.correct}</span>
                  <span className="!text-red-600 dark:!text-red-400">{chapter.wrong}</span>
                  <span className="!text-yellow-600 dark:!text-yellow-400">{chapter.left}</span>
                  <span>{chapter.accuracy.toFixed(2)}</span>
                </div>
              </div>
              {chapter.topics.map((topic, subIndex) => (
                <div key={subIndex} className="p-4 border-t bg-[#F3F9F9] dark:bg-[#3A3A3A]">
                  <p className="font-medium">{topic.topicName}</p>
                  <div className="flex justify-between !text-xs !text-gray-500 dark:!text-gray-300 border-b py-2">
                    <span>Total</span> <span>Correct</span> <span>Wrong</span> <span>Left</span> <span>Accuracy</span>
                  </div>
                  <div className="flex justify-between items-center !text-sm py-2">
                    <span>{topic.totalQsts}</span>
                    <span className="!text-green-600 dark:!text-green-400">{topic.correct}</span>
                    <span className="!text-red-600 dark:!text-red-400">{topic.wrong}</span>
                    <span className="!text-yellow-600 dark:!text-yellow-400">{topic.left}</span>
                    <span>{topic.accuracy.toFixed(2)}</span>
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

export default ChapterWiseTableAccordion;
