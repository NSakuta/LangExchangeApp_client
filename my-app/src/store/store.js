import {combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appreducer/appReducer'
import userReducer from './userReducer/userReducer'

const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer
})

const store = configureStore({reducer: rootReducer })

export default store