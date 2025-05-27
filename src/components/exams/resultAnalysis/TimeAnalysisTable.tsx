import { ITimeAnalysis } from "@/types/exam";
import React, { FC } from "react";

interface TimeAnalysisData {
  pace: string;
  correct: number;
  wrong: number;
  icon: string;
  color: string;
}

interface TimeAnalysisProps {
  data: ITimeAnalysis[];
}

const TimeAnalysisTable: FC<TimeAnalysisProps> = ({ data }) => {
  const result = data.map((d) => ({
    ...d,
    icon: d.name === "Too Fast" ? "⏱️" : d.name === "Ideal" ? "🟡" : "⚠️",
    color: d.name === "Too Fast" ? "!text-green-600" : d.name === "Ideal" ? "!text-yellow-600" : "!text-red-600",
  }));
  return (
    <div className="w-full mx-auto bg-white dark:bg-[#171717] rounded-lg  p-4">
      <div className="flex items-center mb-4">
        <h2 className="!text-lg font-semibold !text-gray-800 dark:!text-white md:!text-lg sm:!text-base">Time Analysis</h2>
      </div>
      <table className="w-full bg-[#F9FAFB] dark:bg-[#2A2A2A] rounded-lg">
        <thead>
          <tr>
            <th className="p-2 !text-left !text-gray-700 dark:!text-[#E5E7EB] md:!text-base sm:!text-sm">Answering Pace</th>
            <th className="p-2 !text-center !text-gray-700 dark:!text-[#E5E7EB] md:!text-base sm:!text-sm">
              Correct Questions
            </th>
            <th className="p-2 !text-center !text-gray-700 dark:!text-[#E5E7EB] md:!text-base sm:!text-sm">
              Wrong Questions
            </th>
          </tr>
        </thead>
        <tbody>
          {result.map((item, index) => (
            <tr key={index} className="border-t dark:border-[#3A3A3A]">
              <td className={`p-2 flex items-center ${item.color} md:!text-base sm:!text-sm`}>
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </td>
              <td className="p-2 !text-center !text-green-600 dark:!text-green-400 md:!text-base sm:!text-sm">
                {item.correct}
              </td>
              <td className="p-2 !text-center !text-red-600 dark:!text-red-400 md:!text-base sm:!text-sm">{item.wrong}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeAnalysisTable;
