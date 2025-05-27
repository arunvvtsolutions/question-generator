import { ISubjectProps } from ".";

export enum QuestionIndexValue {
  ANSWERED = "answered",
  NOT_ANSWERED = "notAnswered",
  MARK_FOR_REVIEW = "markForReview",
  SAVE_MARK_REVIEW = "saveAndMarkForReview",
  NOT_VISITED = "notVisited",
}

export enum EXAM_ANSWER_TYPES {
  CORRECT = "Correct",
  WRONG = "Wrong",
  LEFT = "Left",
  OTHERS = "Others",
}
// IN MINS
export enum TIME_ANALYSIS {
  TOO_FAST = 0.8,
  OVER_TIME = 2,
}

export enum TIME_ANALYSIS_TYPE {
  TOO_FAST = "Too Fast",
  IDEAL = "Ideal",
  OVER_TIME = "Overtime",
}

export const QUESTION_INCLUDE_DATA = {
  answerDesc: true,
  answerDescImg: true,
  chapterId: true,
  chapters: true,
  correctOpt: true,
  deleteStatus: true,
  difficulty: true,
  examResults: true,
  id: true,
  optionA: true,
  optionAimg: true,
  optionB: true,
  optionBimg: true,
  optionC: true,
  optionCimg: true,
  optionD: true,
  optionDimg: true,
  qst_img: true,
  question: true,
  questionType: true,
  status: true,
  subjectId: true,
  subjects: true,
  topicId: true,
  topics: true,
};

export enum EXAM_DIFFICULTY_LEVEL {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
}

export enum EXAM_OPTION_KEY {
  OPTION_A = "1",
  OPTION_B = "2",
  OPTION_C = "3",
  OPTION_D = "4",
}

export enum TEST_TYPE {
  MCQ = 0,
  BENCH_MARK = 1,
}

export enum MAXIMUM_ATTEMPTS {
  CUMULATIVE_TEST = 3,
}

export interface IExamStateProps {
  error?: null | string;
  questions: IMcqQuestionProps[];
  examData: IExamDetailsProps | null;
}

export interface IOptionProps {
  optionId: string;
  optionKey: string;
  option: string;
  optionImg: string;
}

export interface IQuestionProps {
  qstId: number;
  question: string;
  questionImg: string;
  difficulty: number;
  weightage?: number;
  options: IOptionProps[];
}

export interface IMcqQuestionProps {
  secId: number;
  sId: number;
  sectionName: string;
  maxAttendedQsts: number;
  subject: string;
  shortUrl: string;
  questions: IQuestionProps[];
}

export interface IExamUpdatesProps {
  qId: number;
  sId: number;
  secId: number;
  tt: number;
  ans?: string;
  bm: boolean;
  mr: boolean;
}

export interface IUpdateExamProps {
  secId: number;
  sId: number;
  qId: number;
  ans?: string;
  bm?: boolean;
  mr?: boolean;
}

export interface IQuestionMetrics {
  id: number;
  subjectId: number;
  examId: number;
  totalQuestions: number;
  totalMark: number;
  easy: number;
  medium: number;
  hard: number;
  status: number;
  deleteStatus: number;
  addedDate: Date;
  updatedDate: Date;
  subjects: ISubjectProps;
}

export interface IExamSections {
  id: number;
  examId: number;
  subjectId: number;
  sectionName: string;
  maxAttendedQuestions?: number | null;
  status: number;
  deleteStatus: number;
  totalQuestions: number;
  addedDate: Date | null;
  updatedDate: Date | null;
  subjects: ISubjectProps;
}

export interface IUserExamResult {
  qId: number;
  sId: number;
  secId: number;
  tt: number;
  ans?: string;
  bm: boolean;
  mr: boolean;
  correctAns: string;
}

export interface IExamDetailsProps {
  id: number;
  examName: string;
  testType?: number | null;
  shortUrl: string;
  overall_mark: string;
  totalTime: number;
  totalQuestions: number;
  instruction: string;
  status: number;
  deleteStatus: number;
  addedDate: Date;
  updatedDate: Date;
}

