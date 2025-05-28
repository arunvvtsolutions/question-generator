import { Api_endpoint,  } from "@/types/enums";
import axiosService from "../axios";
import { IGenerateQuestBodyProps } from "@/components/q-bank/generate-question/GenerateQusForm";
import ITokenProps, { IAiQuestionsProps, ICognitiveLevelProps, IGroupedAiQuestion, IPracticeExamTypes, IViewGeneratedQstProps } from "@/types/generate-questions";
import { IViewGeneratedQsts } from "@/components/q-bank/generated-questions";
import axios from "axios";
import { BASE_URL } from "@/config";
import { ERROR } from "@/service/enums/texts";

  export const generateQuestions = async (data: IGenerateQuestBodyProps) => {
    try {
      const res = await axiosService.post(`/${Api_endpoint.generate_questions}`, data);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
export const generateImproveAiQuestion = async (questionId:number,feedback:string) => {
  try {
    const res = await axiosService.post(`/${Api_endpoint.improve_questions}`,
      {
        questionId,
        feedback
      }
    );   
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getAllQuestions = async (): Promise<{
  success: boolean;
  data?: IGroupedAiQuestion[];
}> => {
  try {
    const res = await axiosService.get(`${BASE_URL}/${Api_endpoint.get_all_ai_questions}`);   
    return res.data;
  } catch (error: any) {
    return { success: false };
  }
};
export const getSingleAiQuestion = async (userId:number,uuid:string): Promise<{
  success: boolean;
  data?: IAiQuestionsProps[];
}> => {
  try {
    const res = await axiosService.get(`${BASE_URL}/${Api_endpoint.get_single_ai_questions}?userId=${userId}&uuId=${uuid}`);   
    return res.data;
  } catch (error: any) {
    return { success: false };
  }
};
export const generatedQuestions = async (): Promise<{
  success: false;
  data: { questions: IViewGeneratedQstProps[]; createdDate: string; totalQsts: number };
}> => {
  try {
    const res = await axiosService.get(`/${Api_endpoint.generate_questions}`);
    return res.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: ERROR.SOMETHING_WENT_WRONG };
  }
};

export const viewGeneratedQuestionsWithId = async (
  uuId?: string
): Promise<{
  success: boolean;
  data: { questions: IViewGeneratedQstProps[]; createdDate: string; totalQsts: number };
}> => {
  try {
    const res = await axiosService.get(`/${Api_endpoint.view_questions}/${uuId ? uuId : ""}`);
    return res.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: ERROR.SOMETHING_WENT_WRONG };
  }
};

export const viewGeneratedQuestions = async (): Promise<{ success: boolean; data: IViewGeneratedQsts[] }> => {
  try {
    const res = await axiosService.get(`/${Api_endpoint.view_questions}`);
    return res.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: ERROR.SOMETHING_WENT_WRONG };
  }
};



export const getCognitiveLevel = async (): Promise<{
  success: boolean;
  data: any[];
}> => {
  try {
     const res = await axios.get(`${BASE_URL}/${Api_endpoint.get_cognitive_level}`);
    return res.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: ERROR.SOMETHING_WENT_WRONG };
  }
};
export const getTokenDetails = async(userId:number):Promise<{
    success: boolean;
  data: ITokenProps;
}>=>{
try {
     const res = await axiosService.get(`${BASE_URL}/${Api_endpoint.get_token_details}?userId=${userId}`);
    return res.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: ERROR.SOMETHING_WENT_WRONG };
  }
}