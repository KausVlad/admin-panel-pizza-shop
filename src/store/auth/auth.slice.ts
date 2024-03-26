import { createSlice } from "@reduxjs/toolkit";
import { AuthState, PartialUserInfo } from "./auth.slice.types";
import { UserInfo } from "../pizzaShopApi/auth.endpoints.types";

const initialState: AuthState = {
  userInfo: {} as PartialUserInfo,
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

    setUserInfo: (state, action: { payload: { userInfo: UserInfo } }) => {
      state.userInfo = {
        ...action.payload.userInfo,
      };
    },

    setAuth: (state, action: { payload: { isAuth: boolean } }) => {
      state.isAuth = action.payload.isAuth;
    },

    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      state.userInfo = {} as PartialUserInfo;
    },
  },
});

export const {
  actions: { setUserAccessToken, logout, setUserInfo, setAuth },
  reducer: authReducer,
} = authSlice;
