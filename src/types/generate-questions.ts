import { ISubjectProps } from '.';
import { IExamDetailsProps } from './exam';

export interface IGenrateQstBodyProps {
 subjectIds: string;
  chapterIds: string;
  topicIds: string;
  questionLevels: string;
  totalQuestion: string;
  selectedCognitiveLevel: string;
  questionQuality:number
  stream:string
}


export interface ICreateGenQstProps {
  qId: number;
  userId: number;
  uuid: string;
}
export interface IAiQuestionsProps {
  id: number;
  user_id: number;
  uuid: string;
  question: string;
  correctOpt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answerDesc: string;
  difficulty: number;
  topicId: number;
  subjectId: number;
  chapterId: number;
  estimated_time: number | null;
  cognitive_level: number;
  keywords:string
  topics: {
    id: number;
    topicName: string;
  };
  subjects: {
    id: number;
    subjectName: string;
  };
  chapters: {
    id: number;
    chapterName: string;
  };
  cognitiveLevel: {
    id: number;
    title: string;
  };
}


export interface IAiQuestion {
  id: number;
  user_id: number;
  uuid: string;
  question: string;
  correctOpt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answerDesc: string;
  difficulty: number;
  questionType: number;
  topicId: number;
  subjectId: number;
  chapterId: number;
  cognitive_level: number;
  keywords: string | null;
  estimated_time: number | null;
  QC: string | null;
  addedDate: Date | string;
  updatedDate: Date | string | null;
  model: string | null;
  subjects: {
    subjectName: string;
  };
  chapters: {
    chapterName: string;
  };
  topics: {
    topicName: string;
  };
}

export interface IGroupedAiQuestion {
  groupedUuid: string;
  questions: IAiQuestion[];
}
export interface IGenrateQstProps {
  id: number;
  qId: number;
  testTypeId: number;
  subjectId: number;
  subjectName: string;
  subjectShortUrl: string;
  chapterId: number;
  chapterName: string;
  chapterShortUrl: string;
  topicId: number;
  topicName: string;
  topicShortUrl: string;
  question: string;
  difficulty: number;
  correctOpt: string;
  answerDescImg: string;
  questionType: number;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answerDesc: string;
  addedDate: string;
}

export interface IGenrateRearageQstProps {
  id: number;
  qId: number;
  subjectId: number;
  subjectName: string;
  subjectShortUrl: string;
  chapterId: number;
  chapterName: string;
  chapterShortUrl: string;
  topicId: number;
  topicName: string;
  topicShortUrl: string;
  question: string;
  qst_img: string | null;
  difficulty: number;
  correctOpt: string;
  answerDescImg: string;
  questionType: number;
  answerDesc: string;
  addedDate: string;
  options: {
    option: string;
    optImg: string | null;
  }[];
}

export interface IViewGeneratedQstProps {
  sId: number;
  subjectName: string;
  shortUrl: string;
  questions: IGenrateRearageQstProps[];
}

export interface IViewGenQstsProps {
  subjectName: string;
  uuid: string;
  userId: number;
  qId: number;
}

export interface ICognitiveLevelProps {
  id: number;
  title: string;
}

export default  interface ITokenProps {
  id:number,
  totalTokens:number,
  remainingTokens:number
}

export interface QuestionQualityProps  {
  id: number;
  credit: string;
  label: string;
  value: string;
};

export interface QuestionDifficultyProps  {
  id: number;
  difficulty_level: string;
};


export interface IPracticeExamTypes {
  id: number;
  examId?: number;
  typeName: string;
  totalQsts: number;
  totalTime: number;
  totalMark: number;
  status: number;
  maxSubjects: number;
  deleteStatus: number;
  examSections: IExamSections[];
  exams?: IExamDetailsProps;
}

export interface IExamSections {
  id: number;
  examId: number;
  practice_exam_id: number;
  subjectId: number;
  sectionName: string;
  totalQuestions: number;
  maxAttendedQuestions: number;
  status: number;
  deleteStatus: number;
  subjects: ISubjectProps;
}

export interface ISubjectwiseExamSections {
  id: number;
  examId: number;
  practice_exam_id: number;
  subjectId: number;
  sectionName: string;
  totalQuestions: number;
  maxAttendedQuestions: number;
  status: number;
  deleteStatus: number;
  sections: IExamSections[];
}

export interface Chapter {
  chapterName: string;
  chapterShortUrl: string;
}

export interface Class {
  classId: number;
  classShortUrl: string;
  className: string;
}

export interface Subject {
  subjectName: string;
  subjectShotUrl: string;
}

export interface ChatDataProps {
  threadId: string;
  date: string;
  title: string;
  chapter: Chapter;
  class: Class;
  subjects: Subject;
  chatLink: string;
}
[];
