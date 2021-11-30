import {createSlice} from '@reduxjs/toolkit';
import { startLoading, stopLoading } from '../appreducer/appReducer';
import { addNewUser, getAllUsers, updateUser } from '../../api/user.api';

const initialState = {
    users: [],
    error: null,
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
        // addNewValueToUser: (state, {payload}) => {
        //     const index = state.users.findIndex(el => el._id === payload.id)
        //     state.users[index] = payload.newValue
        // },
        setError: (state, {payload}) => {
            state.error = payload.error
        }
    }
})

export default userReducer.reducer;
export const {setUsers, addUser, addNewValueToUser, setError} = userReducer.actions;
export const userSelector = state => state.user.users;
export const errorUserSelector = state => state.user.error;

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

export const addFavouritesAction = (id, newValue) => {
    return async dispatch => {
        dispatch(setError({error: null}))
        dispatch(startLoading());
        try {
            await updateUser(id, {favourites: newValue});
            // dispatch(addNewValueToUser({id, newValue}))
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
        try {
            await updateUser(id, newValue);
            // updateUsers();
        } catch(err) {
            dispatch(setError({error: err.message}))
        } finally {
            dispatch(stopLoading())
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


