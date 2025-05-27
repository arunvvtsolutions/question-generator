import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { DashboardNav } from './Dashboard';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from '@/store';
import { getUserExamResult } from '@/utils/api/exam';
import { IResumedExamProps } from '@/types/exam';
import BackArrow from '@/components/icons/BackArrow';
import { EXAM_TYPE_SHORTURLS, SIDEBAR } from '@/service/enums/texts';

type SidebarProps = {
  className?: string;
  focus: boolean;
};
export default function Sidebar({ className, focus }: SidebarProps) {
  const { exams } = useSelector((state) => state.syllabusReducer);
  const { isAuthenticated, isInitialized } = useSelector((state) => state.authReducer);
  const pathName = usePathname();
  const isStudyPlanPath = pathName.includes('study-plan');
  const [studyPlan, setStudyPlan] = useState<any>(null);
  const [userResult, setUserResult] = useState<IResumedExamProps | null>(null);


  return (
    <div
      className={cn(
        'transition-all duration-500 lg:block hidden',
        focus ? 'max-w-[384px] w-full opacity-100 overflow-x-hidden' : 'w-0 max-w-[0px] opacity-0 overflow-hidden'
      )}
    >
      <aside
        className={cn(
          `relative hidden h-screen overflow-y-auto flex-none border-r pt-20 lg:block scrollbar-thin max-h-[98vh]`,
          className
        )}
      >
        <div className="space-y-4  pt-0 pb-4">
          <div className="px-3  pt-0 pb-12">
            <div className="mt-0 space-y-1">
              <DashboardNav />
            </div>
          </div>
        </div>

        <div className="fixed bottom-0  w-full max-w-[384px] p-3">
          <>
            <Link href={'/'}>
              <div className="flex justify-center items-center dark:bg-[#0E0E0E] bg-[#0E0E0E]  w-full rounded-[4px]">
                <BackArrow />
                <p className="ms-[8px] py-[16px] text-[#fff] font-medium text-[16px]">{SIDEBAR.BACK_TO_DASHBOARD}</p>
              </div>
            </Link>
          </>
        </div>
      </aside>
    </div>
  );
}
