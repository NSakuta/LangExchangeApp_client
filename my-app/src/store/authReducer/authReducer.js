import { createSlice } from "@reduxjs/toolkit"
import { authSuccess, startLoading, stopLoading } from "../appreducer/appReducer";
import { login } from "../../api/auth.api";

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
export const errorAuthSelector = state => state.auth.error;
export const currentUserSelector = state => state.auth.currentUser;


export const loginAction = (data) => {
    return async dispatch => {
        dispatch(setError({error: null}));
        dispatch(startLoading());
        try {
            const response = await login(data);
            console.log('login action: ', response)
            localStorage.setItem('USER_ID', JSON.stringify(response.id))
            dispatch(setCurrentUser({currentUser: response.id}))
            dispatch(authSuccess());
        } catch (err) {
            dispatch(setError({error: err.message}))
        } finally {
            dispatch(stopLoading());
        }
    }
}

export const getCurrentUserIdFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('USER_ID')) || null;
}

export const resetErrorAction = () => {
    return dispatch => {
        dispatch(setError({error: null}))
    }
}