export interface ISubjectCommonProps {
    id: number;
    subjectName: string;
    shortUrl: string;
    stream: number;
    employeeId: number;
    status: number;
    deleteStatus: number;
    addedDate: string;
    updatedDate: string;
};

export interface IChapterCommonProps {
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
    addedDate: string;
    updatedDate: string;
}


export interface ITopicCommonProps {
    id: number;
    subjectId: number;
    chapterId: number;
    topicName: string;
    shortUrl: string;
    employeeId: number;
    status: number;
    deleteStatus: number;
    addedDate: string;
    updatedDate: string;
};

export interface ICognitiveLevelCommonProps {
    id: number;
    title: string;
    status: number;
    deleteStatus: number;
    addedDate: string;
    updatedDate: string;
};


export interface IStreamCommonProps{
    id: number;
    streamName: string;
    shortUrl: string;
    employeeId: number;
    status: number;
    createdAt: string;
    updatedAt: string;
};

export interface IQuestionTypeCommonProps {
    id: number;
    questionType: string;
    shortUrl: string;
    status: number;
}

export interface IOptionTypeCommonProps {
    value : string;
    label : string;
};