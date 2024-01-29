import { createSlice } from "@reduxjs/toolkit";
import { authState, userInfo } from "./auth.slice.types";

const initialState: authState = {
  userInfo: {
    email: null,
    role: null,
    userName: null,
  },
  token: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAccessToken: (state, action) => {
      state.token = action.payload.accessToken;
    },
    setUserInfo: (state, action: { payload: { userInfo: userInfo } }) => {
      state.userInfo = {
        email: action.payload.userInfo.email,
        role: action.payload.userInfo.role,
        userName: action.payload.userInfo.userName,
      };
    },
    setAuth: (state, action: { payload: { isAuth: boolean } }) => {
      state.isAuth = action.payload.isAuth;
    },
    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      state.userInfo = {
        email: null,
        role: null,
        userName: null,
      };
    },
  },
});

export const {
  actions: { setUserAccessToken, logout, setUserInfo, setAuth },
  reducer: authReducer,
} = authSlice;
