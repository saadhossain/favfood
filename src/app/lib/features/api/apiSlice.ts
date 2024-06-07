import { AdminDataType, FetchedDataType } from '@/app/types/DataTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const dataApiSlice = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getAdminData: builder.query<AdminDataType, any>({
            query: (endpint) => `${endpint}`,
            transformResponse: (res:any) => res.result,
        }),
        getData: builder.query<FetchedDataType, any>({
            query: (endpint) => `${endpint}`,
        }),
        getSingleFood: builder.query<FetchedDataType, any>({
            query: (endpoint) => `${endpoint}`
        }),
        getSingleRestaurant: builder.query<FetchedDataType, any>({
            query: (endpoint) => `${endpoint}`
        }),
        getUsersData: builder.query<FetchedDataType, any>({
            query: (endpoint) => `${endpoint}`
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAdminDataQuery, useGetDataQuery, useGetSingleFoodQuery, useGetSingleRestaurantQuery, useGetUsersDataQuery } = dataApiSlice;