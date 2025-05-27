import React from "react";

interface IRightArrowProps {
  size?: string;
  color?: string;
  stroke?: number;
  className?: string;
}

const RightArrow: React.FC<IRightArrowProps> = ({
  size = "size-6",
  color = "currentColor",
  stroke = 1.5,
  className,
}) => {
  const strokeColor = 'currentColor'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      stroke={strokeColor}
      className={`${size} ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export default RightArrow;
