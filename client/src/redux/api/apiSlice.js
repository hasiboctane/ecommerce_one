import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CONSTANTS } from '../constants'
const baseQuery = fetchBaseQuery({ baseUrl: CONSTANTS.BASE_URL });
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Category'],
    endpoints: () => ({})
})