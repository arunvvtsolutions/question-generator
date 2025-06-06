"use client";
import { useTheme } from "next-themes";
import React from "react";

interface IQuestionAndAnswerIconProps {
  fill?: string;
  className?: string;
}

const QuestionAndAnswerIcon: React.FC<IQuestionAndAnswerIconProps> = ({
  fill = "#FFFFFFCC",
  className,
}) => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M17 20H3C1.34315 20 0 18.6569 0 17V1C0 0.44772 0.44772 0 1 0H15C15.5523 0 16 0.44772 16 1V13H20V17C20 18.6569 18.6569 20 17 20ZM16 15V17C16 17.5523 16.4477 18 17 18C17.5523 18 18 17.5523 18 17V15H16ZM14 18V2H2V17C2 17.5523 2.44772 18 3 18H14ZM4 5H12V7H4V5ZM4 9H12V11H4V9ZM4 13H9V15H4V13Z"
          fill={resolvedTheme === "light" ? "#101010" : fill}
        />
      </svg>
    </>
  );
};
export default QuestionAndAnswerIcon;
