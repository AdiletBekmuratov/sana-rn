import { baseApi } from "./baseApi";

export const authorizedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/user/me/",
      }),
      providesTags: ["UserInfo"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMeQuery } = authorizedApi;
