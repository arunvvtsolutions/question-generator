import React from "react";
import { IViewGeneratedQstProps } from "@/types/generate-questions";
import MarkDown from "@/components/common/MarkDown";

const Questions = ({ subjects }: { subjects: IViewGeneratedQstProps[] }) => {
  return (
    <div className="w-full print-qst-div p-5 columns-1 lg:columns-2 gap-x-[40px] [column-rule:1px_solid_#101010] dark:[column-rule:1px_solid_#ffff]">
      {subjects.map((sub, index) => {
        const startNumber = subjects.slice(0, index).reduce((acc, curr) => acc + curr.questions.length, 0);
        return (
          <div key={index} className="w-full border-b last:border-b-0 mb-2 print-subject-div dark:border-[#fff]">
            <p className="text-center font-semibold text-[18px] mb-2 text-[#0B57D0]">{sub.subjectName}</p>
            {sub.questions.map((qst, i) => (
              <div key={`questions-${i}`} className="mb-4 break-inside-avoid-column">
                <div className="font-medium text-[16px] mb-2 flex items-start">
                  <span className="mr-2">
                    {startNumber + (i + 1)}.{` `}
                  </span>
                  <MarkDown content={qst.question} />
                </div>
                <div className="w-full flex flex-wrap justify-between lg:mt-3 gap-x-[10px] px-[20px] lg:px-[50px]">
                  {qst.options.map((opt, i) => (
                    <div key={`option-${i}`} className="mb-3 flex items-start">
                      <span className="mr-2">
                        {i + 1}
                        {`) `}
                      </span>
                      <MarkDown content={opt.option} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Questions;
