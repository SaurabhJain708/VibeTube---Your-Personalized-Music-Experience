import { clearAlert, setAlert } from "../features/AlertSlice"

const alertMiddleware = (store) => (next) => (action) =>{
    if(action.type===setAlert.type && action.payload.timeout){
        setTimeout(()=>{
            store.dispatch(clearAlert());
        },2000)
    }
    return next(action)
}

export default alertMiddleware 