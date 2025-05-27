



export interface IAIStudyPlanBody {
  subjects: any;
  total_days: number;
  hours: number;
  level: {
    Physics: string;
    Chemistry: string;
    Botany: string;
    Zoology: string;
  };
}
interface ITopic {
  topic: string;
  topicUrl: string;
}

export interface IAIGenerateResponse {
  day: number;
  chapterName: string;
  topics: ITopic[];
}

export interface IStudyPlanBodyProps {
  spendingHrs: number;
  fromDate: string;
  toDate: string;
  chapters: any[];
  topics: any[];
  description?: string;
  subjectRating: any;
}

export interface ICreateStudyPlanProps {
  userId: number;
  day: number;
  date: string;
  chapters: string;
  topics: string;
  instructionId: number;
  uuid: string;
}
