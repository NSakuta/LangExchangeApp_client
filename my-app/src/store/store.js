import {combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appreducer/appReducer'
import userReducer from './userReducer/userReducer'
import messagesReducer from './messageReducer/messagesReducer'

const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
    messages: messagesReducer
})

const store = configureStore({reducer: rootReducer })

export default store;