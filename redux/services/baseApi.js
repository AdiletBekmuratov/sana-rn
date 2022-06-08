import { API_URL } from "../http";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logout, tokenUpdate } from "../slices/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const {
      auth: {
        user: { access },
      },
    } = getState();
    if (access) {
      headers.set("Authorization", `Bearer ${access}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 500)
  ) {
    const jsonValue = await AsyncStorage.getItem("user");
    const user = jsonValue != null ? JSON.parse(jsonValue) : null;
    const refreshResult = await baseQuery(
      {
        url: "/user/refresh/",
        method: "POST",
        body: {
          refresh: user.refresh,
        },
      },
      api,
      extraOptions
    );

    console.log({ refreshResult });

    if (refreshResult.data) {
      await api.dispatch(tokenUpdate(refreshResult.data.access));

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["UserInfo", "QuestionQuantity", "FriendsRating"],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
