import { CONSTANTS } from "../constants";
import { apiSlice } from "./apiSlice";


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        login: builder.mutation({
            query: (data) => ({
                url: `${CONSTANTS.USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        })
    }
})