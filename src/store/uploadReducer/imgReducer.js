import {createSlice} from '@reduxjs/toolkit';
import { sendFile } from '../../api/upload.api';


const initialState = {
    avatar: null
};

const avatarReducer = createSlice({
    name: 'avatar',
    initialState, 
    reducers: {
        setAvatar: (state, {payload}) => {
            state.avatar = payload.avatar
        }
    }
})

export default avatarReducer.reducer;
export const {setAvatar} = avatarReducer.actions;
export const avatarSelector = state => state.avatar.avatar;

export const uploadPhoto = (newImg) => {
    return async dispatch => {
        
        try {
            const response = await sendFile(newImg);
            dispatch(setAvatar({avatar: response}))
        } catch(err) {
            console.log(err.message)
        }
    }
}