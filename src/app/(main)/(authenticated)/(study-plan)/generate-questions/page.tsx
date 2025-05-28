export const dynamic = "force-dynamic";
import React from "react";
import GenerateQuestions from "@/components/q-bank/generate-question";
import { getAllChapters, getAllSubjects, getAllTopics } from "@/utils/api/home";
import { getCognitiveLevel, getQuestionQuality, getQuetionDifficulty } from "@/utils/api/generate-questions";
import { getAllStreams } from "@/utils/api/(ai-related)/streams-api";

const Page = async () => {
  const [subjects, chapters, topics, cognitiveLevel, streams, questionQuality, questionDifficulty] = await Promise.all([
    getAllSubjects(),
    getAllChapters(),
    getAllTopics(),
    getCognitiveLevel(),
    getAllStreams(),
    getQuestionQuality(),
    getQuetionDifficulty(),
    // getTokenDetails(user.id)
  ]);

  return (
    <GenerateQuestions
      subjects={subjects.data}
      chapters={chapters.data}
      topics={topics.data}
      cognitiveLevel={cognitiveLevel.data || []}
      streams={streams.data || []}
      questionQuality={questionQuality.data}
      questionDifficulty={questionDifficulty.data}
      // tokenDetails={tokenDetails.data}
    />
  );
};

export default Page;
