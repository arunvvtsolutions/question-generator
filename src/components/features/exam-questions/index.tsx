"use client";
import { IChapterDetailsProps, ITopicDatas } from "@/types";
import { ICognitiveLevelProps } from "@/types/generate-questions";
import { getCognitiveLevel } from "@/utils/api/generate-questions";
import { getAllChapters, getAllSubjects, getAllTopics } from "@/utils/api/home";
import React, { useEffect } from "react";
import MainExamQuestion from "./exam-question";
import { IChapterCommonProps, ICognitiveLevelCommonProps, IQuestionTypeCommonProps, IStreamCommonProps, ISubjectCommonProps, ITopicCommonProps } from "@/types/common/db-types";
import { getAllStreams } from "@/utils/api/(ai-related)/streams-api";
import { getAllQuestionTypes } from "@/utils/api/(ai-related)/question-type-api";


const MainExamQuestionsForm = () => {
  const [subjects, setSubjects] = React.useState<ISubjectCommonProps[]>([]);
  const [chapters, setChapters] = React.useState<IChapterCommonProps[]>([]);
  const [topics, setTopics] = React.useState<ITopicCommonProps[]>([]);
  const [streams, setStreams] = React.useState<IStreamCommonProps[]>([]);
  const [questionTypes, setQuestionTypes] = React.useState<IQuestionTypeCommonProps[]>([]);
  const [cognitiveLevel, setCognitiveLevel] = React.useState<
    ICognitiveLevelCommonProps[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const [subjects, chapters, topics, cognitiveLevel, streams , questionTypes] = await Promise.all([
        getAllSubjects(),
        getAllChapters(),
        getAllTopics(),
        getCognitiveLevel(),
        getAllStreams(),
        getAllQuestionTypes(),
        // getTokenDetails(user.id)
      ]);
      setSubjects(subjects.data || []);
      setChapters(chapters.data || []);
      setTopics(topics.data || []);
      setCognitiveLevel(cognitiveLevel.data || []);
      setStreams(streams.data || []);
      setQuestionTypes(questionTypes.data || []);
      console.log(subjects);
      console.log(chapters);
      console.log(topics);
      console.log(streams);
      console.log(cognitiveLevel);
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
        // tokenDetails={tokenDetails.data}
      />
    </>
  );
};
export default MainExamQuestionsForm;
