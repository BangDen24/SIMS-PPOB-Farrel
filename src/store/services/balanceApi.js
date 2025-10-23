import { baseApi } from './baseApi';

export const balanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getBalance: builder.query({
      query: () => '/balance',
      providesTags: ['Balance'],
    }),

    topUp: builder.mutation({
      query: (amount) => ({
        url: '/topup',
        method: 'POST',
        body: { top_up_amount: amount },
      }),
      invalidatesTags: ['Balance', 'Transactions'],
    }),
  }),
});

export const { 
  useGetBalanceQuery, 
  useTopUpMutation 
} = balanceApi;