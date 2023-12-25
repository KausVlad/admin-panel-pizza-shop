import { pizzaShopApi } from "./pizzaShop.api";
import { PizzaData } from "./pizza.endpoints.types";

export const pizzaEndpoints = pizzaShopApi.injectEndpoints({
  endpoints: (builder) => ({
    getPizzas: builder.query<PizzaData[], null>({
      query: () => ({
        url: "/pizza/all",
        // params: {
        //   ingredientName,
        // },
      }),
    }),
    getPizzaByName: builder.query<PizzaData, string>({
      query: (pizzaName) => ({
        url: `/pizza/${pizzaName}`,
      }),
    }),
  }),
});

export const { useGetPizzasQuery, useGetPizzaByNameQuery } = pizzaEndpoints;
