// types
import { DefaultRootStateProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

// project imports

// initial state
const initialState: DefaultRootStateProps["ai"] = {
  error: null,
  aiInitialMessage: null,
  workLibrary: []
};

// ==============================|| SLICE - ai ||============================== //

const ai = createSlice({
  name: "ai",
  initialState,
  reducers: {
    // has error
    hasError(state, action) {
      state.error = action.payload;
    },
    getAiInitialInput(state, action) {
      state.aiInitialMessage = action.payload;
    },
    getWorkLibrary(state, action) {
      state.workLibrary = action.payload
    }
  },
});

export default ai.reducer;

export const { hasError, getAiInitialInput, getWorkLibrary } = ai.actions;
