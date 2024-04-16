import { OtherProductsData } from "./otherProducts.endpoints.types";
import { pizzaShopApi } from "./pizzaShop.api";

export const otherProductsEndpoints = pizzaShopApi.injectEndpoints({
  endpoints: (builder) => ({
    getOtherProducts: builder.query<OtherProductsData[], null>({
      query: () => ({
        url: "/product/all",
      }),
      providesTags: ["OtherProducts"],
    }),
    deleteOtherProduct: builder.mutation<void, number>({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OtherProducts"],
    }),
  }),
});

export const { useGetOtherProductsQuery, useDeleteOtherProductMutation } =
  otherProductsEndpoints;
