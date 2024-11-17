import { createSlice } from "@reduxjs/toolkit"

const initialState = 
    {
        type: '',
        message: '',
        timeout: false,
        isVisible: false
    }


const AlertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert(state,action){
            state.type = action.payload.type || state.type;
            state.message = action.payload.message || state.message;
            state.timeout = action.payload.timeout ?? state.timeout;
            state.isVisible = action.payload.isVisible ?? state.isVisible;
        },
        clearAlert(){
            return initialState
        }
    }
})

export const selectAlert= (state)=>state.alert
export const {setAlert, clearAlert} = AlertSlice.actions;
export default AlertSlice.reducer;