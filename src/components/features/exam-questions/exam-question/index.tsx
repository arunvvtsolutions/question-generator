import React from "react";
import  ExamQuestionForm from "./ExamQuestionForm";
import { IChapterCommonProps, ICognitiveLevelCommonProps, ISubjectCommonProps, ITopicCommonProps } from "@/types/common/db-types";

export interface IMainExamQuestionProps {
  topics : ITopicCommonProps[];
  subjects: ISubjectCommonProps[];
  chapters: IChapterCommonProps[];
  cognitiveLevel: ICognitiveLevelCommonProps[];
}
const MainExamQuestion = ({
  topics,
  subjects,
  chapters,
  cognitiveLevel,
}: IMainExamQuestionProps) => {
  console.log(topics);
  console.log(subjects);
  console.log(chapters);
  console.log(cognitiveLevel);
  
  return (
    <div className="p-3">
      <ExamQuestionForm
        chapters={chapters}
        topics={topics}
        subjects={subjects}
        cognitiveLevel={cognitiveLevel}
      />
    </div>
  );
};

export default MainExamQuestion;
