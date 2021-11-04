import {createSlice} from '@reduxjs/toolkit';
import { startLoading, stopLoading } from '../appreducer/appReducer';
import { addNewUser, getAllUsers, getUserByid, putNewValueToUser } from '../../api/user.api';

const initialState = {
    users: [],
    currentUser: null
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
        }
    }
})

export default userReducer.reducer;
export const {setUsers, addUser, updateUser, setCurrentUser} = userReducer.actions;
export const userSelector = state => state.user.users;
export const currentUserSelector = state => state.user.currentUser;

export const getAllUsersAction = () => {
    return async dispatch => {
        dispatch(startLoading());
        try {
            const response = await getAllUsers();
            dispatch(setUsers({users: response}));
        }catch(err) {
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

export const getUserByIdAction = (id) => {
    return async dispatch => {
        dispatch(startLoading());
        try {
            const response = await getUserByid(id);
            dispatch(setCurrentUser({currentUser: response}))
        } catch(err) {
            console.log(err.message)
        }
    }
}

