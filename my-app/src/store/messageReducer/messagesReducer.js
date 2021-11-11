import { createSlice } from "@reduxjs/toolkit";
import { addNewMessage, getAllMessages } from "../../api/message.api";
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
        },
        addMessage: (state, {payload}) => {
            state.messages.push(payload)
        }
    
        }
})

export default messagesReducer.reducer;
export const {setMessages, addMessage} = messagesReducer.actions;
export const messagesSelector = state => state.messages.messages;


export const getAllMessagesAction = () => { 
    return async dispatch => {
        dispatch(startLoading());
        try {
            const response = await getAllMessages();
            dispatch(setMessages({messages: response}))
        } catch(err) {
            console.log(err.message)
        } finally {
            dispatch(stopLoading())
        }
    }
};
 
export const addNewMessageAction = (newMessage) => {
    return async dispatch => {
        dispatch(startLoading());
        try {
            const response = await addNewMessage(newMessage);
            dispatch(addMessage({...response}));
        } catch(err) {
            console.log(err.message)
        } finally {
            dispatch(stopLoading());
        }
    }
}

// const getUserIdFromLocalStorage = () => {
//     return JSON.parse(localStorage.getItem('USER_ID')) || []
// }



