"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { memo } from "react";

import { useParams, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "@/store";

import QuestionAndAnswerIcon from "../icons/QAndAIcon";

import ExamIcon from "../icons/Exam";

import SidebarMenuItem from "./SidebarMenuItem";

import { AI, SIDEBAR } from "@/service/enums/texts";

const SideBarAccordion = ({ setOpen }: { setOpen?: (open: boolean) => void }) => {
  const dispatch = useDispatch();

  const params: any = useParams();
  const pathName = usePathname();

  const { user } = useSelector((state: any) => state.authReducer);

  return (
    <>
      <SidebarMenuItem
        icon={<ExamIcon className="w-[16px]" />}
        link={`/home`}
        linkText={SIDEBAR.DASHBOARD}
        setOpen={setOpen}
      />

      <SidebarMenuItem
        icon={<QuestionAndAnswerIcon className="w-[16px]" />}
        link={`/generate-questions`}
        linkText={SIDEBAR.GENERATE_TEST}
        setOpen={setOpen}
      />
      <SidebarMenuItem
        icon={<QuestionAndAnswerIcon className="w-[16px]" />}
        link={`/view-ai-questions`}
        linkText={SIDEBAR.VIEW_QUESTIONS}
        setOpen={setOpen}
      />

      {/* <SidebarSkelton /> */}
    </>
  );
};

export default memo(SideBarAccordion);
