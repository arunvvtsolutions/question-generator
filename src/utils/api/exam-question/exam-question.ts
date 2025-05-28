import { Api_endpoint } from "@/types/enums";
import axiosService from "@/utils/axios";
import axios from "axios"

export const createExamTestQuestions = async (data : any) => {
  try {
    console.log("data",data);
    
    const res = await axiosService.post(`/api/generated-test`,data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};