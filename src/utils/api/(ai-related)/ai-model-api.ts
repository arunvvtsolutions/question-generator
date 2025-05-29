import { BASE_URL } from "@/config";
import { IAiModelCommonProps, } from "@/types/common/db-types";
import { Api_endpoint } from "@/types/enums";
import axiosService from "@/utils/axios";

export const getAllAiModels = async () : Promise<{ success: boolean, data: IAiModelCommonProps[] }> => {
  try {
    const res = await axiosService.get(
      `${BASE_URL}/${Api_endpoint.get_ai_models}`
    );
    return { success: true, data: res.data.data || [] };
  } catch (error) {
    return { success: false, data: [] };
  }
};
