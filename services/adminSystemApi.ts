/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { persistor, RootState } from '@/store/store';
import { DistrictsResponse, ProvinceResponse, WardResponse } from '@/types/addressesTypes';
import { WorkshopDetailResponse, WorkshopResponse } from '@/types/workshop';
import { IAccountCompanyAllResponse, IAccountCompanyDetailResponse } from '@/types/companyType';
import { UniversityDetailResponse, UniversityResponse } from '@/types/university';
import { IPartnershipsSchoolResponse, IPartnershipsUniversityResponse } from '@/types/jobAndPartnershipsSchoolType';
import { IJobAllResponseAdminSystem } from '@/types/jobCompany';
import { logOut } from '@/store/slices/user';
import { formatDateSearch } from '@/utils/app/format';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithForceLogout = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logOut());
    await persistor.purge();
    window.location.href = '/auth/login';
  }
  return result;
};

export const adminSystemApi = createApi({
  reducerPath: 'adminSystemApi',
  baseQuery: baseQueryWithForceLogout,
  tagTypes: ['Workshop', 'Company', 'School', 'Partnerships', 'Job', 'Notifications'],
  endpoints: builder => {
    return {
      // Address
      getAllProvinces: builder.query<ProvinceResponse, void>({
        query: () => ({
          url: '/provinces',
        }),
      }),

      getAllDistricts: builder.query<DistrictsResponse, { id: number | null }>({
        query: ({ id }) => ({
          url: `/districts/${id}`,
        }),
      }),

      getAllWards: builder.query<WardResponse, { id: number | null }>({
        query: ({ id }) => ({
          url: `/wards/${id}`,
        }),
      }),

      // Auth
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

      changePassword: builder.mutation({
        query: payload => ({
          url: '/account/change-password',
          method: 'PUT',
          body: payload,
        }),
      }),

      confirmRegister: builder.query<{ code: number; message: string; data: null }, { uuid: string }>({
        query: ({ uuid }) => ({
          url: `/auth/confirm/${uuid}`,
          method: 'GET',
        }),
      }),

      // workshop
      getAllWorkShopsAdminSystem: builder.query<
        WorkshopResponse,
        { page: number; size: number; keyword: string; status: string; sortBy: string | null; startDate: Date | null; endDate: Date | null }
      >({
        query: ({ page, size, keyword, status, sortBy, startDate, endDate }) => {
          let queryParams = new URLSearchParams();
          if (page) queryParams.append('page', String(page));
          if (size) queryParams.append('size', String(size));
          if (keyword) queryParams.append('keyword', keyword);
          if (status) queryParams.append('status', status);
          if (sortBy) queryParams.append('sortBy', sortBy);
          if (startDate) queryParams.append('startDate', formatDateSearch(startDate) || '');
          if (endDate) queryParams.append('endDate', formatDateSearch(endDate) || '');

          return `/admin/workshops?${queryParams.toString()}`;
        },
        providesTags: [{ type: 'Workshop' }],
      }),

      getDetailWorkshop: builder.query<WorkshopDetailResponse, { id: number | null }>({
        query: ({ id }) => ({
          url: `/workshops/${id}`,
        }),
        providesTags: (result, error, { id }) => (id !== null ? [{ type: 'Workshop', id }] : []),
      }),

      deleteOneWorkshop: builder.mutation({
        query: ({ ids }) => ({
          url: `/workshops/delete`,
          method: 'DELETE',
          body: { ids },
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Workshop', id }, { type: 'Workshop' }],
      }),

      deleteWorkshops: builder.mutation({
        query: ({ ids }) => ({
          url: `/workshops/delete`,
          method: 'DELETE',
          body: { ids },
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Workshop', id }, { type: 'Workshop' }],
      }),

      // Approve workshop chấp nhận
      approveWorkshop: builder.mutation({
        query: ({ id }) => ({
          url: `/admin/workshops/approve/${id}`,
          method: 'PUT',
        }),
        invalidatesTags: (result, error, { id }) => {
          return id !== null ? [{ type: 'Workshop', id }, { type: 'Workshop' }] : [{ type: 'Workshop' }];
        },
      }),

      // Reject workshop từ chối
      rejectWorkshop: builder.mutation({
        query: ({ id }) => ({
          url: `/admin/workshops/reject/${id}`,
          method: 'PUT',
        }),
        invalidatesTags: (result, error, { id }) => {
          return id !== null ? [{ type: 'Workshop', id }, { type: 'Workshop' }] : [{ type: 'Workshop' }];
        },
      }),

      // Get OTP
      getOtp: builder.mutation<{ code: number; message: string; data: any }, { email: string }>({
        query: ({ email }) => ({
          url: '/account/request-otp',
          method: 'POST',
          body: { email },
        }),
      }),

      forgotPassword: builder.mutation<any, { email: string; otp: string; password: string; confirmPassword: string }>({
        query: ({ email, otp, password, confirmPassword }) => ({
          url: '/account/forgot-password',
          method: 'PUT',
          body: { email, otp, password, confirmPassword },
        }),
      }),

      // Company
      getAllAccountCompany: builder.query<IAccountCompanyAllResponse, { page: number; size: number; keyword: string; status: string; sortBy: string | null }>({
        query: ({ page, size, keyword, status, sortBy }) => {
          let queryParams = new URLSearchParams();
          if (page) queryParams.append('page', String(page));
          if (size) queryParams.append('size', String(size));
          if (keyword) queryParams.append('keyword', keyword);
          if (status) queryParams.append('status', status);
          if (sortBy) queryParams.append('sortBy', sortBy);
          return `/admin/get-all-companies?${queryParams.toString()}`;
        },
        providesTags: ['Company'],
      }),

      getDetailAccountCompany: builder.query<IAccountCompanyDetailResponse, { id: number | null }>({
        query: ({ id }) => ({
          url: `/admin/company/${id}`,
        }),
        providesTags: result => (result ? [{ type: 'Company', id: result.data.account.id }] : [{ type: 'Company' }]),
      }),

      rejectAccountCompany: builder.mutation({
        query: ({ id }) => ({
          url: `/admin/reject/account/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Company', id }, { type: 'School', id }, { type: 'Company' }, { type: 'School' }],
      }),

      banAndActive: builder.mutation<
        {
          code: number;
          message: string;
          data: any;
        },
        { id: number; statusAccount: string }
      >({
        query: ({ id, statusAccount }) => ({
          url: `/admin/update-account-status/${id}`,
          method: 'PUT',
          body: { statusAccount },
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Company', id }, { type: 'School', id }, { type: 'Company' }, { type: 'School' }],
      }),

      // Account School
      getAllAccountSchool: builder.query<
        UniversityResponse,
        { page: number; size: number; keyword: string; status: string; universityType: string; sortBy: string | null }
      >({
        query: ({ page, size, keyword, status, universityType, sortBy }) => {
          let queryParams = new URLSearchParams();
          if (page) queryParams.append('page', String(page));
          if (size) queryParams.append('size', String(size));
          if (keyword) queryParams.append('keyword', keyword);
          if (status) queryParams.append('status', status);
          if (sortBy) queryParams.append('sortBy', sortBy);
          if (universityType) queryParams.append('universityType', universityType);

          return `/admin/get-university?${queryParams.toString()}`;
        },
        providesTags: ['School'],
      }),

      getDetailAccountSchool: builder.query<UniversityDetailResponse, { id: number | null }>({
        query: ({ id }) => ({
          url: `/admin/university/${id}`,
        }),
        providesTags: result => (result ? [{ type: 'School', id: result.data.id }] : [{ type: 'School' }]),
      }),

      // Partnership
      getAllPartnershipsUniversity: builder.query<IPartnershipsSchoolResponse, { page: number; size: number; url: string; keyword: string }>({
        query: ({ page, size, url, keyword }) => {
          let queryParams = new URLSearchParams();
          if (page) queryParams.append('page', String(page));
          if (size) queryParams.append('size', String(size));
          if (keyword) queryParams.append('keyword', String(keyword));

          return `${url}?${queryParams.toString()}`;
        },
        providesTags: ['Partnerships'],
      }),

      getAllPartnershipsCompany: builder.query<IPartnershipsUniversityResponse, { page: number; size: number; url: string; keyword: string }>({
        query: ({ page, size, url, keyword }) => {
          let queryParams = new URLSearchParams();
          if (page) queryParams.append('page', String(page));
          if (size) queryParams.append('size', String(size));
          if (keyword) queryParams.append('keyword', String(keyword));

          return `${url}?${queryParams.toString()}`;
        },
        providesTags: ['Partnerships'],
      }),

      acceptPartnerships: builder.mutation({
        query: ({ accountLoginId, toDoAccountId, doBy }) => ({
          url: `/partnership/acceptConnect`,
          method: 'POST',
          body: { accountLoginId, toDoAccountId, doBy },
        }),
        invalidatesTags: () => [{ type: 'Partnerships' }],
      }),

      cancelPartnerships: builder.mutation({
        query: ({ accountLoginId, toDoAccountId, doBy }) => ({
          url: `/partnership/cancelConnect`,
          method: 'POST',
          body: { accountLoginId, toDoAccountId, doBy },
        }),
        invalidatesTags: () => [{ type: 'Partnerships' }],
      }),

      removePartnerships: builder.mutation({
        query: ({ accountLoginId, toDoAccountId, doBy, message }) => ({
          url: `/partnership/removeConnect`,
          method: 'POST',
          body: { accountLoginId, toDoAccountId, doBy, message },
        }),
        invalidatesTags: () => [{ type: 'Partnerships' }],
      }),

      // Job
      getAllJobsAdminSystem: builder.query<IJobAllResponseAdminSystem, { page: number; size: number; keyword: string; status: string }>({
        query: ({ page, size, keyword, status }) => {
          let queryParams = new URLSearchParams();
          if (page) queryParams.append('page', String(page));
          if (size) queryParams.append('size', String(size));
          if (keyword) queryParams.append('keyword', keyword);
          if (status) queryParams.append('status', status);

          return `/admin/jobs?${queryParams.toString()}`;
        },
        providesTags: ['Job'],
      }),

      ApproveJobs: builder.mutation({
        query: ({ id }) => ({
          url: `/admin/job/approve/${id}`,
          method: 'PUT',
        }),
        invalidatesTags: () => ['Job'],
      }),

      rejectJobs: builder.mutation({
        query: ({ id }) => ({
          url: `/admin/job/reject/${id}`,
          method: 'PUT',
        }),
        invalidatesTags: () => ['Job'],
      }),

      getNotifications: builder.query({
        query: () => ({
          url: '/portal/notifications',
        }),
        providesTags: ['Notifications'],
      }),

      updateStatusNotifications: builder.mutation<void, void>({
        query: () => ({
          url: `/portal/notifications/update-all`,
          method: 'PUT',
        }),
        invalidatesTags: () => ['Notifications'],
      }),
    };
  },
});

export const {
  useGetAllProvincesQuery,
  useGetAllDistrictsQuery,
  useGetAllWardsQuery,
  useRegisterUniversityMutation,
  useRegisterCompanyMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useConfirmRegisterQuery,
  useGetAllWorkShopsAdminSystemQuery,
  useLazyGetAllWorkShopsAdminSystemQuery,
  useGetDetailWorkshopQuery,
  useApproveWorkshopMutation,
  useRejectWorkshopMutation,
  useGetOtpMutation,
  useForgotPasswordMutation,
  useDeleteOneWorkshopMutation,
  useDeleteWorkshopsMutation,
  useGetAllAccountCompanyQuery,
  useGetDetailAccountCompanyQuery,
  useRejectAccountCompanyMutation,
  useBanAndActiveMutation,
  useGetAllAccountSchoolQuery,
  useGetDetailAccountSchoolQuery,
  useGetAllPartnershipsUniversityQuery,
  useGetAllPartnershipsCompanyQuery,
  useAcceptPartnershipsMutation,
  useCancelPartnershipsMutation,
  useRemovePartnershipsMutation,
  useGetAllJobsAdminSystemQuery,
  useApproveJobsMutation,
  useRejectJobsMutation,
  useGetNotificationsQuery,
  useUpdateStatusNotificationsMutation,
} = adminSystemApi;
