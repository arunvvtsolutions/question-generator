'use client';
import React, { useEffect, useState } from 'react';
import { Indicater } from '../subjects';
import Button from '@/components/common/Button';
import { useParams, useRouter } from 'next/navigation';
import { createExam, examDetails } from '@/utils/api/exam';
import { IExamDetailsProps } from '@/types/exam';
import Loading from '@/components/common/Loading';
import parser from 'html-react-parser';
import { useDispatch } from '@/store';
import {
  getExamDataSuccess,
  getExamQuestionSuccess,
} from '@/store/slices/exam';
import { toast } from '@/components/ui/use-toast';
import LoadingSpinner from '@/components/icons/LoadingSpinner';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { ERROR, EXAM, EXAM_ERROR } from '@/service/enums/texts';

const Instructions = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const [examData, setExamData] = useState<IExamDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const handleGetQuestion = async () => {
    setProcessing(true);
    const res = await createExam(params.shortUrl);
    if (res.success) {
      dispatch(getExamQuestionSuccess([]));
      if (!res.resumeStatus) {
        dispatch(getExamQuestionSuccess(res.data.questions));
        dispatch(getExamDataSuccess(res.data.exam));
      }
      router.push(`/exams/${params.shortUrl}`);
    } else {
      toast({
        variant: 'destructive',
        title: ERROR.SOMETHING_WENT_WRONG,
        description:
          typeof res.message === 'string'
            ? res.message
            : EXAM_ERROR.CANNOT_ATTEND_EXAM,
      });
    }
    setProcessing(false);
  };
  useEffect(() => {
    const getData = async () => {
      const res = await examDetails(params?.shortUrl);
      setExamData(res.data);
      setLoading(false);
    };
    params?.shortUrl && getData();
  }, [params?.shortUrl]);

  return (
    <div className="flex justify-center w-full lg:py-24 py-16 px-10">
      <div className="2xl:max-w-[1000px] max-w-[900px] w-full mx-auto">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Button
              ariaLabel=""
              dataTestId=""
              onClick={() => router.push('/home')}
              text="Back"
              startIcon={<ChevronLeftIcon />}
              className="hidden lg:flex mb-5"
            />
            <Button
              ariaLabel=""
              dataTestId=""
              onClick={() => router.push('/home')}
              text=""
              startIcon={<ChevronLeftIcon />}
              className="flex lg:hidden"
            />
            <p className="text-[26px] font-semibold text-start">
              {EXAM.EXAM_INSTRUCTION_TITLE}
            </p>
            <div className="mt-5 intructionStyles">
              {parser(examData?.instruction || '')}
              <div className="px-2 mt-10 flex flex-col gap-2">
                <Indicater
                  color="before:bg-[#046444]"
                  text="Answered"
                  className="text-[16px]"
                  indicatorClassName="before:h-[15px] before:w-[15px]"
                />
                <Indicater
                  color="before:bg-[#D70015]"
                  text="Not Answered"
                  className="text-[16px]"
                  indicatorClassName="before:h-[15px] before:w-[15px]"
                />
                <Indicater
                  color="before:bg-[#FF9900]"
                  text="Mark For Review"
                  className="text-[16px]"
                  indicatorClassName="before:h-[15px] before:w-[15px]"
                />
              </div>
            </div>
            <div
              className="bg-[#ffffff31] dark:bg-[#00000073] backdrop-filter backdrop-blur-[3px]
 w-full flex justify-center items-center lg:mt-[50px] mt-[20px] fixed bottom-[0px] left-[50%] -translate-x-1/2 py-[10px]"
            >
              <Button
                ariaLabel=""
                dataTestId=""
                disabled={processing}
                onClick={handleGetQuestion}
                startIcon={<>{processing && <LoadingSpinner />}</>}
                text="Start Test"
                className="bg-[#0B57D0] hover:bg-[#0B57D0] shadow-0 dark:text-[#ffff] p-[20px] lg:py-[24px] lg:px-[30px] tracking-[0.60px]"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Instructions;
