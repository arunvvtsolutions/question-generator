// types
import { LOCAL_STORAGE } from "@/service/enums/localStorage";
import { DefaultRootStateProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

// project imports

// initial state
const initialState: DefaultRootStateProps["userProfile"] = {
  error: null,
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  phone: null,
};

// ==============================|| SLICE - AUTHENTICATION ||============================== //

const authentication = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // has error
    hasError(state, action) {
      state.error = action.payload;
    },
    userLoginSuccess: (state, action) => {
      state.isInitialized = true;
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem(LOCAL_STORAGE.USER_DETAILS, JSON.stringify(action.payload));
    },
    userLogoutSuccess: (state) => {
      state.isInitialized = true;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem(LOCAL_STORAGE.USER_DETAILS);
      localStorage.removeItem(LOCAL_STORAGE.STUDY_PLAN_SELECTED_DATA)
    },
    userMobileNumber: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export default authentication.reducer;

export const { userLoginSuccess, userLogoutSuccess, hasError, userMobileNumber } =
  authentication.actions;
