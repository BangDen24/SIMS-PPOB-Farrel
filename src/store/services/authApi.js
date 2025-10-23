import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: '/registration',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation 
} = authApi;