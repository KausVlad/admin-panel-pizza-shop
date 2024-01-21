import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pizzaShopApi } from "./pizzaShopApi/pizzaShop.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer } from "./auth/auth.slice";

const rootReducer = combineReducers({
  [pizzaShopApi.reducerPath]: pizzaShopApi.reducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaShopApi.middleware),
  devTools: true, //! Remove in production
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
