import { pizzaShopApi } from "./pizzaShop.api";
import {} from "./pizza.endpoints.types";
import { IngredientData } from "./ingredient.endpoints.types";

export const ingredientEndpoints = pizzaShopApi.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<IngredientData[], null>({
      query: () => ({
        url: "/ingredient/all",
      }),
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientEndpoints;
