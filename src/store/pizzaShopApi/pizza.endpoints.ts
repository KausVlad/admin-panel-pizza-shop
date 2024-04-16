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
      providesTags: ["Pizzas"],
    }),
    getPizzaByName: builder.query<PizzaData, string>({
      query: (pizzaName) => ({
        url: `/pizza/${pizzaName}`,
      }),
      providesTags: ["Pizza"],
    }),
    addPizza: builder.mutation<PizzaData, PizzaDataMutation>({
      query: (pizza) => ({
        url: "/pizza/add",
        method: "POST",
        body: pizza,
      }),
      invalidatesTags: ["Pizzas"],
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
      invalidatesTags: ["Pizza", "Pizzas"],
    }),
    deletePizza: builder.mutation<PizzaData, number>({
      query: (pizzaId) => ({
        url: `/pizza/${pizzaId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pizzas"],
    }),
  }),
});

export const {
  useGetPizzasQuery,
  useGetPizzaByNameQuery,
  useAddPizzaMutation,
  useUpdatePizzaMutation,
  useDeletePizzaMutation,
} = pizzaEndpoints;