export interface IExamStatusProps {
  lastsectionId: number;
  lastSubjectId: number;
  lastQstId: number;
  remainingTime: number;
}

export interface IResumedExamProps {
  id: number;
  userId: number;
  examId: number;
  attempts: number;
  remainingTime: number;
  lastsectionId: number;
  lastSubjectId: number;
  lastQstId: number;
  isCompleted: number;
  answers: IExamUpdatesProps[];
  studyPlanId?: number;
}

export interface IExamQuestionProps {
  id: number;
  subjectId: number;
  chapterId: number;
  topicId: number;
  question: string;
  qst_img: string;
  difficulty: number;
  optionAimg: string;
  optionBimg: string;
  optionCimg: string;
  optionDimg: string;
  correctOpt: string;
  answerDescImg: string;
  questionType: number;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answerDesc: string;
  subjectName?: string;
  chapterName?: string;
  topicName?: string;
  keywords?: string;
  title?: string;
  estimatedTime?: string;
  weightage?: number;
}

export interface IExamOverAllAnalysis {
  totalMcqs: number;
  correct: number;
  wrong: number;
  left: number;
}

export interface ISectionData {
  sectionId: number;
  sectionName: string;
  totalQuestions: number;
  attentedQsts: number;
}

export interface IExamSectionWiseProps {
  sId: number;
  subjectName: string;
  sections: ISectionData[];
}

export interface IExamResult {
  overallScore: number;
  totalMark: string;
  allIndiaRank: number;
  overAllAnalysis: IExamOverAllAnalysis;
  sectionWiseData: IExamSectionWiseProps[];
}

export interface IQuestionDataProps {
  qstId: number;
  question: string;
  questionImg: string;
  difficulty: number;
  questionType: number;
  correctOpt: string;
  answerDesc: string;
  answerImg: string;
  selectedAns: string;
  isBookMarked: boolean;
  isMarkForReview: boolean;
  totalTime: number;
  options: IOptionProps[];
  subjectName?: string;
  chapterName?: string;
  topicName?: string;
  keywords?: string;
  title?: string;
  estimatedTime?: string;
}

export interface ISecQstProps {
  id: number;
  section: string;
  questions: IQuestionDataProps[];
}

export interface IQuestionWiseDataProps {
  id: number;
  subject: string;
  sections: ISecQstProps[];
}

export interface ICumulativeExmQstInfo {
  easyPer: number;
  mediumPer: number;
  hardPer: number;
  topicIds: string;
}

export interface ISubjectWiseAnalysis {
  sId: number;
  subjectName: string;
  totalMark: number;
  scoredMark: number;
  percentage: number;
}

export interface IQuestion {
  id: number;
  answerDesc: any;
  answerDescImg: string | null;
  chapterId: number;
  chapters: Chapter;
  correctOpt: string;
  deleteStatus: number;
  difficulty: number;
  examResults: any[];
  optionA: any;
  optionAimg: string | null;
  optionB: any;
  optionBimg: string | null;
  optionC: any;
  optionCimg: string | null;
  optionD: any;
  optionDimg: string | null;
  qst_img: string | null;
  question: any;
  questionType: number;
  status: number;
  subjectId: number;
  subjects: Subject;
  topicId: number;
  topics: Topic;
}

export interface IStoredQuestion {
  id: number;
  answerDesc: any;
  answerDescImg: string | null;
  chapterId: number;
  classId: number;
  chapterName: string;
  weightage: number;
  chapterShortUrl: string;
  correctOpt: string;
  difficulty: number;
  optionA: any;
  optionAimg: string | null;
  optionB: any;
  optionBimg: string | null;
  optionC: any;
  optionCimg: string | null;
  optionD: any;
  optionDimg: string | null;
  qst_img: string | null;
  question: any;
  questionType: number;
  subjectId: number;
  subjectName: string;
  subjectShortUrl: string;
  topicId: number;
  topicName: string;
  topicShortUrl: string;
}

interface Chapter {
  id: number;
  subjectId: number;
  classId: number;
  chapterName: string;
  weightage: number;
  order: number | null;
  shortUrl: string;
  employeeId: number;
  status: number;
  deleteStatus: number;
}

