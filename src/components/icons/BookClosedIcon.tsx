import React from "react";

const BookClosedIcon = ({ color = "#0385FF", width = "25", height = "25", className = ""  }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 12V0H2C0.896256 0.00124992 0.00128 0.896256 0 2V13C0.00124992 14.1037 0.896256 14.9987 2 15H13V14H12V12H13ZM12 11H3.5V1H12V11ZM1 2C1.00062 1.44813 1.44813 1.00062 2 1H2.5V11H2C1.64875 10.9994 1.30374 11.0919 1 11.2681V2ZM11 14H2C1.4475 14 1 13.5525 1 13C1 12.4475 1.4475 12 2 12H11V14Z"
        fill={color}
      />
    </svg>
  );
};

export default BookClosedIcon;
