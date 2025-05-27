import React from "react";
import { MainModal } from "@/components/common/MainModal";
import Button from "@/components/common/Button";
import { EXAM } from "@/service/enums/texts";

const LeaveModal = ({
  open,
  onOpenChange,
  leaveConfirmHandler,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leaveConfirmHandler: () => void;
}) => {
  return (
    <MainModal
      open={open}
      onOpenChange={onOpenChange}
      footer={
        <>
          <Button
            ariaLabel=""
            dataTestId=""
            onClick={() => onOpenChange(false)}
            text="Cancel"
            className="bg-[#F5F5F5] hover:bg-[#F5F5F5] text-[#101010] shadow-none"
          />
          <Button
            ariaLabel=""
            dataTestId=""
            onClick={leaveConfirmHandler}
            text="Leave"
            className="bg-[#D70015] hover:bg-[#D70015] text-[#ffff] shadow-none mb-3"
          />
        </>
      }
    >
      <h3>
        {EXAM.LEAVE_EXAM_CONTENT}{" "}
        <span className="font-semibold">{EXAM.LEAVE_EXAM}</span>
      </h3>
    </MainModal>
  );
};

export default LeaveModal;
