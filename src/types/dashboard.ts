export interface IStudyPlan {
  id: number;
  uuid: string;
  day: number;
  date: string;
  chapters: string;
  topics: string;
  completed_topics: string | null;
}

export interface ICumulativeExamRes {
  id: number;
  userId: number;
  examId: number;
  studyPlanId: number;
  attempts: number;
  answers: string;
  qstIds: string;
  totalGeneratedQsts: number;
  exam_name: string;
  testType: number;
  shortUrl: string;
  overall_mark: string;
  totalTime: number;
  totalQuestions: number;
}

export interface ISubjectProgress {
  sId: number;
  subjectName: string;
  shortUrl: string;
  progress: number;
  streak: number;
  date: string;
  topics: {
    tId: number;
    topicName: string;
    shortUrl: string;
    progress: number;
    date: string;
    isCompleted: boolean;
  }[];
}

export interface IStudyPlanProps {
  id: number;
  userId: number;
  uuid: string;
  day: number;
  date: string;
  chapters: string;
  topics: string;
  completedTopics: string | null;
  isExamAttended: number;
  instructionId: number;
  addedDate: Date;
  updated_date: Date;
}
