import { configureStore } from "@reduxjs/toolkit";
import alertReducer from '../features/AlertSlice'
import alertMiddleware from '../Middlewares/alertMiddleware'
import { audiusApiSlice } from "../features/api/AudiusApiSlice";
import storage from 'redux-persist/lib/storage'; 
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
const persistConfig = {
    key: 'root',
    storage,
    whitelist:['audiusApi']
}
const persistedAudiusApiReducer = persistReducer(persistConfig, audiusApiSlice.reducer);
export const store = configureStore({
    reducer: {
        [audiusApiSlice.reducerPath]: persistedAudiusApiReducer,
        alert: alertReducer
    },
    middleware: (getDefaultMiddleware)=> 
        getDefaultMiddleware()
    .concat(audiusApiSlice.middleware, alertMiddleware),
    devTools: true
})
export const persistor = persistStore(store)