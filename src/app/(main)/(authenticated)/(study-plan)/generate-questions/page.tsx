
export const dynamic = "force-dynamic";
import React from "react";
import GenerateQuestions from "@/components/q-bank/generate-question";
import { getAllChapters, getAllSubjects, getAllTopics } from "@/utils/api/home";
import { getCognitiveLevel  } from "@/utils/api/generate-questions";

const Page = async () => {
  const [subjects, chapters, topics,  cognitiveLevel] = await Promise.all([
    getAllSubjects(),
    getAllChapters(),
    getAllTopics(),
    getCognitiveLevel(),
    // getTokenDetails(user.id)
  ]);
  
  return (
    <GenerateQuestions
      subjects={subjects.data}
      chapters={chapters.data}
      topics={topics.data}
      cognitiveLevel={cognitiveLevel.data || []}
      // tokenDetails={tokenDetails.data}
    />
  );
};

export default Page;
