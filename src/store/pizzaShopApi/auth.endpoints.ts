import { Credentials, LoginData } from "./auth.endpoints.types";
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
  }),
});

export const { useLoginMutation } = authEndpoints;
