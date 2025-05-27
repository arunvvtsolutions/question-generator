import React from "react";
import { Skeleton } from "../ui/skeleton";

const AutoSearchSkelton = () => {
  return (
    <div className="w-[130px] sm:w-full md:w-[350px]">
      <Skeleton className="w-full h-[37px]" />
    </div>
  );
};

export default AutoSearchSkelton;