interface Subject {
  id: number;
  subjectName: string;
  shortUrl: string;
  stream: number;
  employeeId: number;
  status: number;
  deleteStatus: number;
}

interface Topic {
  id: number;
  subjectId: number;
  chapterId: number;
  topicName: string;
  shortUrl: string;
  employeeId: number;
  status: number;
  deleteStatus: number;
}

export interface IDifficultyProps {
  sId: number;
  name: string;
  totalQsts: number;
  correct: number;
  wrong: number;
  left: number;
  difficultyWise: DifficultyData[];
}

interface DifficultyData {
  difficulty: number;
  totalQsts: number;
  correct: number;
  wrong: number;
  left: number;
  correctChartData: ChartData[];
  wrongChartData: ChartData[];
  leftChartData: ChartData[];
}

export interface ChartData {
  name: string;
  value: number;
}

export interface ITopicWiseResultProps {
  topicId: number;
  topicName: string;
  totalQsts: number;
  correct: number;
  wrong: number;
  left: number;
  time: number;
  accuracy: number;
}

export interface IChapterwiseResultProps {
  chapterId: number;
  chapterName: string;
  totalQsts: number;
  correct: number;
  wrong: number;
  left: number;
  time: number;
  accuracy: number;
  topics: ITopicWiseResultProps[];
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
}

export interface ICumulativeSubjectData {
  subjects: ICumulativeSubject;
}

interface ICumulativeSubject {
  id: number;
  subjectName: string;
  shortUrl: string;
  stream: number;
  employeeId: number;
  status: number;
  deleteStatus: number;
}

export interface ISubjectWiseAnalysisProps {
  subjectName: string;
  totalMark: number;
  scoredMark: number;
  attendedQstCount: number;
  percentage: number;
  totalQsts: number;
}

export interface ISubjectwiseSecResult {
  sectionName: string;
  percentage: string;
  marks: string;
  totalMarks: string;
  timeTaken: string;
  accuracy: string;
  correct: string;
  wrong: string;
  left: string;
  attendedQstCount: string;
}

export interface ISubjectwiseResult {
  subjectName: string;
  percentage: number;
  scoredMark: number;
  totalMark: number;
  timeTaken: number;
  accuracy: number;
  correct: number;
  wrong: number;
  left: number;
  section: ISubjectwiseSecResult[];
}

export interface ITimeAnalysis {
  name: string;
  correct: number;
  wrong: number;
}

export interface IExamResultAnalysis {
  overallScore: number;
  correct: number;
  wrong: number;
  left: number;
  correctPercent: number;
  wrongPercent: number;
  leftPercent: number;
  accuracy: number;
  timeTaken: number;
  avgTimePerQst: number;
  correctChartData: ChartData[];
  wrongChartData: ChartData[];
  leftChartData: ChartData[];
  totalScorePercent: number;
  totalScoreChart: ChartData[];
  totalQuestions: number;
  totalMark: string;
  totalTime: number;
  subjectWiseAnalysis: ISubjectWiseAnalysisProps[];
  subjectWiseResult: ISubjectwiseResult[];
  timeAnalysis: ITimeAnalysis[];
  difficultyPerformance: IDifficultyProps[];
  chapterwiseResult: IChapterwiseResultProps[];
}

export interface IGenerativeExamResult {
  examId: number;
  attempts: number;
  remainingTime: number;
  lastsectionId: number;
  lastSubjectId: number;
  lastQstId: number;
  isCompleted: number;
  answers: string;
  qstIds: string;
}

export interface ISecSubject {
  id: number;
  subjectName: string;
  shortUrl: string;
  stream: number;
  employeeId: number;
  status: number;
  deleteStatus: number;
  addedDate: string;
  updatedDate: string;
}

export interface IExamSection {
  id: number;
  examId: number;
  subjectId: number;
  sectionName: string;
  totalQuestions: number;
  maxAttendedQuestions: number;
  status: number;
  deleteStatus: number;
  addedDate: string;
  updatedDate: string;
  subjects: Subject;
}

export interface IPracticeExamSubjects {
  id: number;
  subjectName: string;
  shortUrl: string;
  totalQsts: number;
}
