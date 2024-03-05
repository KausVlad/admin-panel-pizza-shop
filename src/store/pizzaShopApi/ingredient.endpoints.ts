import { pizzaShopApi } from "./pizzaShop.api";
import {} from "./pizza.endpoints.types";
import { IngredientData } from "./ingredient.endpoints.types";

export const ingredientEndpoints = pizzaShopApi.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<IngredientData[], null>({
      query: () => ({
        url: "/ingredient/all",
      }),
      providesTags: ["Ingredients"],
    }),
    deleteIngredient: builder.mutation<string, string>({
      query: (ingredientName) => ({
        url: `/ingredient/${ingredientName}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ingredients"],
    }),
    updateIngredient: builder.mutation<
      IngredientData,
      { ingredientId: number; newIngredientName: string }
    >({
      query: ({ ingredientId, newIngredientName }) => ({
        url: `/ingredient/${ingredientId}`,
        method: "PATCH",
        body: { newIngredientName },
      }),
      invalidatesTags: ["Ingredients"],
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useDeleteIngredientMutation,
  useUpdateIngredientMutation,
} = ingredientEndpoints;
