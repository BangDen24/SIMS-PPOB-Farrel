import { baseApi } from './baseApi';

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: (serviceCode) => ({
        url: '/transaction',
        method: 'POST',
        body: { service_code: serviceCode },
      }),
      invalidatesTags: ['Balance', 'Transactions'],
    }),

    getTransactionHistory: builder.query({
      query: ({ limit = 5 } = {}) => `/transaction/history?offset=0&limit=${limit}`,
      providesTags: ['Transactions'],
    }),
  }),
});

export const { 
  useCreateTransactionMutation,  
  useGetTransactionHistoryQuery 
} = transactionApi;