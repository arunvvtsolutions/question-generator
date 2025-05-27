"use client";

import { IGroupedAiQuestion } from "@/types/generate-questions";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Hash, FileText } from "lucide-react";
import Link from "next/link";
import MarkdownRender from "@/components/ui/MarkdownRender";

interface Props {
  group: IGroupedAiQuestion;
}

const GroupedQuestionCard: React.FC<Props> = ({ group }) => {
  const firstQuestion = group.questions[0];

  return (
    <Card className="w-full h-full shadow-sm border border-muted bg-background/70 rounded-xl transition-all duration-200 hover:shadow-md hover:bg-background/90 flex flex-col justify-between">
      <CardHeader className="pb-2 pt-4 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-base sm:text-lg font-semibold text-primary">Question Papper</CardTitle>

          <span className="bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
            {group.questions.length} Questions
          </span>
        </div>
      </CardHeader>

      <CardContent className="text-xs sm:text-sm space-y-3 px-4 sm:px-6">
        <div className="bg-muted/50 p-2 sm:p-3 rounded-lg">
          <p className="line-clamp-2 text-foreground font-medium">
            {" "}
            <MarkdownRender content={firstQuestion.question} />
          </p>
        </div>

        <div className="grid gap-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
            <BookOpen size={14} className="text-primary/70 flex-shrink-0" />
            <span className="font-medium whitespace-nowrap">Chapter:</span>
            <span className="truncate max-w-[120px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-full">
              {firstQuestion.chapters.chapterName}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
            <Hash size={14} className="text-primary/70 flex-shrink-0" />
            <span className="font-medium whitespace-nowrap">Topic:</span>
            <span className="truncate max-w-[120px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-full">
              {firstQuestion.topics.topicName}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto pt-3 pb-4 px-4 sm:px-6">
        <Link href={`/view-ai-questions/${group.groupedUuid}`} className="w-full">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-1 sm:gap-2  hover:bg-[#0B57D0] text-xs sm:text-sm py-1.5 sm:py-2 h-auto hover:text-white"
          >
            <FileText size={14} className="hidden xs:inline-block" />
            <span>View All Questions</span>
            <ArrowRight size={14} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GroupedQuestionCard;
