import React, { memo } from "react";
import MainCard from "../common/MainCard";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Timer from "./Timer";
import { EXAM_BUTTONS } from "@/service/enums/texts";

const TopBar = ({
  examTime,
  sectionId,
  subjectId,
  qId,
  disableAllBts,
  handleOpenSheet,
  submitHandler,
  handleTimeUp,
}: {
  examTime: number;
  sectionId: number;
  subjectId: number;
  qId: number;
  disableAllBts: boolean;
  handleOpenSheet: () => void;
  submitHandler: (open: boolean) => void;
  handleTimeUp: () => void;
}) => {
  return (
    <div className="fixed top-[7px] w-full left-0 mt-[50px] px-[20px] py-[12px] flex lg:hidden dark:bg-[#0a0a0a] bg-[#ffff] rounded-b-sm z-50">
      <MainCard
        title=""
        className="!p-0 w-full shadow-none"
        contentClassName="!p-[10px] flex justify-between items-center flex-row"
      >
        <>
          <HamburgerMenuIcon
            onClick={handleOpenSheet}
            className="cursor-pointer"
          />
          <Timer
            className="w-auto items-center mb-0"
            examTime={examTime}
            sectionId={sectionId}
            subjectId={subjectId}
            qId={qId}
            handleTimeUp={handleTimeUp}
          />
          <div>
            <button
              disabled={disableAllBts}
              className="bg-[#046444] py-[5px] px-[7px] rounded"
              onClick={() => submitHandler(true)}
            >
              <p className="text-[12px] text-[#ffff]">{EXAM_BUTTONS.SUBMIT}</p>
            </button>
          </div>
        </>
      </MainCard>
    </div>
  );
};

export default memo(TopBar);
