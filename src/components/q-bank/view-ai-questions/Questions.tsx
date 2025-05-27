import dynamic from "next/dynamic";
const ExcelExport = dynamic(() => import("@/components/exel-download/ExcelExport"), { ssr: false });
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MarkdownRender from "@/components/ui/MarkdownRender";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { IAiQuestionsProps } from "@/types/generate-questions";
import { generateImproveAiQuestion } from "@/utils/api/generate-questions";
import { TimerIcon } from "@radix-ui/react-icons";
import React, { Fragment, useEffect, useRef, useState } from "react";
import FeedbackLoader from "./FeedbackLoader";
import { useReactToPrint } from "react-to-print";
import ExportQuestionsToWord from "@/components/word-download/WordExport";
import QuestionPdfDownloadTemplete from "@/components/QuestionPdfDownTemplete/PdfTemplete";

const Questions = ({
  data,
  loading,
  refreshData,
}: {
  data: IAiQuestionsProps[];
  loading: boolean;
  refreshData: () => Promise<void>;
}) => {
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPdf = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: "AI Questions PDF",
  });

  const [explanationExPand, setExplanationExpand] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

  const cognitiveLevelColor = (level: string) => {
    if (level === "Application") return "border-[#cefafd] bg-[#cefafd] !text-[#0e748e] ";
    if (level === "Applying") return "border-[#cefafd] bg-[#cefafd] !text-[#0e748e] ";
    if (level === "Remembering") return "border-[#f3e8fe] bg-[#f3e8fe] !text-[#a562d9] ";
    if (level === "Understanding") return "border-[#dce9fd] bg-[#dce9fd] !text-[#2550d4] ";
    if (level === "Knowledge") return "border-[#cbfbf1] bg-[#cbfbf1] !text-[#09756e] ";
  };
  const colorSchemes = [
    { bg: "#EADCF8", text: "#8A2BE2" },
    { bg: "#DCE9FD", text: "#2550D4" },
    { bg: "#D5F7F8", text: "#0D8F95" },
    { bg: "#DBFCE7", text: "#1C715A" },
    { bg: "#FDE2E4", text: "#D8345F" },
    { bg: "#FDDADA", text: "#C62828" },
  ];
  let lastColorIndex = -1;

  const getNextColor = () => {
    let nextColorIndex;
    do {
      nextColorIndex = Math.floor(Math.random() * colorSchemes.length);
    } while (nextColorIndex === lastColorIndex);
    lastColorIndex = nextColorIndex;
    return colorSchemes[nextColorIndex];
  };

  const handleFeedbackSubmit = async (questionId: number) => {
    if (!feedback.trim()) {
      toast({
        variant: "destructive",
        title: "Feedback is empty",
        description: "Please provide your feedback before submitting.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await generateImproveAiQuestion(questionId, feedback);
      if (res.success) {
        toast({
          title: "Feedback submitted",
          description: "Thank you for helping us improve our questions!",
        });
        await refreshData();
      } else {
        toast({
          title: "Submission failed",
          description:
            typeof res.message === "string" ? res.message : "Unable to process your feedback. Please try again.",
          variant: "destructive",
        });
      }
      setFeedback("");
      setActiveQuestionId(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to submit your feedback. Please try again.",
      });
    } finally {
      // Reset loading state
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {loading ? (
        <div className="grid gap-5 px-4 sm:px-6 md:px-8 lg:px-10">
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} className="h-[350px] w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-end gap-2 p-2">
            <Button
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 border border-gray-700 hover:border-green-500"
              onClick={() => handleDownloadPdf?.()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              <span>PDF Download</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
            </Button>

            <ExcelExport
              filename="ai-questions-export.xlsx"
              worksheets={[
                {
                  name: "AI Questions",
                  data: data,
                },
              ]}
            />
            <ExportQuestionsToWord questions={data} />
          </div>
          <div className="hidden print:block">
            <div ref={contentRef}>
              <QuestionPdfDownloadTemplete data={data} />
            </div>
          </div>
          {data.length ? (
            <div>
              {data.map((d, i) => {
                return (
                  <Fragment key={i}>
                    <div className="relative mb-5 rounded-lg border px-2 py-[55px] pb-[20px] m-5">
                      <div className="absolute right-5 top-[12px] z-[3000px] flex flex-wrap items-center justify-center  gap-2">
                        <Dialog
                          open={activeQuestionId === d.id}
                          onOpenChange={(open) => {
                            if (!isSubmitting) {
                              setActiveQuestionId(open ? d.id : null);
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs px-3 py-1 rounded-full border border-gray-300"
                              onClick={() => setActiveQuestionId(d.id)}
                            >
                              Improve
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            {isSubmitting ? (
                              <FeedbackLoader />
                            ) : (
                              <>
                                <DialogHeader>
                                  <DialogTitle>Improve This Question</DialogTitle>
                                  <DialogDescription>
                                    Suggest improvements or report issues with this question.
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-2">
                                  <label htmlFor="improve-text" className="text-sm font-medium">
                                    Your Suggestion
                                  </label>
                                  <Textarea
                                    id="improve-text"
                                    placeholder="E.g., Option B seems unclear, or the explanation could be more detailed..."
                                    className="min-h-120"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                  />
                                </div>

                                <DialogFooter>
                                  <Button
                                    type="button"
                                    className="w-full bg-[#0B57D0] hover:bg-[#0B57D0] text-white"
                                    onClick={() => handleFeedbackSubmit(d.id)}
                                  >
                                    Submit Feedback
                                  </Button>
                                </DialogFooter>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                        {d.cognitiveLevel.title && (
                          <div
                            className={`flex items-center gap-2 rounded-3xl border  px-4 py-2 ${cognitiveLevelColor(
                              d.cognitiveLevel.title
                            )}`}
                          >
                            <span className="text-nowrap text-[11px] font-medium capitalize tracking-wider  sm:text-[12px]">
                              {d.cognitiveLevel.title || "NA"}
                            </span>
                          </div>
                        )}

                        <Badge
                          className={cn(
                            " text-nowrap rounded-[25px] px-4 py-2 text-[11px] font-medium capitalize tracking-wider !shadow-none  sm:text-[12px]",
                            d.difficulty === 1
                              ? "border-[#d0fae5] bg-[#d0fae5] !text-[#007758] hover:bg-[#d0fae5] "
                              : d.difficulty === 2
                              ? "border-[#fdf9c7] bg-[#fdf9c7] !text-[#a1621b] hover:bg-[#fdf9c7]"
                              : d.difficulty === 3
                              ? "border-[#fee2e2] bg-[#fee2e2] !text-[#ba2023] hover:bg-[#fee2e2]"
                              : "border-[#fdf9c7] bg-[#fdf9c7] !text-[#a1621b] hover:bg-[#fdf9c7]"
                          )}
                        >
                          {d.difficulty === 1 ? "Easy" : d.difficulty === 2 ? "Medium" : "Hard"}
                        </Badge>

                        <Badge className=" rounded-[25px] !bg-[#e0f2fe] px-4 py-2 text-[11px] text-[#0a699e] !shadow-none sm:text-[12px] ">
                          <TimerIcon className="me-2" /> {d.estimated_time} mins
                        </Badge>
                      </div>
                      <div className="xs:mt-3 relative  mt-5 rounded-sm px-[15px] py-[10px] sm:mt-auto">
                        <div className="inline-flex  leading-7">
                          <span className="mr-2 text-[14px] font-bold text-[#00143f] lg:text-[16px] dark:text-[#0385ffd7]">
                            {i + 1}.
                          </span>
                          <MarkdownRender content={`${d.question}`} />
                        </div>
                      </div>

                      <div className="mt-4">
                        <div
                          className={cn(
                            "mt-2 rounded-sm border-[1px] px-[15px] py-[8px]",
                            d.correctOpt === "1"
                              ? "border-[#C7F7D499] bg-[#C7F7D499] text-[#046444] dark:border-[#C7F7D4] dark:bg-[#C7F7D4]"
                              : ""
                          )}
                        >
                          <div className="inline-flex leading-7">
                            <span className="text-[12px] font-medium lg:text-[14px] ">Option A: </span>{" "}
                            <MarkdownRender content={d.optionA} />
                          </div>
                        </div>
                        <div
                          className={cn(
                            "mt-2 rounded-sm border-[1px] px-[15px] py-[8px]",
                            d.correctOpt === "2"
                              ? "border-[#C7F7D499] bg-[#C7F7D499] text-[#046444] dark:border-[#C7F7D4] dark:bg-[#C7F7D4]"
                              : ""
                          )}
                        >
                          <div className="inline-flex leading-7">
                            <span className="text-[12px] font-medium lg:text-[14px] ">Option B: </span>
                            <MarkdownRender content={d.optionB} />
                          </div>
                        </div>
                        <div
                          className={cn(
                            "mt-2 rounded-sm border-[1px] px-[15px] py-[8px]",
                            d.correctOpt === "3"
                              ? "border-[#C7F7D499] bg-[#C7F7D499] text-[#046444] dark:border-[#C7F7D4] dark:bg-[#C7F7D4]"
                              : ""
                          )}
                        >
                          <div className="inline-flex leading-7">
                            <span className="text-[12px] font-medium lg:text-[14px] ">Option C: </span>
                            <MarkdownRender content={d.optionC} />
                          </div>
                        </div>
                        <div
                          className={cn(
                            "mt-2 rounded-sm border-[1px] px-[15px] py-[8px]",
                            d.correctOpt === "4"
                              ? "border-[#C7F7D499] bg-[#C7F7D499] text-[#046444] dark:border-[#C7F7D4] dark:bg-[#C7F7D4]"
                              : ""
                          )}
                        >
                          <div className="inline-flex leading-7">
                            <span className="text-[12px] font-medium lg:text-[14px] ">Option D: </span>
                            <MarkdownRender content={d.optionD} />
                          </div>
                        </div>
                      </div>

                      <div className="my-4 flex flex-wrap items-center gap-2 rounded-lg">
                        <div className="flex items-center gap-2 rounded-3xl border-[#e0e7fe] bg-[#e0e7fe] px-4 py-2 ">
                          <span className="text-nowrap text-[13px] font-medium text-[#000] lg:text-[14px]  ">
                            📚 Subject:
                          </span>
                          <span className="text-nowrap text-[13px]  font-medium text-[#473ac5] lg:text-[14px] ">
                            {d.subjects.subjectName}
                          </span>
                        </div>

                        <div className="borer-[#fef2ca] flex items-center gap-2 rounded-3xl bg-[#fef2ca] px-4 py-2">
                          <span className="text-nowrap text-[13px] font-medium text-[#000] lg:text-[14px]  ">
                            📑 Chapter:
                          </span>
                          <span className="text-nowrap text-[13px]  font-medium text-[#b4541c] lg:text-[14px] ">
                            {d.chapters.chapterName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 rounded-3xl border-[#ecfbce] bg-[#ecfbce] px-4 py-2 ">
                          <span className="text-nowrap text-[13px] font-medium text-[#000] lg:text-[14px]  ">
                            🎯 Topic:
                          </span>
                          <span className="text-nowrap text-[13px]  font-medium text-[#4d7d1f] lg:text-[14px] ">
                            {d.topics.topicName}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <div className=" text-nowrap text-[13px]  font-semibold text-[#101010] lg:text-[14px] dark:text-[#fff]  ">
                          🔄 Concepts:
                        </div>
                        {d.keywords &&
                          d.keywords.split(",").map((keyword, i) => {
                            const colors = getNextColor();
                            return (
                              <div className="my-4  gap-2 rounded-lg" key={i}>
                                <div
                                  className="flex items-center gap-2 rounded-3xl  px-4 py-2"
                                  style={{ backgroundColor: colors.bg }}
                                >
                                  <span
                                    style={{ color: colors.text }}
                                    className="text-nowrap text-[12px]  font-medium text-blue-600 lg:text-[14px]"
                                  >
                                    {keyword || "NA"}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>

                      <Accordion
                        type="single"
                        collapsible
                        value={explanationExPand}
                        className="mt-4 w-full rounded-sm border-[1px] bg-[#f3faff] px-[15px] py-[2px] no-underline dark:bg-[#27272a]"
                      >
                        <AccordionItem value={`${i}`} className="border-none">
                          <AccordionTrigger
                            onClick={() => setExplanationExpand((prev) => (prev === `${i}` ? "" : `${i}`))}
                          >
                            Explanation
                          </AccordionTrigger>
                          <AccordionContent className="mark_down_text">
                            <MarkdownRender content={d.answerDesc} />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          ) : (
            <>
              <div className="flex h-[60vh] w-full items-center justify-center">No Data Found</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
