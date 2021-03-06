import {createSlice} from '@reduxjs/toolkit';
import { startLoading, stopLoading } from '../appreducer/appReducer';
import { addNewUser, getAllUsers, updateUser } from '../../api/user.api';

const initialState = {
    users: [],
    error: null,
    isUpdated: false
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
        setError: (state, {payload}) => {
            state.error = payload.error
        },
        setIsUpdated: (state, {payload}) => {
            state.isUpdated = payload.isUpdated
        }
    }
})

export default userReducer.reducer;
export const {setUsers, addUser, addNewValueToUser, setError, setIsUpdated} = userReducer.actions;
export const userSelector = state => state.user.users;
export const errorUserSelector = state => state.user.error;
export const isUpdatedSelector = state => state.user.isUpdated

export const getAllUsersAction = () => {
    return async dispatch => {
        dispatch(setError({error: null}))
        dispatch(startLoading());
        try {
            const response = await getAllUsers();
            dispatch(setUsers({users: response}));
        }catch(err) {
            dispatch(setError({error: err.message}))
            console.log(err.message);
        } finally {
            dispatch(stopLoading());
        }
    }
}

export const addNewUserAction = (newUser) => {
    return async dispatch => {
        dispatch(setError({error: null}))
        dispatch(startLoading());
        try {
            const response = await addNewUser(newUser);
            dispatch(addUser({...response}));
        } catch(err) {
            console.log('err.message: ', err.message)
            dispatch(setError({error: err.message}))
        } finally {
            dispatch(stopLoading());
        }
    }
}

export const changeFavouritesAction = (id, newValue) => {
    return async dispatch => {
        dispatch(setError({error: null}))
        dispatch(startLoading());
        try {
            await updateUser(id, {favourites: newValue});
        } catch(err) {
            dispatch(setError({error: err.message}))
        } finally {
            dispatch(stopLoading())
        }
    }
}
export const updateUserAction = (id, newValue) => {
    return async dispatch => {
        dispatch(setError({error: null}))
        dispatch(startLoading());
        dispatch(setIsUpdated({isUpdated: false}))
        try {
            await updateUser(id, newValue);
        } catch(err) {
            dispatch(setError({error: err.message}))
        } finally {
            dispatch(stopLoading())
            dispatch(setIsUpdated({isUpdated: true}))
        }
    }
}

export const findUserById = (array, id) => {
    return array.find(el => el._id === id)
  }

export const updateUsers = () => {
    return async dispatch => {
        try {
            const newUsers = await getAllUsers();
            dispatch(setUsers(newUsers))
        } catch (err) {
            console.log(err.message)
        }
    }
    
}


