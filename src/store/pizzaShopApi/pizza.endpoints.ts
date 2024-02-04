import { pizzaShopApi } from "./pizzaShop.api";
import { PizzaData, PizzaDataMutation } from "./pizza.endpoints.types";

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
    addPizza: builder.mutation<PizzaData, PizzaDataMutation>({
      query: (pizza) => ({
        url: "/pizza/add",
        method: "POST",
        body: pizza,
      }),
    }),
  }),
});

export const { useGetPizzasQuery, useGetPizzaByNameQuery } = pizzaEndpoints;
