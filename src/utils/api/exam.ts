import { Api_endpoint } from "@/types/enums";
import axiosService from "../axios";
import {
  ICumulativeExmQstInfo,
  IExamDetailsProps,
  IExamResult,
  IExamResultAnalysis,
  IExamStatusProps,
  IExamUpdatesProps,
  IMcqQuestionProps,
  IQuestionWiseDataProps,
  IResumedExamProps,
} from "@/types/exam";

export const createExam = async (
  examId: number
): Promise<{
  success: boolean;
  resumeStatus?: boolean;
  data: {
    questions: IMcqQuestionProps[];
    exam: IExamDetailsProps;
    examResult: IResumedExamProps;
  };
  message?: string;
}> => {
  try {
    const res = await axiosService.post(`/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.create_exam}`);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateAnswer = async (examId: number, answer: IExamUpdatesProps, uuid: string | null) => {
  try {
    const res = await axiosService.put(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.create_exam}${uuid ? `?uuid=${uuid}` : ""}`,
      answer
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateExamStatus = async (examId: number, status: IExamStatusProps, uuid: string | null) => {
  try {
    const res = await axiosService.patch(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.create_exam}${uuid ? `?uuid=${uuid}` : ""}`,
      status
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const submitExam = async (examId: number) => {
  try {
    const res = await axiosService.patch(`/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.submit_exam}`);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const resumeExam = async (examId: number, uuid: string | null) => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.resume_exam}${uuid ? `?uuid=${uuid}` : ""}`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const examDetails = async (examId: number) => {
  try {
    // api/exams/[]/create-exam
    const res = await axiosService.get(`/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.create_exam}`);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const generateResult = async (
  examId: number,
  uuid: string | null
): Promise<{ success: boolean; message?: string; data?: IExamResult }> => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.generate_exam_result}${uuid ? `?uuid=${uuid}` : ""}`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getQuestionWiseData = async (
  examId: number,
  uuid: string | null
): Promise<{ success: boolean; message?: string; data?: IQuestionWiseDataProps[] }> => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.get_exam_qst_data}${uuid ? `?uuid=${uuid}` : ""}`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getExamData = async (examId: number): Promise<{ data: IExamDetailsProps; success: boolean }> => {
  // api\exams\[examId]\get-exam\route.ts

  try {
    const res = await axiosService.get(`/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.create_exam}`);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getUserExamResult = async (examType: string): Promise<{ data: IResumedExamProps; success: boolean }> => {
  try {
    const res = await axiosService.get(`/${Api_endpoint.exam_api}/${examType}/${Api_endpoint.get_exam_result}`);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createCumulativeExam = async (
  examId: number,
  planId: number,
  data: ICumulativeExmQstInfo
): Promise<{
  success: boolean;
  resumeStatus?: boolean;
  data: {
    questions: IMcqQuestionProps[];
    exam: IExamDetailsProps;
    examResult: IResumedExamProps;
  };
  message?: string;
}> => {
  try {
    const res = await axiosService.post(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${planId}/${Api_endpoint.create_exam}`,
      data
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const resumeCumulativeExam = async (examId: number, planId: number) => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${planId}/${Api_endpoint.create_exam}`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getExamDataByShortUrl = async (shortUrl: string) => {
  try {
    const res = await axiosService.get(`/${Api_endpoint.exam_api}/${shortUrl}/${Api_endpoint.get_exam}`);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateCumulativeExamStatus = async (examId: number, studyPlanId: number, status: IExamStatusProps) => {
  try {
    const res = await axiosService.patch(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${studyPlanId}/${Api_endpoint.create_exam}`,
      status
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateCumulativeAnswer = async (examId: number, studyPlanId: number, answer: IExamUpdatesProps) => {
  try {
    const res = await axiosService.put(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${studyPlanId}/${Api_endpoint.create_exam}`,
      answer
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const submitCumulativeExam = async (examId: number, studyPlanId: number) => {
  try {
    const res = await axiosService.patch(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${studyPlanId}/${Api_endpoint.submit_exam}`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

// * ------- creating the cumulative exam ----------
export const generateCumulativeResult = async (
  examId: number,
  studyPlanId: number
): Promise<{ success: boolean; message?: string; data?: IExamResult }> => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${studyPlanId}/${Api_endpoint.generate_exam_result}`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getCumulativeQuestionWiseData = async (
  examId: number,
  studyPlanId: number
): Promise<{ success: boolean; message?: string; data?: IQuestionWiseDataProps[] }> => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${studyPlanId}/${Api_endpoint.get_exam_qst_data}`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getCumulativeExamStatus = async (examId: number, studyPlanId: number) => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${studyPlanId}/${Api_endpoint.get_exam_status}`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const generateExamAnalysis = async (
  examId: number,
  uuid: string
): Promise<{ success: boolean; data: IExamResultAnalysis; message?: string }> => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.generate_analysis}${uuid ? `?uuid=${uuid}` : ""}`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const generateCumulativeAnalysis = async (
  examId: number,
  planId: number
): Promise<{ success: boolean; data: IExamResultAnalysis; message?: string }> => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${planId}/${Api_endpoint.generate_analysis}`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createPracticeExams = async (examId: number, uuid: string | null) => {
  try {
    const res = await axiosService.post(`/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.practice_now}`, { uuid });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getExamResult = async (
  examId: number,
  uuid?: string | null,
  userId?: string | null
): Promise<{ success: boolean; data: any }> => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.user_result_analysis}?uuid=${uuid || ""}&userId=${
        userId || ""
      }`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const generateCumulativeExamResult = async (
  examId: number,
  studyPlanId: number,
  userId?: string | null
): Promise<{ success: boolean; data: any }> => {
  try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${studyPlanId}/${
        Api_endpoint.user_result_analysis
      }?userId=${userId || ""}`
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

// *  -------- when leaving the exam -----------
export const leaveCumulativeExam = async (examId: number, userId: number, studyPlanId: number) => {
  try {
    const res = await axiosService.patch(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${studyPlanId}/${Api_endpoint.leave_exam}`,
      { userId }
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
// `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${studyPlanId}/${Api_endpoint.generate_exam_result}`

// api/exams/[]/leave-exam
// export const submitCumulativeExam = async (examId: number, studyPlanId: number) => {
//   try {
//     const res = await axiosService.patch(
//       `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.cumulative_exam}/${studyPlanId}/${Api_endpoint.submit_exam}`
//     );
//     return res.data;
//   } catch (error: any) {
//     return error.response.data;
//   }
// };

// * ---------------- quiz exam creation -----------
// api/exams/[]/quiz-exam/[]/create-exam
export const generateQuizExam = async (examId: number, chapterId: number) => {
    try {
    const res = await axiosService.get(
      `/${Api_endpoint.exam_api}/${examId}/${Api_endpoint.quiz_exam}/${chapterId}/${Api_endpoint.create_exam}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "An error occurred while generating the quiz exam");
  }
};


export const submitQuizExams = async (data : any) => {
  try {
    const res = await axiosService.post("/api/exams/submit-quiz-exam", data);
    return res.data
  } catch (error : any) {
    return error.response.data;
  }
};
