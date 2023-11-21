import { pizzaApi } from "./pizza.api";
import { TPizzaData } from "./pizza.endpoints.types";

export const pizzaEndpoints = pizzaApi.injectEndpoints({
  endpoints: (builder) => ({
    getPizzas: builder.query<TPizzaData[], null>({
      query: () => ({
        url: "/pizza/all",
        // params: {
        //   ingredientName,
        // },
      }),
    }),
    getPizzaByName: builder.query<TPizzaData, string>({
      query: (pizzaName) => ({
        url: `/pizza/${pizzaName}`,
      }),
    }),
  }),
});

export const { useGetPizzasQuery, useGetPizzaByNameQuery } = pizzaEndpoints;
