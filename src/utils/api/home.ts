
import { BASE_URL } from '@/config';
import { IChapterDetailsProps, ISubjectDetailsProps, ISubjectProps, ITopicDatas } from '@/types';
import { Api_endpoint } from '@/types/enums';
import axios from 'axios';
import axiosService from '../axios';

export const getBookDetails = async (): Promise<
  { success: boolean; data?: ISubjectDetailsProps; message: string } | undefined
> => {
  try {
    const res = await axios.get(`${BASE_URL}/${Api_endpoint.get_books_details}`);
    const jsonBody = await res.data;
    return jsonBody;
  } catch (error: any) {
    return { success: false, message: error?.response?.data };
  }
};

export const getAllChapters = async (): Promise<{
  success: boolean;
  data?: any[];
  message: string;
}> => {
  try {
    const res = await axios.get(`${BASE_URL}/${Api_endpoint.get_all_chapters}`);
    return res.data;
  } catch (error: any) {
    return { success: false, message: error?.response?.data };
  }
};

export const getAllTopics = async (): Promise<{
  success: boolean;
  data?: any[];
  message: string;
}> => {
  try {
    const res = await axios.get(`${BASE_URL}/${Api_endpoint.get_all_topics}`);
    return res.data;
  } catch (error: any) {
    return { success: false, message: error?.response?.data };
  }
};

export const getAllSubjects = async (): Promise<{
  success: boolean;
  data?: any[];
  message: string;
}> => {
  try {
    const res = await axios.get(`${BASE_URL}/${Api_endpoint.get_all_subjects}`);
    return res.data;
  } catch (error: any) {
    return { success: false, message: error?.response?.data };
  }
};

export const userDashboard = async (): Promise<{ success: boolean; data?: any; message?: string }> => {
  try {
    const res = await axiosService.get(`/${Api_endpoint.user_dashboard_home}` );
    return res.data;
  } catch (error: any) {
    return { success: false, message: error?.response?.data };
  }
};


//  ------------ get study plan and todays task schedule  ----------
export const getTodaySchedule = async (): Promise<{ success: boolean; data?: any; message?: string }> => {
  try {
    const res = await axiosService.get(`/${Api_endpoint.dashboard_home_todays_schedule}` );
    return res.data;
  } catch (error: any) {
    return { success: false, message: error?.response?.data };
  }
};