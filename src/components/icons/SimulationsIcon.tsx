"use client";
import { useTheme } from "next-themes";
import React from "react";

interface ISimulationIconProps {
    fill?: string;
    className?: string;
  }
const SimulationIcon:React.FC<ISimulationIconProps> = ({className,fill='#FFFFFFCC'}) => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <svg
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M16 0C19.3137 0 22 2.68629 22 6V10C22 13.3137 19.3137 16 16 16H6C2.68629 16 0 13.3137 0 10V6C0 2.68629 2.68629 0 6 0H16ZM16 2H6C3.8578 2 2.10892 3.68397 2.0049 5.80036L2 6V10C2 12.1422 3.68397 13.8911 5.80036 13.9951L6 14H16C18.1422 14 19.8911 12.316 19.9951 10.1996L20 10V6C20 3.8578 18.316 2.10892 16.1996 2.0049L16 2ZM9 5V7H11V9H8.999L9 11H7L6.999 9H5V7H7V5H9ZM17 9V11H15V9H17ZM15 5V7H13V5H15Z"
          fill={resolvedTheme === "light" ? "#101010" : fill}
        />
      </svg>
    </>
  );
};
export default SimulationIcon;
