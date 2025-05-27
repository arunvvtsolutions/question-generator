"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/common/Button";
import { IViewGeneratedQstProps } from "@/types/generate-questions";
import { generatedQuestions, viewGeneratedQuestionsWithId } from "@/utils/api/generate-questions";
import Image from "next/image";
import LoadingSpinner from "@/components/icons/LoadingSpinner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useReactToPrint } from "react-to-print";
import Solutions from "./Solutions";

const ViewSolutions = ({ uuId }: { uuId: string }) => {
  const router = useRouter();
  const contentRef = useRef<HTMLElement | null>(null);

  const [data, setData] = useState<{ questions: IViewGeneratedQstProps[]; createdDate: string; totalQsts: number }>();
  const [loading, setLoading] = useState(false);
  const handleDownloadPdf = useReactToPrint({ content: () => contentRef.current });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const [data] = await Promise.all([uuId ? viewGeneratedQuestionsWithId(uuId) : generatedQuestions()]);
      data.success && data.data && setData(data.data);
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
        <div>
          <Button ariaLabel="" dataTestId="" onClick={() => handleDownloadPdf?.()} text="Download" disabled={loading} />
        </div>
      </div>
      <ViewSol data={data} loading={loading} contentRef={contentRef} />
    </div>
  );
};

export default ViewSolutions;

const ViewSol = ({
  data,
  loading,
  contentRef,
}: {
  loading: boolean;
  contentRef: any;
  data?: { questions: IViewGeneratedQstProps[]; createdDate: string; totalQsts: number };
}) => {
  return (
    <div
      className={cn("border-4 border-[#101010] dark:border-[#FFF]  border-double ref-div w-full rounded-sm", loading ? "h-[60vh]" : "h-auto")}
      ref={contentRef}
    >
      {!loading ? (
        <>
          {data ? (
            <>
              <div className="w-full flex justify-between items-center relative  p-4 border-b">
                <Image alt="" src={"/images/Neet Guid Logo.png"} width={80} height={70} className="dark:hidden" />
                <Image alt="" src={"/images/neetGuideDarkLogo.png"} width={80} height={70} className="dark:block hidden" />
                <h3 className="text-[#101010] md:flex hidden md:absolute left-1/2 -translate-x-1/2 dark:text-[#fff] font-semibold text-[14px] lg:text-[18px] text-ellipsis">
                  Solutions
                </h3>
                <div>
                  <p>
                    <span className="font-bold">Date:</span> {new Date(data.createdDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-bold">Total Questions:</span> {data.totalQsts}
                  </p>
                </div>
              </div>
              <Solutions subjects={data.questions} />
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
