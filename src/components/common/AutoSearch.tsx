"use client";
import React, { memo, useState } from "react";
import SearchIcon from "../icons/Search";
import { ERROR } from "@/service/enums/texts";

const AutoSearch = ({
  children,
  state,
  isDataExist,
  placeHolder = 'Search',
  setState,
  onChange,
}: {
  children: React.ReactNode;
  state: string;
  isDataExist?: boolean;
  placeHolder?:string
  setState: (value: string) => void;
  onChange: (value: string) => void;
}) => {
  const [hideSuggestionBox, setHideSuggestionBox] = useState(true);

  return (
    <div
      className=" w-full relative"
      onBlur={() => setTimeout(() => setHideSuggestionBox(true), 300)}
    >
      <div className="relative z-10 flex justify-center items-center">
        <div className="absolute left-[8px]">
          <SearchIcon />
        </div>
        <input
          value={state}
          type="text"
          placeholder={placeHolder}
          className="w-full h-full p-2 focus:outline-none rounded-[8px]  pl-[35px] py-3 bg-[#f5f5f5] dark:bg-[#1d1d1d]"
          onChange={(e) => {
            onChange(e.target.value);
            setState(e.target.value);
          }}
          onClick={() => setHideSuggestionBox(false)}
        />
      </div>
      {!hideSuggestionBox && (
        <div className="bg-[#FFFF] dark:bg-[#1d1d1d] dark:border shadow max-h-[200px] w-full absolute  rounded-[8px] overflow-y-auto scrollbar-thin">
          {isDataExist ? (
            children
          ) : (
            <>
              <div className="p-2 hover:bg-[#eeeeee] dark:hover:bg-[#0a0a0a] text-[14px] cursor-pointer text-center">
                {ERROR.NO_DATA_FOUND}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(AutoSearch);
