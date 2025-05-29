"use client";
import { IChapterDetailsProps, ITopicDatas } from "@/types";
import { ICognitiveLevelProps } from "@/types/generate-questions";
import { getCognitiveLevel } from "@/utils/api/generate-questions";
import { getAllChapters, getAllSubjects, getAllTopics } from "@/utils/api/home";
import React, { useEffect } from "react";
import MainExamQuestion from "./exam-question";
import {
  IAiModelCommonProps,
  IChapterCommonProps,
  ICognitiveLevelCommonProps,
  IQuestionTypeCommonProps,
  IStreamCommonProps,
  ISubjectCommonProps,
  ITopicCommonProps,
} from "@/types/common/db-types";
import { getAllStreams } from "@/utils/api/(ai-related)/streams-api";
import { getAllQuestionTypes } from "@/utils/api/(ai-related)/question-type-api";
import { getAllAiModels } from "@/utils/api/(ai-related)/ai-model-api";
import { getAllExamTests } from "@/utils/api/(ai-related)/exam-question/exam-question";

const MainExamQuestionsForm = () => {
  const [subjects, setSubjects] = React.useState<ISubjectCommonProps[]>([]);
  const [chapters, setChapters] = React.useState<IChapterCommonProps[]>([]);
  const [topics, setTopics] = React.useState<ITopicCommonProps[]>([]);
  const [streams, setStreams] = React.useState<IStreamCommonProps[]>([]);
  const [questionTypes, setQuestionTypes] = React.useState<
    IQuestionTypeCommonProps[]
  >([]);
  const [aiModels, setAiModels] = React.useState<IAiModelCommonProps[]>([]);
  const [cognitiveLevel, setCognitiveLevel] = React.useState<
    ICognitiveLevelCommonProps[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const [
        subjects,
        chapters,
        topics,
        cognitiveLevel,
        streams,
        questionTypes,
        aiModels,
      ] = await Promise.all([
        getAllSubjects(),
        getAllChapters(),
        getAllTopics(),
        getCognitiveLevel(),
        getAllStreams(),
        getAllQuestionTypes(),
        getAllAiModels(),
        // getTokenDetails(user.id)
      ]);
      const res = await getAllExamTests();
      console.log("res", res.data.length);

      setSubjects(subjects.data || []);
      setChapters(chapters.data || []);
      setTopics(topics.data || []);
      setCognitiveLevel(cognitiveLevel.data || []);
      setStreams(streams.data || []);
      setQuestionTypes(questionTypes.data || []);
      setAiModels(aiModels.data || []);
      console.log(subjects);
      console.log(chapters);
      console.log(topics);
      console.log(streams);
      console.log(cognitiveLevel);
      console.log(questionTypes);
      console.log(aiModels);
    };
    fetchData();
  }, []);
  return (
    <>
      <MainExamQuestion
        subjects={subjects}
        chapters={chapters}
        topics={topics}
        cognitiveLevel={cognitiveLevel || []}
        streams={streams || []}
        questionTypes={questionTypes || []}
        aiModels={aiModels || []}
        // tokenDetails={tokenDetails.data}
      />
    </>
  );
};
export default MainExamQuestionsForm;
