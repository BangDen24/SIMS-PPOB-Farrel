import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { endpoint }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    if (endpoint !== 'updateProfileImage') {
      headers.set('Content-Type', 'application/json');
    }
    
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  
  if (result.error?.status === 401 || result.error?.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Profile', 'Balance', 'Services', 'Banners', 'Transactions'],
  endpoints: () => ({}),
});