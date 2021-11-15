import { createSlice } from "@reduxjs/toolkit"
import { startLoading, stopLoading } from "../appreducer/appReducer";
import { login } from "../../api/auth.api";
import { authSuccess } from "../appreducer/appReducer";

const initialState = {
    error: null,
    currentUser: null,
}

const authReducer = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        setError: (state, {payload}) => {
            state.error = payload.error
        },
        clearError: state => {
            state.error = null
        },
        setCurrentUser: (state, {payload}) => {
            state.currentUser = payload.currentUser
        },
        removeCurrentUser: state => {
            state.currentUser = null
        }
    }
});


export default authReducer.reducer;
export const {setError, clearError, setCurrentUser, removeCurrentUser} = authReducer.actions;
export const errorSelector = state => state.auth.error;
export const currentUserSelector = state => state.auth.currentUser;


export const loginAction = (data) => {
    return async dispatch => {
        dispatch(startLoading());
        try {
            const response = await login(data);
            console.log('login action: ', response)
            localStorage.setItem('USER_ID', JSON.stringify(response.id))
            dispatch(authSuccess());
        } catch (err) {
            dispatch(setError({error: err.message}))
        } finally {
            dispatch(stopLoading());
        }
    }
}

// export const getCurrentUserAction = () => {
//     return async dispatch => {
//         dispatch(startLoading());
//         try {
//             const userId = JSON.parse(localStorage.getItem('USER_ID'));
//             dispatch(setCurrentUser({currentUser: userId}));
//         }catch(err) {
//             console.log(err.message)
//         } finally {
//             dispatch(stopLoading())
//         }
//     }
// }