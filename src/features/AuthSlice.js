import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {useFirebase} from '../Hooks/useFirebase'


export const login = createAsyncThunk('auth/login', async ({email,password},{rejectWithValue})=>{
    const {app} = useFirebase()
    const auth = getAuth(app)
    try{
        const usercred = await signInWithEmailAndPassword(auth,email,password)
        return usercred.user;
    }catch(err){
       return rejectWithValue(err.message)
    }
})

export const logout = createAsyncThunk('auth/logout',async ()=>{
    const {app} = useFirebase()
    const auth = getAuth(app)
    await signOut(auth)
})

const AuthSlice = createSlice({
    name:'login',
    initialState:{
        user:null,
        status:'idle',
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.status= 'pending'
            state.error = null
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.status='succeeded'
            state.user = action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.payload
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user = null
            state.status = 'idle'
        })
    }
})

export const selectuser = (state)=> state.login
export default AuthSlice.reducer;