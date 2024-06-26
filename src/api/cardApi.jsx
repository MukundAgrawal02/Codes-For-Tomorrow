import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cardApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
    deletePost: builder.mutation({
        query: (postId) => ({
          url: `posts/${postId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Posts'],
      }),
  }),
});

export const { useGetPostsQuery, useDeletePostMutation } = cardApi;