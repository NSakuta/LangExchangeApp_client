import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { findUserById, getAllUsersAction } from '../../../store/userReducer/userReducer';
import { userSelector } from '../../../store/userReducer/userReducer';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { currentUserSelector } from '../../../store/authReducer/authReducer';

const UserView = () => {

    //const currentUserId = useSelector(currentUserSelector);
    const dispatch = useDispatch();
    const {id} = useParams();


    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    const allUsers = useSelector(userSelector)
    const user = findUserById(allUsers, id);

    console.log('user:' , user)


    return (
        <div>
            <p>{user.firstName}, {user.lastName}</p>
        </div>
    )
}

export default UserView;