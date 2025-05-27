import Link from 'next/link';
import React, { FC } from 'react';
import { IChapterDetailsProps } from '@/types';
import RightArrow from '@/components/icons/RightArrow';
import { cn } from '@/lib/utils';
import MiniRobotIcon from '@/components/icons/MiniRobotIcon';
import { HOMEPAGE } from '@/service/enums/texts';

interface ITestProps {
  open: boolean;
  baseLink?: string;
  shortUrl?: string;
  chapters?: IChapterDetailsProps[];
  handleOpen: (value: string) => void;
}

const ContentList: FC<ITestProps> = ({
  open,
  chapters,
  baseLink,
  shortUrl,
  handleOpen,
}) => {
  const constructUrl = (
    chapter: IChapterDetailsProps,
    baseLink?: string,
    shortUrl?: string
  ) => {
    return `/${baseLink ? `${baseLink}/` : ''}${
      shortUrl ? `${shortUrl}/` : ''
    }${chapter.Classes.shortUrl}${
      chapter.shortUrl ? `-${chapter.shortUrl}` : ''
    }`;
  };

  return (
    <div className="relative">
      <div
        className={`scrollbar-thin transition-all relative ${
          open
            ? 'lg:h-max pr-2'
            : 'lg:max-h-[200px] max-h-[265px] overflow-hidden'
        }`}
      >
        <ul className="space-y-2">
          {chapters?.map((chapter) => {
            return (
              <li
                key={chapter.id}
                className="border-b lg:py-3 py-2 !mt-0 list-none"
                data-test-id={`subject-List-${chapter.chapterName}`}
                aria-label={`${chapter.chapterName}-Details`}
              >
                <Link
                  //   href={constructUrl(chapter, baseLink, shortUrl)}
                  href={`${baseLink}/${chapter.shortUrl}`}
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-:R4v5kvaacq:"
                  data-state="closed"
                  className="group flex items-center w-full"
                  data-test-id={`${chapter.chapterName}-details`}
                  aria-label={`${chapter.chapterName} Details`}
                >
                  <div className="w-[30px] h-[30px] me-[14px] bg-[#F5F5F5B2]/[70%] dark:bg-[#171717] p-[6px] rounded-[100px] flex-shrink-0 flex items-center justify-center group-hover:fill-[#0385FF] group-hover:bg-[#0385ff21] dark:group-hover:bg-[#0385ffd7]">
                    <MiniRobotIcon />
                  </div>

                  <p className="lg:text-[18px] text-left text-[14px] dark:text-[#D7D7D7] text-[#101010] group-hover:text-[#0385FF]">
                    {chapter.chapterName}
                  </p>

                  <div className="ml-auto group-hover:text-[#0385FF]">
                    <RightArrow size="size-4" color="#000" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {!open && (
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-white to-transparent dark:from-[#0d0d0df0] pointer-events-none"></div>
        )}
      </div>

      <div className="text-right mt-4">
        <button
          className={cn(
            `text-[#101010] hover:!text-[#0B57D0] dark:text-[#D7D7D7]`,
            open && 'text-[#0B57D0] dark:text-[#0385FF]'
          )}
          onClick={() => handleOpen(shortUrl || '')}
          data-test-id={`read-more-btn-`}
          aria-label={`Read More And Read Less`}
        >
          {open ? HOMEPAGE.SHOWLESS_CHAPTERS : HOMEPAGE.SHOWMORE_CHAPTERS}
        </button>
      </div>
    </div>
  );
};

export default ContentList;
