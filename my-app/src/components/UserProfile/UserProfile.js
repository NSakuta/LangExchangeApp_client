import './UserProfile.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllUsersAction } from '../../store/userReducer/userReducer';
import { userSelector } from '../../store/userReducer/userReducer';
import { useEffect } from 'react';
import { currentUserSelector } from '../../store/authReducer/authReducer';


const Profile = () => {

    const currentUserId = useSelector(currentUserSelector);
    const dispatch = useDispatch();

    console.log(currentUserId);

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    const users = useSelector(userSelector)
    console.log('users: ', users)

    return (
        <div>
            <p>User Profile</p>
        </div>
    )
}

export default Profile;