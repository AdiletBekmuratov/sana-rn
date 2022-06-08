import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../http";

export const unauthApi = createApi({
  reducerPath: "unauthApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    changePasswordOTP: builder.mutation({
      query: (body) => ({
        url: `/user/change-password-otp/`,
        method: "POST",
        body,
      }),
    }),
    checkOTP: builder.mutation({
      query: (body) => ({ url: `/user/check-otp/`, method: "POST", body }),
    }),
    generateOTP: builder.mutation({
      query: (body) => ({ url: `/user/generate-otp/`, method: "POST", body }),
    }),
  }),
});

export const {
  useGenerateOTPMutation,
  useChangePasswordOTPMutation,
  useCheckOTPMutation,
} = unauthApi;
