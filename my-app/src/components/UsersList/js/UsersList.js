import '../css/UsersList.css'
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserIdFromLocalStorage } from "../../../store/authReducer/authReducer";
import { useEffect } from "react";
import { getAllUsersAction, userSelector } from "../../../store/userReducer/userReducer";
import User from "./User";
import { NavLink } from 'react-router-dom';
import Search from './Search';


const Users = () => {
    
    const currentUserId = getCurrentUserIdFromLocalStorage();
    const dispatch = useDispatch();

    console.log(currentUserId);

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    let users = useSelector(userSelector)


    return (
        <div id="wrapper">
            <Search/>
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
                    })} 
            </div>
        </div>
    )
}

export default Users;