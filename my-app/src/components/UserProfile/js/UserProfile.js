import '../css/UserProfile.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { findUserById, getAllUsersAction } from '../../../store/userReducer/userReducer';
import { userSelector } from '../../../store/userReducer/userReducer';
import { useEffect } from 'react';
import { getCurrentUserIdFromLocalStorage } from '../../../store/authReducer/authReducer';
import React from 'react';
import UserForm from './UserForm';


const Profile = () => {

    const currentUserId = getCurrentUserIdFromLocalStorage();
    const dispatch = useDispatch();
    const users = useSelector(userSelector)
    const currentUser = findUserById(users, currentUserId);

    useEffect(() => {
        if(!currentUser)
        dispatch(getAllUsersAction())
    
    }, [dispatch, currentUser])

    return (
        <>
            {currentUser && <UserForm currentUser={currentUser}></UserForm>}
        </>
        
    )
}

export default Profile;