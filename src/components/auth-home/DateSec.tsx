import { getCurrentDay, getCurrentTime, getLiveTime, getThisMonth } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const DateSection = () => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const timeoutId = getLiveTime(setTime);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex items-start justify-between flex-col-reverse lg:flex-row-reverse  mx-auto gap-y-2">
      {/* Left Section */}
      <div className="flex items-center md:order-1 border py-[18px] px-[20px] rounded-[16px] overflow-hidden  dark:bg-[rgb(23,23,23)]">
        <div className=" pr-4 border-r ">
          <p className="block text-[16px] font-light mb-[7px] text-[#101010]/[70%] dark:text-[#fff]/[70%]">{getCurrentDay()}</p>
          <p className="uppercase  text-[#101010] dark:text-[#fff] text-2xl font-medium  text-left ">
            {getThisMonth(undefined, { year: "numeric", month: "short", day: "2-digit" }).split(",")[0]}
          </p>
        </div>
        <div className="pl-4">
          <span className="text-[#101010]/[70%] dark:text-[#fff]/[70%] text-[16px] font-normal">Today</span>
          <span className="block text-[#101010]/[70%] dark:text-[#fff]/[70%] font-medium text-[20px]">{time}</span>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-2  md:order-0 mb-[20px] lg:mb-[0px]">
        <button className="px-[25px] font-light lg:px-[35px] py-[10px] rounded-[25px] lg:text-[16px] text-[14px] border border-[#0B57D0]  bg-[#0B57D0] text-white ">
          Today
        </button>
        <Link
          href="/study-plan/calendar"
          className="px-[25px] dark:bg-[#101010] lg:px-[35px]  rounded-[25px] lg:text-[16px] text-[14px] font-normal border border-[#000]/[50%] hover:border-[#0B57D0] text-[#101010] dark:text-[#fff] hover:dark:bg-[#0B57D0]  hover:bg-[#0B57D0] hover:text-white flex justify-center items-center"
        >
          Plan Ahead
        </Link>
      </div>
    </div>
  );
};

export default DateSection;
