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
    //     setReceivedMessages: (state, {payload}) => {
    //         state.receivedMessages = payload.receivedMessages
    //     }
        }
})

export default messagesReducer.reducer;
export const {setMessages} = messagesReducer.actions;
export const messagesSelector = state => state.messages.messages;
export const receivedMessagesSelector = state => state.messages.receivedMessages;


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

// export const getAllReceivedMessagesByUserIdAction = (array) => {
//     const userId = getUserIdFromLocalStorage();
//     const receivedMessages = [];
//     if(userId) {
//         receivedMessages = array.filter(el => el.recipient === userId);
//         dispatch(setReceivedMessages({receivedMessages: receivedMessages}))
//     } else {
//         return []
//     }
// }

// const getUserIdFromLocalStorage = () => {
//     return JSON.parse(localStorage.getItem('USER_ID')) || []
// }



