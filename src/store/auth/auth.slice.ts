import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "./auth.slice.types";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null as string | null,
    role: null as "ADMIN" | "MANAGER" | "USER" | null,
    token: null as string | null,
    userName: null as string | null,
  },
  reducers: {
    setUserAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      const { email, role, userName } =
        jwtDecode<CustomJwtPayload>(accessToken);
      state.token = accessToken;
      state.email = email;
      state.userName = userName;
      state.role = role;
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.role = null;
      state.userName = null;
    },
  },
});

export const {
  actions: { setUserAccessToken, logout },
  reducer: authReducer,
} = authSlice;
