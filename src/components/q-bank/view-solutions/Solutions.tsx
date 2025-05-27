import React from "react";
import { IViewGeneratedQstProps } from "@/types/generate-questions";
import MarkDown from "@/components/common/MarkDown";

const Solutions = ({ subjects }: { subjects: IViewGeneratedQstProps[] }) => {
  return (
    <div className="w-full print-qst-div p-5 columns-1 lg:columns-2 gap-x-[40px] [column-rule:1px_solid_#101010] dark:[column-rule:1px_solid_#ffff]">
      {subjects.map((sub, index) => {
        const startNumber = subjects.slice(0, index).reduce((acc, curr) => acc + curr.questions.length, 0);
        return (
          <div key={index} className="w-full border-b mb-2 print-subject-div dark:border-[#fff]">
            <p className="text-center font-semibold text-[18px] mb-2 text-[#0B57D0]">{sub.subjectName}</p>
            {sub.questions.map((qst, i) => {
              const correctOpt = qst.options.find((opt, index) => index + 1 === Number(qst.correctOpt))?.option;
              return (
                <div key={`questions-${i}`} className="mb-8 break-inside-avoid-column">
                  <div className="font-medium text-[16px] mb-2 flex items-start">
                    <span>
                      {startNumber + (i + 1)}.{`  `}
                    </span>
                    <span className="text-[#0b57d0] mx-2 text-nowrap">
                      [ {qst.correctOpt} ]{`  `}
                    </span>
                    <MarkDown content={correctOpt || ""} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Solutions;
