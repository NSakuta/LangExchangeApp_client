import {createSlice} from '@reduxjs/toolkit';
import { sendFile } from '../../api/upload.api';


const initialState = {
    avatar: null,
    images: null
};

const imgReducer = createSlice({
    name: 'img',
    initialState, 
    reducers: {
        setAvatar: (state, {payload}) => {
            state.avatar = payload.avatar
        },
        addImg: (state, {payload}) => {
            state.images.push(payload)
        }
    }
})

export default imgReducer.reducer;
export const {setAvatar, addImg, setError} = imgReducer.actions;
export const imagesSelector = state => state.img.images;

export const uploadFile = (img) => {
    return async dispatch => {
        try {
            const response = await sendFile(img);
            console.log('RESPONSE:', response)
            dispatch(addImg({...response}))
        } catch(err) {
            console.log(err.message)
        }
    }
}