import React from "react";

const BookIcon = ({ className, fill = "currentColor" }: { className?: string; fill?: string }) => {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13 12.5V0.5H2C0.896256 0.50125 0.00128 1.39626 0 2.5V13.5C0.00124992 14.6037 0.896256 15.4987 2 15.5H13V14.5H12V12.5H13ZM12 11.5H3.5V1.5H12V11.5ZM1 2.5C1.00062 1.94813 1.44813 1.50062 2 1.5H2.5V11.5H2C1.64875 11.4994 1.30374 11.5919 1 11.7681V2.5ZM11 14.5H2C1.4475 14.5 1 14.0525 1 13.5C1 12.9475 1.4475 12.5 2 12.5H11V14.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default BookIcon;
