import axiosService from "@/utils/axios"

export const createStudyPlan = async() => {
    try {
        const res = await axiosService.get(``);
        return res.data;
    } catch (error : any) {
        return error.response.data
    }
}