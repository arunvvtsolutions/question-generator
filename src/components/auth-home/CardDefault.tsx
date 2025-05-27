import React, { ReactElement } from "react";
import MainCard from "../common/MainCard";

const CardDefault = ({ content }: { content: ReactElement }) => {
  return (
    <MainCard title="" className="shadow-none h-[150px] !p-0" contentClassName="h-full">
      {content}
    </MainCard>
  );
};

export default CardDefault;
