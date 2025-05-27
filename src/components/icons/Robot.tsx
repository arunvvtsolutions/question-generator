import { useTheme } from "next-themes";
import React from "react";

const RobotIcon = ({
  fill = "#FFFFFFCC",
  className,
}: {
  fill?: string;
  className?: string;
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <defs>
        <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4285f4', stopOpacity: 1 }}>
            <animate
              attributeName="stopColor"
              values="#4285f4; #8a4bd1; #c04c8a; #eb504f; #4285f4"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" style={{ stopColor: '#eb504f', stopOpacity: 1 }}>
            <animate
              attributeName="stopColor"
              values="#eb504f; #c04c8a; #8a4bd1; #4285f4; #eb504f"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <path
        d="M11 1V2H7C5.34315 2 4 3.34315 4 5V8C4 10.7614 6.23858 13 9 13H15C17.7614 13 20 10.7614 20 8V5C20 3.34315 18.6569 2 17 2H13V1H11ZM6 5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V8C18 9.65685 16.6569 11 15 11H9C7.34315 11 6 9.65685 6 8V5ZM9.5 9C10.3284 9 11 8.32843 11 7.5C11 6.67157 10.3284 6 9.5 6C8.67157 6 8 6.67157 8 7.5C8 8.32843 8.67157 9 9.5 9ZM14.5 9C15.3284 9 16 8.32843 16 7.5C16 6.67157 15.3284 6 14.5 6C13.6716 6 13 6.67157 13 7.5C13 8.32843 13.6716 9 14.5 9ZM6 22C6 18.6863 8.68629 16 12 16C15.3137 16 18 18.6863 18 22H20C20 17.5817 16.4183 14 12 14C7.58172 14 4 17.5817 4 22H6Z"
        fill="url(#animatedGradient)"
      ></path>
    </svg>
  );
};

export default RobotIcon;
