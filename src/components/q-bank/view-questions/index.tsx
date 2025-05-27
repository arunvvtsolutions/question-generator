"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/common/Button";
import { IViewGeneratedQstProps } from "@/types/generate-questions";
import { generatedQuestions, viewGeneratedQuestionsWithId } from "@/utils/api/generate-questions";
import Image from "next/image";
import Questions from "./Questions";
import LoadingSpinner from "@/components/icons/LoadingSpinner";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { IExamDetailsProps } from "@/types/exam";
import { createPracticeExams, examDetails, getExamDataByShortUrl } from "@/utils/api/exam";
import { getExamDataSuccess, getExamQuestionSuccess } from "@/store/slices/exam";
import { toast } from "@/components/ui/use-toast";
import { useDispatch } from "@/store";
import { useReactToPrint } from "react-to-print";
import { ERROR, EXAM_ERROR, EXAM_TYPE_SHORTURLS } from "@/service/enums/texts";

const ViewQuestions = ({ uuId }: { uuId: string }) => {
  const router = useRouter();
  const params: any = useParams();
  const dispatch = useDispatch();
  const contentRef = useRef<HTMLElement | null>(null);

  const [data, setData] = useState<{
    questions: IViewGeneratedQstProps[];
    createdDate: string;
    totalQsts: number;
  }>();
  const [examData, setExamData] = useState<IExamDetailsProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleDownloadPdf = useReactToPrint({
    content: () => contentRef.current,
  });

  const startTest = async () => {
    setProcessing(true);
    const res = await createPracticeExams(examData?.id || 0, params?.uuid?.[0]);
    if (res.success) {
      dispatch(getExamQuestionSuccess([]));
      if (!res.resumeStatus) {
        dispatch(getExamQuestionSuccess(res.data.questions));
        dispatch(getExamDataSuccess(res.data.exam));
      }
      router.push(`/exams/${examData?.id || 0}/${uuId}`);
    } else {
      toast({
        variant: "destructive",
        title: ERROR.SOMETHING_WENT_WRONG,
        description: typeof res.message === "string" ? res.message : EXAM_ERROR.CANNOT_ATTEND_EXAM,
      });
    }
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const [data, res] = await Promise.all([
        uuId ? viewGeneratedQuestionsWithId(uuId) : generatedQuestions(),
        getExamDataByShortUrl(EXAM_TYPE_SHORTURLS.PRACTICE_NOW),
      ]);
      data.success && data.data && setData(data.data);
      res.success && setExamData(res.data);
      setLoading(false);
    };
    getData();
  }, [uuId]);
  return (
    <div className=" scrollbar-thin  max-w-[100%] p-2 lg:p-5 lg:px-[50px] 2xl:px-[100px]  pt-3 ">
      <div className="mb-3 flex w-full justify-between items-center">
        <Button
          ariaLabel=""
          dataTestId=""
          onClick={() => router.back()}
          text="Back"
          startIcon={<ChevronLeftIcon />}
          className="hidden lg:flex"
        />
        <Button
          ariaLabel=""
          dataTestId=""
          onClick={() => router.back()}
          text=""
          startIcon={<ChevronLeftIcon />}
          className="flex lg:hidden"
        />
        <div className="flex items-center gap-x-2">
          <Button
            ariaLabel=""
            dataTestId=""
            onClick={() => router.push(`/view-solutions/${uuId || ""}`)}
            text="Solution"
            disabled={loading}
          />
          <Button ariaLabel="" dataTestId="" onClick={() => handleDownloadPdf?.()} text="Download" disabled={loading} />
          <Button
            ariaLabel=""
            dataTestId=""
            onClick={startTest}
            startIcon={processing && <LoadingSpinner />}
            text={processing ? "Generating Test" : "Take Test"}
            disabled={processing || loading}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  bg-[#0B57D0] hover:bg-[#0B57D0] text-[#fff]"
          />
        </div>
      </div>
      <ViewQst data={data} loading={loading} contentRef={contentRef} />
    </div>
  );
};

export default ViewQuestions;

const ViewQst = ({
  data,
  loading,
  contentRef,
}: {
  loading: boolean;
  contentRef: any;
  data?: {
    questions: IViewGeneratedQstProps[];
    createdDate: string;
    totalQsts: number;
  };
}) => {
  return (
    <div
      className={cn(
        "border-4 border-[#101010] dark:border-[#FFF] border-double ref-div w-full rounded-sm",
        loading ? "h-[60vh]" : "h-auto"
      )}

      // ref={contentRef}
    >
      {!loading ? (
        <>
          {data ? (
            <>
              <div className="w-full flex justify-between items-center  p-4 border-b dark:border-[#fff]">
                <Image alt="" src={"/images/Neet Guid Logo.png"} width={80} height={70} className="dark:hidden" />
                <Image
                  alt=""
                  src={"/images/neetGuideDarkLogo.png"}
                  width={80}
                  height={70}
                  className="dark:block hidden"
                />
                <div>
                  <p>
                    <span className="font-bold">Date:</span> {new Date(data.createdDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-bold">Total Questions:</span> {data.totalQsts}
                  </p>
                </div>
              </div>
              <Questions subjects={data.questions} />
            </>
          ) : (
            <div className="w-full py-5 h-[20vh] flex justify-center items-center">
              <p className="text-center font-medium">No Questions found</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
