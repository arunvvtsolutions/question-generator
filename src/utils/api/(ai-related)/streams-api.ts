import { BASE_URL } from "@/config";
import { Api_endpoint } from "@/types/enums";
import axiosService from "@/utils/axios";

export const getAllStreams = async (): Promise<{
  success: boolean;
  data?: any;
}> => {
  try {
    const res = await axiosService.get(`${BASE_URL}/${Api_endpoint.get_all_streams}`);   
    return res.data;
  } catch (error: any) {
    return { success: false };
  }
};