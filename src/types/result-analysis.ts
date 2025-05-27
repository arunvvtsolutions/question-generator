export interface IExamResultProps {
  id: number;
  userId: number;
  examId: number;
  attempts: number;
  uniqueId: null | string;
  remainingTime: number;
  lastsectionId: number | null;
  lastSubjectId: number;
  lastQstId: number;
  isCompleted: number;
  answers: string;
  qstIds: string | null;
  totalGeneratedQsts: number | null;
  status: number;
  deleteStatus: number;
  addedDate: Date;
  updatedDate: Date;
}

export interface ITopicwiseAnalysis {
  tId: number;
  shortUrl: string;
  topicName: string;
  correctPercentage: number;
  totalQuestions: number;
  totalCorrectQsts: number;
  totalWrongQsts: number;
  totalLeftQsts: number;
  timePerQuestion: number;
  totalTime: number;
  accuracy: number;
  attempted: number;
  subjectName: string;
}

export interface ITopicMastryAnalysis {
  sId: number;
  subjectName: string;
  shortUrl: string;
  expertedTopics: number;
  profientTopics: number;
  improvingTopics: number;
  neetToWork: number;
  topics: ITopicwiseAnalysis[];
}

export interface ISubjectwiseAnalysis {
  sId: number;
  shortUrl: string;
  subjectName: string;
  totalQuestions: number;
  attempted: number;
  correctPercentage: number;
  accuracy: number;
  timePerQuestion: number;
  totalCorrectQsts: number;
  totalWrongQsts: number;
  totalLeftQsts: number;
  totalTime: number;
  topics: ITopicwiseAnalysis[];
}

export interface ITimeManagementAIInput {
  question: any;
  correct_opt: any;
  option_a: any;
  option_b: any;
  option_c: any;
  option_d: any;
  user_selected: any;
  Chapter: string | undefined;
}

export interface ITimeManagementAIOutput {
  response: {
    strong_areas: string;
    areas_of_improvement: string;
    practice_strategies: string;
    time_saving_tips: string;
  }[];
  tokens: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    input_token_details: {
      cache_read: number;
    };
  };
}

export interface ICumulativeExamResultProps {
  id: number;
  userId: number;
  examId: number;
  studyPlanId: number;
  attempts: number;
  remainingTime: number;
  lastsectionId: number | null;
  lastSubjectId: number;
  lastQstId: number;
  isCompleted: number;
  answers: string;
  qstIds: string | null;
  totalGeneratedQsts: number | null;
  status: number;
  deleteStatus: number;
  addedDate: Date;
  updatedDate: Date;
}
