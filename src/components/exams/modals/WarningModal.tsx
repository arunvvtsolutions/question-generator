import React from "react";
import { MainModal } from "@/components/common/MainModal";
import Button from "@/components/common/Button";

const WarningModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <MainModal
      open={open}
      onOpenChange={onOpenChange}
      className="!max-w-2xl w-full  "
      footer={
        <>
          <Button
            ariaLabel=""
            dataTestId=""
            onClick={() => onOpenChange(false)}
            text="Cancel"
            className="bg-[#D70015] hover:bg-[#D70015] text-[#ffff] shadow-none"
          />
        </>
      }
    >
      <>
        <h3 className="font-semibold text-[18px]">Warning: Auto-Submission After Third Tab Switch</h3>
        <p className="text-[14px] font-normal">
          You have switched tabs multiple times during the exam. If you switch
          tabs a third time, your exam will be automatically submitted. Please
          remain focused on the exam to avoid auto-submission.
        </p>
      </>
    </MainModal>
  );
};

export default WarningModal;
