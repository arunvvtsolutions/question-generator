import { Api_endpoint } from "@/types/enums";
import axiosService from "../axios";
import { ClassDataProps } from "@/types/class";

export const getAllClasses = async (): Promise<{
    success: boolean;
    data?: ClassDataProps[];
  }> => {
    try {
      const res = await axiosService.get(`/${Api_endpoint.get_all_classes}`)     
      return res.data;
    } catch (error: any) {
      return { success: false };
    }
  };