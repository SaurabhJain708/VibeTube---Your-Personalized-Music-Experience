import { configureStore } from "@reduxjs/toolkit";
import alertReducer from '../features/AlertSlice'
import alertMiddleware from '../Middlewares/alertMiddleware'
import { audiusApiSlice } from "../features/api/AudiusApiSlice";

export const store = configureStore({
    reducer: {
        [audiusApiSlice.reducerPath]: audiusApiSlice.reducer,
        alert: alertReducer
    },
    middleware: (getDefaultMiddleware)=> 
        getDefaultMiddleware()
    .concat(audiusApiSlice.middleware, alertMiddleware),
    devTools: true
})