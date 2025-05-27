import React from "react";

const ArrowRightFaceIcon = ({
  color = "#0385FF",
  width = "25",
  height = "25",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.09095 6.99972L0 11.9494L1.45453 13.3636L8 6.99972L1.45453 0.635742L0 2.04995L5.09095 6.99972Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowRightFaceIcon;
