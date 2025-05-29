"use client";
import React, { useEffect } from "react";
import ExamCard from "./ExamCard";
import { getAllExamTests } from "@/utils/api/(ai-related)/exam-question/exam-question";
import { IGeneratedTestCommonProps } from "@/types/common/db-types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type ExamWithQuestions = IGeneratedTestCommonProps & {
  generatedTestQuestion: Array<{
    id: number;
    questionId: number;
    chapterId: number;
    subjectId: number;
    topicId: number;
    testId: number;
    aiQuestions: {
      id: number;
      uuid: string;
      question: string;
      answerDesc: string;
      difficulty: number;
      questionType: string;
      addedDate: string;
      subjectId: number;
      chapterId: number;
      topicId: number;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctOpt: string;
      modelId: number;
      updatedDate: string;
      estimatedTime: number;
      cognitiveLevel : {
        id: number;
        title : string;
        status : boolean;
        createdAt : string;
        updatedAt : string;
      }
    };
  }>;
};

const MainExamList = () => {
  const [examList, setExamList] = React.useState<ExamWithQuestions[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllExamTests();
        if (res.data && res.data.length > 0) {
          setExamList(res.data);
        }
      } catch (err) {
        setError("Failed to fetch exam tests");
        console.error("Error fetching exam tests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-red-500">
        {error}
      </div>
    );
  }

  // if (examList.length === 0) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[400px] text-gray-500">
  //       No exams found
  //     </div>
  //   );
  // }

  console.log("Exam List:", examList);
  
  return (
    <>
      <div className="flex justify-between items-center p-6">
        <p className="text-[20px] font-semibold">Exam Question Papers</p>
        <Button onClick={() => router.push("exam-question")} variant="default" size="lg">
          Create Question Paper
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {examList.length > 0 ? (
          examList.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center min-h-[400px] text-gray-500">
            No exams found
          </div>
        )}
      </div>
    </>
  );
};

export default MainExamList;
