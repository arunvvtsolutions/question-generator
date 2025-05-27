// types
import { DefaultRootStateProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

// project imports

// initial state
const initialState: DefaultRootStateProps["syllabus"] = {
  error: null,
  syllabus: [],
  exams: null,
};

// ==============================|| SLICE - SYLLABUS ||============================== //

const syllabus = createSlice({
  name: "syllabus",
  initialState,
  reducers: {
    // has error
    hasError(state, action) {
      state.error = action.payload;
    },
    getSidebarDataSuccess(state, action) {
      const { syllabus, mcqExam, benchMarkExam } = action.payload;
      state.syllabus = syllabus;
      state.exams = { benchMarkExam, mcqExam };
    },
  },
});

export default syllabus.reducer;

export const { hasError, getSidebarDataSuccess } = syllabus.actions;
