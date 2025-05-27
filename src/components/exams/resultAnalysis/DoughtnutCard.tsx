"use client";
import React, { FC } from "react";
import MainCard from "@/components/common/MainCard";
import { DoughnutCharts } from "@/components/common/charts/DoughnutCharts";
import { ISubjectWiseAnalysisProps } from "@/types/exam";

interface DoughnutCardProps {
  count: number;
  percentage: number;
  title: string;
  fill: string;
  totalCount: number;
}

const DoughnutCard: FC<DoughnutCardProps> = ({ count, percentage, title, fill, totalCount }) => {
  const chartData = [
    { name: title, value: (count), fill },
    { name: "Others", value: totalCount - count, fill: "#f4f4f5" },
  ];

  const chartConfig = {
    [title]: {
      label: title,
    },
  };

  return (
    <MainCard
      title={<h2 className=" !text-[#101010]/[80%] dark:!text-[#fff]/[100%] lg:!text-[18px] !text-[16px] mb-[-1.5rem]">{title}</h2>}
      className="lg:p-4 p-2 w-full  shadow-none rounded-lg"
      cardAction={<></>}
      description={<></>}
      onClick={() => {}}
      key={title}
    >
      <>
        <div className="mx-auto w-[40%] pb-[-20px]">
          <DoughnutCharts
            chartConfig={chartConfig}
            chartData={chartData}
            centerTextLabel={title}
            centerTextLabelValue={percentage ? `${percentage.toFixed(2)} %` : `${percentage}%`}
          />
        </div>
      </>
    </MainCard>
  );
};

export interface IDoughnutCardsBlockProps {
  data: ISubjectWiseAnalysisProps[];
}

const DoughnutCardsBlock: FC<IDoughnutCardsBlockProps> = ({ data }) => {
  const subjectwiseRes = data.map((d) => ({
    ...d,
    fill: d.subjectName === "Physics" ? "#e3342f" : d.subjectName === "Chemistry" ? "#4eb268" : "#f6c344",
  }));

  return (
    <>
      {subjectwiseRes.map((data, index) => (
        <DoughnutCard
          key={index}
          totalCount={data.totalMark}
          percentage={data.percentage}
          title={data.subjectName}
          fill={data.fill}
          count={data.scoredMark}
        />
      ))}
    </>
  );
};

export default DoughnutCardsBlock;
