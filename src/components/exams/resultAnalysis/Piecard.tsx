"use client";
import React, { FC } from "react";
import { PieCharts } from "@/components/common/charts/PieChart";
import MainCard from "@/components/common/MainCard";
import Tick from "@/components/icons/Tick";
import { Cross1Icon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";

interface PiecardProps {
  count: number;
  totalCount: number;
  percentage: number;
  title: string;
  icon?: any;
  fill: string;
  bgColor: string;
}

const iconMapper: { [key: string]: React.ReactNode } = {
  Tick: <Tick />,
  Cross: <Cross1Icon />,
  Circle: <QuestionMarkCircledIcon />,
};

const Piecard: FC<PiecardProps> = ({ count, percentage, title, icon, fill, totalCount, bgColor }) => {
  const chartData = [
    { name: title, value: count, fill },
    { name: "Others", value: totalCount - count, fill: bgColor },
  ];

  const chartConfig = {
    [title]: {
      label: title,
    },
  };

  return (
    <MainCard
      title={
        <h2 className="flex items-center !text-[#101010]/[80%] dark:!text-[#fff]/[100%] lg:!text-[18px] !text-[16px] mb-[-1.5rem]">
          <span className="mr-2">{icon}</span>
          {title}
        </h2>
      }
      className="lg:p-4 p-2  w-full shadow-none rounded-lg"
      key={title}
    >
      <>
        <div className="flex items-center justify-between  mb-[-20px]">
          <div>
            <div className="!text-[30px] font-bold" style={{ color: fill }}>
              {percentage}
              <span className="!text-[#101010]/[75%] dark:!text-[#fff]/[70%] lg:!text-[16px] !text-[14px]"> %</span>
            </div>
            <div className="!text-sm !text-gray-500">
              {count}/{totalCount}
            </div>
          </div>

          <div className="w-1/2">
            <PieCharts chartConfig={chartConfig} chartData={chartData} />
          </div>
        </div>
      </>
    </MainCard>
  );
};

export interface IPieCardsBlockProps {
  correct: number;
  wrong: number;
  left: number;
  correctPercent: number;
  wrongPercent: number;
  leftPercent: number;
  totalQsts: number;
}

const PieCardsBlock: FC<IPieCardsBlockProps> = ({
  correct,
  correctPercent,
  left,
  leftPercent,
  totalQsts,
  wrong,
  wrongPercent,
}) => {
  const data = [
    {
      title: "Correct",
      count: Number(correct?.toFixed(2) || 0),
      percentage: Number(correctPercent?.toFixed(2) || 0),
      icon: "Tick",
      fill: "#4eb268",
      bgColor: "#e8f3f0",
    },
    {
      title: "Incorrect",
      count: Number(wrong?.toFixed(2) || 0),
      percentage: Number(wrongPercent?.toFixed(2) || 0),
      icon: "Cross",
      fill: "#FF4E42",
      bgColor: "#fbeaeb",
    },
    {
      title: "Left",
      count: Number(left?.toFixed(2) || 0),
      percentage: Number(leftPercent?.toFixed(2) || 0),
      icon: "Circle",
      fill: "#FBBF24",
      bgColor: "#fef4e9",
    },
  ];
  return (
    <>
      {data.map((data, index) => (
        <Piecard
          key={index}
          totalCount={totalQsts}
          percentage={data.percentage}
          title={data.title}
          icon={iconMapper[data.icon]}
          fill={data.fill}
          count={data.count}
          bgColor={data.bgColor}
        />
      ))}
    </>
  );
};

export default PieCardsBlock;
