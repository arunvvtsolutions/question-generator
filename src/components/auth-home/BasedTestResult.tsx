import React from "react";
import { DoughnutCharts } from "../common/charts/DoughnutCharts";
import { IAuthHomeExamResProps } from ".";
import { cn } from "@/lib/utils";

const BasedTestResult = ({ examResult }: { examResult?: IAuthHomeExamResProps }) => {
  const isResultAvailable = examResult && examResult.allIndiaRank > 0;
  return (
    <div
      className={cn(
        "w-full relative",
        !isResultAvailable && "border rounded-xl bg-card  text-card-foreground dark:bg-[#171717] p-[16px] shadow-none"
      )}
    >
      <div className={cn("p-6 rounded-lg mx-auto max-w-5xl bg-white dark:bg-[rgb(23,23,23)]", !isResultAvailable && "blur")}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-[15px] border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-medium text-[#101010] dark:text-[#fff] lg:text-[20px] text-[16px]">
            Based On Your Test Results
          </h2>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Marks Section */}
          <div className="p-4 border rounded-lg shadow-sm bg-[#fff] dark:bg-[#000]">
            {/* Pie Chart */}
            <h3 className="text-[#101010] dark:text-[#fff]/[70%] text-[20px]">Marks</h3>
            <div className="flex items-center justify-between ">
              <div className="w-[150px] h-[150px] me-2  flex-shrink-0">
                <DoughnutCharts
                  innerRadius="80%"
                  centerTextLabelValue={examResult?.totalMarksScored?.toFixed(0)}
                  centerTextLabel="Scored"
                  chartConfig={{}}
                  chartData={[
                    { name: "Scored Marks", value: examResult?.totalMarksScored || 0, fill: "#192B69" },
                    { name: "Remaining Marks", value: examResult?.totalMarks || 10, fill: "#E5E7EB" },
                  ]}
                  showLabel={false}
                />
              </div>

              <div className="px-4  h-full flex-1 border-s  ">
                <div className="flex items-center justify-center sm:justify-between w-full flex-wrap">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-nowrap">Total Marks:</p>
                  <p className="text-lg font-bold text-[#0385FF] dark:text-white">{examResult?.totalMarks}</p>
                </div>
                <hr className="my-2"/>
                <div className="flex items-center justify-center sm:justify-between w-full flex-wrap ">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-nowrap">Marks Scored:</p>
                  <p className="text-lg font-bold text-[#0385FF] dark:text-white text-center">
                    {examResult?.totalMarksScored?.toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rank Section */}
          <div className="p-4 border rounded-lg shadow-sm bg-[#fff] dark:bg-[#000]">
            <h3 className="text-lg font-medium text-[#101010] dark:text-white mb-2">Based On All India Rank</h3>
            <p className="text-xl font-bold text-blue-600">{examResult?.allIndiaRank?.toFixed(0) || 0}</p>
          </div>
        </div>
      </div>
      {!isResultAvailable && (
        <p className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[#101010] dark:text-[#fff] text-[14px] lg:text-[16px] font-[600]">
          To get your result, you should attend atleast 5 tests.
        </p>
      )}
    </div>
  );
};

export default BasedTestResult;
