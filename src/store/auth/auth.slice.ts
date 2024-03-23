import { createSlice } from "@reduxjs/toolkit";
import { AuthState, NullableUserInfo } from "./auth.slice.types";
import { UserInfo } from "../pizzaShopApi/auth.endpoints.types";

const initialState: AuthState = {
  userInfo: {
    id: null,
    email: null,
    userName: null,
    phone: null,
    address: null,
    birthDate: null,
    sex: null,
    role: null,
    createdAt: null,
    userPhoto: null,
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
      state.userInfo = {} as NullableUserInfo;
    },
  },
});

export const {
  actions: { setUserAccessToken, logout, setUserInfo, setAuth },
  reducer: authReducer,
} = authSlice;
