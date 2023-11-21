import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pizzaApi } from "./pizzaApi/pizza.api";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [pizzaApi.reducerPath]: pizzaApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaApi.middleware),
});

setupListeners(store.dispatch);
