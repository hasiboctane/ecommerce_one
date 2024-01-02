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
                url: `/${CONSTANTS.USERS_URL}/logout`,
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
        }),
        getUsers: builder.query({
            query: () => ({
                url: `/${CONSTANTS.USERS_URL}`,
            }),
            providesTags: ["User"],
            keepUnusedDataFor: 5
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/${CONSTANTS.USERS_URL}/${userId}`,
                method: "DELETE",
            })
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `${CONSTANTS.USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: ({ userId, updatedUser }) => ({
                url: `/${CONSTANTS.USERS_URL}/${userId}`,
                method: "PUT",
                body: updatedUser
            }),
            invalidatesTags: ["User"]
        })

    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation } = userApiSlice;