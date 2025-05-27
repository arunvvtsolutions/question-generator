"use client";
import { DoughnutCharts } from "@/components/common/charts/DoughnutCharts";
import MainCard from "@/components/common/MainCard";
import { RESULT_ANALYSIS } from "@/service/enums/texts";
import React, { FC } from "react";

interface IpropsMarksCard {
  marksScored: number;
  totalMarks: number;
}

interface IpropsMarksCardData {
  data: IpropsMarksCard;
}

const MarksCard: FC<IpropsMarksCardData> = ({ data }) => {
  const chartData = [
    { name: "Scored", value: data.marksScored, fill: "#4eb268" },
    { name: "Remaining", value: data.totalMarks - data.marksScored, fill: "#d1d5db" },
  ];

  const chartConfig = {
    Scored: {
      label: "Scored",
    },
  };

  return (
    <>
      <div className="lg:col-span-6 col-span-12 w-full h-full bg-white dark:bg-[#1a1a1a]  rounded-lg">
        <MainCard
          title={
            <h2 className="!text-[#101010]/[80%] dark:!text-[#fff]/[100%] lg:text-[18px]  text-[16px] mb-[-1.5rem]">
              {RESULT_ANALYSIS.MARKS}
            </h2>
          }
          className="lg:p-4 p-2 h-full w-full shadow-none rounded-lg"
          cardAction={<></>}
          description={<></>}
          onClick={() => {}}
          key={"marks-card"}
        >
          <div className="flex justify-between items-center">
            <div className="lg:w-[30%] w-[80%] lg:pr-[20px] pr-[10px]">
              <DoughnutCharts
                chartConfig={chartConfig}
                chartData={chartData}
                centerTextLabel="Scored"
                centerTextLabelValue={`${data.marksScored}`}
              />
            </div>

            <div className="flex-1 h-full max-w-[100%] lg:ps-[2rem] ps-[1rem] pl-2 border-l  ">
              <div className="pb-2 whitespace-nowrap flex  items-center justify-between flex-col border-b mb-2">
                <h2 className=" !text-[#10101]/[70%] dark:!text-[#fff]/[70%] font-normal lg:text-[22px] text-[16px] tracking-[0.40px">
                  {" "}
                  {RESULT_ANALYSIS.MARK_SCORED}
                </h2>
                <p className="  !text-[#10101]/[100%] dark:text-[#F6C344] font-semibold lg:text-[18px] text-[15px]">
                  {data.marksScored}{" "}
                </p>
              </div>
              <div className="pb-2 whitespace-nowrap flex  items-center justify-between flex-col">
                <h2 className="text-[#10101]/[70%] dark:!text-[#fff]/[70%] font-normal  lg:text-[22px] text-[16px] tracking-[0.40px">
                  {RESULT_ANALYSIS.TOTAL_MARK}
                </h2>
                <p className="text-[#10101]/[100%] dark:!text-[#4BB16C] font-semibold  lg:text-[18px] text-[15px]">
                  {data.totalMarks}
                </p>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </>
  );
};

export default MarksCard;
