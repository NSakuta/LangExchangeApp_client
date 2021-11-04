import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
});

export default appReducer.reducer;
export const {startLoading, stopLoading} = appReducer.actions;
export const appSelector = state => state.app;

