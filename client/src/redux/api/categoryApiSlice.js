import { CONSTANTS } from "../constants";
import { apiSlice } from "./apiSlice";


const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: `/${CONSTANTS.CATEGORY_URL}`
            })
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: `/${CONSTANTS.CATEGORY_URL}`,
                method: "POST",
                body: data
            })
        }),
        updateCategory: builder.mutation({
            query: (data) => ({
                url: `/${CONSTANTS.CATEGORY_URL}/${data.categoryId}`,
                method: "PUT",
                body: data
            })
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `/${CONSTANTS.CATEGORY_URL}/${categoryId}`,
                method: "DELETE"
            })
        })
    })
})

export const { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoryApiSlice;