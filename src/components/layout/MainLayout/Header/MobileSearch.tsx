"use client";
import SearchIcon from "@/components/icons/Search";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Cross1Icon } from "@radix-ui/react-icons";
const Search = dynamic(() => import("./Search"));

const MobileSearch = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="block sm:hidden pl-2">
      <div
        className={cn(
          "cursor-pointer transition-all",
          showSearch ? "hidden" : "block "
        )}
        onClick={() => setShowSearch(!showSearch)}
      >
        <SearchIcon className="size-5 opacity-[80%] transition-all" />
      </div>
      <div
        className={cn(
          "transition-all flex justify-center items-center flex-row w-full fixed left-[0] px-2 pt-2 top-0 bg-[#ffff] dark:bg-[#0a0a0a] z-50",
          showSearch ? "flex" : "hidden"
        )}
      >
        <Search
          className={cn(
            "transition-all w-full",
            showSearch ? "block" : "hidden"
          )}
        />
        <Cross1Icon
          className="cursor-pointer ml-3"
          onClick={() => setShowSearch(false)}
        />
      </div>
    </div>
  );
};

export default MobileSearch;
