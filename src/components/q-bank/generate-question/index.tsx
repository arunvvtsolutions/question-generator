import React from "react";
import GenerateQusForm, { IGenerateQuesProps } from "./GenerateQusForm";

const GenerateQuestions = ({
  topics,
  subjects,
  chapters,
  cognitiveLevel,
  tokenDetails,
}: IGenerateQuesProps) => {
  return (
    <div className="p-3">
      <GenerateQusForm
        chapters={chapters}
        topics={topics}
        subjects={subjects}
        cognitiveLevel={cognitiveLevel}
        tokenDetails={tokenDetails}
      />
    </div>
  );
};

export default GenerateQuestions;
