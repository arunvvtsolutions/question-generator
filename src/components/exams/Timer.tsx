import { cn } from "@/lib/utils";
import { EXAM_TYPE_SHORTURLS } from "@/service/enums/texts";
import { useSelector } from "@/store";
import { IExamStatusProps } from "@/types/exam";
import { formatMinutesToSec } from "@/utils";
import { updateCumulativeExamStatus, updateExamStatus } from "@/utils/api/exam";
import { ClockIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import React, { memo, useEffect, useRef, useState } from "react";

// exam time should be in minutes
const Timer = ({
  className,
  examTime,
  sectionId,
  subjectId,
  qId,
  handleTimeUp,
}: {
  className?: string;
  examTime: number;
  sectionId: number;
  subjectId: number;
  qId: number;
  handleTimeUp: () => void;
}) => {
  const params: any = useParams();

  const { examData } = useSelector((state) => state.examReducer);

  const [tick, setTick] = useState(formatMinutesToSec(examTime * 60));
  const totalSecondsRef = useRef<number>(examTime * 60);
  const sectionRef = useRef<number>(sectionId);
  const subjectRef = useRef<number>(subjectId);
  const questionRef = useRef<number>(qId);
  const handleUpdateStatus = (status: IExamStatusProps) => {
    if (examData?.shortUrl === EXAM_TYPE_SHORTURLS.CUMULATIVE_TEST) {
      updateCumulativeExamStatus(params?.shortUrls[0], params?.shortUrls[1], status);
    } else {
      updateExamStatus(params?.shortUrls[0], status, params?.shortUrls[1]);
    }
  };

  function startCountdown() {
    const intervalId = setInterval(async () => {
      totalSecondsRef.current -= 1;
      if (Math.floor(totalSecondsRef.current) % 5 === 0) {
        handleUpdateStatus({
          lastsectionId: sectionRef.current,
          lastSubjectId: subjectRef.current,
          lastQstId: questionRef.current,
          remainingTime: totalSecondsRef.current / 60,
        });
      }
      if (totalSecondsRef.current <= 0) {
        handleTimeUp();
        clearInterval(intervalId);
      }
      setTick(formatMinutesToSec(totalSecondsRef.current));
    }, 1000);
    return intervalId;
  }

  useEffect(() => {
    const intervalId = startCountdown();
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sectionRef.current = sectionId;
    subjectRef.current = subjectId;
    questionRef.current = qId;
  }, [sectionId, subjectId, qId]);

  return (
    <div className={cn("w-full flex justify-center items-center mb-5", className)}>
      <ClockIcon className="mr-1 font-bold w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
      <p className="text-center font-semibold text-[14px] lg:text-[16px]">{tick}</p>
    </div>
  );
};

export default memo(Timer);
