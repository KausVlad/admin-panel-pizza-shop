import { Credentials, LoginData, UserInfo } from "./auth.endpoints.types";
import { pizzaShopApi } from "./pizzaShop.api";

export const authEndpoints = pizzaShopApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginData, Credentials>({
      query: (credentials) => ({
        url: "/auth/signIn",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    refreshTokens: builder.mutation<LoginData, void>({
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
  }),
});

export const {
  useLoginMutation,
  useRefreshTokensMutation,
  useSignOutMutation,
  useGetUserInfoMutation,
} = authEndpoints;
