import { createSlice } from "@reduxjs/toolkit";
import { getAllMessages } from "../../api/message.api";
import { startLoading, stopLoading } from "../appreducer/appReducer";


const initialState = {
    messages: []
}


const messagesReducer = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, {payload}) => {
            state.messages = payload.messages
        }
    }
})

export default messagesReducer.reducer;
export const {setMessages} = messagesReducer.actions;
export const messagesSelector = state => state.messages.messages;


export const getAllMessagesAction = () => { 
    return async dispatch => {
        dispatch(startLoading());
        try {
            const response = await getAllMessages();
            console.log('response: ', response)
            dispatch(setMessages({messages: response}))
        } catch(err) {
            console.log(err.message)
        } finally {
            dispatch(stopLoading())
        }
    }
};



