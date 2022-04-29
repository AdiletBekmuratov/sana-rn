import { baseApi } from "./baseApi";

export const authorizedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/user/me/",
      }),
      providesTags: ["UserInfo"],
    }),
    getTheoryLessons: builder.query({
      query: () => ({
        url: "/lessons/theory/",
      }),
    }),
    getTopicsByLessonId: builder.query({
      query: (lessonId) => ({
        url: `/topic/theory/?lesson=${lessonId}&test_types=1`,
      }),
    }),
    getTheoryQuestionsByTopicId: builder.query({
      query: (topicId, page) => ({
        url: `/question/theory/?test_type=1&lesson=${topicId}&page=${page}&page_size=50`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useGetTheoryLessonsQuery,
  useGetTopicsByLessonIdQuery,
  useLazyGetTheoryQuestionsByTopicIdQuery,
} = authorizedApi;
