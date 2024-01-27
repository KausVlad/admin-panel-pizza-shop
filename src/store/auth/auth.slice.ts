import { createSlice } from "@reduxjs/toolkit";
import { CustomJwtPayload, authState } from "./auth.slice.types";
import { jwtDecode } from "jwt-decode";

const initialState: authState = {
  userInfo: {
    email: null,
    role: null,
    userName: null,
  },
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAccessToken: (state, action) => {
      const userInfo = jwtDecode<CustomJwtPayload>(action.payload.accessToken);
      state.userInfo = userInfo;
      state.token = action.payload.accessToken;
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = {
        email: null,
        role: null,
        userName: null,
      };
    },
  },
});

export const {
  actions: { setUserAccessToken, logout },
  reducer: authReducer,
} = authSlice;
