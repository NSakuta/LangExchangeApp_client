import {combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import app from './appreducer/appReducer'
import user from './userReducer/userReducer'
import messages from './messageReducer/messagesReducer'
import auth from './authReducer/authReducer'
import img from './uploadReducer/imgReducer'

const rootReducer = combineReducers({
    user,
    app,
    messages,
    auth,
    img
})

const store = configureStore({reducer: rootReducer })

export default store;