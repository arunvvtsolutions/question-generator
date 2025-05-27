import { Api_endpoint } from "@/types/enums";

import axiosService from "@/utils/axios";


// * ---------------- quiz exam creation -----------
export const generateQuizExam = async (examId : number, chapterUrl? : string) => {
  try {
    //api/exams/[]/quiz-exam/[]/create-exam
    
    const res = await axiosService.get(`/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.quiz_exam}/${chapterUrl}/${Api_endpoint.create_exam}`);
    return res.data;
  } catch (error : any) {
    return error.response.data;
  }
}

