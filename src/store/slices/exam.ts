// types
import { DefaultRootStateProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

// project imports

// initial state
const initialState: DefaultRootStateProps["exam"] = {
  error: null,
  questions: [],
  examData: null
};

// ==============================|| SLICE - exam ||============================== //

const exam = createSlice({
  name: "exam",
  initialState,
  reducers: {
    // has error
    hasError(state, action) {
      state.error = action.payload;
    },
    getExamQuestionSuccess(state, action) {
      state.questions = action.payload;
    },
    getExamDataSuccess(state, action) {
      state.examData = action.payload;
    },
  },
});

export default exam.reducer;

export const { hasError, getExamQuestionSuccess, getExamDataSuccess } = exam.actions;

