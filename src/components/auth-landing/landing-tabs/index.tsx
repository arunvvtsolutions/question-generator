import React, { FC} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LandingContentList from './LandingContentList';
import BookIconDefault from '@/components/icons/BookIconDefault';
import { ISubjectDetailsProps } from '@/types';

export interface IDataPropsLanding {
  id: number;
  name: string;
  shortUrl: string;
  chapters: IDataChaptersLanding[];
}

export interface IDataChaptersLanding {
  chapterId: number;
  chapterName: string;
  chapterUrl: string;
}

interface ILandingProps {
  baseLink: string;
  showAll?: boolean;
  subject?: string;
  data: ISubjectDetailsProps[];
}

const LandingTabs: FC<ILandingProps> = ({ data, baseLink, showAll = false, subject }) => {
  return (
    <div>
      <Tabs defaultValue={subject?.toLowerCase() || 'physics'} className="mx-auto">
        <div className=" mx-auto  mb-[34px] lg:relative sticky lg:top-[0px] top-[-5px] lg:z-0 z-20 lg:max-w-[420px] max-w-full ">
          <TabsList
            className="lg:bg-[#F9F9F9] bg-[#Ffff]  justify-start flex lg:dark:bg-[rgb(23,23,23)] dark:bg-[#0a0a0a] space-x-2 mt-4  px-[4px] lg:!rounded-[4px] border border-[#101010]/[10%] dark:border-[#fff]/[10%]  lg:py-[10px] py-[15px] border-l-[0px] border-r-[0px] lg:border-l-[1px] lg:border-r-[1px] rounded-[25px] overflow-x-auto  max-w-full !h-[auto]
"
          >
            {data?.map((tablist, index: number) => {
              return (
                <TabsTrigger
                  key={`${tablist.name}-${index}`}
                  value={tablist.name.toLowerCase()}
                  className="px-[14px] py-[8px] font-normal lg:rounded lg:text-[16px] text-[13px] shadow-none text-[#101010]/[70%] dark:text-[#fff] dark.data-[state=active]:bg-[#0A84FF] lg:data-[state=active]:bg-[#0B57D0] dark:data-[state=active]:bg-[#0b57d0] lg:data-[state=active]:text-white data-[state=active]:text-[#0B57D0] dark:data-[state=active]:text-[#fff] rounded-[25px] lg:border-0 border  data-[state=active]:border-[#0B57D0] lg:dark:data-[state=active]:!text-[#fff] w-[33.3%] max-w-[33.3%]"
                >
                  <div className="me-2 md:block !block lg:!hidden ">
                    <BookIconDefault className="text-red" />
                  </div>
                  {tablist.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {data?.map((tabContent, index: number) => {
          return (
            <TabsContent key={`${tabContent.name}-${index}`} value={tabContent.name.toLowerCase()}>
              <LandingContentList
                key={tabContent.id}
                shortUrl={tabContent.shortUrl}
                chapters={tabContent.chapters}
                baseLink={baseLink}
                showAll={showAll}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default LandingTabs;
