import React from "react";
import QuestionSkelton from "./QuestionSkelton";
import OptionSkelton from "./OptionSkelton";
import TopBarSkelton from "./TopBarSkelton";
import SubjectSkelton from "./SubjectSkelton";

const ExamSkelton = () => {
  return (
    <>
      <TopBarSkelton />
      <div className="gap-5 w-[100%] lg:max-w-[65%] max-w-[100%] mt-[3.2rem] lg:mt-0">
        <QuestionSkelton />
        <OptionSkelton />
        <OptionSkelton />
        <OptionSkelton />
        <OptionSkelton />
      </div>
      <div className="w-[100%] max-w-[30%] hidden lg:block sticky top-[30px]">
        <SubjectSkelton />
      </div>
    </>
  );
};

export default ExamSkelton;
