import MainCard from "@/components/common/MainCard";
import { EXAM_GENERATE_RESULT, RESULT_ANALYSIS } from "@/service/enums/texts";
import { TimerIcon } from "@radix-ui/react-icons";
import React, { FC } from "react";

interface IpropsTimeTakenCard {
  data: {
    totalTestTime: number;
    timeTaken: number;
    avgTimePerQuestion: number;
  };
}

const TimeTakenCard: FC<IpropsTimeTakenCard> = ({ data }) => {
  return (
    <div className="lg:col-span-6 col-span-12 w-full h-full bg-white dark:bg-[#1a1a1a]  rounded-lg">
      <MainCard
        title={
          <h2 className="flex  items-center !text-[#101010]/[80%] dark:!text-[#fff]/[100%] lg:!text-[18px] !text-[16px] mb-[-1.5rem]">
            {EXAM_GENERATE_RESULT.TIME_TAKEN_TITLE} <TimerIcon className="ms-2" />
          </h2>
        }
        className="lg:p-4 p-2 h-full w-full shadow-none rounded-lg"
        key={"time-taken-card"}
      >
        <div className="mt-4">
          <div className="py-3 mb-2  whitespace-nowrap flex items-center justify-between border-b">
            <h2 className="!text-[#10101]/[70%] dark:!text-[#fff]/[70%] font-normal !text-[14px] tracking-[0.40px]">
              {RESULT_ANALYSIS.TOTAL_TEST_TIME}
            </h2>
            <p className="dark:!text-[#0385ff] !text-[#3365e1] font-semibold !text-[16px]">{`${data.totalTestTime} Mins`}</p>
          </div>

          <div className="py-3 mb-2 whitespace-nowrap flex items-center justify-between border-b">
            <h2 className="!text-[#10101]/[70%] dark:!text-[#fff]/[70%] font-normal !text-[14px] tracking-[0.40px">
              {RESULT_ANALYSIS.TIME_TAKEN}
            </h2>
            <p className="dark:!text-[#0385ff] !text-[#3365e1] font-semibold !text-[16px]">
              {data.timeTaken / 60 > 1
                ? `${(data.timeTaken / 60).toFixed(2)} Mins`
                : `${data.timeTaken.toFixed(2)} Sec`}
            </p>
          </div>

          <div className="py-3 whitespace-nowrap flex items-center justify-between border-b">
            <h2 className="!text-[#10101]/[70%] dark:!text-[#fff]/[70%] font-normal !text-[14px] tracking-[0.40px">
              {RESULT_ANALYSIS.AVG_TIME_QUES}
            </h2>
            <p className="dark:!text-[#0385ff] !text-[#3365e1] font-semibold !text-[16px]">
              {" "}
              {data.avgTimePerQuestion / 60 > 1
                ? `${(data.avgTimePerQuestion / 60).toFixed(2)} Mins`
                : `${data.avgTimePerQuestion.toFixed(2)} Sec`}
            </p>
          </div>
        </div>
      </MainCard>
    </div>
  );
};

export default TimeTakenCard;
