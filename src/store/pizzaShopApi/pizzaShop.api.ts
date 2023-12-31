import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUserAccessToken } from "../auth/auth.slice";
const baseUrl = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithResult = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown> //! change this in the future, for type safety
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    const refreshResult = await baseQuery(
      "/auth/refreshTokens",
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const accessToken = (api.getState() as RootState).auth.token;
      api.dispatch(setUserAccessToken({ accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const pizzaShopApi = createApi({
  reducerPath: "pizzaShopApi",
  baseQuery: baseQueryWithResult,
  tagTypes: ["Test"],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_) => ({}),
});
