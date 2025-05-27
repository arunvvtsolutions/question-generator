import { IExamDetailsProps } from "./exam";

export type INcertTopics = {
  id: number;
  topicName: string;
  shortUrl: string;
};

export interface INcertProps {
  id: 1;
  subjectId: number;
  chapterId: number;
  topicId: number;
  content: string;
  topics: INcertTopics;
  topicName?: string;
  added_date?: Date;
}
export interface INcertSidebarTopicProps {
  id: number;
  topicName: string;
  shortUrl: string;
}

export interface INcertSidebarClassProps {
  id: number;
  className: string;
  shortUrl: string;
}
export interface INcertSidebarChapterProps {
  id: number;
  chapterName: string;
  shortUrl: string;
  Classes: INcertSidebarClassProps;
  topics: INcertSidebarTopicProps[];
}

export interface INcertSidebarProps {
  id: number;
  subjectName: string;
  shortUrl: string;
  chapters: INcertSidebarChapterProps[];
}

interface IExamProps {
  mcqExam: IExamDetailsProps;
  benchMarkExam: IExamDetailsProps;
}

export interface SyllabusProps {
  error: null | string;
  syllabus: INcertSidebarProps[];
  exams: IExamProps | null;
}
