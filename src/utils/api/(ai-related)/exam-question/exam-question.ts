import { BASE_URL } from "@/config";
import { Api_endpoint } from "@/types/enums";
import axiosService from "@/utils/axios";
import axios from "axios"

export const createExamTestQuestions = async (data : any) => {
  try {
    const res = await axiosService.post(`/api/generated-test`,data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getAllExamTests = async () : Promise<{ success: boolean, data: any[] }> => {
  try {
    const res = await axiosService.get(
      `${BASE_URL}/${Api_endpoint.generated_test}`
    );
    return { success: true, data: res.data.data || [] };
  } catch (error) {
    return { success: false, data: [] };
  }
};