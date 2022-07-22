import authReducer from "./slices/auth";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./services/baseApi";
import { unauthApi } from "./services/unauthorized.service";

const rootReducer = combineReducers({
  auth: authReducer,
  [unauthApi.reducerPath]: unauthApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, unauthApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
