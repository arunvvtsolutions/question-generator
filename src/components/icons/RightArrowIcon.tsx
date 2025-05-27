import React from "react";

const RightArrowIcon = ({ fill = "#0B57D0" }: { fill?: string }) => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M-0.00488281 5.23967V6.75544H9.08973L4.92136 10.9238L5.99756 12L12 5.99756L5.99756 -0.00488281L4.92136 1.07131L9.08973 5.23967H-0.00488281Z"
        fill={fill}
      />
    </svg>
  );
};

export default RightArrowIcon;
