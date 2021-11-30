import { createSlice } from "@reduxjs/toolkit";
import { removeCurrentUser } from "../authReducer/authReducer";

const initialState = {
    isLoading: false,
    isAuth: false
}

const appReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true
        },
        stopLoading: state => {
            state.isLoading = false
        },
        authSuccess: state => {
            state.isAuth = localStorage.getItem('TOKEN') !== null
        },
        logout: (state, {payload}) => {
            state.isAuth = payload.isAuth
        }
    }
});

export default appReducer.reducer;
export const {startLoading, stopLoading, authSuccess, logout} = appReducer.actions;
export const appSelector = state => state.app.isLoading;
export const authSelector = state => state.app.isAuth;

export const logoutAction = () => {
    return dispatch => {
        localStorage.removeItem('USER_ID');
        localStorage.removeItem('TOKEN');
        dispatch(removeCurrentUser());
        dispatch(logout({isAuth: false}))
    }
}