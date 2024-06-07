import { FoodData } from '@/app/types/DataTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const dataApiSlice = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getData: builder.query<[], any>({
            query: (endpint) => `${endpint}`,
            transformResponse: (res: any) => res.result
        }),
        getSingleData: builder.query<FoodData, any>({
            query: (endpoint) => `${endpoint}`,
            transformResponse: (res: any) => res.result[0]
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDataQuery, useGetSingleDataQuery } = dataApiSlice;