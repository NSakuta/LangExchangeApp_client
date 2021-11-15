import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    auth: false
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
            state.auth = localStorage.getItem('TOKEN') !== null
        },
        logout: state => {
            localStorage.removeItem('USER_ID');
            localStorage.removeItem('TOKEN');
            state.auth = false
        }
    }
});

export default appReducer.reducer;
export const {startLoading, stopLoading, authSuccess, logout} = appReducer.actions;
export const appSelector = state => state.app.isLoading;
export const authSelector = state => state.app.auth;


