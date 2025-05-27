"use client";
import React, { useEffect, useState } from "react";
import MainCard from "@/components/common/MainCard";

import CustomSelect from "@/components/common/Select";

import { EXAM_DIFFICULTY_LEVEL, IDifficultyProps } from "@/types/exam";
import TestIcon from "@/components/icons/Test";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoughnutCharts } from "@/components/common/charts/DoughnutCharts";

const tabKeys = [
  { id: 1, value: "Easy" },
  { id: 2, value: "Medium" },
  { id: 3, value: "Hard" },
];
const getColor = (difficulty: number) => {
  return difficulty === EXAM_DIFFICULTY_LEVEL.EASY
    ? "bg-[#78BC81]"
    : difficulty === EXAM_DIFFICULTY_LEVEL.MEDIUM
    ? "bg-[#F8D66D]"
    : "bg-[#FF6B65]";
};
const DifficultyPerformace = ({ data }: { data: IDifficultyProps[] }) => {
  const option = data.map((d) => ({ value: d.sId, label: d.name }));
  const [performance, setPerformance] = useState(data[0]);
  const [selectedSubject, setSelectedSubject] = useState(data[0].sId);

  useEffect(() => {
    const selectedPerformace = data.find((subject) => subject.sId === selectedSubject);
    selectedPerformace && setPerformance(selectedPerformace);
  }, [data, selectedSubject]);
  return (
    <MainCard
      className="shadow-none"
      title={
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-1 bg-[#E2E8F0] rounded">
                <TestIcon />
              </div>
              <h2 className="!text-sm font-semibold !text-gray-800 dark:!text-white md:!text-lg sm:!text-base ms-[4px] sm:ms-2">
                Difficulty Performance
              </h2>
            </div>
            <div>
              <CustomSelect
                onValueChange={(value) => setSelectedSubject(Number(value))}
                options={option}
                selectedValue={selectedSubject}
                className='w-[120px] lg:w-[180px]'
              />
            </div>
          </div>
        </>
      }
    >
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:h-12">
          {tabKeys.map((value, index) => (
            <TabsTrigger
              value={`${value.id}`}
              key={index}
              className={`${getColor(value.id)} !text-[#101010] dark:!text-[#fff] mx-[2px] sm:mx-2 py-[3px] sm:py-2`}
            >
              {value.value}
            </TabsTrigger>
          ))}
        </TabsList>
        {performance.difficultyWise.map((difficulty, index) => {
          return (
            <TabsContent value={`${difficulty.difficulty}`} key={index}>
              <div className="flex flex-row justify-between">
                <div className="w-[40%] !h-[40%]">
                  <DoughnutCharts
                    centerTextLabelValue={`${difficulty.correct}/${difficulty.totalQsts}`}
                    centerLabelValueClassName="!text-[12px] sm:!text-[14px] font-[400]"
                    className="!max-h-[200px] "
                    chartConfig={{}}
                    chartData={difficulty.correctChartData.map((correct) => ({
                      ...correct,
                      fill: correct.name === "Correct" ? "#76BB84" : "#f4f4f5",
                    }))}
                  />
                </div>
                <div className="w-[40%] !h-[40%]">
                  <DoughnutCharts
                    centerTextLabelValue={`${difficulty.wrong}/${difficulty.totalQsts}`}
                    centerLabelValueClassName="!text-[12px] sm:!text-[14px] font-[400]"
                    className="!max-h-[200px]"
                    chartConfig={{}}
                    chartData={difficulty.wrongChartData.map((wrong) => ({
                      ...wrong,
                      fill: wrong.name === "Wrong" ? "#e43836" : "#f4f4f5",
                    }))}
                  />
                </div>
                <div className="w-[40%] !h-[40%]">
                  <DoughnutCharts
                    centerTextLabelValue={`${difficulty.left}/${difficulty.totalQsts}`}
                    centerLabelValueClassName="!text-[12px] sm:!text-[14px] font-[400]"
                    className="!max-h-[200px]"
                    chartConfig={{}}
                    chartData={difficulty.leftChartData.map((correct) => ({
                      ...correct,
                      fill: correct.name === "Left" ? "#fbbf3e" : "#f4f4f5",
                    }))}
                  />
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </MainCard>
  );
};
export default DifficultyPerformace;
