import { baseApi } from './baseApi';

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => '/services',
      providesTags: ['Services'],
    }),

    getBanners: builder.query({
      query: () => '/banner',
      providesTags: ['Banners'],
    }),
  }),
});

export const { 
  useGetServicesQuery, 
  useGetBannersQuery 
} = serviceApi;