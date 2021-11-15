import {createSlice} from '@reduxjs/toolkit';
import { startLoading, stopLoading } from '../appreducer/appReducer';
import { addNewUser, getAllUsers, getUserByid, putNewValueToUser } from '../../api/user.api';
import { login } from '../../api/auth.api';

const initialState = {
    users: [],
    currentUser: null,
    error: false
};

const userReducer = createSlice({
    name: 'user',
    initialState, 
    reducers: {
        setUsers: (state, {payload}) => {
            state.users = payload.users
        },
        addUser: (state, {payload}) => {
            state.users.push(payload)
        },
        updateUser: (state, {payload}) => {
            const index = state.users.findIndex(el => el._id === payload.id)
            state.users[index] = payload.newValue
        },
        setCurrentUser: (state, {payload}) => {
            state.currentUser = payload.currentUser
        },
        setError: (state, {payload}) => {
            state.error = payload.error
        }
    }
})

export default userReducer.reducer;
export const {setUsers, addUser, updateUser, setCurrentUser, setError} = userReducer.actions;
export const userSelector = state => state.user.users;
export const currentUserSelector = state => state.user.currentUser;
export const errorSelector = state => state.user.error;

export const loginAction = (data) => {
    return async dispatch => {
        dispatch(startLoading());
        try {
            const response = await login(data);
            dispatch(setCurrentUser({currentUser: response._id}))
        } catch (err) {
            console.log(err.message)
        } finally {
            dispatch(stopLoading());
        }
    }
}

export const getAllUsersAction = () => {
    return async dispatch => {
        dispatch(startLoading());
        try {
            const response = await getAllUsers();
            dispatch(setUsers({users: response}));
        }catch(err) {
            dispatch(setError({error: err.message}))
            console.log(err.message);
        } finally {
            dispatch(stopLoading);
        }
    }
}

export const addNewUserAction = (newUser) => {
    return async dispatch => {
        dispatch(startLoading());
        try {
            const response = await addNewUser(newUser);
            dispatch(addUser({...response}));
        } catch(err) {
            console.log(err.message);
        } finally {
            dispatch(stopLoading());
        }
    }
}

export const updateUserAction = (id, newValue) => {
    return async dispatch => {
        dispatch(startLoading());
        try {
            await putNewValueToUser(id, newValue);
            dispatch(updateUser({id, newValue}))
        } catch(err) {
            console.log(err.message)
        } finally {
            dispatch(stopLoading())
        }
    }
}

export const setCurrentUserAction = () => {
    return async dispatch => {
        dispatch(startLoading());
        try {
            const userId = JSON.parse(localStorage.getItem('USER_ID'));
            console.log('uuuusers', userId);
            dispatch(setCurrentUser({currentUser: userId}));
        }catch(err) {
            console.log(err.message)
        } finally {
            dispatch(stopLoading())
        }
    }
}

