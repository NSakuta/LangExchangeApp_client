import '../css/UsersList.css'
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserIdFromLocalStorage } from "../../../store/authReducer/authReducer";
import { useEffect } from "react";
import { getAllUsersAction, userSelector } from "../../../store/userReducer/userReducer";
import User from "./User";
import { NavLink } from 'react-router-dom';
import Search from './Search';
import Loader from '../../Loader/Loader';
import { loaderSelector } from '../../../store/appreducer/appReducer';


const Users = () => {
    
    const currentUserId = getCurrentUserIdFromLocalStorage();
    const dispatch = useDispatch();
    const isLoading = useSelector(loaderSelector)

    console.log(currentUserId);

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    let users = useSelector(userSelector)


    return (
        <div id="wrapper">
            {isLoading ? <Loader></Loader> :  
            <>
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
            </div></>}
            
        </div>
    )
}

export default Users;