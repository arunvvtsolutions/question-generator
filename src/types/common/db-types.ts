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

export interface IAiModelCommonProps {
    id : number;
    name : string;
}



export interface IGeneratedTestCommonProps {
    id: number;
    aiModelId: number;
    userId: number;
    streamId: number;
    testTitle: string;
    description: string;
    questionTypeId: number;
    noOfQuestions: number;
    duration: number;
    level: number;
    createdAt: string;
    updatedAt: string;
};

export interface IGeneratedTestQuestionCommonProps {
    id: number;
    questionId: number;
    chapterId: number;
    subjectId: number;
    topicId: number;
    testId: number;
};

export interface IAiQuestionCommonProps {
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