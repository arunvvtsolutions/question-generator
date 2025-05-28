import React from "react";
import  ExamQuestionForm from "./ExamQuestionForm";
import { IChapterCommonProps, ICognitiveLevelCommonProps, IQuestionTypeCommonProps, IStreamCommonProps, ISubjectCommonProps, ITopicCommonProps } from "@/types/common/db-types";

export interface IMainExamQuestionProps {
  topics : ITopicCommonProps[];
  subjects: ISubjectCommonProps[];
  chapters: IChapterCommonProps[];
  cognitiveLevel: ICognitiveLevelCommonProps[];
  streams : IStreamCommonProps[];
  questionTypes?: IQuestionTypeCommonProps[]; 
}
const MainExamQuestion = ({
  topics,
  subjects,
  chapters,
  cognitiveLevel,
  streams,
  questionTypes,
}: IMainExamQuestionProps) => {
  console.log(topics);
  console.log(subjects);
  console.log(chapters);
  console.log(cognitiveLevel);
  console.log(streams);
  console.log(questionTypes);

  return (
    <div className="p-3">
      <ExamQuestionForm
        chapters={chapters}
        topics={topics}
        subjects={subjects}
        cognitiveLevel={cognitiveLevel}
        streams={streams}
        questionTypes={questionTypes}
      />
    </div>
  );
};

export default MainExamQuestion;
