import { AI_BASE_URL } from '@/config';
import prisma from '@/lib/prisma';
import { REDUCING_TOKEN_COUNT } from '@/service/enums/texts';
import { Api_endpoint } from '@/types/enums';


import {
  IAiQuestion,
} from '@/types/generate-questions';
import { customFetch } from '@/utils';


export interface IAiResponseProps {
  success: boolean;
  result: string;
  history: string;
  detail: string;
  title: string;
}
export interface ImproveQuestionProps {
   question_id : number,
   user_query:string
}

export interface IGenerateAiQuestionsPayload {
  user_id:number
  uuid:string
  subject_name: string[];
  chapter_name: string[];
  topic_name: string[];
  difficulty: string;
  number_of_questions: number;
  cognitive_level: string;
}


export const getSubjectsByIds = async (subjectIds: number[]) => {
  return prisma.subjects.findMany({ where: { id: { in: subjectIds } } });
};

export const getChaptersByIds = async (chapterIds: number[]) => {
  return prisma.chapters.findMany({
    where: { id: { in: chapterIds } },
    // include: { Classes: true },
  });
};

export const getTopicByids = async (topicIds: number[]) => {
  return prisma.topics.findMany({ where: { id: { in: topicIds } } });
};





export const getAllAiQuestions = async (userId: number) => {
  try {
    const questions = await prisma.aiQuestions.findMany({
      where: {
        user_id: userId,
      },
      include: {
        subjects: {
          select: { subjectName: true },
        },
        chapters: {
          select: { chapterName: true },
        },
        topics: {
          select: { topicName: true },
        },
      },
      orderBy: {
        uuid: "desc",
      },
    });
    // ✅ Define correct shape of accumulator
    const groupedByUuid: Record<string, IAiQuestion[]> = questions.reduce((acc, question) => {
      if (!acc[question.uuid]) {
        acc[question.uuid] = [];
      }
      acc[question.uuid].push(question);
      return acc;
    }, {} as Record<string, IAiQuestion[]>);

    // ✅ Convert to array of groups
    const groupedArray = Object.entries(groupedByUuid).map(([uuid, questions]) => ({
      groupedUuid: uuid,
      questions,
    }));

    return groupedArray;

  } catch (error) {
    console.error("Error fetching AI questions:", error);
    console.log(error);
    
    throw new Error("Could not fetch questions.");
  }
};


export const getGeneratedQuestions = async (userId: number, uuid: string) => {
  try {
    const questions = await prisma.aiQuestions.findMany({
      where: {
        user_id: userId,
        uuid: uuid
      },
      select: {
        id: true,
        user_id: true,
        uuid: true,
        question: true,
        correctOpt: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        answerDesc: true,
        difficulty: true,
        topicId: true,
        subjectId: true,
        chapterId: true,
        estimated_time: true,
        cognitive_level: true,
       keywords:true,
        topics: {
          select: {
            id: true,
            topicName: true
          }
        },
        subjects: {
          select: {
            id: true,
            subjectName: true
          }
        },
        chapters: {
          select: {
            id: true,
            chapterName: true
          }
        },
        cognitiveLevel: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    return questions;
  } catch (error) {
    console.error("Error fetching AI questions:", error);
    throw new Error("Could not fetch questions.");
  }
};

export const deductTokens = async (
  userId: number,
  tokensToDeduct: number
): Promise<{ success: boolean; message: string }> => {
  try {
    const userTokens = await prisma.tokens.findFirst({
      where: {
        userId,
      },
    });

    if (!userTokens) {
      return {
        success: false,
        message: "Token record not found for the user.",
      };
    }

    if (userTokens.remainingTokens < tokensToDeduct) {
      return {
        success: false,
        message: "Insufficient tokens.",
      };
    }

    await prisma.tokens.update({
      where: {
        id: userTokens.id,
      },
      data: {
        remainingTokens: {
          decrement: tokensToDeduct,
        },
        updatedDate: new Date(),
      },
    });

    return {
      success: true,
      message: "Tokens deducted successfully.",
    };
  } catch (error) {
    console.error("Error deducting tokens:", error);
    return {
      success: false,
      message: "An error occurred while deducting tokens.",
    };
  }
};



export const generateAiQuestions = async (
  payload: IGenerateAiQuestionsPayload
): Promise<any> => {
  console.log(payload);
  
  try {
    const result = await customFetch(
      `${AI_BASE_URL}/${Api_endpoint.generate_ai_question}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (Array.isArray(result) && result[0] === true) {
      const tokensToDeduct = payload.number_of_questions;

      const tokenResult = await deductTokens(payload.user_id, tokensToDeduct);

      if (!tokenResult.success) {
        return {
          success: false,
          message: tokenResult.message,
        };
      }

      const questions = await getGeneratedQuestions(payload.user_id, payload.uuid);

      return {
        success: true,
        message: "AI questions generated and tokens deducted successfully.",
        questions,
        uuid: payload.uuid,
      };
    }

    return {
      success: false,
      message: "AI generation failed.",
      response: result,
    };
  } catch (error) {
    console.error("Error generating AI questions:", error);
    console.log(error);
    
    return {
      success: false,
      message: "Something went wrong while generating questions.",
    };
  }
};

export const improveAiQuestionsQuery = async (
  body: ImproveQuestionProps,
  userId: number
): Promise<{ success: boolean; message: string }> => {
  
  try {
    const response = await customFetch(
      `${AI_BASE_URL}/${Api_endpoint.improve_ai_question}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    
    // Check if response is expected and successful
    if (!Array.isArray(response) || response[0] !== true) {
      return {
        success: false,
        message: "Unexpected response from AI service.",
      };
    }

    // Deduct token only on successful response
    const tokenResult = await deductTokens(userId, REDUCING_TOKEN_COUNT.IMPROVE_QUESTION_TOKEN_DEDUCT_COUNT);

    if (!tokenResult.success) {
      return {
        success: false,
        message: `AI question improved but token deduction failed: ${tokenResult.message}`,
      };
    }
    return {
      success: true,
      message: "AI question improved and token deducted successfully.",
    };
  } catch (error: any) {
    console.error("Error improving AI question:", error);
    return {
      success: false,
      message: "Failed to improve AI question. Please try again later.",
    };
  }
};

export const getTokenDetails = async (userId: number) => {
  const data = await prisma.tokens.findFirst({
    where: {
      userId: userId, 
    },
    select: {
      id: true,
      totalTokens: true,
      remainingTokens: true,
    },
  });

  return data;
};