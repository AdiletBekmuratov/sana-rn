import { baseApi } from "./baseApi";

export const authorizedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionQuantity: builder.query({
      query: () => ({
        url: "/user/question-quantity/",
      }),
      providesTags: ["QuestionQuantity"],
    }),
    updateQuestionQuantity: builder.mutation({
      query: (body) => ({
        url: "/user/question-quantity/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["QuestionQuantity"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me/",
      }),
      providesTags: ["UserInfo"],
    }),
    updateMe: builder.mutation({
      query: (body) => ({
        url: "/user/update/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["UserInfo"],
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
      query: ({ topicId, page }) => ({
        url: `/question/theory/?test_type=1&topic=${topicId}&page=${page}&page_size=25`,
      }),
    }),
    getTheoryAnswerByQuestionId: builder.query({
      query: (questionId) => ({
        url: `/answer/theory/?question=${questionId}`,
      }),
    }),
    getPracticeLessons: builder.query({
      query: () => ({
        url: "/lessons/practice/",
      }),
    }),
    getPracticeTopicsByLessonId: builder.query({
      query: (lessonId) => ({
        url: `/topic/theory/?lesson=${lessonId}&test_types=1`,
      }),
    }),
    getPracticeQuestionsByTopicId: builder.query({
      query: (topicId) => ({
        url: `/question/practice/?topic=${topicId}`,
      }),
    }),
    getRandomLessons: builder.query({
      query: () => ({
        url: "/lessons/random/",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useUpdateMeMutation,

  useGetQuestionQuantityQuery,
  useUpdateQuestionQuantityMutation,

  useGetTheoryLessonsQuery,
  useGetTopicsByLessonIdQuery,
  useLazyGetTheoryQuestionsByTopicIdQuery,
  useLazyGetTheoryAnswerByQuestionIdQuery,

  useGetPracticeLessonsQuery,
  useGetPracticeTopicsByLessonIdQuery,
  useGetPracticeQuestionsByTopicIdQuery,
	useLazyGetPracticeQuestionsByTopicIdQuery,

  useGetRandomLessonsQuery,
} = authorizedApi;
