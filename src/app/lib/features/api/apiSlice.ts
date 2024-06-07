import { FoodData, RestaurantData } from '@/app/types/DataTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const dataApiSlice = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getAdminData: builder.query<[], any>({
            query: (endpint) => `${endpint}`,
            transformResponse: (res: any) => res.result
        }),
        getData: builder.query<[], any>({
            query: (endpint) => `${endpint}`,
            transformResponse: (res: any) => res.result
        }),
        getSingleFood: builder.query<FoodData, any>({
            query: (endpoint) => `${endpoint}`,
            transformResponse: (res: any) => res.result[0]
        }),
        getSingleRestaurant: builder.query<RestaurantData, any>({
            query: (endpoint) => `${endpoint}`,
            transformResponse: (res: any) => res.result[0]
        }),
        getUsersData: builder.query<[], any>({
            query: (endpoint) => `${endpoint}`,
            transformResponse: (res: any) => res.result
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAdminDataQuery, useGetDataQuery, useGetSingleFoodQuery, useGetSingleRestaurantQuery, useGetUsersDataQuery } = dataApiSlice;