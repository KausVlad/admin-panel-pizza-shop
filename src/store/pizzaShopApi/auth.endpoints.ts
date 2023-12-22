import { pizzaShopApi } from "./pizzaShop.api";

export const authEndpoints = pizzaShopApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query({
      query: (body) => ({
        url: "/auth/signIn",
        method: "POST",
        body,
      }),
    }),
  }),
});
