import React from "react";
import { useExam } from "@/context/ExamContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IGeneratedTestCommonProps } from "@/types/common/db-types";
import { Clock, FileText, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ExamWithQuestions } from "./MainExamList";
import { MainModal } from "@/components/common/MainModal";
import MarkdownForBot from "@/components/common/MarkdownForBot";
import { formatDateWithMonth } from "@/utils";

interface ExamCardProps {
  exam: ExamWithQuestions;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const router = useRouter();
  const { setSelectedExam } = useExam();

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-100 text-green-800";
      case 2:
        return "bg-yellow-100 text-yellow-800";
      case 3:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Hard";
      default:
        return "Unknown";
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow  rounded-md duration-200 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">
              {exam.testTitle}
            </CardTitle>
            <CardDescription className="mt-2">
              {exam.description}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[13px] text-gray-500">
              {formatDateWithMonth(exam.createdAt)}
            </p>
            <p
              className={`${getDifficultyColor(
                exam.level
              )} px-2 py-0.5 mt-1 rounded-md  text-[13px] w-fit`}
            >
              {getDifficultyText(exam.level)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="text-[15px]">{exam.noOfQuestions} Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-[15px]">{exam.duration} Minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span className="text-[15px]">
              {exam.generatedTestQuestion.length} Generated Questions
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 mt-4 flex-wrap">
          <Button
            onClick={() => router.push("exam-question")}
            variant="outline"
            size="lg"
          >
            View Questions
          </Button>
          <Button
            onClick={() => {
              setSelectedExam(exam);
              router.push(`/exam-question/pdf/${exam.id}`);
            }}
            variant="default"
            size="lg"
          >
            View PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamCard;
