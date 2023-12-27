import { CONSTANTS } from "../constants";
import { apiSlice } from "./apiSlice";


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${CONSTANTS.USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${CONSTANTS.USERS_URL}/logout`,
                method: "POST"
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${CONSTANTS.USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${CONSTANTS.USERS_URL}/profile`,
                method: "PUT",
                body: data
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } = userApiSlice;