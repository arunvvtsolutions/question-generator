import { cn } from "@/lib/utils";
import React from "react";

const FlashcardsIcon = ({
  className = ``,
}: {
  width?: string;
  height?: string;
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="14"
        width="60"
        height="44"
        rx="4"
        stroke="black"
        strokeWidth="4"
        fill="white"
      />
      <rect
        x="20"
        y="26"
        width="60"
        height="44"
        rx="4"
        stroke="black"
        strokeWidth="4"
        fill="white"
      />
      <path
        d="M30 36H60"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M30 46H50"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default FlashcardsIcon;
