import React from "react";
import CommonCardBlock from "../CommonCardBlock";
import { IExamSectionWiseProps } from "@/types/exam";

const SubjectWiseResultCard = ({
  subjectWiseData,
}: {
  subjectWiseData: IExamSectionWiseProps;
}) => {
  return (
    <>
      <div className="relative lg:pb-[60px] pb-[0px]">
        <CommonCardBlock className="">
          <div className="lg:text-[20px] text-[14px] text-[#101010] dark:text-[#fff] lg:mb-[16px] mb-[12px]">
            {subjectWiseData.subjectName}
          </div>
          <div className="border-t border-[#101010]/[15%] dark:border-[#fff]/[15%] py-2 ">
            {subjectWiseData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="flex justify-between py-1">
                <p className="lg:text-[16px] text-[14px] dark:text-[#fff]/[70%] text-[#101010]/[70%] font-normal">
                  {section.sectionName}
                </p>
                <p className="font-semibold lg:text-[16px] text-[16px] text-[#101010] dark:text-[#fff]">
                  {section.attentedQsts}
                  <span className="text-[#101010]/[70%] dark:text-[#fff]/[70%]">
                    /{section.totalQuestions}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </CommonCardBlock>
      </div>
    </>
  );
};

export default SubjectWiseResultCard;
