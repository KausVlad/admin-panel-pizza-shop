import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pizzaShopApi } from "./pizzaShopApi/pizzaShop.api";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [pizzaShopApi.reducerPath]: pizzaShopApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaShopApi.middleware),
});

setupListeners(store.dispatch);
