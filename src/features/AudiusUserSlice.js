import { createEntityAdapter } from "@reduxjs/toolkit";
import { audiusApiSlice } from "./api/AudiusApiSlice";

const AudiusUserAdapter = createEntityAdapter({})
export const extentedAudiusUserSlice = audiusApiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getUserById: builder.query({
            query: (id)=>`/users/${id}`,
            transformErrorResponse: (response)=>{
                return AudiusUserAdapter.setAll(AudiusUserAdapter.getInitialState(),response)
            },
            providesTags: [{type:'USER', id:'LIST'}],
            invalidatesTags: [{type:'USERSONGS',id:'LIST'}]
        })
    })
})

export const {
    useGetUserByIdQuery
} = extentedAudiusUserSlice