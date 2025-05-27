import { Accordion, } from "@/components/ui/accordion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChatAccordionProps {
  accordionChapValue: string;
  isPreviousChatPath: boolean;
  chatData: { chatLink: string; threadId: string; title: string }[];
  workLibrary: { threadId: string; title: string }[];
  pathName: string;
  paramsPath: string;
  setOpen?: (open: boolean) => void;
  SIDEBAR: { WORK_BOOK_EMPTY: string };
}

const ChatAccordion: React.FC<ChatAccordionProps> = ({
  accordionChapValue,
  isPreviousChatPath,
  chatData,
  workLibrary,
  pathName,
  paramsPath,
  setOpen,
  SIDEBAR,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full py-1"
      defaultValue="work-library-1"
      value={accordionChapValue}
    >
      {isPreviousChatPath ? (
        chatData.length > 0 ? (
          chatData.map((chat, index) => (
            <Link
              key={index}
              onClick={() => setOpen && setOpen(false)}
              href={`/ask-your-doubts/${chat.chatLink}`}
              className={cn(
                "no-underline text-[#101010] flex justify-between item-center py-2 mx-2 px-2 rounded-sm",
                pathName.split("/").pop() === chat.threadId && "bg-[#f5f5f5] dark:bg-[#161616]"
              )}
            >
              <p className="mb-0 dark:text-[#ffffffcb] dark:hover:!text-[#fff] max-w-80 text-left multi-line-truncate lg:text-[14px] text-[12px] capitalize">
                {chat.title}
              </p>
              <ChevronRightIcon className="h-3.5 text-[#525252] shrink-0 ml-auto dark:text-[#fff]" />
            </Link>
          ))
        ) : (
          <div className="flex justify-center items-center p-2">
            <p>{SIDEBAR.WORK_BOOK_EMPTY}</p>
          </div>
        )
      ) : workLibrary.length > 0 ? (
        workLibrary.map((chat, index) => (
          <Link
            key={index}
            onClick={() => setOpen && setOpen(false)}
            href={`${(() => {
              if (pathName.includes("study-plan/ask-your-doubts")) return "/study-plan/ask-your-doubts/";
              if (pathName.includes("ask-your-doubts")) return "/ask-your-doubts/";
              if (pathName.includes("neet-mentor")) return "/neet-mentor/";
              if (pathName.includes("ask-about-admissions")) return "/ask-about-admissions/";
              if (pathName.includes("pyq-doubt-ai")) return "/pyq-doubt-ai/";
              return "/";
            })()}${paramsPath}${chat.threadId}`}
            className={cn(
              "no-underline text-[#101010] flex justify-between item-center py-2 mx-2 px-2 rounded-sm",
              pathName.split("/").pop() === chat.threadId && "bg-[#f5f5f5] dark:bg-[#161616]"
            )}
          >
            <p className="mb-0 dark:text-[#ffffffcb] dark:hover:!text-[#fff] max-w-80 text-left multi-line-truncate lg:text-[14px] text-[12px] capitalize">
              {chat.title}
            </p>
            <ChevronRightIcon className="h-3.5 text-[#525252] shrink-0 ml-auto dark:text-[#fff]" />
          </Link>
        ))
      ) : (
        <div className="flex justify-center items-center p-2">
          <p>{SIDEBAR.WORK_BOOK_EMPTY}</p>
        </div>
      )}
    </Accordion>
  );
};

export default ChatAccordion;
