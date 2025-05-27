import React, { FC } from "react";
import MainCard from "@/components/common/MainCard";
import { RadialChart } from "@/components/common/charts/AccuracyRadialChart";
import Tick from "@/components/icons/Tick";

interface RadialChartCardProps {
  title: string;
  accuracy: number;
}

const RadialChartCard: FC<RadialChartCardProps> = ({ title, accuracy }) => {
  const chartData = [{ name: "Accuracy", accuracy: Number(accuracy.toFixed(2)), total: 100 }];

  return (
    <MainCard
      title={
        <h2 className="flex items-center !text-[#101010]/[80%] dark:!text-[#fff]/[100%] lg:!text-[18px] !text-[16px] mb-[-1.5rem]">
          <span className="mr-2">{<Tick />}</span>
          {title}
        </h2>
      }
      className="lg:p-4 p-2 h-[240px]  w-full shadow-none rounded-lg"
      key={title}
    >
      <div className="">
        <RadialChart
          chartData={chartData}
          chartConfig={{}}
          centerLableValue={`${accuracy.toFixed(1)}%`}
          activeToolTip={false}
        />
      </div>
    </MainCard>
  );
};

export default RadialChartCard;
