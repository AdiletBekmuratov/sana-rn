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
    updateMyPassword: builder.mutation({
      query: (body) => ({
        url: "/user/change-password/",
        method: "PATCH",
        body,
      }),
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
    sendAnswer: builder.mutation({
      query: (body) => ({
        url: `/answer/pass_answer/`,
        method: "POST",
        body,
      }),
    }),
    finishTest: builder.query({
      query: (testId) => ({
        url: `/finish/${testId}/`,
      }),
    }),
    getRandomLessons: builder.query({
      query: () => ({
        url: "/lessons/random/",
      }),
    }),
    getRandomQuestionsByLessonId: builder.query({
      query: (lessonId) => ({
        url: `/question/random/?lesson=${lessonId}`,
      }),
    }),

    getMyRating: builder.query({
      query: () => ({
        url: `/user/my-rating/`,
      }),
    }),
    getAllRating: builder.query({
      query: ({ lessonId, page }) => ({
        url: `/user/all-rating/?lesson=${lessonId}&page=${page}&page_size=100`,
      }),
      providesTags: ["FriendsRating"],
    }),
    getFriendsRating: builder.query({
      query: () => ({
        url: `/user/my-friends-rating/`,
      }),
      providesTags: ["FriendsRating"],
    }),
    addFriendToRating: builder.mutation({
      query: (body) => ({
        url: "/user/add-friend/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FriendsRating"],
    }),
    removeFriendFromRating: builder.mutation({
      query: (id) => ({
        url: `/user/remove-friend/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["FriendsRating"],
    }),

    getAllLessons: builder.query({
      query: () => ({
        url: `/lessons/all/?test_type=1`,
      }),
    }),

    getQuantityMastered: builder.query({
      query: (lesson) => ({
        url: `/question/quantity-mastered/?lesson=${lesson}`,
      }),
    }),

    getMasteredOrWrongQuestions: builder.query({
      query: ({ lesson, url }) => ({
        url: `/question/${url}/?lesson=${lesson}`,
      }),
    }),

    getEntryDays: builder.query({
      query: () => ({
        url: `/user/day-of-entry/`,
      }),
    }),

    getProgress: builder.query({
      query: () => ({
        url: `/lessons/progress/?test_type=1`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useUpdateMyPasswordMutation,

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
  useLazyGetRandomQuestionsByLessonIdQuery,

  useSendAnswerMutation,
  useFinishTestQuery,

  useAddFriendToRatingMutation,
  useGetAllRatingQuery,
  useLazyGetAllRatingQuery,
  useGetMyRatingQuery,
  useGetFriendsRatingQuery,
  useRemoveFriendFromRatingMutation,
  useLazyGetFriendsRatingQuery,

  useGetAllLessonsQuery,

  useGetQuantityMasteredQuery,
  useLazyGetMasteredOrWrongQuestionsQuery,

  useGetEntryDaysQuery,
  useGetProgressQuery,
} = authorizedApi;
