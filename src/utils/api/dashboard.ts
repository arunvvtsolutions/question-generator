import { Api_endpoint } from "@/types/enums";
import axiosService from "../axios";
import { Transaction } from "@/components/dashboard/payment-history/TransactionTable";
import { IAuthHomeProps } from "@/components/auth-home";

export const getTransactionHistory = async (userId: number): Promise<{ success: boolean; data: Transaction[] }> => {
  try {
    const res = await axiosService.get(`/${Api_endpoint.user_dashboard}/${userId}/${Api_endpoint.user_payment_history}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getDashboard = async (): Promise<{ success: boolean; message?: string; data?: IAuthHomeProps }> => {
  try {
    const res = await axiosService.get(`/${Api_endpoint.dashboard_home}`);
    return res.data;
  } catch (error: any) {
    return { success: false, message: error?.response?.data?.error || "Something went wrong" };
  }
};
