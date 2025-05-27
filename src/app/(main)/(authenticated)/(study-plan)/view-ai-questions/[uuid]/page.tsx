"use client";
import Questions from "@/components/q-bank/view-ai-questions/Questions";
import { useSelector } from "@/store";
import { IAiQuestionsProps } from "@/types/generate-questions";
import { getSingleAiQuestion } from "@/utils/api/generate-questions";
import React, { useCallback, useEffect, useState } from "react";

const Page = ({ params }: { params: { uuid: string } }) => {
  const { user } = useSelector((state: any) => state.authReducer);
  const [loading, setLoading] = useState(true);
  const [question, setQuestionData] = useState<IAiQuestionsProps[]>();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getSingleAiQuestion(user.id, params.uuid);
      if (result.success) {
        setQuestionData(result.data);
      } else {
        setQuestionData([]);
      }
    } catch (err) {
      setQuestionData([]);
    } finally {
      setLoading(false);
    }
  }, [user.id, params.uuid]);

  useEffect(() => {
    
    getData();
  }, [getData]);

  return <Questions data={question || []} loading={loading} refreshData={getData} />;
};

export default Page;
