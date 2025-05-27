"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { DashboardNav } from "./Dashboard";
import { useSelector } from "@/store";
import { IResumedExamProps } from "@/types/exam";
import { usePathname } from "next/navigation";

import { getUserExamResult } from "@/utils/api/exam";
import Link from "next/link";
import BackArrow from "@/components/icons/BackArrow";
import { EXAM_TYPE_SHORTURLS, SIDEBAR } from "@/service/enums/texts";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebarVisible?: boolean;
}
function MobileSidebar({ className, sidebarVisible = true }: SidebarProps) {
  const { exams } = useSelector((state) => state.syllabusReducer);
  const { isAuthenticated, isInitialized } = useSelector((state) => state.authReducer);
  const [open, setOpen] = useState(false);
  const [studyPlan, setStudyPlan] = useState<any>(null);
  const [userResult, setUserResult] = useState<IResumedExamProps | null>(null);

  const pathName = usePathname();

  const isStudyPlanPath = pathName.includes("study-plan");



  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        {sidebarVisible && (
          <SheetTrigger asChild>
            <button
              aria-label="Mobile menubar open"
              aria-haspopup="false"
              aria-expanded="false"
              onClick={() => setOpen(!open)}
              title="Focus Mode"
              className="bg-none border-none p-0 cursor-pointer me-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                strokeWidth="2"
                stroke="url(#gradient)"
                className="size-6"
                fill="none"
              >
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#eb504f"></stop>
                    <stop offset="25%" stopColor="#4285f4"></stop>
                    <stop offset="50%" stopColor="#8a4bd1"></stop>
                    <stop offset="75%" stopColor="#c04c8a"></stop>
                    <stop offset="100%" stopColor="#eb504f"></stop>
                  </linearGradient>
                </defs>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16"></path>
              </svg>
            </button>
          </SheetTrigger>
        )}

        <SheetContent
          side="left"
          className="!px-0 dark:bg-[background] md:w-96 w-full flex justify-between flex-col h-full"
        >
          <div className="space-y-4 pb-4">
            <div className="px-3 py-2">
              <div className="space-y-1 overflow-y-auto max-h-[83vh] scrollbar-thin" tabIndex={0}>
                <DashboardNav setOpen={setOpen} />
              </div>
            </div>
          </div>

          <div className=" w-full p-3 absolute bottom-0">
            <Link href={"/"}>
              <div className="flex justify-center items-center dark:bg-[#0E0E0E] bg-[#0E0E0E]  w-full rounded-[4px]">
                <BackArrow />
                <p className="ms-[8px] py-[16px] text-[#fff] font-medium text-[16px]">{SIDEBAR.BACK_TO_DASHBOARD}</p>
              </div>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default MobileSidebar;
