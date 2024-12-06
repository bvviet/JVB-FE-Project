import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';
import { ProvinceDistricts, ProvinceResponse } from '@/types/addressesTypes';

export const adminSystemApi = createApi({
  reducerPath: 'adminSystemApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => {
    return {
      getAllProvinces: builder.query<ProvinceResponse, void>({
        query: () => ({
          url: '/provinces',
        }),
      }),

      getAllDistricts: builder.query<ProvinceDistricts, { id: number }>({
        query: id => ({
          url: `/districts/${id}`,
        }),
      }),

      registerUniversity: builder.mutation({
        query: payload => ({
          url: '/university/register',
          method: 'POST',
          body: payload,
        }),
      }),

      registerCompany: builder.mutation({
        query: payload => ({
          url: '/company/register',
          method: 'POST',
          body: payload,
        }),
      }),

      login: builder.mutation({
        query: payload => ({
          url: '/auth/login',
          method: 'POST',
          body: payload,
        }),
      }),

      getAllWorkShopsAdminSystem: builder.query<void, void>({
        query: () => ({
          url: '/admin/workshops',
        }),
      }),
    };
  },
});

export const {
  useGetAllProvincesQuery,
  useGetAllDistrictsQuery,
  useRegisterUniversityMutation,
  useRegisterCompanyMutation,
  useLoginMutation,
  useGetAllWorkShopsAdminSystemQuery,
} = adminSystemApi;
