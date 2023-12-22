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
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaShopApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
