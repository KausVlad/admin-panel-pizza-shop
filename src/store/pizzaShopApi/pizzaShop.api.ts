import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const pizzaShopApi = createApi({
  reducerPath: "pizzaShopApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Test"],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_) => ({}),
});
