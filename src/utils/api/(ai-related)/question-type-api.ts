import { BASE_URL } from "@/config";
import { IQuestionTypeCommonProps } from "@/types/common/db-types";
import { Api_endpoint } from "@/types/enums";
import axiosService from "@/utils/axios";

export const getAllQuestionTypes = async () : Promise<{ success: boolean, data: IQuestionTypeCommonProps[] }> => {
  try {
    const res = await axiosService.get(
      `${BASE_URL}/${Api_endpoint.get_question_types}`
    );
    return { success: true, data: res.data.data || [] };
  } catch (error) {
    return { success: false, data: [] };
  }
};
