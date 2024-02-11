import { pizzaShopApi } from "./pizzaShop.api";
import {
  PizzaData,
  PizzaDataMutation,
  PizzaDataMutationPartial,
} from "./pizza.endpoints.types";

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
    updatePizza: builder.mutation<
      PizzaData,
      { pizzaName: string; pizza: PizzaDataMutationPartial }
    >({
      query: ({ pizzaName, pizza }) => ({
        url: `/pizza/${pizzaName}`,
        method: "PATCH",
        body: pizza,
      }),
    }),
  }),
});

export const {
  useGetPizzasQuery,
  useGetPizzaByNameQuery,
  useAddPizzaMutation,
  useUpdatePizzaMutation,
} = pizzaEndpoints;
