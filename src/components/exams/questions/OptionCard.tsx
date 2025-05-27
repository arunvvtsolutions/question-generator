import MainCard from "@/components/common/MainCard";
import MarkDown from "@/components/common/MarkDown";
import { QB_IMG_BASE_URL } from "@/config";
import { cn } from "@/lib/utils";
import { EXAM } from "@/service/enums/texts";
import { IMcqQuestionProps, IOptionProps, IQuestionProps } from "@/types/exam";
import Image from "next/image";
import React from "react";

const OptionCard = ({
  question,
  selectedAns,
  section,
  handleSelectOption,
}: {
  selectedAns: string;
  question: IQuestionProps;
  section: IMcqQuestionProps;
  handleSelectOption: (sectionId: number, sId: number, selectedOpt: string) => void;
}) => {
  return (
    <div className="col-span-12 grid grid-cols-12 gap-5 mt-5">
      {question?.options?.map((option, index) => (
        <Option
          isSelectedOpt={selectedAns === option.optionId}
          option={option}
          handleSelectOption={() => handleSelectOption(section.secId, section.sId, option.optionId)}
          key={index}
        />
      ))}
    </div>
  );
};

const Option = ({
  option,
  isSelectedOpt = false,
  handleSelectOption,
}: {
  isSelectedOpt?: boolean;
  option: IOptionProps;
  handleSelectOption: () => void;
}) => {
  return (
    <>
      <MainCard
        title=""
        className={cn("cursor-pointer flex flex-row  shadow-none col-span-12 ")}
        contentClassName="!p-0 flex flex-row w-full items-center"
        onClick={handleSelectOption}
      >
        <>
          <div
            className={cn(
              "w-[40px] lg:h-[40px] h-[37px] flex justify-center items-center text-center rounded-md ",
              isSelectedOpt ? "bg-[#30D158]" : "bg-[#F5F5F5] dark:text-[#FFFFF] dark:bg-[#6C6C6C99]"
            )}
          >
            {option?.optionKey}
          </div>
          <div className={cn(" w-full px-[16px] flex items-center")}>
            {option?.option && (
              <p
                className={cn(
                  "text-[14px]",
                  isSelectedOpt
                    ? "text-[#096443] dark:text-[#30D158]"
                    : "dark:text-[#ffff] text-[#101010] text-opacity-[70%]"
                )}
                onCopy={(e) => e.preventDefault()}
                onSelect={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
              >
                <MarkDown content={option.option} />
              </p>
            )}
            {option?.optionImg && option?.optionImg != "#" && (
              <div className="w-full flex justify-center items-center">
                <Image
                  src={`${QB_IMG_BASE_URL}/${option.optionImg}`}
                  alt="question image"
                  className="w-[240px] h-[140px]"
                  width={100}
                  height={100}
                />
              </div>
            )}
            <>
              {!option.option && (!option?.optionImg || option?.optionImg === "#") && (
                <>
                  <p>{EXAM.OPT_NOT_AVAILABLE}</p>
                </>
              )}
            </>
          </div>
        </>
      </MainCard>
    </>
  );
};

export default OptionCard;
