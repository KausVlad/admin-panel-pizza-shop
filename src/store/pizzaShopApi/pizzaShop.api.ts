import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const pizzaShopApi = createApi({
  reducerPath: "pizzaShopApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Test"],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_) => ({}),
});
