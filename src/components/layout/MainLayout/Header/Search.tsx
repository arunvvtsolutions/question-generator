"use client";
import AutoSearch from "@/components/common/AutoSearch";
import { cn } from "@/lib/utils";
import { SIDEBAR } from "@/service/enums/texts";
import { searchWebsite } from "@/utils/api/ncert-solutions";
import Link from "next/link";
import React, { memo, useState } from "react";
let debounceTimeout: NodeJS.Timeout;

const Search = ({className} : {className?:string}) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  const handleChange = async (value: string) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(async () => {
      const searchResult = await searchWebsite(value);
      if (searchResult.success) setData(searchResult.data);
    }, 300);
  };

  return (
    <div className={cn("w-[400px] hidden sm:block", className)}>
      <AutoSearch
        onChange={handleChange}
        setState={setValue}
        state={value}
        isDataExist={data.length !== 0}
        placeHolder="Search Notes"
      >
        <>
          {data.map((d: any, index) => (
            <>
              {d.type === "chapter" ? (
                <>
                  <Link
                    href={`/revision-notes/${d?.subjects?.shortUrl}/${d.Classes.shortUrl}-${d.shortUrl}`}
                    key={index}
                    onClick={() => setValue(d.name)}
                  >
                    <div className="px-2 py-[8px] hover:bg-[#eeeeee] dark:hover:bg-[#0a0a0a] text-[14px] cursor-pointer w-full">
                      {d.name} <span className="font-bold">{SIDEBAR.REVISION_NOTES}</span>
                    </div>
                  </Link>
                  <Link
                    href={`/important-formulas/${d?.subjects?.shortUrl}/${d.Classes.shortUrl}-${d.shortUrl}`}
                    key={index}
                    onClick={() => setValue(d.name)}
                  >
                    <div className="px-2 py-[8px] hover:bg-[#eeeeee] dark:hover:bg-[#0a0a0a] text-[14px] cursor-pointer w-full">
                      {d.name} <span className="font-bold">{SIDEBAR.IMPORTANT_FORMULAS}</span>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={`/ncert-solutions/${d?.subjects?.shortUrl}/${d?.chapters?.Classes?.shortUrl}-${d?.chapters?.shortUrl}/${d?.shortUrl}`} key={index} onClick={() => setValue(d.name)}>
                    <div className="px-2 py-[8px] hover:bg-[#eeeeee] dark:hover:bg-[#0a0a0a] text-[14px] cursor-pointer w-full">
                      {d.name}
                    </div>
                  </Link>
                </>
              )}
            </>
          ))}
        </>
      </AutoSearch>
    </div>
  );
};

export default memo(Search);
