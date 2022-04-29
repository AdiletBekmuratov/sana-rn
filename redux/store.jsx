import authReducer from "./slices/auth.js";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./services/baseApi.jsx";

const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true,
});

export default store;
