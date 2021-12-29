import { createSlice } from "@reduxjs/toolkit";
import { addNewMessage, getAllMessages } from "../../api/message.api";


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
        try {
            const response = await getAllMessages();
            dispatch(setMessages({messages: response}))
        } catch(err) {
            console.log(err.message)
        } 
    }
};
 
export const addNewMessageAction = (newMessage) => {
    return async dispatch => {
        try {
            const response = await addNewMessage(newMessage);
            dispatch(addMessage({...response}));
        } catch(err) {
            console.log(err.message)
        } 
    }
}

export const findReceivedMessagesByUserId = (id, array) => {
    let receivedMessages = [];

    if (id !== null) {
        receivedMessages = array.filter(el => el.recipient === id);
    } 
    return receivedMessages;
}

export const findSentMessagesByUserId = (id, array) => {
  let sentMessages = [];

  if (id !== null) {
      sentMessages = array.filter(el => el.sentBy === id);
  }
  return sentMessages;
}



