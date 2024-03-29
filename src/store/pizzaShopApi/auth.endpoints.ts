import {
  AuthData,
  ChangePassword,
  Credentials,
  UpdateUserCredentials,
  UpdateUserInfo,
  UserInfo,
} from "./auth.endpoints.types";
import { pizzaShopApi } from "./pizzaShop.api";

export const authEndpoints = pizzaShopApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthData, Credentials>({
      query: (credentials) => ({
        url: "/auth/signIn",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    refreshTokens: builder.mutation<AuthData, void>({
      query: () => ({
        url: "/auth/refreshTokens",
        method: "POST",
      }),
    }),

    signOut: builder.mutation<void, void>({
      query: () => "/auth/signOut",
    }),

    getUserInfo: builder.mutation<UserInfo, void>({
      query: () => ({
        url: "/auth/userinfo",
        method: "GET",
      }),
    }),
    changePassword: builder.mutation<void, ChangePassword>({
      query: (changePassword) => ({
        url: "/auth/changePassword",
        method: "PATCH",
        body: changePassword,
      }),
    }),
    updateUserCredentials: builder.mutation<void, UpdateUserCredentials>({
      query: (updateUserCredentials) => ({
        url: "/auth/updateUserCredentials",
        method: "PATCH",
        body: updateUserCredentials,
      }),
    }),
    updateUserInfo: builder.mutation<void, UpdateUserInfo>({
      query: (updateUserInfo) => ({
        url: "/auth/updateUserInfo",
        method: "PATCH",
        body: updateUserInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokensMutation,
  useSignOutMutation,
  useGetUserInfoMutation,
  useChangePasswordMutation,
  useUpdateUserCredentialsMutation,
  useUpdateUserInfoMutation,
} = authEndpoints;
