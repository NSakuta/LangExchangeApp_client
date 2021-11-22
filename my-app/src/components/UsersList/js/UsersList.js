import '../css/UsersList.css'
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector, getCurrentUserIdFromLocalStorage } from "../../../store/authReducer/authReducer";
import { useEffect } from "react";
import { getAllUsersAction, userSelector } from "../../../store/userReducer/userReducer";
import User from "./User";
import { NavLink } from 'react-router-dom';

const Users = () => {
    
    const currentUserId = getCurrentUserIdFromLocalStorage();
    const dispatch = useDispatch();

    console.log(currentUserId);

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    const users = useSelector(userSelector)
    console.log('users: ', users)

    return (
        <div id="wrapper">
            <div id="wrapper-users">
                {users.map(el => {
                    if(currentUserId !== el._id) {
                        return (
                            <NavLink id="box" key={el._id} to={`/users/${el._id}`}>
                            <User key={el._id}
                                user={el}></User>
                            </NavLink>
                            )
                        }
                    })
    	        }
            </div>
        </div>
    )
}

export default Users;