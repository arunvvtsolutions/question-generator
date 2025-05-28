import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IGeneratedTestCommonProps } from '@/types/common/db-types';
import { Clock, FileText, GraduationCap } from 'lucide-react';

interface ExamCardProps {
  exam: IGeneratedTestCommonProps & {
    generatedTestQuestion: Array<{
      id: number;
      questionId: number;
      chapterId: number;
      subjectId: number;
      topicId: number;
      testId: number;
      aiQuestions: {
        id: number;
        uuid: string;
        question: string;
        answerDesc: string;
        difficulty: number;
        questionType: string;
        addedDate: string;
        subjectId: number;
        chapterId: number;
        topicId: number;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctOpt: string;
        modelId: number;
        updatedDate: string;
        cognitiveLevel: number;
        estimatedTime: number;
      };
    }>;
  };
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-green-100 text-green-800';
      case 2:
        return 'bg-yellow-100 text-yellow-800';
      case 3:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      case 3:
        return 'Hard';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow  rounded-md duration-200 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{exam.testTitle}</CardTitle>
            <CardDescription className="mt-2">{exam.description}</CardDescription>
          </div>
          <p className={`${getDifficultyColor(exam.level)} px-2 py-1 rounded-md  text-[13px]`}>
            {getDifficultyText(exam.level)}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className='text-[15px]'>{exam.noOfQuestions} Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className='text-[15px]'>{exam.duration} Minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span className='text-[15px]'>{exam.generatedTestQuestion.length} Generated Questions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamCard;